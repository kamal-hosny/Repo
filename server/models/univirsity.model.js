import mongoose from "mongoose";

const univirsitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    colleges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    description: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    logo: {
      type: String,
      required: true,
      default: "LOGO",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const University = mongoose.model("University", univirsitySchema);

export default University;
