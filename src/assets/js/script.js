document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav-responsive');
    const mobileMenu = document.getElementById('mobile-menu');
    const redirects = document.getElementsByClassName('redirect');
    const closer = document.getElementById('closer');

    // Header responsive
    Array.from(redirects).forEach((redirect) => {
        redirect.addEventListener('click', () => {
            mobileMenu.classList.toggle('header-close');
            mobileMenu.classList.toggle('header-open');
        });
    });

    nav.addEventListener('click', () => {
        mobileMenu.classList.toggle('header-open');
        mobileMenu.classList.toggle('header-close');
        closer.classList.toggle('closer-open');
        closer.classList.toggle('closer-close');
    });

    closer.addEventListener('click', () => {
        mobileMenu.classList.toggle('header-open');
        mobileMenu.classList.toggle('header-close');
        closer.classList.toggle('closer-close');
        closer.classList.toggle('closer-open');
    });

    // Place images on the left or right depending on the child element
    const projects = document.getElementsByClassName('project-card');
    
    Array.from(projects).forEach((card, index) => {
        if (index % 2 == 1 && window.innerWidth > 1000) {
            card.style.flexDirection = 'row-reverse'
            card.classList.add('from-left');
        } else {
            card.classList.add('from-right');
        }
    })

    const projectCards = document.querySelectorAll('.project-card');

    // Intersection Observer to detect when it appears on the monitor
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    projectCards.forEach(card => observer.observe(card));
});
