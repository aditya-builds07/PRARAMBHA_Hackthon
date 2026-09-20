import { listActiveCrops } from "../services/crop.service.js";

export async function getCrops(_request, response, next) {
  try {
    const crops = await listActiveCrops();
    response.status(200).json({ data: crops });
  } catch (error) {
    next(error);
  }
}
