// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Generate Fireflies in Hero section
const fireflyContainer = document.querySelector('.firefly-container');
const fireflyCount = 20;

if (fireflyContainer) {
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.className = 'firefly';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        firefly.style.left = `${posX}%`;
        firefly.style.top = `${posY}%`;
        
        // Random animation delay and duration
        const delay = Math.random() * 10;
        const duration = 5 + Math.random() * 10;
        firefly.style.animationDelay = `${delay}s, ${Math.random() * 2}s`;
        firefly.style.animationDuration = `${duration}s, ${1 + Math.random() * 2}s`;
        
        fireflyContainer.appendChild(firefly);
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});
