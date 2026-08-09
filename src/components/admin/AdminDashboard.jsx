import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, DoughnutController, ArcElement, Legend, Tooltip } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import './AdminDashboard.css';

// Register ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale, DoughnutController, ArcElement, Legend, Tooltip);

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  // Add this useEffect inside the component
useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Toast notification
  const showToastNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
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
    { id: 'analytics', icon: 'fas fa-chart-line', label: 'Analytics' },
    { id: 'students', icon: 'fas fa-users', label: 'Students' },
    { id: 'lecturers', icon: 'fas fa-chalkboard-teacher', label: 'Lecturers' },
    { id: 'admissions', icon: 'fas fa-door-open', label: 'Admissions' },
    { id: 'payments', icon: 'fas fa-credit-card', label: 'Payments' },
    { id: 'programmes', icon: 'fas fa-book', label: 'Programmes' },
    { id: 'news', icon: 'fas fa-newspaper', label: 'News' },
    { id: 'research', icon: 'fas fa-flask', label: 'Research' },
    { id: 'gallery', icon: 'fas fa-images', label: 'Gallery' },
    { id: 'certificates', icon: 'fas fa-certificate', label: 'Certificates' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  const pageTitles = {
    dashboard: 'Admin Dashboard',
    analytics: 'Analytics',
    students: 'Students',
    lecturers: 'Lecturers',
    admissions: 'Admissions',
    payments: 'Payments',
    programmes: 'Programmes',
    news: 'News',
    research: 'Research',
    gallery: 'Gallery',
    certificates: 'Certificates',
    settings: 'Settings'
  };

  const pageSubtitles = {
    dashboard: 'Welcome back, Dr. Ogunleye!',
    analytics: 'Track your academy\'s performance metrics',
    students: 'Manage student records and enrollment',
    lecturers: 'Manage lecturer profiles and assignments',
    admissions: 'Review and manage student applications',
    payments: 'Track and manage payments',
    programmes: 'Manage academic programmes',
    news: 'Manage news and announcements',
    research: 'Manage research projects and publications',
    gallery: 'Manage photo gallery',
    certificates: 'Manage certificate issuance and verification',
    settings: 'Configure academy settings'
  };

  // Widget data
  const widgets = [
    { icon: 'fas fa-users', value: '1,247', label: 'Total Students', change: '+12% this month', changeType: 'up' },
    { icon: 'fas fa-chalkboard-teacher', value: '48', label: 'Lecturers', change: '+3 new', changeType: 'up' },
    { icon: 'fas fa-credit-card', value: '₦4.2M', label: 'Revenue This Month', change: '+18% increase', changeType: 'up' },
    { icon: 'fas fa-door-open', value: '156', label: 'New Applications', change: 'Pending review', changeType: 'down' },
  ];

  // Analytics widgets
  const analyticsWidgets = [
    { icon: 'fas fa-user-graduate', value: '78%', label: 'Retention Rate' },
    { icon: 'fas fa-graduation-cap', value: '95%', label: 'Graduation Rate' },
    { icon: 'fas fa-briefcase', value: '92%', label: 'Employment Rate' },
    { icon: 'fas fa-star', value: '4.8', label: 'Student Satisfaction' },
  ];

  // Recent activity
  const activities = [
    { icon: 'fas fa-user-plus', title: 'New Student Registration', desc: 'Amara Okonkwo enrolled in Entrepreneurship', time: '2 hours ago' },
    { icon: 'fas fa-credit-card', title: 'Payment Received', desc: '₦350,000 from Tunde Ogunleye', time: '5 hours ago' },
    { icon: 'fas fa-file-alt', title: 'Certificate Issued', desc: 'Zainab Ibrahim - AI & Data Science', time: '1 day ago' },
    { icon: 'fas fa-user-edit', title: 'Staff Profile Updated', desc: 'Prof. Chidi Okonkwo - Dean of Academics', time: '2 days ago' },
  ];

  // Students data
  const students = [
    { id: 'SIA-2025-001', name: 'Amara Okonkwo', programme: 'Entrepreneurship', status: 'Active' },
    { id: 'SIA-2025-002', name: 'Tunde Ogunleye', programme: 'Technology', status: 'Active' },
    { id: 'SIA-2025-003', name: 'Zainab Ibrahim', programme: 'AI & Data Science', status: 'Active' },
    { id: 'SIA-2025-004', name: 'Kofi Mensah', programme: 'Business Management', status: 'Inactive' },
    { id: 'SIA-2025-005', name: 'Ngozi Eze', programme: 'Technology', status: 'Active' },
  ];

  // Lecturers data
  const lecturers = [
    { name: 'Prof. Chidi Okonkwo', title: 'Dean of Academics • Computer Science • 15 years', status: 'Active' },
    { name: 'Dr. Adeola Ogunleye', title: 'Senior Lecturer • Entrepreneurship • 20 years', status: 'Active' },
    { name: 'Ms. Ngozi Eze', title: 'Lecturer • Business Management • 8 years', status: 'Active' },
    { name: 'Dr. Kwame Mensah', title: 'Head of Research • AI & Data Science • 12 years', status: 'Inactive' },
  ];

  // Admissions data
  const admissions = [
    { name: 'Chimamanda Obi', details: 'Applied: Nov 10, 2026 • Programme: Technology', status: 'Pending' },
    { name: 'Emeka Okafor', details: 'Applied: Nov 8, 2026 • Programme: Entrepreneurship', status: 'Approved' },
    { name: 'Ifeoma Nwachukwu', details: 'Applied: Nov 5, 2026 • Programme: AI & Data Science', status: 'Pending' },
    { name: 'Oluwaseun Adebayo', details: 'Applied: Nov 3, 2026 • Programme: Business Management', status: 'Rejected' },
  ];

  // Payments data
  const payments = [
    { name: 'Amara Okonkwo - Tuition Fee', details: 'Nov 10, 2026 • Semester 2', amount: '₦350,000', status: 'Paid' },
    { name: 'Tunde Ogunleye - Tuition Fee', details: 'Nov 8, 2026 • Semester 2', amount: '₦450,000', status: 'Paid' },
    { name: 'Zainab Ibrahim - Registration Fee', details: 'Nov 5, 2026 • Semester 2', amount: '₦50,000', status: 'Pending' },
  ];

  // Programmes data
  const programmes = [
    { name: 'Entrepreneurship', details: '12 Weeks • 45 students • ₦350,000', status: 'Active' },
    { name: 'Technology', details: '24 Weeks • 52 students • ₦550,000', status: 'Active' },
    { name: 'Business Management', details: '16 Weeks • 38 students • ₦450,000', status: 'Active' },
    { name: 'AI & Data Science', details: '16 Weeks • 30 students • ₦500,000', status: 'Active' },
  ];

  // News data
  const newsItems = [
    { title: 'SIA Launches AI Research Lab', date: 'Nov 10, 2026 • Published', status: 'Published' },
    { title: 'Partnership with Google', date: 'Nov 8, 2026 • Draft', status: 'Draft' },
    { title: 'Student Startup Wins Award', date: 'Nov 5, 2026 • Published', status: 'Published' },
  ];

  // Research data
  const researchItems = [
    { title: 'AI-Powered Solutions for African Agriculture', author: 'Dr. Kwame Mensah • Published 2025', status: 'Published' },
    { title: 'Entrepreneurship Ecosystems in Emerging Markets', author: 'Prof. Chidi Okonkwo • Published 2025', status: 'Published' },
    { title: 'Sustainable Energy Solutions for Sub-Saharan Africa', author: 'Dr. Adeola Ogunleye • In Review', status: 'In Review' },
  ];

  // Certificates data
  const certificates = [
    { name: 'Amara Okonkwo - Entrepreneurship', details: 'Certificate: SIA-2026-001 • Issued: Dec 15, 2026', status: 'Verified' },
    { name: 'Tunde Ogunleye - Technology', details: 'Certificate: SIA-2026-045 • Issued: Dec 10, 2026', status: 'Verified' },
    { name: 'Zainab Ibrahim - AI & Data Science', details: 'Certificate: SIA-2026-123 • Issued: Dec 5, 2026', status: 'Verified' },
  ];

  // Chart data
  const enrollmentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Students',
        data: [45, 52, 38, 65, 42, 58],
        backgroundColor: 'rgba(184, 105, 48, 0.2)',
        borderColor: '#B86930',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const programmeChartData = {
    labels: ['Entrepreneurship', 'Technology', 'Business Management', 'AI & Data Science'],
    datasets: [
      {
        data: [45, 52, 38, 30],
        backgroundColor: ['#B86930', '#F5D08A', '#4A2A12', '#2A1608'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'Active': 'active',
      'Inactive': 'inactive',
      'Pending': 'pending',
      'Approved': 'active',
      'Rejected': 'inactive',
      'Paid': 'active',
      'Published': 'active',
      'Draft': 'pending',
      'In Review': 'pending',
      'Verified': 'active',
    };
    return statusMap[status] || 'pending';
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
            <div className="content-grid">
              <div className="content-card" data-aos="fade-right">
                <div className="card-header">
                  <h3>Enrollment Overview</h3>
                  <a onClick={() => navigateTo('analytics')}>View Report</a>
                </div>
                <div className="chart-container">
                  <Bar data={enrollmentData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                  }} />
                </div>
              </div>
              <div className="content-card" data-aos="fade-left">
                <div className="card-header">
                  <h3>Recent Activity</h3>
                  <a onClick={() => navigateTo('students')}>View All</a>
                </div>
                {activities.map((activity, index) => (
                  <div className="activity-item" key={index}>
                    <div className="activity-icon"><i className={activity.icon}></i></div>
                    <div className="activity-info">
                      <h4>{activity.title}</h4>
                      <p>{activity.desc}</p>
                    </div>
                    <div className="activity-time">{activity.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'analytics':
        return (
          <>
            <div className="widgets-grid">
              {analyticsWidgets.map((widget, index) => (
                <div className="widget-card" data-aos="fade-up" data-aos-delay={index * 100} key={index}>
                  <div className="widget-icon"><i className={widget.icon}></i></div>
                  <div className="widget-value">{widget.value}</div>
                  <div className="widget-label">{widget.label}</div>
                </div>
              ))}
            </div>
            <div className="content-card">
              <div className="card-header">
                <h3>Programme Performance</h3>
              </div>
              <div style={{ height: '250px' }}>
                <Doughnut data={programmeChartData} options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }} />
              </div>
            </div>
          </>
        );

      case 'students':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Student Management</h3>
              <a onClick={() => showToastNotification('Add student form opened!')}>+ Add Student</a>
            </div>
            <div className="student-table-wrap">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Programme</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.programme}</td>
                      <td><span className={`badge-status ${getStatusBadge(student.status)}`}>{student.status}</span></td>
                      <td><a href="#" style={{ fontSize: '0.8rem' }}>Edit</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'lecturers':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Lecturer Management</h3>
              <a onClick={() => showToastNotification('Add lecturer form opened!')}>+ Add Lecturer</a>
            </div>
            {lecturers.map((lecturer, index) => (
              <div className="lecturer-card" key={index}>
                <div className="lecturer-avatar"><i className="fas fa-chalkboard-teacher"></i></div>
                <div className="lecturer-info">
                  <h4>{lecturer.name}</h4>
                  <p>{lecturer.title}</p>
                </div>
                <span className={`badge-status ${getStatusBadge(lecturer.status)}`}>{lecturer.status}</span>
              </div>
            ))}
          </div>
        );

      case 'admissions':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Admissions Management</h3>
              <a onClick={() => showToastNotification('Review applications opened!')}>Review All</a>
            </div>
            {admissions.map((admission, index) => (
              <div className="admission-item" key={index}>
                <div className="admission-info">
                  <h4>{admission.name}</h4>
                  <p>{admission.details}</p>
                </div>
                <span className={`badge-status ${getStatusBadge(admission.status)}`}>{admission.status}</span>
              </div>
            ))}
          </div>
        );

      case 'payments':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Payment Management</h3>
              <a onClick={() => showToastNotification('Payment report generated!')}>Export Report</a>
            </div>
            {payments.map((payment, index) => (
              <div className="payment-item" key={index}>
                <div className="payment-info">
                  <h4>{payment.name}</h4>
                  <p>{payment.details}</p>
                </div>
                <div>
                  <span className="payment-amount">{payment.amount}</span>
                  <span className={`badge-status ${getStatusBadge(payment.status)}`}>{payment.status}</span>
                </div>
              </div>
            ))}
          </div>
        );

      case 'programmes':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Programmes Management</h3>
              <a onClick={() => showToastNotification('Add programme form opened!')}>+ Add Programme</a>
            </div>
            {programmes.map((programme, index) => (
              <div className="programme-card" key={index}>
                <div className="programme-info">
                  <h4>{programme.name}</h4>
                  <p>{programme.details}</p>
                </div>
                <span className={`badge-status ${getStatusBadge(programme.status)}`}>{programme.status}</span>
              </div>
            ))}
          </div>
        );

      case 'news':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>News Management</h3>
              <a onClick={() => showToastNotification('Create news form opened!')}>+ Create News</a>
            </div>
            {newsItems.map((item, index) => (
              <div className="news-item" key={index}>
                <div className="news-image"><i className="fas fa-image"></i></div>
                <div className="news-info">
                  <h4>{item.title}</h4>
                  <p>{item.date}</p>
                </div>
                <span className={`badge-status ${getStatusBadge(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        );

      case 'research':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Research Management</h3>
              <a onClick={() => showToastNotification('Add research form opened!')}>+ Add Research</a>
            </div>
            {researchItems.map((item, index) => (
              <div className="research-item" key={index}>
                <div className="research-info">
                  <h4>{item.title}</h4>
                  <p>{item.author}</p>
                </div>
                <span className={`badge-status ${getStatusBadge(item.status)}`}>{item.status}</span>
              </div>
            ))}
          </div>
        );

      case 'gallery':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Photo Gallery</h3>
              <a onClick={() => showToastNotification('Upload image form opened!')}>+ Upload Image</a>
            </div>
            <div className="gallery-grid">
              {[...Array(8)].map((_, index) => (
                <div className="gallery-item" key={index}>
                  <i className="fas fa-image"></i>
                </div>
              ))}
            </div>
          </div>
        );

      case 'certificates':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Certificate Management</h3>
              <a onClick={() => showToastNotification('Generate certificate form opened!')}>+ Generate Certificate</a>
            </div>
            {certificates.map((cert, index) => (
              <div className="cert-item" key={index}>
                <div className="cert-info">
                  <h4>{cert.name}</h4>
                  <p>{cert.details}</p>
                </div>
                <span className={`badge-status ${getStatusBadge(cert.status)}`}>{cert.status}</span>
              </div>
            ))}
          </div>
        );

      case 'settings':
        return (
          <div className="content-card">
            <div className="settings-group">
              <h4>General Settings</h4>
              <div className="form-group">
                <label>Academy Name</label>
                <input type="text" defaultValue="Start-up Innovation Academy" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="info@sia.edu" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" defaultValue="+234 800 123 4567" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input type="text" defaultValue="123 Innovation Drive, Lagos, Nigeria" />
              </div>
              <button className="btn-update" onClick={() => showToastNotification('Settings saved successfully!')}>
                Save Settings
              </button>
            </div>
            <div className="settings-group" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e8e0d4' }}>
              <h4>SEO Settings</h4>
              <div className="form-group">
                <label>Meta Title</label>
                <input type="text" defaultValue="SIA - Start-up Innovation Academy" />
              </div>
              <div className="form-group">
                <label>Meta Description</label>
                <input type="text" defaultValue="Africa's leading innovation academy for entrepreneurship and technology" />
              </div>
              <button className="btn-update" onClick={() => showToastNotification('SEO settings updated!')}>
                Update SEO
              </button>
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
          <span>Admin Portal</span>
        </div>

        <div className="user-info">
          <div className="avatar"><i className="fas fa-user-cog"></i></div>
          <h4>Dr. Adeola Ogunleye</h4>
          <p>Admin ID: ADM-001</p>
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
              <h1 id="pageTitle">{pageTitles[activeSection] || 'Admin Dashboard'}</h1>
              <p id="pageSubtitle">{pageSubtitles[activeSection] || 'Welcome back, Dr. Ogunleye!'}</p>
            </div>
          </div>
          <div className="top-actions">
            <div className="notification">
              <i className="fas fa-bell"></i>
              <span className="badge">8</span>
            </div>
            <div className="user-profile">
              <div className="avatar-small"><i className="fas fa-user-cog"></i></div>
            </div>
          </div>
        </div>

        {/* Page Sections */}
        <div className="page-section active">
          {renderSection()}
        </div>
      </main>

      {/* Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
        <i className="fas fa-check-circle toast-icon"></i>
        <span id="toastMessage">{toastMessage}</span>
      </div>
    </div>
  );
};

export default AdminDashboard;