export const courses = [
    {
        id: "class-6-10-maths",
        title: "Mathematics (Class 6-10)",
        category: "Class 6-10",
        description: "Foundational mathematics covering Algebra, Geometry, and Number Systems.",
        duration: "52 Weeks",
        coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
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
        coverImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "Unit of Force?", options: ["Joule", "Watt", "Newton", "Volt"], answer: "Newton" }
            ]
        }
    },
    {
        id: "class-11-12-physics",
        title: "Physics (Class 11-12)",
        category: "Class 11-12",
        description: "Advanced physics including Mechanics, Electrodynamics, and Optics.",
        duration: "104 Weeks",
        coverImage: "https://images.unsplash.com/photo-1636466484565-f374c4393691?auto=format&fit=crop&q=80&w=800",
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
        coverImage: "/social-cover.svg",
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
                { id: 1, question: "Year of the first war of independence?", options: ["1857", "1947", "1757", "1919"], answer: "1857" }
            ]
        }
    },
    {
        id: "class-6-10-english",
        title: "English (Class 6-10)",
        category: "Class 6-10",
        description: "Grammar, Composition, and Literature for school excellence.",
        duration: "52 Weeks",
        coverImage: "/english-cover.svg",
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
                { id: 1, question: "The plural of 'Child' is?", options: ["Childs", "Children", "Childrens", "Childes"], answer: "Children" }
            ]
        }
    },
    {
        id: "class-11-12-chem",
        title: "Chemistry (Class 11-12)",
        category: "Class 11-12",
        description: "In-depth Inorganic, Organic, and Physical Chemistry.",
        duration: "104 Weeks",
        coverImage: "/chemistry-cover.svg",
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
                { id: 1, question: "The atomic number of Carbon is?", options: ["4", "6", "8", "12"], answer: "6" }
            ]
        }
    },
    {
        id: "class-11-12-bio",
        title: "Biology (Class 11-12)",
        category: "Class 11-12",
        description: "Advanced Human Physiology, Genetics, and Biotechnology.",
        duration: "104 Weeks",
        coverImage: "/biology-cover.svg",
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
                { id: 1, question: "Units of heredity are?", options: ["Cells", "Proteins", "Genes", "Chromosomes"], answer: "Genes" }
            ]
        }
    },
    {
        id: "neet-biology",
        title: "NEET Biology Masterclass",
        category: "NEET",
        description: "Master the entire NEET Biology syllabus with expert lectures focused on NCERT concepts and previous year questions.",
        duration: "40 Weeks",
        coverImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800",
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
                {
                    id: 1,
                    question: "Who proposed that all cells arise from pre-existing cells?",
                    options: ["Hooke", "Schwann", "Schleiden", "Virchow"],
                    answer: "Virchow"
                }
            ]
        }
    },
    {
        id: "jee-physics",
        title: "JEE Physics: Mechanics & Optics",
        category: "JEE",
        description: "A rigorous deep-dive into Physics for JEE aspirants. Problem-solving techniques for JEE Main & Advanced.",
        duration: "45 Weeks",
        coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
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
                {
                    id: 1,
                    question: "What is the centripetal acceleration of an object in circular motion?",
                    options: ["v/r", "v^2/r", "r/v^2", "m*v^2"],
                    answer: "v^2/r"
                }
            ]
        }
    },
    {
        id: "pg-data-science",
        title: "PG Diploma in Data Science",
        category: "PG Courses",
        description: "Advanced postgraduate modules on Machine Learning, AI, and Big Data Analytics for career acceleration.",
        duration: "2 Years",
        coverImage: "/pg-cover.svg",
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
                {
                    id: 1,
                    question: "What type of regression models relationships using a straight line?",
                    options: ["Linear", "Logistic", "Polynomial", "Ridge"],
                    answer: "Linear"
                }
            ]
        }
    },
    {
        id: "ug-btech",
        title: "B.Tech (Information Technology)",
        category: "UG Courses",
        description: "Engineering principles applied to software and systems.",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "Layer 3 of OSI is?", options: ["Data Link", "Network", "Transport", "Session"], answer: "Network" }
            ]
        }
    },
    {
        id: "pg-mba",
        title: "MBA (Business Strategy)",
        category: "PG Courses",
        coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "SWOT stands for Strengths, Weaknesses, Opportunities and?", options: ["Stability", "Strength", "Threats", "Treats"], answer: "Threats" }
            ]
        }
    },
    {
        id: "class-6-10-cs",
        title: "Computer Science (Class 6-10)",
        category: "Class 6-10",
        description: "Introduction to coding, logic, and digital literacy.",
        duration: "52 Weeks",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "Decision symbol is?", options: ["Circle", "Diamond", "Square", "Arrow"], answer: "Diamond" }
            ]
        }
    },
    {
        id: "class-11-12-econ",
        title: "Economics (Class 11-12)",
        category: "Class 11-12",
        description: "Micro and Macro Economics for senior students.",
        duration: "104 Weeks",
        coverImage: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "Demand curve slopes?", options: ["Upwards", "Downwards", "Horizontal", "Vertical"], answer: "Downwards" }
            ]
        }
    },
    {
        id: "ug-bcom",
        title: "B.Com (Business Accounting)",
        category: "UG Courses",
        description: "Fundamentals of accounting, commerce, and trade.",
        coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "The rule 'Debit what comes in' is for?", options: ["Personal", "Real", "Nominal", "Cash"], answer: "Real" }
            ]
        }
    },
    {
        id: "pg-mca",
        title: "MCA (Software Systems)",
        category: "PG Courses",
        description: "Advanced computational research and application development.",
        duration: "2 Years",
        coverImage: "/pg-cover.svg",
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
                { id: 1, question: "Which SDLC model uses sprints?", options: ["Waterfall", "Agile", "Spiral", "V-Model"], answer: "Agile" }
            ]
        }
    },
    {
        id: "ug-btech-cs",
        title: "B.Tech (CS Core)",
        category: "UG Courses",
        description: "Core concepts of Computer Science including OS, DBMS, and Algorithms.",
        duration: "4 Years",
        coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
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
                { id: 1, question: "The heart of an OS is?", options: ["Shell", "Kernel", "UI", "Utility"], answer: "Kernel" }
            ]
        }
    }
];
