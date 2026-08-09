import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Admissions = () => {
    // Add this useEffect inside the component

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
    programme: '',
    intake: '',
    education: '',
    message: '',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // FAQ state
  const [activeFaq, setActiveFaq] = useState(0);

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
    
    if (lower.includes('admission') || lower.includes('apply') || lower.includes('application')) {
      return 'You can apply online via our application form on this page. Requirements include a bachelor\'s degree, English proficiency, and relevant work experience depending on the programme.';
    }
    if (lower.includes('fee') || lower.includes('cost') || lower.includes('tuition') || lower.includes('price')) {
      return 'Tuition fees vary by programme. Please check the individual programme pages for detailed fee information. We also offer scholarships and payment plans to make education accessible.';
    }
    if (lower.includes('scholarship') || lower.includes('financial aid') || lower.includes('funding')) {
      return 'We offer merit-based scholarships (100%), women in tech scholarships (50%), and early bird discounts (25%). Visit our Scholarships section for more details and application requirements.';
    }
    if (lower.includes('deadline') || lower.includes('when') || lower.includes('date') || lower.includes('intake')) {
      return 'Application deadlines vary by programme. Our Fresh Graduate Programme has deadlines in November, February, May, and August. Other programmes accept applications on a rolling basis throughout the year.';
    }
    if (lower.includes('programme') || lower.includes('course') || lower.includes('study')) {
      return 'We offer Entrepreneurship (12 weeks), Business Management (16 weeks), Technology (24 weeks), AI & Data Science (16 weeks), Digital Marketing (10 weeks), and Fresh Graduate Programme (12 weeks). Visit our Programmes page for complete details.';
    }
    if (lower.includes('campus') || lower.includes('location') || lower.includes('address')) {
      return 'Our main campus is at 123 Innovation Drive, Lagos, Nigeria. We also offer virtual learning options for remote students across Africa and beyond.';
    }
    if (lower.includes('document') || lower.includes('require') || lower.includes('need') || lower.includes('upload')) {
      return 'You need to submit: academic transcripts, a CV/resume, a statement of purpose, and two letters of recommendation from academic or professional referees.';
    }
    return 'Thank you for your question! For more detailed information, please contact our admissions office at admissions@sia.edu or call +234 800 123 4567. We\'re here to help!';
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

  // Form handlers
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    // Clear error for this field
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setFormData(prev => ({ ...prev, resume: file }));
      } else {
        alert('Please upload a PDF, DOC, or DOCX file.');
        e.target.value = '';
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    const { firstName, lastName, email, phone, programme, education, message } = formData;

    if (!firstName.trim()) errors.firstName = 'First name is required';
    if (!lastName.trim()) errors.lastName = 'Last name is required';
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (!programme) errors.programme = 'Please select a programme';
    if (!education) errors.education = 'Please select your highest qualification';
    if (!message.trim()) errors.message = 'Statement of purpose is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = document.querySelector('.form-group .error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('🎉 Your application has been submitted successfully! We will contact you within 24-48 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        programme: '',
        intake: '',
        education: '',
        message: '',
        resume: null
      });
      // Reset file input
      const fileInput = document.getElementById('resume');
      if (fileInput) fileInput.value = '';
      setIsSubmitting(false);
    }, 1500);
  };

  // FAQ toggle
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? -1 : index);
  };

  // Navigation links
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/programmes', label: 'Programmes' },
    { to: '/admissions', label: 'Admissions', active: true },
    { to: '/research', label: 'Research' },
    { to: '/student-life', label: 'Student Life' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Requirements data
  const requirements = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Academic Qualifications',
      description: 'Minimum of a Bachelor\'s degree or equivalent qualification from a recognized institution. Professional certifications may be considered for certain programmes.'
    },
    {
      icon: 'fas fa-language',
      title: 'Language Proficiency',
      description: 'Proficiency in English is required. International applicants may need to provide TOEFL or IELTS scores depending on their country of origin.'
    },
    {
      icon: 'fas fa-briefcase',
      title: 'Professional Experience',
      description: 'Relevant work experience is preferred for our professional programmes. Fresh graduates are welcome to apply for our Fresh Graduate Programme.'
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Application Documents',
      description: 'Submit your academic transcripts, CV/resume, statement of purpose, and two letters of recommendation from academic or professional referees.'
    }
  ];

  // Steps data
  const steps = [
    {
      number: 1,
      title: 'Choose Your Programme',
      description: 'Explore our programmes and select the one that best fits your career goals and interests.'
    },
    {
      number: 2,
      title: 'Submit Application',
      description: 'Complete our online application form and upload all required documents for review.'
    },
    {
      number: 3,
      title: 'Application Review',
      description: 'Our admissions team will review your application and contact you for an interview if shortlisted.'
    },
    {
      number: 4,
      title: 'Payment & Enrollment',
      description: 'Upon acceptance, complete your tuition payment and enroll in your chosen programme.'
    }
  ];

  // Scholarships data
  const scholarships = [
    {
      amount: '100%',
      title: 'Merit Scholarship',
      description: 'Full tuition coverage for exceptional candidates with outstanding academic and professional achievements.'
    },
    {
      amount: '50%',
      title: 'Women in Tech Scholarship',
      description: 'Supporting women pursuing careers in technology and entrepreneurship across Africa.'
    },
    {
      amount: '25%',
      title: 'Early Bird Discount',
      description: 'Apply early and receive a 25% discount on your tuition fees. Limited slots available.'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'What are the application deadlines?',
      answer: 'Application deadlines vary by programme. Our Fresh Graduate Programme has deadlines in November, February, May, and August. Other programmes accept applications on a rolling basis. Please check individual programme pages for specific deadlines.'
    },
    {
      question: 'Is there an application fee?',
      answer: 'There is a non-refundable application fee of ₦10,000 for all programmes. This fee covers the cost of application processing and review.'
    },
    {
      question: 'Can I apply for multiple programmes?',
      answer: 'Yes, you may apply for up to two programmes. However, you must submit a separate application for each programme and pay the application fee for each.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept payments via Paystack, Flutterwave, bank transfer, and installment payment plans. All payment details will be provided upon acceptance of your application.'
    },
    {
      question: 'Is there financial aid available?',
      answer: 'Yes, we offer various financial aid options including scholarships, payment plans, and need-based assistance. Please contact our admissions office for more details.'
    }
  ];

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
      <section className="page-hero admissions-hero">
        <div className="container">
          <h1 data-aos="fade-up">Admissions</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Join Africa's leading innovation academy. Learn about our entry requirements, application process, and how to become part of the SIA community.
          </p>
         
        </div>
      </section>

      {/* ===== ENTRY REQUIREMENTS ===== */}
      <section className="requirements">
        <div className="container">
          <h2 data-aos="fade-up">Entry Requirements</h2>
          <div className="requirements-grid">
            {requirements.map((req, index) => (
              <div className="requirement-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <i className={req.icon}></i>
                <h4>{req.title}</h4>
                <p>{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== APPLICATION STEPS ===== */}
      <section className="application-steps">
        <div className="container">
          <h2 data-aos="fade-up">How to Apply</h2>
          <div className="steps-container">
            {steps.map((step, index) => (
              <div className="step-item" data-aos="zoom-in" data-aos-delay={index * 100} key={index}>
                <div className="step-number">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ONLINE APPLICATION FORM ===== */}
      <section className="application-form" id="applicationForm">
        <div className="container">
          <h2 data-aos="fade-up">Online Application</h2>
          <p className="subtitle" data-aos="fade-up" data-aos-delay="100">
            Complete the form below to begin your journey with SIA
          </p>
          
          <div className="form-wrapper" data-aos="fade-up">
            <form onSubmit={handleSubmit}>
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
                  <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? 'error-input' : ''}
                  />
                  {formErrors.phone && <span className="error">{formErrors.phone}</span>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="programme">Programme of Interest <span className="required">*</span></label>
                  <select 
                    id="programme" 
                    value={formData.programme}
                    onChange={handleInputChange}
                    className={formErrors.programme ? 'error-input' : ''}
                  >
                    <option value="">Select a programme</option>
                    <option value="entrepreneurship">Entrepreneurship (12 Weeks)</option>
                    <option value="business">Business Management (16 Weeks)</option>
                    <option value="technology">Technology (24 Weeks)</option>
                    <option value="professional">Professional Development (8 Weeks)</option>
                    <option value="ai">AI & Data Science (16 Weeks)</option>
                    <option value="digital-marketing">Digital Marketing (10 Weeks)</option>
                    <option value="fresh-graduate">Fresh Graduate Programme (12 Weeks)</option>
                  </select>
                  {formErrors.programme && <span className="error">{formErrors.programme}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="intake">Intake Preference</label>
                  <select 
                    id="intake" 
                    value={formData.intake}
                    onChange={handleInputChange}
                  >
                    <option value="">Select intake</option>
                    <option value="january">January 2026</option>
                    <option value="april">April 2026</option>
                    <option value="july">July 2026</option>
                    <option value="october">October 2026</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="education">Highest Level of Education <span className="required">*</span></label>
                <select 
                  id="education" 
                  value={formData.education}
                  onChange={handleInputChange}
                  className={formErrors.education ? 'error-input' : ''}
                >
                  <option value="">Select your highest qualification</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="phd">PhD</option>
                  <option value="professional">Professional Certification</option>
                  <option value="diploma">Diploma</option>
                  <option value="high-school">High School / Secondary</option>
                </select>
                {formErrors.education && <span className="error">{formErrors.education}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Statement of Purpose <span className="required">*</span></label>
                <textarea 
                  id="message" 
                  placeholder="Tell us why you want to join SIA and what you hope to achieve..." 
                  value={formData.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? 'error-input' : ''}
                  rows="4"
                ></textarea>
                {formErrors.message && <span className="error">{formErrors.message}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="resume">Upload CV/Resume (PDF, DOC, DOCX)</label>
                <input 
                  type="file" 
                  id="resume" 
                  accept=".pdf,.doc,.docx" 
                  onChange={handleFileChange}
                />
              </div>
              
              <div className="form-group">
                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ===== SCHOLARSHIPS ===== */}
      <section className="scholarships">
        <div className="container">
          <h2 data-aos="fade-up">Scholarships</h2>
          <p className="subtitle" data-aos="fade-up" data-aos-delay="100">
            We believe in making quality education accessible to all. Explore our scholarship opportunities.
          </p>
          
          <div className="scholarship-grid">
            {scholarships.map((scholarship, index) => (
              <div className="scholarship-card" data-aos="zoom-in" data-aos-delay={index * 100} key={index}>
                <div className="amount">{scholarship.amount}</div>
                <h4>{scholarship.title}</h4>
                <p>{scholarship.description}</p>
                <a href="#" className="btn-outline-light">Learn More</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="faq-section">
        <div className="container">
          <h2 data-aos="fade-up">Frequently Asked Questions</h2>
          
          <div className="faq-grid" data-aos="fade-up">
            {faqs.map((faq, index) => (
              <div className={`faq-item ${activeFaq === index ? 'active' : ''}`} key={index}>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  {faq.question}
                  <i className="fas fa-chevron-down"></i>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD BROCHURE ===== */}
      <section className="download-section">
        <div className="container" data-aos="zoom-in">
          <h2>Download Our Brochure</h2>
          <p>Get detailed information about all our programmes, faculty, facilities, and campus life in our comprehensive brochure.</p>
          <a href="#" className="btn-download"><i className="fas fa-download"></i> Download Brochure (PDF)</a>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Ready to Apply?</h2>
          <p>Take the first step toward becoming a leader in innovation and entrepreneurship.</p>
          <a href="#applicationForm" className="btn-primary">Apply Now</a>
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

export default Admissions;