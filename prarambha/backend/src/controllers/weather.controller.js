import { getOpenMeteoWeather } from '../adapters/weather/openMeteo.adapter.js';
import { sendError, sendSuccess } from '../utils/response.js';

export async function getWeather(request, response, next) {
  try {
    const { latitude, longitude } = request.query;
    if (latitude === undefined || longitude === undefined) {
      return sendError(response, 400, 'VALIDATION_ERROR', 'latitude and longitude query parameters are required.');
    }

    sendSuccess(response, 200, await getOpenMeteoWeather({ latitude, longitude }));
  } catch (error) {
    next(error);
  }
}
