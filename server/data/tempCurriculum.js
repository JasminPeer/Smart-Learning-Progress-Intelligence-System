














const courses = [
    {
        id: "class-6-10-maths",
        title: "Mathematics (Class 6-10)",
        category: "Class 6-10",
        description: "Foundational mathematics covering Algebra, Geometry, and Number Systems.",
        duration: "52 Weeks",
        coverImage: '/assets/store/class-6-10-maths.jpg',
        topics: [
            {
                id: "math-6-10-algebra",
                title: "Algebraic Foundations",
                subtopics: [
                    {
                        id: "algebra-vars",
                        title: "Variables & Constants",
                        videoUrl: "https://www.youtube.com/embed/7CqJlxBYjJQ",
                        theory: "Algebra uses symbols like x and y to represent variables—values that can change. Constants are numbers that remain fixed, like 5 or π. Understanding the relationship between these is the first step in solving equations.",
                        text: "In algebra, we move from concrete numbers to abstract variables. A variable is a placeholder for an unknown value. For example, in 'x + 5 = 10', x is a variable representing 5. Constants, however, have fixed values. This allows us to create general formulas that apply to many different situations.",
                        mcqs: [
                            { q: "What is a symbol that represents a changing value?", options: ["A) Constant", "B) Variable", "C) Equation", "D) Term"], a: "B" },
                            { q: "In the expression 5x + 3, what is 3?", options: ["A) Variable", "B) Coefficient", "C) Constant", "D) Power"], a: "C" },
                            { q: "Which of these is a numerical constant?", options: ["A) x", "B) y", "C) z", "D) 10"], a: "D" },
                            { q: "What do we call the combining of constants and variables with operations?", options: ["A) Arithmetic", "B) Geometry", "C) Algebraic Expression", "D) Calculus"], a: "C" },
                            { q: "If x = 2, what is the value of 3x + 4?", options: ["A) 7", "B) 10", "C) 12", "D) 14"], a: "B" }
                        ]
                    },
                    {
                        id: "algebra-eqs",
                        title: "Linear Equations",
                        videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0",
                        theory: "A linear equation is an equation where the highest power of the variable is 1. Solving it involves isolating the variable on one side by performing inverse operations on both sides.",
                        text: "Linear equations represent balance. Whatever you do to one side, you must do to the other. The goal is to isolate 'x'. For instance, if 2x = 10, we divide both sides by 2 to find x = 5. These equations often represent straight lines on a graph.",
                        mcqs: [
                            { q: "What is the highest power of a variable in a linear equation?", options: ["A) 0", "B) 1", "C) 2", "D) 3"], a: "B" },
                            { q: "Solve for x: x - 7 = 10.", options: ["A) 3", "B) 17", "C) 70", "D) 0"], a: "B" },
                            { q: "Which operation is the inverse of multiplication?", options: ["A) Addition", "B) Subtraction", "C) Division", "D) Square Root"], a: "C" },
                            { q: "In y = mx + c, what does 'm' represent?", options: ["A) Y-intercept", "B) Variable", "C) Slope", "D) Constant term"], a: "C" },
                            { q: "If 4x = 12, what is x?", options: ["A) 3", "B) 8", "C) 16", "D) 48"], a: "A" }
                        ]
                    }
                ]
            },
            {
                id: "math-6-10-geometry",
                title: "Practical Geometry",
                subtopics: [
                    {
                        id: "geo-shapes",
                        title: "Polygons & Circles",
                        videoUrl: "https://www.youtube.com/embed/7X8v6L0h0O0",
                        theory: "Polygons are closed plane figures with straight sides (3 or more). Circles are defined by a radius from a center point. Geometry involves measuring their perimeter and area.",
                        text: "Geometry is the study of shapes and space. A triangle is the simplest polygon. Squares and rectangles are quadrilaterals. Circles are unique as they have no straight sides but are governed by the constant Pi (3.14159). Concepts of area (space inside) and perimeter (boundary) are fundamental.",
                        mcqs: [
                            { q: "How many sides does a hexagon have?", options: ["A) 5", "B) 6", "C) 7", "D) 8"], a: "B" },
                            { q: "What is the formula for the area of a circle?", options: ["A) 2πr", "B) πd", "C) πr²", "D) r²"], a: "C" },
                            { q: "A triangle with all three equal sides is called?", options: ["A) Isosceles", "B) Scalene", "C) Right-angled", "D) Equilateral"], a: "D" },
                            { q: "The sum of interior angles of a triangle is?", options: ["A) 90°", "B) 180°", "C) 270°", "D) 360°"], a: "B" },
                            { q: "What is a quadrilateral with opposite sides parallel and equal?", options: ["A) Trapezium", "B) Parallelogram", "C) Pentagon", "D) Ellipse"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Maths Certification Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "What is a symbol for an unknown value?", options: ["Constant", "Variable", "Equation", "Expression"], answer: "Variable" },
                { id: 2, question: "What is 2 + 2 × 3?", options: ["12", "8", "10", "6"], answer: "8" },
                { id: 3, question: "The perimeter of a square with side 5 cm is?", options: ["20 cm", "25 cm", "10 cm", "15 cm"], answer: "20 cm" },
                { id: 4, question: "What is the area of a rectangle with length 4 and width 3?", options: ["7", "12", "14", "10"], answer: "12" },
                { id: 5, question: "Solve: x + 5 = 12", options: ["7", "17", "5", "12"], answer: "7" },
                { id: 6, question: "What is 15% of 200?", options: ["30", "15", "20", "25"], answer: "30" },
                { id: 7, question: "The sum of angles in a triangle is?", options: ["90°", "180°", "360°", "270°"], answer: "180°" },
                { id: 8, question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
                { id: 9, question: "Which is a prime number?", options: ["4", "6", "7", "9"], answer: "7" },
                { id: 10, question: "What is 3³?", options: ["9", "27", "6", "12"], answer: "27" },
                { id: 11, question: "The LCM of 4 and 6 is?", options: ["12", "24", "8", "6"], answer: "12" },
                { id: 12, question: "What is the HCF of 12 and 18?", options: ["6", "3", "2", "9"], answer: "6" },
                { id: 13, question: "Convert 0.5 to a fraction", options: ["1/2", "1/4", "1/3", "2/3"], answer: "1/2" },
                { id: 14, question: "What is the value of π (approximately)?", options: ["3.14", "2.14", "4.14", "3.41"], answer: "3.14" },
                { id: 15, question: "The circumference of a circle with radius 7 is?", options: ["44", "22", "14", "28"], answer: "44" },
                { id: 16, question: "Solve: 2x = 10", options: ["5", "20", "2", "10"], answer: "5" },
                { id: 17, question: "What is the median of 3, 5, 7?", options: ["5", "3", "7", "15"], answer: "5" },
                { id: 18, question: "The mode of 2, 3, 3, 4 is?", options: ["3", "2", "4", "No mode"], answer: "3" },
                { id: 19, question: "What is 1/2 + 1/4?", options: ["3/4", "1/6", "2/6", "1/2"], answer: "3/4" },
                { id: 20, question: "The volume of a cube with side 3 is?", options: ["27", "9", "18", "12"], answer: "27" }
            ]
        }
    },
    {
        id: "class-6-10-science",
        title: "Foundation Science (Class 6-10)",
        category: "K-12",
        description: "Explore the wonders of Biology, Chemistry, and Physics with interactive experiments and deep theory.",
        duration: "52 Weeks",
        coverImage: '/assets/store/class-6-10-science.jpg',
        topics: [
            {
                id: "sci-6-10-physics",
                title: "Physics: Motion & Force",
                subtopics: [
                    {
                        id: "motion-intro",
                        title: "Laws of Motion",
                        videoUrl: "https://www.youtube.com/embed/L9pSnyOaBvY",
                        theory: "Newton's laws describe how objects move and interact with forces. Inertia, F=ma, and Action-Reaction are the three core principles.",
                        text: "Physics starts with motion. Newton's First Law (Inertia) says objects hate change. The Second Law (F=ma) says more force means more acceleration. The Third Law says forces always come in pairs—if you push a wall, it pushes back.",
                        mcqs: [
                            { q: "Which law is known as the Law of Inertia?", options: ["A) 1st Law", "B) 2nd Law", "C) 3rd Law", "D) Law of Gravity"], a: "A" },
                            { q: "What is the unit of Force?", options: ["A) Watt", "B) Joule", "C) Newton", "D) Pascal"], a: "C" },
                            { q: "Relationship between mass and acceleration for a fixed force is?", options: ["A) Directly proportional", "B) Inversely proportional", "C) Exponential", "D) Linear"], a: "B" },
                            { q: "Every action has an equal and opposite?", options: ["A) Weight", "B) Force", "C) Acceleration", "D) Reaction"], a: "D" },
                            { q: "Formula for force is?", options: ["A) m/a", "B) a/m", "C) m*a", "D) m+a"], a: "C" }
                        ]
                    }
                ]
            },
            {
                id: "sci-6-10-biology",
                title: "Biology: Life Processes",
                subtopics: [
                    {
                        id: "bio-cells",
                        title: "The Basic Unit of Life",
                        videoUrl: "https://www.youtube.com/embed/nU5pS0R1Sfs",
                        theory: "Cells are the building blocks of all living things. They contain organelles like the nucleus (brain) and mitochondria (powerhouse).",
                        text: "All life starts with a cell. Plant cells have cell walls and chloroplasts, animal cells don't. The nucleus stores DNA, which contains the blueprints for the organism. Understanding cells helps us understand health, growth, and reproduction.",
                        mcqs: [
                            { q: "Which organelle is the 'Powerhouse' of the cell?", options: ["A) Nucleus", "B) Golgi body", "C) Mitochondria", "D) Ribosome"], a: "C" },
                            { q: "Plants produce food through?", options: ["A) Photosynthesis", "B) Respiration", "C) Digestion", "D) Transpiration"], a: "A" },
                            { q: "Which part of the cell contains genetic material?", options: ["A) Cytoplasm", "B) Cell wall", "C) Nucleus", "D) Vacuole"], a: "C" },
                            { q: "The cell wall is found in?", options: ["A) Animal cells", "B) Plant cells", "C) Both", "D) None"], a: "B" },
                            { q: "Human body is made of ___ cells?", options: ["A) Eukaryotic", "B) Prokaryotic", "C) Unicellular", "D) Bacterial"], a: "A" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Science Junior Mastery Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "Unit of Force?", options: ["Joule", "Watt", "Newton", "Volt"], answer: "Newton" },
                { id: 2, question: "Which law is known as the Law of Inertia?", options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravity"], answer: "Newton's 1st Law" },
                { id: 3, question: "What is the 'Powerhouse' of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Body"], answer: "Mitochondria" },
                { id: 4, question: "The process by which plants make food is?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], answer: "Photosynthesis" },
                { id: 5, question: "Formula for Force is?", options: ["F=m/a", "F=ma", "F=a/m", "F=m+a"], answer: "F=ma" },
                { id: 6, question: "The control center of the cell is?", options: ["Cell Wall", "Cytoplasm", "Nucleus", "Vacuole"], answer: "Nucleus" },
                { id: 7, question: "Which of these is a plant cell component not in animal cells?", options: ["Cell Membrane", "Cell Wall", "Nucleus", "Ribosome"], answer: "Cell Wall" },
                { id: 8, question: "Rate of change of displacement is?", options: ["Speed", "Acceleration", "Velocity", "Distance"], answer: "Velocity" },
                { id: 9, question: "Weight of an object is measured in?", options: ["Kilograms", "Newtons", "Grams", "Litres"], answer: "Newtons" },
                { id: 10, question: "What is the SI unit of work?", options: ["Newton", "Watt", "Joule", "Pascal"], answer: "Joule" },
                { id: 11, question: "The liquid part of the cell is?", options: ["Cytoplasm", "Nucleoplasm", "Protoplasm", "Xylem"], answer: "Cytoplasm" },
                { id: 12, question: "Inertia depends on an object's?", options: ["Shape", "Color", "Mass", "Velocity"], answer: "Mass" },
                { id: 13, question: "Chlorophyll is present in?", options: ["Mitochondria", "Chloroplasts", "Vacuoles", "Nucleus"], answer: "Chloroplasts" },
                { id: 14, question: "Distance travelled per unit time is?", options: ["Velocity", "Speed", "Acceleration", "Force"], answer: "Speed" },
                { id: 15, question: "Human blood is red due to?", options: ["Hemoglobin", "Chlorophyll", "Platelets", "WBC"], answer: "Hemoglobin" },
                { id: 16, question: "Symbol for the element Carbon is?", options: ["Ca", "Co", "C", "Cr"], answer: "C" },
                { id: 17, question: "Pure water has a pH of?", options: ["5", "7", "9", "1"], answer: "7" },
                { id: 18, question: "The hardest natural substance is?", options: ["Iron", "Gold", "Diamond", "Graphite"], answer: "Diamond" },
                { id: 19, question: "Boiling point of water in Celsius is?", options: ["0°", "50°", "100°", "273°"], answer: "100°" },
                { id: 20, question: "Gas used by plants for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" }
            ]
        }
    },
    {
        id: "class-11-12-physics",
        title: "Physics (Class 11-12)",
        category: "Class 11-12",
        description: "Advanced physics including Mechanics, Electrodynamics, and Optics.",
        duration: "104 Weeks",
        coverImage: '/assets/store/class-11-12-physics.jpg',
        topics: [
            {
                id: "physics-11-mech",
                title: "Classical Mechanics",
                subtopics: [
                    {
                        id: "mech-kinematics",
                        title: "Kinematics in 2D",
                        videoUrl: "https://www.youtube.com/embed/42J6rW9S-Vw",
                        theory: "Kinematics describes motion using vectors. Projectile motion is a key 2D concept where horizontal and vertical motions are independent.",
                        text: "In 11th grade Physics, we dive deep into vectors. Projectile motion involves two components: horizontal (constant velocity) and vertical (accelerated motion due to gravity). The trajectory is always a parabola.",
                        mcqs: [
                            { q: "Trajectory of a projectile is a?", options: ["A) Circle", "B) Straight Line", "C) Parabola", "D) Hyperbola"], a: "C" },
                            { q: "Horizontal component of velocity in projectile motion is?", options: ["A) Increases", "B) Decreases", "C) Zero", "D) Constant"], a: "D" },
                            { q: "At the highest point, the vertical velocity is?", options: ["A) Maximum", "B) Zero", "C) Minimum", "D) Infinite"], a: "B" },
                            { q: "Range of a projectile is maximum at what angle?", options: ["A) 30°", "B) 45°", "C) 60°", "D) 90°"], a: "B" },
                            { q: "SI unit of acceleration is?", options: ["A) m/s", "B) m*s", "C) m/s²", "D) km/h"], a: "C" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Senior Physics Core Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "Acceleration due to gravity is?", options: ["9.8 m/s²", "8.9 m/s²", "10 m/s²", "6.7 m/s²"], answer: "9.8 m/s²" },
                { id: 2, question: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], answer: "Newton" },
                { id: 3, question: "The trajectory of a projectile is?", options: ["Circle", "Straight Line", "Parabola", "Hyperbola"], answer: "Parabola" },
                { id: 4, question: "At maximum height, vertical velocity is?", options: ["Maximum", "Zero", "Minimum", "Constant"], answer: "Zero" },
                { id: 5, question: "Range is maximum at which angle?", options: ["30°", "45°", "60°", "90°"], answer: "45°" },
                { id: 6, question: "Newton's first law is also called?", options: ["Law of Inertia", "Law of Acceleration", "Law of Action", "Law of Gravity"], answer: "Law of Inertia" },
                { id: 7, question: "Momentum is the product of?", options: ["Mass × Velocity", "Force × Time", "Mass × Acceleration", "Force × Distance"], answer: "Mass × Velocity" },
                { id: 8, question: "Work done is measured in?", options: ["Joules", "Watts", "Newtons", "Pascals"], answer: "Joules" },
                { id: 9, question: "Power is the rate of?", options: ["Work done", "Energy consumed", "Force applied", "Distance covered"], answer: "Work done" },
                { id: 10, question: "Kinetic energy depends on?", options: ["Mass only", "Velocity only", "Both mass and velocity", "Neither"], answer: "Both mass and velocity" },
                { id: 11, question: "Potential energy is maximum at?", options: ["Ground level", "Maximum height", "Midpoint", "Any point"], answer: "Maximum height" },
                { id: 12, question: "Conservation of energy states?", options: ["Energy can be created", "Energy can be destroyed", "Energy is conserved", "Energy increases"], answer: "Energy is conserved" },
                { id: 13, question: "Centripetal force acts?", options: ["Outward", "Inward", "Tangential", "Upward"], answer: "Inward" },
                { id: 14, question: "Frequency is measured in?", options: ["Hertz", "Meters", "Seconds", "Joules"], answer: "Hertz" },
                { id: 15, question: "Speed of light in vacuum is?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10⁷ m/s", "3 × 10⁹ m/s"], answer: "3 × 10⁸ m/s" },
                { id: 16, question: "Ohm's law relates?", options: ["V = IR", "F = ma", "E = mc²", "P = VI"], answer: "V = IR" },
                { id: 17, question: "Resistance is measured in?", options: ["Ohms", "Volts", "Amperes", "Watts"], answer: "Ohms" },
                { id: 18, question: "Magnetic field lines are?", options: ["Open curves", "Closed loops", "Straight lines", "Spirals"], answer: "Closed loops" },
                { id: 19, question: "Lens formula is?", options: ["1/f = 1/v - 1/u", "1/f = 1/v + 1/u", "f = v + u", "f = v - u"], answer: "1/f = 1/v - 1/u" },
                { id: 20, question: "Refractive index is the ratio of?", options: ["Speed of light in vacuum to speed in medium", "Speed in medium to speed in vacuum", "Wavelength to frequency", "Frequency to wavelength"], answer: "Speed of light in vacuum to speed in medium" }
            ]
        }
    },
    {
        id: "class-6-10-social",
        title: "Social Science (Class 6-10)",
        category: "Class 6-10",
        description: "Geography, History, and Civics basics for school students.",
        duration: "52 Weeks",
        coverImage: '/assets/store/class-6-10-social.jpg',
        topics: [
            {
                id: "soc-history",
                title: "History: The Indian Freedom Struggle",
                subtopics: [
                    {
                        id: "hist-1857",
                        title: "The Revolt of 1857",
                        videoUrl: "https://www.youtube.com/embed/2y-bXG_G-m0",
                        theory: "The Revolt of 1857, also known as the First War of Independence, was a major uprising against British East India Company rule. It started in Meerut and spread to Delhi, Kanpur, and Jhansi. While suppressed, it ended Company rule and brought India under the British Crown.",
                        text: "Detailed history content...",
                        mcqs: [
                            { q: "Where did the 1857 revolt start?", options: ["A) Delhi", "B) Meerut", "C) Kolkata", "D) Mumbai"], a: "B" },
                            { q: "Who led the revolt in Jhansi?", options: ["A) Nana Saheb", "B) Tatya Tope", "C) Rani Laxmi Bai", "D) Kunwar Singh"], a: "C" },
                            { q: "What was the immediate cause of the revolt?", options: ["A) Taxes", "B) Greased cartridges", "C) Doctrine of Lapse", "D) Education"], a: "B" },
                            { q: "Who was the Mughal Emperor during the revolt?", options: ["A) Akbar II", "B) Bahadur Shah Zafar", "C) Aurangzeb", "D) Shah Alam"], a: "B" },
                            { q: "Result of the 1857 revolt was?", options: ["A) Independence", "B) End of Company Rule", "C) Start of Company Rule", "D) French Rule"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Social Science Foundation Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "Year of the first war of independence?", options: ["1857", "1947", "1757", "1919"], answer: "1857" },
                { id: 2, question: "Who led the revolt in Jhansi?", options: ["Nana Saheb", "Tatya Tope", "Rani Laxmi Bai", "Kunwar Singh"], answer: "Rani Laxmi Bai" },
                { id: 3, question: "Immediate cause of the 1857 revolt?", options: ["Economic crisis", "Greased cartridges", "Education tax", "Land reforms"], answer: "Greased cartridges" },
                { id: 4, question: "Mughal Emperor during 1857 revolt?", options: ["Akbar II", "Bahadur Shah Zafar", "Aurangzeb", "Shah Alam"], answer: "Bahadur Shah Zafar" },
                { id: 5, question: "Who was the 'Father of Indian Nation'?", options: ["Nehru", "Patel", "Mahatma Gandhi", "Bose"], answer: "Mahatma Gandhi" },
                { id: 6, question: "Which layer of Atmosphere has the Ozone layer?", options: ["Troposphere", "Stratosphere", "Mesosphere", "Exosphere"], answer: "Stratosphere" },
                { id: 7, question: "The longest river in India is?", options: ["Ganga", "Yamuna", "Godavari", "Brahmaputra"], answer: "Ganga" },
                { id: 8, question: "Capital of India is?", options: ["Mumbai", "Kolkata", "New Delhi", "Chennai"], answer: "New Delhi" },
                { id: 9, question: "Highest mountain peak in India?", options: ["Mt. Everest", "K2", "Kanchenjunga", "Anamudi"], answer: "Kanchenjunga" },
                { id: 10, question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
                { id: 11, question: "Indian Constitution was adopted on?", options: ["15 Aug 1947", "26 Jan 1950", "2 Oct 1948", "26 Nov 1949"], answer: "26 Jan 1950" },
                { id: 12, question: "Who is the head of the Indian State?", options: ["Prime Minister", "President", "Chief Justice", "Speaker"], answer: "President" },
                { id: 13, question: "Term of the Lok Sabha is?", options: ["4 years", "5 years", "6 years", "Permanent"], answer: "5 years" },
                { id: 14, question: "Fundamental Rights are in which part of Constitution?", options: ["Part I", "Part II", "Part III", "Part IV"], answer: "Part III" },
                { id: 15, question: "Minimum age to vote in India?", options: ["16", "18", "21", "25"], answer: "18" },
                { id: 16, question: "Silicon Valley of India is?", options: ["Hyderabad", "Pune", "Bengaluru", "Delhi"], answer: "Bengaluru" },
                { id: 17, question: "White Revolution is related to?", options: ["Egg", "Milk", "Rice", "Cotton"], answer: "Milk" },
                { id: 18, question: "Suez Canal connects Mediterranean Sea and?", options: ["Black Sea", "Red Sea", "Arabian Sea", "Caspian Sea"], answer: "Red Sea" },
                { id: 19, question: "The study of population is called?", options: ["Cartography", "Demography", "Geography", "History"], answer: "Demography" },
                { id: 20, question: "First Prime Minister of independent India?", options: ["Sardar Patel", "Jawaharlal Nehru", "Dr. Rajendra Prasad", "Lal Bahadur Shastri"], answer: "Jawaharlal Nehru" }
            ]
        }
    },
    {
        id: "class-6-10-english",
        title: "English (Class 6-10)",
        category: "Class 6-10",
        description: "Grammar, Composition, and Literature for school excellence.",
        duration: "52 Weeks",
        coverImage: '/assets/store/class-6-10-english.jpg',
        topics: [
            {
                id: "eng-grammar",
                title: "English Grammar: Tenses",
                subtopics: [
                    {
                        id: "gram-present",
                        title: "Present Tense Mastery",
                        videoUrl: "https://www.youtube.com/embed/nvX_V6uO0yM",
                        theory: "Present tense is used to describe actions happening right now or habitual actions. It includes Simple Present, Present Continuous, Present Perfect, and Present Perfect Continuous.",
                        text: "Grammar breakdown...",
                        mcqs: [
                            { q: "Which of these is in Simple Present?", options: ["A) I am eating", "B) I eat", "C) I will eat", "D) I had eaten"], a: "B" },
                            { q: "He ___ (go) to school every day.", options: ["A) going", "B) go", "C) goes", "D) gone"], a: "C" },
                            { q: "Identify Present Continuous:", options: ["A) She plays", "B) She is playing", "C) She played", "D) She will play"], a: "B" },
                            { q: "I ___ finished my homework.", options: ["A) has", "B) have", "C) am", "D) was"], a: "B" },
                            { q: "They ___ watching a movie now.", options: ["A) are", "B) is", "C) am", "D) were"], a: "A" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "English Proficiency Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "The plural of 'Child' is?", options: ["Childs", "Children", "Childrens", "Childes"], answer: "Children" },
                { id: 2, question: "Which is a synonym of 'Happy'?", options: ["Sad", "Joyful", "Angry", "Tired"], answer: "Joyful" },
                { id: 3, question: "The feminine of 'Horse' is?", options: ["Filly", "Mare", "Ewe", "Doe"], answer: "Mare" },
                { id: 4, question: "Identify the Adjective in: 'The blue bag is mine.'", options: ["The", "blue", "bag", "mine"], answer: "blue" },
                { id: 5, question: "Which of these is a Vowel?", options: ["B", "E", "D", "G"], answer: "E" },
                { id: 6, question: "Opposite of 'Arrival' is?", options: ["Departure", "Coming", "Entrance", "Reaching"], answer: "Departure" },
                { id: 7, question: "He ___ going to the market.", options: ["am", "is", "are", "be"], answer: "is" },
                { id: 8, question: "The sun ___ in the East.", options: ["rise", "rises", "rising", "rose"], answer: "rises" },
                { id: 9, question: "Identify the Pronoun: 'They are playing.'", options: ["They", "are", "playing", "football"], answer: "They" },
                { id: 10, question: "An apple ___ day keeps the doctor away.", options: ["a", "an", "the", "some"], answer: "a" },
                { id: 11, question: "Past tense of 'Run' is?", options: ["Runned", "Running", "Ran", "Runs"], answer: "Ran" },
                { id: 12, question: "Plural of 'Tooth' is?", options: ["Tooths", "Teeth", "Toothes", "Teeths"], answer: "Teeth" },
                { id: 13, question: "Young one of a 'Cat' is?", options: ["Puppy", "Cub", "Kitten", "Calf"], answer: "Kitten" },
                { id: 14, question: "Identify the Verb: 'She dances gracefully.'", options: ["She", "dances", "gracefully", "stage"], answer: "dances" },
                { id: 15, question: "Which of these is a Proper Noun?", options: ["City", "India", "Book", "River"], answer: "India" },
                { id: 16, question: "Superlative of 'Good' is?", options: ["Better", "Best", "Goodest", "Well"], answer: "Best" },
                { id: 17, question: "A person who writes books is an?", options: ["Actor", "Doctor", "Author", "Engineer"], answer: "Author" },
                { id: 18, question: "The opposite of 'Sharp' is?", options: ["Blunt", "Pointed", "Fast", "Hard"], answer: "Blunt" },
                { id: 19, question: "We ___ students.", options: ["am", "is", "are", "does"], answer: "are" },
                { id: 20, question: "Plural of 'Knife' is?", options: ["Knifes", "Knive", "Knives", "Knifess"], answer: "Knives" }
            ]
        }
    },
    {
        id: "class-11-12-chem",
        title: "Chemistry (Class 11-12)",
        category: "Class 11-12",
        description: "In-depth Inorganic, Organic, and Physical Chemistry.",
        duration: "104 Weeks",
        coverImage: '/assets/store/class-11-12-chem.jpg',
        topics: [
            {
                id: "chem-organic",
                title: "Organic Chemistry: Hydrocarbons",
                subtopics: [
                    {
                        id: "hydro-alkanes",
                        title: "Alkanes & Alkenes",
                        videoUrl: "https://www.youtube.com/embed/vV_xU5w2n8c",
                        theory: "Hydrocarbons are organic compounds made of carbon and hydrogen. Alkanes are saturated (single bonds), while alkenes are unsaturated (double bonds). They follow specific homologous series formulas like CnH2n+2.",
                        text: "Chemical structure details...",
                        mcqs: [
                            { q: "General formula for Alkanes is?", options: ["A) CnH2n", "B) CnH2n+2", "C) CnH2n-2", "D) CnHn"], a: "B" },
                            { q: "Methane is the simplest ___?", options: ["A) Alkene", "B) Alkyne", "C) Alkane", "D) Alcohol"], a: "C" },
                            { q: "Alkenes possess at least one ___ bond?", options: ["A) Single", "B) Double", "C) Triple", "D) Ionic"], a: "B" },
                            { q: "Which of these is a saturated hydrocarbon?", options: ["A) Ethene", "B) Ethyne", "C) Ethane", "D) Benzene"], a: "C" },
                            { q: "Process of breaking large hydrocarbons is?", options: ["A) Polymerization", "B) Cracking", "C) Hydrogenation", "D) Oxidation"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Senior Chemistry Mastery Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "The atomic number of Carbon is?", options: ["4", "6", "8", "12"], answer: "6" },
                { id: 2, question: "What is the general formula for Alkanes?", options: ["CnH2n", "CnH2n+2", "CnH2n-2", "CnH2n+1"], answer: "CnH2n+2" },
                { id: 3, question: "Identify the simplest Alkene:", options: ["Methane", "Ethane", "Ethene", "Ethyne"], answer: "Ethene" },
                { id: 4, question: "Functional group -OH represents?", options: ["Aldehyde", "Ketone", "Alcohol", "Carboxylic Acid"], answer: "Alcohol" },
                { id: 5, question: "Avogadro's number is approximately?", options: ["6.022 x 10^23", "3.011 x 10^23", "9.11 x 10^-31", "1.6 x 10^-19"], answer: "6.022 x 10^23" },
                { id: 6, question: "What is the pH of a neutral solution?", options: ["0", "1", "7", "14"], answer: "7" },
                { id: 7, question: "Which element is the most electronegative?", options: ["Oxygen", "Chlorine", "Fluorine", "Nitrogen"], answer: "Fluorine" },
                { id: 8, question: "The oxidation state of Oxygen in H2O is?", options: ["0", "+1", "-1", "-2"], answer: "-2" },
                { id: 9, question: "Bond angle in CH4 (Methane) is?", options: ["90°", "120°", "180°", "109.5°"], answer: "109.5°" },
                { id: 10, question: "Mass of one mole of Oxygen gas (O2) is?", options: ["16g", "32g", "8g", "48g"], answer: "32g" },
                { id: 11, question: "Which gas is released during the reaction of Zinc with HCl?", options: ["Oxygen", "Hydrogen", "Chlorine", "Nitrogen"], answer: "Hydrogen" },
                { id: 12, question: "What is the shape of a NH3 (Ammonia) molecule?", options: ["Linear", "Tetrahedral", "Pyramidal", "Bent"], answer: "Pyramidal" },
                { id: 13, question: "Process of losing electrons is called?", options: ["Reduction", "Oxidation", "Hydrogenation", "Hydration"], answer: "Oxidation" },
                { id: 14, question: "Unit of molarity is?", options: ["mol/kg", "mol/L", "g/L", "no unit"], answer: "mol/L" },
                { id: 15, question: "Identify the noble gas:", options: ["Oxygen", "Hydrogen", "Helium", "Chlorine"], answer: "Helium" },
                { id: 16, question: "Hybridization of Carbon in Ethane is?", options: ["sp", "sp2", "sp3", "dsp2"], answer: "sp3" },
                { id: 17, question: "What is the main component of LPG?", options: ["Methane", "Butane", "Ethane", "Propane"], answer: "Butane" },
                { id: 18, question: "Which catalyst is used in Haber's process?", options: ["Nickel", "Platinum", "Iron", "Vanadium Pentoxide"], answer: "Iron" },
                { id: 19, question: "Value of R (Gas constant) in L·atm/(K·mol)?", options: ["8.314", "0.0821", "1.98", "2.0"], answer: "0.0821" },
                { id: 20, question: "What is the coordinate number of Na+ in NaCl crystal?", options: ["4", "6", "8", "12"], answer: "6" }
            ]
        }
    },
    {
        id: "class-11-12-bio",
        title: "Biology (Class 11-12)",
        category: "Class 11-12",
        description: "Advanced Human Physiology, Genetics, and Biotechnology.",
        duration: "104 Weeks",
        coverImage: '/assets/store/class-11-12-bio.jpg',
        topics: [
            {
                id: "bio-genetics",
                title: "Genetics: Principles of Inheritance",
                subtopics: [
                    {
                        id: "gen-mendel",
                        title: "Mendelian Inheritance",
                        videoUrl: "https://www.youtube.com/embed/Mehz7tCxjSE",
                        theory: "Gregor Mendel, the father of genetics, discovered the laws of inheritance through pea plant experiments. His laws include Dominance, Segregation, and Independent Assortment.",
                        text: "Genetic principles...",
                        mcqs: [
                            { q: "Who is the Father of Genetics?", options: ["A) Darwin", "B) Mendel", "C) Watson", "D) Crick"], a: "B" },
                            { q: "The physical appearance of an organism is?", options: ["A) Genotype", "B) Phenotype", "C) Allele", "D) Hybrid"], a: "B" },
                            { q: "A cross between two tall plants (Tt x Tt) results in?", options: ["A) All tall", "B) All dwarf", "C) 3:1 ratio", "D) 1:1 ratio"], a: "C" },
                            { q: "Alleles are different forms of a ___?", options: ["A) Cell", "B) Protein", "C) Gene", "D) Chromosome"], a: "C" },
                            { q: "Law of Segregation applies during ___?", options: ["A) Mitosis", "B) Meiosis", "C) Fertilization", "D) Mutation"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Senior Biology Core Exam",
            passingScore: 80,
            questions: [
                { id: 1, question: "Units of heredity are?", options: ["Cells", "Proteins", "Genes", "Chromosomes"], answer: "Genes" },
                { id: 2, question: "Who is known as the Father of Genetics?", options: ["Darwin", "Mendel", "Watson", "Morgan"], answer: "Mendel" },
                { id: 3, question: "The physical appearance of an organism is called?", options: ["Genotype", "Phenotype", "Allele", "Homotype"], answer: "Phenotype" },
                { id: 4, question: "How many chromosomes are in a normal human cell?", options: ["23", "44", "46", "48"], answer: "46" },
                { id: 5, question: "Powerhouse of the cell is?", options: ["Golgi Body", "Mitochondria", "Ribosome", "Lysosome"], answer: "Mitochondria" },
                { id: 6, question: "Process of copying DNA to RNA is?", options: ["Translation", "Transcription", "Replication", "Mutation"], answer: "Transcription" },
                { id: 7, question: "Main site of photosynthesis in plants?", options: ["Stem", "Root", "Leaf", "Flower"], answer: "Leaf" },
                { id: 8, question: "Blood group 'O' is known as?", options: ["Universal Donor", "Universal Acceptor", "Rare group", "Common group"], answer: "Universal Donor" },
                { id: 9, question: "The largest gland in human body is?", options: ["Pancreas", "Thyroid", "Liver", "Pituitary"], answer: "Liver" },
                { id: 10, question: "Which plant hormone is responsible for fruit ripening?", options: ["Auxin", "Gibberellin", "Ethylene", "Cytokinin"], answer: "Ethylene" },
                { id: 11, question: "Study of fungi is called?", options: ["Phycology", "Mycology", "Virology", "Bacteriology"], answer: "Mycology" },
                { id: 12, question: "What is the genetic material in most viruses?", options: ["DNA", "RNA", "Both", "Either DNA or RNA"], answer: "Either DNA or RNA" },
                { id: 13, question: "Double helix model of DNA was given by?", options: ["Mendel", "Darwin", "Watson & Crick", "Bohr"], answer: "Watson & Crick" },
                { id: 14, question: "Human heart has how many chambers?", options: ["2", "3", "4", "5"], answer: "4" },
                { id: 15, question: "Which vitamin is synthesized in skin by sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: "Vitamin D" },
                { id: 16, question: "Universal recipient blood group is?", options: ["O+", "A+", "B+", "AB+"], answer: "AB+" },
                { id: 17, question: "Structural and functional unit of kidney?", options: ["Neuron", "Nephron", "Alveoli", "Villi"], answer: "Nephron" },
                { id: 18, question: "The 'suicidal bags' of the cell are?", options: ["Ribosomes", "Lysosomes", "Vacuoles", "Nucleus"], answer: "Lysosomes" },
                { id: 19, question: "Function of RBCs is to transport?", options: ["Urea", "Carbon dioxide", "Oxygen", "Hormones"], answer: "Oxygen" },
                { id: 20, question: "Which organ is affected by Hepatitis?", options: ["Heart", "Lungs", "Liver", "Kidney"], answer: "Liver" }
            ]
        }
    },
    {
        id: "neet-biology",
        title: "NEET Biology Masterclass",
        category: "NEET",
        description: "Master the entire NEET Biology syllabus with expert lectures focused on NCERT concepts and previous year questions.",
        duration: "40 Weeks",
        coverImage: '/assets/store/neet-biology.jpg',
        topics: [
            {
                id: "neet-cell",
                title: "Cell Structure & Function",
                subtopics: [
                    {
                        id: "cell-theory",
                        title: "Cell Theory & Foundations",
                        videoUrl: "https://www.youtube.com/embed/nU5pS0R1Sfs",
                        theory: "Cell theory is a fundamental biological principle stating that cells are the basic unit of life.",
                        text: `
**Cell Theory Foundations**
1. Cell theory is a fundamental biological principle stating that cells are the basic unit of life.
2. Its development began with early microscopic observations.
3. Robert Hooke (1665) first coined the term "cell" after observing cork's honeycomb structure.
4. Anton van Leeuwenhoek later observed living microorganisms.
5. Matthias Schleiden proposed that all plants are composed of cells.
6. Theodor Schwann extended this to animals in 1839.
7. All living organisms are composed of one or more cells.
8. The cell is the basic structural and functional unit.
9. Rudolf Virchow added: "Omnis cellula e cellula," cells arise from pre-existing cells.
10. Energy flow (metabolism) occurs within cells.
11. Cells contain hereditary information (DNA) passed during division.
12. Activity of an organism depends on the total activity of independent cells.
13. Viruses are a major exception to universal cell theory.
14. Nucleus is the control center housing genetic material.
15. Nuclear envelope regulates molecular movement.
16. Nucleolus is responsible for rRNA synthesis.
17. Endoplasmic Reticulum divides cell into luminal and extraluminal compartments.
18. Rough ER is involved in protein synthesis and folding.
19. Smooth ER handles lipid synthesis and detoxification.
20. Golgi Apparatus modifies, sorts, and packages proteins.
21. Lysosomes (suicidal bags) contain hydrolytic enzymes.
22. Vacuoles store water, nutrients, and maintain turgor pressure.
23. Ribosomes are the sites of protein synthesis (translation).
24. Mitochondria (powerhouses) generate ATP through respiration.
25. Chloroplasts (in plants) are sites of photosynthesis.
26. Cytoskeleton provides structural support and maintains shape.
27. Centrosomes organize microtubules during animal cell division.
28. Eukaryotic cells have membrane-bound organelles.
29. Prokaryotic cells lack a defined nucleus.
30. The cell membrane is a semi-permeable bilayer.
[Content continues with another 70 lines of detailed organelle functions...]
`
                    }
                ]
            },
            {
                id: "neet-biotech",
                title: "Biotechnology & Its Applications",
                subtopics: [
                    {
                        id: "biotech-principles",
                        title: "Principles of Biotechnology",
                        videoUrl: "https://www.youtube.com/embed/s20R3mDq30U",
                        theory: "Biotechnology deals with techniques of using live organisms or enzymes from organisms to produce products and processes useful to humans.",
                        text: "Biotech principles details...",
                        mcqs: [
                            { q: "DNA ligase is used for?", options: ["A) Cutting DNA", "B) Joining DNA", "C) Denaturing DNA", "D) Synthesizing DNA"], a: "B" },
                            { q: "PCR stands for?", options: ["A) Polymerase Chain Reaction", "B) Protein Chain Reaction", "C) Poly Chain Ratio", "D) Protein Case Ratio"], a: "A" },
                            { q: "Restriction enzymes are called?", options: ["A) Molecular glue", "B) Molecular scissors", "C) Molecular markers", "D) Molecular pumps"], a: "B" },
                            { q: "Plasmids are found in?", options: ["A) Viruses", "B) Bacteria", "C) Fungi", "D) Plants"], a: "B" },
                            { q: "EcoRI is a?", options: ["A) Ligase", "B) Restriction enzyme", "C) Polymerase", "D) Exonuclease"], a: "B" }
                        ]
                    }
                ]
            },
            {
                id: "neet-ecology",
                title: "Ecology and Environment",
                subtopics: [
                    {
                        id: "eco-orgs",
                        title: "Organisms and Populations",
                        videoUrl: "https://www.youtube.com/embed/xZ_E51cK44I",
                        theory: "Ecology is the study of interactions among organisms and between the organism and its physical (abiotic) environment.",
                        text: "Ecology details...",
                        mcqs: [
                            { q: "A group of individuals of same species is?", options: ["A) Community", "B) Population", "C) Ecosystem", "D) Biome"], a: "B" },
                            { q: "Commensalism is (+/0)?", options: ["A) Yes", "B) No", "C) Depends", "D) Mutual"], a: "A" },
                            { q: "Parasitism is (+/-)?", options: ["A) Yes", "B) No", "C) Depends", "D) Mutual"], a: "A" },
                            { q: "Lichens show?", options: ["A) Predation", "B) Mutualism", "C) Parasitism", "D) Competition"], a: "B" },
                            { q: "Competition occurs when?", options: ["A) Resources are limited", "B) Resources are unlimited", "C) No resources", "D) Species are different"], a: "A" }
                        ]
                    }
                ]
            },
            {
                id: "neet-human-health",
                title: "Human Health and Diseases",
                subtopics: [
                    {
                        id: "hh-immune",
                        title: "Immunity and Vaccines",
                        videoUrl: "https://www.youtube.com/embed/-_Xb9N_R6D0",
                        theory: "Health is a state of complete physical, mental and social well-being. Immunity is the ability of the host to fight the disease-causing organisms.",
                        text: "Immunity details...",
                        mcqs: [
                            { q: "WBCs are part of?", options: ["A) Nervous system", "B) Immune system", "C) Circulatory system", "D) Respiratory system"], a: "B" },
                            { q: "Antibodies are produced by?", options: ["A) T-cells", "B) B-cells", "C) RBCs", "D) Platelets"], a: "B" },
                            { q: "Passive immunity is?", options: ["A) Long lasting", "B) Short term", "C) Induced by infection", "D) Slow"], a: "B" },
                            { q: "Vaccines contain?", options: ["A) Live pathogens", "B) Dead/Weakened pathogens", "C) Antibiotics", "D) Hormones"], a: "B" },
                            { q: "AIDS is caused by?", options: ["A) HIV", "B) Bacteria", "C) Fungus", "D) Protozoa"], a: "A" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "NEET Biology Mastery Exam",
            passingScore: 80,
            questions: [
                { id: 1, question: "Who proposed that all cells arise from pre-existing cells?", options: ["Hooke", "Schwann", "Schleiden", "Virchow"], answer: "Virchow" },
                { id: 2, question: "The term 'Biotechnology' was coined by?", options: ["Karl Ereky", "Louis Pasteur", "Alexander Fleming", "Watson"], answer: "Karl Ereky" },
                { id: 3, question: "Which enzyme is known as 'molecular scissors'?", options: ["Ligase", "Polymerase", "Restriction Endonuclease", "Helicase"], answer: "Restriction Endonuclease" },
                { id: 4, question: "PCR is used for?", options: ["DNA synthesis", "DNA amplification", "DNA cutting", "DNA repair"], answer: "DNA amplification" },
                { id: 5, question: "What is the role of DNA ligase in genetic engineering?", options: ["Denaturing DNA", "Joining DNA fragments", "Cutting DNA", "Synthesizing RNA"], answer: "Joining DNA fragments" },
                { id: 6, question: "Plasmids are used as vectors because they?", options: ["Are small", "Can replicate independently", "Are found in bacteria", "All of these"], answer: "All of these" },
                { id: 7, question: "In Bt cotton, the Bt toxin exists as?", options: ["Active toxin", "Protoxin", "Enzyme", "Lipid"], answer: "Protoxin" },
                { id: 8, question: "Which of these is used to produce insulin using biotechnology?", options: ["Yeast", "E. coli", "Rhizopus", "Agrobacterium"], answer: "E. coli" },
                { id: 9, question: "Ecology is the study of?", options: ["Environment", "Ecosystem", "Interactions of organisms & environment", "Global warming"], answer: "Interactions of organisms & environment" },
                { id: 10, question: "Mutualism is an interaction where?", options: ["Both benefit", "One benefits other harmed", "One benefits other unaffected", "Both harmed"], answer: "Both benefit" },
                { id: 11, question: "Relationship between algae and fungi in lichens is?", options: ["Parasitism", "Commensalism", "Mutualism", "Ammensalism"], answer: "Mutualism" },
                { id: 12, question: "Part of the cell that contains hydrolytic enzymes?", options: ["Gogli body", "Lysosome", "Ribosome", "Chloroplast"], answer: "Lysosome" },
                { id: 13, question: "The 'Powerhouse' of the cell is?", options: ["Nucleus", "Ribosome", "Mitochondria", "Centrosome"], answer: "Mitochondria" },
                { id: 14, question: "Which vitamin is found in Golden Rice?", options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"], answer: "Vitamin A" },
                { id: 15, question: "Antibodies are proteins produced by?", options: ["T-cells", "B-cells", "RBCs", "Platelets"], answer: "B-cells" },
                { id: 16, question: "The first clinical gene therapy was given for?", options: ["Cystic fibrosis", "ADA deficiency", "Cancer", "AIDS"], answer: "ADA deficiency" },
                { id: 17, question: "Functional unit of nature is?", options: ["Biosphere", "Ecosystem", "Population", "Biome"], answer: "Ecosystem" },
                { id: 18, question: "Which one of these is a greenhouse gas?", options: ["Methane", "Oxygen", "Nitrogen", "Argon"], answer: "Methane" },
                { id: 19, question: "The pyramid of energy is always?", options: ["Inverted", "Upright", "Spindle shaped", "Horizontal"], answer: "Upright" },
                { id: 20, question: "Ozone hole is largest over?", options: ["Africa", "Antarctica", "Europe", "North Pole"], answer: "Antarctica" }
            ]
        }
    },
    {
        id: "jee-physics",
        title: "JEE Physics: Mechanics & Optics",
        category: "JEE",
        description: "A rigorous deep-dive into Physics for JEE aspirants. Problem-solving techniques for JEE Main & Advanced.",
        duration: "45 Weeks",
        coverImage: '/assets/store/jee-physics.jpg',
        topics: [
            {
                id: "jee-kinematics",
                title: "Kinematics & Dynamics",
                subtopics: [
                    {
                        id: "motion-concepts",
                        title: "Advanced Laws of Motion",
                        videoUrl: "https://www.youtube.com/embed/L9pSnyOaBvY",
                        theory: "Dynamics describes the causes of motion using Newton's laws.",
                        text: `
**JEE Physics: Laws of Motion**
1. Kinematics describes motion without considering causes.
2. Distance is total path length (scalar), Displacement is shortest change in position (vector).
3. Velocity is rate of change of displacement (v = dr/dt).
4. Acceleration is rate of change of velocity (a = dv/dt).
5. Equations of motion apply for constant acceleration: v = u + at.
6. s = ut + 1/2 at² connects displacement and time.
7. v² = u² + 2as connects velocity and displacement.
8. Relative motion: vAB = vA - vB is crucial for intersection problems.
9. Projectile motion has independent horizontal (uniform) and vertical (accelerated) components.
10. Uniform Circular Motion requires centripetal acceleration ac = v²/r.
11. Newton's First Law (Inertia) defines equilibrium.
12. Newton's Second Law: Fnet = ma (for constant mass) or dp/dt.
13. Linear Momentum p = mv is a vector quantity.
14. Newton's Third Law: Action-reaction pairs act on different bodies.
15. Impulse J = FavgΔt results in a change in momentum.
16. Conservation of momentum: Total momentum remains constant in isolated systems.
17. Free Body Diagrams (FBDs) are essential for visualizing forces.
18. Common forces: Weight (mg), Normal force, Tension, and Spring force (-kx).
19. Friction opposes relative motion: fs ≤ μsN (static) and fk = μkN (kinetic).
20. Centripetal force provides the necessary acceleration for circular paths.
21. Work done W = F·d cosθ is a scalar product.
22. Power is the rate of work done (P = dW/dt).
23. Conservative forces preserve mechanical energy.
24. Non-conservative forces (like friction) dissipate energy as heat.
25. Torque is the tendency of a force to rotate an object.
26. Moment of Inertia is the rotational equivalent of mass.
[Content continues with another 74 lines of mechanics proof and derivations...]
`
                    }
                ]
            },
            {
                id: "jee-electrostatics",
                title: "Electrostatics & Capacitance",
                subtopics: [
                    {
                        id: "elec-coulomb",
                        title: "Coulomb's Law & Electric Fields",
                        videoUrl: "https://www.youtube.com/embed/Yf9pZ5wXhR4",
                        theory: "Electrostatics deals with the study of stationary electric charges. Coulomb's Law states that the force between two point charges is proportional to the product of their charges.",
                        text: "Electrostatics details...",
                        mcqs: [
                            { q: "Force between charges is proportional to?", options: ["A) Sum", "B) Difference", "C) Product", "D) Ratio"], a: "C" },
                            { q: "Unit of electric charge is?", options: ["A) Volt", "B) Ampere", "C) Coulomb", "D) Ohm"], a: "C" },
                            { q: "Direction of electric field from positive charge is?", options: ["A) Inwards", "B) Outwards", "C) Circular", "D) No direction"], a: "B" },
                            { q: "Capacitance is measured in?", options: ["A) Henry", "B) Farad", "C) Tesla", "D) Weber"], a: "B" },
                            { q: "Dielectric medium ___ capacitance?", options: ["A) Decreases", "B) Increases", "C) Keeps same", "D) Zeroes"], a: "B" }
                        ]
                    }
                ]
            },
            {
                id: "jee-optics",
                title: "Ray Optics & Optical Instruments",
                subtopics: [
                    {
                        id: "optics-reflection",
                        title: "Reflection & Refraction",
                        videoUrl: "https://www.youtube.com/embed/vV_xU5w2n8c",
                        theory: "Optics involves the study of light. Reflection is the bouncing of light, while refraction is the bending of light as it passes from one medium to another.",
                        text: "Optics details...",
                        mcqs: [
                            { q: "Bending of light is called?", options: ["A) Reflection", "B) Refraction", "C) Diffraction", "D) Polarization"], a: "B" },
                            { q: "Snell's Law relates to?", options: ["A) Reflection", "B) Refraction", "C) Interference", "D) Scattering"], a: "B" },
                            { q: "Light travels fastest in?", options: ["A) Glass", "B) Water", "C) Vacuum", "D) Air"], a: "C" },
                            { q: "Type of lens in human eye?", options: ["A) Concave", "B) Convex", "C) Cylindrical", "D) Bifocal"], a: "B" },
                            { q: "Total internal reflection occurs at ___ angle?", options: ["A) Acute", "B) Critical", "C) Right", "D) Zero"], a: "B" }
                        ]
                    }
                ]
            },
            {
                id: "jee-modern-physics",
                title: "Modern Physics: Atoms & Nuclei",
                subtopics: [
                    {
                        id: "modern-dual",
                        title: "Dual Nature of Matter & Radiation",
                        videoUrl: "https://www.youtube.com/embed/yYk4v2K4k6M",
                        theory: "Modern physics includes the study of sub-atomic particles. Einstein's photoelectric effect proved the particle nature of light.",
                        text: "Modern physics details...",
                        mcqs: [
                            { q: "Who proposed E=mc²?", options: ["A) Newton", "B) Einstein", "C) Bohr", "D) Planck"], a: "B" },
                            { q: "Light as a particle is called?", options: ["A) Proton", "B) Neutron", "C) Photon", "D) Electron"], a: "C" },
                            { q: "Nucleus contains protons and?", options: ["A) Electrons", "B) Neutrons", "C) Photons", "D) Positrons"], a: "B" },
                            { q: "Isotopes have same number of?", options: ["A) Neutrons", "B) Protons", "C) Electrons", "D) Both B & C"], a: "D" },
                            { q: "Radioactivity unit is?", options: ["A) Curie", "B) Becquerel", "C) Roentgen", "D) Both A & B"], a: "D" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "JEE Physics Qualification Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "What is the centripetal acceleration of an object in circular motion?", options: ["v/r", "v^2/r", "r/v^2", "m*v^2"], answer: "v^2/r" },
                { id: 2, question: "A projectile is fired at 45°. The ratio of max height to range is?", options: ["1:1", "1:2", "1:4", "2:1"], answer: "1:4" },
                { id: 3, question: "Dimensional formula for Gravitational Constant (G) is?", options: ["[M-1L3T-2]", "[ML2T-2]", "[M-1L2T-2]", "[ML3T-2]"], answer: "[M-1L3T-2]" },
                { id: 4, question: "Gauss's Law relates electric flux to?", options: ["Field", "Enclosed charge", "Potential", "Distance"], answer: "Enclosed charge" },
                { id: 5, question: "The work done by a conservative force depends on?", options: ["Path", "Endpoint positions", "Velocity", "Time"], answer: "Endpoint positions" },
                { id: 6, question: "Formula for Torque is?", options: ["F x d", "r x F", "m x a", "v / r"], answer: "r x F" },
                { id: 7, question: "Moment of inertia of a ring about its axis is?", options: ["MR^2", "1/2 MR^2", "2/5 MR^2", "1/4 MR^2"], answer: "MR^2" },
                { id: 8, question: "Value of escape velocity on Earth is?", options: ["9.8 km/s", "11.2 km/s", "7.9 km/s", "42 km/s"], answer: "11.2 km/s" },
                { id: 9, question: "SI unit of Electric Potential is?", options: ["Joule", "Coulomb", "Volt", "Ampere"], answer: "Volt" },
                { id: 10, question: "Capacitance of a parallel plate capacitor is?", options: ["ε0A/d", "ε0d/A", "Ad/ε0", "Q/V"], answer: "ε0A/d" },
                { id: 11, question: "Potential energy of a dipole in electric field is?", options: ["-p·E", "p·E", "p x E", "p/E"], answer: "-p·E" },
                { id: 12, question: "Index of refraction is n = ?", options: ["c/v", "v/c", "sin r / sin i", "λ/f"], answer: "c/v" },
                { id: 13, question: "Total internal reflection occurs when angle of incidence is?", options: ["< Critical angle", "> Critical angle", "90°", "0°"], answer: "> Critical angle" },
                { id: 14, question: "Energy of a photon is?", options: ["h/f", "hf", "h/λ", "mc"], answer: "hf" },
                { id: 15, question: "De Broglie wavelength is λ = ?", options: ["h/p", "p/h", "mc^2", "hf"], answer: "h/p" },
                { id: 16, question: "Half-life of a radioactive substance is T1/2 = ?", options: ["ln2 / λ", "λ / ln2", "1 / λ", "t / 2"], answer: "ln2 / λ" },
                { id: 17, question: "An ideal voltmeter has resistance?", options: ["Zero", "Infinite", "1000 Ohms", "1 Ohm"], answer: "Infinite" },
                { id: 18, question: "Magnetic force on a moving charge is?", options: ["qE", "q(v x B)", "qvB sinθ", "Both B and C"], answer: "Both B and C" },
                { id: 19, question: "According to Lens's law, induced current opposes?", options: ["Flux", "Change in flux", "Resistance", "Magnetic field"], answer: "Change in flux" },
                { id: 20, question: "Power in an AC circuit is P = ?", options: ["VI", "VI cosφ", "I^2R", "Both B and C"], answer: "Both B and C" }
            ]
        }
    },
    {
        id: "pg-data-science",
        title: "PG Diploma in Data Science",
        category: "PG Courses",
        description: "Advanced postgraduate modules on Machine Learning, AI, and Big Data Analytics for career acceleration.",
        duration: "2 Years",
        coverImage: '/assets/store/pg-data-science.jpg',
        topics: [
            {
                id: "pg-ds-ml",
                title: "Machine Learning Basics",
                subtopics: [
                    {
                        id: "ml-intro-1",
                        title: "Linear Regression",
                        videoUrl: "https://www.youtube.com/embed/P8hT5nZ7T98",
                        theory: "Linear regression is a linear approach for modelling the relationship between a scalar response and one or more explanatory variables.",
                        text: "Detailed content for Machine Learning..."
                    }
                ]
            }
        ],
        assessment: {
            title: "PG Data Science Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "What type of regression models relationships using a straight line?", options: ["Linear", "Logistic", "Polynomial", "Ridge"], answer: "Linear" },
                { id: 2, question: "A technique used for classification into two categories?", options: ["Linear Regression", "Logistic Regression", "K-Means", "PCA"], answer: "Logistic Regression" },
                { id: 3, question: "What does 'unsupervised learning' mean?", options: ["Learning with labels", "Learning without labels", "Learning with past data", "Learning with reinforcement"], answer: "Learning without labels" },
                { id: 4, question: "K-Means is a ___ algorithm?", options: ["Classification", "Regression", "Clustering", "Dimensionality Reduction"], answer: "Clustering" },
                { id: 5, question: "What does PCA stand for?", options: ["Primary Component Analysis", "Principal Component Analysis", "Path Component Analysis", "Python Code Analysis"], answer: "Principal Component Analysis" },
                { id: 6, question: "Which library is used for data manipulation in Python?", options: ["Matplotlib", "Pandas", "Scikit-Learn", "NLTK"], answer: "Pandas" },
                { id: 7, question: "The process of cleaning data is called?", options: ["Data Mining", "Data Wrangling", "Data Science", "Data Modeling"], answer: "Data Wrangling" },
                { id: 8, question: "Standard Deviation is a measure of?", options: ["Central tendency", "Dispersion", "Correlation", "Frequency"], answer: "Dispersion" },
                { id: 9, question: "What is an 'outlier' in a dataset?", options: ["Normal data point", "Extreme data point", "Missing value", "Average value"], answer: "Extreme data point" },
                { id: 10, question: "The 'f1-score' combines precision and?", options: ["Accuracy", "Sensitivity", "Recall", "Specificity"], answer: "Recall" },
                { id: 11, question: "Overfitting happens when a model is?", options: ["Too simple", "Too complex", "Just right", "Data is missing"], answer: "Too complex" },
                { id: 12, question: "Which algorithm uses a 'kernel trick'?", options: ["Random Forest", "SVM", "Naive Bayes", "KNN"], answer: "SVM" },
                { id: 13, question: "Naive Bayes is based on which theorem?", options: ["Pythagoras", "Bayes", "Central Limit", "Taylor"], answer: "Bayes" },
                { id: 14, question: "The 'root' node is found in which structure?", options: ["Queue", "Stack", "Decision Tree", "Linked List"], answer: "Decision Tree" },
                { id: 15, question: "Which phase of CRISP-DM comes first?", options: ["Data Preparation", "Modeling", "Business Understanding", "Evaluation"], answer: "Business Understanding" },
                { id: 16, question: "A 'p-value' < 0.05 usually indicates?", options: ["Statistical significance", "No significance", "Data error", "Random result"], answer: "Statistical significance" },
                { id: 17, question: "What is 'Big Data' characterized by?", options: ["Volume", "Velocity", "Variety", "All of these"], answer: "All of these" },
                { id: 18, question: "SQL stands for?", options: ["Standard Query Language", "Structured Query Language", "Simple Query Language", "Strong Query Language"], answer: "Structured Query Language" },
                { id: 19, question: "Mean, Median, and Mode are measures of?", options: ["Dispersion", "Center", "Shape", "Size"], answer: "Center" },
                { id: 20, question: "Natural Language Processing (NLP) is for?", options: ["Images", "Audio", "Text", "Numbers"], answer: "Text" }
            ]
        }
    },
    {
        id: "ug-btech",
        title: "B.Tech (Information Technology)",
        category: "UG Courses",
        description: "Engineering principles applied to software and systems.",
        coverImage: '/assets/store/ug-btech.jpg',
        topics: [
            {
                id: "btech-networking",
                title: "Computer Networks",
                subtopics: [
                    {
                        id: "net-osi",
                        title: "The OSI Model",
                        videoUrl: "https://www.youtube.com/embed/n2D1o-aM-2s",
                        theory: "The Open Systems Interconnection (OSI) model describes seven layers that computer systems use to communicate over a network.",
                        text: "OSI Model details...",
                        mcqs: [
                            { q: "How many layers are in the OSI model?", options: ["A) 5", "B) 6", "C) 7", "D) 8"], a: "C" },
                            { q: "Which layer is responsible for routing?", options: ["A) Physical", "B) Data Link", "C) Network", "D) Transport"], a: "C" },
                            { q: "IP addresses function at which layer?", options: ["A) Layer 2", "B) Layer 3", "C) Layer 4", "D) Layer 7"], a: "B" },
                            { q: "HTTP is an example of which layer?", options: ["A) Network", "B) Transport", "C) Application", "D) Session"], a: "C" },
                            { q: "Data Link layer deals with ___?", options: ["A) Packets", "B) Frames", "C) Bits", "D) Segments"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "B.Tech IT Core Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "Layer 3 of OSI is?", options: ["Data Link", "Network", "Transport", "Session"], answer: "Network" },
                { id: 2, question: "What is the full form of IP?", options: ["Internet Protocol", "Internal Process", "Intranat Path", "Information Port"], answer: "Internet Protocol" },
                { id: 3, question: "Which protocol is used for email transfer?", options: ["HTTP", "FTP", "SMTP", "TCP"], answer: "SMTP" },
                { id: 4, question: "IP address 192.168.1.1 is in which class?", options: ["Class A", "Class B", "Class C", "Class D"], answer: "Class C" },
                { id: 5, question: "Function of a Router is to connect?", options: ["Same networks", "Different networks", "Server to client", "User to OS"], answer: "Different networks" },
                { id: 6, question: "Which layer in OSI is responsible for error-free delivery?", options: ["Application", "Presentation", "Transport", "Network"], answer: "Transport" },
                { id: 7, question: "MAC address belongs to which layer?", options: ["Physical", "Data Link", "Network", "Session"], answer: "Data Link" },
                { id: 8, question: "HTTP port number is?", options: ["21", "25", "80", "443"], answer: "80" },
                { id: 9, question: "A collection of 8 bits is called?", options: ["Nibble", "Byte", "Word", "Packet"], answer: "Byte" },
                { id: 10, question: "What is the heart of Computer System?", options: ["Monitor", "Mouse", "CPU", "Keyboard"], answer: "CPU" },
                { id: 11, question: "Primary memory is?", options: ["HDD", "SSD", "RAM", "DVD"], answer: "RAM" },
                { id: 12, question: "Which is an operating system?", options: ["Chrome", "Python", "Linux", "Oracle"], answer: "Linux" },
                { id: 13, question: "Full form of SQL?", options: ["Simple Query Link", "Structured Query Language", "Short Queue List", "Soft Query Logic"], answer: "Structured Query Language" },
                { id: 14, question: "A primary key must be?", options: ["Null", "Unique", "Duplicate", "Foreign"], answer: "Unique" },
                { id: 15, question: "In OOP, 'Poly' means?", options: ["One", "Many", "None", "All"], answer: "Many" },
                { id: 16, question: "Software testing phase comes after?", options: ["Analysis", "Design", "Coding", "Deployment"], answer: "Coding" },
                { id: 17, question: "Which is a cloud service provider?", options: ["AWS", "HTML", "TCP", "BIOS"], answer: "AWS" },
                { id: 18, question: "Binary system uses base?", options: ["2", "8", "10", "16"], answer: "2" },
                { id: 19, question: "Which is a markup language?", options: ["C++", "Java", "HTML", "PHP"], answer: "HTML" },
                { id: 20, question: "Compiler translates source code to?", options: ["Text", "Machine code", "Design", "Images"], answer: "Machine code" }
            ]
        }
    },
    {
        id: "pg-mba",
        title: "MBA (Business Strategy)",
        category: "PG Courses",
        coverImage: '/assets/store/pg-mba.jpg',
        topics: [
            {
                id: "mba-finance",
                title: "Financial Management",
                subtopics: [
                    {
                        id: "fin-basics",
                        title: "Risk & Return",
                        videoUrl: "https://www.youtube.com/embed/aG0K06n020g",
                        theory: "Finance involves the study of money and investments. Risk-return tradeoff is the principle that potential return rises with an increase in risk. Diversification helps manage this risk.",
                        text: "Financial principles...",
                        mcqs: [
                            { q: "What is the relationship between risk and return?", options: ["A) Inverse", "B) Direct", "C) None", "D) Negative"], a: "B" },
                            { q: "Diversification helps to ___ risk?", options: ["A) Increase", "B) Eliminate", "C) Reduce", "D) Ignore"], a: "C" },
                            { q: "Which of these is a low-risk investment?", options: ["A) Stocks", "B) Crypto", "C) T-Bills", "D) Junk Bonds"], a: "C" },
                            { q: "ROI stands for?", options: ["A) Risk on Interest", "B) Return on Investment", "C) Revenue of Income", "D) Real Option Index"], a: "B" },
                            { q: "Capital budgeting is for ___?", options: ["A) Short term", "B) Long term", "C) Daily sales", "D) Monthly rent"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "MBA Strategy Certification",
            passingScore: 75,
            questions: [
                { id: 1, question: "SWOT stands for Strengths, Weaknesses, Opportunities and?", options: ["Stability", "Strength", "Threats", "Treats"], answer: "Threats" },
                { id: 2, question: "What is the primary goal of Financial Management?", options: ["Profit Maximization", "Wealth Maximization", "Sales Maximization", "Cost Minimization"], answer: "Wealth Maximization" },
                { id: 3, question: "Diversification helps to reduce which type of risk?", options: ["Systematic", "Unsystematic", "Market", "Interest Rate"], answer: "Unsystematic" },
                { id: 4, question: "ROI stands for?", options: ["Return on Investment", "Risk on Interest", "Revenue over Income", "Real Option Index"], answer: "Return on Investment" },
                { id: 5, question: "The '4 Ps' of Marketing are Product, Price, Place and?", options: ["Purpose", "Promotion", "Process", "People"], answer: "Promotion" },
                { id: 6, question: "Porter's Five Forces model is used for?", options: ["Marketing", "HR", "Industry Analysis", "Accounting"], answer: "Industry Analysis" },
                { id: 7, question: "Capital Budgeting is a process of?", options: ["Short-term planning", "Long-term planning", "Daily operations", "Inventory check"], answer: "Long-term planning" },
                { id: 8, question: "What is 'Brand Equity'?", options: ["Brand's debt", "Brand's value", "Brand's name", "Brand's owner"], answer: "Brand's value" },
                { id: 9, question: "Just-In-Time (JIT) is a strategy for?", options: ["Marketing", "Finance", "Inventory Management", "HR"], answer: "Inventory Management" },
                { id: 10, question: "A 'Unicorn' startup has a valuation of over?", options: ["$100 Million", "$500 Million", "$1 Billion", "$10 Billion"], answer: "$1 Billion" },
                { id: 11, question: "Supply Chain Management involves?", options: ["Production only", "Sales only", "Flow of goods/services", "Hiring only"], answer: "Flow of goods/services" },
                { id: 12, question: "What is a 'Stakeholder'?", options: ["Only shareholders", "Only employees", "Anyone affected by business", "The government"], answer: "Anyone affected by business" },
                { id: 13, question: "BCG Matrix categories include Stars, Dogs, Cash Cows and?", options: ["Question Marks", "Exclamation Points", "Arrows", "Bulls"], answer: "Question Marks" },
                { id: 14, question: "Blue Ocean Strategy refers to?", options: ["Red ocean competition", "Uncontested market space", "Deep sea mining", "Naval strategy"], answer: "Uncontested market space" },
                { id: 15, question: "Ethical behavior in business is part of?", options: ["CSR", "ROI", "KPI", "SEO"], answer: "CSR" },
                { id: 16, question: "Who is known as the father of Scientific Management?", options: ["Peter Drucker", "F.W. Taylor", "Henry Fayol", "Adam Smith"], answer: "F.W. Taylor" },
                { id: 17, question: "A 'Balance Sheet' reports?", options: ["Revenue & Expenses", "Assets & Liabilities", "Cash Flow", "Owner's salary"], answer: "Assets & Liabilities" },
                { id: 18, question: "PESTEL analysis stands for Political, Economic, Social, Technological, Environmental and?", options: ["Linear", "Legal", "Local", "Logic"], answer: "Legal" },
                { id: 19, question: "Customer Relationship Management (CRM) is for?", options: ["Managing employees", "Managing customer data", "Managing cash", "Managing social media"], answer: "Managing customer data" },
                { id: 20, question: "Organizational Culture refers to?", options: ["Office building", "Shared values & beliefs", "Employee salaries", "Product design"], answer: "Shared values & beliefs" }
            ]
        }
    },
    {
        id: "class-6-10-cs",
        title: "Computer Science (Class 6-10)",
        category: "Class 6-10",
        description: "Introduction to coding, logic, and digital literacy.",
        duration: "52 Weeks",
        coverImage: '/assets/store/ug-btech.jpg',
        topics: [
            {
                id: "cs-coding",
                title: "Introduction to Programming",
                subtopics: [
                    {
                        id: "cod-algs",
                        title: "Algorithms & Flowcharts",
                        videoUrl: "https://www.youtube.com/embed/8maeSJC796Q",
                        theory: "An algorithm is a step-by-step procedure to solve a problem. Flowcharts are graphical representations of these algorithms using standard symbols like diamonds for decisions.",
                        text: "Programming logic basics...",
                        mcqs: [
                            { q: "A step-by-step solution is called?", options: ["A) Program", "B) Logic", "C) Algorithm", "D) Code"], a: "C" },
                            { q: "Which symbol represents a decision in flowcharts?", options: ["A) Rectangle", "B) Circle", "C) Diamond", "D) Oval"], a: "C" },
                            { q: "Start/Stop is represented by ___?", options: ["A) Square", "B) Oval", "C) Triangle", "D) Hexagon"], a: "B" },
                            { q: "Sequence of instructions is a ___?", options: ["A) Manual", "B) Program", "C) Flow", "D) Input"], a: "B" },
                            { q: "Input/Output symbol is?", options: ["A) Parallelogram", "B) Square", "C) Arrow", "D) Cloud"], a: "A" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Junior CS Excellence Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "Decision symbol in flowchart is?", options: ["Circle", "Diamond", "Square", "Arrow"], answer: "Diamond" },
                { id: 2, question: "A step-by-step procedure to solve a problem is?", options: ["Software", "Algorithm", "Code", "Data"], answer: "Algorithm" },
                { id: 3, question: "Full form of RAM?", options: ["Read Access Memory", "Random Access Memory", "Run Action Mode", "Rapid Area Memory"], answer: "Random Access Memory" },
                { id: 4, question: "1 kilobyte is equal to how many bytes?", options: ["100", "512", "1000", "1024"], answer: "1024" },
                { id: 5, question: "Brains of the computer is?", options: ["Hard Disk", "Monitor", "CPU", "Motherboard"], answer: "CPU" },
                { id: 6, question: "Input device among these is?", options: ["Printer", "Monitor", "Mouse", "Speaker"], answer: "Mouse" },
                { id: 7, question: "Which symbol starts/ends a flowchart?", options: ["Square", "Oval", "Diamond", "Rectangle"], answer: "Oval" },
                { id: 8, question: "WWW stands for?", options: ["World Wide Web", "World Web Wrap", "Wide World Web", "Web Wide World"], answer: "World Wide Web" },
                { id: 9, question: "URL stands for?", options: ["Uniform Resource Locator", "Universal Road Link", "United Resource List", "Unique Role Logic"], answer: "Uniform Resource Locator" },
                { id: 10, question: "Short-cut key for 'Copy' is?", options: ["Ctrl+X", "Ctrl+V", "Ctrl+C", "Ctrl+Z"], answer: "Ctrl+C" },
                { id: 11, question: "Operating System is an example of?", options: ["Firmware", "Application Software", "System Software", "Hardware"], answer: "System Software" },
                { id: 12, question: "A set of instructions given to a computer is?", options: ["Data", "Information", "Program", "Output"], answer: "Program" },
                { id: 13, question: "Which is a permanent storage device?", options: ["RAM", "Cache", "Hard Disk", "Registers"], answer: "Hard Disk" },
                { id: 14, question: "GUI stands for?", options: ["General User Interface", "Graphical User Interface", "Global Unit Interface", "Gaming User Item"], answer: "Graphical User Interface" },
                { id: 15, question: "Binary digits are?", options: ["0 and 1", "1 to 10", "A to Z", "All of these"], answer: "0 and 1" },
                { id: 16, question: "Pixels are related to?", options: ["Sound", "Screen Resolution", "Storage", "Speed"], answer: "Screen Resolution" },
                { id: 17, question: "A computer on a network is called a?", options: ["Server", "Node", "Hub", "Switch"], answer: "Node" },
                { id: 18, question: "Malicious software is called?", options: ["Firmware", "Malware", "Hardware", "Freeware"], answer: "Malware" },
                { id: 19, question: "Which company developed Windows OS?", options: ["Apple", "Google", "Microsoft", "IBM"], answer: "Microsoft" },
                { id: 20, question: "Short-cut key to 'Undo' is?", options: ["Ctrl+U", "Ctrl+Y", "Ctrl+Z", "Ctrl+N"], answer: "Ctrl+Z" }
            ]
        }
    },
    {
        id: "class-11-12-econ",
        title: "Economics (Class 11-12)",
        category: "Class 11-12",
        description: "Micro and Macro Economics for senior students.",
        duration: "104 Weeks",
        coverImage: '/assets/store/pg-mba.jpg',
        topics: [
            {
                id: "econ-micro",
                title: "Microeconomics: Demand & Supply",
                subtopics: [
                    {
                        id: "dem-law",
                        title: "The Law of Demand",
                        videoUrl: "https://www.youtube.com/embed/LwLh6ax0zTE",
                        theory: "The Law of Demand states that, other things being equal, as the price of a good increases, the quantity demanded decreases. This inverse relationship is fundamental to market behavior.",
                        text: "Economic theory details...",
                        mcqs: [
                            { q: "Relationship between price and demand is?", options: ["A) Direct", "B) Inverse", "C) Neutral", "D) Constant"], a: "B" },
                            { q: "If price falls, demand usually ___?", options: ["A) Falls", "B) Stays same", "C) Rises", "D) Fluctuates"], a: "C" },
                            { q: "Which curve slopes downwards?", options: ["A) Supply", "B) Demand", "C) Cost", "D) Revenue"], a: "B" },
                            { q: "Exception to Law of Demand is?", options: ["A) Luxury goods", "B) Giffen goods", "C) Normal goods", "D) Both A & B"], a: "D" },
                            { q: "What shifts the demand curve?", options: ["A) Price", "B) Income", "C) Quantity", "D) Supply"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "Senior Economics Core Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "Demand curve slopes?", options: ["Upwards", "Downwards", "Horizontal", "Vertical"], answer: "Downwards" },
                { id: 2, question: "Law of Demand shows relationship between?", options: ["Price and Supply", "Price and Demand", "Income and Tax", "Demand and Supply"], answer: "Price and Demand" },
                { id: 3, question: "What is Macroeconomics?", options: ["Study of individual", "Study of the whole economy", "Study of firm", "Study of household"], answer: "Study of the whole economy" },
                { id: 4, question: "Father of Economics is?", options: ["Keynes", "Adam Smith", "Marshall", "Robbins"], answer: "Adam Smith" },
                { id: 5, question: "GDP stands for?", options: ["Gross Domestic Price", "Gross Domestic Product", "Global Domestic Product", "General Data Product"], answer: "Gross Domestic Product" },
                { id: 6, question: "When price rises, supply usually?", options: ["Falls", "Stays same", "Rises", "Ends"], answer: "Rises" },
                { id: 7, question: "Inflation means?", options: ["Persistent rise in prices", "Fall in prices", "Steady prices", "No money"], answer: "Persistent rise in prices" },
                { id: 8, question: "In a 'Perfect Competition', there are?", options: ["Single seller", "Two sellers", "Many sellers", "No sellers"], answer: "Many sellers" },
                { id: 9, question: "Monopoly means?", options: ["Many sellers", "Few sellers", "Single seller", "Two sellers"], answer: "Single seller" },
                { id: 10, question: "Opportunity cost is?", options: ["Actual cost", "Sunk cost", "Value of next best alternative", "Future cost"], answer: "Value of next best alternative" },
                { id: 11, question: "Central Bank of India is?", options: ["SBI", "ICICI", "RBI", "HDFC"], answer: "RBI" },
                { id: 12, question: "Direct tax among these is?", options: ["GST", "Excise Duty", "Income Tax", "Sales Tax"], answer: "Income Tax" },
                { id: 13, question: "Human Development Index (HDI) was developed by?", options: ["Adam Smith", "Mahbub ul Haq", "Amartya Sen", "Both B & C"], answer: "Both B & C" },
                { id: 14, question: "What is a 'Ceteris Paribus' assumption?", options: ["Price changes", "Other things being equal", "No taxes", "Free market"], answer: "Other things being equal" },
                { id: 15, question: "Fiscal Policy is related to?", options: ["Interest rates", "Govt revenue and expenditure", "Stock market", "Money supply"], answer: "Govt revenue and expenditure" },
                { id: 16, question: "Utility in economics means?", options: ["Usefulness", "Satisfaction derived", "Work done", "Price paid"], answer: "Satisfaction derived" },
                { id: 17, question: "Who gave the definition of Economics as 'Scarcity'?", options: ["Adam Smith", "Alfred Marshall", "Lionel Robbins", "Samuelson"], answer: "Lionel Robbins" },
                { id: 18, question: "Mixed economy is a combination of?", options: ["Public and Private sectors", "Local and Foreign sectors", "Farming and Mining", "Cash and Credit"], answer: "Public and Private sectors" },
                { id: 19, question: "Balance of Trade is?", options: ["Exports minus Imports", "Taxes minus Spending", "Gold minus Silver", "Cash minus Debt"], answer: "Exports minus Imports" },
                { id: 20, question: "Consumer equilibrium occurs when?", options: ["Price is low", "MU is zero", "MUx/Px = MUy/Py", "Income is high"], answer: "MUx/Px = MUy/Py" }
            ]
        }
    },
    {
        id: "ug-bcom",
        title: "B.Com (Business Accounting)",
        category: "UG Courses",
        description: "Fundamentals of accounting, commerce, and trade.",
        coverImage: '/assets/store/ug-bcom.jpg',
        topics: [
            {
                id: "bcom-acc",
                title: "Financial Accounting",
                subtopics: [
                    {
                        id: "acc-double",
                        title: "Double Entry System",
                        videoUrl: "https://www.youtube.com/embed/yYyHGWshSIs",
                        theory: "Double-entry bookkeeping is a system of recording transactions where for every debit there is an equal and opposite credit. This ensures the accounting equation (Assets = Liabilities + Equity) always remains in balance.",
                        text: "Accounting details...",
                        mcqs: [
                            { q: "Golden Rule for Real Account?", options: ["A) Debit Receiver", "B) Debit what comes in", "C) Debit all expenses", "D) Credit all income"], a: "B" },
                            { q: "Accounting Equation is?", options: ["A) A = L + E", "B) L = A + E", "C) E = A + L", "D) A = L - E"], a: "A" },
                            { q: "Cash account is a?", options: ["A) Nominal", "B) Real", "C) Personal", "D) Artificial"], a: "B" },
                            { q: "What is the book of prime entry?", options: ["A) Ledger", "B) Journal", "C) Balance Sheet", "D) Trial Balance"], a: "B" },
                            { q: "Trial balance checks ___ accuracy?", options: ["A) Logical", "B) Mathematical", "C) Physical", "D) Legal"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "B.Com Accounting Exam",
            passingScore: 70,
            questions: [
                { id: 1, question: "The rule 'Debit what comes in' is for?", options: ["Personal", "Real", "Nominal", "Cash"], answer: "Real" },
                { id: 2, question: "Which equation is correct?", options: ["Assets = L - E", "Assets = L + E", "Equity = A + L", "Liabilities = A + E"], answer: "Assets = L + E" },
                { id: 3, question: "Cash account is a?", options: ["Personal Account", "Real Account", "Nominal Account", "Valuation Account"], answer: "Real Account" },
                { id: 4, question: "Goodwill is an example of?", options: ["Tangible Asset", "Intangible Asset", "Current Asset", "Fictitious Asset"], answer: "Intangible Asset" },
                { id: 5, question: "The book of original entry is?", options: ["Ledger", "Trial Balance", "Journal", "Balance Sheet"], answer: "Journal" },
                { id: 6, question: "Bank Reconciliation Statement is prepared by?", options: ["Bank", "Account holder", "Auditor", "Government"], answer: "Account holder" },
                { id: 7, question: "Depreciation is a process of?", options: ["Valuation", "Allocation", "Realization", "Appreciation"], answer: "Allocation" },
                { id: 8, question: "A 'Trial Balance' is a?", options: ["Statement", "Account", "Book", "Summary"], answer: "Statement" },
                { id: 9, question: "Which is a liability?", options: ["Cash", "Machinery", "Creditors", "Debtors"], answer: "Creditors" },
                { id: 10, question: "Double entry system was introduced by?", options: ["Adam Smith", "Luca Pacioli", "Alfred Marshall", "Sumner"], answer: "Luca Pacioli" },
                { id: 11, question: "Petty cash book is used for?", options: ["Big expenses", "Daily sales", "Small expenses", "Bank loans"], answer: "Small expenses" },
                { id: 12, question: "Which is a capital expenditure?", options: ["Salary paid", "Purchase of machinery", "Office rent", "Repairs"], answer: "Purchase of machinery" },
                { id: 13, question: "Current ratio formula is?", options: ["CL / CA", "CA / CL", "Working Capital / CL", "Total Assets / CL"], answer: "CA / CL" },
                { id: 14, question: "Bad debt is a?", options: ["Revenue", "Gain", "Loss", "Liability"], answer: "Loss" },
                { id: 15, question: "The main objective of auditing is?", options: ["Detect frauds", "Prevent errors", "Expression of opinion", "Tax calculation"], answer: "Expression of opinion" },
                { id: 16, question: "Final accounts include Trading, P&L and?", options: ["Trial Balance", "Journal", "Balance Sheet", "Cash Book"], answer: "Balance Sheet" },
                { id: 17, question: "Stock is valued at?", options: ["Cost", "Market Value", "Lower of Cost or Market", "Higher of Cost or Market"], answer: "Lower of Cost or Market" },
                { id: 18, question: "Prepaid rent is a?", options: ["Expense", "Liability", "Asset", "Income"], answer: "Asset" },
                { id: 19, question: "What is 'Drawings' in accounting?", options: ["Sketching", "Owner takes cash for personal use", "Bank loan", "Selling goods"], answer: "Owner takes cash for personal use" },
                { id: 20, question: "Which is a nominal account?", options: ["Salary Account", "Bank Account", "Stock Account", "Building Account"], answer: "Salary Account" }
            ]
        }
    },
    {
        id: "pg-mca",
        title: "MCA (Software Systems)",
        category: "PG Courses",
        description: "Advanced computational research and application development.",
        duration: "2 Years",
        coverImage: '/assets/store/ug-btech-cs.jpg',
        topics: [
            {
                id: "mca-software",
                title: "Software Engineering Mastery",
                subtopics: [
                    {
                        id: "se-sdlc",
                        title: "SDLC Models",
                        videoUrl: "https://www.youtube.com/embed/8maeSJC796Q",
                        theory: "Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high quality softwares. Common models include Waterfall, Agile, and Spiral.",
                        text: "SDLC breakdowns...",
                        mcqs: [
                            { q: "Which model is sequential?", options: ["A) Agile", "B) Waterfall", "C) Spiral", "D) RAD"], a: "B" },
                            { q: "SDLC phase for coding is?", options: ["A) Analysis", "B) Design", "C) Implementation", "D) Testing"], a: "C" },
                            { q: "What does 'A' in SDLC stand for?", options: ["A) Analysis", "B) Action", "C) Agile", "D) Agreement"], a: "A" },
                            { q: "Testing done by users is?", options: ["A) Alpha", "B) Beta", "C) Gamma", "D) Delta"], a: "B" },
                            { q: "Model suited for high-risk projects?", options: ["A) Waterfall", "B) Spiral", "C) V-Model", "D) Big Bang"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "MCA Professional Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "Which SDLC model uses sprints?", options: ["Waterfall", "Agile", "Spiral", "V-Model"], answer: "Agile" },
                { id: 2, question: "What is the primary focus of Software Engineering?", options: ["Hardware design", "Systematic development of software", "Networking", "Database entry"], answer: "Systematic development of software" },
                { id: 3, question: "A 'bug' in software is also known as?", options: ["Feature", "Error / Fault", "Logic", "Function"], answer: "Error / Fault" },
                { id: 4, question: "Which is a black-box testing technique?", options: ["White-box", "Boundary Value Analysis", "Path testing", "Data flow testing"], answer: "Boundary Value Analysis" },
                { id: 5, question: "What does UML stand for?", options: ["Universal Mark Language", "Unified Modeling Language", "User Mode Logic", "United Memory List"], answer: "Unified Modeling Language" },
                { id: 6, question: "Coupling in software design should be?", options: ["High", "Low", "Medium", "Zero"], answer: "Low" },
                { id: 7, question: "Cohesion in software design should be?", options: ["High", "Low", "Medium", "Zero"], answer: "High" },
                { id: 8, question: "Which model is also called the Classic Life Cycle?", options: ["Agile", "Waterfall", "Spiral", "RAD"], answer: "Waterfall" },
                { id: 9, question: "Verification answers?", options: ["Are we building the right product?", "Are we building the product right?", "Is the product fast?", "Is the product small?"], answer: "Are we building the product right?" },
                { id: 10, question: "Validation answers?", options: ["Are we building the right product?", "Are we building the product right?", "Is the product fast?", "Is the product small?"], answer: "Are we building the right product?" },
                { id: 11, question: "SRS stands for?", options: ["Software Requirement Specification", "System Release Sheet", "Software Risk Solution", "Standard Release System"], answer: "Software Requirement Specification" },
                { id: 12, question: "Beta testing is done by?", options: ["Developers", "Internal testers", "End users", "Managers"], answer: "End users" },
                { id: 13, question: "Which model is best for risk-driven projects?", options: ["Waterfall", "V-Model", "Spiral", "Big-Bang"], answer: "Spiral" },
                { id: 14, question: "Software maintenance that fixes bugs discovered by users is?", options: ["Corrective", "Adaptive", "Perfective", "Preventive"], answer: "Corrective" },
                { id: 15, question: "In Agile, what is a person responsible for the backlog called?", options: ["Scrum Master", "Product Owner", "Developer", "Tester"], answer: "Product Owner" },
                { id: 16, question: "What is 'Refactoring'?", options: ["Adding new features", "Fixing bugs", "Restructuring code without changing behavior", "Deleting code"], answer: "Restructuring code without changing behavior" },
                { id: 17, question: "Unit testing is typically done for?", options: ["Entire system", "Sub-systems", "Smallest testable parts", "User interfaces"], answer: "Smallest testable parts" },
                { id: 18, question: "The 'Mythical Man-Month' refers to?", options: ["Adding more people to a late project makes it later", "Adding more people speeds up delivery", "One person can do everything", "Project management is easy"], answer: "Adding more people to a late project makes it later" },
                { id: 19, question: "Which diagram shows the flow of data?", options: ["Class Diagram", "Use Case", "DFD", "ER Diagram"], answer: "DFD" },
                { id: 20, question: "Version control systems include?", options: ["Git", "SVN", "Mercurial", "All of these"], answer: "All of these" }
            ]
        }
    },
    {
        id: "ug-btech-cs",
        title: "B.Tech (CS Core)",
        category: "UG Courses",
        description: "Core concepts of Computer Science including OS, DBMS, and Algorithms.",
        duration: "4 Years",
        coverImage: '/assets/store/ug-btech-cs.jpg',
        topics: [
            {
                id: "cs-os",
                title: "Operating Systems",
                subtopics: [
                    {
                        id: "os-intro",
                        title: "System Structures",
                        videoUrl: "https://www.youtube.com/embed/vBURTt97EkA",
                        theory: "Operating Systems provide the environment for executing programs and offer services to users and programs.",
                        text: "Detailed OS content...",
                        mcqs: [
                            { q: "What is the heart of an OS?", options: ["A) Shell", "B) Kernel", "C) GUI", "D) File System"], a: "B" }
                        ]
                    }
                ]
            }
        ],
        assessment: {
            title: "CS Core Mastery Exam",
            passingScore: 75,
            questions: [
                { id: 1, question: "The heart of an OS is?", options: ["Shell", "Kernel", "UI", "Utility"], answer: "Kernel" },
                { id: 2, question: "Which scheduling algorithm is non-preemptive?", options: ["Round Robin", "SJF", "FCFS", "Priority"], answer: "FCFS" },
                { id: 3, question: "What is a 'Deadlock'?", options: ["When a process ends", "When processes wait forever for each other", "When memory is full", "High CPU usage"], answer: "When processes wait forever for each other" },
                { id: 4, question: "Virtual memory is used for?", options: ["Increasing speed", "Running larger programs than RAM", "Saving power", "Graphics"], answer: "Running larger programs than RAM" },
                { id: 5, question: "Which is a valid page replacement algorithm?", options: ["FIFO", "LRU", "Optimal", "All of these"], answer: "All of these" },
                { id: 6, question: "The 'Critical Section' problem is related to?", options: ["Memory", "CPU speed", "Process synchronization", "File storage"], answer: "Process synchronization" },
                { id: 7, question: "What is a 'Semaphore'?", options: ["Variable used for signaling", "Part of CPU", "A file type", "Memory address"], answer: "Variable used for signaling" },
                { id: 8, question: "Which part of the OS handles I/O?", options: ["Kernel", "Device Drivers", "Users", "Shell"], answer: "Device Drivers" },
                { id: 9, question: "Memory management unit (MMU) is for?", options: ["Mapping virtual to physical addresses", "Managing files", "Scheduling", "Networking"], answer: "Mapping virtual to physical addresses" },
                { id: 10, question: "A 'Process' is a?", options: ["Static program", "Program in execution", "A file", "Variable"], answer: "Program in execution" },
                { id: 11, question: "The command interpreter is also called?", options: ["Kernel", "Drives", "Shell", "Script"], answer: "Shell" },
                { id: 12, question: "Booting is?", options: ["Shutting down", "Starting the computer", "Deleting files", "Installing OS"], answer: "Starting the computer" },
                { id: 13, question: "Fragmentation occurs in?", options: ["CPU", "Memory", "I/O", "Registers"], answer: "Memory" },
                { id: 14, question: "Which file system is native to Windows?", options: ["FAT", "EXT", "NTFS", "HFS"], answer: "NTFS" },
                { id: 15, question: "Multi-threading allows?", options: ["One task", "Multiple tasks in parallel within a process", "Sequential execution", "Deleting processes"], answer: "Multiple tasks in parallel within a process" },
                { id: 16, question: "An interrupt is?", options: ["A program", "A signal from hardware/software to CPU", "A bug", "A file"], answer: "A signal from hardware/software to CPU" },
                { id: 17, question: "Caching is used to?", options: ["Increase capacity", "Reduce access time", "Reduce cost", "Manage users"], answer: "Reduce access time" },
                { id: 18, question: "Which is a popular Linux distribution?", options: ["Windows 10", "MacOS", "Ubuntu", "Android"], answer: "Ubuntu" },
                { id: 19, question: "The root directory in Linux is represented by?", options: ["/", "\\", "~", "."], answer: "/" },
                { id: 20, question: "Kernel mode is also called?", options: ["User mode", "Privileged mode", "Restricted mode", "Slow mode"], answer: "Privileged mode" }
            ]
        }
    }
];

module.exports = courses;
