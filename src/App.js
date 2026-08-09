import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Programmes from './components/Programmes';

import Admissions from './components/Admissions';
import Research from './components/Research';
import StudentLife from './components/StudentLife';
import News from './components/News';
import Contact from './components/Contact';
import Verify from './components/Verify';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';
import LecturerDashboard from './components/lecturer/LecturerDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/programmes" element={<Programmes />} />
          
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/research" element={<Research />} />
          <Route path="/student-life" element={<StudentLife />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/lecturer" element={<LecturerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;