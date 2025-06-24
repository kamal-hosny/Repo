import Teacher from "../models/teacher.model.js";
import asyncHandler from "express-async-handler";

const getPageOfTeachers = asyncHandler(async (req, res) => {
  const { page = 1, lang = "en" } = req.query;

  const teachers = await Teacher.find()
    .populate("courses")
    .skip((page - 1) * 40)
    .lean();

  if (!teachers || teachers.length === 0) {
    let message = "No teachers found";
    if (lang === "ar") message = "لم يتم العثور على معلمين";

    return res.status(404).json({
      message,
      total: 0,
      teachers: [],
    });
  }

  res.status(200).json({ teachers, total: teachers.length });
});

const getTeacherById = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const { lang = "en" } = req.query;

  const teacher = await Teacher.findById(teacherId).populate("courses");

  if (!teacher) {
    let message = "Teacher not found";
    if (lang === "ar") message = "المعلم غير موجود";

    return res.status(404).json({
      message,
    });
  }

  res.status(200).json(teacher);
});

export { getPageOfTeachers, getTeacherById };
