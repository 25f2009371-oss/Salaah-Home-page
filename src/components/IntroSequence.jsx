import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Volume2, VolumeX, Shield, Users, Award } from 'lucide-react';
import { playBootChime, playClickSound, isSoundEnabled, setSoundEnabled } from '../utils/audio';

export const IntroSequence = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [audioActive, setAudioActive] = useState(isSoundEnabled());
  const [isExiting, setIsExiting] = useState(false);

  const logs = [
    "INITIALIZING SALAAH MENTOR MATRIX v4.0...",
    "ESTABLISHING SECURE UPLINK TO ALUMNI NETWORK [HCLTech, Swiggy, Amazon, Google, Microsoft]...",
    "SYNCHRONIZING ABESEC STUDENT CAREER VECTORS & ROSTERS...",
    "CALIBRATING 6 COMMUNITY WINGS & PODCAST STUDIO NODES...",
    "BRIDGING THE GAP: WE AIM • WE GROW • WE WIN...",
    "PORTAL READY. WELCOME TO SALAAH: THE MENTOR COMMUNITY."
  ];

  useEffect(() => {
    if (audioActive) {
      playBootChime();
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleComplete();
          }, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  const handleComplete = () => {
    setIsExiting(true);
    playClickSound(1000);
    setTimeout(() => {
      onComplete();
    }, 850);
  };

  const toggleSound = () => {
    const next = !audioActive;
    setAudioActive(next);
    setSoundEnabled(next);
    if (next) playBootChime();
  };

  return (
    <div className={`intro-overlay ${isExiting ? 'intro-exit' : ''}`}>
      {/* Background Cyber Grid */}
      <div className="intro-bg-grid"></div>
      <div className="intro-radial-glow"></div>
      <div className="intro-scanline"></div>

      {/* Top Controls */}
      <div className="intro-topbar">
        <button className="intro-btn-ghost" onClick={toggleSound} title="Toggle Audio FX">
          {audioActive ? <Volume2 size={16} className="text-emerald" /> : <VolumeX size={16} />}
          <span>{audioActive ? 'AUDIO SYNTH: ON' : 'AUDIO: MUTED'}</span>
        </button>

        <button className="intro-btn-skip" onClick={handleComplete}>
          <span>SKIP BOOT SEQUENCE</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Main Holographic Center */}
      <div className="intro-center-matrix">
        <div className="hologram-stage">
          <div className="hologram-outer-ring ring-spin-slow"></div>
          <div className="hologram-mid-ring ring-spin-reverse"></div>
          <div className="hologram-radar-sweep"></div>

          {/* Hindi Calligraphy & Shield Emblem */}
          <div className="rub-el-hizb-wrapper">
            <div className="salaah-hindi-emblem">
              <span className="hindi-bracket">||</span>
              <span className="hindi-calligraphy-text">सलाह</span>
              <span className="hindi-bracket">||</span>
            </div>
          </div>

          <div className="hologram-particles">
            <span className="p-dot dot-1"></span>
            <span className="p-dot dot-2"></span>
            <span className="p-dot dot-3"></span>
            <span className="p-dot dot-4"></span>
          </div>
        </div>

        {/* Branding */}
        <div className="intro-branding">
          <div className="intro-badge">
            <Sparkles size={12} className="badge-sparkle" />
            <span>ABESEC GHAZIABAD • THE MENTOR COMMUNITY</span>
          </div>
          <h1 className="intro-title">
            <span className="title-highlight">SALAAH</span>
            <span className="title-sub">NEXUS</span>
          </h1>
          <p className="intro-tagline-text">THE COMMUNITY THAT AIMS BIG</p>
        </div>

        {/* Telemetry Terminal */}
        <div className="intro-terminal">
          <div className="terminal-header">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
            <span className="terminal-title">ALUMNI_MENTOR_MATRIX // STREAM_ONLINE</span>
          </div>
          <div className="terminal-body">
            <div className="terminal-log-active">
              <span className="term-prompt">&gt;</span>
              <span className="term-text">{logs[logIndex]}</span>
              <span className="term-cursor">_</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="intro-progress-zone">
          <div className="progress-info">
            <span className="progress-label">SYNCHRONIZING MENTOR MATRIX</span>
            <span className="progress-value">{progress}%</span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}>
              <div className="progress-glow-head"></div>
            </div>
          </div>
        </div>

        {progress === 100 && (
          <button className="intro-enter-btn" onClick={handleComplete}>
            <span>ENTER SALAAH COMMUNITY</span>
            <ArrowRight size={18} />
          </button>
        )}
      </div>

      {/* Cyber Corners */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
    </div>
  );
};
