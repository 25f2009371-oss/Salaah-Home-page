import React, { useState } from 'react';
import {
  Users,
  Award,
  Briefcase,
  GraduationCap,
  Calendar,
  Sparkles,
  ExternalLink,
  UserCheck,
  X,
  Send,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { ALUMNI_MENTORS } from '../utils/mentorData';
import { playClickSound, playHoverSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export const AlumniDirectory = () => {
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [activeMentorForBooking, setActiveMentorForBooking] = useState(null);
  const [bookingSlot, setBookingSlot] = useState({ date: 'This Saturday, 5:00 PM IST', topic: 'Resume Review & Career Strategy', studentName: '', studentEmail: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const domains = [
    { id: 'all', label: 'All Alumni Mentors' },
    { id: 'Software Engineering', label: 'Software & Backend' },
    { id: 'Cloud Architecture', label: 'Cloud & DevOps' },
    { id: 'AI / ML', label: 'AI & Data Science' },
    { id: 'Non-Tech', label: 'Product & Non-Tech' }
  ];

  const filteredAlumni =
    selectedDomain === 'all'
      ? ALUMNI_MENTORS
      : ALUMNI_MENTORS.filter((m) => m.domain.toLowerCase().includes(selectedDomain.toLowerCase()));

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    playClickSound(1000);
    setBookingSuccess(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveMentorForBooking(null);
      setBookingSlot({ date: 'This Saturday, 5:00 PM IST', topic: 'Resume Review & Career Strategy', studentName: '', studentEmail: '' });
    }, 2800);
  };

  return (
    <section id="alumni" className="alumni-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Users size={14} className="text-emerald" />
            <span>GLOBAL ALUMNI SATELLITE NETWORK</span>
          </div>
          <h2 className="section-title">
            ALUMNI <span className="title-highlight">MENTORS DIRECTORY</span>
          </h2>
          <p className="section-subtitle">
            Connect directly with verified ABESEC college alumni working at leading tech enterprises
            and high-growth startups for 1-on-1 guidance, resume reviews, and referrals.
          </p>
        </div>

        {/* Domain Filter Pills */}
        <div className="alumni-filter-tabs">
          {domains.map((d) => (
            <button
              key={d.id}
              className={`filter-btn ${selectedDomain === d.id ? 'active' : ''}`}
              onClick={() => {
                playClickSound(800);
                setSelectedDomain(d.id);
              }}
              onMouseEnter={playHoverSound}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Alumni Cards Grid */}
        <div className="alumni-cards-grid">
          {filteredAlumni.map((mentor) => (
            <div key={mentor.id} className={`alumni-mentor-card ${mentor.avatarColor}`} onMouseEnter={playHoverSound}>
              <div className="mentor-card-top">
                <div className="mentor-avatar-badge">
                  <span className="mentor-initials">
                    {mentor.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                  <span className="mentor-verified-dot" title="Verified Alum">✓</span>
                </div>

                <div className="mentor-company-badge">
                  <Briefcase size={12} />
                  <span>{mentor.company}</span>
                </div>
              </div>

              <div className="mentor-info-block">
                <h3 className="mentor-name">{mentor.name}</h3>
                <div className="mentor-role">{mentor.role}</div>
                <div className="mentor-batch">
                  <GraduationCap size={13} className="text-cyan" />
                  <span>{mentor.batch} • {mentor.domain}</span>
                </div>
              </div>

              <p className="mentor-bio">{mentor.bio}</p>

              {/* Skills tags */}
              <div className="mentor-skills-tags">
                {mentor.skills.map((s, i) => (
                  <span key={i} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="mentor-card-footer">
                <button
                  className="hud-btn-primary mini full-w"
                  onClick={() => {
                    playClickSound(900);
                    setActiveMentorForBooking(mentor);
                  }}
                >
                  <UserCheck size={14} />
                  <span>Request 1-on-1 Mentorship</span>
                </button>
              </div>

              <div className="mentor-glow-layer"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 1-on-1 Mentorship Booking Modal */}
      {activeMentorForBooking && (
        <div className="modal-backdrop" onClick={() => setActiveMentorForBooking(null)}>
          <div className="dept-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">1-ON-1 ALUMNI MENTORSHIP SESSION</span>
                <h3 className="modal-title">Book Session with {activeMentorForBooking.name}</h3>
                <span className="modal-arabic-subtitle">{activeMentorForBooking.role} @ {activeMentorForBooking.company}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveMentorForBooking(null)}>
                <X size={20} />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="enroll-success-box">
                <CheckCircle2 size={52} className="text-emerald success-bounce" />
                <h3 className="success-heading">Mentorship Slot Confirmed!</h3>
                <p className="success-desc">
                  Your request has been dispatched to <strong>{activeMentorForBooking.name}</strong>.
                  A Google Meet invitation link and calendar pass have been reserved for your session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="dept-modal-body">
                <div className="form-group">
                  <label className="form-label">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarthak Verma"
                    className="form-input"
                    value={bookingSlot.studentName}
                    onChange={(e) => setBookingSlot({ ...bookingSlot, studentName: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email for Google Meet Invite</label>
                  <input
                    type="email"
                    required
                    placeholder="sarthak@example.com"
                    className="form-input"
                    value={bookingSlot.studentEmail}
                    onChange={(e) => setBookingSlot({ ...bookingSlot, studentEmail: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Preferred Time Slot</label>
                    <select
                      className="form-select"
                      value={bookingSlot.date}
                      onChange={(e) => setBookingSlot({ ...bookingSlot, date: e.target.value })}
                    >
                      <option value="This Saturday, 5:00 PM IST">This Saturday, 5:00 PM IST</option>
                      <option value="This Sunday, 11:00 AM IST">This Sunday, 11:00 AM IST</option>
                      <option value="Next Weekday Evening (8 PM IST)">Next Weekday Evening (8 PM IST)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mentorship Objective</label>
                    <select
                      className="form-select"
                      value={bookingSlot.topic}
                      onChange={(e) => setBookingSlot({ ...bookingSlot, topic: e.target.value })}
                    >
                      <option value="Resume Review & ATS Optimization">Resume Review & ATS Optimization</option>
                      <option value="DSA & LeetCode Roadmaps">DSA & LeetCode Roadmaps</option>
                      <option value="Off-Campus Referral Strategy">Off-Campus Referral Strategy</option>
                      <option value="Mock Interview Practice">Mock Interview Practice</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="hud-btn-primary full-w mt-4">
                  <Calendar size={16} />
                  <span>Confirm Mentorship Slot</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
