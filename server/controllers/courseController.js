import { Course } from '../models/Course.js';
import { initialCourses } from '../seed/seedData.js';

// @desc    Get all active courses
// @route   GET /api/courses
// @access  Public
export const getAllCourses = async (req, res) => {
  try {
    let courses = [];
    try {
      courses = await Course.findAll({
        where: { activeStatus: true },
        order: [
          ['sortOrder', 'ASC'],
          ['createdAt', 'ASC'],
        ],
      });
    } catch (dbErr) {
      console.warn('DB query error, using fallback courses:', dbErr.message);
    }

    if (!courses || courses.length === 0) {
      courses = initialCourses;
    }

    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
      error: error.message,
    });
  }
};

// @desc    Get single course by slug
// @route   GET /api/courses/:slug
// @access  Public
export const getCourseBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let course = null;

    try {
      course = await Course.findOne({
        where: { slug: slug.toLowerCase(), activeStatus: true },
      });
    } catch (dbErr) {
      console.warn('DB query error, checking fallback courses:', dbErr.message);
    }

    if (!course) {
      course = initialCourses.find((c) => c.slug === slug.toLowerCase());
    }

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with slug '${slug}' not found`,
      });
    }

    res.json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course details',
      error: error.message,
    });
  }
};
