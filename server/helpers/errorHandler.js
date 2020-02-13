class ErrorHandler extends Error {
  constructor(message, code = 500) {
    super();
    this.message = message;
    this.statusCode = code;
  }

  static throwErrorIfNull(data, message, code = 404) {
    if (!data) {
      throw new ErrorHandler(message, code);
    }
  }

  static sendErrorResponse(error, res) {
    const { message, statusCode } = error;
    const code = statusCode || 500;

    res.status(code).json({
      success: false,
      message,
    });
  }
}

export default ErrorHandler;
