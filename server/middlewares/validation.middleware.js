import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  next();
};

const validateStudentId = (req, res, next) => {
  const { studentId } = req.params;
  if (!studentId || studentId.length < 5) {
    return res.status(400).json({
      message: "Invalid student ID format",
    });
  }
  next();
};

const validateStudentLoginData = (req, res, next) => {
  const { studentId, password } = req.body;
  if (studentId || !password) {
    return res.status(400).json({
      message: "studentId and password are required",
    });
  }
  next();
};

export { validateObjectId, validateStudentId, validateStudentLoginData };
