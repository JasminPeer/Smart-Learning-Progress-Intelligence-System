const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const courses = require('../data/tempCurriculum');

dotenv.config({ path: '../.env' }); // Adjust path if running from scripts folder
// Or assume running from root:
dotenv.config(); 

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_learning_db');

const seedContent = async () => {
    try {
        console.log('🌱 Starting Full Content Seeding...');
        
        for (const course of courses) {
            // Check if course exists by title
            const existing = await Course.findOne({ title: course.title });
            
            if (existing) {
                console.log(`Updating: ${course.title}`);
                // Update fields
                existing.description = course.description || 'No description available';
                existing.duration = course.duration;
                existing.topics = course.topics;
                existing.assessment = course.assessment;
                existing.image = course.coverImage; // Map coverImage to image
                // Ensure slug/id is consistent if possible, but rely on title match
                
                await existing.save();
            } else {
                console.log(`Creating New: ${course.title}`);
                await Course.create({
                    title: course.title,
                    category: course.category,
                    description: course.description || 'No description available',
                    duration: course.duration,
                    image: course.coverImage,
                    topics: course.topics,
                    assessment: course.assessment,
                    price: 0,
                    level: 'Beginner', // Default
                    createdBy: '65d4c8f9a2b3c4d5e6f7g8h9' // Placeholder admin ID if needed, or omit
                });
            }
        }

        console.log('✅ All courses updated with full content!');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedContent();
