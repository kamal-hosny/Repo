import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Student from "../models/student.model.js";
import Course from "../models/course.model.js";
import University from "../models/univirsity.model.js";

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
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email address",
    });
  }

  if (name.length < 2 || name.length > 50) {
    return res.status(400).json({
      message: "Name must be between 2 and 50 characters",
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
    return res.status(400).json({
      message:
        "Invalid GeoJSON location. Must include type 'Point' and coordinates [lng, lat]",
    });
  }

  const existingUniversity = await University.findOne({ email });
  if (existingUniversity) {
    return res.status(400).json({
      message: "University already exists, please use a different email",
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

const getAllUniversities = asyncHandler(async (req, res) => {
  const universities = await University.find()
    .select("-createdAt -updatedAt")
    .lean();

  if (!universities) {
    return res.status(404).json({
      message: "No universities found",
    });
  }

  res.status(200).json(universities);
});

export default createUniversity;

export { createUniversity, getAllUniversities };
