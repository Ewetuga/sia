import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // State for AI Assistant
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize AOS (replaces AOS.init)
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true, 
      offset: 50 
    });
  }, []);

  // Counter animation (replaces the counter script)
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
      
      // Use Intersection Observer to start animation when visible
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          observer.disconnect();
        }
      });
      
      observer.observe(counter);
    });

    return () => {
      // Cleanup observers
    };
  }, []);

  // Toggle mobile menu (replaces hamburger menu script)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside or on a link
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // AI Assistant functions (replaces toggleAI and askAI)
  const toggleAI = () => {
    setIsAIOpen(!isAIOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [aiMessages]);

  // AI Response logic (replaces getAIResponse)
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

    // Add user message
    setAiMessages(prev => [...prev, { type: 'user', text: aiInput }]);

    // Get AI response
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

  // Data for the page
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

  const stats = [
    { target: 1200, label: 'Students' },
    { target: 45, label: 'Programmes' },
    { target: 98, label: 'Success' },
    { target: 15, label: 'Partners' },
  ];

  const aboutCards = [
    {
      icon: 'fas fa-rocket',
      title: 'Mission',
      description: 'Empowering the next generation of innovators through world-class education and hands-on experience.'
    },
    {
      icon: 'fas fa-eye',
      title: 'Vision',
      description: "To be Africa's leading innovation academy, shaping the future of entrepreneurship and technology."
    },
    {
      icon: 'fas fa-gem',
      title: 'Values',
      description: 'Excellence, Integrity, Collaboration, and a relentless pursuit of innovation.'
    }
  ];

  const programmes = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Entrepreneurship',
      description: '12-week intensive bootcamp to launch your startup.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Business Management',
      description: 'Strategic leadership and operational excellence.'
    },
    {
      icon: 'fas fa-code',
      title: 'Technology',
      description: 'Full-stack development, AI, and data science.'
    },
    {
      icon: 'fas fa-user-graduate',
      title: 'Fresh Graduate Programme',
      description: '12-week transition to industry-ready professional.'
    }
  ];

  const features = [
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Expert Faculty',
      description: 'Industry leaders and seasoned academics.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Industry Partners',
      description: 'Direct access to top companies and mentors.'
    },
    {
      icon: 'fas fa-globe-africa',
      title: 'Global Network',
      description: 'Connect with innovators across the continent.'
    },
    {
      icon: 'fas fa-flask',
      title: 'Innovation Labs',
      description: 'State-of-the-art facilities for prototyping.'
    }
  ];

  const partners = ['Partner 1', 'Partner 2', 'Partner 3', 'Partner 4', 'Partner 5'];

  const testimonials = [
    {
      quote: 'SIA gave me far more than a certificate. It gave me the confidence, the network, and the framework to launch my own business within six months of graduating. --, Graduate.',
      author: 'Ada E.'
    },
    {
      quote: 'The professional development courses at SIA are the most practical I have encountered. Within weeks I was applying new strategies directly to my work. -- Alumni',
      author: 'Michael O.'
    },
    {
      quote: 'SIA graduates arrive work-ready. Their ability to think critically and innovate sets them apart from the moment they walk through the door. -- Industry Partner',
      author: 'Zara K.'
    }
  ];

  const newsItems = [
    {
      title: 'SIA Launches AI Lab',
      description: 'New facility to drive AI research in Africa.',
      image: 'https://via.placeholder.com/300x180/2A1608/F5D08A?text=SIA+News'
    },
    {
      title: 'Partnership with Google',
      description: 'Expanding digital skills across the continent.',
      image: 'https://via.placeholder.com/300x180/2A1608/F5D08A?text=SIA+News'
    },
    {
      title: 'Student Startup Wins Award',
      description: 'EduTech solution recognised at global summit.',
      image: 'https://via.placeholder.com/300x180/2A1608/F5D08A?text=SIA+News'
    }
  ];

  return (
    <>
      {/* ===== GLASS NAVIGATION ===== */}
      <nav className="glass-nav">
        <div className="nav-logo">
          <img src="/sia-logo.svg" alt="SIA Logo" width="160" height="48" />
        </div>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <a href={link.to} onClick={closeMenu}>{link.label}</a>
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

      {/* ===== HERO SECTION ===== */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-content container">
          <h1 data-aos="fade-up">Build the Future.<br/> Start Here.</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            The Start-up Innovation Academy equips entrepreneurs, professionals, and innovators with the knowledge, credentials, and connections to lead in a changing world. <br />
         
          </p>
          <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
            <a href="/programmes" className="btn-primary">Explore Programmes</a>
            <a href="/admissions" className="btn-secondary">Apply Now</a>
          </div>
        </div>

        <div className="stats-row container" data-aos="fade-up" data-aos-delay="450">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <span className="counter" data-target={stat.target}>0</span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT SNAPSHOT ===== */}
      <section className="about-snapshot section-padding">
        <div className="container">
          <h2 data-aos="fade-right">About SIA</h2>
            <h3 className="section-subtitle-lines" data-aos="fade-up" data-aos-delay="150">
  <span>What we are</span>
</h3>
    <div className="programme-description highlighted" data-aos="fade-up" data-aos-delay="200">
  <div className="accent-line"></div>
  <p>
   The Start-up Innovation Academy is an institution built on a single conviction: that the right education, delivered with excellence and grounded in real-world application, can transform individuals into the leaders that industries, communities, and economies need. We offer certificates, diplomas, and professional courses across entrepreneurship, business management, and technology -- and we do it with rigour, warmth, and an uncompromising commitment to your success. <br/>
   < button className="btn-primary" onClick={() => window.location.href = '/about'}>Discover our story</button>
  </p>

</div>




          {/* <div className="about-grid">
            {aboutCards.map((card, index) => (
              <div 
                className="about-card glass" 
                data-aos="flip-left" 
                data-aos-delay={index * 150}
                key={index}
              >
                <i className={card.icon}></i>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* ===== PROGRAMMES OVERVIEW ===== */}
      <section className="programmes-overview section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Programme Overview</h2>
       <h3 className="section-subtitle-lines" data-aos="fade-up" data-aos-delay="150">
  <span>What we offer</span>
</h3>
    <div className="programme-description highlighted" data-aos="fade-up" data-aos-delay="200">
  <div className="accent-line"></div>
  <p>
    From foundational certificates to advanced diplomas and short professional development courses, SIA's programme portfolio is designed to meet you where you are and take you where you need to be. Every course is developed in partnership with industry experts and validated against international standards of professional excellence.
    <br/>
     < button className="btn-primary" onClick={() => window.location.href = '/programmes'}>View All Programmes</button>
  </p>
</div>
        </div>
      </section>

      {/* ===== WHY CHOOSE SIA ===== */}
      <section className="why-sia section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Why Choose SIA</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                className="feature glass" 
                data-aos="fade-right" 
                data-aos-delay={index * 100}
                key={index}
              >
                <i className={feature.icon}></i>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRY PARTNERS ===== */}
      <section className="partners section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Our Partners</h2>
          <div className="partner-logos" data-aos="fade-up">
            {partners.map((partner, index) => (
              <React.Fragment key={index}>
                <i className="fas fa-building"></i>
                <span>{partner}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Testimonials</h2>
          <div className="testimonial-carousel" data-aos="fade-up">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial glass" key={index}>
                <i className="fas fa-quote-left"></i>
                <p>"{testimonial.quote}"</p>
                <h5>— {testimonial.author}</h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWS PREVIEW ===== */}
      {/* <section className="news-preview section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Latest News</h2>
          <div className="news-grid">
            {newsItems.map((item, index) => (
              <div 
                className="news-card glass" 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                key={index}
              >
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <a href="/news">Read More</a>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Ready to Innovate?</h2>
          <p>Join SIA and become part of a community that's shaping the future.</p>
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

export default Home;