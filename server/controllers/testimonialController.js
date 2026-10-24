import { Testimonial } from '../models/Testimonial.js';
import { initialTestimonials } from '../seed/seedData.js';

// @desc    Get all approved testimonials
// @route   GET /api/testimonials
// @access  Public
export const getAllTestimonials = async (req, res) => {
  try {
    let testimonials = [];
    try {
      testimonials = await Testimonial.findAll({
        where: { approvalStatus: true },
        order: [
          ['displayOrder', 'ASC'],
          ['createdAt', 'ASC'],
        ],
      });
    } catch (dbErr) {
      console.warn('DB query error, using fallback testimonials:', dbErr.message);
    }

    if (!testimonials || testimonials.length === 0) {
      testimonials = initialTestimonials;
    }

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
};
