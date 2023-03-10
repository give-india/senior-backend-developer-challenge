const success = (
  data: object,
  message: string = "",
  statusCode: number = 200
) => {
  return {
    message,
    error: false,
    code: statusCode,
    data,
  };
};

const error = (message: string, statusCode?: number) => {
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code == statusCode);

  if (!findCode) statusCode = 500;
  else statusCode = findCode;

  return {
    message,
    code: statusCode,
    error: true,
    data: {},
  };
};

const validation = (errors: object) => {
  return {
    message: "Validation errors",
    error: true,
    code: 422,
    errors,
    data: {},
  };
};

export { success, error, validation };
