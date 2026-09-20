import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { fetchOpenMeteoWeather } from "../adapters/weather/openMeteo.adapter.js";

const MANUAL_CONDITIONS = new Set(["good", "normal", "poor"]);

function manualWeather(condition, reason = null) {
  if (!MANUAL_CONDITIONS.has(condition)) throw new Error("manual weather must be good, normal, or poor.");
  return {
    provider: "manual",
    fetchedAt: new Date().toISOString(),
    condition,
    warning: reason,
  };
}

async function saveSnapshot(farmId, weather) {
  if (!farmId || weather.provider !== "open-meteo") return;

  try {
    const { error } = await getSupabaseClient().from("weather_snapshots").insert({
      farm_id: farmId,
      provider: weather.provider,
      latitude: weather.latitude,
      longitude: weather.longitude,
      normalized_weather: weather,
      fetched_at: weather.fetchedAt,
    });

    if (error) console.warn(`Weather snapshot was not saved: ${error.message}`);
  } catch (error) {
    console.warn(`Weather snapshot was not saved: ${error.message}`);
  }
}

export async function getWeatherContext({ farmId = null, latitude, longitude, manual = null }) {
  if (manual) return manualWeather(manual);

  if (latitude === undefined || longitude === undefined) {
    return manualWeather("normal", "Location was not provided; using manual normal weather.");
  }

  try {
    const weather = await fetchOpenMeteoWeather({ latitude, longitude });
    await saveSnapshot(farmId, weather);
    return weather;
  } catch (error) {
    return manualWeather("normal", `${error.message} Using manual normal weather.`);
  }
}
