export const asyncHandler = (cb) => async(req, res, next) => {
  try {
    await cb(req, res, next)
  } catch (err) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message
    })
  }

}
