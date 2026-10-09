import React, { useState } from 'react';
import {
  Layers,
  Code2,
  Radio,
  UserCheck,
  CalendarCheck,
  Network,
  Palette,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  Users
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import { SALAAH_WINGS } from '../utils/mentorData';
import confetti from 'canvas-confetti';
import podcastImg from '../assets/podcast_studio.jpg';

export const DepartmentsSection = () => {
  const [selectedWing, setSelectedWing] = useState(null);
  const [enrollModalWing, setEnrollModalWing] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', branch: 'CSE / IT', year: '2nd Year', motivation: '' });
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const getWingIcon = (id) => {
    switch (id) {
      case 'tech-guild':
        return <Code2 size={24} />;
      case 'podcasts-media':
        return <Radio size={24} />;
      case 'mock-corporate':
        return <UserCheck size={24} />;
      case 'events-bootcamps':
        return <CalendarCheck size={24} />;
      case 'alumni-relations':
        return <Network size={24} />;
      case 'design-pr':
        return <Palette size={24} />;
      default:
        return <Layers size={24} />;
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    playClickSound(1000);
    setEnrolledSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setEnrolledSuccess(false);
      setEnrollModalWing(null);
      setFormData({ name: '', email: '', branch: 'CSE / IT', year: '2nd Year', motivation: '' });
    }, 2500);
  };

  return (
    <section id="wings" className="departments-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Layers size={14} className="text-cyan" />
            <span>SPECIALIZED STUDENT & ALUMNI PILLARS</span>
          </div>
          <h2 className="section-title">
            COMMUNITY <span className="title-highlight">WINGS & DEPTS</span>
          </h2>
          <p className="section-subtitle">
            Explore the six specialized functional wings driving tech development, podcast productions,
            corporate mock interviews, and alumni networking at Salaah.
          </p>
        </div>

        {/* 6 Wings Grid */}
        <div className="departments-grid">
          {SALAAH_WINGS.map((wing) => {
            return (
              <div key={wing.id} className={`dept-card ${wing.color}`} onMouseEnter={playHoverSound}>
                <div className="dept-card-top">
                  <div className={`dept-icon-badge ${wing.color}`}>
                    {getWingIcon(wing.id)}
                  </div>
                  <span className="dept-arabic-mini">{wing.tagline}</span>
                </div>

                <h3 className="dept-title">{wing.title}</h3>
                <p className="dept-summary">{wing.description}</p>

                <div className="dept-stats-row">
                  {Object.entries(wing.metrics).map(([k, val]) => (
                    <div key={k} className="dept-stat-item">
                      <span className="stat-val">{val}</span>
                      <span className="stat-key">{k}</span>
                    </div>
                  ))}
                </div>

                <div className="dept-card-actions">
                  <button
                    className="dept-btn-details"
                    onClick={() => {
                      playClickSound(850);
                      setSelectedWing(wing);
                    }}
                  >
                    <span>View Initiatives & Lead</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    className="dept-btn-join"
                    onClick={() => {
                      playClickSound(900);
                      setEnrollModalWing(wing);
                    }}
                  >
                    <span>Apply for Wing</span>
                  </button>
                </div>

                <div className="dept-card-ambient-glow"></div>
              </div>
            );
          })}
        </div>

        {/* Feature Podcast Studio Spotlight Banner */}
        <div className="dept-feature-banner" onMouseEnter={playHoverSound}>
          <div className="banner-image-wrap">
            <img src={podcastImg} alt="Salaah Podcast Studio" className="banner-img" />
            <div className="banner-scanline"></div>
          </div>

          <div className="banner-content">
            <div className="banner-badge">
              <Sparkles size={14} className="text-cyan" />
              <span>MEDIA WING SPOTLIGHT</span>
            </div>
            <h3 className="banner-title">The Salaah Talkshow & Media Lab</h3>
            <p className="banner-desc">
              Our official studio produces bi-weekly video podcasts with alumni from Swiggy, HCLTech,
              Amazon, and tech startups. Learn the unvarnished truth about tech hiring, DSA strategy,
              and non-tech career pivots.
            </p>
            <div className="banner-action-row">
              <button
                className="hud-btn-primary"
                onClick={() => {
                  playClickSound(900);
                  const mediaWing = SALAAH_WINGS.find((w) => w.id === 'podcasts-media');
                  setSelectedWing(mediaWing);
                }}
              >
                <span>Explore Media Wing Roles</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wing Details Modal */}
      {selectedWing && (
        <div className="modal-backdrop" onClick={() => setSelectedWing(null)}>
          <div className="dept-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">WING DOSSIER // SALAAH 2026</span>
                <h3 className="modal-title">{selectedWing.title}</h3>
                <span className="modal-arabic-subtitle">{selectedWing.tagline}</span>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedWing(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="dept-modal-body">
              <p className="dept-modal-desc">{selectedWing.description}</p>

              {/* Leadership info */}
              <div className="dept-lead-card">
                <div className="lead-avatar">
                  <Users size={26} className="text-emerald" />
                </div>
                <div className="lead-info">
                  <span className="lead-label">WING LEADERSHIP & COORDINATORS</span>
                  <div className="lead-name">{selectedWing.lead}</div>
                </div>
              </div>

              {/* Key Initiatives */}
              <div className="initiatives-block">
                <h4 className="initiatives-title">Key Active Initiatives & Projects</h4>
                <div className="initiatives-list">
                  {selectedWing.initiatives.map((init, i) => (
                    <div key={i} className="initiative-item">
                      <CheckCircle2 size={16} className="text-cyan" />
                      <span>{init}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="modal-metrics-row">
                {Object.entries(selectedWing.metrics).map(([k, v]) => (
                  <div key={k} className="modal-metric-box">
                    <span className="box-val">{v}</span>
                    <span className="box-lbl">{k}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="hud-btn-primary full-w"
                onClick={() => {
                  const wing = selectedWing;
                  setSelectedWing(null);
                  setEnrollModalWing(wing);
                }}
              >
                <span>Apply to Volunteer / Join {selectedWing.title}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application / Join Wing Modal */}
      {enrollModalWing && (
        <div className="modal-backdrop" onClick={() => setEnrollModalWing(null)}>
          <div className="enroll-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">STUDENT MEMBER REGISTRATION // 2026</span>
                <h3 className="modal-title">Join {enrollModalWing.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setEnrollModalWing(null)}>
                <X size={20} />
              </button>
            </div>

            {enrolledSuccess ? (
              <div className="enroll-success-box">
                <CheckCircle2 size={52} className="text-emerald success-bounce" />
                <h3 className="success-heading">Application Received!</h3>
                <p className="success-desc">
                  Awesome! Your profile has been sent to the <strong>{enrollModalWing.title}</strong> leads.
                  We will reach out to you via WhatsApp / College Email for the onboarding briefing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="enroll-form">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ankit Sharma"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">College Email / Personal Email</label>
                  <input
                    type="email"
                    required
                    placeholder="ankit.21bcs@abes.ac.in"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Branch</label>
                    <select
                      className="form-select"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    >
                      <option value="CSE">CSE / CSE-Specializations</option>
                      <option value="IT">IT (Information Technology)</option>
                      <option value="ECE">ECE</option>
                      <option value="EN/ME/CE">EN / ME / Civil</option>
                      <option value="MCA/MBA">MCA / MBA</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Current Academic Year</label>
                    <select
                      className="form-select"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Pre-Final)</option>
                      <option value="4th Year">4th Year (Final Year)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Why do you want to join this wing?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your interests, past projects, or what you want to learn..."
                    className="form-textarea"
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="hud-btn-primary full-w">
                  <Send size={16} />
                  <span>Submit Application to Salaah Registry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
