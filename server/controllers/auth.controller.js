import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
// Models
import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import Teacher from "../models/teacher.model.js";

const login = asyncHandler(async (req, res) => {
  let { id, password } = req.body;
  let Model = null;
  if (id.startsWith("STU")) {
    Model = Student;
  } else if (id.startsWith("ADMIN")) {
    Model = Admin;
  } else {
    Model = Teacher;
  }

  const result = await Model.findOne({ id }).lean();
  if (!result) {
    return res.status(400).json({
      message: "Invalid id or password",
    });
  }
  const isMatch = await bcrypt.compare(password, result.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid id or password!!!!!!",
    });
  }

  const token = jwt.sign(
    { id: Model._id, id: Model.studentId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const { password: _, createdAt, updatedAt, role, ...response } = result;

  res.status(200).json({
    message: "Login successfully",
    role: result.role,
    data: response,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({
    message: "Logout successfully",
  });
});

export { login, logout };
