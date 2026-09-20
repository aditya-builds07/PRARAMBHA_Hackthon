import { listActiveAssumptions } from "../services/assumption.service.js";

export async function getAssumptions(_request, response, next) {
  try {
    const assumptions = await listActiveAssumptions();
    response.status(200).json({ data: assumptions });
  } catch (error) {
    next(error);
  }
}
