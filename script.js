document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Project Filtering Logic ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => {
                    b.classList.remove('bg-green-600', 'text-white');
                    b.classList.add('bg-white', 'text-gray-600');
                });
                // Add active class to clicked button
                btn.classList.remove('bg-white', 'text-gray-600');
                btn.classList.add('bg-green-600', 'text-white');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.opacity = '0';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- 2. Number Counter Animation ---
    const counters = document.querySelectorAll('.count-up');
    
    // Use IntersectionObserver to start counting only when visible
    const observerOptions = { threshold: 0.5 };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // ... (Keep your existing Dark Mode and Chart code here) ...
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gallery Filtering Logic ---
    const galleryFilterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if(galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active classes
                galleryFilterBtns.forEach(b => {
                    b.classList.remove('bg-green-600', 'text-white');
                    b.classList.add('bg-white', 'text-gray-600');
                });
                btn.classList.remove('bg-white', 'text-gray-600');
                btn.classList.add('bg-green-600', 'text-white');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                    }
                });
            });
        });
    }

    // --- 2. Lightbox Functionality ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');
    let currentImageIndex = 0;
    let visibleImages = [];

    // Open Lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Only consider visible items for navigation
            visibleImages = Array.from(galleryItems).filter(i => i.style.display !== 'none');
            currentImageIndex = visibleImages.indexOf(item);
            
            const img = item.querySelector('img');
            const caption = item.querySelector('h3').innerText;
            
            lightboxImg.src = img.src;
            lightboxCaption.innerText = caption;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    if(closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if(lightbox) lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    // Navigation
    const showImage = (index) => {
        if (index >= 0 && index < visibleImages.length) {
            currentImageIndex = index;
            const item = visibleImages[currentImageIndex];
            lightboxImg.src = item.querySelector('img').src;
            lightboxCaption.innerText = item.querySelector('h3').innerText;
        }
    };

    if(prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex - 1);
    });

    if(nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentImageIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentImageIndex + 1);
        }
    });

    // ... (Keep your existing Project Filter and Counter code here) ...
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Chart.js Configurations ---
    
    // 1. PM2.5 Weekly Trend (Line Chart)
    const pm25Ctx = document.getElementById('pm25Chart');
    if (pm25Ctx) {
        new Chart(pm25Ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'PM₂.₅ (µg/m³)',
                    data: [120, 135, 142, 128, 155, 140, 132],
                    borderColor: '#ef4444', // Red-500
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#ef4444',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        grid: { color: '#f3f4f6' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 2. Pollutant Comparison (Bar Chart)
    const pollutantsCtx = document.getElementById('pollutantsChart');
    if (pollutantsCtx) {
        new Chart(pollutantsCtx, {
            type: 'bar',
            data: {
                labels: ['PM₂.₅', 'PM₁₀', 'NO₂', 'CO', 'O₃'],
                datasets: [{
                    label: 'Average Level (30 Days)',
                    data: [135, 52, 30, 0.9, 45],
                    backgroundColor: [
                        '#ef4444', // Red
                        '#eab308', // Yellow
                        '#3b82f6', // Blue
                        '#22c55e', // Green
                        '#a855f7'  // Purple
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f3f4f6' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // 3. Cities AQI Comparison (Horizontal Bar Chart)
    const citiesCtx = document.getElementById('citiesAQIChart');
    if (citiesCtx) {
        new Chart(citiesCtx, {
            type: 'bar',
            indexAxis: 'y',
            data: {
                labels: ['Nairobi (Industrial)', 'Nairobi (CBD)', 'Kampala', 'Kigali', 'Dar es Salaam'],
                datasets: [{
                    label: 'AQI Value',
                    data: [165, 142, 128, 95, 135],
                    backgroundColor: [
                        '#dc2626', // Very Unhealthy
                        '#ef4444', // Unhealthy
                        '#f97316', // Moderate/Unhealthy
                        '#22c55e', // Good
                        '#f97316'  // Moderate
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 200,
                        grid: { color: '#f3f4f6' }
                    },
                    y: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // ... (Keep your existing Form, Gallery, and Project code here) ...
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Industrial Zones Charts ---

    // 1. PM2.5 Comparison by Zone (Bar Chart)
    const pm25Ctx = document.getElementById('pm25Chart');
    if (pm25Ctx) {
        new Chart(pm25Ctx, {
            type: 'bar',
            data: {
                labels: ['Ind. Area', 'Athi River', 'Ruaraka', 'Dandora', 'Tatu City'],
                datasets: [{
                    label: 'PM2.5 (μg/m³)',
                    data: [85, 92, 78, 145, 45],
                    backgroundColor: [
                        '#fbbf24', // Yellow (Moderate)
                        '#f97316', // Orange (Warning)
                        '#f97316', // Orange
                        '#ef4444', // Red (High Risk)
                        '#22c55e'  // Green (Low)
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f3f4f6' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 2. Pollutant Breakdown (Doughnut Chart)
    const breakdownCtx = document.getElementById('breakdownChart');
    if (breakdownCtx) {
        new Chart(breakdownCtx, {
            type: 'doughnut',
            data: {
                labels: ['PM2.5', 'PM10', 'NO2', 'SO2', 'CO'],
                datasets: [{
                    data: [35, 25, 15, 15, 10],
                    backgroundColor: [
                        '#ef4444',
                        '#f97316',
                        '#3b82f6',
                        '#a855f7',
                        '#22c55e'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right', labels: { boxWidth: 12 } }
                }
            }
        });
    }

    // 3. 30-Day Trend (Line Chart)
    const trendCtx = document.getElementById('trendChart');
    if (trendCtx) {
        // Generate dummy dates
        const labels = Array.from({length: 30}, (_, i) => `Day ${i+1}`);
        
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Avg PM2.5 (Industrial Area)',
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * (100 - 60) + 60)),
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                },
                {
                    label: 'Avg PM2.5 (Tatu City)',
                    data: Array.from({length: 30}, () => Math.floor(Math.random() * (50 - 30) + 30)),
                    borderColor: '#22c55e',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top', align: 'end' }
                },
                scales: {
                    y: { beginAtZero: false, grid: { color: '#f3f4f6' } },
                    x: { grid: { display: false }, ticks: { maxTicksLimit: 10 } }
                }
            }
        });
    }

    // ... (Keep your existing Dashboard, Gallery, Project, and Contact code here) ...
});
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Tab Functionality ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => {
                    b.classList.remove('bg-green-600', 'text-white');
                    b.classList.add('bg-white', 'text-gray-600');
                });
                tabPanes.forEach(pane => pane.classList.add('hidden'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // Add active class to clicked button and corresponding pane
                btn.classList.remove('bg-white', 'text-gray-600');
                btn.classList.add('bg-green-600', 'text-white');
                
                const tabId = btn.getAttribute('data-tab');
                const activePane = document.getElementById(tabId);
                if(activePane) {
                    activePane.classList.remove('hidden');
                    activePane.classList.add('active');
                }
            });
        });
    }

    // --- 2. Impact Calculator ---
    const calcBtn = document.getElementById('calc-btn');
    const carInput = document.getElementById('car-trips');
    const busInput = document.getElementById('bus-trips');
    const co2Result = document.getElementById('co2-saved');
    const treesResult = document.getElementById('trees-equiv');

    if(calcBtn) {
        calcBtn.addEventListener('click', () => {
            const carTrips = parseFloat(carInput.value) || 0;
            const busTrips = parseFloat(busInput.value) || 0;
            
            // Simple estimation logic (Demo values)
            // Assume 1 car trip = 2kg CO2, 1 bus trip = 0.5kg CO2 (per person)
            // Switching 1 car trip to bus saves ~1.5kg CO2
            const tripsSwitched = Math.max(0, carTrips - busInput.dataset.original || 0); 
            
            // Let's do a simpler calculation: 
            // Current Emissions vs Potential if all were bus
            const currentEmissions = (carTrips * 2.0) + (busTrips * 0.5);
            const potentialEmissions = (carTrips + busTrips) * 0.5; // If all took bus
            const savedPerWeek = currentEmissions - potentialEmissions;
            const savedPerMonth = savedPerWeek * 4.3;
            
            // 1 Tree absorbs approx 20kg CO2 per year -> ~1.6kg per month
            const treesEquivalent = savedPerMonth / 1.6;

            // Animate numbers
            animateValue(co2Result, 0, Math.round(savedPerMonth), 1000, ' kg');
            animateValue(treesResult, 0, treesEquivalent.toFixed(1), 1000, '');
        });
    }

    // Helper function to animate numbers
    function animateValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = value.toLocaleString() + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ... (Keep your existing Charts, Gallery, Project, and Contact code here) ...
})/**
 * About Page JavaScript
 * Handles animations, form submission, and integrations
 */

document.addEventListener('DOMContentLoaded', () => {
    initializeAboutPage();
});

function initializeAboutPage() {
    console.log('📄 About Page - Initializing...');
    
    // Animate stats counter
    animateStats();
    
    // Setup contact form
    setupContactForm();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Track page view
    if (window.analytics) {
        analytics.trackPageView('/about');
        analytics.trackEvent('page', 'about_viewed');
    }
    
    console.log('✅ About Page - Ready');
}

// Animate stats counter with intelligent timing
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.dataset.target);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                
                animateCounter(stat, target, suffix);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target, suffix = '', duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Contact form handling
function setupContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            showFormError('Please fill in all required fields.');
            return;
        }
        
        // Show loading state
        form.classList.add('loading');
        
        try {
            // Send to backend
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    timestamp: Date.now(),
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    userId: window.analytics?.userId || 'anonymous'
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            
            // Success
            form.classList.remove('loading');
            showFormSuccess('Thank you! Your message has been sent. We\'ll respond within 24 hours.');
            form.reset();
            
            // Track conversion
            if (window.analytics) {
                analytics.trackEvent('contact', 'form_submitted', data.subject);
            }
            
        } catch (error) {
            console.error('Contact form error:', error);
            form.classList.remove('loading');
            showFormError('Something went wrong. Please try again or email us directly.');
            
            // Queue for offline sync
            if (window.pwaHandler) {
                window.pwaHandler.queueForSync({
                    url: '/api/contact',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
        }
    });
}

function validateForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Message length
    if (data.message.length < 10) {
        return false;
    }
    
    return true;
}

function showFormSuccess(message) {
    // Remove existing success/error messages
    removeFormMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success show';
    successDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.appendChild(successDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function showFormError(message) {
    removeFormMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-success show';
    errorDiv.style.background = 'rgba(233, 69, 96, 0.1)';
    errorDiv.style.borderColor = 'var(--accent-color)';
    errorDiv.style.color = 'var(--accent-color)';
    errorDiv.textContent = message;
    
    const form = document.getElementById('contact-form');
    form.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function removeFormMessages() {
    const existing = document.querySelectorAll('.form-success');
    existing.forEach(el => el.remove());
}

// Scroll animations for about page
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Track section views
                if (window.analytics && entry.target.id) {
                    analytics.trackEvent('scroll', 'section_viewed', entry.target.id);
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Add smooth scroll for team social links
document.querySelectorAll('.team-social a, .social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            if (window.analytics) {
                analytics.trackEvent('social', 'link_clicked', href);
            }
        }
    });
});

// Track career card clicks
document.querySelectorAll('.career-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.career-card');
        const position = card.querySelector('h3')?.textContent || 'Unknown';
        
        if (window.analytics) {
            analytics.trackEvent('careers', 'position_clicked', position);
        }
    });
});

// Personalization for about page
function personalizeAboutPage() {
    if (!window.personalization) return;
    
    const userProfile = window.personalization.userProfile;
    
    // Show relevant team members based on interests
    if (userProfile.preferences?.interests) {
        highlightRelevantTeam(userProfile.preferences.interests);
    }
    
    // Show location-specific contact info
    if (window.personalization.behaviorData?.location) {
        showRegionalContact(window.personalization.behaviorData.location);
    }
}

function highlightRelevantTeam(interests) {
    // Highlight team members based on user interests
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const role = card.querySelector('.team-role')?.textContent || '';
        
        if (interests.some(interest => role.toLowerCase().includes(interest.toLowerCase()))) {
            card.style.border = '2px solid var(--primary-color)';
            card.style.transform = 'scale(1.02)';
        }
    });
}

function showRegionalContact(location) {
    // Show regional office info if available
    const regionalOffices = {
        'United States': '📍 Headquarters - San Francisco, CA',
        'Japan': '📍 Asia Pacific Office - Tokyo',
        'Germany': '📍 European Office - Berlin',
        'United Kingdom': '📍 UK Office - London'
    };
    
    const regionalInfo = regionalOffices[location.country];
    if (regionalInfo) {
        const contactSection = document.querySelector('.contact-info');
        if (contactSection) {
            const regionalDiv = document.createElement('div');
            regionalDiv.className = 'contact-item';
            regionalDiv.innerHTML = `
                <span class="contact-icon">🌍</span>
                <div>
                    <h4>Regional Office</h4>
                    <p>${regionalInfo}</p>
                </div>
            `;
            contactSection.appendChild(regionalDiv);
        }
    }
}

// Initialize personalization
setTimeout(personalizeAboutPage, 1000);

// Export functions
window.aboutPage = {
    animateStats,
    setupContactForm,
    personalizeAboutPage
};

console.log(' About Page Modules Loaded');
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Fade In Animation on Scroll ---
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(el => fadeInObserver.observe(el));

    // --- Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target + (target > 100 ? '+' : ''); 
                    }
                };
                
                updateCount();
                observer.unobserve(counter); 
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => countObserver.observe(counter));

    // --- Navbar Background Change on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });

    // --- Newsletter Form Submit (Demo) ---
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            if(email) {
                alert(`Thank you for subscribing with ${email}! We will keep you updated on EcoWatch projects.`);
                form.reset();
            }
        });
    }

    console.log('🌿 EcoWatch Home Page Loaded Successfully');
});