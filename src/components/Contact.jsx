import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Contact = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Initialize AOS
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true, 
      offset: 50 
    });
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // AI Assistant functions
  const toggleAI = () => {
    setIsAIOpen(!isAIOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  const getAIResponse = (question) => {
    const lower = question.toLowerCase();
    
    if (lower.includes('admission') || lower.includes('apply')) {
      return 'You can apply online via our Admissions page. Requirements vary by programme.';
    }
    if (lower.includes('fee') || lower.includes('cost') || lower.includes('tuition')) {
      return 'Tuition fees depend on the programme. Please visit the Admissions page for detailed fee structure.';
    }
    if (lower.includes('programme') || lower.includes('course')) {
      return 'We offer Entrepreneurship, Business Management, Technology, and Fresh Graduate programmes. Visit our Programmes page for details.';
    }
    if (lower.includes('campus') || lower.includes('location')) {
      return 'Our main campus is at 123 Innovation Drive, Lagos. We also have virtual options.';
    }
    if (lower.includes('contact') || lower.includes('phone') || lower.includes('email')) {
      return 'You can reach us at +234 800 123 4567, email info@sia.edu, or visit our Contact page for more options.';
    }
    if (lower.includes('hours') || lower.includes('open')) {
      return 'Our office hours are Monday to Friday, 8:00 AM - 6:00 PM, and Saturday 9:00 AM - 2:00 PM.';
    }
    if (lower.includes('whatsapp')) {
      return 'You can chat with us on WhatsApp at +234 800 123 4567.';
    }
    return 'Thank you for your question. Please contact our admissions office for detailed information.';
  };

  const askAI = () => {
    if (!aiInput.trim()) return;

    setAiMessages(prev => [...prev, { type: 'user', text: aiInput }]);

    const reply = getAIResponse(aiInput);
    setTimeout(() => {
      setAiMessages(prev => [...prev, { type: 'bot', text: reply }]);
    }, 300);

    setAiInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      askAI();
    }
  };

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/programmes', label: 'Programmes' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/research', label: 'Research' },
    { to: '/student-life', label: 'Student Life' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact', active: true },
    { to: '/verify', label: 'Verify' },
  ];

  // Contact info cards
  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      content: '123 Innovation Drive,<br />Lagos, Nigeria'
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      content: '<a href="tel:+2348001234567">+234 800 123 4567</a>'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      content: '<a href="mailto:info@sia.edu">info@sia.edu</a>'
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'WhatsApp',
      content: '<a href="https://wa.me/2348001234567">+234 800 123 4567</a>'
    }
  ];

  // Sidebar info items
  const sidebarInfo = [
    {
      icon: 'fas fa-map-pin',
      title: 'Office Address',
      content: '123 Innovation Drive,<br />Lagos, Nigeria'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      content: '<a href="tel:+2348001234567">+234 800 123 4567</a>'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      content: '<a href="mailto:info@sia.edu">info@sia.edu</a>'
    },
    {
      icon: 'fas fa-clock',
      title: 'Office Hours',
      content: 'Mon - Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM'
    }
  ];

  // Social links
  const socialLinks = [
    { icon: 'fab fa-facebook-f', label: 'Facebook' },
    { icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    { icon: 'fab fa-instagram', label: 'Instagram' },
    { icon: 'fab fa-twitter', label: 'Twitter' },
    { icon: 'fab fa-youtube', label: 'YouTube' }
  ];

  // Form handlers
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const { firstName, lastName, email, subject, message } = formData;

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!subject) errors.subject = 'Please select a subject';
    if (!message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.form-group .error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you within 24-48 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      {/* ===== GLASS NAVIGATION ===== */}
      <nav className="glass-nav">
        <div className="nav-logo">
          <img src="/sia-logo.svg" alt="SIA Logo" width="160" height="48" />
        </div>
        
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <a href={link.to} className={link.active ? 'active' : ''} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-nav-actions">
            <a href="/login" className="btn-glass" onClick={closeMenu}>Login</a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="/login/student-login.php" className="btn-glass">Login</a>
        </div>
      </nav>

      {/* ===== PAGE HERO ===== */}
      <section className="page-hero contact-hero">
        <div className="container">
          <h1 data-aos="fade-up">Contact Us</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            We'd love to hear from you. Reach out to us for inquiries about admissions, programmes, partnerships, or any other questions.
          </p>
          
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((item, index) => (
              <div className="contact-info-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <div className="icon-wrapper"><i className={item.icon}></i></div>
                <h4>{item.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: item.content }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAP ===== */}
      <section className="map-section">
        <div className="container">
          <div className="map-container" data-aos="fade-up">
            <div className="map-placeholder">
              <i className="fas fa-map-marked-alt"></i>
              <p>SIA Campus Map</p>
              <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>123 Innovation Drive, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM & SIDEBAR ===== */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-form" data-aos="fade-right">
            <h2>Send Us a Message</h2>
            <p className="form-subtitle">Fill in the form below and we'll get back to you as soon as possible.</p>
            
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="Enter your first name" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={formErrors.firstName ? 'error-input' : ''}
                  />
                  {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Enter your last name" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={formErrors.lastName ? 'error-input' : ''}
                  />
                  {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email address" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? 'error-input' : ''}
                  />
                  {formErrors.email && <span className="error">{formErrors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject <span className="required">*</span></label>
                <select 
                  id="subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={formErrors.subject ? 'error-input' : ''}
                >
                  <option value="">Select a subject</option>
                  <option value="admissions">Admissions Inquiry</option>
                  <option value="programmes">Programme Information</option>
                  <option value="partnership">Partnership Opportunities</option>
                  <option value="research">Research Collaboration</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
                {formErrors.subject && <span className="error">{formErrors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message <span className="required">*</span></label>
                <textarea 
                  id="message" 
                  placeholder="Write your message here..." 
                  value={formData.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? 'error-input' : ''}
                  rows="4"
                ></textarea>
                {formErrors.message && <span className="error">{formErrors.message}</span>}
              </div>
              
              <div className="form-group">
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="contact-sidebar" data-aos="fade-left">
            <h3>Get in Touch</h3>
            
            {sidebarInfo.map((item, index) => (
              <div className="info-item" key={index}>
                <div className="icon"><i className={item.icon}></i></div>
                <div className="content">
                  <h5>{item.title}</h5>
                  <p dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              </div>
            ))}
            
            <div className="social-links-section">
              <h4>Connect With Us</h4>
              <div className="social-links-grid">
                {socialLinks.map((link, index) => (
                  <a href="#" aria-label={link.label} key={index}>
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Ready to Start Your Journey?</h2>
          <p>Take the first step toward becoming a leader in innovation and entrepreneurship.</p>
          <a href="/admissions" className="btn-primary">Apply Today</a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>SIA</h3>
              <p>Start-up Innovation Academy</p>
              <p><i className="fas fa-map-pin"></i> 123 Innovation Drive, Lagos</p>
              <p><i className="fas fa-phone"></i> +234 800 123 4567</p>
              <p><i className="fas fa-envelope"></i> info@sia.edu</p>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/programmes">Programmes</a></li>
                <li><a href="/admissions">Admissions</a></li>
                <li><a href="/research">Research</a></li>
              </ul>
            </div>
            <div>
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
              <h4>Newsletter</h4>
              <form onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email" />
                <button type="submit"><i className="fas fa-arrow-right"></i></button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Start-up Innovation Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ===== WHATSAPP FLOATING BUTTON ===== */}
      <a 
        href="https://wa.me/2348001234567" 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
        <span>Chat with us</span>
      </a>

      {/* ===== AI FLOATING ASSISTANT ===== */}
      <div className="ai-assistant">
        <div className="ai-toggle" onClick={toggleAI}>
          <i className="fas fa-robot"></i>
        </div>
        <div className={`ai-window glass ${isAIOpen ? 'open' : ''}`}>
          <div className="ai-header">
            SIA Assistant
            <span onClick={toggleAI} style={{ cursor: 'pointer' }}>✕</span>
          </div>
          <div className="ai-body">
            {aiMessages.map((msg, index) => (
              <p key={index} className={msg.type === 'user' ? 'user-message' : 'bot-message'}>
                {msg.type === 'user' ? 'You: ' : 'SIA: '}
                {msg.text}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="ai-input">
            <input 
              type="text" 
              placeholder="Type your question..." 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={askAI}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;