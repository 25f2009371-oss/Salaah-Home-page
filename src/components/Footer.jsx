import React, { useState } from 'react';
import {
  Sparkles,
  Users,
  Layers,
  Calendar,
  Send,
  ArrowUp,
  RotateCcw,
  CheckCircle2,
  Globe,
  Share2,
  Radio,
  UserCheck,
  ExternalLink
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const Footer = ({ onNavigate, onReplayIntro }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    playClickSound(1000);
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    playClickSound(900);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="salaah-footer">
      <div className="footer-top-accent-line"></div>

      <div className="footer-container container">
        {/* Newsletter / Bulletin */}
        <div className="footer-newsletter-card" onMouseEnter={playHoverSound}>
          <div className="newsletter-text-col">
            <div className="newsletter-badge">
              <Sparkles size={13} className="text-emerald" />
              <span>THE SALAAH CAREER DISPATCH</span>
            </div>
            <h3 className="newsletter-title">Stay Updated with Off-Campus Drives & Bootcamps</h3>
            <p className="newsletter-desc">
              Subscribe to get weekly alumni referral alerts, DSA problem breakdowns, podcast releases,
              and upcoming hackathon updates directly in your inbox.
            </p>
          </div>

          <div className="newsletter-form-col">
            {subscribed ? (
              <div className="newsletter-success">
                <CheckCircle2 size={20} className="text-emerald" />
                <span>Subscribed to Salaah Career Bulletin! Welcome aboard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter college email..."
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="hud-btn-primary">
                  <Send size={15} />
                  <span>Subscribe</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4-Column Footer Links */}
        <div className="footer-links-grid">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-emblem-badge small">
                <span>🛡️</span>
                <span className="brand-hindi-nav">|| सलाह ||</span>
              </div>
              <span className="brand-title-footer">SALAAH</span>
            </div>
            <p className="footer-brand-p">
              <strong>The Mentor Community</strong> at ABESEC Ghaziabad. We Aim, We Grow, We Win.
              Bridging the gap between ambitious students and distinguished alumni across top tech companies worldwide.
            </p>
            <div className="footer-replay-intro-wrap">
              <button className="replay-intro-footer-btn" onClick={onReplayIntro}>
                <RotateCcw size={14} />
                <span>Replay Futuristic Boot Sequence</span>
              </button>
            </div>
          </div>

          {/* Col 2: Wings & Departments */}
          <div className="footer-col">
            <h4 className="footer-col-title">Community Wings</h4>
            <ul className="footer-link-list">
              <li>
                <button onClick={() => onNavigate('wings')}>Tech & Coding Guild</button>
              </li>
              <li>
                <button onClick={() => onNavigate('wings')}>Podcasts & Media Wing</button>
              </li>
              <li>
                <button onClick={() => onNavigate('wings')}>Corporate & Mock Interviews</button>
              </li>
              <li>
                <button onClick={() => onNavigate('wings')}>Bootcamps & Event Operations</button>
              </li>
              <li>
                <button onClick={() => onNavigate('wings')}>Alumni Relations & Referrals</button>
              </li>
              <li>
                <button onClick={() => onNavigate('wings')}>Creative Design & PR</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Portals */}
          <div className="footer-col">
            <h4 className="footer-col-title">Student Portals</h4>
            <ul className="footer-link-list">
              <li>
                <button onClick={() => onNavigate('alumni')}>Alumni Mentors Directory</button>
              </li>
              <li>
                <button onClick={() => onNavigate('mock-interviews')}>Book 1-on-1 Mock Interview</button>
              </li>
              <li>
                <button onClick={() => onNavigate('bootcamps')}>30-Day DSA Bootcamp Pass</button>
              </li>
              <li>
                <button onClick={() => onNavigate('podcasts')}>The Salaah Talkshow</button>
              </li>
              <li>
                <button onClick={() => onNavigate('community')}>Student Doubt Wall</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Social & Campus */}
          <div className="footer-col">
            <h4 className="footer-col-title">Connect & Campus</h4>
            <div className="footer-telemetry-box">
              <div className="telemetry-item">
                <span className="t-key">CAMPUS:</span>
                <span className="t-val text-emerald">ABESEC Ghaziabad, UP</span>
              </div>
              <div className="telemetry-item">
                <span className="t-key">ALUMNI NETWORK:</span>
                <span className="t-val text-cyan">150+ Mentors Active</span>
              </div>
              <div className="telemetry-item">
                <span className="t-key">STATUS:</span>
                <span className="t-val text-gold">Accepting Cohort 2026</span>
              </div>
            </div>

            <div className="footer-social-links-row">
              <a
                href="https://www.instagram.com/salaah_abesec/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Instagram @salaah_abesec"
              >
                <Share2 size={15} />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/salaah-the-mentor-community/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn Salaah The Mentor Community"
              >
                <Globe size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © 2026 SALAAH — The Mentor Community (ABESEC Ghaziabad). All Rights Reserved. Built with passion by students & alumni.
          </div>

          <div className="footer-actions">
            <button className="back-to-top-btn" onClick={scrollToTop} title="Back to Top">
              <span>Return to Top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
