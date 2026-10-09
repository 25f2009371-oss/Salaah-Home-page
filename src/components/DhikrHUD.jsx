import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
  Award,
  Zap,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { playDhikrTap, playCelebrationSound, playClickSound, playHoverSound } from '../utils/audio';
import confetti from 'canvas-confetti';

const PRESETS = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'SubhanAllah',
    translation: 'Glory be to Allah',
    target: 33,
    color: 'emerald'
  },
  {
    id: 'alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'All praise is due to Allah',
    target: 33,
    color: 'cyan'
  },
  {
    id: 'allahuakbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    target: 34,
    color: 'gold'
  },
  {
    id: 'astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    target: 100,
    color: 'purple'
  },
  {
    id: 'lailahaillallah',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    translation: 'There is no deity except Allah',
    target: 100,
    color: 'emerald'
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    transliteration: 'Allahumma Salli Ala Muhammad',
    translation: 'Peace and blessings upon the Prophet',
    target: 100,
    color: 'gold'
  }
];

export const DhikrHUD = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [count, setCount] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalLifetimeDhikr, setTotalLifetimeDhikr] = useState(1420);
  const [isPressing, setIsPressing] = useState(false);
  const [showCelebrationBadge, setShowCelebrationBadge] = useState(false);

  // Load from local storage if available
  useEffect(() => {
    try {
      const savedTotal = localStorage.getItem('salaah_dhikr_total');
      if (savedTotal) setTotalLifetimeDhikr(parseInt(savedTotal, 10));
    } catch (e) {
      // Ignore
    }
  }, []);

  const handleIncrement = () => {
    playDhikrTap();
    setIsPressing(true);
    setTimeout(() => setIsPressing(false), 120);

    const nextCount = count + 1;
    const newTotal = totalLifetimeDhikr + 1;
    setTotalLifetimeDhikr(newTotal);
    try {
      localStorage.setItem('salaah_dhikr_total', String(newTotal));
    } catch (e) {}

    if (nextCount >= selectedPreset.target) {
      // Cycle target complete!
      setCount(0);
      setCompletedCycles((c) => c + 1);
      playCelebrationSound();
      setShowCelebrationBadge(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.65 }
      });
      setTimeout(() => setShowCelebrationBadge(false), 3000);
    } else {
      setCount(nextCount);
    }
  };

  const handleReset = () => {
    playClickSound(600);
    setCount(0);
  };

  const handleSelectPreset = (p) => {
    playClickSound(800);
    setSelectedPreset(p);
    setCount(0);
  };

  const progressPercent = Math.min(100, Math.round((count / selectedPreset.target) * 100));

  return (
    <section id="dhikr" className="dhikr-hud-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Sparkles size={14} className="text-gold" />
            <span>QUANTUM SPIRITUAL MINDFULNESS</span>
          </div>
          <h2 className="section-title">
            DIGITAL <span className="title-highlight">TASBIH & DHIKR HUD</span>
          </h2>
          <p className="section-subtitle">
            Calibrate your inner state through focused spiritual remembrance with tactile haptic
            feedback, customized target goals, and session telemetry.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="dhikr-presets-bar">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              className={`dhikr-preset-btn ${selectedPreset.id === p.id ? 'active' : ''}`}
              onClick={() => handleSelectPreset(p)}
              onMouseEnter={playHoverSound}
            >
              <span className="preset-ar-snippet">{p.arabic}</span>
              <span className="preset-name">{p.transliteration}</span>
              <span className="preset-target-tag">Target: {p.target}</span>
            </button>
          ))}
        </div>

        {/* Main Digital Tasbih Counter Module */}
        <div className="tasbih-device-wrapper">
          <div className="tasbih-device-frame">
            {/* Holographic Header Bar */}
            <div className="device-header">
              <div className="device-brand-meta">
                <span className="pulse-ping"></span>
                <span className="device-title">TASBIH QUANTUM HUD</span>
              </div>
              <div className="device-cycles-badge">
                <Award size={14} className="text-gold" />
                <span>Cycles Completed: {completedCycles}</span>
              </div>
            </div>

            {/* Active Dhikr Display */}
            <div className="active-dhikr-display">
              <div className="active-arabic-main">{selectedPreset.arabic}</div>
              <div className="active-translit">{selectedPreset.transliteration}</div>
              <div className="active-trans">{selectedPreset.translation}</div>
            </div>

            {/* Futuristic Circular Progress & Big Interactive Tap Center */}
            <div className="tasbih-radial-zone">
              <svg className="tasbih-radial-svg" viewBox="0 0 240 240">
                <circle cx="120" cy="120" r="100" className="tasbih-bg-circle" />
                <circle
                  cx="120"
                  cy="120"
                  r="100"
                  className="tasbih-progress-circle"
                  style={{
                    strokeDashoffset: `${628 - (628 * progressPercent) / 100}`
                  }}
                />
              </svg>

              {/* Central Tactile Button */}
              <button
                className={`tasbih-tap-button ${isPressing ? 'pressed' : ''}`}
                onClick={handleIncrement}
                title="Click or Tap to increment Dhikr"
              >
                <div className="tap-inner-glow"></div>
                <div className="tap-count-number">{count}</div>
                <div className="tap-target-sub">/ {selectedPreset.target}</div>
                <div className="tap-label-prompt">TAP TO REMEMBER</div>
              </button>
            </div>

            {/* Progress Percentage & Completion Bar */}
            <div className="tasbih-progress-bar-wrap">
              <div className="tasbih-bar-header">
                <span>GOAL PROGRESS</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="tasbih-bar-track">
                <div className="tasbih-bar-fill" style={{ width: `${progressPercent}%` }}></div>
              </div>
            </div>

            {/* Footer Control Buttons */}
            <div className="tasbih-controls-row">
              <button className="tasbih-ctrl-btn" onClick={handleReset} title="Reset current cycle">
                <RotateCcw size={15} />
                <span>Reset Cycle</span>
              </button>

              <div className="tasbih-lifetime-pill">
                <Flame size={15} className="text-gold" />
                <span>Lifetime Dhikr: {totalLifetimeDhikr.toLocaleString()}</span>
              </div>
            </div>

            {/* Celebration Badge Toast */}
            {showCelebrationBadge && (
              <div className="dhikr-celebration-toast">
                <Sparkles size={20} className="text-gold" />
                <span>Masha'Allah! Cycle completed successfully. May it be accepted!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
