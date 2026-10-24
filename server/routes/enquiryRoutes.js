import express from 'express';
import { createEnquiry } from '../controllers/enquiryController.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', enquiryLimiter, createEnquiry);

export default router;
