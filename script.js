/* ===== Shyam Studio — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Set on load too
        if (window.scrollY > 60) navbar.classList.add('scrolled');
    }

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        // Close when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ===== PORTFOLIO FILTERS =====
    const filterTabs = document.getElementById('filter-tabs');
    const portfolioGrid = document.getElementById('portfolio-grid');
    if (filterTabs && portfolioGrid) {
        const buttons = filterTabs.querySelectorAll('.filter-btn');
        const items = portfolioGrid.querySelectorAll('.portfolio-item');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.dataset.category;

                items.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = '';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.95)';
                        requestAnimationFrame(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxLabel = document.getElementById('lightbox-label');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && portfolioGrid) {
        const items = portfolioGrid.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const label = item.dataset.label || '';
                const category = item.dataset.category || '';

                lightboxImg.src = img.src.replace(/w=600/, 'w=1200').replace(/h=\d+/, 'h=900');
                lightboxImg.alt = img.alt;
                lightboxLabel.textContent = label;
                lightboxCat.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('open')) {
                closeLightbox();
            }
        });
    }

    // ===== FAQ ACCORDION =====
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const answer = trigger.nextElementSibling;
            const isOpen = trigger.classList.contains('open');

            // Close all
            faqTriggers.forEach(t => {
                t.classList.remove('open');
                t.nextElementSibling.style.maxHeight = '0';
            });

            // Open if was closed
            if (!isOpen) {
                trigger.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // ===== BOOKING FORM → WHATSAPP =====
    const bookingForm = document.getElementById('booking-form');
    const formSuccess = document.getElementById('form-success');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            const email = document.getElementById('email')?.value || '';
            const eventType = document.getElementById('event-type')?.value || '';
            const eventDate = document.getElementById('event-date')?.value || '';
            const message = document.getElementById('message')?.value || '';

            const lines = [
                `🙏 *New Booking Inquiry — Shyam Studio*`,
                ``,
                `👤 *Name:* ${name}`,
                `📞 *Phone:* ${phone}`,
            ];

            if (email) lines.push(`📧 *Email:* ${email}`);
            if (eventType) lines.push(`🎉 *Event:* ${eventType}`);
            if (eventDate) lines.push(`📅 *Date:* ${eventDate}`);
            if (message) lines.push(`💬 *Details:* ${message}`);

            lines.push('', '---', 'Sent from shyamstudios.online');

            const whatsappMessage = encodeURIComponent(lines.join('\n'));
            const whatsappUrl = `https://wa.me/918115114790?text=${whatsappMessage}`;

            // Show success + open WhatsApp
            bookingForm.style.display = 'none';
            if (formSuccess) formSuccess.classList.add('show');

            window.open(whatsappUrl, '_blank');
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
