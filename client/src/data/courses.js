
import mathImg from '../assets/courses/class-6-10-maths.jpg';
import scienceImg from '../assets/courses/class-6-10-science.jpg';
import socialImg from '../assets/courses/class-6-10-social.jpg';
import englishImg from '../assets/courses/class-6-10-english.jpg';
import phyImg from '../assets/courses/class-11-12-physics.jpg';
import chemImg from '../assets/courses/class-11-12-chem.jpg';
import bioImg from '../assets/courses/class-11-12-bio.jpg';
import neetImg from '../assets/courses/neet-biology.jpg';
import jeeImg from '../assets/courses/jee-physics.jpg';
import btechCsImg from '../assets/courses/ug-btech-cs.jpg';
import btechItImg from '../assets/courses/ug-btech.jpg';
import bcomImg from '../assets/courses/ug-bcom.jpg';
import mbaImg from '../assets/courses/pg-mba.jpg';
import dsImg from '../assets/courses/pg-data-science.jpg';

const courses = [
    {
        "id": "class-6-10-maths",
        "title": "Mathematics (Class 6-10)",
        "category": "Class 6-10",
        "image": mathImg,
        "price": "Free"
    },
    {
        "id": "class-6-10-science",
        "title": "Science (Class 6-10)",
        "category": "Class 6-10",
        "image": scienceImg,
        "price": "Free"
    },
    {
        "id": "class-6-10-social",
        "title": "Social Science (Class 6-10)",
        "category": "Class 6-10",
        "image": socialImg,
        "price": "Free"
    },
    {
        "id": "class-6-10-english",
        "title": "English (Class 6-10)",
        "category": "Class 6-10",
        "image": englishImg,
        "price": "Free"
    },
    {
        "id": "class-11-12-physics",
        "title": "Physics (Class 11-12)",
        "category": "Class 11-12",
        "image": phyImg,
        "price": "Free"
    },
    {
        "id": "class-11-12-chem",
        "title": "Chemistry (Class 11-12)",
        "category": "Class 11-12",
        "image": chemImg,
        "price": "Free"
    },
    {
        "id": "class-11-12-bio",
        "title": "Biology (Class 11-12)",
        "category": "Class 11-12",
        "image": bioImg,
        "price": "Free"
    },
    {
        "id": "neet-biology",
        "title": "NEET Biology Masterclass",
        "category": "NEET",
        "image": neetImg,
        "price": "Free"
    },
    {
        "id": "jee-physics",
        "title": "JEE Physics: Mechanics & Optics",
        "category": "JEE",
        "image": jeeImg,
        "price": "Free"
    },
    {
        "id": "ug-btech-cs",
        "title": "B.Tech (CS Core)",
        "category": "UG Courses",
        "image": btechCsImg,
        "price": "Free"
    },
    {
        "id": "ug-btech",
        "title": "B.Tech (Information Technology)",
        "category": "UG Courses",
        "image": btechItImg,
        "price": "Free"
    },
    {
        "id": "ug-bcom",
        "title": "B.Com (Business Accounting)",
        "category": "UG Courses",
        "image": bcomImg,
        "price": "Free"
    },
    {
        "id": "pg-mba",
        "title": "MBA (Business Strategy)",
        "category": "PG Courses",
        "image": mbaImg,
        "price": "Free"
    },
    {
        "id": "pg-data-science",
        "title": "PG Diploma in Data Science",
        "category": "PG Courses",
        "image": dsImg,
        "price": "Free"
    }
];

export default courses;
