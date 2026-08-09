import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Research = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);

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
    if (lower.includes('research') || lower.includes('publication')) {
      return 'Our research focuses on AI & Machine Learning, Sustainable Development, Entrepreneurship & Innovation, and Digital Transformation. We have published numerous papers in leading journals.';
    }
    if (lower.includes('collaboration') || lower.includes('partner')) {
      return 'We collaborate with corporations, research institutions, and government agencies on joint research, innovation, and consultancy projects.';
    }
    if (lower.includes('lab') || lower.includes('laboratory')) {
      return 'We have three innovation labs: AI Research Lab, Innovation Design Studio, and Sustainability Lab, equipped with cutting-edge technology.';
    }
    if (lower.includes('consultancy')) {
      return 'Our consultancy services include strategic advisory, innovation audits, research & analysis, capacity building, policy development, and impact evaluation.';
    }
    return 'Thank you for your question. Please contact our research office for detailed information.';
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
    { to: '/research', label: 'Research', active: true },
    { to: '/student-life', label: 'Student Life' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Research Areas data
  const researchAreas = [
    {
      icon: 'fas fa-robot',
      title: 'Artificial Intelligence & Machine Learning',
      description: 'Exploring AI applications in healthcare, agriculture, finance, and education to solve real-world problems across Africa.',
      tags: ['Deep Learning', 'NLP', 'Computer Vision']
    },
    {
      icon: 'fas fa-leaf',
      title: 'Sustainable Development',
      description: 'Research on renewable energy, climate resilience, sustainable agriculture, and environmental conservation strategies.',
      tags: ['Climate Tech', 'Renewable Energy', 'AgriTech']
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Entrepreneurship & Innovation',
      description: 'Studying entrepreneurial ecosystems, startup success factors, innovation models, and scaling strategies in emerging markets.',
      tags: ['Ecosystems', 'Scaling', 'Policy']
    },
    {
      icon: 'fas fa-users',
      title: 'Digital Transformation',
      description: 'Examining how organizations leverage technology for transformation, digital inclusion, and bridging the digital divide.',
      tags: ['Digital Inclusion', 'FinTech', 'E-Government']
    }
  ];

  // Industry Collaboration data
  const collaborations = [
    {
      icon: 'fas fa-handshake',
      title: 'Corporate Partnerships',
      description: 'Collaborating with leading corporations on research projects, talent development, and innovation initiatives.'
    },
    {
      icon: 'fas fa-flask',
      title: 'Joint Research',
      description: 'Co-creating knowledge and solutions through joint research programs with industry partners.'
    },
    {
      icon: 'fas fa-user-graduate',
      title: 'Internships & Placements',
      description: 'Connecting students with industry opportunities through structured internship and placement programs.'
    },
    {
      icon: 'fas fa-gem',
      title: 'Innovation Hubs',
      description: 'Establishing joint innovation hubs that bring together academia, industry, and startups.'
    }
  ];

  // Publications data
  const publications = [
    {
      title: 'AI-Powered Solutions for African Agriculture',
      authors: 'Dr. Kwame Mensah, Dr. Adeola Ogunleye',
      journal: 'Journal of Innovation & Technology',
      year: '2025'
    },
    {
      title: 'Entrepreneurship Ecosystems in Emerging Markets',
      authors: 'Prof. Chidi Okonkwo, Ms. Ngozi Eze',
      journal: 'African Journal of Business',
      year: '2025'
    },
    {
      title: 'Sustainable Energy Solutions for Sub-Saharan Africa',
      authors: 'Dr. Adeola Ogunleye, Dr. Kwame Mensah',
      journal: 'Renewable Energy Review',
      year: '2024'
    },
    {
      title: 'Digital Transformation in African Financial Services',
      authors: 'Prof. Chidi Okonkwo, Dr. Adeola Ogunleye',
      journal: 'FinTech Africa',
      year: '2024'
    }
  ];

  // Consultancy services
  const consultancyServices = [
    'Strategic Advisory',
    'Innovation Audits',
    'Research & Analysis',
    'Capacity Building',
    'Policy Development',
    'Impact Evaluation'
  ];

  // Innovation Labs data
  const innovationLabs = [
    {
      icon: 'fas fa-microchip',
      title: 'AI Research Lab',
      description: 'Focused on artificial intelligence research, including machine learning, natural language processing, and computer vision applications.',
      equipment: ['High-Performance Computing', 'GPU Clusters', 'TensorFlow']
    },
    {
      icon: 'fas fa-microscope',
      title: 'Innovation Design Studio',
      description: 'A creative space for prototyping, design thinking, and developing user-centered solutions for real-world challenges.',
      equipment: ['3D Printers', 'VR/AR', 'Prototyping Tools']
    },
    {
      icon: 'fas fa-flask',
      title: 'Sustainability Lab',
      description: 'Researching sustainable technologies, renewable energy solutions, and environmental monitoring systems for Africa.',
      equipment: ['Solar Simulators', 'Environmental Sensors', 'Data Analytics']
    }
  ];

  // Gallery items (placeholder images)
  const galleryItems = [1, 2, 3, 4, 5];

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
      <section className="page-hero research-hero">
        <div className="container">
          <h1 data-aos="fade-up">Research & Innovation</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Driving impact through cutting-edge research, industry collaboration, and innovation that addresses Africa's most pressing challenges.
          </p>
          
        </div>
      </section>

      {/* ===== RESEARCH AREAS ===== */}
      <section className="research-areas">
        <div className="container">
          <h2 data-aos="fade-up">Research Areas</h2>
          <div className="research-grid">
            {researchAreas.map((area, index) => (
              <div className="research-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <div className="icon-wrapper"><i className={area.icon}></i></div>
                <h4>{area.title}</h4>
                <p>{area.description}</p>
                <div className="tags">
                  {area.tags.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY COLLABORATION ===== */}
      <section className="industry-collab">
        <div className="container">
          <h2 data-aos="fade-up">Industry Collaboration</h2>
          <div className="collab-grid">
            {collaborations.map((collab, index) => (
              <div className="collab-card" data-aos="zoom-in" data-aos-delay={index * 100} key={index}>
                <i className={collab.icon}></i>
                <h4>{collab.title}</h4>
                <p>{collab.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PUBLICATIONS ===== */}
      <section className="publications">
        <div className="container">
          <h2 data-aos="fade-up">Recent Publications</h2>
          <div className="publication-list">
            {publications.map((pub, index) => (
              <div className="publication-item" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <div className="pub-icon"><i className="fas fa-file-alt"></i></div>
                <div className="pub-content">
                  <h4>{pub.title}</h4>
                  <div className="authors">{pub.authors}</div>
                  <div className="journal">{pub.journal} <span className="year">({pub.year})</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONSULTANCY ===== */}
      <section className="consultancy">
        <div className="container">
          <div className="content" data-aos="fade-right">
            <h2>Consultancy Services</h2>
            <p>Leverage our expertise to solve complex challenges, drive innovation, and accelerate growth. Our consultancy services combine academic rigor with practical industry experience.</p>
            <div className="services">
              {consultancyServices.map((service, index) => (
                <div className="service-item" key={index}>
                  <i className="fas fa-check-circle"></i> {service}
                </div>
              ))}
            </div>
          </div>
          <div className="image-placeholder" data-aos="fade-left">
            <i className="fas fa-handshake"></i>
            <h4>Partner With Us</h4>
            <p>Let's collaborate to drive innovation and create impact.</p>
          </div>
        </div>
      </section>

      {/* ===== INNOVATION LABS ===== */}
      <section className="innovation-labs">
        <div className="container">
          <h2 data-aos="fade-up">Innovation Labs</h2>
          <div className="labs-grid">
            {innovationLabs.map((lab, index) => (
              <div className="lab-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <div className="lab-header">
                  <i className={lab.icon}></i>
                  <h4>{lab.title}</h4>
                </div>
                <div className="lab-body">
                  <p>{lab.description}</p>
                  <div className="equipment">
                    {lab.equipment.map((item, idx) => (
                      <span key={idx}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RESEARCH GALLERY ===== */}
      <section className="research-gallery">
        <div className="container">
          <h2 data-aos="fade-up">Research Gallery</h2>
          <div className="gallery-grid">
            {galleryItems.map((item, index) => (
              <div 
                className={`gallery-item ${index === 2 ? 'gallery-wide' : ''}`} 
                data-aos="zoom-in" 
                data-aos-delay={index * 100}
                key={index}
              >
                <i className="fas fa-image"></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNER WITH US ===== */}
      <section className="partner-section">
        <div className="container" data-aos="zoom-in">
          <h2>Partner With Us</h2>
          <p>Join us in advancing knowledge, driving innovation, and creating impact. Whether you're a corporation, nonprofit, or government agency, we'd love to collaborate.</p>
          <a href="/contact" className="btn-primary">Get in Touch</a>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Ready to Make an Impact?</h2>
          <p>Join our research community and contribute to solving Africa's most pressing challenges.</p>
          <a href="/admissions" className="btn-primary">Join SIA Research</a>
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

export default Research;