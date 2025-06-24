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
  const { id, _id, name, email, courses, phone, address, password, role } =
    req.body;

  if (!id && !_id) {
    return res
      .status(400)
      .json({ message: "Teacher 'id' or '_id' is required" });
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

  const {
    password: _password,
    phone: _phone,
    ...response
  } = teacher.toObject();

  res.status(200).json({
    message: "Teacher updated successfully",
    teacher: response,
  });
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { id, name, password } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateData.password = hashedPassword;
  }

  const admin = await Admin.findOneAndUpdate({ id }, updateData, { new: true });

  const isNameSame = name ? admin.name === name : false;
  const isPasswordSame = password
    ? await bcrypt.compare(password, admin.password)
    : false;

  if (isNameSame && isPasswordSame)
    res.status(400).json({
      message: "No changes made to the admin",
    });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  res.status(200).json({
    message: "Admin updated successfully",
    admin,
  });
});

// const updateAdmin = asyncHandler(async (req, res) => {
//   const { id, name, password } = req.body;

//   if (!id) {
//     return res.status(400).json({ message: "Admin ID is required" });
//   }

//   const admin = await Admin.findOne({ id });

//   if (!admin) {
//     return res.status(404).json({ message: "Admin not found" });
//   }

//   // Compare new name and password with existing
//   const isNameSame = name ? name === admin.name : true;
//   const isPasswordSame = password ? await bcrypt.compare(password, admin.password) : true;

//   if (isNameSame && isPasswordSame) {
//     return res.status(400).json({ message: "No changes made" });
//   }

//   // Prepare updated data
//   const updateData = {};
//   if (name && !isNameSame) updateData.name = name;
//   if (password && !isPasswordSame) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     updateData.password = hashedPassword;
//   }

//   const updatedAdmin = await Admin.findOneAndUpdate({ id }, updateData, { new: true });

//   res.status(200).json({
//     message: "Admin updated successfully",
//     admin: updatedAdmin,
//   });
// });

const deleteAdmin =  asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Admin ID is required" });
  }

  const admin = await Admin.findOneAndDelete({ id });

  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  res.status(200).json({
    message: "Admin deleted successfully",
    admin,
  });
});

const updateUniversity = asyncHandler(async (req, res) => {
  const { id, name, address, phone, email, location, description, website, establishedYear, logo } = req.body;

  if (!id) {
    return res.status(400).json({ message: "University ID is required" });
  }

  const updateData = {};

  if (name) updateData.name = name;
  if (address) updateData.address = address;
  if (phone) updateData.phone = phone;
  if (email) updateData.email = email;
  if (location) updateData.location = location;
  if (description) updateData.description = description;
  if (website) updateData.website = website;
  if (establishedYear) updateData.establishedYear = establishedYear;
  if (logo) updateData.logo = logo;

  const university = await University.findByIdAndUpdate(id, updateData, { new: true });

  if (!university) {
    return res.status(404).json({ message: "University not found" });
  }

  res.status(200).json({
    message: "University updated successfully",
    university,
  });
})

export {
  createStudent,
  createAdmin,
  createTeacher,
  updateTeacher,
  updateAdmin,
  deleteAdmin,
  updateUniversity
};
