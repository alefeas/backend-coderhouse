export const apiSuccessResponse = (payload) => {
  return {
    success: true,
    payload
  }
};

export const apiErrorResponse = (description, error = null) => {
  return {
    success: false,
    description,
    details: error
  }
}