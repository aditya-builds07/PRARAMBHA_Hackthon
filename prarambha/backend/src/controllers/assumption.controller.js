import { listActiveAssumptions } from "../services/assumption.service.js";
import { sendSuccess } from "../utils/response.js";

export async function getAssumptions(_request, response, next) {
  try {
    const assumptions = await listActiveAssumptions();
    sendSuccess(response, 200, assumptions);
  } catch (error) {
    next(error);
  }
}
