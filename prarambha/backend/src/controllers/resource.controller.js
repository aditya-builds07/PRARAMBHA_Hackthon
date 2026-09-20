import { createResource, listResourcesByFarm } from "../services/resource.service.js";
import { validateResourceInput } from "../validators/resource.validator.js";

export async function getResources(request, response, next) {
  try {
    const farmId = typeof request.query.farmId === "string" ? request.query.farmId.trim() : "";
    if (!farmId) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: "farmId query parameter is required." } });
      return;
    }
    response.status(200).json({ data: await listResourcesByFarm(farmId) });
  } catch (error) {
    next(error);
  }
}

export async function postResource(request, response, next) {
  try {
    response.status(201).json({ data: await createResource(validateResourceInput(request.body)) });
  } catch (error) {
    if (error.message.includes("required") || error.message.includes("invalid") || error.message.includes("must be")) {
      response.status(400).json({ error: { code: "VALIDATION_ERROR", message: error.message } });
      return;
    }
    next(error);
  }
}
