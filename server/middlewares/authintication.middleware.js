import jwt from "jsonwebtoken";

import Student from "../models/student.model.js";

const authintication = async (req, res, next) => {
  const token = req?.cookies?.jwt || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Student.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
};
export default authintication;
