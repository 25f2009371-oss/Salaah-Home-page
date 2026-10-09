import React, { useState } from 'react';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  Share2,
  Clock,
  Sparkles,
  Headphones,
  Flame,
  ArrowRight,
  User
} from 'lucide-react';
import { PODCAST_EPISODES } from '../utils/mentorData';
import { playClickSound, playHoverSound } from '../utils/audio';

export const PodcastStation = () => {
  const [activeEpisode, setActiveEpisode] = useState(PODCAST_EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);

  const togglePlay = (ep) => {
    playClickSound(900);
    if (activeEpisode.id === ep.id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveEpisode(ep);
      setIsPlaying(true);
      setProgress(5);
    }
  };

  return (
    <section id="podcasts" className="podcasts-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Radio size={14} className="text-gold" />
            <span>THE SALAAH TALKSHOW // AUDIO & VIDEO PODCASTS</span>
          </div>
          <h2 className="section-title">
            TECH & CAREER <span className="title-highlight">PODCASTS</span>
          </h2>
          <p className="section-subtitle">
            Unfiltered conversations with alumni who made the leap from college halls to world-class
            tech giants, sharing roadmaps, interview hurdles, and real-world wisdom.
          </p>
        </div>

        {/* Podcast Player Hub */}
        <div className="podcast-player-hub">
          {/* Featured Active Player Unit */}
          <div className="podcast-main-player-card" onMouseEnter={playHoverSound}>
            <div className="player-top-status">
              <div className="live-broadcast-pill">
                <span className="pulse-ping"></span>
                <span>NOW BROADCASTING // EPISODE {activeEpisode.id}</span>
              </div>
              <span className="podcast-category-badge">{activeEpisode.category}</span>
            </div>

            <h3 className="player-ep-title">{activeEpisode.title}</h3>
            <div className="player-guest-row">
              <User size={15} className="text-emerald" />
              <span>Featuring {activeEpisode.guest}</span>
            </div>

            {/* Animated Cyber Waveform Visualizer */}
            <div className="waveform-container">
              {[40, 65, 85, 30, 95, 60, 45, 100, 75, 50, 90, 35, 70, 85, 60, 95, 40, 80, 55, 70, 90, 45, 60].map(
                (h, i) => (
                  <span
                    key={i}
                    className={`wave-bar ${isPlaying ? 'animating' : ''}`}
                    style={{
                      height: isPlaying ? `${h}%` : '20%',
                      animationDelay: `${i * 0.08}s`,
                    }}
                  ></span>
                )
              )}
            </div>

            {/* Scrubber Progress Bar */}
            <div className="podcast-scrubber-wrap">
              <div className="scrubber-track" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                setProgress(Math.round(clickPos * 100));
              }}>
                <div className="scrubber-fill" style={{ width: `${progress}%` }}>
                  <div className="scrubber-handle"></div>
                </div>
              </div>
              <div className="scrubber-times">
                <span>14:32</span>
                <span>{activeEpisode.duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="player-controls-row">
              <div className="player-views-count">
                <Headphones size={15} className="text-cyan" />
                <span>{activeEpisode.views}</span>
              </div>

              <button
                className="podcast-play-main-btn"
                onClick={() => togglePlay(activeEpisode)}
                title={isPlaying ? 'Pause Episode' : 'Play Episode'}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-1" />}
              </button>

              <button
                className="hud-btn-secondary"
                onClick={() => {
                  playClickSound(800);
                  alert(`Sharing link to ${activeEpisode.title}`);
                }}
              >
                <Share2 size={14} />
                <span>Share Episode</span>
              </button>
            </div>
          </div>

          {/* Playlist Column */}
          <div className="podcast-playlist-column">
            <div className="playlist-header">
              <Flame size={16} className="text-gold" />
              <span className="playlist-title">Recent Episodes Playlist</span>
            </div>

            <div className="playlist-items-stack">
              {PODCAST_EPISODES.map((ep) => {
                const isCurrent = activeEpisode.id === ep.id;
                return (
                  <div
                    key={ep.id}
                    className={`playlist-item-card ${isCurrent ? 'active' : ''}`}
                    onClick={() => togglePlay(ep)}
                    onMouseEnter={playHoverSound}
                  >
                    <button className={`playlist-play-icon ${isCurrent && isPlaying ? 'playing' : ''}`}>
                      {isCurrent && isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>

                    <div className="playlist-item-info">
                      <h4 className="playlist-item-title">{ep.title}</h4>
                      <div className="playlist-item-meta">
                        <span>{ep.guest}</span>
                        <span>•</span>
                        <span className="text-cyan">{ep.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
