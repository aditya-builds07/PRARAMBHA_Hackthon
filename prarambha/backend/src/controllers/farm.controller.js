import { createFarm, listFarms } from "../services/farm.service.js";
import { validateFarmInput } from "../validators/farm.validator.js";

export async function getFarms(_request, response, next) {
  try {
    response.status(200).json({ data: await listFarms() });
  } catch (error) {
    next(error);
  }
}

export async function postFarm(request, response, next) {
  try {
    const farm = validateFarmInput(request.body);
    response.status(201).json({ data: await createFarm(farm) });
  } catch (error) {
    if (error.message.includes("must") || error.message.includes("required")) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.message } });
      return;
    }
    next(error);
  }
}
