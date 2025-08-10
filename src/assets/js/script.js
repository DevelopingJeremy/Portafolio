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
});
