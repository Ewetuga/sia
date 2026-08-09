import React, { useEffect, useState, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LecturerDashboard.css';

const LecturerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // Add this useEffect inside the component
useEffect(() => {
  window.scrollTo(0, 0);
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
    { id: 'courses', icon: 'fas fa-book', label: 'My Courses' },
    { id: 'upload', icon: 'fas fa-upload', label: 'Upload Materials' },
    { id: 'students', icon: 'fas fa-users', label: 'Student List' },
    { id: 'assignments', icon: 'fas fa-tasks', label: 'Assignments' },
    { id: 'profile', icon: 'fas fa-user', label: 'Profile' },
    { id: 'announcements', icon: 'fas fa-bullhorn', label: 'Announcements' },
    { id: 'attendance', icon: 'fas fa-check-double', label: 'Attendance' },
    { id: 'grades', icon: 'fas fa-star', label: 'Grades' },
  ];

  const pageTitles = {
    dashboard: 'Dashboard',
    courses: 'My Courses',
    upload: 'Upload Materials',
    students: 'Student List',
    assignments: 'Assignments',
    profile: 'Profile',
    announcements: 'Announcements',
    attendance: 'Attendance',
    grades: 'Grades'
  };

  const pageSubtitles = {
    dashboard: 'Welcome back, Prof. Okonkwo!',
    courses: 'Manage your courses and schedules',
    upload: 'Upload course materials for students',
    students: 'View and manage student information',
    assignments: 'Create and manage assignments',
    profile: 'Manage your professional profile',
    announcements: 'Post and manage announcements',
    attendance: 'Mark and track student attendance',
    grades: 'Manage student grades and assessments'
  };

  // Widget data
  const widgets = [
    { icon: 'fas fa-book-open', value: '3', label: 'Active Courses' },
    { icon: 'fas fa-users', value: '48', label: 'Total Students' },
    { icon: 'fas fa-tasks', value: '6', label: 'Pending Assignments' },
    { icon: 'fas fa-check-circle', value: '92%', label: 'Attendance Rate' },
  ];

  // Courses data
  const courses = [
    { icon: 'fas fa-lightbulb', title: 'Entrepreneurship', info: '12 students • Tue/Thu 10:00 AM' },
    { icon: 'fas fa-code', title: 'Technology', info: '18 students • Mon/Wed 2:00 PM' },
    { icon: 'fas fa-robot', title: 'AI & Data Science', info: '18 students • Fri 9:00 AM' },
  ];

  // Course details
  const courseDetails = [
    { title: 'Entrepreneurship', info: '12 students • Tue/Thu 10:00 AM • Room 201', status: 'Active' },
    { title: 'Technology', info: '18 students • Mon/Wed 2:00 PM • Room 305', status: 'Active' },
    { title: 'AI & Data Science', info: '18 students • Fri 9:00 AM • Innovation Lab', status: 'Active' },
    { title: 'Business Management', info: '15 students • Tue/Thu 2:00 PM • Room 102', status: 'Completed' },
  ];

  const getCourseDetailStatusClass = (status) => {
    const map = {
      'Active': 'active',
      'Completed': 'completed',
      'Upcoming': 'upcoming'
    };
    return map[status] || 'active';
  };

  // Student activity
  const studentActivity = [
    { name: 'Amara Okonkwo', activity: 'Submitted Assignment • 2 hours ago', grade: '95%' },
    { name: 'Tunde Ogunleye', activity: 'Attendance Marked • 1 day ago', grade: 'Present', gradeType: 'present' },
    { name: 'Zainab Ibrahim', activity: 'Asked a Question • 2 days ago', grade: 'Replied' },
  ];

  // Quick actions
  const quickActions = [
    { icon: 'fas fa-upload', label: 'Upload Materials', action: 'upload' },
    { icon: 'fas fa-plus-circle', label: 'Create Assignment', action: 'assignments' },
    { icon: 'fas fa-check-double', label: 'Mark Attendance', action: 'attendance' },
    { icon: 'fas fa-star', label: 'Enter Grades', action: 'grades' },
  ];

  // Uploaded materials
  const uploadedMaterials = [
    { icon: 'fas fa-file-pdf', title: 'Entrepreneurship - Module 1 Slides', info: 'Uploaded: Nov 10, 2026 • 2.4 MB' },
    { icon: 'fas fa-file-video', title: 'Technology - Lecture 3 Recording', info: 'Uploaded: Nov 8, 2026 • 45 MB' },
    { icon: 'fas fa-file-word', title: 'AI & Data Science - Assignment 1', info: 'Uploaded: Nov 5, 2026 • 856 KB' },
  ];

  // Students list
  const students = [
    { name: 'Amara Okonkwo', id: 'SIA-2025-001', programme: 'Entrepreneurship', status: 'Active' },
    { name: 'Tunde Ogunleye', id: 'SIA-2025-002', programme: 'Technology', status: 'Active' },
    { name: 'Zainab Ibrahim', id: 'SIA-2025-003', programme: 'AI & Data Science', status: 'Active' },
    { name: 'Kofi Mensah', id: 'SIA-2025-004', programme: 'Business Management', status: 'Active' },
    { name: 'Ngozi Eze', id: 'SIA-2025-005', programme: 'Technology', status: 'Active' },
  ];

  // Assignments
  const assignments = [
    { title: 'Entrepreneurship - Business Plan', info: 'Due: Nov 20, 2026 • 12 submissions', status: 'Open' },
    { title: 'Technology - Final Project', info: 'Due: Dec 5, 2026 • 8 submissions', status: 'Open' },
    { title: 'AI & Data Science - Midterm', info: 'Due: Nov 30, 2026 • 15 submissions', status: 'Draft' },
    { title: 'Business Management - Case Study', info: 'Due: Oct 15, 2026 • 14 submissions', status: 'Closed' },
  ];

  const getAssignmentStatusClass = (status) => {
    const map = {
      'Open': 'open',
      'Draft': 'draft',
      'Closed': 'closed'
    };
    return map[status] || 'draft';
  };

  // Announcements
  const announcements = [
    { title: '📢 Tech Summit 2026 - Student Registration Open', date: 'November 10, 2026', excerpt: 'Please encourage your students to register for the annual Tech Summit...' },
    { title: '📅 Faculty Meeting - November 25', date: 'November 8, 2026', excerpt: 'All faculty members are required to attend the monthly meeting...' },
    { title: '🎓 Graduation Ceremony - December 15', date: 'November 5, 2026', excerpt: 'Please confirm your availability for the graduation ceremony...' },
  ];

  // Attendance
  const attendanceStats = [
    { number: '48', label: 'Total Students' },
    { number: '44', label: 'Present Today' },
    { number: '92%', label: 'Attendance Rate' },
  ];

  const attendanceList = [
    { name: 'Amara Okonkwo', programme: 'Entrepreneurship', status: 'Present' },
    { name: 'Tunde Ogunleye', programme: 'Technology', status: 'Present' },
    { name: 'Zainab Ibrahim', programme: 'AI & Data Science', status: 'Absent' },
    { name: 'Kofi Mensah', programme: 'Business Management', status: 'Present' },
  ];

  // Grades
  const grades = [
    { name: 'Amara Okonkwo', programme: 'Entrepreneurship • Final Exam', grade: '85%' },
    { name: 'Tunde Ogunleye', programme: 'Technology • Midterm Exam', grade: '78%' },
    { name: 'Zainab Ibrahim', programme: 'AI & Data Science • Midterm Exam', grade: '92%' },
    { name: 'Kofi Mensah', programme: 'Business Management • Final Exam', grade: '88%' },
    { name: 'Ngozi Eze', programme: 'Technology • Final Project', grade: '95%' },
  ];

  // File upload handler
  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const fileNames = Array.from(files).map(f => f.name).join(', ');
      showToastNotification(`📁 Uploaded: ${fileNames}`);
      e.target.value = '';
    }
  };

  // Delete material handler
  const deleteMaterial = (index) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      // In a real app, you would delete from the server here
      showToastNotification('✅ Material deleted successfully!');
    }
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
                </div>
              ))}
            </div>

            <div className="content-grid">
              <div className="content-card" data-aos="fade-right">
                <div className="card-header">
                  <h3>My Courses</h3>
                  <a onClick={() => navigateTo('courses')}>View All</a>
                </div>
                {courses.map((course, index) => (
                  <div className="course-item" key={index}>
                    <div className="course-icon"><i className={course.icon}></i></div>
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <p>{course.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="content-card" data-aos="fade-left">
                  <div className="card-header">
                    <h3>Recent Student Activity</h3>
                    <a onClick={() => navigateTo('students')}>View All</a>
                  </div>
                  {studentActivity.map((item, index) => (
                    <div className="student-item" key={index}>
                      <div className="student-avatar"><i className="fas fa-user"></i></div>
                      <div className="student-info">
                        <h4>{item.name}</h4>
                        <p>{item.activity}</p>
                      </div>
                      <div className={`student-grade ${item.gradeType === 'present' ? 'present' : item.gradeType === 'absent' ? 'absent' : ''}`}>
                        {item.grade}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="content-card" data-aos="fade-left" data-aos-delay="100" style={{ marginTop: '20px' }}>
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
          </>
        );

      case 'courses':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>My Courses</h3>
              <a onClick={() => navigateTo('upload')}>Add New Course</a>
            </div>
            {courseDetails.map((course, index) => (
              <div className="course-detail-item" key={index}>
                <div className="course-detail-info">
                  <h4>{course.title}</h4>
                  <p>{course.info}</p>
                </div>
                <span className={`course-detail-status ${getCourseDetailStatusClass(course.status)}`}>
                  {course.status}
                </span>
              </div>
            ))}
          </div>
        );

      case 'upload':
        return (
          <>
            <div className="content-card" style={{ marginBottom: '20px' }}>
              <div className="card-header">
                <h3>Upload Course Materials</h3>
              </div>
              <div className="upload-area" onClick={() => document.getElementById('fileUpload').click()}>
                <i className="fas fa-cloud-upload-alt"></i>
                <h4>Click to Upload</h4>
                <p>Drag and drop files here or click to browse</p>
                <input 
                  type="file" 
                  id="fileUpload" 
                  style={{ display: 'none' }} 
                  multiple 
                  onChange={handleFileUpload} 
                />
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <h3>Uploaded Materials</h3>
              </div>
              <div className="material-list">
                {uploadedMaterials.map((material, index) => (
                  <div className="material-item" key={index}>
                    <div className="material-icon"><i className={material.icon}></i></div>
                    <div className="material-info">
                      <h4>{material.title}</h4>
                      <p>{material.info}</p>
                    </div>
                    <div className="material-actions">
                      <button className="btn-edit" onClick={() => showToastNotification('Edit mode opened!')}>Edit</button>
                      <button className="btn-delete" onClick={() => deleteMaterial(index)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case 'students':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>All Students</h3>
              <a href="#" onClick={() => showToastNotification('Student list exported!')}>Export List</a>
            </div>
            {students.map((student, index) => (
              <div className="student-list-item" key={index}>
                <div className="student-info">
                  <div className="avatar-sm"><i className="fas fa-user"></i></div>
                  <div>
                    <h4>{student.name}</h4>
                    <p>{student.id} • {student.programme}</p>
                  </div>
                </div>
                <span style={{ fontSize: '0.85rem', opacity: '0.6' }}>{student.status}</span>
              </div>
            ))}
          </div>
        );

      case 'assignments':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Assignments</h3>
              <a onClick={() => showToastNotification('Create new assignment form opened!')}>+ Create New</a>
            </div>
            {assignments.map((assignment, index) => (
              <div className="assignment-item" key={index}>
                <div className="assignment-info">
                  <h4>{assignment.title}</h4>
                  <p>{assignment.info}</p>
                </div>
                <span className={`assignment-status ${getAssignmentStatusClass(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>
            ))}
          </div>
        );

      case 'profile':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>My Profile</h3>
              <a onClick={() => showToastNotification('Profile updated successfully!')}>Save Changes</a>
            </div>
            <div className="profile-header-card">
              <div className="profile-avatar-large"><i className="fas fa-chalkboard-teacher"></i></div>
              <div className="profile-info-large">
                <h3>Prof. Chidi Okonkwo</h3>
                <p>Staff ID: LEC-2024-001</p>
                <p><i className="fas fa-envelope"></i> chidi.okonkwo@sia.edu</p>
                <p><i className="fas fa-phone"></i> +234 800 123 4567</p>
              </div>
            </div>
            <div className="profile-details-grid">
              <div>
                <label>Department</label>
                <p>Computer Science & Engineering</p>
              </div>
              <div>
                <label>Specialization</label>
                <p>Artificial Intelligence, Data Science</p>
              </div>
              <div>
                <label>Years of Experience</label>
                <p>15 years</p>
              </div>
              <div>
                <label>Office Hours</label>
                <p>Mon/Wed 2:00 PM - 4:00 PM</p>
              </div>
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Announcements</h3>
              <a onClick={() => showToastNotification('New announcement form opened!')}>+ Post Announcement</a>
            </div>
            {announcements.map((announcement, index) => (
              <div className="announcement-item" key={index}>
                <div className="announcement-title">{announcement.title}</div>
                <div className="announcement-date">{announcement.date}</div>
                <div className="announcement-excerpt">{announcement.excerpt}</div>
              </div>
            ))}
          </div>
        );

      case 'attendance':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Attendance Summary</h3>
              <a onClick={() => showToastNotification('Attendance marked successfully!')}>Mark Today's Attendance</a>
            </div>
            <div className="attendance-summary">
              {attendanceStats.map((stat, index) => (
                <div className="attendance-stat" key={index}>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px' }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Today's Attendance</h4>
              {attendanceList.map((student, index) => (
                <div className="student-list-item" key={index}>
                  <div className="student-info">
                    <div className="avatar-sm"><i className="fas fa-user"></i></div>
                    <div>
                      <h4>{student.name}</h4>
                      <p>{student.programme}</p>
                    </div>
                  </div>
                  <span className={`student-grade ${student.status === 'Present' ? 'present' : 'absent'}`}>
                    {student.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grades':
        return (
          <div className="content-card">
            <div className="card-header">
              <h3>Grade Management</h3>
              <a onClick={() => showToastNotification('Grade entry form opened!')}>Enter Grades</a>
            </div>
            {grades.map((grade, index) => (
              <div className="grade-item" key={index}>
                <div className="grade-info">
                  <h4>{grade.name}</h4>
                  <p>{grade.programme}</p>
                </div>
                <div className="grade-value">{grade.grade}</div>
              </div>
            ))}
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
          <span>Lecturer Portal</span>
        </div>

        <div className="user-info">
          <div className="avatar"><i className="fas fa-chalkboard-teacher"></i></div>
          <h4>Prof. Chidi Okonkwo</h4>
          <p>Staff ID: LEC-2024-001</p>
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
              <p>{pageSubtitles[activeSection] || 'Welcome back, Prof. Okonkwo!'}</p>
            </div>
          </div>
          <div className="top-actions">
            <div className="notification">
              <i className="fas fa-bell"></i>
              <span className="badge">5</span>
            </div>
            <div className="user-profile">
              <div className="avatar-small"><i className="fas fa-chalkboard-teacher"></i></div>
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

export default LecturerDashboard;