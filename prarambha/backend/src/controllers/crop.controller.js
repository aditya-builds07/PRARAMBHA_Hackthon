import { listActiveCrops } from "../services/crop.service.js";
import { sendSuccess } from "../utils/response.js";

export async function getCrops(_request, response, next) {
  try {
    const crops = await listActiveCrops();
    sendSuccess(response, 200, crops);
  } catch (error) {
    next(error);
  }
}
