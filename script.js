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

    // ===== DIGITAL SERVICES MODAL =====
    const dsOverlay = document.getElementById('ds-modal-overlay');
    const dsTitle = document.getElementById('ds-modal-title');
    const dsDocs = document.getElementById('ds-modal-docs');
    const dsClose = document.getElementById('ds-modal-close');
    const dsCancel = document.getElementById('ds-modal-cancel');
    const allDsCards = document.querySelectorAll('.ds-card[data-service]');

    if (allDsCards.length && dsOverlay) {
        allDsCards.forEach(card => {
            card.addEventListener('click', () => {
                const service = card.dataset.service || '';
                const docs = (card.dataset.docs || '').split(',');

                dsTitle.textContent = service;
                dsDocs.innerHTML = docs.map(d => `<li>${d.trim()}</li>`).join('');
                dsOverlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            dsOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }

        if (dsClose) dsClose.addEventListener('click', closeModal);
        if (dsCancel) dsCancel.addEventListener('click', closeModal);

        dsOverlay.addEventListener('click', (e) => {
            if (e.target === dsOverlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && dsOverlay.classList.contains('show')) {
                closeModal();
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

    // ===== JANSEVA KENDRA FORM → WHATSAPP =====
    const jskForm = document.getElementById('jsk-form');
    const jskFormSuccess = document.getElementById('jsk-form-success');
    if (jskForm) {
        jskForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('jsk-name')?.value || '';
            const mobile = document.getElementById('jsk-mobile')?.value || '';
            const service = document.getElementById('jsk-service')?.value || '';
            const address = document.getElementById('jsk-address')?.value || '';

            const lines = [
                `🏛️ *Jan Seva Kendra — New Application*`,
                ``,
                `👤 *Name:* ${name}`,
                `📞 *Mobile:* ${mobile}`,
            ];

            if (service) lines.push(`📋 *Service:* ${service}`);
            if (address) lines.push(`📍 *Address:* ${address}`);

            lines.push('', '---', 'Sent from shyamstudios.online/janseva-kendra');

            const whatsappMessage = encodeURIComponent(lines.join('\n'));
            const whatsappUrl = `https://wa.me/918115114790?text=${whatsappMessage}`;

            // Show success + open WhatsApp
            jskForm.style.display = 'none';
            if (jskFormSuccess) jskFormSuccess.classList.add('show');

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
