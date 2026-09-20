export function sendSuccess(response, status, data) {
  response.status(status).json({ success: true, data });
}

export function sendError(response, status, code, message) {
  response.status(status).json({ success: false, error: { code, message } });
}
