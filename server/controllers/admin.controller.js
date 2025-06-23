import asyncHandler from "express-async-handler";
import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, courses = [], universityId } = req.body;

  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    return res.status(400).json({
      message: "Student already exists, please use a different email",
    });
  }
  const student = await Student.create({
    name,
    email,
    courses,
    universityId,
  });

  res.status(201).json(student);
});

const createAdmin = asyncHandler(async (req, res) => {
  const { password, name } = req.body;
  if (!password) {
    return res.status(400).json({
      message: "Please provide a password",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    password: hashedPassword,
    role: "admin",
  });
  res.status(201).json({
    message: "Admin created successfully",
    admin,
  });
});
export { createStudent, createAdmin };
