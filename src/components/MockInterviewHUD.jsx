import React, { useState } from 'react';
import {
  UserCheck,
  Code2,
  Cpu,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const MockInterviewHUD = () => {
  const [selectedTrack, setSelectedTrack] = useState('dsa');
  const [bookingModal, setBookingModal] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [studentInfo, setStudentInfo] = useState({ name: '', email: '', year: '3rd Year', resumeUrl: '' });

  const tracks = [
    {
      id: 'dsa',
      title: 'DSA & Algorithmic Problem Solving',
      companyTarget: 'FAANG / Tier-1 Product Companies',
      icon: Code2,
      color: 'emerald',
      rounds: '60 Mins Live Coding (Google Docs / CoderPad)',
      rubric: ['Problem Decomposition', 'Optimized Time/Space Complexity', 'Clean Code & Edge Cases', 'Verbal Communication'],
      interviewer: 'Alumni SDEs @ Amazon / Swiggy'
    },
    {
      id: 'fullstack',
      title: 'Full-Stack SDE & System Design',
      companyTarget: 'High-Growth Tech Startups & Enterprises',
      icon: Cpu,
      color: 'cyan',
      rounds: '45 Mins System Architecture + 45 Mins Code Review',
      rubric: ['Database Schema Design', 'API Performance & Caching', 'Microservices Scaling', 'Security Best Practices'],
      interviewer: 'Alumni Tech Leads @ Swiggy / HCLTech'
    },
    {
      id: 'product',
      title: 'Product Management & Non-Tech',
      companyTarget: 'Fintech, Consulting & Product Companies',
      icon: Briefcase,
      color: 'gold',
      rounds: '45 Mins Product Sense & Metric Estimation',
      rubric: ['User Empathy & Problem Statement', 'Metrics & North Star Definition', 'GTM Strategy', 'Structured Thinking'],
      interviewer: 'Alumni PMs & Strategy Leads'
    },
    {
      id: 'behavioral',
      title: 'HR & Behavioral STAR Method',
      companyTarget: 'All Corporate Placements & Campus Drives',
      icon: UserCheck,
      color: 'purple',
      rounds: '30 Mins Cultural Fit & Behavioral Deep Dive',
      rubric: ['STAR Framework Articulation', 'Conflict Resolution', 'Leadership & Ownership', 'Salary & Role Clarifications'],
      interviewer: 'Corporate Mentors & HR Leads'
    }
  ];

  const currentTrack = tracks.find((t) => t.id === selectedTrack) || tracks[0];

  const handleBooking = (e) => {
    e.preventDefault();
    playClickSound(1000);
    setBookedSuccess(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingModal(false);
      setStudentInfo({ name: '', email: '', year: '3rd Year', resumeUrl: '' });
    }, 2800);
  };

  return (
    <section id="mock-interviews" className="mock-hud-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <UserCheck size={14} className="text-cyan" />
            <span>REAL-WORLD INTERVIEW SIMULATION LAB</span>
          </div>
          <h2 className="section-title">
            MOCK INTERVIEWS <span className="title-highlight">& CORPORATE PREP</span>
          </h2>
          <p className="section-subtitle">
            Walk into campus and off-campus placements with zero stage fright. Experience realistic
            interview rounds with rubric scorecards and immediate feedback.
          </p>
        </div>

        {/* Track Selector Tabs */}
        <div className="mock-tracks-bar">
          {tracks.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className={`mock-track-btn ${selectedTrack === t.id ? 'active' : ''}`}
                onClick={() => {
                  playClickSound(800);
                  setSelectedTrack(t.id);
                }}
                onMouseEnter={playHoverSound}
              >
                <Icon size={16} />
                <span>{t.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Mock Console */}
        <div className="mock-console-grid">
          {/* Left: Track Dossier & Rubric */}
          <div className="mock-dossier-card" onMouseEnter={playHoverSound}>
            <div className="mock-card-header">
              <div className="mock-track-name-wrap">
                <span className="mock-target-company">{currentTrack.companyTarget}</span>
                <h3 className="mock-track-headline">{currentTrack.title}</h3>
              </div>
              <div className="mock-duration-pill">
                <Clock size={14} className="text-emerald" />
                <span>{currentTrack.rounds}</span>
              </div>
            </div>

            <div className="mock-interviewer-row">
              <span className="interviewer-lbl">EVALUATED BY:</span>
              <span className="interviewer-val text-gold">{currentTrack.interviewer}</span>
            </div>

            {/* Evaluation Rubric Grid */}
            <div className="rubric-section">
              <h4 className="rubric-heading">Key Evaluation Rubric & Parameters</h4>
              <div className="rubric-grid">
                {currentTrack.rubric.map((item, idx) => (
                  <div key={idx} className="rubric-item-box">
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mock-card-actions">
              <button
                className="hud-btn-primary full-w"
                onClick={() => {
                  playClickSound(900);
                  setBookingModal(true);
                }}
              >
                <Calendar size={16} />
                <span>Reserve Mock Interview Slot</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Right: Mock Telemetry & Success Rate Box */}
          <div className="mock-telemetry-column">
            <div className="mock-stats-panel">
              <div className="stats-panel-header">
                <ShieldCheck size={18} className="text-emerald" />
                <span>MOCK LAB PERFORMANCE METRICS</span>
              </div>

              <div className="mock-metric-row">
                <span className="m-label">Total Mocks Completed</span>
                <span className="m-val text-emerald">420+ Sessions</span>
              </div>
              <div className="mock-metric-row">
                <span className="m-label">Average Score Improvement</span>
                <span className="m-val text-cyan">+48% Post-Mock</span>
              </div>
              <div className="mock-metric-row">
                <span className="m-label">Placement Conversion Rate</span>
                <span className="m-val text-gold">94.2%</span>
              </div>
              <div className="mock-metric-row">
                <span className="m-label">Average Feedback Turnaround</span>
                <span className="m-val text-purple">&lt; 2 Hours</span>
              </div>
            </div>

            {/* Testimonial Snippet */}
            <div className="mock-testimonial-card">
              <p className="test-quote">
                "The DSA mock with Rohit bhaiya (Swiggy) helped me realize where my graph traversal
                logic was failing. Cracked my off-campus round within two weeks!"
              </p>
              <div className="test-author">
                <span className="auth-name">Kunal S. (Batch 2024)</span>
                <span className="auth-role">Now SDE @ Product Unicorn</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Slot Modal */}
      {bookingModal && (
        <div className="modal-backdrop" onClick={() => setBookingModal(false)}>
          <div className="dept-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">OFFICIAL MOCK INTERVIEW RESERVATION</span>
                <h3 className="modal-title">Book {currentTrack.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setBookingModal(false)}>
                <X size={20} />
              </button>
            </div>

            {bookedSuccess ? (
              <div className="enroll-success-box">
                <CheckCircle2 size={52} className="text-emerald success-bounce" />
                <h3 className="success-heading">Interview Slot Reserved!</h3>
                <p className="success-desc">
                  Your mock session has been locked in. An alumni mentor has been assigned, and the
                  evaluation rubric link has been dispatched to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="dept-modal-body">
                <div className="form-group">
                  <label className="form-label">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Deepali Rawat"
                    className="form-input"
                    value={studentInfo.name}
                    onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address for Meeting Invitation</label>
                  <input
                    type="email"
                    required
                    placeholder="deepali@example.com"
                    className="form-input"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resume / GitHub Profile Link (Google Drive / GitHub)</label>
                  <input
                    type="url"
                    required
                    placeholder="https://drive.google.com/... or https://github.com/..."
                    className="form-input"
                    value={studentInfo.resumeUrl}
                    onChange={(e) => setStudentInfo({ ...studentInfo, resumeUrl: e.target.value })}
                  />
                </div>

                <button type="submit" className="hud-btn-primary full-w mt-4">
                  <Calendar size={16} />
                  <span>Lock in Mock Interview Slot</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
