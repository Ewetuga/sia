import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('student');
  
  // Form states
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [lecturerEmail, setLecturerEmail] = useState('');
  const [lecturerPassword, setLecturerPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({
    student: false,
    lecturer: false,
    admin: false
  });

  // Initialize AOS and scroll to top
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true, 
      offset: 50 
    });
    // Scroll to top when login page loads
    window.scrollTo(0, 0);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Toggle password visibility
  const togglePasswordVisibility = (role) => {
    setShowPassword(prev => ({
      ...prev,
      [role]: !prev[role]
    }));
  };

  // Handle login submission
  const handleLogin = (e, role) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.btn-login');
    const originalText = submitBtn.textContent;
    
    setIsSubmitting(true);
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    // Demo credentials
    const demoCredentials = {
      student: { email: 'student@sia.edu', password: 'student123' },
      lecturer: { email: 'lecturer@sia.edu', password: 'lecturer123' },
      admin: { email: 'admin@sia.edu', password: 'admin123' }
    };
    
    let email, password;
    if (role === 'student') {
      email = studentEmail;
      password = studentPassword;
    } else if (role === 'lecturer') {
      email = lecturerEmail;
      password = lecturerPassword;
    } else {
      email = adminEmail;
      password = adminPassword;
    }
    
    const demo = demoCredentials[role];
    
    setTimeout(() => {
      if (email === demo.email && password === demo.password) {
        submitBtn.textContent = '✓ Success!';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
          // Scroll to top before redirect
          window.scrollTo(0, 0);
          
          const dashboards = {
            student: '/student',
            lecturer: '/lecturer',
            admin: '/admin'
          };
          
          // Use window.location for full page reload to ensure scroll reset
          window.location.href = dashboards[role];
        }, 800);
        
      } else {
        submitBtn.textContent = '✗ Invalid Credentials';
        submitBtn.style.background = '#dc3545';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          setIsSubmitting(false);
          alert('❌ Invalid email or password.\n\nDemo Credentials:\n' +
            'Student: student@sia.edu / student123\n' +
            'Lecturer: lecturer@sia.edu / lecturer123\n' +
            'Admin: admin@sia.edu / admin123');
        }, 1500);
      }
    }, 1500);
  };

  // Get form fields based on role
  const getFormFields = (role) => {
    const fields = {
      student: {
        email: studentEmail,
        setEmail: setStudentEmail,
        password: studentPassword,
        setPassword: setStudentPassword,
        id: 'student'
      },
      lecturer: {
        email: lecturerEmail,
        setEmail: setLecturerEmail,
        password: lecturerPassword,
        setPassword: setLecturerPassword,
        id: 'lecturer'
      },
      admin: {
        email: adminEmail,
        setEmail: setAdminEmail,
        password: adminPassword,
        setPassword: setAdminPassword,
        id: 'admin'
      }
    };
    return fields[role];
  };

  // Tab data
  const tabs = [
    { id: 'student', icon: 'fas fa-user-graduate', label: 'Student' },
    { id: 'lecturer', icon: 'fas fa-chalkboard-teacher', label: 'Lecturer' },
    { id: 'admin', icon: 'fas fa-user-cog', label: 'Admin' }
  ];

  // Role data for login cards
  const roleData = {
    student: {
      icon: 'fas fa-user-graduate',
      title: 'Student Login',
      subtitle: 'Access your courses, results, and student portal',
      registerText: "Don't have an account?",
      registerLink: 'Apply Now',
      registerHref: '/admissions'
    },
    lecturer: {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Lecturer Login',
      subtitle: 'Manage courses, students, and assignments',
      registerText: 'New lecturer?',
      registerLink: 'Contact HR',
      registerHref: '/contact'
    },
    admin: {
      icon: 'fas fa-user-cog',
      title: 'Admin Login',
      subtitle: 'Manage the academy, users, and system settings',
      registerText: 'Need admin access?',
      registerLink: 'Contact IT',
      registerHref: '/contact'
    }
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
      <section className="page-hero login-hero">
        <div className="container">
          <h1 data-aos="fade-up">Login</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Access your SIA portal. Choose your role and sign in to manage your profile, courses, and more.
          </p>
        
        </div>
      </section>

      {/* ===== LOGIN SECTION ===== */}
      <section className="login-section">
        <div className="container">
          <div className="login-container">
            {/* Tabs */}
            <div className="login-tabs" data-aos="fade-up">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={tab.icon}></i> {tab.label}
                </button>
              ))}
            </div>
            
            {/* Panels */}
            <div className="login-panels" data-aos="fade-up" data-aos-delay="100">
              {tabs.map((tab) => {
                const role = tab.id;
                const fields = getFormFields(role);
                const data = roleData[role];
                const showPass = showPassword[role];
                
                return (
                  <div 
                    key={role}
                    className={`login-panel ${activeTab === role ? 'active' : ''}`}
                  >
                    <div className="login-card">
                      <div className="card-header">
                        <div className="icon-wrapper"><i className={data.icon}></i></div>
                        <h3>{data.title}</h3>
                        <p>{data.subtitle}</p>
                      </div>
                      <form onSubmit={(e) => handleLogin(e, role)}>
                        <div className="form-group">
                          <label htmlFor={`${role}Email`}>
                            {role === 'student' ? 'Student ID or Email' : 
                             role === 'lecturer' ? 'Staff ID or Email' : 
                             'Admin Email'} <span className="required">*</span>
                          </label>
                          <div className="input-wrapper">
                            <i className="fas fa-envelope"></i>
                            <input
                              type="email"
                              id={`${role}Email`}
                              placeholder={role === 'student' ? 'Enter your student ID or email' :
                                        role === 'lecturer' ? 'Enter your staff ID or email' :
                                        'Enter your admin email'}
                              value={fields.email}
                              onChange={(e) => fields.setEmail(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor={`${role}Password`}>Password <span className="required">*</span></label>
                          <div className="input-wrapper">
                            <i className="fas fa-lock"></i>
                            <input
                              type={showPass ? 'text' : 'password'}
                              id={`${role}Password`}
                              placeholder="Enter your password"
                              value={fields.password}
                              onChange={(e) => fields.setPassword(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="toggle-password"
                              onClick={() => togglePasswordVisibility(role)}
                            >
                              <i className={showPass ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                            </button>
                          </div>
                        </div>
                        <div className="form-options">
                          <label className="remember-me">
                            <input type="checkbox" /> Remember Me
                          </label>
                          <a href="#" className="forgot-link">Forgot Password?</a>
                        </div>
                        <button type="submit" className="btn-login" disabled={isSubmitting}>
                          Sign In
                        </button>
                        <div className="register-link">
                          {data.registerText} <a href={data.registerHref}>{data.registerLink}</a>
                        </div>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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

export default Login;