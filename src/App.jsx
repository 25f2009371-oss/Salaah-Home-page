import React, { useState, useEffect } from 'react';
import { IntroSequence } from './components/IntroSequence';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DepartmentsSection } from './components/DepartmentsSection';
import { AlumniDirectory } from './components/AlumniDirectory';
import { MockInterviewHUD } from './components/MockInterviewHUD';
import { PodcastStation } from './components/PodcastStation';
import { ProgramsEventsSection } from './components/ProgramsEventsSection';
import { CommunitySocial } from './components/CommunitySocial';
import { NurAIAssistant } from './components/NurAIAssistant';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { isSoundEnabled, setSoundEnabled, playClickSound } from './utils/audio';
import './index.css';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('salaah_theme') || 'light';
  });
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('salaah_theme', theme);
  }, [theme]);

  // Global Keyboard Shortcuts (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSound = () => {
    const next = !soundActive;
    setSoundActive(next);
    setSoundEnabled(next);
  };

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`salaah-app-wrapper theme-${theme}`}>
      {/* 1. Futuristic Intro Opening Animation */}
      {showIntro && <IntroSequence onComplete={() => setShowIntro(false)} />}

      {/* Main Experience */}
      <div className={`main-app-layout ${showIntro ? 'app-hidden-intro' : 'app-visible'}`}>
        {/* Navigation Bar */}
        <Navbar
          theme={theme}
          toggleTheme={handleToggleTheme}
          soundActive={soundActive}
          toggleSound={handleToggleSound}
          onOpenAI={() => setIsAIOpen(true)}
          onOpenCommand={() => setIsCommandOpen(true)}
          onReplayIntro={() => setShowIntro(true)}
          activeSection={activeSection}
          onNavigate={handleNavigate}
        />

        <main className="main-content">
          {/* Hero Section */}
          <HeroSection onNavigate={handleNavigate} />

          {/* About Section: Vision & The 3 Pillars (Aim, Grow, Win) */}
          <AboutSection onNavigate={handleNavigate} />

          {/* 6 Specialized Functional Wings of Salaah */}
          <DepartmentsSection />

          {/* Alumni Mentors Directory (Swiggy, HCLTech, Amazon, Google) */}
          <AlumniDirectory />

          {/* Mock Interview & Corporate Readiness Simulation Lab */}
          <MockInterviewHUD />

          {/* The Salaah Talkshow & Career Podcasts */}
          <PodcastStation />

          {/* Bootcamps, Hackathons & Holographic Student Pass Generator */}
          <ProgramsEventsSection />

          {/* Student Doubt Wall & Social Pulse (Instagram / LinkedIn) */}
          <CommunitySocial />
        </main>

        {/* Footer */}
        <Footer onNavigate={handleNavigate} onReplayIntro={() => setShowIntro(true)} />

        {/* Salaah AI Career Companion Modal */}
        <NurAIAssistant
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
          onNavigate={handleNavigate}
        />

        {/* Quick Command Palette (Ctrl+K) */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onNavigate={handleNavigate}
          onOpenAI={() => {
            setIsCommandOpen(false);
            setIsAIOpen(true);
          }}
        />

        {/* Floating Quick Action AI Launcher */}
        <button
          className="floating-nur-ai-trigger"
          onClick={() => {
            playClickSound(950);
            setIsAIOpen(true);
          }}
          title="Open Salaah AI Mentor Companion"
        >
          <div className="nur-float-ping"></div>
          <span className="nur-float-icon">✨</span>
          <span className="nur-float-label">Ask Salaah AI</span>
        </button>
      </div>
    </div>
  );
}

export default App;
