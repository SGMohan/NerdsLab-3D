import { FAQ } from '../models/FAQ.js';
import { initialFAQs } from '../seed/seedData.js';

// @desc    Get all active FAQs
// @route   GET /api/faqs
// @access  Public
export const getAllFAQs = async (req, res) => {
  try {
    let faqs = [];
    try {
      faqs = await FAQ.findAll({
        where: { activeStatus: true },
        order: [
          ['displayOrder', 'ASC'],
          ['createdAt', 'ASC'],
        ],
      });
    } catch (dbErr) {
      console.warn('DB query error, using fallback FAQs:', dbErr.message);
    }

    if (!faqs || faqs.length === 0) {
      faqs = initialFAQs;
    }

    res.json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FAQs',
      error: error.message,
    });
  }
};
