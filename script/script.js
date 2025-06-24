// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const scrollTopBtn = document.querySelector('.scroll-top');
const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle Functionality
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.checked = true;
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll to top button functionality
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href="#${sectionId}"]`).classList.remove('active');
        }
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-img, .skill-category, .project-card, .certificate-card, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight * 0.8;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
            
            // Animate skill bars
            if (element.classList.contains('skill-category')) {
                const skillBars = element.querySelectorAll('.skill-progress span');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
            }
        }
    });
};

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Typewriter effect
const typewriterElement = document.querySelector('.typewriter');
const professions = ['Computer Science Student', 'Python Developer', 'Data Scientist', 'Web Developer'];
let currentProfession = 0;
let charIndex = 0;
let isDeleting = false;

const type = () => {
    const currentText = professions[currentProfession];
    
    if (!isDeleting && charIndex < currentText.length) {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(type, 100);
    } else if (isDeleting && charIndex > 0) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(type, 50);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            currentProfession = (currentProfession + 1) % professions.length;
        }
        setTimeout(type, 500);
    }
};

// Start typewriter effect after initial typing animation completes
setTimeout(type, 3500);


// Certificate click handler
document.querySelectorAll(".certificate-img").forEach(img => {
    img.addEventListener("click", function(e) {
        e.preventDefault();
        const fullSizeUrl = this.getAttribute("data-fullsize");
        if (fullSizeUrl) {
            window.open(fullSizeUrl, "_blank");
        }
    });
});

    
function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const Name = document.getElementById('name').value;
    const Email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validate form data
    if (!Name || !Email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    emailjs.init("BjpLMpkADM2BvGX6w");
    emailjs.send("service_c34qi1j", "template_umerwre", {
        name: Name,
        email: Email,
        subject: subject,
        message: message
    })
    .then(() => {
        alert('Message sent successfully!');
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        alert('Failed to send message. Error: ' + JSON.stringify(error));
    });
}


    // Form submission
    // document.getElementById('contactForm').addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     alert('Thank you for your message! I will get back to you soon.');
    //     this.reset();
    // });