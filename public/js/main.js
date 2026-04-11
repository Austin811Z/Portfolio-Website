document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ JavaScript loaded successfully");

    const container = document.getElementById('projects-container');
    
    fetch('/data/projects.json')
        .then(response => {
            console.log("Fetch response status:", response.status);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("✅ Projects data loaded:", data);
            renderProjects(data.projects);
        })
        .catch(error => {
            console.error("❌ Fetch error:", error);
            if (container) {
                container.innerHTML = `
                    <p style="grid-column: 1/-1; text-align: center; color: #ef4444; padding: 40px;">
                        Failed to load projects.<br>
                        <small>Error: ${error.message}</small>
                    </p>`;
            }
        });
});

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';

    if (projects.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center;">No projects found.</p>`;
        return;
    }

    projects.forEach(project => {
        const html = `
            <div class="project-card">
                <div class="project-image">
                    <img src="/images/${project.image || 'placeholder.jpg'}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">GitHub</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}