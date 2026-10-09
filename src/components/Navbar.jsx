import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Users,
  Radio,
  BookOpen,
  Calendar,
  Layers,
  Search,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Bot,
  Menu,
  X,
  RotateCcw,
  UserCheck,
  Target,
  GraduationCap
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const Navbar = ({
  theme,
  toggleTheme,
  soundActive,
  toggleSound,
  onOpenAI,
  onOpenCommand,
  onReplayIntro,
  activeSection,
  onNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'About & Pillars', icon: Target },
    { id: 'wings', label: 'Wings / Depts', icon: Layers },
    { id: 'alumni', label: 'Alumni Mentors', icon: Users },
    { id: 'bootcamps', label: 'Bootcamps & Events', icon: Calendar },
    { id: 'podcasts', label: 'Podcasts', icon: Radio },
    { id: 'mock-interviews', label: 'Mock Prep', icon: UserCheck },
    { id: 'community', label: 'Community Wall', icon: Sparkles },
  ];

  const handleLinkClick = (id) => {
    playClickSound(850);
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`salaah-navbar ${isScrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-container">
          {/* Brand Logo with Hindi Calligraphy */}
          <div className="nav-brand" onClick={() => handleLinkClick('hero')} onMouseEnter={playHoverSound}>
            <div className="brand-emblem-badge">
              <span className="brand-crest-shield">🛡️</span>
              <span className="brand-hindi-nav">|| सलाह ||</span>
            </div>
            <div className="brand-meta">
              <span className="brand-name">SALAAH</span>
              <span className="brand-tag">THE MENTOR COMMUNITY</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={playHoverSound}
                >
                  <Icon size={14} className="nav-link-icon" />
                  <span>{link.label}</span>
                  {isActive && <span className="nav-link-active-dot"></span>}
                </button>
              );
            })}
          </div>

          {/* Quick Action Ticker & Controls */}
          <div className="nav-actions">
            {/* Live Next Bootcamp Ticker */}
            <button
              className="nav-prayer-ticker"
              onClick={() => handleLinkClick('bootcamps')}
              title="Next Upcoming Bootcamp"
            >
              <div className="ticker-pulse-dot"></div>
              <span className="ticker-text">
                <span className="ticker-name">Next:</span>
                <span className="ticker-time">30-Day DSA (Oct 28)</span>
              </span>
            </button>

            {/* Command Palette */}
            <button
              className="hud-icon-btn"
              onClick={() => {
                playClickSound(900);
                onOpenCommand();
              }}
              title="Quick Command Palette (Ctrl+K)"
            >
              <Search size={16} />
              <span className="key-hint">⌘K</span>
            </button>

            {/* AI Career Companion */}
            <button
              className="hud-ai-btn"
              onClick={() => {
                playClickSound(950);
                onOpenAI();
              }}
              title="Ask Salaah AI Mentor Companion"
            >
              <Bot size={15} className="ai-spin-icon" />
              <span className="hud-ai-label">Salaah AI</span>
              <span className="ai-online-ping"></span>
            </button>

            {/* Audio Toggle */}
            <button
              className={`hud-icon-btn ${soundActive ? 'text-emerald' : 'text-muted'}`}
              onClick={() => {
                playClickSound(700);
                toggleSound();
              }}
              title={soundActive ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Theme Toggle */}
            <button
              className="hud-icon-btn"
              onClick={() => {
                playClickSound(750);
                toggleTheme();
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={16} className="text-amber" /> : <Moon size={16} />}
            </button>

            {/* Replay Intro */}
            <button
              className="hud-icon-btn replay-btn"
              onClick={() => {
                playClickSound(600);
                onReplayIntro();
              }}
              title="Replay Futuristic Intro Animation"
            >
              <RotateCcw size={15} />
            </button>

            {/* Mobile Hamburger */}
            <button
              className="mobile-menu-toggle"
              onClick={() => {
                playClickSound(800);
                setMobileOpen(!mobileOpen);
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-meta">
                <span className="brand-name">SALAAH // MENTORS</span>
                <span className="brand-tag">ABESEC GHAZIABAD</span>
              </div>
              <button className="hud-icon-btn" onClick={() => setMobileOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="mobile-nav-list">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <button
                    key={link.id}
                    className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
                    onClick={() => handleLinkClick(link.id)}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mobile-drawer-footer">
              <button
                className="hud-ai-btn full-w"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAI();
                }}
              >
                <Bot size={16} />
                <span>Launch Salaah AI Assistant</span>
              </button>

              <div className="mobile-utility-row">
                <button className="hud-btn-secondary" onClick={toggleSound}>
                  {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  <span>{soundActive ? 'Sound On' : 'Muted'}</span>
                </button>
                <button className="hud-btn-secondary" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
