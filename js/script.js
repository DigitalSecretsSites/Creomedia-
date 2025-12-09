// ===== NAVBAR TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', false);
        });
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== FADE IN ANIMATIONS =====
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            // Add staggered delay for smoother entrance
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', () => {
    // Initial check on load
    setTimeout(fadeInOnScroll, 300);
});

// Enhanced scroll behavior for smoother navigation
window.addEventListener('load', () => {
    // Add slight delay to ensure all elements are loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ===== ANIMATED COUNTERS =====
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
};

// Start counters when in view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const counterSection = document.querySelector('.counters');
if (counterSection) {
    observer.observe(counterSection);
}

// ===== CHATBOT FUNCTIONALITY =====
class Chatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.knowledgeBase = {
            greetings: {
                keywords: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening'],
                responses: [
                    "Hey! How are you doing today? 👋",
                    "Hi there! How are you? Let me know if I can help with anything!",
                    "Hello! Hope you're having a great day. How can I assist you?"
                ]
            },
            services: {
                keywords: ['service', 'offer', 'do', 'work', 'marketing', 'design', 'social'],
                responses: [
                    "We offer a full suite of digital services including:\n• Social Media Management\n• Content Creation\n• Web Design & Development\n• Paid Advertising\n\nWhich one are you interested in?",
                    "Our expertise covers Digital Strategy, Branding, and Performance Marketing. Would you like to see our portfolio?"
                ]
            },
            pricing: {
                keywords: ['price', 'cost', 'quote', 'rate', 'money', 'expensive', 'cheap', 'package'],
                responses: [
                    "We offer customized packages tailored to your specific needs. Basic social media management starts at $500/mo. Would you like a free consultation to get a precise quote?",
                    "Since every project is unique, we prefer to give custom quotes. Please tell me a bit more about your project goals!"
                ]
            },
            contact: {
                keywords: ['contact', 'email', 'phone', 'call', 'reach', 'address', 'location'],
                responses: [
                    "You can reach us directly at contact@creomedia.com or call +1 (555) 123-4567. Alternatively, you can fill out the form on this page!",
                    "Our team is available Mon-Fri, 9am-6pm. Feel free to drop your email here, and we'll get back to you."
                ]
            },
            about: {
                keywords: ['who', 'creomedia', 'team', 'agency', 'about'],
                responses: [
                    "CreoMedia is a premium digital agency focused on human-centric marketing. We blend creativity with data to build brands that matter.",
                    "We are a team of passionate creators, strategists, and developers dedicated to growing your digital presence."
                ]
            },
            default: {
                responses: [
                    "I'm not quite sure I understand, but I'd love to help. Could you rephrase that?",
                    "That's interesting! Could you tell me more about what you're looking for?",
                    "I'm still learning! For complex queries, it might be best to email us at contact@creomedia.com."
                ]
            }
        };
        this.initialize();
    }

    initialize() {
        this.createWidget();
        // Add initial greeting after a small delay
        setTimeout(() => {
            if (this.messages.length === 0) {
                this.addMessage("Hi! I'm the CreoMedia AI assistant. Ask me anything about our services!", 'bot');
            }
        }, 1000);
        this.setupEventListeners();
    }

    createWidget() {
        this.chatbotBtn = document.getElementById('chatbotBtn');
        this.chatbotContainer = document.getElementById('chatbotContainer');
        this.chatbotMessages = document.getElementById('chatbotMessages');
        this.chatbotInput = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.closeChatbot = document.getElementById('closeChatbot');
    }

    setupEventListeners() {
        this.chatbotBtn.addEventListener('click', () => this.toggleChatbot());
        this.closeChatbot.addEventListener('click', () => this.close());
        this.sendBtn.addEventListener('click', () => this.handleSendMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSendMessage();
        });
    }

    toggleChatbot() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            // Show with animation
            this.chatbotContainer.style.display = 'flex';
            this.chatbotContainer.style.opacity = '0';
            this.chatbotContainer.style.transform = 'scale(0.95)';
            
            // Animate in
            setTimeout(() => {
                this.chatbotContainer.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
                this.chatbotContainer.style.opacity = '1';
                this.chatbotContainer.style.transform = 'scale(1)';
            }, 10);
            
            this.chatbotInput.focus();
            this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
        } else {
            // Animate out
            this.chatbotContainer.style.opacity = '0';
            this.chatbotContainer.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.chatbotContainer.style.display = 'none';
                // Reset styles
                this.chatbotContainer.style.transition = '';
                this.chatbotContainer.style.transform = '';
            }, 300);
        }
    }

    close() {
        this.isOpen = false;
        
        // Animate out
        this.chatbotContainer.style.opacity = '0';
        this.chatbotContainer.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.chatbotContainer.style.display = 'none';
            // Reset styles
            this.chatbotContainer.style.transition = '';
            this.chatbotContainer.style.transform = '';
        }, 300);
    }

    renderMessages() {
        this.chatbotMessages.innerHTML = '';
        this.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender}-message ${msg.type === 'typing' ? 'typing' : ''}`;
            messageDiv.innerHTML = msg.text; // Use innerHTML to allow line breaks
            this.chatbotMessages.appendChild(messageDiv);
        });
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    }

    addMessage(text, sender, type = 'text') {
        const message = { text, sender, type };

        if (type === 'typing') {
            this.messages.push(message);
        } else {
            // Remove typing indicator if exists
            this.messages = this.messages.filter(m => m.type !== 'typing');
            this.messages.push(message);
        }

        this.renderMessages();
    }

    generateResponse(input) {
        const lowerInput = input.toLowerCase();

        // Check for matches in knowledge base
        for (const category in this.knowledgeBase) {
            if (category === 'default') continue;

            const { keywords, responses } = this.knowledgeBase[category];
            if (keywords.some(keyword => lowerInput.includes(keyword))) {
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Default response
        const defaults = this.knowledgeBase.default.responses;
        return defaults[Math.floor(Math.random() * defaults.length)];
    }

    handleSendMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        this.chatbotInput.value = '';

        // Show typing indicator
        setTimeout(() => {
            this.addMessage('<div class="typing-dots"><span></span><span></span><span></span></div>', 'bot', 'typing');

            // Calculate realistic delay based on response length (min 1s, max 3s)
            const responseText = this.generateResponse(message);
            const delay = Math.min(3000, Math.max(1000, responseText.length * 30));

            setTimeout(() => {
                this.addMessage(responseText.replace(/\n/g, '<br>'), 'bot');
            }, delay);
        }, 500);
    }
}

// ===== WHATSAPP WIDGET =====
const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
        const phone = '+15551234567'; // Placeholder number
        const message = 'Hello CreoMedia! I visited your website and would like more information.';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// ===== TOAST NOTIFICATION SYSTEM =====
function showToast(message, type = 'success') {
    // Remove any existing toasts
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    // Add icon based on type
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// ===== FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        // Specific validation
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Reset errors
        [name, email, message].forEach(el => {
            el.classList.remove('input-error');
            // Remove error listener if exists to prevent duplicates
            el.oninput = () => el.classList.remove('input-error');
        });

        if (!name.value.trim()) {
            showToast('Please enter your full name', 'error');
            name.classList.add('input-error');
            isValid = false;
        } else if (!email.value.trim()) {
            showToast('Please enter your email address', 'error');
            email.classList.add('input-error');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showToast('Please enter a valid email address', 'error');
            email.classList.add('input-error');
            isValid = false;
        } else if (!message.value.trim()) {
            showToast('Please enter your message', 'error');
            message.classList.add('input-error');
            isValid = false;
        }

        if (!isValid) return;

        // Formspree integration
        const formData = new FormData(contactForm);

        // Show loading state with spinner
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })

            .then(async response => {
                const data = await response.json();

                if (response.ok) {
                    showToast('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    // Try to get specific error message from Formspree
                    let errorMessage = 'Oops! There was a problem sending your message.';

                    if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                        // Formspree error format: { errors: [{ field: "email", message: "should be an email" }] }
                        const firstError = data.errors[0];
                        if (firstError.field) {
                            errorMessage = `Error in ${firstError.field}: ${firstError.message}`;
                        } else if (firstError.message) {
                            errorMessage = firstError.message;
                        }
                    } else if (data.error) {
                        errorMessage = data.error;
                    }

                    showToast(errorMessage, 'error');
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                showToast('Network error. Unable to reach the server. Please check your connection.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            });
    });
}

// ===== PORTFOLIO FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ===== INITIALIZE CHATBOT =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize chatbot
    if (document.getElementById('chatbotBtn')) {
        new Chatbot();
    }

    // Initialize animations
    fadeInOnScroll();
});