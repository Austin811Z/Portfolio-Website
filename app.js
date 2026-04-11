const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware - Important: This must come BEFORE routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load projects (for fallback if needed)
let projectsData = { projects: [] };
try {
    projectsData = require('./data/projects.json');
} catch (e) {
    console.log('Warning: Could not load projects.json');
}

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Developer Portfolio' });
});

app.post('/contact', (req, res) => {
    console.log('Contact form received:', req.body);
    res.redirect('/#contact?success=true');
});

// 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});