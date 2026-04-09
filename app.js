const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));        // Serve static files (css, js, images)
app.use(express.urlencoded({ extended: true }));                // Parse form data
app.use(express.json());                                        // Parse JSON if needed later

// Load projects data once at startup (better performance)
let projectsData;
try {
    projectsData = require('./data/projects.json');
    console.log(`✅ Loaded ${projectsData.projects.length} projects from data/projects.json`);
} catch (error) {
    console.warn('⚠️ Could not load projects.json. Using empty array.');
    projectsData = { projects: [] };
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Developer Portfolio',
        projects: projectsData.projects   // Passing projects to EJS (for future use if needed)
    });
});

// Contact form handler
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Log the message (you can connect to EmailJS or a real service later)
    console.log('📧 New Contact Form Submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log('-----------------------------');

    // Redirect back to home with success message
    res.redirect('/#contact?success=true');
});

// Health check route (useful for Vercel)
app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'ok', 
        message: 'Portfolio server is running',
        projectsCount: projectsData.projects.length
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).render('index', { 
        title: '404 - Page Not Found',
        projects: projectsData.projects 
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
    console.log(`🌐 Ready for Vercel deployment`);
});

module.exports = app;   // Important for Vercel serverless functions