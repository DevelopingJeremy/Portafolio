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

    closer.addEventListener('mousedown', () => {
        mobileMenu.classList.toggle('header-open');
        mobileMenu.classList.toggle('header-close');
        closer.classList.toggle('closer-close');
        closer.classList.toggle('closer-open');
    });

    // Place images on the left or right depending on the child element
    const projects = document.getElementsByClassName('project-card');

    const applyProjectCardDirection = () => {
        Array.from(projects).forEach((card, index) => {
            if (index % 2 == 1) {
                if (window.innerWidth > 1000) {
                    card.style.flexDirection = 'row-reverse';
                } else {
                    card.style.flexDirection = '';
                }

                card.classList.add('from-left');
            } else {
                card.style.flexDirection = '';
                card.classList.add('from-right');
            }
        });
    };

    applyProjectCardDirection();

    window.addEventListener('resize', applyProjectCardDirection);

    const projectCards = document.querySelectorAll('.project-card');

    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const modalCloseButton = document.getElementById('project-modal-close');
    const modalTitle = document.getElementById('project-modal-title');
    const modalType = document.getElementById('project-modal-type');
    const modalDescription = document.getElementById('project-modal-description');
    const modalImage = document.getElementById('project-modal-image');
    const modalThumbs = document.getElementById('project-modal-thumbs');
    const modalPrev = document.getElementById('project-modal-prev');
    const modalNext = document.getElementById('project-modal-next');
    const modalLinks = document.getElementById('project-modal-links');

    let modalImages = [];
    let modalActiveIndex = 0;

    const isModalAvailable = () => {
        return Boolean(
            projectModal &&
            modalCloseButton &&
            modalTitle &&
            modalType &&
            modalDescription &&
            modalImage &&
            modalThumbs &&
            modalPrev &&
            modalNext
        );
    };

    const parseImages = (value) => {
        if (!value) return [];
        return value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
    };

    const setActiveModalImage = (index) => {
        if (!isModalAvailable()) return;
        if (!modalImages.length) return;

        modalActiveIndex = ((index % modalImages.length) + modalImages.length) % modalImages.length;
        const src = modalImages[modalActiveIndex];
        modalImage.src = src;
        modalImage.alt = modalTitle.textContent || 'Project image';

        Array.from(modalThumbs.children).forEach((child, i) => {
            if (i === modalActiveIndex) {
                child.classList.add('project-modal-thumb-active');
            } else {
                child.classList.remove('project-modal-thumb-active');
            }
        });

        modalPrev.style.visibility = modalImages.length > 1 ? 'visible' : 'hidden';
        modalNext.style.visibility = modalImages.length > 1 ? 'visible' : 'hidden';
    };

    const renderModalThumbs = () => {
        if (!isModalAvailable()) return;
        modalThumbs.innerHTML = '';

        modalImages.forEach((src, index) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = 'project-modal-thumb';
            thumb.setAttribute('aria-label', `Image ${index + 1}`);

            const img = document.createElement('img');
            img.src = src;
            img.alt = modalTitle.textContent || 'Project image thumbnail';
            thumb.appendChild(img);

            thumb.addEventListener('click', () => setActiveModalImage(index));
            modalThumbs.appendChild(thumb);
        });
    };

    const openProjectModal = (data) => {
        if (!isModalAvailable()) return;

        modalTitle.textContent = data.title || '';
        modalType.textContent = data.type || '';
        modalDescription.textContent = data.description || '';

        if (modalLinks) {
            modalLinks.innerHTML = '';

            if (data.linksContainer) {
                data.linksContainer.querySelectorAll('a').forEach((a) => {
                    const clone = a.cloneNode(true);
                    modalLinks.appendChild(clone);
                });
            }
        }

        modalImages = parseImages(data.images);
        if (!modalImages.length && data.fallbackImage) {
            modalImages = [data.fallbackImage];
        }

        renderModalThumbs();
        setActiveModalImage(0);

        projectModal.classList.add('project-modal-open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const closeProjectModal = () => {
        if (!isModalAvailable()) return;
        projectModal.classList.remove('project-modal-open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        modalImages = [];
        modalActiveIndex = 0;
    };

    if (isModalAvailable()) {
        document.querySelectorAll('.project-more').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.project-card');
                const firstCardImg = card ? card.querySelector('img') : null;
                const linksContainer = card ? card.querySelector('.links-tech') : null;
                openProjectModal({
                    title: btn.getAttribute('data-project-title'),
                    type: btn.getAttribute('data-project-type'),
                    description: btn.getAttribute('data-project-description'),
                    images: btn.getAttribute('data-project-images'),
                    fallbackImage: firstCardImg ? firstCardImg.getAttribute('src') : '',
                    linksContainer
                });
            });
        });

        modalCloseButton.addEventListener('click', closeProjectModal);
        modalPrev.addEventListener('click', () => setActiveModalImage(modalActiveIndex - 1));
        modalNext.addEventListener('click', () => setActiveModalImage(modalActiveIndex + 1));

        projectModal.addEventListener('mousedown', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!projectModal.classList.contains('project-modal-open')) return;
            if (e.key === 'Escape') closeProjectModal();
            if (e.key === 'ArrowLeft') setActiveModalImage(modalActiveIndex - 1);
            if (e.key === 'ArrowRight') setActiveModalImage(modalActiveIndex + 1);
        });
    }

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

    const text = document.getElementById('email').textContent;
    const boton = document.getElementById('button-copy');

    boton.addEventListener('click', () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                const alert = document.getElementById('alert');
                alert.classList.toggle('alert-email-show')
                alert.classList.toggle('alert-email-hidden')
                setTimeout(() => {
                    alert.classList.toggle('alert-email-show')
                    alert.classList.toggle('alert-email-hidden')
                }, 2000);
            }).catch(err => {
                console.error(err);
            })
    })

    // Selector de idioma
    const langButton = document.getElementById('lang-button');
    const langList = document.getElementById('lang-list');

    langButton.addEventListener('click', () => {
        langList.classList.toggle('lang-list-open');
        langList.classList.toggle('lang-list-close');
    });

    // Cambiar idioma al seleccionar
    Array.from(langList.children).forEach(item => {
        item.addEventListener('click', () => {
            const selectedLang = item.getAttribute('data-lang');
            langButton.textContent = selectedLang.toUpperCase() + " ▼";
            langList.classList.remove('lang-list-open');
            langList.classList.add('lang-list-close');

            window.location.href = `/` + selectedLang + "/";
        });
    });

    // Cerrar lista si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!langButton.contains(e.target) && !langList.contains(e.target)) {
            langList.classList.remove('lang-list-open');
            langList.classList.add('lang-list-close');
        }
    });

});
