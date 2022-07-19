module.exports = {
  success: (res, payload) => {
    const { code, message, data, pagination = false } = payload;

    const response = {
      code: code || 200,
      status: 'success',
      message,
      data,
    };

    // success with pagination
    if (pagination) {
      response.pagination = pagination;
    }

    res.status(code).json(response);
  },
  failed: (res, payload) => {
    const { code, message, error } = payload;

    const response = {
      code: code || 500,
      status: 'failed',
      message,
      error,
    };

    res.status(code).json(response);
  },
};
