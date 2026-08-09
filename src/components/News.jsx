import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const News = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsItems] = useState([
    {
      id: 1,
      category: 'latest',
      date: 'November 8, 2026',
      views: '1.2K',
      tag: 'Latest News',
      title: 'Partnership with Google to Expand Digital Skills',
      description: 'SIA has partnered with Google to launch a comprehensive digital skills programme aimed at training 10,000 young Africans in high-demand tech skills.'
    },
    {
      id: 2,
      category: 'student',
      date: 'November 5, 2026',
      views: '856',
      tag: 'Student Stories',
      title: 'Student Startup Wins Global Innovation Award',
      description: 'EduTech solution developed by SIA students recognised at the Global Innovation Summit for its impact on education accessibility.'
    },
    {
      id: 3,
      category: 'blog',
      date: 'November 2, 2026',
      views: '643',
      tag: 'Blog',
      title: 'Building a Culture of Innovation in Education',
      description: 'How SIA is redefining education by fostering a culture of innovation, creativity, and entrepreneurial thinking among students and faculty.'
    },
    {
      id: 4,
      category: 'industry',
      date: 'October 28, 2026',
      views: '1.5K',
      tag: 'Industry Articles',
      title: 'The Future of Work: Skills for the Next Decade',
      description: 'Industry experts weigh in on the skills needed for the future workforce and how SIA is preparing students for emerging opportunities.'
    },
    {
      id: 5,
      category: 'events',
      date: 'October 25, 2026',
      views: '2.1K',
      tag: 'Event Gallery',
      title: 'SIA Tech Summit 2026: Highlights and Photos',
      description: 'Relive the excitement of the SIA Tech Summit 2026, featuring keynote speakers, workshops, and networking sessions with industry leaders.'
    },
    {
      id: 6,
      category: 'latest',
      date: 'October 20, 2026',
      views: '980',
      tag: 'Latest News',
      title: 'New Scholarship Programme Launched for Women in Tech',
      description: 'SIA announces a new scholarship initiative to support women pursuing careers in technology and entrepreneurship across Africa.'
    },
    {
      id: 7,
      category: 'student',
      date: 'October 15, 2026',
      views: '1.1K',
      tag: 'Student Stories',
      title: 'From Student to CEO: The Journey of an SIA Graduate',
      description: 'How an SIA graduate transformed their startup idea into a thriving business with the support of the academy\'s mentorship programme.'
    },
    {
      id: 8,
      category: 'industry',
      date: 'October 10, 2026',
      views: '890',
      tag: 'Industry Articles',
      title: 'The Rise of AI in African Healthcare',
      description: 'Exploring how artificial intelligence is revolutionizing healthcare delivery across the African continent.'
    },
    {
      id: 9,
      category: 'events',
      date: 'October 5, 2026',
      views: '1.8K',
      tag: 'Event Gallery',
      title: 'Entrepreneurship Bootcamp 2026: Success Stories',
      description: 'Highlights from our annual Entrepreneurship Bootcamp where 50 aspiring founders pitched their business ideas.'
    }
  ]);

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
    if (lower.includes('news') || lower.includes('latest')) {
      return 'Check our News page for the latest updates, featured stories, and community news.';
    }
    if (lower.includes('event') || lower.includes('summit')) {
      return 'We host various events including the Tech Summit, Hackathon, and networking events. Check our News page for event recaps.';
    }
    if (lower.includes('scholarship') || lower.includes('financial')) {
      return 'We offer various scholarships including merit-based, women in tech, and need-based financial aid. Visit our Admissions page for details.';
    }
    return 'Thank you for your question. Please contact our communications office for detailed information.';
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
    { to: '/news', label: 'News', active: true },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'latest', label: 'Latest News' },
    { id: 'blog', label: 'Blog' },
    { id: 'industry', label: 'Industry Articles' },
    { id: 'student', label: 'Student Stories' },
    { id: 'events', label: 'Event Gallery' }
  ];

  // Filter and search logic
  const filteredNews = newsItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get visible items (load more functionality)
  const visibleNews = filteredNews.slice(0, visibleCount);
  const hasMore = visibleCount < filteredNews.length;

  // Load more handler
  const loadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  // Category filter handler
  const handleCategoryClick = (categoryId, e) => {
    e.preventDefault();
    setActiveCategory(categoryId);
    setVisibleCount(6); // Reset visible count when changing category
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6); // Reset visible count when searching
  };

  // Featured news (first item)
  const featuredNews = newsItems[0];

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
      <section className="page-hero news-hero">
        <div className="container">
          <h1 data-aos="fade-up">News & Updates</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            Stay informed about the latest happenings, innovations, and stories from the SIA community.
          </p>
        
        </div>
      </section>

      {/* ===== SEARCH ===== */}
      <section className="news-search">
        <div className="container">
          <div className="search-wrapper" data-aos="fade-up">
            <input 
              type="text" 
              placeholder="Search news, articles, stories..." 
              value={searchTerm}
              onChange={handleSearch}
            />
            <button onClick={() => {}}>
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="news-categories">
        <div className="container">
          <div className="category-list" data-aos="fade-up">
            {categories.map((category) => (
              <a 
                key={category.id}
                href="#" 
                className={activeCategory === category.id ? 'active' : ''}
                onClick={(e) => handleCategoryClick(category.id, e)}
              >
                {category.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED NEWS ===== */}
      <section className="featured-news">
        <div className="container">
          <div className="content" data-aos="fade-right">
            <span className="featured-label">Featured Story</span>
            <h2>Featured News</h2>
            <h3>{featuredNews.title}</h3>
            <p>{featuredNews.description}</p>
            <div className="meta">
              <i className="fas fa-calendar-alt"></i> {featuredNews.date} &nbsp;|&nbsp; 
              <i className="fas fa-tag"></i> {featuredNews.tag}
            </div>
            <a href="#" className="btn-primary">Read Full Story</a>
          </div>
          <div className="image-placeholder" data-aos="fade-left">
            <i className="fas fa-microchip"></i>
            <h4>Featured News</h4>
            <p>Cutting-edge technology for African innovation</p>
          </div>
        </div>
      </section>

      {/* ===== NEWS GRID ===== */}
      <section className="news-main">
        <div className="container">
          <div className="news-grid" id="newsGrid">
            {visibleNews.map((item, index) => (
              <div 
                className="news-card" 
                data-category={item.category} 
                data-aos="fade-up" 
                data-aos-delay={(index % 3) * 100}
                key={item.id}
              >
                <div className="news-image"><i className="fas fa-image"></i></div>
                <div className="news-body">
                  <div className="news-meta">
                    <span><i className="fas fa-calendar-alt"></i> {item.date}</span>
                    <span><i className="fas fa-eye"></i> {item.views} views</span>
                  </div>
                  <span className="category-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href="#" className="read-more">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="load-more">
              <button className="btn-load" onClick={loadMore}>
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>Stay Connected With SIA</h2>
          <p>Subscribe to our newsletter and never miss an update from the SIA community.</p>
          <a href="#" className="btn-primary">Subscribe Now</a>
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

export default News;