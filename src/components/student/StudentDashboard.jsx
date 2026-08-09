import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';  
import './StudentDashboard.css';

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(true);
  const toastTimeoutRef = useRef(null);
// Add this useEffect inside the component
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  // Exam modal state
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examTime, setExamTime] = useState(30);
  const [examTimerInterval, setExamTimerInterval] = useState(null);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);

  // Certificate modal state
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState({
    name: 'Amara Okonkwo',
    programme: 'Entrepreneurship',
    certId: 'SIA-2026-001',
    date: 'December 15, 2026'
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Toast notification
  const showToastNotification = (message, success = true) => {
    setToastMessage(message);
    setToastSuccess(success);
    setShowToast(true);
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  // Navigation
  const navigateTo = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  // Toggle sidebar (mobile)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.querySelector('.mobile-hamburger');
      if (window.innerWidth <= 768 && sidebar && hamburger) {
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
          setSidebarOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: 'fas fa-th-large', label: 'Dashboard' },
    { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
    { id: 'courses', icon: 'fas fa-book', label: 'Course Materials' },
    { id: 'exams', icon: 'fas fa-file-alt', label: 'Exams & Results' },
    { id: 'payments', icon: 'fas fa-credit-card', label: 'Payments' },
    { id: 'adviser', icon: 'fas fa-chalkboard-teacher', label: 'Course Adviser' },
    { id: 'certificates', icon: 'fas fa-certificate', label: 'Certificates' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  const pageTitles = {
    dashboard: 'Dashboard',
    profile: 'Profile',
    courses: 'Course Materials',
    exams: 'Exams & Results',
    payments: 'Payments',
    adviser: 'Course Adviser',
    certificates: 'Certificates',
    settings: 'Settings'
  };

  const pageSubtitles = {
    dashboard: 'Welcome back, Amara!',
    profile: 'Manage your personal information',
    courses: 'Access your course materials and resources',
    exams: 'View exam results and take exams',
    payments: 'View payment history and make payments',
    adviser: 'Connect with your course adviser',
    certificates: 'View and download your certificates',
    settings: 'Manage your account settings'
  };

  // Widget data
  const widgets = [
    { icon: 'fas fa-book-open', value: '4', label: 'Current Courses', change: '2 this semester', changeType: 'up' },
    { icon: 'fas fa-tasks', value: '78%', label: 'Overall Progress', change: '5% this week', changeType: 'up' },
    { icon: 'fas fa-file-invoice', value: '₦0', label: 'Outstanding Fees', change: 'All paid', changeType: 'up' },
    { icon: 'fas fa-calendar-check', value: '2', label: 'Upcoming Exams', change: 'Due in 3 days', changeType: 'down' },
  ];

  // Course data
  const courses = [
    { icon: 'fas fa-lightbulb', title: 'Entrepreneurship', instructor: 'Dr. Adeola Ogunleye', status: 'In Progress' },
    { icon: 'fas fa-code', title: 'Technology', instructor: 'Prof. Chidi Okonkwo', status: 'In Progress' },
    { icon: 'fas fa-chart-line', title: 'Business Management', instructor: 'Ms. Ngozi Eze', status: 'Completed' },
    { icon: 'fas fa-robot', title: 'AI & Data Science', instructor: 'Dr. Kwame Mensah', status: 'Upcoming' },
  ];

  const getCourseStatusClass = (status) => {
    const map = {
      'In Progress': 'in-progress',
      'Completed': 'completed',
      'Upcoming': 'upcoming'
    };
    return map[status] || 'in-progress';
  };

  // Announcements
  const announcements = [
    { title: '📢 Tech Summit 2026 Registration Open', date: 'November 10, 2026', excerpt: 'Register now for the annual Tech Summit...' },
    { title: '📅 Exam Schedule Released', date: 'November 5, 2026', excerpt: 'Check your exam timetable for the semester...' },
    { title: '🎓 Scholarship Applications Open', date: 'November 1, 2026', excerpt: 'Apply for the Women in Tech scholarship...' },
  ];

  // Quick actions
  const quickActions = [
    { icon: 'fas fa-book', label: 'View Materials', action: 'courses' },
    { icon: 'fas fa-file-alt', label: 'Check Results', action: 'exams' },
    { icon: 'fas fa-credit-card', label: 'Pay Fees', action: 'payments' },
    { icon: 'fas fa-certificate', label: 'Request Transcript', action: 'certificates' },
  ];

  // Exam data
  const exams = [
    { title: 'Entrepreneurship - Final Exam', date: 'December 15, 2026', status: 'Passed', score: '85%' },
    { title: 'Technology - Midterm Exam', date: 'November 20, 2026', status: 'Passed', score: '78%' },
    { title: 'Business Management - Final Exam', date: 'October 10, 2026', status: 'Passed', score: '92%' },
    { title: 'AI & Data Science - Midterm Exam', date: 'Available Now', status: 'Not Taken', score: '' },
  ];

  const getExamStatusClass = (status) => {
    const map = {
      'Passed': 'passed',
      'Failed': 'failed',
      'Upcoming': 'upcoming',
      'Not Taken': 'taken'
    };
    return map[status] || 'upcoming';
  };

  // Payment data
  const payments = [
    { title: 'Tuition Fee - Semester 2', date: 'Paid on November 1, 2026', amount: '₦350,000', status: 'Paid' },
    { title: 'Registration Fee - Semester 2', date: 'Paid on October 15, 2026', amount: '₦50,000', status: 'Paid' },
    { title: 'Tuition Fee - Semester 1', date: 'Paid on August 1, 2026', amount: '₦350,000', status: 'Paid' },
  ];

  // Certificate data
  const certificates = [
    { title: 'Entrepreneurship Certificate', date: 'Issued: December 2026', certId: 'SIA-2026-001' },
    { title: 'Business Management Certificate', date: 'Issued: June 2026', certId: 'SIA-2026-045' },
  ];

  // Chart data
  const performanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Score',
        data: [65, 70, 75, 82, 78, 85],
        borderColor: '#B86930',
        backgroundColor: 'rgba(184, 105, 48, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  // Exam functions
  const openExamModal = () => {
    setExamModalOpen(true);
    setExamTime(30);
    setExamAnswers({});
    setExamSubmitted(false);
    document.body.style.overflow = 'hidden';

    // Start countdown
    if (examTimerInterval) clearInterval(examTimerInterval);
    const interval = setInterval(() => {
      setExamTime(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          alert('⏰ Time is up! Your exam will be submitted automatically.');
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setExamTimerInterval(interval);
  };

  const closeExamModal = () => {
    setExamModalOpen(false);
    document.body.style.overflow = '';
    if (examTimerInterval) {
      clearInterval(examTimerInterval);
      setExamTimerInterval(null);
    }
  };

  const handleExamAnswerChange = (question, value) => {
    setExamAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleSubmitExam = () => {
    clearInterval(examTimerInterval);
    setExamTimerInterval(null);

    const totalQuestions = 5;
    const answered = Object.keys(examAnswers).length;

    if (answered < totalQuestions) {
      const confirmSubmit = window.confirm(
        `You have answered ${answered} out of ${totalQuestions} questions.\n\nDo you want to submit your exam?`
      );
      if (!confirmSubmit) {
        // Resume timer
        const interval = setInterval(() => {
          setExamTime(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              handleSubmitExam();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        setExamTimerInterval(interval);
        return;
      }
    }

    // Calculate score
    const correctAnswers = {
      q1: 'a',
      q2: 'b',
      q3: 'a',
      q4: 'a',
      q5: 'a'
    };

    let score = 0;
    Object.keys(correctAnswers).forEach(key => {
      if (examAnswers[key] === correctAnswers[key]) {
        score++;
      }
    });

    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 50;

    setExamSubmitted(true);
    closeExamModal();

    if (passed) {
      showToastNotification(`✅ Congratulations! You passed with ${percentage}% (${score}/${totalQuestions})`, true);
    } else {
      showToastNotification(`❌ You scored ${percentage}% (${score}/${totalQuestions}). Please try again.`, false);
    }
  };

  // Certificate functions
  const viewCertificate = (name, programme, certId, date) => {
    setCurrentCertificate({ name, programme, certId, date });
    setCertModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCertificate = () => {
    setCertModalOpen(false);
    document.body.style.overflow = '';
  };

const downloadCertificatePDF = () => {
  const { name, programme, certId, date } = currentCertificate;
  
  try {
    // Create PDF instance
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    // ===== BACKGROUND =====
    // Cream/ivory background
    pdf.setFillColor(252, 248, 240);
    pdf.rect(0, 0, 297, 210, 'F');

    // ===== WATERMARK LOGO =====
    pdf.setFont('georgia', 'bold');
    pdf.setFontSize(80);
    pdf.setTextColor(245, 208, 138);
    pdf.setGState(new pdf.GState({ opacity: 0.12 }));
    pdf.text('SIA', 148.5, 115, { align: 'center' });
    
    // Reset opacity
    pdf.setGState(new pdf.GState({ opacity: 1 }));

    // ===== MAIN BORDER =====
    // Outer gold border
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(0.8);
    pdf.rect(10, 10, 277, 190);

    // Inner decorative border (double line)
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(0.3);
    pdf.rect(14, 14, 269, 182);

    // ===== DECORATIVE CORNERS =====
    const cornerSize = 20;
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(1);
    
    // Top-left corner
    pdf.line(10, 10 + cornerSize, 10, 10);
    pdf.line(10, 10, 10 + cornerSize, 10);
    // Inner top-left
    pdf.line(14, 14 + cornerSize - 4, 14, 14);
    pdf.line(14, 14, 14 + cornerSize - 4, 14);
    
    // Top-right corner
    pdf.line(287, 10 + cornerSize, 287, 10);
    pdf.line(287, 10, 287 - cornerSize, 10);
    // Inner top-right
    pdf.line(283, 14 + cornerSize - 4, 283, 14);
    pdf.line(283, 14, 283 - cornerSize + 4, 14);
    
    // Bottom-left corner
    pdf.line(10, 200 - cornerSize, 10, 200);
    pdf.line(10, 200, 10 + cornerSize, 200);
    // Inner bottom-left
    pdf.line(14, 196 - cornerSize + 4, 14, 196);
    pdf.line(14, 196, 14 + cornerSize - 4, 196);
    
    // Bottom-right corner
    pdf.line(287, 200 - cornerSize, 287, 200);
    pdf.line(287, 200, 287 - cornerSize, 200);
    // Inner bottom-right
    pdf.line(283, 196 - cornerSize + 4, 283, 196);
    pdf.line(283, 196, 283 - cornerSize + 4, 196);

    // ===== DECORATIVE BORDER LINES =====
    pdf.setDrawColor(245, 208, 138);
    pdf.setLineWidth(0.2);
    pdf.rect(12, 12, 273, 186);

    // ===== HEADER SECTION =====
    // SIA Logo
    pdf.setFont('georgia', 'bold');
    pdf.setFontSize(42);
    pdf.setTextColor(42, 22, 8);
    pdf.text('SIA', 148.5, 42, { align: 'center' });

    // Subtitle with decorative lines
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(74, 42, 18);
    pdf.text('START-UP INNOVATION ACADEMY', 148.5, 50, { align: 'center' });

    // Decorative line under header
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(0.5);
    pdf.line(90, 56, 207, 56);

    // Small decorative diamonds
    pdf.setFillColor(184, 105, 48);
    pdf.circle(148.5, 56, 1.5, 'F');

    // ===== CERTIFICATE TITLE =====
    pdf.setFont('georgia', 'italic');
    pdf.setFontSize(14);
    pdf.setTextColor(74, 42, 18);
    pdf.text('Certificate of Completion', 148.5, 74, { align: 'center' });

    // ===== BODY TEXT =====
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(74, 42, 18);
    pdf.text('This is to certify that', 148.5, 94, { align: 'center' });

    // ===== RECIPIENT NAME =====
    pdf.setFont('georgia', 'bold');
    pdf.setFontSize(36);
    pdf.setTextColor(184, 105, 48);
    pdf.text(name, 148.5, 118, { align: 'center' });

    // ===== PROGRAMME TEXT =====
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(74, 42, 18);
    pdf.text('has successfully completed the', 148.5, 138, { align: 'center' });

    // ===== PROGRAMME NAME =====
    pdf.setFont('georgia', 'bold');
    pdf.setFontSize(22);
    pdf.setTextColor(42, 22, 8);
    pdf.text(programme, 148.5, 156, { align: 'center' });

    // ===== INSTITUTION NAME =====
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(74, 42, 18);
    pdf.text('programme at', 148.5, 172, { align: 'center' });

    pdf.setFont('arial', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(184, 105, 48);
    pdf.text('Start-up Innovation Academy', 148.5, 183, { align: 'center' });

    // ===== DECORATIVE LINE =====
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(0.3);
    pdf.line(110, 189, 187, 189);

    // ===== FOOTER =====
    pdf.setFont('courier', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(74, 42, 18);
    
    // Certificate ID on left
    pdf.text(`Certificate ID: ${certId}`, 30, 198);
    
    // Date on right
    pdf.text(`Date Issued: ${date}`, 220, 198);
    
    // ===== SEAL / STAMP =====
    // Outer circle
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(0.8);
    pdf.circle(250, 160, 22, 'S');
    
    // Inner circle
    pdf.setDrawColor(184, 105, 48);
    pdf.setLineWidth(0.3);
    pdf.circle(250, 160, 18, 'S');
    
    // Seal text
    pdf.setFont('georgia', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(184, 105, 48);
    pdf.text('SIA', 250, 158, { align: 'center' });
    
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(5);
    pdf.text('VERIFIED', 250, 165, { align: 'center' });

    // ===== SIGNATURE LINE =====
    pdf.setDrawColor(74, 42, 18);
    pdf.setLineWidth(0.3);
    pdf.line(50, 175, 120, 175);
    
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(74, 42, 18);
    pdf.text('Authorized Signature', 85, 182, { align: 'center' });

    // ===== ISSUED DATE LINE =====
    pdf.setDrawColor(74, 42, 18);
    pdf.setLineWidth(0.3);
    pdf.line(177, 175, 247, 175);
    
    pdf.setFont('arial', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(74, 42, 18);
    pdf.text('Date of Issue', 212, 182, { align: 'center' });

    // ===== SAVE PDF =====
    pdf.save(`Certificate_${certId}.pdf`);
    showToastNotification('✅ Certificate downloaded successfully!', true);
  } catch (error) {
    console.error('Error generating PDF:', error);
    showToastNotification('❌ Error generating certificate. Please try again.', false);
  }
};

  const downloadFile = (filename) => {
    showToastNotification(`📥 Downloading ${filename}...`, true);
  };

  // Render section content
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="widgets-grid">
              {widgets.map((widget, index) => (
                <div className="widget-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                  <div className="widget-icon"><i className={widget.icon}></i></div>
                  <div className="widget-value">{widget.value}</div>
                  <div className="widget-label">{widget.label}</div>
                  <span className={`widget-change ${widget.changeType}`}>
                    <i className={`fas fa-arrow-${widget.changeType === 'up' ? 'up' : 'down'}`}></i> {widget.change}
                  </span>
                </div>
              ))}
            </div>

            <div className="welcome-card" data-aos="fade-up">
              <h2>Welcome to SIA, Amara! 🎓</h2>
              <p>You're making great progress. Keep up the momentum!</p>
              <div className="progress-section">
                <div className="progress-label">
                  <span>Programme Progress</span>
                  <span>78%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            <div className="content-grid">
              <div className="content-card" data-aos="fade-right">
                <div className="card-header">
                  <h3>Current Courses</h3>
                  <a onClick={() => navigateTo('courses')}>View All</a>
                </div>
                {courses.map((course, index) => (
                  <div className="course-item" key={index}>
                    <div className="course-icon"><i className={course.icon}></i></div>
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <p>{course.instructor}</p>
                    </div>
                    <span className={`course-status ${getCourseStatusClass(course.status)}`}>{course.status}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="content-card" data-aos="fade-left" style={{ marginBottom: '20px' }}>
                  <div className="card-header">
                    <h3>Recent Announcements</h3>
                    <a href="#">View All</a>
                  </div>
                  {announcements.map((item, index) => (
                    <div className="announcement-item" key={index}>
                      <div className="announcement-title">{item.title}</div>
                      <div className="announcement-date">{item.date}</div>
                      <div className="announcement-excerpt">{item.excerpt}</div>
                    </div>
                  ))}
                </div>

                <div className="content-card" data-aos="fade-left" data-aos-delay="100">
                  <div className="card-header">
                    <h3>Quick Actions</h3>
                  </div>
                  <div className="quick-actions">
                    {quickActions.map((action, index) => (
                      <a className="action-btn" onClick={() => navigateTo(action.action)} key={index}>
                        <i className={action.icon}></i>
                        <span>{action.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="content-card" data-aos="fade-up">
              <div className="card-header">
                <h3>Academic Performance</h3>
                <a onClick={() => navigateTo('exams')}>View Full Report</a>
              </div>
              <div className="chart-container">
                <Line data={performanceData} options={chartOptions} />
              </div>
            </div>
          </>
        );

      case 'profile':
        return (
          <div className="profile-grid">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar"><i className="fas fa-user-graduate"></i></div>
                <div className="profile-name">
                  <h3>Amara Okonkwo</h3>
                  <p>Student ID: SIA-2025-001</p>
                </div>
              </div>
              <div className="profile-info-item">
                <span className="label">Programme</span>
                <span className="value">Entrepreneurship</span>
              </div>
              <div className="profile-info-item">
                <span className="label">Department</span>
                <span className="value">Business & Innovation</span>
              </div>
              <div className="profile-info-item">
                <span className="label">Level</span>
                <span className="value">Year 2</span>
              </div>
              <div className="profile-info-item">
                <span className="label">Email</span>
                <span className="value">amara.okonkwo@sia.edu</span>
              </div>
              <div className="profile-info-item">
                <span className="label">Phone</span>
                <span className="value">+234 800 123 4567</span>
              </div>
              <div className="profile-info-item">
                <span className="label">Address</span>
                <span className="value">123 Innovation Drive, Lagos</span>
              </div>
            </div>

            <div className="profile-card">
              <h3 style={{ marginBottom: '16px' }}>Edit Profile</h3>
              <form className="edit-profile-form" onSubmit={(e) => { e.preventDefault(); showToastNotification('Profile updated successfully!', true); }}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue="Amara Okonkwo" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="amara.okonkwo@sia.edu" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" defaultValue="+234 800 123 4567" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea defaultValue="123 Innovation Drive, Lagos"></textarea>
                </div>
                <button type="submit" className="btn-save">Save Changes</button>
              </form>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Course Materials</h3>
            </div>
            <div className="materials-grid">
              <div className="material-item">
                <div className="material-icon"><i className="fas fa-file-pdf"></i></div>
                <div className="material-info">
                  <h4>Entrepreneurship - Module 1</h4>
                  <p>PDF • 2.4 MB</p>
                </div>
                <button className="btn-download" onClick={() => downloadFile('Entrepreneurship_Module_1.pdf')}>
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
              <div className="material-item">
                <div className="material-icon"><i className="fas fa-file-powerpoint"></i></div>
                <div className="material-info">
                  <h4>Technology - Lecture 3 Slides</h4>
                  <p>PPT • 5.1 MB</p>
                </div>
                <button className="btn-download" onClick={() => downloadFile('Technology_Lecture_3.pptx')}>
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
              <div className="material-item">
                <div className="material-icon"><i className="fas fa-video"></i></div>
                <div className="material-info">
                  <h4>Business Management - Video Lecture</h4>
                  <p>MP4 • 120 MB</p>
                </div>
                <button className="btn-download" onClick={() => downloadFile('Business_Management_Lecture.mp4')}>
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
              <div className="material-item">
                <div className="material-icon"><i className="fas fa-file-word"></i></div>
                <div className="material-info">
                  <h4>Assignment - Business Plan</h4>
                  <p>DOCX • 856 KB</p>
                </div>
                <button className="btn-download" onClick={() => downloadFile('Business_Plan_Assignment.docx')}>
                  <i className="fas fa-download"></i> Download
                </button>
              </div>
            </div>
          </div>
        );

      case 'exams':
        return (
          <div className="content-card">
            <div className="exam-header">
              <h3>Exam Results</h3>
              <button className="btn-take-exam" onClick={openExamModal}>
                <i className="fas fa-pencil-alt"></i> Take Exam
              </button>
            </div>
            {exams.map((exam, index) => (
              <div className="exam-item" key={index}>
                <div className="exam-info">
                  <h4>{exam.title}</h4>
                  <p>{exam.date}</p>
                </div>
                <span className={`exam-status ${getExamStatusClass(exam.status)}`}>
                  {exam.status === 'Not Taken' ? exam.status : `${exam.status} (${exam.score})`}
                </span>
              </div>
            ))}
          </div>
        );

      case 'payments':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Payment History</h3>
              <a className="btn-save" style={{ fontSize: '0.9rem', padding: '6px 20px' }} onClick={() => showToastNotification('Redirecting to payment gateway...')}>
                Pay Now
              </a>
            </div>
            {payments.map((payment, index) => (
              <div className="payment-item" key={index}>
                <div className="payment-info">
                  <h4>{payment.title}</h4>
                  <p>{payment.date}</p>
                </div>
                <div>
                  <span className="payment-amount">{payment.amount}</span>
                  <span className={`payment-status ${payment.status.toLowerCase()}`}>{payment.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'adviser':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Your Course Adviser</h3>
            </div>
            <div className="adviser-card">
              <div className="adviser-avatar"><i className="fas fa-chalkboard-teacher"></i></div>
              <div className="adviser-info">
                <h3>Dr. Adeola Ogunleye</h3>
                <p>Senior Lecturer, Entrepreneurship</p>
                <p><i className="fas fa-envelope"></i> a.ogunleye@sia.edu</p>
                <p><i className="fas fa-phone"></i> +234 800 123 4567</p>
              </div>
            </div>
            <div className="adviser-actions">
              <button className="btn-save" onClick={() => showToastNotification('Appointment request sent!', true)}>
                Request Appointment
              </button>
              <button className="btn-save btn-outline" onClick={() => showToastNotification('Message sent to your course adviser!', true)}>
                Send Message
              </button>
            </div>
          </div>
        );

      case 'certificates':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>My Certificates</h3>
              <a className="btn-save" style={{ fontSize: '0.9rem', padding: '6px 20px' }} onClick={() => showToastNotification('Transcript request submitted!', true)}>
                Request Transcript
              </a>
            </div>
            {certificates.map((cert, index) => (
              <div className="certificate-item" key={index}>
                <div className="cert-icon"><i className="fas fa-certificate"></i></div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <p>{cert.date}</p>
                </div>
                <button className="btn-view" onClick={() => viewCertificate('Amara Okonkwo', cert.title.replace(' Certificate', ''), cert.certId, cert.date.replace('Issued: ', ''))}>
                  View
                </button>
              </div>
            ))}
          </div>
        );

      case 'settings':
        return (
          <div className="content-card">
            <div className="settings-group">
              <h4>Change Password</h4>
              <form onSubmit={(e) => { e.preventDefault(); showToastNotification('Password updated successfully!', true); }}>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button type="submit" className="btn-update">Update Password</button>
              </form>
            </div>

            <div className="settings-group" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e8e0d4' }}>
              <h4>Account Settings</h4>
              <form onSubmit={(e) => { e.preventDefault(); showToastNotification('Settings saved successfully!', true); }}>
                <div className="form-group">
                  <label>Email Notifications</label>
                  <div style={{ display: 'flex', gap: '20px', marginTop: '8px', flexWrap: 'wrap' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '400' }}>
                      <input type="checkbox" defaultChecked /> Receive email updates
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '400' }}>
                      <input type="checkbox" defaultChecked /> Receive announcements
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-update">Save Settings</button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
        <div className="brand">
          <h2>SIA</h2>
          <span>Student Portal</span>
        </div>

        <div className="user-info">
          <div className="avatar"><i className="fas fa-user-graduate"></i></div>
          <h4>Amara Okonkwo</h4>
          <p>Student ID: SIA-2025-001</p>
        </div>

        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => navigateTo(item.id)}
                >
                  <i className={item.icon}></i> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="/login" className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </a>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <div className="top-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="mobile-hamburger" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="page-title">
              <h1>{pageTitles[activeSection] || 'Dashboard'}</h1>
              <p>{pageSubtitles[activeSection] || 'Welcome back, Amara!'}</p>
            </div>
          </div>
          <div className="top-actions">
            <div className="notification">
              <i className="fas fa-bell"></i>
              <span className="badge">3</span>
            </div>
            <div className="user-profile">
              <div className="avatar-small"><i className="fas fa-user-graduate"></i></div>
            </div>
          </div>
        </div>

        {/* Page Sections */}
        <div className="page-section active">
          {renderSection()}
        </div>
      </main>

      {/* Exam Modal */}
      {examModalOpen && (
        <div className="exam-modal-overlay active" id="examModal">
          <div className="exam-modal">
            <button className="modal-close" onClick={closeExamModal}><i className="fas fa-times"></i></button>
            <h2 className="exam-title">AI & Data Science - Midterm Exam</h2>
            <p className="exam-subtitle">Please answer all questions. You have 30 minutes to complete this exam.</p>
            <div className="timer" id="examTimer">
              ⏱️ {String(Math.floor(examTime / 60)).padStart(2, '0')}:{String(examTime % 60).padStart(2, '0')}
            </div>

            <form id="examForm" onSubmit={(e) => { e.preventDefault(); handleSubmitExam(); }}>
              {[
                { id: 'q1', text: 'What is the primary purpose of data preprocessing in machine learning?', options: ['To make data suitable for analysis by cleaning and transforming it', 'To delete all missing values permanently', 'To make data smaller and faster to process', 'To automatically generate new features'] },
                { id: 'q2', text: 'Which of the following is a supervised learning algorithm?', options: ['K-Means Clustering', 'Linear Regression', 'DBSCAN', 'Principal Component Analysis'] },
                { id: 'q3', text: 'What is the purpose of a confusion matrix?', options: ['To visualize the performance of a classification model', 'To confuse the model during training', 'To randomly sample data points', 'To normalize the dataset'] },
                { id: 'q4', text: 'Which of the following best describes overfitting?', options: ['Model performs well on training data but poorly on new data', 'Model performs poorly on both training and test data', 'Model is too simple to capture patterns', 'Model has been trained too quickly'] },
                { id: 'q5', text: 'What is the role of feature scaling in machine learning?', options: ['To ensure features contribute equally to the model', 'To remove all numerical features', 'To make features categorical', 'To increase the number of features'] }
              ].map((q, idx) => (
                <div className="question-item" key={idx}>
                  <div className="question-text">{idx + 1}. {q.text}</div>
                  <div className="options">
                    {q.options.map((opt, optIdx) => (
                      <label key={optIdx}>
                        <input
                          type="radio"
                          name={q.id}
                          value={String.fromCharCode(97 + optIdx)}
                          onChange={(e) => handleExamAnswerChange(q.id, e.target.value)}
                        />
                        <span className="option-text">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button type="submit" className="btn-submit-exam">📤 Submit Exam</button>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {certModalOpen && (
        <div className="modal-overlay active" id="certificateModal">
          <div className="certificate-modal">
            <button className="modal-close" onClick={closeCertificate}><i className="fas fa-times"></i></button>
            <div className="certificate-border">
              <div className="certificate-title">SIA</div>
              <div className="certificate-subtitle">Start-up Innovation Academy</div>
              <div className="certificate-line"></div>
              <div style={{ fontSize: '0.9rem', color: '#4A2A12', opacity: '0.6', margin: '8px 0' }}>This is to certify that</div>
              <div className="certificate-name">{currentCertificate.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#4A2A12', opacity: '0.6' }}>has successfully completed the</div>
              <div className="certificate-details" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2A1608' }}>{currentCertificate.programme}</div>
              <div style={{ fontSize: '0.9rem', color: '#4A2A12', opacity: '0.6' }}>programme at</div>
              <div style={{ fontSize: '1rem', color: '#B86930', fontWeight: '600' }}>Start-up Innovation Academy</div>
              <div className="certificate-line"></div>
              <div className="certificate-id">Certificate ID: {currentCertificate.certId}</div>
              <div className="certificate-id">Date Issued: {currentCertificate.date}</div>
              <div className="certificate-qr"><i className="fas fa-qrcode"></i></div>
              <div style={{ fontSize: '0.7rem', color: '#4A2A12', opacity: '0.4', marginTop: '4px' }}>Scan to verify</div>
              <button className="btn-download-pdf" onClick={downloadCertificatePDF}>
                <i className="fas fa-file-pdf"></i> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''} ${toastSuccess ? 'toast-result' : ''}`} id="toast">
        <i className={`fas ${toastSuccess ? 'fa-check-circle' : 'fa-times-circle'} toast-icon`}></i>
        <span id="toastMessage">{toastMessage}</span>
      </div>
    </div>
  );
};

export default StudentDashboard;