import mongoose from "mongoose";

const validateMongoId = (req, res, next) => {
  const { universityId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(universityId)) {
    return res.status(400).json({
      message: "Invalid MongoDB ID",
    });
  }
  next();
};

export default validateMongoId;
