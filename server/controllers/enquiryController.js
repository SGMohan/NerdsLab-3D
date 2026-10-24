import { Enquiry } from '../models/Enquiry.js';

// In-memory store fallback if DB is temporarily disconnected
let fallbackEnquiries = [];

// @desc    Submit a new enquiry or free demo request
// @route   POST /api/enquiries
// @access  Public
export const createEnquiry = async (req, res) => {
  try {
    const { fullName, email, phone, selectedCourse, enquiryType, subject, message } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and phone number.',
      });
    }

    let savedEnquiry;
    try {
      savedEnquiry = await Enquiry.create({
        fullName,
        email,
        phone,
        selectedCourse: selectedCourse || 'General Inquiries',
        enquiryType: enquiryType || 'Course Enquiry',
        subject: subject || 'Cybersecurity Training Inquiry',
        message: message || '',
      });
    } catch (dbErr) {
      console.warn('DB error on enquiry creation, saving to fallback memory:', dbErr.message);
      savedEnquiry = {
        id: 'temp_' + Date.now(),
        _id: 'temp_' + Date.now(),
        fullName,
        email,
        phone,
        selectedCourse: selectedCourse || 'General Inquiries',
        enquiryType: enquiryType || 'Course Enquiry',
        subject: subject || 'Cybersecurity Training Inquiry',
        message: message || '',
        submissionStatus: 'new',
        createdAt: new Date(),
      };
      fallbackEnquiries.unshift(savedEnquiry);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our cybersecurity training team will reach out within 24 hours.',
      data: savedEnquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process enquiry',
      error: error.message,
    });
  }
};
