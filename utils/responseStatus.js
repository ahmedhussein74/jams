const STATUS = Object.freeze({
  SUCCESS: 200, // OK
  CREATED: 201, // Created
  ACCEPTED: 202, // Accepted
  NO_CONTENT: 204, // No Content

  BAD_REQUEST: 400, // Bad Request
  UNAUTHORIZED: 401, // Unauthorized
  FORBIDDEN: 403, // Forbidden
  NOT_FOUND: 404, // Not Found
  CONFLICT: 409, // Conflict
  UNPROCESSABLE_ENTITY: 422, // Unprocessable Entity

  SERVER_ERROR: 500, // Internal Server Error
  NOT_IMPLEMENTED: 501, // Not Implemented
  SERVICE_UNAVAILABLE: 503, // Service Unavailable
  GATEWAY_TIMEOUT: 504, // Gateway Timeout
});

module.exports = STATUS;
