import dotenv from 'dotenv';
dotenv.config();

import { connectDB, sequelize } from '../config/db.js';
import { Course } from '../models/Course.js';
import { Testimonial } from '../models/Testimonial.js';
import { FAQ } from '../models/FAQ.js';
import { Enquiry } from '../models/Enquiry.js';
import { initialCourses, initialTestimonials, initialFAQs } from './seedData.js';

const seedDatabase = async () => {
  try {
    const isConnected = await connectDB();
    if (!isConnected) {
      console.log('Skipping database seeding because MySQL connection could not be established.');
      process.exit(1);
    }

    console.log('[Seeding]: Dropping any obsolete admin_users table...');
    await sequelize.query('DROP TABLE IF EXISTS admin_users;');

    console.log('[Seeding]: Resetting tables with fresh schema (force: true)...');
    await sequelize.sync({ force: true });

    console.log('[Seeding]: Resetting auto-increment counters to start from 1...');
    await sequelize.query('ALTER TABLE courses AUTO_INCREMENT = 1;');
    await sequelize.query('ALTER TABLE testimonials AUTO_INCREMENT = 1;');
    await sequelize.query('ALTER TABLE faqs AUTO_INCREMENT = 1;');
    await sequelize.query('ALTER TABLE enquiries AUTO_INCREMENT = 1;');

    console.log('[Seeding]: Inserting verified course catalogue...');
    await Course.bulkCreate(initialCourses);

    console.log('[Seeding]: Inserting approved learner testimonials...');
    await Testimonial.bulkCreate(initialTestimonials);

    console.log('[Seeding]: Inserting all verified FAQs...');
    await FAQ.bulkCreate(initialFAQs);

    console.log('✅ MySQL Database seeded successfully! All IDs start from 1.');
    process.exit(0);
  } catch (error) {
    console.error('❌ MySQL Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
