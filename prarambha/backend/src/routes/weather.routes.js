import { Router } from 'express';
import { getWeather } from '../controllers/weather.controller.js';
import { requireAuthenticatedUser } from '../middleware/authentication.middleware.js';

export const weatherRouter = Router();

// Weather data is used in the simulation flow; requires auth (D5).
weatherRouter.get('/weather', requireAuthenticatedUser, getWeather);
