// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Format phone number input
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '');
            if (x.length > 0) {
                x = '(' + x;
            }
            if (x.length > 4) {
                x = x.slice(0, 4) + ')-' + x.slice(4);
            }
            if (x.length > 9) {
                x = x.slice(0, 9) + '-' + x.slice(9);
            }
            if (x.length > 14) {
                x = x.slice(0, 14);
            }
            e.target.value = x;
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                dayDate: document.getElementById('day-date').value,
                duration: document.getElementById('duration').value,
                location: document.getElementById('location').value,
                foundMe: document.getElementById('found-me').value,
                aboutYou: document.getElementById('about-you').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            // Validate required fields
            if (!formData.name || !formData.dayDate || !formData.duration) {
                alert('Please fill in all required fields (Name, Day/Date/Time, and Duration).');
                return;
            }

            // Store booking inquiry in localStorage
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            const bookingId = 'BK' + Date.now();
            bookings.push({
                id: bookingId,
                ...formData
            });
            localStorage.setItem('bookings', JSON.stringify(bookings));

            // Show success message
            showBookingSuccess();

            // Reset form
            contactForm.reset();
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and other sections
    document.querySelectorAll('.service-card, .service-info-card, .booking-rules').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Show booking success message
function showBookingSuccess() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;

    // Create message box
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        max-width: 500px;
        margin: 20px;
    `;

    const checkmark = document.createElement('div');
    checkmark.innerHTML = '✓';
    checkmark.style.cssText = `
        font-size: 60px;
        color: #4CAF50;
        margin-bottom: 20px;
    `;

    const messageText = document.createElement('h2');
    messageText.textContent = 'Thank You!';
    messageText.style.cssText = `
        margin: 0 0 15px 0;
        color: #7C4F0A;
        font-size: 28px;
        font-family: 'Playfair Display', serif;
    `;

    const subMessage = document.createElement('p');
    subMessage.textContent = 'Your booking inquiry has been received. I will review your information and get back to you as soon as possible.';
    subMessage.style.cssText = `
        color: #666;
        margin: 0 0 20px 0;
        line-height: 1.6;
        font-size: 16px;
    `;

    const noteText = document.createElement('p');
    noteText.innerHTML = '<strong>Please remember:</strong> I will never answer blocked calls and screening IS required. Complete booking inquiries receive priority response.';
    noteText.style.cssText = `
        color: #7C4F0A;
        margin: 0 0 25px 0;
        font-size: 14px;
        font-style: italic;
        padding: 15px;
        background: #FAF8F5;
        border-radius: 8px;
    `;

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
        padding: 12px 30px;
        background: #7C4F0A;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
    `;

    closeButton.addEventListener('mouseenter', function() {
        this.style.background = '#8B6F47';
    });

    closeButton.addEventListener('mouseleave', function() {
        this.style.background = '#7C4F0A';
    });

    closeButton.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    messageBox.appendChild(checkmark);
    messageBox.appendChild(messageText);
    messageBox.appendChild(subMessage);
    messageBox.appendChild(noteText);
    messageBox.appendChild(closeButton);
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
});


