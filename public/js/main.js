// public/js/main.js

document.addEventListener('DOMContentLoaded', function() {

    // Load and render projects dynamically
    fetch('/data/projects.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load projects');
            return response.json();
        })
        .then(data => {
            renderProjects(data.projects || []);
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            const container = document.getElementById('projects-container');
            if (container) {
                container.innerHTML = `
                    <div class="col-span-3 text-center py-12 text-zinc-400">
                        <p>Projects will appear here once added to data/projects.json</p>
                    </div>
                `;
            }
        });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple mobile menu alert (you can improve later)
    const mobileBtn = document.getElementById('mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            alert('Mobile navigation - Coming soon!');
        });
    }

    // Contact form success message
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showSuccessMessage();
    }
});

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = `
            <div class="col-span-3 text-center py-12 text-zinc-400">
                No projects found. Add some to data/projects.json
            </div>
        `;
        return;
    }

    projects.forEach(project => {
        const html = `
            <div class="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-emerald-500 transition-all group">
                <div class="h-48 bg-zinc-800 relative overflow-hidden">
                    <img src="/images/${project.image || 'placeholder.jpg'}" 
                         alt="${project.title}"
                         class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <div class="absolute top-4 right-4 bg-black/70 text-xs px-3 py-1 rounded-2xl">
                        ${project.category || 'Project'}
                    </div>
                </div>
                
                <div class="p-6">
                    <h3 class="font-semibold text-xl mb-2">${project.title}</h3>
                    <p class="text-zinc-400 text-sm mb-5 line-clamp-3">
                        ${project.description}
                    </p>
                    
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${project.technologies.map(tech => `
                            <span class="text-xs bg-zinc-800 px-3 py-1 rounded-xl">${tech}</span>
                        `).join('')}
                    </div>
                    
                    <div class="flex gap-3">
                        ${project.githubUrl ? `
                            <a href="${project.githubUrl}" target="_blank" 
                               class="flex-1 text-center border border-zinc-700 hover:border-white py-3 rounded-2xl text-sm font-medium transition-colors">
                                GitHub
                            </a>
                        ` : ''}
                        
                        ${project.liveUrl ? `
                            <a href="${project.liveUrl}" target="_blank" 
                               class="flex-1 text-center bg-emerald-600 hover:bg-emerald-500 py-3 rounded-2xl text-sm font-medium transition-colors">
                                Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

function showSuccessMessage() {
    const msg = document.createElement('div');
    msg.className = 'fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50';
    msg.innerHTML = `<i class="fas fa-check-circle"></i> <span>Message sent successfully!</span>`;
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.style.opacity = '0';
        setTimeout(() => msg.remove(), 600);
    }, 4000);
}