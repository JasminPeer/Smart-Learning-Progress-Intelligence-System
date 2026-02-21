const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Profile = require('../models/Profile');
const User = require('../models/User'); // Re-added for strict Populate support and general availability
// const UserModel = require('../models/User'); // Removed to avoid circular dependency and unused variable

// @desc    Get current user profile
// @route   GET /api/profile/me
// @access  Private
const getMyProfile = asyncHandler(async (req, res) => {
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
        console.log(`[Profile] Auto-creating missing profile for user ${req.user._id}`);
        profile = await Profile.create({
            user: req.user._id,
            educationLevel: req.user.educationLevel || 'Learning Journey Started',
            instituteName: 'N/A',
            mobile: req.user.mobileNumber || '',
            subjects: [],
            enrolledCourses: [],
            achievements: []
        });
    }

    // HEALING LOGIC: Automatically fix legacy records missing certificateId
    let modified = false;

    // 1. Ensure completed courses have IDs
    if (profile.enrolledCourses) {
        profile.enrolledCourses.forEach(course => {
            if (course.completed && !course.certificateId) {
                course.certificateId = `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
                console.log(`[Healing] Generated missing ID ${course.certificateId} for course ${course.courseId}`);
                modified = true;
            }
        });
    }

    // 2. Sync IDs to achievements
    if (profile.achievements) {
        profile.achievements.forEach(ach => {
            if (!ach.certificateId) {
                // Find matching course to sync ID
                const cleanAchTitle = ach.title.replace('Certified in ', '').toLowerCase();
                const matchingCourse = profile.enrolledCourses?.find(c => 
                    c.name.toLowerCase() === cleanAchTitle || 
                    cleanAchTitle.includes(c.name.toLowerCase()) ||
                    c.name.toLowerCase().includes(cleanAchTitle)
                );
                
                if (matchingCourse && matchingCourse.certificateId) {
                    ach.certificateId = matchingCourse.certificateId;
                    console.log(`[Healing] Synced ID ${ach.certificateId} to achievement "${ach.title}"`);
                    modified = true;
                } else {
                    // Fallback: Generate if still missing and not matched
                    ach.certificateId = `CERT-HEAL-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
                    console.log(`[Healing] Generated fallback ID ${ach.certificateId} for achievement "${ach.title}"`);
                    modified = true;
                }
            }
        });
    }

    if (modified) {
        profile.markModified('enrolledCourses');
        profile.markModified('achievements');
        await profile.save();
        console.log(`[Healing] Profile for user ${req.user._id} recovered and saved.`);
    }

    res.json(profile);
});

// @desc    Create or Update user profile (Onboarding)
// @route   POST /api/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const { educationLevel, instituteName, mobile, subjects, theme } = req.body;

    const profileFields = {
        user: req.user._id,
        educationLevel,
        instituteName,
        mobile,
        subjects,
        theme
    };

    // Upsert (Create if new, Update if exists)
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
        );
        res.json(profile);
    } else {
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }
});

// @desc    Enroll in a course
// @route   POST /api/profile/enroll
// @access  Private
// @desc    Enroll in a course
// @route   POST /api/profile/enroll
// @access  Private
const enrollCourse = asyncHandler(async (req, res) => {
    const { courseId, name } = req.body;
    console.log(`[Enrollment Debug] Request for User: ${req.user?._id}, Course: ${courseId}, Name: ${name}`);

    if (!req.user) {
        console.error("[Enrollment Debug] Error: req.user is missing");
        res.status(401);
        throw new Error('Not authorized, user context missing');
    }

    if (!courseId || !name) {
        console.error("[Enrollment Debug] Error: missing courseId or name in body");
        res.status(400);
        throw new Error('Missing course identifier or name');
    }
    
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
        console.log(`[Enrollment Debug] Profile not found for user ${req.user._id}. Auto-creating.`);
        try {
            profile = await Profile.create({
                user: req.user._id,
                educationLevel: req.user.educationLevel || 'Learning Journey Started',
                instituteName: 'N/A',
                mobile: req.user.mobileNumber || '',
                subjects: [],
                enrolledCourses: [],
                achievements: []
            });
            console.log(`[Enrollment Debug] Profile created successfully for user ${req.user._id}`);
        } catch (error) {
            console.error(`[Enrollment Debug] Failed to create profile: ${error.message}`);
            res.status(500);
            throw new Error(`Profile creation failed: ${error.message}`);
        }
    }

    // Check if already enrolled
    if (profile.enrolledCourses && profile.enrolledCourses.some(c => c.courseId === courseId)) {
        console.log(`[Enrollment Debug] User ${req.user._id} already enrolled in ${courseId}`);
        res.status(400);
        throw new Error('Already enrolled');
    }

    if (!profile.enrolledCourses) profile.enrolledCourses = [];
    
    // Add to profile
    profile.enrolledCourses.push({ courseId, name, progress: 0 });
    
    try {
        await profile.save();
        console.log(`[Enrollment Debug] Profile saved. Now syncing with User model for ${req.user._id}`);

        // Sync with User model using mongoose.model to avoid import issues
        try {
            const User = mongoose.model('User');
            await User.findByIdAndUpdate(req.user._id, {
                $push: { enrolledCourses: { courseId, name, progress: 0 } }
            });
            console.log(`[Enrollment Debug] User model synced successfully.`);

            // NEW: Sync with Progress collection for Admin Visibility
            const Progress = mongoose.model('Progress');
            await Progress.findOneAndUpdate(
                { studentId: req.user._id, courseId: courseId },
                { $setOnInsert: { completionPercentage: 0, score: 0, attendance: 0 } },
                { upsert: true, new: true }
            );
            console.log(`[Enrollment Sync] Progress record created/verified for admin stats.`);
        } catch (syncError) {
            console.error(`[Enrollment Warning] Failed to sync with other models: ${syncError.message}`);
        }

        res.json(profile.enrolledCourses);
    } catch (error) {
        console.error(`[Enrollment] Failed to save enrollment: ${error.message}`);
        res.status(500);
        throw new Error(`Enrollment save failed: ${error.message}`);
    }
});

// @desc    Update course progress
// @route   PUT /api/profile/progress
// @access  Private
const updateProgress = asyncHandler(async (req, res) => {
    const { courseId, progress, completed } = req.body;
    
    let profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
        console.log(`[Progress Update] Profile not found for user ${req.user._id}. Auto-creating.`);
        profile = await Profile.create({
            user: req.user._id,
            educationLevel: req.user.educationLevel || 'Learning Journey Started',
            instituteName: 'N/A',
            mobile: req.user.mobileNumber || '',
            subjects: [],
            enrolledCourses: [],
            achievements: []
        });
    }

    const courseIndex = profile.enrolledCourses.findIndex(c => c.courseId === courseId);
    if (courseIndex > -1) {
        profile.enrolledCourses[courseIndex].progress = progress;
        if (completed) profile.enrolledCourses[courseIndex].completed = true;
        
        // Update subjects marks simulation based on learning
        // This connects the learning back to the "Stats" dashboard
        const subjectName = profile.enrolledCourses[courseIndex].name.split(' ')[0]; // Approx mapping
        const subjectIdx = profile.subjects.findIndex(s => s.name.includes(subjectName));
        if (subjectIdx > -1) {
             profile.subjects[subjectIdx].currentMarks = Math.min(100, profile.subjects[subjectIdx].currentMarks + 5);
        }

        await profile.save();

        // NEW: Sync Progress collection
        try {
            const Progress = mongoose.model('Progress');
            await Progress.findOneAndUpdate(
                { studentId: req.user._id, courseId: courseId },
                { $set: { completionPercentage: progress } }
            );
            console.log(`[Progress Sync] Admin stats updated for user ${req.user._id}`);
        } catch (syncError) {
            console.error(`[Progress Sync Warning] Failed: ${syncError.message}`);
        }

        res.json(profile.enrolledCourses);
    } else {
        res.status(404);
        throw new Error('Course not enrolled');
    }
});

// @desc    Save Assessment Result & Certificate
// @route   POST /api/profile/certificate
// @access  Private
const saveCertificate = asyncHandler(async (req, res) => {
    try {
        const { courseId, courseName, score } = req.body;
        console.log(`[Certificate API Request] User: ${req.user?._id}, Course: ${courseId}, Name: ${courseName}`);

        if (!req.user) {
            console.error("[Certificate API] Error: req.user is missing");
            res.status(401);
            throw new Error('User context missing. Please logout and login again.');
        }

        const userId = req.user._id;

        if (!courseId || !courseName) {
            console.error("[Certificate API] Error: missing courseId or courseName");
            res.status(400);
            throw new Error('Missing required data: Course ID and Name.');
        }

        let profile = await Profile.findOne({ user: userId });

        if (!profile) {
            console.log(`[Certificate API] No profile for user ${userId}. Auto-creating one.`);
            profile = new Profile({
                user: userId,
                educationLevel: 'Learning Journey Started',
                instituteName: 'LearnIQ Academy',
                subjects: [],
                enrolledCourses: [],
                achievements: []
            });
            // Preliminary save to handle required fields and uniqueness
            await profile.save();
        }

        // Ensure achievements array exists
        if (!profile.achievements) profile.achievements = [];
        
        const courseIdx = profile.enrolledCourses.findIndex(c => c.courseId === courseId);
        let certId = `CERT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        if (courseIdx > -1) {
            console.log(`[Certificate API] Updating existing course progress for ${courseId}`);
            profile.enrolledCourses[courseIdx].completed = true;
            profile.enrolledCourses[courseIdx].progress = 100;
            if (!profile.enrolledCourses[courseIdx].certificateId) {
                profile.enrolledCourses[courseIdx].certificateId = certId;
            } else {
                certId = profile.enrolledCourses[courseIdx].certificateId;
            }
        } else {
            console.log(`[Certificate API] Adding new completed course entry for ${courseId}`);
            profile.enrolledCourses.push({
                courseId,
                name: courseName,
                progress: 100,
                completed: true,
                certificateId: certId
            });
        }
        
        const certTitle = `Certified in ${courseName}`;
        const hasAchievement = profile.achievements.some(a => a.title === certTitle);
        
        if (!hasAchievement) {
            console.log(`[Certificate API] Awarding new certificate: ${certTitle}`);
            profile.achievements.push({
                title: certTitle,
                date: new Date(),
                icon: 'Award',
                certificateId: certId
            });
            profile.markModified('achievements');
        } else {
            // Update ALL existing achievements with this title if certId is missing
            let achModified = false;
            profile.achievements.forEach(a => {
                if (a.title === certTitle && !a.certificateId) {
                    a.certificateId = certId;
                    achModified = true;
                }
            });
            if (achModified) profile.markModified('achievements');
        }
        
        profile.markModified('enrolledCourses');
        profile.markModified('achievements');
        
        console.log(`[Certificate API] Finalizing save for user ${userId}. Achievements count: ${profile.achievements.length}`);
        const savedProfile = await profile.save();
        
        // NEW: Finalize Progress in Progress collection
        try {
            const Progress = mongoose.model('Progress');
            // Ensure we handle potential null score
            const finalScore = score !== undefined ? score : 0;
            
            await Progress.findOneAndUpdate(
                { studentId: userId, courseId: courseId },
                { $set: { completionPercentage: 100, score: finalScore } },
                { upsert: true }
            );
            console.log(`[Certificate Sync] Progress record finalized for user ${userId} with score ${finalScore}`);
        } catch (syncError) {
            console.error(`[Certificate Sync Warning] Failed: ${syncError.message}`);
        }

        console.log(`[Certificate API] SUCCESS: Achievement "${certTitle}" archived for user ${userId}`);
        res.json(savedProfile);

    } catch (error) {
        console.error(`[Certificate API CRITICAL]`, error.message);
        const code = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(code).json({
            message: error.message || "Failed to save certificate progress",
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
    }
});

// @desc    Unenroll from a course
// @route   DELETE /api/profile/unenroll/:courseId
// @access  Private
const unenrollCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    const courseIndex = profile.enrolledCourses.findIndex(c => c.courseId === courseId);
    if (courseIndex > -1) {
        profile.enrolledCourses.splice(courseIndex, 1);
        await profile.save();
        res.json(profile.enrolledCourses);
    } else {
        res.status(404);
        throw new Error('Course not found in enrollment list');
    }
});

// @desc    Verify a certificate by ID
// @route   GET /api/profile/verify/:certId
// @access  Public
const verifyCertificate = asyncHandler(async (req, res) => {
    const { certId } = req.params;
    console.log(`[Verification Request] Checking ID: ${certId}`);

    // Search in both enrolledCourses and achievements arrays across all profiles
    const profiles = await Profile.find({
        $or: [
            { "enrolledCourses.certificateId": certId },
            { "achievements.certificateId": certId }
        ]
    }).populate('user', 'name');

    if (profiles.length > 0) {
        const profile = profiles[0];
        
        // Find the record in either array
        let course = profile.enrolledCourses.find(c => c.certificateId === certId);
        let achievement = profile.achievements.find(a => a.certificateId === certId);

        if (course || achievement) {
            const courseName = course ? course.name : achievement.title.replace('Certified in ', '');
            const dateAwarded = achievement ? achievement.date : profile.updatedAt;

            console.log(`[Verification Success] Found for student: ${profile.user.name}, Course: ${courseName}`);
            
            return res.json({
                valid: true,
                studentName: profile.user.name,
                courseName: courseName,
                dateAwarded: dateAwarded,
                certificateId: certId
            });
        }
    }

    console.warn(`[Verification Failed] ID not found: ${certId}`);
    res.status(404).json({ valid: false, message: "Certificate not found or invalid." });
});

module.exports = {
    getMyProfile,
    updateProfile,
    enrollCourse,
    unenrollCourse,
    updateProgress,
    saveCertificate,
    verifyCertificate
};
