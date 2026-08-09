import React, { useEffect, useState, useRef } from 'react';

const About = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach((counter) => {
      const updateCounter = () => {
        const target = parseInt(counter.getAttribute('data-target'));
        const current = parseInt(counter.innerText);
        const increment = target / 100;
        
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCounter, 20);
        } else {
          counter.innerText = target;
        }
      };
      
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          observer.disconnect();
        }
      });
      
      observer.observe(counter);
    });

    return () => {
      // Cleanup
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About', active: true },
    { to: '/programmes', label: 'Programmes' },
    { to: '/admissions', label: 'Admissions' },
    { to: '/research', label: 'Research' },
    { to: '/student-life', label: 'Student Life' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  const values = [
    {
      icon: 'fas fa-star',
      title: 'Excellence',
      description: 'We pursue the highest standards in education, research, and innovation.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Integrity',
      description: 'We act with honesty, transparency, and ethical responsibility in all we do.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Collaboration',
      description: 'We believe in the power of partnerships and collective innovation.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: "We relentlessly pursue creative solutions to Africa's most pressing challenges."
    },
    {
      icon: 'fas fa-users',
      title: 'Inclusivity',
      description: 'We create opportunities for all, celebrating diversity in every form.'
    },
    {
      icon: 'fas fa-globe-africa',
      title: 'Impact',
      description: 'We are committed to making a meaningful difference in our communities.'
    }
  ];

  const leaders = [
    {
      name: 'Dr. Adeola Ogunleye',
      title: 'Founder & Executive Director',
      description: '20+ years in education innovation and entrepreneurship development across Africa.'
    },
    {
      name: 'Prof. Chidi Okonkwo',
      title: 'Dean of Academics',
      description: 'Former Professor of Innovation Studies at University of Lagos, leading curriculum development.'
    },
    {
      name: 'Ms. Ngozi Eze',
      title: 'Director of Industry Partnerships',
      description: 'Expert in building bridges between academia and the corporate sector across Africa.'
    },
    {
      name: 'Dr. Kwame Mensah',
      title: 'Head of Research & Innovation',
      description: 'Pioneer in AI and data science research with numerous publications and patents.'
    }
  ];

  const timelineItems = [
    {
      year: '2018',
      title: 'Founded',
      description: 'SIA was established with a vision to transform education and foster innovation across Africa.'
    },
    {
      year: '2019',
      title: 'First Cohort',
      description: 'Welcomed our first cohort of 50 students, with a focus on entrepreneurship and technology.'
    },
    {
      year: '2020',
      title: 'Virtual Expansion',
      description: 'Launched our online learning platform, reaching students across 15 African countries.'
    },
    {
      year: '2022',
      title: 'Innovation Lab',
      description: 'Opened our state-of-the-art Innovation Lab, equipped with cutting-edge technology.'
    },
    {
      year: '2024',
      title: 'International Recognition',
      description: 'Awarded Best Innovation Academy in Africa by the Global Education Council.'
    }
  ];

  const achievements = [
    { target: 2500, label: 'Students Graduated' },
    { target: 95, label: '% Employed Within 6 Months' },
    { target: 150, label: 'Industry Partners' },
    { target: 18, label: 'African Countries Reached' }
  ];

  const affiliations = [
    { icon: 'fas fa-university', name: 'UNESCO' },
    { icon: 'fas fa-building', name: 'Google' },
    { icon: 'fas fa-globe', name: 'AU' },
    { icon: 'fas fa-chart-line', name: 'WEF' },
    { icon: 'fas fa-handshake', name: 'UNIDO' }
  ];

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

      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <h1>About SIA</h1>
          <p>Empowering the next generation of innovators through world-class education, research, and industry collaboration.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mv-card">
            <i className="fas fa-rocket"></i>
            <h3>Our Mission</h3>
            <p>To empower the next generation of innovators through world-class education, hands-on experience, and a collaborative ecosystem that bridges academia and industry.</p>
          </div>
          <div className="mv-card">
            <i className="fas fa-eye"></i>
            <h3>Our Vision</h3>
            <p>To be Africa's leading innovation academy, shaping the future of entrepreneurship and technology by cultivating visionary leaders who drive sustainable growth across the continent.</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <div className="container">
          <h2>Our Core Values</h2>
          <p className="subtitle">The principles that guide everything we do at SIA</p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div className="value-card" key={index}>
                <i className={value.icon}></i>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="leadership">
        <div className="container">
          <h2>Our Leadership Team</h2>
          <div className="leadership-grid">
            {leaders.map((leader, index) => (
              <div className="leader-card" key={index}>
                <div className="avatar"><i className="fas fa-user-tie"></i></div>
                <h4>{leader.name}</h4>
                <div className="title">{leader.title}</div>
                <p>{leader.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="timeline-section">
        <div className="container">
          <h2>Our Journey</h2>
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-content">
                  <div className="year">{item.year}</div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements">
        <div className="container">
          <h2>Our Achievements</h2>
          <div className="achievement-grid">
            {achievements.map((achievement, index) => (
              <div className="achievement-item" key={index}>
                <span className="number counter" data-target={achievement.target}>0</span>
                <span className="label">{achievement.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="affiliations">
        <div className="container">
          <h2>Our Affiliations</h2>
          <div className="affiliation-logos">
            {affiliations.map((affiliation, index) => (
              <div className="item" key={index}>
                <i className={affiliation.icon}></i>
                <span>{affiliation.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner section-padding">
        <div className="container">
          <h2>Ready to Join SIA?</h2>
          <p>Become part of a community that's shaping the future of Africa through innovation and leadership.</p>
          <a href="/admissions" className="btn-primary">Apply Today</a>
        </div>
      </section>

      {/* Footer */}
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

      {/* AI Assistant */}
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

export default About;