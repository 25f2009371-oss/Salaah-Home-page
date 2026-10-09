import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Users,
  Layers,
  Play,
  ArrowRight,
  Radio,
  UserCheck,
  Target,
  Award,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';
import campusImg from '../assets/campus_hub.jpg';

export const HeroSection = ({ onNavigate }) => {
  const canvasRef = useRef(null);
  const [showTourModal, setShowTourModal] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Futuristic Particle Network Canvas connecting Students & Alumni Nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 55;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1,
        speedX: (Math.random() - 0.5) * 0.45,
        speedY: (Math.random() - 0.5) * 0.45,
        color: i % 4 === 0 ? '#ff5700' : i % 4 === 1 ? '#ff7a00' : i % 4 === 2 ? '#ffa726' : '#ffb703',
        alpha: Math.random() * 0.6 + 0.35,
      });
    }

    let mouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          p.x += (dx / dist) * 0.5;
          p.y += (dy / dist) * 0.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#ff7a00';
            ctx.globalAlpha = (1 - dist2 / 110) * 0.22;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const hotspots = [
    {
      id: 1,
      x: '48%',
      y: '45%',
      title: 'Central Innovation Amphitheater',
      desc: 'Main stage for alumni talk shows, coding bootcamps, and live tech workshops.'
    },
    {
      id: 2,
      x: '78%',
      y: '30%',
      title: 'Alumni Virtual Satellite Pods',
      desc: 'High-speed video breakout rooms for 1-on-1 mock interviews and resume reviews.'
    },
    {
      id: 3,
      x: '22%',
      y: '65%',
      title: 'Tech Coding Workstations',
      desc: 'Hackathon collaboration terminals equipped for DSA sprints and AI project development.'
    }
  ];

  return (
    <section id="hero" className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas-bg"></canvas>

      <div className="hero-radial-vortex"></div>
      <div className="hero-grid-lines"></div>

      <div className="hero-content-wrapper container">
        {/* Top Status Telemetry Pill */}
        <div className="hero-telemetry-pill" onMouseEnter={playHoverSound}>
          <div className="telemetry-live-dot"></div>
          <span className="telemetry-tag">ABESEC CAMPUS HUB</span>
          <span className="telemetry-divider">/</span>
          <span className="telemetry-hijri">GHAZIABAD, UP</span>
          <span className="telemetry-divider">/</span>
          <span className="telemetry-time">
            {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        {/* Main Headline */}
        <div className="hero-text-block">
          <div className="hero-badge-glow">
            <Sparkles size={14} className="text-emerald" />
            <span>THE COMMUNITY THAT AIMS BIG // SALAAH</span>
          </div>

          <h1 className="hero-main-title">
            <span className="hero-title-gradient">BRIDGING THE GAP</span>
            <br />
            <span className="hero-title-light">BETWEEN ALUMNI & STUDENTS</span>
          </h1>

          <p className="hero-subtext">
            Welcome to <strong>Salaah — The Mentor Community</strong>. We connect ambitious college
            students with accomplished alumni working at Swiggy, HCLTech, Amazon, Google, and top startups.
            Master technical skills through bootcamps, insightful podcasts, and professional mock interviews.
          </p>
        </div>

        {/* Hero CTA Action Buttons */}
        <div className="hero-cta-group">
          <button
            className="hud-btn-primary"
            onClick={() => {
              playClickSound(900);
              onNavigate('wings');
            }}
            onMouseEnter={playHoverSound}
          >
            <Layers size={18} />
            <span>Explore Wings & Depts</span>
            <ArrowRight size={16} className="btn-arrow" />
          </button>

          <button
            className="hud-btn-hologram"
            onClick={() => {
              playClickSound(850);
              onNavigate('mock-interviews');
            }}
            onMouseEnter={playHoverSound}
          >
            <UserCheck size={18} className="text-cyan" />
            <span>Book Mock Interview</span>
          </button>

          <button
            className="hud-btn-glass"
            onClick={() => {
              playClickSound(800);
              onNavigate('podcasts');
            }}
            onMouseEnter={playHoverSound}
          >
            <Radio size={16} className="text-gold" />
            <span>Listen to Podcasts</span>
          </button>

          <button
            className="hud-btn-glass"
            onClick={() => {
              playClickSound(850);
              setShowTourModal(true);
            }}
            onMouseEnter={playHoverSound}
          >
            <Play size={16} className="text-emerald" />
            <span>Virtual Hub Tour</span>
          </button>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="hero-metrics-grid">
          <div className="metric-card" onMouseEnter={playHoverSound}>
            <div className="metric-icon-wrap emerald">
              <Users size={20} />
            </div>
            <div className="metric-data">
              <div className="metric-value">500+</div>
              <div className="metric-label">Students Mentored</div>
            </div>
            <div className="metric-corner-light"></div>
          </div>

          <div className="metric-card" onMouseEnter={playHoverSound}>
            <div className="metric-icon-wrap cyan">
              <Award size={20} />
            </div>
            <div className="metric-data">
              <div className="metric-value">150+ Alumni</div>
              <div className="metric-label">Swiggy, HCLTech, Amazon, Google</div>
            </div>
            <div className="metric-corner-light"></div>
          </div>

          <div className="metric-card" onMouseEnter={playHoverSound}>
            <div className="metric-icon-wrap gold">
              <Radio size={20} />
            </div>
            <div className="metric-data">
              <div className="metric-value">45+ Episodes</div>
              <div className="metric-label">The Salaah Talkshow</div>
            </div>
            <div className="metric-corner-light"></div>
          </div>

          <div className="metric-card" onMouseEnter={playHoverSound}>
            <div className="metric-icon-wrap purple">
              <Target size={20} />
            </div>
            <div className="metric-data">
              <div className="metric-value">94%</div>
              <div className="metric-label">Placement Success Rate</div>
            </div>
            <div className="metric-corner-light"></div>
          </div>
        </div>
      </div>

      {/* Virtual Campus Hub 360 Holographic Modal */}
      {showTourModal && (
        <div className="modal-backdrop" onClick={() => setShowTourModal(false)}>
          <div className="tour-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-info">
                <span className="modal-tag">VIRTUAL CAMPUS HUB EXPERIENCE</span>
                <h3 className="modal-title">Salaah Innovation Amphitheater // ABESEC</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowTourModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="tour-image-container">
              <img src={campusImg} alt="Salaah Innovation Hub" className="tour-modal-img" />
              <div className="tour-scanline-overlay"></div>

              {hotspots.map((spot) => (
                <div
                  key={spot.id}
                  className={`tour-hotspot ${activeHotspot?.id === spot.id ? 'active' : ''}`}
                  style={{ left: spot.x, top: spot.y }}
                  onClick={() => setActiveHotspot(spot)}
                >
                  <div className="hotspot-pulse"></div>
                  <div className="hotspot-core">{spot.id}</div>

                  {activeHotspot?.id === spot.id && (
                    <div className="hotspot-tooltip">
                      <div className="tooltip-title">{spot.title}</div>
                      <div className="tooltip-desc">{spot.desc}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <div className="modal-footer-hint">
                <Sparkles size={14} className="text-emerald" />
                <span>Click glowing nodes to inspect collaborative student-alumni facilities.</span>
              </div>
              <button
                className="hud-btn-primary"
                onClick={() => {
                  setShowTourModal(false);
                  onNavigate('alumni');
                }}
              >
                <span>Explore Alumni Directory</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
