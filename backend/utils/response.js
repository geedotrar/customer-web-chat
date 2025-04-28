export const successResponse = (res, status, message, data = null) => {
    return res.status(status).json({
      status,
      message,
      data,
      error: false,
    });
  };
  
  export const errorResponse = (res, status, message, data = null) => {
    return res.status(status).json({
      status,
      message,
      data,
      error: true,
    });
  };
  