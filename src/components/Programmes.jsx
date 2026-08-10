import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';  
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Programmes.css';

const FreshGraduate = () => {
  const navigate = useNavigate();  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { type: 'bot', text: 'Hello! Ask me about admissions, programmes, fees, or campus life.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);
  const [activeWeek, setActiveWeek] = useState(1);

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
    if (lower.includes('fresh graduate')) {
      return 'The Fresh Graduate Programme is a 12-week transition programme designed to prepare recent graduates for industry careers. It covers Career & Employability, Workplace & Leadership Skills, and Personal Development & Impact.';
    }
    if (lower.includes('curriculum') || lower.includes('week')) {
      return 'The 12-week curriculum covers: Career & Employability (Weeks 1-4), Workplace & Leadership Skills (Weeks 5-8), and Personal Development & Impact (Weeks 9-12). Each week includes teaching, practical sessions, and take-home deliverables.';
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
    { to: '/programmes', label: 'Programmes', active: true },
    { to: '/admissions', label: 'Admissions' },
    { to: '/research', label: 'Research' },
    { to: '/student-life', label: 'Student Life' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
    { to: '/verify', label: 'Verify' },
  ];

  // Phase 1: Career & Employability - Weeks 1-4
  const phase1Weeks = [
    {
      week: 1,
      title: 'From Graduate to Professional',
      objective: 'Shift mindset from student to professional and build a compelling personal brand.',
      topics: [
        'Graduate vs Professional mindset',
        'Personal Branding fundamentals',
        'LinkedIn & CV optimisation',
        'Managing your digital footprint'
      ],
      activity: 'Live CV Clinic and LinkedIn profile audit — participants bring a draft CV/profile and receive line-by-line feedback from the facilitator and peers.',
      deliverable: 'Fully updated CV and LinkedIn profile, ready for job applications.'
    },
    {
      week: 2,
      title: 'Job Search Strategies & Interview Mastery',
      objective: 'Equip participants to find and win jobs through structured search and confident interviewing.',
      topics: [
        'Where the jobs are in Nigeria (2026 outlook)',
        'Building an ATS-friendly CV',
        'The STAR interview method',
        'Salary negotiation basics'
      ],
      activity: 'Mock Interview Panel — small groups rotate through simulated interviews with timed feedback from facilitators.',
      deliverable: 'A personal list of 10 job boards/company career pages relevant to their field, plus 3 written mock interview Q&A responses.'
    },
    {
      week: 3,
      title: 'Digital Skills for the Future of Work',
      objective: 'Build practical, immediately usable digital competence for any workplace.',
      topics: [
        'Advanced Excel (formulas, formatting, basic dashboards)',
        'Canva for professional presentations',
        'Google Workspace essentials (Docs, Sheets, Drive)',
        'Introduction to AI tools such as ChatGPT for everyday productivity'
      ],
      activity: 'Hands-on lab: each participant builds one Canva-designed CV and one simple Excel dashboard using a supplied practice dataset.',
      deliverable: 'Certificate of participation in the digital tools lab, plus the completed Excel dashboard and Canva CV.'
    },
    {
      week: 4,
      title: 'Entrepreneurship & Side Hustles',
      objective: 'Encourage participants to create opportunities, not just search for them.',
      topics: [
        'Identifying real problems worth solving',
        'Lean startup thinking',
        'Grants and loans available to Nigerian youths',
        'Using NYSC CDS as a business testbed'
      ],
      activity: '3-minute business pitch delivered in small groups, with peer and facilitator scoring against a simple rubric.',
      deliverable: 'Completed 1-page Business Model Canvas for their own idea.'
    }
  ];

  // Phase 2: Workplace & Leadership Skills - Weeks 5-8
  const phase2Weeks = [
    {
      week: 5,
      title: 'Communication, Emotional Intelligence & Teamwork',
      objective: 'Build the interpersonal skills needed to work effectively with others.',
      topics: [
        'Professional email writing',
        'Public speaking fundamentals',
        'Active listening',
        'Conflict management'
      ],
      activity: 'Group debate on a workplace-relevant topic, followed by a timed professional email-writing exercise with peer review.',
      deliverable: 'A personal "Communication Audit" plan identifying one strength and two areas to improve.'
    },
    {
      week: 6,
      title: 'Project Management & Critical Thinking',
      objective: 'Build the discipline to plan, execute and deliver results.',
      topics: [
        'Writing SMART goals',
        'Time management techniques',
        'Problem-solving frameworks',
        'Introduction to Trello and Notion'
      ],
      activity: 'Groups plan a mini community project (e.g., a neighbourhood clean-up or school outreach) using a simple Gantt chart template.',
      deliverable: 'A completed project plan template (Gantt chart) for the community project used in Week 12.'
    },
    {
      week: 7,
      title: 'Data Literacy & Basic Analytics for All Disciplines',
      objective: 'Enable evidence-based decision-making, a skill valued across corporate and NGO roles alike.',
      topics: [
        'Reading and interpreting data',
        'Excel basics: Pivot Tables and Charts',
        'Introduction to Google Forms for surveys',
        'Data storytelling'
      ],
      activity: 'Analyse a supplied dummy survey dataset and present three data-backed insights to the class.',
      deliverable: 'A reusable Excel data-analysis template (Pivot Table + chart shell) they can apply to any future dataset.'
    },
    {
      week: 8,
      title: 'Leadership, Ethics & Civic Responsibility',
      objective: 'Develop the ability to lead with integrity at any level.',
      topics: [
        'Leadership at any level (not just management)',
        'Workplace ethics',
        'Anti-corruption principles',
        'Understanding democracy and the Sustainable Development Goals (SDGs)'
      ],
      activity: 'Case study discussion: "Ethical dilemma at work" — small groups analyse a realistic scenario and present their recommended response.',
      deliverable: 'A one-page personal leadership pledge outlining the values they commit to at work.'
    }
  ];

  // Phase 3: Personal Development & Impact - Weeks 9-12
  const phase3Weeks = [
    {
      week: 9,
      title: 'Financial Literacy for Young Professionals',
      objective: 'Give participants the tools to secure their finances from their very first paycheck.',
      topics: [
        'Budgeting on a low or entry-level income',
        'Saving and investing basics',
        'Avoiding online fraud',
        'Pension and insurance fundamentals'
      ],
      activity: 'Participants build a personal 50/30/20 budget (needs/wants/savings) using their actual or expected starting salary.',
      deliverable: 'A completed monthly budget tracker they can keep using after the programme.'
    },
    {
      week: 10,
      title: 'Mental Health, Productivity & Career Burnout',
      objective: 'Help participants sustain their wellbeing while building a career.',
      topics: [
        'Stress management techniques',
        'Recognising and managing imposter syndrome',
        'Focus and productivity techniques',
        'Work-life balance'
      ],
      activity: 'Guided journaling session followed by a hands-on productivity-hack session (e.g., time-blocking a sample week).',
      deliverable: 'A personal self-care plan with at least three concrete, scheduled actions.'
    },
    {
      week: 11,
      title: 'STEM, Innovation & Community Development',
      objective: 'Apply practical skills to solve real community problems, regardless of academic discipline.',
      topics: [
        'What STEM is and why it matters beyond science graduates',
        'Design Thinking basics',
        'STEM-in-practice craft demonstration'
      ],
      activity: 'Hands-on STEM craft lab in teams: participants build a working prototype using low-cost, locally available materials.',
      deliverable: 'A short project report with photos of the prototype, suitable for inclusion in a personal portfolio.'
    },
    {
      week: 12,
      title: 'Networking, Mentorship & Giving Back',
      objective: 'Launch participants into their next chapter and close the seminar with visible impact.',
      topics: [
        'How to network authentically',
        'Finding and approaching a mentor',
        'Volunteering as a career strategy',
        'Starting your own impact project'
      ],
      activity: 'Graduation ceremony featuring group presentations of the 3-month community impact project and award of certificates.',
      deliverable: 'The Professional Readiness Certificate and a printed/digital network directory of fellow cohort members and facilitators.'
    }
  ];

  // Combine all weeks
  const allWeeks = [...phase1Weeks, ...phase2Weeks, ...phase3Weeks];

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
      <section className="page-hero fresh-graduate-hero">
        <div className="container">
          <h1 data-aos="fade-up">Fresh Graduate Programme</h1>
          <p data-aos="fade-up" data-aos-delay="150">
            From Graduate to Impact Leader — A 12-week transition programme designed to prepare recent graduates for industry careers.
          </p>
          <div className="hero-badges" data-aos="fade-up" data-aos-delay="200">
            <span className="badge"><i className="fas fa-clock"></i> 12 Weeks</span>
            <span className="badge"><i className="fas fa-certificate"></i> Professional Readiness Certificate</span>
            <span className="badge"><i className="fas fa-users"></i> 1 Session/Week</span>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMME OVERVIEW ===== */}
      <section className="programme-overview section-padding">
        <div className="container">
          <div className="overview-content" data-aos="fade-up">
            <h2>Programme Overview</h2>
            <p>
              Start-up Innovation Academy's 12-Week Fresh Graduates Seminar is a structured, hands-on programme that takes participants from graduation uncertainty to workplace and community readiness. Delivered as one 2-hour session per week over three months, the curriculum blends direct teaching, guided practical labs, and real deliverables so that every participant leaves each session with something tangible to show for it.
            </p>
            <p>
              The programme is organised into three progressive phases — <strong>Career & Employability</strong>, <strong>Workplace & Leadership Skills</strong>, and <strong>Personal Development & Impact</strong> — each building on the skills and confidence gained in the one before it. Participants graduate with an updated CV and LinkedIn profile, a completed community impact project, and a Professional Readiness Certificate.
            </p>
          </div>

        <div className="learning-outcomes" data-aos="fade-up" data-aos-delay="100">
  <h3>Learning Outcomes</h3>
  <div className="outcomes-grid">
    <div className="outcome-item">
      <i className="fas fa-file-alt"></i>
      <span>Present a market-ready CV, LinkedIn profile and professional digital footprint.</span>
    </div>
    <div className="outcome-item">
      <i className="fas fa-briefcase"></i>
      <span>Search for and win jobs using proven interview and negotiation techniques.</span>
    </div>
    <div className="outcome-item">
      <i className="fas fa-laptop"></i>
      <span>Apply core digital and data-analysis tools (Excel, Canva, Google Workspace, AI productivity tools).</span>
    </div>
    <div className="outcome-item">
      <i className="fas fa-users"></i>
      <span>Communicate, manage projects and lead teams with emotional intelligence and integrity.</span>
    </div>
    <div className="outcome-item">
      <i className="fas fa-wallet"></i>
      <span>Manage personal finances and mental wellbeing as a young professional.</span>
    </div>
    <div className="outcome-item">
      <i className="fas fa-rocket"></i>
      <span>Design, execute and present a real community impact project using Design Thinking.</span>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* ===== CURRICULUM STRUCTURE ===== */}
      <section className="curriculum-structure section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Curriculum Structure at a Glance</h2>
          <div className="phase-cards" data-aos="fade-up">
            <div className="phase-card phase-1">
              <div className="phase-number">Phase 1</div>
              <h4>Career & Employability</h4>
              <p>Month 1 (Weeks 1–4)</p>
              <div className="phase-icon"><i className="fas fa-briefcase"></i></div>
            </div>
            <div className="phase-card phase-2">
              <div className="phase-number">Phase 2</div>
              <h4>Workplace & Leadership Skills</h4>
              <p>Month 2 (Weeks 5–8)</p>
              <div className="phase-icon"><i className="fas fa-users-cog"></i></div>
            </div>
            <div className="phase-card phase-3">
              <div className="phase-number">Phase 3</div>
              <h4>Personal Development & Impact</h4>
              <p>Month 3 (Weeks 9–12)</p>
              <div className="phase-icon"><i className="fas fa-star"></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DETAILED CURRICULUM ===== */}
      <section className="detailed-curriculum section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Detailed Curriculum</h2>
          
          {/* Phase 1 */}
          <div className="phase-section" data-aos="fade-up">
            <div className="phase-header phase-1-header">
              <h3>PHASE 1: CAREER & EMPLOYABILITY — Month 1</h3>
              <p>Goal: Make every participant employable and opportunity-ready.</p>
            </div>
            <div className="weeks-grid">
              {phase1Weeks.map((week, index) => (
                <div className="week-card" key={index}>
                  <div className="week-number">Week {week.week}</div>
                  <h4>{week.title}</h4>
                  <p className="week-objective"><strong>Objective:</strong> {week.objective}</p>
                  <div className="week-topics">
                    <h5>Topics Covered:</h5>
                    <ul>
                      {week.topics.map((topic, idx) => (
                        <li key={idx}><i className="fas fa-circle"></i> {topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="week-activity">
                    <h5>In-Class Activity:</h5>
                    <p>{week.activity}</p>
                  </div>
                  <div className="week-deliverable">
                    <h5>Take-Home Deliverable:</h5>
                    <p>{week.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2 */}
          <div className="phase-section" data-aos="fade-up" data-aos-delay="100">
            <div className="phase-header phase-2-header">
              <h3>PHASE 2: WORKPLACE & LEADERSHIP SKILLS — Month 2</h3>
              <p>Goal: Help participants excel and grow once they are on the job.</p>
            </div>
            <div className="weeks-grid">
              {phase2Weeks.map((week, index) => (
                <div className="week-card" key={index}>
                  <div className="week-number">Week {week.week}</div>
                  <h4>{week.title}</h4>
                  <p className="week-objective"><strong>Objective:</strong> {week.objective}</p>
                  <div className="week-topics">
                    <h5>Topics Covered:</h5>
                    <ul>
                      {week.topics.map((topic, idx) => (
                        <li key={idx}><i className="fas fa-circle"></i> {topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="week-activity">
                    <h5>In-Class Activity:</h5>
                    <p>{week.activity}</p>
                  </div>
                  <div className="week-deliverable">
                    <h5>Take-Home Deliverable:</h5>
                    <p>{week.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 3 */}
          <div className="phase-section" data-aos="fade-up" data-aos-delay="200">
            <div className="phase-header phase-3-header">
              <h3>PHASE 3: PERSONAL DEVELOPMENT & IMPACT — Month 3</h3>
              <p>Goal: Anchor participants in purpose, financial security, and measurable community impact.</p>
            </div>
            <div className="weeks-grid">
              {phase3Weeks.map((week, index) => (
                <div className="week-card" key={index}>
                  <div className="week-number">Week {week.week}</div>
                  <h4>{week.title}</h4>
                  <p className="week-objective"><strong>Objective:</strong> {week.objective}</p>
                  <div className="week-topics">
                    <h5>Topics Covered:</h5>
                    <ul>
                      {week.topics.map((topic, idx) => (
                        <li key={idx}><i className="fas fa-circle"></i> {topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="week-activity">
                    <h5>In-Class Activity:</h5>
                    <p>{week.activity}</p>
                  </div>
                  <div className="week-deliverable">
                    <h5>Take-Home Deliverable:</h5>
                    <p>{week.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== OUR PROGRAMMES ===== */}
<section className="our-programmes section-padding">
  <div className="container">
    <h2 data-aos="fade-up">Our Programmes</h2>
    <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
      Choose from our comprehensive range of programmes designed to launch your career
    </p>
    
    <div className="programmes-grid-modern" data-aos="fade-up">
      {/* Programme 1: Entrepreneurship */}
      <div className="programme-card-modern" data-aos="fade-up" data-aos-delay="100">
        <div className="programme-card-header">
          <div className="programme-icon" style={{ background: 'rgba(184, 105, 48, 0.15)' }}>
            <i className="fas fa-lightbulb" style={{ color: '#B86930' }}></i>
          </div>
          <span className="programme-badge">12 Weeks</span>
        </div>
        <h3>Entrepreneurship</h3>
        <p>An intensive 12-week bootcamp designed to transform aspiring entrepreneurs into business leaders. Learn to validate ideas, build MVPs, and launch successful startups.</p>
        <div className="programme-features">
          <span className="feature-tag">Ideation & Validation</span>
          <span className="feature-tag">Business Model Canvas</span>
          <span className="feature-tag">Financial Planning</span>
          <span className="feature-tag">Marketing Strategy</span>
          <span className="feature-tag">Pitch & Fundraising</span>
        </div>
        <div className="programme-card-footer">
          <div className="programme-price">
            <span className="price">₦350,000</span>
            <span className="mode">Hybrid</span>
          </div>
        
<button 
  className="btn-apply-programme" 
  onClick={() => navigate('/signup', { 
    state: { 
      course: { 
        title: 'Entrepreneurship', 
        price: '₦350,000' 
      } 
    } 
  })}
  style={{ background: '#B86930' }}
>
  Apply Now <i className="fas fa-arrow-right"></i>
</button>
        </div>
      </div>

      {/* Programme 2: Business Management */}
      <div className="programme-card-modern" data-aos="fade-up" data-aos-delay="200">
        <div className="programme-card-header">
          <div className="programme-icon" style={{ background: 'rgba(224, 154, 80, 0.15)' }}>
            <i className="fas fa-chart-line" style={{ color: '#E09A50' }}></i>
          </div>
          <span className="programme-badge">16 Weeks</span>
        </div>
        <h3>Business Management</h3>
        <p>Develop strategic leadership and operational excellence skills over 16 weeks. Covers management principles, organizational behavior, and business strategy.</p>
        <div className="programme-features">
          <span className="feature-tag">Strategic Management</span>
          <span className="feature-tag">Operations & Logistics</span>
          <span className="feature-tag">Human Resources</span>
          <span className="feature-tag">Financial Management</span>
          <span className="feature-tag">Business Analytics</span>
        </div>
        <div className="programme-card-footer">
          <div className="programme-price">
            <span className="price">₦450,000</span>
            <span className="mode">Online</span>
          </div>
  
<button 
  className="btn-apply-programme" 
  onClick={() => navigate('/signup', { 
    state: { 
      course: { 
        title: 'Entrepreneurship', 
        price: '₦350,000' 
      } 
    } 
  })}
  style={{ background: '#B86930' }}
>
  Apply Now <i className="fas fa-arrow-right"></i>
</button>
          
        </div>
      </div>

      {/* Programme 3: Technology */}
      <div className="programme-card-modern" data-aos="fade-up" data-aos-delay="300">
        <div className="programme-card-header">
          <div className="programme-icon" style={{ background: 'rgba(74, 42, 18, 0.15)' }}>
            <i className="fas fa-code" style={{ color: '#4A2A12' }}></i>
          </div>
          <span className="programme-badge">24 Weeks</span>
        </div>
        <h3>Technology</h3>
        <p>Master full-stack development, AI, and data science over 24 weeks. Combines technical skills with real-world projects and industry mentorship.</p>
        <div className="programme-features">
          <span className="feature-tag">Frontend Development</span>
          <span className="feature-tag">Backend Architecture</span>
          <span className="feature-tag">Database Management</span>
          <span className="feature-tag">Machine Learning</span>
          <span className="feature-tag">DevOps & Cloud</span>
        </div>
        <div className="programme-card-footer">
          <div className="programme-price">
            <span className="price">₦550,000</span>
            <span className="mode">In-Person</span>
          </div>
   
<button 
  className="btn-apply-programme" 
  onClick={() => navigate('/signup', { 
    state: { 
      course: { 
        title: 'Entrepreneurship', 
        price: '₦350,000' 
      } 
    } 
  })}
  style={{ background: '#B86930' }}
>
  Apply Now <i className="fas fa-arrow-right"></i>
</button>
        </div>
      </div>

      {/* Programme 4: Professional Courses */}
      <div className="programme-card-modern" data-aos="fade-up" data-aos-delay="400">
        <div className="programme-card-header">
          <div className="programme-icon" style={{ background: 'rgba(42, 22, 8, 0.15)' }}>
            <i className="fas fa-user-graduate" style={{ color: '#2A1608' }}></i>
          </div>
          <span className="programme-badge">8 Weeks</span>
        </div>
        <h3>Professional Courses</h3>
        <p>Enhance your professional skills with intensive development programmes covering leadership, communication, and career advancement strategies.</p>
        <div className="programme-features">
          <span className="feature-tag">Leadership Skills</span>
          <span className="feature-tag">Communication & Branding</span>
          <span className="feature-tag">Career Strategy</span>
          <span className="feature-tag">Project Management</span>
          <span className="feature-tag">Networking & Mentorship</span>
        </div>
        <div className="programme-card-footer">
          <div className="programme-price">
            <span className="price">₦250,000</span>
            <span className="mode">Hybrid</span>
          </div>
     
<button 
  className="btn-apply-programme" 
  onClick={() => navigate('/signup', { 
    state: { 
      course: { 
        title: 'Entrepreneurship', 
        price: '₦350,000' 
      } 
    } 
  })}
  style={{ background: '#B86930' }}
>
  Apply Now <i className="fas fa-arrow-right"></i>
</button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ===== PROGRAMME LOGISTICS ===== */}
      <section className="programme-logistics section-padding">
        <div className="container">
          <h2 data-aos="fade-up">Programme Logistics</h2>
          <div className="logistics-grid" data-aos="fade-up">
            <div className="logistics-item">
              <i className="fas fa-clock"></i>
              <h4>Duration</h4>
              <p>12 weeks — 1 session per week, 2 hours per session</p>
            </div>
            <div className="logistics-item">
              <i className="fas fa-chalkboard"></i>
              <h4>Format</h4>
              <p>45 minutes Teaching + 45 minutes Practical + 20 minutes Q&A + 10 minutes Assignment briefing</p>
            </div>
            <div className="logistics-item">
              <i className="fas fa-tools"></i>
              <h4>Materials</h4>
              <p>Projector, flip chart, laptops (for Excel/Canva weeks), craft materials (Week 11 STEM lab)</p>
            </div>
            <div className="logistics-item">
              <i className="fas fa-clipboard-check"></i>
              <h4>Evaluation</h4>
              <p>Weekly attendance · Week 4 business pitch · Week 7 data-analysis task · Week 12 final community-impact project</p>
            </div>
            <div className="logistics-item">
              <i className="fas fa-project-diagram"></i>
              <h4>Output</h4>
              <p>Each cohort plans, executes and presents one community impact project by graduation</p>
            </div>
            <div className="logistics-item">
              <i className="fas fa-certificate"></i>
              <h4>Certification</h4>
              <p>Participants who meet the attendance and evaluation requirements receive the Professional Readiness Certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="contact-section section-padding">
        <div className="container">
          <div className="contact-card" data-aos="zoom-in">
            <h2>Ready to Get Started?</h2>
            <p>Contact us to learn more about the Fresh Graduate Programme and how to enroll.</p>
            <div className="contact-details">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>siacademydesk@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>0808 099 5099</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>0813 072 7939</span>
              </div>
            </div>
            <div className="contact-director">
              <p><strong>Director:</strong> Samuel Tosin Olorunnisola</p>
            </div>
            <a href="/admissions" className="btn-primary">Apply Now</a>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-banner section-padding">
        <div className="container" data-aos="zoom-in">
          <h2>From Graduate to Impact Leader</h2>
          <p>Take the first step toward a successful career and meaningful impact.</p>
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

export default FreshGraduate;