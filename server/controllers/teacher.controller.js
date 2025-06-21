import Teacher from "../models/teacher.model.js";
import asyncHandler from "express-async-handler";

const getPageOfTeachers = asyncHandler(async (req, res) => {
  const { page = 1 } = req.query;

  const teachers = await Teacher.find()
    .populate("courses")
    .skip((page - 1) * 40)
    .lean();

  if (!teachers || teachers.length === 0) {
    return res.status(404).json({
      message: "No teachers found",
      total: 0,
      teachers: [],
    });
  }

  res.status(200).json({ teachers, total: teachers.length });
});

const getTeacherById = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;

  const teacher = await Teacher.findById(teacherId).populate("courses");

  if (!teacher) {
    return res.status(404).json({
      message: "Teacher not found",
    });
  }

  res.status(200).json(teacher);
});

export { getPageOfTeachers, getTeacherById };
