import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const courseData = location.state?.course || null;
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: courseData?.title || '',
    price: courseData?.price || '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  
  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasNumber: false,
    hasLetter: false,
    hasSpecialChar: false
  });

  // Course data with prices
  const coursePrices = {
    'Fresh Graduate Programme': '₦250,000',
    'Entrepreneurship': '₦350,000',
    'Business Management': '₦450,000',
    'Technology': '₦550,000',
    'AI & Data Science': '₦500,000',
    'Digital Marketing': '₦300,000',
    'Professional Development': '₦250,000'
  };

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true, 
      offset: 50 
    });
    window.scrollTo(0, 0);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/programmes', label: 'Programmes' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/research', label: 'Research' },
    { to: '/student-life', label: 'Student Life' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Password validation function
  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    setPasswordStrength({
      hasMinLength,
      hasNumber,
      hasLetter,
      hasSpecialChar
    });
    
    return hasMinLength && hasNumber && hasLetter && hasSpecialChar;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    if (id === 'course') {
      setFormData(prev => ({ ...prev, price: coursePrices[value] || '' }));
    }
    
    if (id === 'password') {
      validatePassword(value);
    }
    
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateForm = () => {
    const newErrors = {};
    const { fullName, email, phone, course, password, confirmPassword } = formData;

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (fullName.trim().length < 2) newErrors.fullName = 'Full name must be at least 2 characters';

    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address';

    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) newErrors.phone = 'Please enter a valid phone number';

    if (!course) newErrors.course = 'Please select a course';

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      const isValid = validatePassword(password);
      if (!isValid) {
        newErrors.password = 'Password must contain at least 8 characters, one number, one letter, and one special character';
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) newErrors.agreeTerms = 'Please agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get password strength percentage
  const getPasswordStrength = () => {
    const { hasMinLength, hasNumber, hasLetter, hasSpecialChar } = passwordStrength;
    const checks = [hasMinLength, hasNumber, hasLetter, hasSpecialChar];
    const passed = checks.filter(check => check).length;
    return (passed / 4) * 100;
  };

  // Get password strength color
  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return '#E8E0D4';
    if (strength <= 25) return '#dc3545';
    if (strength <= 50) return '#ffc107';
    if (strength <= 75) return '#17a2b8';
    return '#28a745';
  };

  // Get password strength label
  const getStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength === 0) return 'Enter a password';
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
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
      setIsSubmitting(false);
      alert('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    }, 1500);
  };

  return (
    <>
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
              <a href={link.to} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-nav-actions">
            <a href="/login" className="btn-glass" onClick={closeMenu}>Login</a>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="/login" className="btn-glass">Login</a>
        </div>
      </nav>

      {/* ===== PAGE HERO ===== */}
      <section className="page-hero signup-hero">
        <div className="container">
          <h1 data-aos="fade-up">Create Account</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Register to begin your journey at Start-up Innovation Academy.
          </p>
          <div className="breadcrumb" data-aos="fade-up" data-aos-delay="300">
            <a href="/">Home</a>
            <span>/</span>
            <span>Sign Up</span>
          </div>
        </div>
      </section>

      {/* ===== SIGNUP FORM ===== */}
      <section className="signup-section section-padding">
        <div className="container">
          <div className="signup-wrapper" data-aos="fade-up">
            <div className="signup-header">
              <div className="signup-header-line" data-aos="fade-right" data-aos-delay="100"></div>
              <h2 data-aos="fade-up" data-aos-delay="200">Register Now</h2>
              <p data-aos="fade-up" data-aos-delay="300">Complete the form below to create your account.</p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              {/* Course Selection */}
              <div className="form-group" data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="course">Course of Choice <span className="required">*</span></label>
                <div className="select-wrapper">
                  <select 
                    id="course" 
                    value={formData.course}
                    onChange={handleInputChange}
                    className={errors.course ? 'error-input' : ''}
                  >
                    <option value="">Select a course</option>
                    <option value="Fresh Graduate Programme">Fresh Graduate Programme (12 Weeks)</option>
                    <option value="Entrepreneurship">Entrepreneurship (12 Weeks)</option>
                    <option value="Business Management">Business Management (16 Weeks)</option>
                    <option value="Technology">Technology (24 Weeks)</option>
                    <option value="AI & Data Science">AI & Data Science (16 Weeks)</option>
                    <option value="Digital Marketing">Digital Marketing (10 Weeks)</option>
                    <option value="Professional Development">Professional Development (8 Weeks)</option>
                  </select>
                  <i className="fas fa-chevron-down select-arrow"></i>
                </div>
                {errors.course && <span className="error">{errors.course}</span>}
              </div>

              {/* Price Display */}
              {formData.price && (
                <div className="form-group price-group" data-aos="fade-up" data-aos-delay="450">
                  <div className="price-box">
                    <span className="price-label">Tuition Fee</span>
                    <span className="price-value">{formData.price}</span>
                    <div className="price-pulse"></div>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div className="form-group" data-aos="fade-up" data-aos-delay="500">
                <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                <div className={`input-wrapper ${focusedField === 'fullName' ? 'focused' : ''}`}>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Enter your full name" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('fullName')}
                    onBlur={handleBlur}
                    className={errors.fullName ? 'error-input' : ''}
                  />
                  <div className="input-highlight"></div>
                </div>
                {errors.fullName && <span className="error">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div className="form-group" data-aos="fade-up" data-aos-delay="550">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <div className={`input-wrapper ${focusedField === 'email' ? 'focused' : ''}`}>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email address" 
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    className={errors.email ? 'error-input' : ''}
                  />
                  <div className="input-highlight"></div>
                </div>
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              {/* Phone */}
              <div className="form-group" data-aos="fade-up" data-aos-delay="600">
                <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                <div className={`input-wrapper ${focusedField === 'phone' ? 'focused' : ''}`}>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('phone')}
                    onBlur={handleBlur}
                    className={errors.phone ? 'error-input' : ''}
                  />
                  <div className="input-highlight"></div>
                </div>
                {errors.phone && <span className="error">{errors.phone}</span>}
              </div>

              {/* Password with Strength Indicator */}
              <div className="form-group" data-aos="fade-up" data-aos-delay="650">
                <label htmlFor="password">Password <span className="required">*</span></label>
                <div className={`password-wrapper ${focusedField === 'password' ? 'focused' : ''}`}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password" 
                    placeholder="Create a password (min. 8 characters)" 
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    className={errors.password ? 'error-input' : ''}
                  />
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                  <div className="input-highlight"></div>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className="strength-fill" 
                        style={{ 
                          width: `${getPasswordStrength()}%`,
                          background: getStrengthColor()
                        }}
                      ></div>
                    </div>
                    <div className="strength-label" style={{ color: getStrengthColor() }}>
                      {getStrengthLabel()}
                    </div>
                    <div className="strength-requirements">
                      <span className={passwordStrength.hasMinLength ? 'met' : 'unmet'}>
                        {passwordStrength.hasMinLength ? '✓' : '○'} 8+ characters
                      </span>
                      <span className={passwordStrength.hasNumber ? 'met' : 'unmet'}>
                        {passwordStrength.hasNumber ? '✓' : '○'} Number
                      </span>
                      <span className={passwordStrength.hasLetter ? 'met' : 'unmet'}>
                        {passwordStrength.hasLetter ? '✓' : '○'} Letter
                      </span>
                      <span className={passwordStrength.hasSpecialChar ? 'met' : 'unmet'}>
                        {passwordStrength.hasSpecialChar ? '✓' : '○'} Special character
                      </span>
                    </div>
                  </div>
                )}
                
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              {/* Confirm Password */}
              <div className="form-group" data-aos="fade-up" data-aos-delay="700">
                <label htmlFor="confirmPassword">Confirm Password <span className="required">*</span></label>
                <div className={`password-wrapper ${focusedField === 'confirmPassword' ? 'focused' : ''}`}>
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    id="confirmPassword" 
                    placeholder="Confirm your password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    className={errors.confirmPassword ? 'error-input' : ''}
                  />
                  <button 
                    type="button" 
                    className="toggle-password" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                  <div className="input-highlight"></div>
                </div>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>

              {/* Terms */}
              <div className="form-group terms-group" data-aos="fade-up" data-aos-delay="750">
                <label className="terms-label">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>
                    I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeTerms && <span className="error">{errors.agreeTerms}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`btn-submit ${!isSubmitting ? 'pulse-button' : ''}`} 
                disabled={isSubmitting}
                data-aos="fade-up"
                data-aos-delay="800"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="signup-footer" data-aos="fade-up" data-aos-delay="850">
              <p>Already have an account? <a href="/login">Login here</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Ready to Get Started?</h2>
          <p>Explore our programmes and find the right fit for your career goals.</p>
          <a href="/programmes" className="btn-primary">Explore Programmes</a>
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
    </>
  );
};

export default Signup;