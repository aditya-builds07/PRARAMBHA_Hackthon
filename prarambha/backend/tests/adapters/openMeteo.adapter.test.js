import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getOpenMeteoWeather } from '../../src/adapters/weather/openMeteo.adapter.js';

describe('Open-Meteo weather adapter', () => {
  it('normalises a valid Open-Meteo current observation', async () => {
    const result = await getOpenMeteoWeather(
      { latitude: 18.52, longitude: 73.85 },
      async () => ({
        ok: true,
        json: async () => ({ current: { temperature_2m: 28.5, precipitation: 0, weather_code: 1 } }),
      }),
    );

    assert.deepEqual(result, {
      available: true,
      source: 'open_meteo',
      weather: { temperatureC: 28.5, precipitationMm: 0, weatherCode: 1, condition: 'good' },
      warning: null,
    });
  });

  it('requires manual weather selection when the provider fails', async () => {
    const result = await getOpenMeteoWeather(
      { latitude: 18.52, longitude: 73.85 },
      async () => { throw new Error('network unavailable'); },
    );

    assert.equal(result.available, false);
    assert.equal(result.source, 'manual_required');
    assert.equal(result.weather, null);
    assert.match(result.warning, /network unavailable/);
  });

  it('requires manual weather selection for malformed provider data', async () => {
    const result = await getOpenMeteoWeather(
      { latitude: 18.52, longitude: 73.85 },
      async () => ({ ok: true, json: async () => ({ current: { temperature_2m: 'unknown' } }) }),
    );

    assert.equal(result.available, false);
    assert.equal(result.source, 'manual_required');
  });
});
