import Teacher from "../models/teacher.model.js";
import asyncHandler from "express-async-handler";

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().populate("courses");
  if (!teachers) {
    return res.status(404).json({
      message: "No teachers found",
      total: 0,
      teachers: [],
    });
  }
  res.status(200).json({ teachers, total: teachers.length });
});

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

export { getAllTeachers, getPageOfTeachers };
