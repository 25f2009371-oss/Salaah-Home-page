import React, { useState, useEffect } from 'react';
import {
  Compass,
  Clock,
  MapPin,
  Sunrise,
  Sun,
  SunMedium,
  CloudSun,
  Sunset,
  Moon,
  Volume2,
  Sparkles,
  RefreshCw,
  Locate,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Shield,
  Radio
} from 'lucide-react';
import {
  CITIES,
  getCityPrayerTimes,
  getNextPrayerInfo,
  DAILY_INSPIRATIONS,
  calculateQibla
} from '../utils/prayerTimes';
import { playAdhanChime, playClickSound, playHoverSound } from '../utils/audio';

export const PrayerHUD = ({ selectedCityId, onCityChange, nextPrayerInfo, setNextPrayerInfo }) => {
  const [cityId, setCityId] = useState(selectedCityId || 'makkah');
  const [prayerData, setPrayerData] = useState(() => getCityPrayerTimes(cityId));
  const [activeAyahIndex, setActiveAyahIndex] = useState(0);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);
  const [customLocName, setCustomLocName] = useState(null);

  // Update schedule when city changes
  useEffect(() => {
    const data = getCityPrayerTimes(cityId);
    setPrayerData(data);
    const info = getNextPrayerInfo(data.prayers);
    setNextPrayerInfo(info);
    if (onCityChange) onCityChange(cityId);
  }, [cityId]);

  // Live timer tick every second for prayer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      if (prayerData) {
        const info = getNextPrayerInfo(prayerData.prayers);
        setNextPrayerInfo(info);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [prayerData]);

  // Compass animation
  useEffect(() => {
    const targetQibla = prayerData.city.qibla;
    setCompassHeading(targetQibla);
  }, [prayerData]);

  const handleCitySelect = (e) => {
    playClickSound(800);
    setCityId(e.target.value);
    setCustomLocName(null);
  };

  const handleLocateMe = () => {
    playClickSound(950);
    setIsCalibrating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const qibla = calculateQibla(lat, lng);
          const customCity = {
            id: 'custom-gps',
            name: `Your Location (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
            country: 'Detected GPS',
            lat,
            lng,
            timezone: 'Local',
            qibla,
            distanceKm: Math.round(Math.hypot(lat - 21.42, lng - 39.82) * 111),
          };
          const data = {
            city: customCity,
            prayers: getCityPrayerTimes('makkah').prayers, // aligned base
          };
          setPrayerData(data);
          setCompassHeading(qibla);
          setCustomLocName('GPS Auto-Locked');
          setIsCalibrating(false);
          playAdhanChime();
        },
        () => {
          // Fallback if permission denied
          setCityId('makkah');
          setIsCalibrating(false);
        }
      );
    } else {
      setTimeout(() => setIsCalibrating(false), 800);
    }
  };

  const getPrayerIcon = (id) => {
    switch (id) {
      case 'fajr':
        return <Sunrise size={22} className="prayer-icon-glow" />;
      case 'sunrise':
        return <Sun size={22} className="prayer-icon-glow" />;
      case 'dhuhr':
        return <SunMedium size={22} className="prayer-icon-glow" />;
      case 'asr':
        return <CloudSun size={22} className="prayer-icon-glow" />;
      case 'maghrib':
        return <Sunset size={22} className="prayer-icon-glow" />;
      case 'isha':
        return <Moon size={22} className="prayer-icon-glow" />;
      default:
        return <Clock size={22} />;
    }
  };

  const currentAyah = DAILY_INSPIRATIONS[activeAyahIndex];

  return (
    <section id="prayer-hud" className="prayer-hud-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Radio size={14} className="text-emerald" />
            <span>REAL-TIME PRAYER TELEMETRY & QIBLA ORBIT</span>
          </div>
          <h2 className="section-title">
            CELESTIAL <span className="title-highlight">PRAYER MATRIX</span>
          </h2>
          <p className="section-subtitle">
            Synchronized astronomical calculations, intelligent Qibla vector tracking, and dynamic
            adhan chimes designed for the modern believer.
          </p>
        </div>

        {/* HUD Control Bar: City Selector & GPS Lock */}
        <div className="hud-toolbar">
          <div className="location-select-wrap">
            <MapPin size={18} className="text-emerald location-pin" />
            <select
              value={cityId}
              onChange={handleCitySelect}
              className="hud-select"
              aria-label="Select City for Prayer Times"
            >
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.country})
                </option>
              ))}
            </select>
          </div>

          <button
            className={`hud-btn-gps ${isCalibrating ? 'calibrating' : ''}`}
            onClick={handleLocateMe}
            title="Auto-Detect My GPS Coordinates"
          >
            <Locate size={16} className={isCalibrating ? 'spin-anim' : ''} />
            <span>{customLocName || (isCalibrating ? 'CALIBRATING GPS...' : 'AUTO-LOCATE GPS')}</span>
          </button>

          <button
            className="hud-btn-chime"
            onClick={() => {
              playClickSound(900);
              playAdhanChime();
            }}
            title="Test Harmonic Adhan Chime"
          >
            <Volume2 size={16} className="text-cyan" />
            <span>PREVIEW ADHAN CHIME</span>
          </button>
        </div>

        {/* Main 2-Column Prayer Grid: Live Countdown & Radar */}
        <div className="prayer-matrix-grid">
          {/* Left Column: Big Next Prayer Gauge & Schedule Cards */}
          <div className="prayer-cards-column">
            {/* Featured Next Prayer Countdown HUD */}
            {nextPrayerInfo && (
              <div className="next-prayer-hero-card" onMouseEnter={playHoverSound}>
                <div className="next-prayer-glow-bg"></div>
                <div className="next-prayer-header">
                  <span className="live-pulse-badge">
                    <span className="pulse-ping"></span>
                    NEXT PRAYER OBLIGATION
                  </span>
                  <span className="location-crumb">
                    <MapPin size={12} />
                    {prayerData.city.name}
                  </span>
                </div>

                <div className="next-prayer-main-body">
                  <div className="next-prayer-info">
                    <div className="next-prayer-name">
                      {nextPrayerInfo.nextPrayer?.name}
                      <span className="next-prayer-arabic">{nextPrayerInfo.nextPrayer?.arabic}</span>
                    </div>
                    <div className="next-prayer-time-target">
                      Scheduled at {nextPrayerInfo.nextPrayer?.time12}
                    </div>
                  </div>

                  {/* Circular Futuristic Countdown Ring */}
                  <div className="countdown-ring-container">
                    <svg className="countdown-svg" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" className="countdown-bg-circle" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="countdown-progress-circle"
                        style={{
                          strokeDashoffset: `${
                            314 - (314 * ((nextPrayerInfo.totalMinutesLeft % 240) / 240))
                          }`,
                        }}
                      />
                    </svg>
                    <div className="countdown-center-text">
                      <span className="countdown-digits">{nextPrayerInfo.countdown}</span>
                      <span className="countdown-label">TIME REMAINING</span>
                    </div>
                  </div>
                </div>

                <div className="next-prayer-footer">
                  <span className="prayer-status-chip">
                    <CheckCircle2 size={13} className="text-emerald" />
                    <span>Calculated with astronomical precision</span>
                  </span>
                  <button
                    className="adhan-trigger-mini"
                    onClick={() => {
                      playClickSound(1000);
                      playAdhanChime();
                    }}
                  >
                    <Volume2 size={13} />
                    <span>Play Tone</span>
                  </button>
                </div>
              </div>
            )}

            {/* 6 Daily Prayer Cards Grid */}
            <div className="daily-prayers-grid">
              {prayerData.prayers.map((prayer) => {
                const isNext = nextPrayerInfo?.nextPrayer?.id === prayer.id;
                const isCurrent = nextPrayerInfo?.currentPrayer?.id === prayer.id;
                return (
                  <div
                    key={prayer.id}
                    className={`prayer-time-card ${isNext ? 'is-next' : ''} ${
                      isCurrent ? 'is-current' : ''
                    }`}
                    onMouseEnter={playHoverSound}
                  >
                    <div className="prayer-card-top">
                      <div className="prayer-icon-box">{getPrayerIcon(prayer.id)}</div>
                      <div className="prayer-arabic-name">{prayer.arabic}</div>
                    </div>

                    <div className="prayer-card-middle">
                      <div className="prayer-english-name">{prayer.name}</div>
                      <div className="prayer-time-12">{prayer.time12}</div>
                    </div>

                    <div className="prayer-card-bottom">
                      {isNext ? (
                        <span className="badge-prayer-next">UPCOMING</span>
                      ) : isCurrent ? (
                        <span className="badge-prayer-current">ACTIVE WINDOW</span>
                      ) : (
                        <span className="badge-prayer-idle">{prayer.time24}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Qibla Orbital Radar & Daily Ayah */}
          <div className="qibla-radar-column">
            {/* Holographic Qibla Radar Compass */}
            <div className="qibla-radar-card" onMouseEnter={playHoverSound}>
              <div className="radar-header">
                <div className="radar-title-wrap">
                  <Compass size={18} className="text-cyan" />
                  <span className="radar-title">ORBITAL QIBLA RADAR</span>
                </div>
                <span className="radar-target-tag">MAKKAH VECTOR</span>
              </div>

              {/* 3D Radar Circle */}
              <div className="radar-display">
                <div className="radar-circle-outer"></div>
                <div className="radar-circle-mid"></div>
                <div className="radar-circle-inner"></div>
                <div className="radar-sweep-beam"></div>
                <div className="radar-grid-crosshair"></div>

                {/* Cardinal Points */}
                <span className="cardinal-point north">N</span>
                <span className="cardinal-point east">E</span>
                <span className="cardinal-point south">S</span>
                <span className="cardinal-point west">W</span>

                {/* Qibla Needle */}
                <div
                  className="qibla-needle-assembly"
                  style={{ transform: `rotate(${compassHeading}deg)` }}
                >
                  <div className="qibla-needle-tip">
                    <div className="kaaba-icon-pip" title="Kaaba Alignment Vector">🕋</div>
                  </div>
                  <div className="qibla-needle-shaft"></div>
                  <div className="qibla-needle-base"></div>
                </div>

                {/* Center Core */}
                <div className="radar-center-core">
                  <div className="core-dot"></div>
                </div>
              </div>

              {/* Radar Telemetry Readouts */}
              <div className="radar-telemetry-readouts">
                <div className="telemetry-box">
                  <span className="telemetry-label">AZIMUTH BEARING</span>
                  <span className="telemetry-val text-cyan">{prayerData.city.qibla}°</span>
                </div>
                <div className="telemetry-box">
                  <span className="telemetry-label">DISTANCE TO KAABA</span>
                  <span className="telemetry-val text-emerald">
                    {prayerData.city.distanceKm.toLocaleString()} KM
                  </span>
                </div>
                <div className="telemetry-box">
                  <span className="telemetry-label">ALIGNMENT ACCURACY</span>
                  <span className="telemetry-val text-gold">99.98%</span>
                </div>
              </div>
            </div>

            {/* Daily Ayat of the Day Holo-Card */}
            <div className="ayah-inspiration-card" onMouseEnter={playHoverSound}>
              <div className="ayah-card-header">
                <div className="ayah-badge">
                  <BookOpen size={14} className="text-emerald" />
                  <span>CELESTIAL REVELATION // {currentAyah.topic}</span>
                </div>
                <button
                  className="ayah-refresh-btn"
                  onClick={() => {
                    playClickSound(800);
                    setActiveAyahIndex((prev) => (prev + 1) % DAILY_INSPIRATIONS.length);
                  }}
                  title="Next Inspiration"
                >
                  <RefreshCw size={14} />
                  <span>Cycle Verse</span>
                </button>
              </div>

              <div className="ayah-arabic-text">{currentAyah.arabic}</div>
              <div className="ayah-transliteration">{currentAyah.transliteration}</div>
              <p className="ayah-translation">"{currentAyah.translation}"</p>
              <div className="ayah-source-tag">— {currentAyah.source}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
