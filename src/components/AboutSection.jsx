import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Radio,
  UserCheck,
  Zap,
  GraduationCap
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const AboutSection = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabs = [
    { id: 'mission', label: 'Our Mission & Story', icon: Target },
    { id: 'pillars', label: 'The Three Pillars', icon: TrendingUp },
    { id: 'offerings', label: 'What We Organize', icon: Award },
  ];

  const pillars = [
    {
      title: 'We Aim 🎯',
      sub: 'Alumni-Student Nexus',
      desc: 'We aim to connect present college students with distinguished alumni, providing sharp, actionable guidance for their target tech and non-tech career trajectories.',
      color: 'emerald',
      icon: Target
    },
    {
      title: 'We Grow 📈',
      sub: 'Holistic Development',
      desc: 'We grow by instilling high-impact technical competencies, continuous mentoring, real-world hackathons, soft skills, and comprehensive industry readiness.',
      color: 'cyan',
      icon: TrendingUp
    },
    {
      title: 'We Win 🏆',
      sub: 'Triumph Through Grit',
      desc: 'We win through relentless self-improvement, immense dedication, and shared peer triumphs — turning off-campus rejections into dream offer letters.',
      color: 'gold',
      icon: Award
    }
  ];

  const offerings = [
    {
      num: '01',
      title: 'Skill Development Bootcamps',
      desc: 'Hands-on practical cohorts in DSA, Full-Stack Development, AI/ML, and Cloud Architecture led by alumni working in top tech companies.',
      icon: Zap,
      color: 'emerald'
    },
    {
      num: '02',
      title: 'Tech & Non-Tech Podcasts',
      desc: '"The Salaah Talkshow" — in-depth conversations exploring real placement struggles, cold emailing frameworks, and non-coding careers like Product Management.',
      icon: Radio,
      color: 'cyan'
    },
    {
      num: '03',
      title: 'Trainings & Masterclasses',
      desc: 'Specialized interactive deep dives into system design, open-source contributions, resume building, and tech stack masterclasses.',
      icon: BookOpen,
      color: 'gold'
    },
    {
      num: '04',
      title: 'Mock Interviews by Professionals',
      desc: 'Rigorous 1-on-1 simulated interviews with alumni from Swiggy, HCLTech, Amazon, and Google, featuring rubric scorecards and personalized roadmaps.',
      icon: UserCheck,
      color: 'purple'
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Target size={14} className="text-emerald" />
            <span>COMMUNITY IDENTITY & ETHOS</span>
          </div>
          <h2 className="section-title">
            ABOUT <span className="title-highlight">SALAAH COMMUNITY</span>
          </h2>
          <p className="section-subtitle">
            Born at ABESEC Ghaziabad, Salaah is dedicated to closing the gap between collegiate education
            and real-world industry demands through continuous alumni mentorship.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="about-tab-nav">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                className={`about-tab-btn ${activeTab === t.id ? 'active' : ''}`}
                onClick={() => {
                  playClickSound(800);
                  setActiveTab(t.id);
                }}
                onMouseEnter={playHoverSound}
              >
                <Icon size={16} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="about-tab-content">
          {activeTab === 'mission' && (
            <div className="tab-pane-grid">
              <div className="tab-pane-text">
                <span className="tab-pane-badge">THE VISION</span>
                <h3 className="tab-pane-title">Bridging the Gap Between Alumni & Students</h3>
                <p className="tab-pane-p">
                  College classrooms teach theory, but the modern tech industry demands real-world
                  experience, system design thinking, and interview readiness. Salaah bridges this
                  divide by mobilizing experienced college alumni into accessible, proactive mentors.
                </p>
                <ul className="tab-bullet-list">
                  <li>
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Direct referrals and 1-on-1 mentorship from alumni working at top tech firms.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Weekly live podcast episodes featuring placement and career journeys.</span>
                  </li>
                  <li>
                    <CheckCircle2 size={16} className="text-emerald" />
                    <span>Comprehensive mock interviews and personalized resume roast sessions.</span>
                  </li>
                </ul>

                <button
                  className="hud-btn-primary mt-4"
                  onClick={() => {
                    playClickSound(900);
                    onNavigate('alumni');
                  }}
                >
                  <span>Meet Our Alumni Mentors</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="tab-pane-stats-box">
                <div className="glass-telemetry-panel">
                  <div className="panel-header">
                    <span className="telemetry-live-dot"></span>
                    <span>COMMUNITY IMPACT METRICS</span>
                  </div>
                  <div className="telemetry-stat-row">
                    <span className="stat-label">Active Student Members</span>
                    <span className="stat-value text-emerald">500+</span>
                  </div>
                  <div className="telemetry-stat-row">
                    <span className="stat-label">Alumni Mentors Active</span>
                    <span className="stat-value text-cyan">150+</span>
                  </div>
                  <div className="telemetry-stat-row">
                    <span className="stat-label">Companies Represented</span>
                    <span className="stat-value text-gold">60+ Firms</span>
                  </div>
                  <div className="telemetry-stat-row">
                    <span className="stat-label">Podcasts & Masterclasses</span>
                    <span className="stat-value text-purple">45+ Sessions</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pillars' && (
            <div className="pillars-expanded-grid">
              {pillars.map((p, i) => (
                <div key={i} className={`pillar-card ${p.color}`} onMouseEnter={playHoverSound}>
                  <div className={`pillar-icon-box ${p.color}`}>
                    <p.icon size={26} />
                  </div>
                  <h4 className="pillar-title">{p.title}</h4>
                  <span className="pillar-sub">{p.sub}</span>
                  <p className="pillar-desc">{p.desc}</p>
                  <div className="pillar-glow"></div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'offerings' && (
            <div className="offerings-grid">
              {offerings.map((off, idx) => (
                <div key={idx} className={`offering-card ${off.color}`} onMouseEnter={playHoverSound}>
                  <div className="offering-top">
                    <span className="offering-num">{off.num}</span>
                    <div className={`offering-icon-wrap ${off.color}`}>
                      <off.icon size={20} />
                    </div>
                  </div>
                  <h4 className="offering-title">{off.title}</h4>
                  <p className="offering-desc">{off.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* The 4 Core Offerings Grid */}
        <div className="values-header-sub">
          <span className="sub-title-badge">WHY JOIN SALAAH?</span>
          <h3 className="values-main-heading">Four Pillars of Hands-On Learning</h3>
        </div>

        <div className="values-cards-grid">
          {offerings.map((v, i) => {
            const Icon = v.icon;
            return (
              <div key={i} className={`value-holo-card ${v.color}`} onMouseEnter={playHoverSound}>
                <div className="value-card-top">
                  <div className={`value-icon-box ${v.color}`}>
                    <Icon size={22} />
                  </div>
                  <span className="value-arabic-tag">{v.num}</span>
                </div>
                <h4 className="value-card-title">{v.title}</h4>
                <p className="value-card-desc">{v.desc}</p>
                <div className="value-card-glow"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
