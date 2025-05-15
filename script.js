document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone navigation links
                const navClone = navLinks.cloneNode(true);
                
                // Clone auth buttons
                const authClone = authButtons.cloneNode(true);
                
                mobileMenu.appendChild(navClone);
                mobileMenu.appendChild(authClone);
                
                document.body.appendChild(mobileMenu);
                
                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: white;
                        padding: 20px;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                        z-index: 999;
                        display: none;
                    }
                    
                    .mobile-menu.active {
                        display: block;
                    }
                    
                    .mobile-menu .nav-links {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }
                    
                    .mobile-menu .nav-links li {
                        margin: 10px 0;
                    }
                    
                    .mobile-menu .auth-buttons {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        margin-left: 0;
                        margin-top: 20px;
                    }
                    
                    .mobile-menu .auth-buttons .btn {
                        margin: 5px 0;
                    }
                    
                    .hamburger.active span:nth-child(1) {
                        transform: rotate(45deg) translate(5px, 5px);
                    }
                    
                    .hamburger.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .hamburger.active span:nth-child(3) {
                        transform: rotate(-45deg) translate(7px, -6px);
                    }
                `;
                
                document.head.appendChild(style);
            }
            
            // Toggle mobile menu
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0) {
        let currentIndex = 0;
        
        // Function to show testimonial by index
        function showTestimonial(index) {
            // Hide all testimonials
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected testimonial
            testimonials[index].classList.add('active');
            
            // Add active class to the corresponding dot
            dots[index].classList.add('active');
            
            // Update current index
            currentIndex = index;
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonial(index);
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                let index = currentIndex - 1;
                if (index < 0) {
                    index = testimonials.length - 1;
                }
                showTestimonial(index);
            });
            
            nextBtn.addEventListener('click', () => {
                let index = currentIndex + 1;
                if (index >= testimonials.length) {
                    index = 0;
                }
                showTestimonial(index);
            });
        }
        
        // Auto slide testimonials
        setInterval(() => {
            let index = currentIndex + 1;
            if (index >= testimonials.length) {
                index = 0;
            }
            showTestimonial(index);
        }, 5000);
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});