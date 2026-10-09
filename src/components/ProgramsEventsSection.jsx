import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Download,
  CheckCircle2,
  X,
  ArrowRight,
  Ticket,
  Radio,
  CalendarCheck
} from 'lucide-react';
import { UPCOMING_BOOTCAMPS_EVENTS } from '../utils/mentorData';
import { playClickSound, playHoverSound, playCelebrationSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import campusImg from '../assets/campus_hub.jpg';

export const ProgramsEventsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedEventForRSVP, setSelectedEventForRSVP] = useState(null);
  const [rsvpStep, setRsvpStep] = useState(1);
  const [attendee, setAttendee] = useState({ name: '', email: '', collegeId: '', branch: 'CSE' });
  const [generatedPassId, setGeneratedPassId] = useState('');

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'bootcamp', label: 'Bootcamps' },
    { id: 'mock-interview', label: 'Mock Drives' },
    { id: 'hackathon', label: 'Hackathons' },
    { id: 'podcast', label: 'Live Podcasts' }
  ];

  const filteredEvents =
    activeCategory === 'all'
      ? UPCOMING_BOOTCAMPS_EVENTS
      : UPCOMING_BOOTCAMPS_EVENTS.filter((e) => e.category === activeCategory);

  const handleOpenRSVP = (evt) => {
    playClickSound(850);
    setSelectedEventForRSVP(evt);
    setRsvpStep(1);
  };

  const handleGeneratePass = (e) => {
    e.preventDefault();
    playClickSound(1000);
    playCelebrationSound();

    const randomPass = 'SLH-ABES-' + Math.floor(10000 + Math.random() * 90000);
    setGeneratedPassId(randomPass);
    setRsvpStep(2);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#00f5a0', '#00d2ff', '#ffd166', '#a855f7']
    });
  };

  const handleDownloadCalendar = () => {
    playClickSound(900);
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Salaah The Mentor Community//EN\nBEGIN:VEVENT\nSUMMARY:${selectedEventForRSVP?.title}\nDESCRIPTION:${selectedEventForRSVP?.summary}\nLOCATION:${selectedEventForRSVP?.location}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${selectedEventForRSVP?.id || 'salaah-event'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="bootcamps" className="programs-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Calendar className="text-emerald" size={14} />
            <span>LEARN • BUILD • CONQUER</span>
          </div>
          <h2 className="section-title">
            BOOTCAMPS & <span className="title-highlight">EVENTS</span>
          </h2>
          <p className="section-subtitle">
            Participate in intensive technical bootcamps, college hackathons, alumni-led masterclasses,
            and grand mock interview placement drives.
          </p>
        </div>

        {/* Featured Flagship Bootcamp Banner */}
        <div className="summit-featured-card" onMouseEnter={playHoverSound}>
          <div className="summit-image-column">
            <img src={campusImg} alt="Salaah DSA Bootcamp" className="summit-img" />
            <div className="summit-overlay-scan"></div>
            <div className="summit-live-stream-badge">
              <Radio size={12} className="stream-ping" />
              <span>HYBRID / ONLINE DISCORD</span>
            </div>
          </div>

          <div className="summit-content-column">
            <div className="summit-badge">
              <Sparkles size={13} className="text-gold" />
              <span>FLAGSHIP 2026 COHORT</span>
            </div>

            <h3 className="summit-title">
              30-Day Ultimate DSA & Placement Sprint 2026
            </h3>

            <p className="summit-desc">
              Curated by alumni SDEs from Swiggy, Amazon, and HCLTech. Master the most repeated
              interview patterns (Two Pointers, Sliding Window, DP, Trees & Graphs) with personalized
              doubt clearance and mock tests.
            </p>

            <div className="summit-meta-row">
              <div className="meta-pill">
                <Calendar size={14} className="text-cyan" />
                <span>Starts October 28, 2026</span>
              </div>
              <div className="meta-pill">
                <MapPin size={14} className="text-emerald" />
                <span>ABESEC Audi-2 & Discord</span>
              </div>
              <div className="meta-pill">
                <Users size={14} className="text-gold" />
                <span>32 Seats Left</span>
              </div>
            </div>

            <div className="summit-cta-row">
              <button
                className="hud-btn-primary"
                onClick={() => handleOpenRSVP(UPCOMING_BOOTCAMPS_EVENTS[0])}
              >
                <Ticket size={16} />
                <span>Claim Free Student Delegate Pass</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="event-filters-row">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter-btn ${activeCategory === c.id ? 'active' : ''}`}
              onClick={() => {
                playClickSound(800);
                setActiveCategory(c.id);
              }}
              onMouseEnter={playHoverSound}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="events-catalog-grid">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="event-catalog-card" onMouseEnter={playHoverSound}>
              <div className="event-card-header">
                <span className="event-tag-badge">{evt.badge}</span>
                <span className="event-category-pill">{evt.category}</span>
              </div>

              <h4 className="event-card-title">{evt.title}</h4>
              <p className="event-card-summary">{evt.summary}</p>

              <div className="event-details-list">
                <div className="detail-item">
                  <Calendar size={14} className="text-cyan" />
                  <span>{evt.date}</span>
                </div>
                <div className="detail-item">
                  <Clock size={14} className="text-emerald" />
                  <span>{evt.time}</span>
                </div>
                <div className="detail-item">
                  <MapPin size={14} className="text-gold" />
                  <span>{evt.location}</span>
                </div>
              </div>

              <div className="event-card-footer">
                <span className="seats-indicator">
                  <CheckCircle2 size={13} className="text-emerald" />
                  {evt.seatsLeft}
                </span>

                <button
                  className="event-rsvp-btn"
                  onClick={() => handleOpenRSVP(evt)}
                >
                  <Ticket size={14} />
                  <span>Get Pass</span>
                </button>
              </div>

              <div className="card-border-glow"></div>
            </div>
          ))}
        </div>
      </div>

      {/* RSVP Modal & Holographic Delegate Pass */}
      {selectedEventForRSVP && (
        <div className="modal-backdrop" onClick={() => setSelectedEventForRSVP(null)}>
          <div className="rsvp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">OFFICIAL DELEGATE PASS REGISTRATION</span>
                <h3 className="modal-title">{selectedEventForRSVP.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setSelectedEventForRSVP(null)}>
                <X size={20} />
              </button>
            </div>

            {rsvpStep === 1 ? (
              <form onSubmit={handleGeneratePass} className="rsvp-form">
                <div className="form-group">
                  <label className="form-label">Student Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanmay Bhatnagar"
                    className="form-input"
                    value={attendee.name}
                    onChange={(e) => setAttendee({ ...attendee, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email for Digital Pass Dispatch</label>
                  <input
                    type="email"
                    required
                    placeholder="tanmay@example.com"
                    className="form-input"
                    value={attendee.email}
                    onChange={(e) => setAttendee({ ...attendee, email: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">College Roll / Student ID</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2100320100..."
                      className="form-input"
                      value={attendee.collegeId}
                      onChange={(e) => setAttendee({ ...attendee, collegeId: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Branch & Year</label>
                    <select
                      className="form-select"
                      value={attendee.branch}
                      onChange={(e) => setAttendee({ ...attendee, branch: e.target.value })}
                    >
                      <option value="CSE">CSE (Computer Science)</option>
                      <option value="IT">IT (Info Tech)</option>
                      <option value="ECE">ECE</option>
                      <option value="Other">Other Branch</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="hud-btn-primary full-w mt-4">
                  <Sparkles size={16} />
                  <span>Mint Holographic Pass & Confirm RSVP</span>
                </button>
              </form>
            ) : (
              /* Step 2: Holographic Ticket Pass */
              <div className="holo-pass-container">
                <div className="holo-ticket-card">
                  <div className="holo-shimmer-layer"></div>

                  <div className="ticket-top">
                    <div className="ticket-brand">
                      <span className="brand-logo-txt">|| सलाह || THE MENTOR COMMUNITY</span>
                      <span className="ticket-verified-badge">✓ ABESEC PASS</span>
                    </div>
                    <div className="ticket-pass-id">{generatedPassId}</div>
                  </div>

                  <div className="ticket-event-name">{selectedEventForRSVP.title}</div>

                  <div className="ticket-details-grid">
                    <div className="t-detail">
                      <span className="t-lbl">DELEGATE NAME</span>
                      <span className="t-val">{attendee.name || 'Registered Student'}</span>
                    </div>
                    <div className="t-detail">
                      <span className="t-lbl">BRANCH / ID</span>
                      <span className="t-val text-emerald">{attendee.branch} • {attendee.collegeId || 'STUDENT'}</span>
                    </div>
                    <div className="t-detail">
                      <span className="t-lbl">DATE & TIME</span>
                      <span className="t-val">{selectedEventForRSVP.date}</span>
                    </div>
                    <div className="t-detail">
                      <span className="t-lbl">VENUE / ACCESS</span>
                      <span className="t-val">{selectedEventForRSVP.location}</span>
                    </div>
                  </div>

                  <div className="ticket-bottom">
                    <div className="ticket-qr-zone">
                      <svg viewBox="0 0 80 80" className="ticket-qr-svg">
                        <rect x="0" y="0" width="80" height="80" fill="#070b14" rx="6" />
                        <rect x="8" y="8" width="22" height="22" fill="#00f5a0" />
                        <rect x="12" y="12" width="14" height="14" fill="#070b14" />
                        <rect x="16" y="16" width="6" height="6" fill="#00f5a0" />
                        <rect x="50" y="8" width="22" height="22" fill="#00f5a0" />
                        <rect x="54" y="12" width="14" height="14" fill="#070b14" />
                        <rect x="58" y="16" width="6" height="6" fill="#00f5a0" />
                        <rect x="8" y="50" width="22" height="22" fill="#00f5a0" />
                        <rect x="12" y="54" width="14" height="14" fill="#070b14" />
                        <rect x="16" y="58" width="6" height="6" fill="#00f5a0" />
                        <rect x="36" y="12" width="8" height="8" fill="#00d2ff" />
                        <rect x="36" y="28" width="8" height="8" fill="#00d2ff" />
                        <rect x="50" y="38" width="12" height="8" fill="#ffd166" />
                        <rect x="42" y="60" width="24" height="8" fill="#00f5a0" />
                      </svg>
                      <span className="qr-scan-label">SCAN FOR ENTRY</span>
                    </div>

                    <div className="ticket-barcode-zone">
                      <div className="barcode-lines"></div>
                      <span className="barcode-number">{generatedPassId}-2026</span>
                    </div>
                  </div>
                </div>

                <div className="pass-actions-row">
                  <button className="hud-btn-primary" onClick={handleDownloadCalendar}>
                    <CalendarCheck size={16} />
                    <span>Add to Calendar (.ICS)</span>
                  </button>
                  <button
                    className="hud-btn-glass"
                    onClick={() => {
                      playClickSound(800);
                      alert(`Pass ${generatedPassId} successfully saved!`);
                    }}
                  >
                    <Download size={16} />
                    <span>Save Pass Offline</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
