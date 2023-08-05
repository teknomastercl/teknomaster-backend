export const errorSend = (code, message) => {
  return {
    data: null,
    error: {
      errorCode: code,
      errorMessage: message,
    },
  };
};
