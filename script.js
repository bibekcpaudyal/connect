
// Initialize Animations
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out',
});

// Dark Mode Toggle Logic
const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
const htmlElement = document.documentElement;

// Check for saved theme
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
}

themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        if (htmlElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Project Search & Filtering
const projectSearch = document.getElementById('projectSearch');
const filterCategory = document.getElementById('filterCategory');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects() {
    const searchTerm = projectSearch ? projectSearch.value.toLowerCase() : '';
    const category = filterCategory ? filterCategory.value : 'all';

    projectCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const cardCategory = card.getAttribute('data-category');
        
        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = category === 'all' || cardCategory === category;

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            card.classList.add('aos-animate'); // Re-trigger animation
        } else {
            card.style.display = 'none';
        }
    });
}

if(projectSearch) projectSearch.addEventListener('input', filterProjects);
if(filterCategory) filterCategory.addEventListener('change', filterProjects);

// Lazy Loading Support for older browsers
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
