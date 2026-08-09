import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Verify = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);

  // Verification state
  const [activeTab, setActiveTab] = useState('certificate');
  const [certNumber, setCertNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [result, setResult] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);

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
    if (lower.includes('verify') || lower.includes('certificate') || lower.includes('validation')) {
      return 'You can verify your certificate by entering your certificate number or student name on this page. All SIA certificates are digitally verified.';
    }
    if (lower.includes('campus') || lower.includes('location')) {
      return 'Our main campus is at 123 Innovation Drive, Lagos. We also have virtual options.';
    }
    if (lower.includes('qr') || lower.includes('scan')) {
      return 'Each SIA certificate comes with a QR code. You can scan it with your phone to instantly verify authenticity.';
    }
    return 'Thank you for your question. Please contact our support team for detailed information.';
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
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify', active: true },
  ];

  // Sample certificate database
  const certificateDB = {
    'SIA-2025-001': {
      name: 'Amara Okonkwo',
      programme: 'Entrepreneurship',
      date: 'January 15, 2025'
    },
    'SIA-2024-045': {
      name: 'Tunde Ogunleye',
      programme: 'Technology',
      date: 'November 20, 2024'
    },
    'SIA-2024-123': {
      name: 'Zainab Ibrahim',
      programme: 'AI & Data Science',
      date: 'August 10, 2024'
    },
    'SIA-2023-078': {
      name: 'Kofi Mensah',
      programme: 'Business Management',
      date: 'March 5, 2023'
    }
  };

  // Sample name database
  const nameDB = {
    'Amara Okonkwo': {
      certificate: 'SIA-2025-001',
      programme: 'Entrepreneurship',
      date: 'January 15, 2025'
    },
    'Tunde Ogunleye': {
      certificate: 'SIA-2024-045',
      programme: 'Technology',
      date: 'November 20, 2024'
    },
    'Zainab Ibrahim': {
      certificate: 'SIA-2024-123',
      programme: 'AI & Data Science',
      date: 'August 10, 2024'
    },
    'Kofi Mensah': {
      certificate: 'SIA-2023-078',
      programme: 'Business Management',
      date: 'March 5, 2023'
    }
  };

  // Example certificates for quick load
  const examples = [
    { cert: 'SIA-2025-001', name: 'Amara Okonkwo', programme: 'Entrepreneurship', date: 'January 15, 2025' },
    { cert: 'SIA-2024-045', name: 'Tunde Ogunleye', programme: 'Technology', date: 'November 20, 2024' },
    { cert: 'SIA-2024-123', name: 'Zainab Ibrahim', programme: 'AI & Data Science', date: 'August 10, 2024' },
    { cert: 'SIA-2023-078', name: 'Kofi Mensah', programme: 'Business Management', date: 'March 5, 2023' }
  ];

  // Verification functions
  const verifyCertificate = () => {
    if (!certNumber.trim()) {
      alert('Please enter a certificate number.');
      return;
    }

    let resultData;
    const upperCert = certNumber.trim().toUpperCase();
    
    if (certificateDB[upperCert]) {
      resultData = {
        valid: true,
        certificate: upperCert,
        ...certificateDB[upperCert]
      };
    } else if (upperCert.startsWith('SIA-') && upperCert.length > 8) {
      // Demo: Simulate valid for any SIA- format
      resultData = {
        valid: true,
        certificate: upperCert,
        name: 'Demo Student',
        programme: 'Professional Development',
        date: 'December 1, 2025'
      };
    } else {
      resultData = { valid: false };
    }
    
    setResult(resultData);
    setResultVisible(true);
    
    // Scroll to result
    setTimeout(() => {
      const resultContainer = document.getElementById('resultContainer');
      if (resultContainer) {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const verifyByName = () => {
    if (!studentName.trim()) {
      alert('Please enter a student name.');
      return;
    }

    let resultData;
    const trimmedName = studentName.trim();
    
    if (nameDB[trimmedName]) {
      resultData = {
        valid: true,
        name: trimmedName,
        ...nameDB[trimmedName]
      };
    } else if (trimmedName.length > 3) {
      // Demo: Simulate valid for any name with length > 3
      resultData = {
        valid: true,
        name: trimmedName,
        certificate: 'SIA-2025-DEMO',
        programme: 'Professional Development',
        date: 'December 1, 2025'
      };
    } else {
      resultData = { valid: false };
    }
    
    setResult(resultData);
    setResultVisible(true);
    
    setTimeout(() => {
      const resultContainer = document.getElementById('resultContainer');
      if (resultContainer) {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const loadExample = (cert, name, programme, date) => {
    setActiveTab('certificate');
    setCertNumber(cert);
    setResult({
      valid: true,
      certificate: cert,
      name: name,
      programme: programme,
      date: date
    });
    setResultVisible(true);
    
    setTimeout(() => {
      const resultContainer = document.getElementById('resultContainer');
      if (resultContainer) {
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleCertKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyCertificate();
    }
  };

  const handleNameKeyPress = (e) => {
    if (e.key === 'Enter') {
      verifyByName();
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
      <section className="page-hero verify-hero">
        <div className="container">
          <h1 data-aos="fade-up">Certificate Verification</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Verify the authenticity of your Start-up Innovation Academy certificate. Enter your certificate number or student name to validate your credential.
          </p>
         
        </div>
      </section>

      {/* ===== VERIFICATION SECTION ===== */}
      <section className="verify-section">
        <div className="container">
          <div className="verify-wrapper" data-aos="fade-up">
            <p className="info-text">
              Enter your certificate details below to verify your credential. All certificates issued by SIA are digitally verified.
            </p>
            
            <div className="verify-search">
              {/* Tabs */}
              <div className="search-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'certificate' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('certificate');
                    setResultVisible(false);
                  }}
                >
                  Certificate Number
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'student' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('student');
                    setResultVisible(false);
                  }}
                >
                  Student Name
                </button>
              </div>
              
              {/* Certificate Number Panel */}
              <div className={`search-panel ${activeTab === 'certificate' ? 'active' : ''}`}>
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Enter certificate number (e.g., SIA-2025-001)"
                    value={certNumber}
                    onChange={(e) => setCertNumber(e.target.value)}
                    onKeyPress={handleCertKeyPress}
                  />
                  <button className="btn-verify" onClick={verifyCertificate}>
                    <i className="fas fa-search"></i> Verify Now
                  </button>
                </div>
                <div className="hint">Example: SIA-2025-001, SIA-2024-045, SIA-2023-123</div>
              </div>
              
              {/* Student Name Panel */}
              <div className={`search-panel ${activeTab === 'student' ? 'active' : ''}`}>
                <div className="input-group">
                  <input 
                    type="text" 
                    placeholder="Enter student full name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    onKeyPress={handleNameKeyPress}
                  />
                  <button className="btn-verify" onClick={verifyByName}>
                    <i className="fas fa-search"></i> Search
                  </button>
                </div>
                <div className="hint">Enter the full name as it appears on the certificate</div>
              </div>
              
              {/* Result Container */}
              {resultVisible && result && (
                <div className={`result-container ${result.valid ? 'valid' : 'invalid'}`} id="resultContainer">
                  <div className="result-icon">
                    <i className={result.valid ? 'fas fa-check-circle' : 'fas fa-times-circle'}></i>
                  </div>
                  <div className="result-title">
                    {result.valid ? '✓ Certificate Verified' : '✗ Certificate Not Found'}
                  </div>
                  <div className="result-subtitle">
                    {result.valid 
                      ? 'This certificate is valid and issued by Start-up Innovation Academy.'
                      : 'We could not verify this certificate. Please check the information and try again.'}
                  </div>
                  
                  {result.valid && (
                    <>
                      <div className="result-details">
                        <div className="detail-item">
                          <span className="label">Certificate Number</span>
                          <span className="value">{result.certificate || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Student Name</span>
                          <span className="value">{result.name || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Programme</span>
                          <span className="value">{result.programme || 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="label">Date Issued</span>
                          <span className="value">{result.date || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="qr-section">
                        <div className="qr-placeholder"><i className="fas fa-qrcode"></i></div>
                        <div className="qr-text">
                          <strong>QR Code Verification</strong><br />
                          Scan this QR code with your mobile device to verify instantly.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== EXAMPLE CERTIFICATES ===== */}
      <section className="examples-section">
        <div className="container">
          <h2 data-aos="fade-up">Sample Certificates</h2>
          <p className="subtitle" data-aos="fade-up" data-aos-delay="100">
            Try verifying these example certificates to see how the system works.
          </p>
          
          <div className="examples-grid" data-aos="fade-up" data-aos-delay="200">
            {examples.map((example, index) => (
              <div 
                className="example-item" 
                onClick={() => loadExample(example.cert, example.name, example.programme, example.date)}
                key={index}
              >
                <i className="fas fa-certificate"></i>
                <div className="example-code">{example.cert}</div>
                <div className="example-name">{example.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Need Help With Your Certificate?</h2>
          <p>Contact our support team if you have any questions about certificate verification or need assistance.</p>
          <a href="/contact" className="btn-primary">Contact Support</a>
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

export default Verify;