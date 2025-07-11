import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
// Models
import Student from "../models/student.model.js";
import Admin from "../models/admin.model.js";
import Teacher from "../models/teacher.model.js";

const login = asyncHandler(async (req, res) => {
  let { id, password, lang = "en" } = req.body;
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
    let message = "Invalid id or password";
    if (lang === "ar") message = "معرف أو كلمة مرور غير صحيحة";

    return res.status(400).json({
      message,
    });
  }

  const isMatch = await bcrypt.compare(password, result.password);
  if (!isMatch) {
    let message = "Invalid id or password!";
    if (lang === "ar") message = "معرف أو كلمة مرور غير صحيحة!";

    return res.status(400).json({
      message,
    });
  }
  // console.log(result);

  const token = jwt.sign(
    { _id: String(result._id), id: result.id, role: result.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  const { password: _, createdAt, updatedAt, role, ...response } = result;

  let message = "Login successfully";
  if (lang === "ar") message = "تم تسجيل الدخول بنجاح";

  res.status(200).json({
    message,
    role: result.role,
    data: response,
  });
});

const logout = asyncHandler(async (req, res) => {
  const { lang = "en" } = req.body;
  console.log("Logging out user...", req.user);

  res.clearCookie("jwt");

  let message = "Logout successfully";
  if (lang === "ar") message = "تم تسجيل الخروج بنجاح";

  res.status(200).json({
    message,
  });
});

export { login, logout };
