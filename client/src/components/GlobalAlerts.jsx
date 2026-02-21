import { useState, useEffect } from 'react';
import { courses } from '../data/curriculum';
import NotificationToast from './ui/NotificationToast';

const GlobalAlerts = () => {
    const [newCourseAlert, setNewCourseAlert] = useState(null);

    useEffect(() => {
        // Logic to detect "New Course"
        // In a real app, this would come from a websocket or API
        // Here we simulate it by checking the latest course in curriculum.js
        const latestCourse = courses[courses.length - 1];
        const seenCourses = JSON.parse(localStorage.getItem('seenCourses') || '[]');

        if (latestCourse && !seenCourses.includes(latestCourse.id)) {
            // It's a new course!
            setNewCourseAlert(latestCourse);

            // Mark as seen after showing (or wait for user to click)
            // For this demo, we'll mark it as seen so it doesn't spam every refresh
            localStorage.setItem('seenCourses', JSON.stringify([...seenCourses, latestCourse.id]));
        }
    }, []);

    if (!newCourseAlert) return null;

    return (
        <NotificationToast
            message={`The course "${newCourseAlert.title}" is now available in the ${newCourseAlert.category} category. Start your learning journey today!`}
            courseId={newCourseAlert.id}
        />
    );
};

export default GlobalAlerts;
