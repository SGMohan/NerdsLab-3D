import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { Course } from './models/Course.js';
import { Testimonial } from './models/Testimonial.js';
import { FAQ } from './models/FAQ.js';
import { initialCourses, initialTestimonials, initialFAQs } from './seed/seedData.js';

const PORT = process.env.PORT || 3000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

// Auto-seed initial data if tables are empty
const autoSeedIfEmpty = async () => {
  try {
    const courseCount = await Course.count();
    if (courseCount === 0) {
      console.log('[AutoSeed]: Inserting initial verified course catalog into MySQL...');
      await Course.bulkCreate(initialCourses);
    }

    const testCount = await Testimonial.count();
    if (testCount === 0) {
      console.log('[AutoSeed]: Inserting initial verified testimonials into MySQL...');
      await Testimonial.bulkCreate(initialTestimonials);
    }

    const faqCount = await FAQ.count();
    if (faqCount === 0) {
      console.log('[AutoSeed]: Inserting initial verified FAQs into MySQL...');
      await FAQ.bulkCreate(initialFAQs);
    }
  } catch (error) {
    console.warn('[AutoSeed Warning]: Failed to auto-seed MySQL tables:', error.message);
  }
};

const startServer = async () => {
  const isConnected = await connectDB();
  if (isConnected) {
    await autoSeedIfEmpty();
  }

  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🛡️  NERDS LAB MySQL Backend Server running on port ${PORT}`);
    console.log(`📡 API Health Check: http://${HOSTNAME}:${PORT}/api/health`);
    console.log(`🎯 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`====================================================`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection Error: ${err.message}`);
  });
};

startServer();
