const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const path = require('path');

dotenv.config();

const courses = [
    {
        id: "class-6-10-math",
        title: "Mathematics (Class 6-10)",
        category: "Class 6-10",
        description: "Foundational mathematics covering Algebra, Geometry, and Arithmetic for school students.",
        duration: "52 Weeks",
        topics: [
            {
                id: "math-algebra",
                title: "Algebraic Expressions",
                subtopics: [
                    {
                        id: "alg-intro",
                        title: "Introduction to Variables",
                        videoUrl: "https://www.youtube.com/embed/v9S5X_TvtTo",
                        theory: "Algebra uses variables (letters) to represent numbers in equations.",
                        text: "Detailed algebra content...",
                        mcqs: [
                            { q: "What is x in 2x = 10?", options: ["A) 2", "B) 5", "C) 8", "D) 10"], a: "B" },
                            { q: "Algebra uses ___ to represent numbers?", options: ["A) Pictures", "B) Variables", "C) Colors", "D) Music"], a: "B" },
                            { q: "3a + 2a is equal to?", options: ["A) 5a", "B) 6a", "C) a", "D) 5"], a: "A" },
                            { q: "Variable for 'unknown' is often?", options: ["A) x", "B) 1", "C) ?", "D) Happy"], a: "A" },
                            { q: "2(x+3) is?", options: ["A) 2x+3", "B) 2x+6", "C) x+6", "D) 5x"], a: "B" }
                        ]
                    }
                ]
            }
        ]
    },
    // ... I will only include a few representative ones for the script to be manageable, 
    // or I can read the file if I had a way to access it from the script.
    // Actually, I'll just write a script that reads the file if possible.
];

// NOTE: For the sake of this environment and the size of curriculum.js, 
// I will implement the Admin dashboard to handle "Add Course" which can take JSON.
// Better yet, I'll just update the AdminDashboard.jsx to have a "Seed from Static" button 
// that sends the static curriculum to the API once.

// I'll create the AdminDashboard.jsx first.
