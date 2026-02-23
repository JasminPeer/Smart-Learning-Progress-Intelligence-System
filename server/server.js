const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── DIAGNOSTIC EVENT LOGGING ────────────────────────────────────────
global.recentEvents = [];
const logEvent = (msg) => {
    const entry = `[${new Date().toISOString()}] ${msg}`;
    global.recentEvents.push(entry);
    if (global.recentEvents.length > 50) global.recentEvents.shift();
    console.log(entry);
};
global.logEvent = logEvent;
logEvent("Server initialized");

// ─── DEEP DIAGNOSTICS (PAYLOAD TRACKING) ──────────────────────────────
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        const oldEnd = res.end;
        res.end = function(chunk, encoding) {
            const size = chunk ? (typeof chunk === 'string' ? Buffer.byteLength(chunk) : chunk.length) : 0;
            console.log(`[DIAG] Response: ${req.method} ${req.url} | Status: ${res.statusCode} | Size: ${size} bytes`);
            oldEnd.apply(res, arguments);
        };
    }
    next();
});

// Data Healing / Migration logic
const syncProgressData = async () => {
    try {
        const Profile = require('./models/Profile');
        const Progress = require('./models/Progress');
        const profiles = await Profile.find({});
        console.log(`[Healing] Checking ${profiles.length} profiles for missing progress records...`);
        
        let createdCount = 0;
        for (const profile of profiles) {
            if (profile.enrolledCourses && profile.enrolledCourses.length > 0) {
                for (const course of profile.enrolledCourses) {
                    // Check if progress record exists
                    const exists = await Progress.findOne({ 
                        studentId: profile.user, 
                        courseId: course.courseId 
                    });
                    
                    if (!exists) {
                        try {
                            await Progress.create({
                                studentId: profile.user,
                                courseId: course.courseId,
                                completionPercentage: course.progress || 0,
                                score: 0,
                                attendance: 0
                            });
                            createdCount++;
                        } catch (err) {
                            console.error(`[Healing] Failed to create record for ${course.courseId}:`, err.message);
                        }
                    }
                }
            }
        }
        if (createdCount > 0) {
            console.log(`[Healing] Successfully synced ${createdCount} missing progress records.`);
        } else {
            console.log(`[Healing] All student data is already in sync.`);
        }
    } catch (err) {
        console.error(`[Healing Error] Migration failed:`, err.message);
    }
};

// Run healing after a short delay to ensure DB is fully ready
setTimeout(syncProgressData, 5000);

// Routes
app.get('/api/health-check', (req, res) => {
    res.json({
        status: 'online',
        timestamp: new Date().toISOString(),
        deployment_id: 'V1.0.1-ROBUST-JSON-FIX',
        env: process.env.NODE_ENV,
        message: 'Guaranteed non-empty response - DEPLOYMENT VERIFIED'
    });
});

app.post('/api/test-echo', (req, res) => {
    console.log("[ECHO TEST] Body Received:", JSON.stringify(req.body));
    res.json({
        echo: req.body,
        receivedAt: new Date().toISOString(),
        headers: req.headers['content-type']
    });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/profile', require('./routes/profileRoutes')); 
app.use('/api/chatbot', require('./routes/chatbotRoutes')); 
app.use('/api/notifications', require('./routes/notificationRoutes'));

// ─── Serve React client (method-agnostic SPA fallback) ──────────────────────
const clientBuildPath = path.resolve(__dirname, '..', 'client', 'dist');
const fs = require('fs');

global.logEvent(`[FS] Server __dirname: ${__dirname}`);
global.logEvent(`[FS] Server Working Dir: ${process.cwd()}`);
global.logEvent(`[FS] Checking for client build at: ${clientBuildPath}`);

// Debug route to see what's happening in the server environment
app.get('/api/debug/fs', (req, res) => {
    try {
        const rootPath = path.resolve(__dirname, '..');
        const clientPath = path.resolve(__dirname, '..', 'client');
        
        const rootItems = fs.existsSync(rootPath) ? fs.readdirSync(rootPath) : ['root missing'];
        const clientItems = fs.existsSync(clientPath) ? fs.readdirSync(clientPath) : ['client missing'];
        const distItems = fs.existsSync(clientBuildPath) ? fs.readdirSync(clientBuildPath) : ['dist missing'];
        
        res.json({
            dirname: __dirname,
            cwd: process.cwd(),
            clientBuildPath,
            exists: fs.existsSync(clientBuildPath),
            rootItems,
            clientItems,
            distItems,
            env: process.env.NODE_ENV,
            nodeVersion: process.version
        });
    } catch (err) {
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

if (fs.existsSync(clientBuildPath)) {
    global.logEvent("[FS] Client build found. Serving static files.");
    app.use(express.static(clientBuildPath));

    app.use((req, res, next) => {
        if (req.method === 'GET' && !req.url.startsWith('/api') && !req.url.includes('.')) {
            res.sendFile(path.join(clientBuildPath, 'index.html'));
        } else {
            next();
        }
    });
} else {
    global.logEvent("[FS] ERROR: Client build NOT found. Checked: " + clientBuildPath);
    app.get('/', (req, res) => {
        res.status(500).send(`
            <h1>Configuration Error</h1>
            <p>The frontend build folder was not found on the server.</p>
            <p>Path checked: <code>${clientBuildPath}</code></p>
            <p>Please check your build logs on Render.</p>
        `);
    });

    app.use((req, res, next) => {
        if (req.url.startsWith('/api')) return next();
        res.status(404).json({ message: "Frontend build missing", path: clientBuildPath });
    });
}

// Global Error Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[Server Error Check] ${req.method} ${req.url}:`, err);
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));