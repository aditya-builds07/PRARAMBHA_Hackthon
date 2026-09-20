import { getSupabaseClient } from "../adapters/db/supabase.client.js";
import { getOpenMeteoWeather } from "../adapters/weather/openMeteo.adapter.js";

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

async function saveSnapshot(farmId, weather, latitude, longitude) {
  if (!farmId || weather.source !== "open_meteo" || !weather.available) return;

  try {
    const { error } = await getSupabaseClient().from("weather_snapshots").insert({
      farm_id: farmId,
      source: weather.source,
      latitude: Number(latitude),
      longitude: Number(longitude),
      condition: weather.weather?.condition ?? null,
      raw_payload: weather,
      fetched_at: new Date().toISOString(),
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
    const weather = await getOpenMeteoWeather({ latitude, longitude });
    await saveSnapshot(farmId, weather, latitude, longitude);
    return weather;
  } catch (error) {
    return manualWeather("normal", `${error.message} Using manual normal weather.`);
  }
}
