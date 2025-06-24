import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import University from "../models/university.model.js";
import Teacher from "../models/teacher.model.js";

const createUniversity = asyncHandler(async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    location,
    description,
    website,
    establishedYear,
    logo,
    lang = "en",
  } = req.body;

  if (
    !name ||
    !address ||
    !phone ||
    !email ||
    !location ||
    !description ||
    !establishedYear ||
    !logo
  ) {
    let message = "Missing required fields";
    if (lang === "ar") message = "الحقول المطلوبة مفقودة";

    return res.status(400).json({
      message,
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    let message = "Invalid email address";
    if (lang === "ar") message = "عنوان بريد إلكتروني غير صحيح";

    return res.status(400).json({
      message,
    });
  }

  if (name.length < 2 || name.length > 50) {
    let message = "Name must be between 2 and 50 characters";
    if (lang === "ar") message = "يجب أن يكون الاسم بين 2 و 50 حرفاً";

    return res.status(400).json({
      message,
    });
  }

  // Validate GeoJSON location
  if (
    typeof location !== "object" ||
    location.type !== "Point" ||
    !Array.isArray(location.coordinates) ||
    location.coordinates.length !== 2 ||
    typeof location.coordinates[0] !== "number" ||
    typeof location.coordinates[1] !== "number"
  ) {
    let message =
      "Invalid GeoJSON location. Must include type 'Point' and coordinates [lng, lat]";
    if (lang === "ar")
      message =
        "موقع GeoJSON غير صحيح. يجب أن يتضمن النوع 'Point' والإحداثيات [lng, lat]";

    return res.status(400).json({
      message,
    });
  }

  const existingUniversity = await University.findOne({ email });
  if (existingUniversity) {
    let message = "University already exists, please use a different email";
    if (lang === "ar")
      message = "الجامعة موجودة بالفعل، يرجى استخدام بريد إلكتروني مختلف";

    return res.status(400).json({
      message,
    });
  }

  const university = await University.create({
    name,
    address,
    phone,
    email,
    location,
    description,
    website,
    establishedYear,
    logo,
  });

  res.status(201).json(university);
});

const getUniversityById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { lang = "en" } = req.query;

  const university = await University.findById(id)
    .select("-createdAt -updatedAt")
    .lean();

  if (!university) {
    let message = "University not found";
    if (lang === "ar") message = "الجامعة غير موجودة";

    return res.status(404).json({
      message,
    });
  }

  res.status(200).json(university);
});

const getUniversitiesPage = asyncHandler(async (req, res) => {
  const { page = 1, limit = 40, lang = "en" } = req.query;

  const universities = await University.find()
    .select("-createdAt -updatedAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  if (!universities || universities.length === 0) {
    let message = "No universities found";
    if (lang === "ar") message = "لم يتم العثور على جامعات";

    return res.status(404).json({
      message,
    });
  }

  res.status(200).json(universities);
});

const getStudentsPageOfUniversity = asyncHandler(async (req, res) => {
  const { universityId } = req.params;
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 40, 1);
  const { lang = "en" } = req.query;

  const students = await Student.find({ universityId })
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

  if (!students || students.length === 0) {
    let message = "No students found";
    if (lang === "ar") message = "لم يتم العثور على طلاب";

    return res.status(404).json({
      message,
    });
  }

  res.status(200).json(students);
});

const getTeachersPageOfUniversity = asyncHandler(async (req, res) => {
  const { universityId } = req.params;
  const { page = 1, limit = 40, lang = "en" } = req.query;

  const university = await University.findById(universityId)
    .populate({
      path: "teachers",
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    })
    .select("teachers")
    .lean();

  if (!university || !university.teachers || university.teachers.length === 0) {
    let message = "No teachers found";
    if (lang === "ar") message = "لم يتم العثور على معلمين";

    return res.status(404).json({
      message,
      total: 0,
      teachers: [],
    });
  }

  res.status(200).json({
    total: university.teachers.length,
    teachers: university.teachers,
  });
});

export {
  createUniversity,
  getUniversityById,
  getUniversitiesPage,
  getStudentsPageOfUniversity,
  getTeachersPageOfUniversity,
};
