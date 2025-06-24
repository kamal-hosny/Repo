import Student from "../models/student.model.js";
import Course from "../models/course.model.js";

import asyncHandler from "express-async-handler";

// const getAllStudents = asyncHandler(async (req, res) => {
//   const students = await Student.find().lean();
//   res.status(200).json(students);
// });

const registerStudentToUniversity = asyncHandler(async (req, res) => {
  const { studentId, universityId } = req.body;

  if (!studentId || !universityId) {
    return res.status(400).json({
      message: "Please provide a student ID and university ID",
    });
  }

  const student = await Student.findById(studentId);
  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  const university = await University.findById(universityId);
  if (!university) {
    return res.status(404).json({
      message: "University not found",
    });
  }

  student.universityId = university._id;
  await student.save();

  res.status(200).json(student);
});

const getStudentsPageOfUniversity = asyncHandler(async (req, res) => {
  const { universityId } = req.params;
  const { page = 1, limit = 40 } = req.query;
  const students = await Student.find({ universityId })
    .select("-createdAt -updatedAt")
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ _id: -1 })
    .lean();
  res.status(200).json(students);
});

const getAllStudentsOfUniversity = asyncHandler(async (req, res) => {
  const { universityId } = req.params;
  const students = await Student.find({ universityId })
    .select("-createdAt -updatedAt -courses")
    .sort({ _id: -1 })
    .lean();
  res.status(200).json(students);
});

const getStudentsPage = asyncHandler(async (req, res) => {
  const { page = 1, limit = 40 } = req.query;
  const totalStudents = await Student.countDocuments();
  const totalPages = Math.ceil(totalStudents / limit);

  const students = await Student.find()
    .select("-createdAt -updatedAt -courses")
    .populate({
      path: "universityId",
      select: "name",
    })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 })
    .lean();

  res.status(200).json({
    students,
    totalPages,
    currentPage: page,
  });
});

const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id)
    .populate({
      path: "universityId",
      select: "name",
    })
    .populate({
      path: "courses",
      select: "_id name", // Populate courses and select name and _id
    })
    .lean();
  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }
  res.status(200).json(student);
});

const updateStudent = asyncHandler(async (req, res) => {
  const updates = req.body;

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!updatedStudent) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json(updatedStudent);
});

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found",
    });
  }

  res.status(200).json({ message: "Student has been removed permanently" });
});

export {
  // createStudent,
  // getAllStudents,
  getStudentsPage,
  getStudentById,
  deleteStudent,
  updateStudent,
};
