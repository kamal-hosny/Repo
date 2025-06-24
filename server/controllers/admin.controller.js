import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
// Models
import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import Teacher from "../models/teacher.model.js";

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, courses = [], universityId, password } = req.body;

  const existingStudent = await Student.findOne({ email });
  if (existingStudent) {
    return res.status(400).json({
      message: "Student already exists, please use a different email",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const student = await Student.create({
    name,
    email,
    courses,
    universityId,
    password: hashedPassword,
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

const createTeacher = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    courses = [],
    phone,
    address,
    password,
    universityId,
    role,
  } = req.body;

  const existingTeacher = await Teacher.findOne({ email });
  if (existingTeacher) {
    return res.status(400).json({
      message: "Teacher already exists, please use a different email",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const teacher = await Teacher.create({
    name,
    email,
    courses,
    phone,
    address,
    password: hashedPassword,
    universityId,
    role,
  });

  const {
    password: _password,
    phone: _phone,
    ...response
  } = teacher.toObject();
  res.status(201).json({
    message: "Teacher created successfully",
    teacher: response,
  });
});

const updateTeacher = asyncHandler(async (req, res) => {
  const { id, _id, name, email, courses, phone, address, password, role } = req.body;

  if (!id && !_id) {
    return res.status(400).json({ message: "Teacher 'id' or '_id' is required" });
  }

  const updateData = {};

  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (courses) updateData.courses = courses;
  if (phone) updateData.phone = phone;
  if (address) updateData.address = address;
  if (role) updateData.role = role;
  if (password) updateData.password = await bcrypt.hash(password, 10);

  const teacher = id
    ? await Teacher.findOneAndUpdate({ id }, updateData, { new: true })
    : await Teacher.findByIdAndUpdate(_id, updateData, { new: true });

  if (!teacher) {
    return res.status(404).json({ message: "Teacher not found" });
  }

  const { password: _password, phone: _phone, ...response } = teacher.toObject();

  res.status(200).json({
    message: "Teacher updated successfully",
    teacher: response,
  });
});


export { createStudent, createAdmin, createTeacher, updateTeacher };
