const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

function asFiniteCoordinate(value, field) {
  const coordinate = Number(value);
  if (!Number.isFinite(coordinate) || coordinate < -90 || coordinate > 90) {
    throw new Error(`${field} must be a valid coordinate.`);
  }
  return coordinate;
}

function normaliseCurrentWeather(current) {
  if (!current || typeof current !== 'object') {
    throw new Error('Open-Meteo returned no current weather data.');
  }

  const temperatureC = Number(current.temperature_2m);
  const precipitationMm = Number(current.precipitation);
  const weatherCode = Number(current.weather_code);
  if (![temperatureC, precipitationMm, weatherCode].every(Number.isFinite)) {
    throw new Error('Open-Meteo returned malformed current weather data.');
  }

  // This label is advisory only: callers must retain the farmer-selected
  // good/normal/poor input rather than silently translating forecasts into a model factor.
  const condition = weatherCode >= 80 || precipitationMm >= 10 || temperatureC >= 42
    ? 'poor'
    : weatherCode >= 45 || precipitationMm >= 2 || temperatureC >= 36
      ? 'normal'
      : 'good';

  return { temperatureC, precipitationMm, weatherCode, condition };
}

export function createManualWeatherFallback(reason) {
  return {
    available: false,
    source: 'manual_required',
    weather: null,
    warning: reason,
  };
}

/**
 * Retrieves and normalises current Open-Meteo conditions without coupling the
 * deterministic simulation model to a third-party availability or classification.
 */
export async function getOpenMeteoWeather({ latitude, longitude, timeoutMs = 5000 }, fetchImpl = globalThis.fetch) {
  try {
    const lat = asFiniteCoordinate(latitude, 'latitude');
    const lon = Number(longitude);
    if (!Number.isFinite(lon) || lon < -180 || lon > 180) throw new Error('longitude must be a valid coordinate.');
    if (typeof fetchImpl !== 'function') throw new Error('No fetch implementation is available.');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const url = new URL(OPEN_METEO_FORECAST_URL);
      url.searchParams.set('latitude', String(lat));
      url.searchParams.set('longitude', String(lon));
      url.searchParams.set('current', 'temperature_2m,precipitation,weather_code');

      const response = await fetchImpl(url, { signal: controller.signal });
      if (!response?.ok) throw new Error(`Open-Meteo request failed with status ${response?.status ?? 'unknown'}.`);
      const payload = await response.json();

      return {
        available: true,
        source: 'open_meteo',
        weather: normaliseCurrentWeather(payload.current),
        warning: null,
      };
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    // A failed forecast must never invent a model weather value or block manual simulation.
    return createManualWeatherFallback(error.message);
  }
}
