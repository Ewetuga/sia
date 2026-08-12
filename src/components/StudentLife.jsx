import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const StudentLife = () => {
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
    if (lower.includes('campus') || lower.includes('location')) {
      return 'Our main campus is at 123 Innovation Drive, Lagos. We also have virtual options.';
    }
    if (lower.includes('club') || lower.includes('organization')) {
      return 'We have several student clubs including Innovation Club, Entrepreneurship Society, Tech Developers Guild, and Business Network.';
    }
    if (lower.includes('event') || lower.includes('hackathon')) {
      return 'We host regular events including Tech Summit, Hackathon, and networking events. Check our Events section for upcoming dates.';
    }
    if (lower.includes('alumni')) {
      return 'Our alumni network includes successful entrepreneurs, tech leaders, and innovators across Africa and beyond.';
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
    { to: '/student-life', label: 'Student Life', active: true },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Campus Experience data
  const campusFeatures = [
    {
      icon: 'fas fa-university',
      title: 'Modern Facilities',
      description: 'State-of-the-art classrooms, innovation labs, and collaborative spaces designed for learning and creativity.'
    },
    {
      icon: 'fas fa-wifi',
      title: 'Smart Campus',
      description: 'High-speed internet, digital resources, and smart technology integrated throughout the campus.'
    },
    {
      icon: 'fas fa-utensils',
      title: 'Dining & Cafes',
      description: 'Multiple dining options offering nutritious meals and a comfortable space for socializing.'
    },
    {
      icon: 'fas fa-dumbbell',
      title: 'Wellness Center',
      description: 'Fitness facilities, wellness programs, and mental health support for students.'
    }
  ];

  // Student Clubs data
  const clubs = [
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation Club',
      description: 'Where ideas come to life. Hackathons, workshops, and collaborative projects.'
    },
    {
      icon: 'fas fa-users',
      title: 'Entrepreneurship Society',
      description: 'Connect with aspiring entrepreneurs and learn from successful founders.'
    },
    {
      icon: 'fas fa-code',
      title: 'Tech Developers Guild',
      description: 'For developers, designers, and tech enthusiasts to collaborate and build.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Business Network',
      description: 'Networking events, case competitions, and professional development.'
    }
  ];

  // Innovation Hub features
  const hubFeatures = [
    'Prototyping Lab',
    '3D Printing',
    'VR/AR Studio',
    'Incubation Space',
    'Mentorship Program',
    'Pitch Events'
  ];

  // Events data
  const events = [
    {
      date: 'Nov 15, 2026',
      title: 'Tech Summit 2026',
      description: 'Annual technology conference featuring industry leaders and innovative startups.',
      time: '9:00 AM - 5:00 PM',
      location: 'SIA Auditorium'
    },
    {
      date: 'Nov 22, 2026',
      title: 'Hackathon 2026',
      description: '48-hour coding competition to solve real-world problems with innovative solutions.',
      time: '10:00 AM - 6:00 PM',
      location: 'Innovation Hub'
    },
    {
      date: 'Dec 5, 2026',
      title: 'Graduation Ceremony',
      description: 'Celebrating the achievements of our graduating cohort with family and friends.',
      time: '2:00 PM - 6:00 PM',
      location: 'Main Auditorium'
    }
  ];

  // Gallery items
// Gallery items with real images
const galleryItems = [
  { 
    label: 'SIA Graduants', 
    wide: false,
    image:   'https://images.unsplash.com/photo-1623461487986-9400110de28e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZHVhdGlvbiUyMHBob3RvfGVufDB8fDB8fHww'
  },
  { 
    label: 'Innovation Lab', 
    wide: false,
    image:  'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG9ubGluZSUyMGVkdWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D'
  },
  { 
    label: 'Career Growth', 
    wide: true,
    image: 'https://plus.unsplash.com/premium_photo-1733306477044-bcc3c374da91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcmVlciUyMGdyb3d0aHxlbnwwfHwwfHx8MA%3D%3D'
  },
  { 
    label: 'Student Collaboration', 
    wide: false,
    image: 'https://images.unsplash.com/photo-1766074903112-79661da9ab45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fG9ubGluZSUyMHJlbW90ZSUyMGNsYXNzfGVufDB8fDB8fHww'
  },
  { 
    label: 'Graduation Ceremony', 
    wide: false,
    image: 'https://images.unsplash.com/photo-1589948516895-db76617cb753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNlcnRpZmljYXRlfGVufDB8fDB8fHww'
  }
];

  // Alumni data
  const alumni = [
    {
      name: 'Tunde Ogunleye',
      role: 'Founder, TechStart Africa',
      class: 'Class of 2020'
    },
    {
      name: 'Chimamanda Ngozi',
      role: 'CEO, Innovate Solutions',
      class: 'Class of 2021'
    },
    {
      name: 'Kwame Mensah',
      role: 'AI Researcher, Google',
      class: 'Class of 2022'
    },
    {
      name: 'Ngozi Eze',
      role: 'Entrepreneur, SheInnovates',
      class: 'Class of 2023'
    }
  ];

  // Student Stories data
  const stories = [
    {
      quote: 'SIA transformed my perspective on innovation. The hands-on experience and mentorship gave me the confidence to launch my own startup.',
      name: 'Amara Okonkwo',
      programme: 'Entrepreneurship Programme, 2025'
    },
    {
      quote: 'The community at SIA is incredible. I\'ve built lifelong friendships and professional connections that have shaped my career.',
      name: 'Kofi Addo',
      programme: 'Technology Programme, 2024'
    },
    {
      quote: 'As a woman in tech, SIA provided the support and resources I needed to thrive. The mentorship program was life-changing.',
      name: 'Zainab Ibrahim',
      programme: 'AI & Data Science, 2025'
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
      <section className="page-hero student-life-hero">
        <div className="container">
          <h1 data-aos="fade-up">Student Life</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Experience a vibrant campus community where innovation meets collaboration. Discover clubs, events, and opportunities that shape your journey at SIA.
          </p>
          
        </div>
      </section>

      {/* ===== CAMPUS EXPERIENCE ===== */}
      <section className="campus-experience">
        <div className="container">
          <h2 data-aos="fade-up">Campus Experience</h2>
          <div className="campus-grid">
            {campusFeatures.map((feature, index) => (
              <div className="campus-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <div className="icon-wrapper"><i className={feature.icon}></i></div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STUDENT CLUBS ===== */}
      <section className="student-clubs">
        <div className="container">
          <h2 data-aos="fade-up">Student Clubs & Organizations</h2>
          <div className="clubs-grid">
            {clubs.map((club, index) => (
              <div className="club-card" data-aos="zoom-in" data-aos-delay={index * 100} key={index}>
                <i className={club.icon}></i>
                <h4>{club.title}</h4>
                <p>{club.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INNOVATION HUB ===== */}
      <section className="innovation-hub">
        <div className="container">
          <div className="content" data-aos="fade-right">
            <h2>Innovation Hub</h2>
            <p>
              Our Innovation Hub is the heart of creativity and entrepreneurship at SIA. It's where students transform ideas into reality with access to cutting-edge tools, mentorship, and collaborative spaces.
            </p>
            <div className="features-list">
              {hubFeatures.map((feature, index) => (
                <div className="feature-item" key={index}>
                  <i className="fas fa-check-circle"></i> {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="image-placeholder" data-aos="fade-left">
            <i className="fas fa-flask"></i>
            <h4>SIA Innovation Hub</h4>
            <p>Where ideas become reality</p>
            <p style={{ marginTop: '8px', fontSize: '0.85rem' }}>Open 24/7 for students</p>
          </div>
        </div>
      </section>

      {/* ===== EVENTS ===== */}
      <section className="events">
        <div className="container">
          <h2 data-aos="fade-up">Upcoming Events</h2>
          <div className="events-grid">
            {events.map((event, index) => (
              <div className="event-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <span className="event-date">📅 {event.date}</span>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
                <div className="event-meta">
                  <span><i className="fas fa-clock"></i> {event.time}</span>
                  <span><i className="fas fa-map-marker-alt"></i> {event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

 
{/* ===== GALLERY ===== */}
<section className="gallery">
  <div className="container">
    <h2 data-aos="fade-up">Photo Gallery</h2>
    <div className="gallery-grid">
      {galleryItems.map((item, index) => (
        <div 
          className={`gallery-item ${item.wide ? 'gallery-wide' : ''}`} 
          data-aos="zoom-in" 
          data-aos-delay={index * 100}
          key={index}
        >
          <img 
            src={item.image} 
            alt={item.label} 
            loading="lazy"
          />
          <div className="overlay">{item.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* ===== ALUMNI ===== */}
      <section className="alumni">
        <div className="container">
          <h2 data-aos="fade-up">Our Alumni</h2>
          <div className="alumni-grid">
            {alumni.map((alumnus, index) => (
              <div className="alumni-card" data-aos="flip-left" data-aos-delay={index * 100} key={index}>
                <div className="avatar"><i className="fas fa-user-circle"></i></div>
                <h4>{alumnus.name}</h4>
                <div className="role">{alumnus.role}</div>
                <p>{alumnus.class}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STUDENT STORIES ===== */}
      <section className="student-stories">
        <div className="container">
          <h2 data-aos="fade-up">Student Stories</h2>
          <div className="stories-grid">
            {stories.map((story, index) => (
              <div className="story-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                <div className="quote">
                  <i className="fas fa-quote-left"></i> {story.quote}
                </div>
                <div className="student-info">
                  <div className="avatar"><i className="fas fa-user"></i></div>
                  <div>
                    <h5>{story.name}</h5>
                    <span>{story.programme}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Ready to Join Our Community?</h2>
          <p>Become part of a vibrant community of innovators, creators, and leaders shaping the future.</p>
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

export default StudentLife;