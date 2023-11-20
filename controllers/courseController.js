const Course = require("../models/courseSchema");

exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({message:"Successfully Created Course",course});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('Department');
    res.status(200).json({message:"Successfully retrived all Courses data",courses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findById(id).populate('Department');
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({message:"Successfully retrived Course data",course});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({mesasge:"Successfully updated Course data",updatedCourse});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCourseById = async (req, res) => {
  const id = req.params.id;
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};