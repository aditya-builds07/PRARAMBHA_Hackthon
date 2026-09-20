import { getOpenMeteoWeather } from '../adapters/weather/openMeteo.adapter.js';

export async function getWeather(request, response, next) {
  try {
    const { latitude, longitude } = request.query;
    if (latitude === undefined || longitude === undefined) {
      response.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'latitude and longitude query parameters are required.' },
      });
      return;
    }

    response.status(200).json({ data: await getOpenMeteoWeather({ latitude, longitude }) });
  } catch (error) {
    next(error);
  }
}
