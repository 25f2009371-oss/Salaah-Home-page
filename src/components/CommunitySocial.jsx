import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Heart,
  Send,
  Radio,
  ExternalLink,
  Users,
  CheckCircle2,
  Globe,
  Share2
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const CommunitySocial = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      author: 'Ayush Sharma (3rd Year CSE)',
      message: 'What are the most crucial System Design topics to cover for 6-month product company internships?',
      timestamp: '20 mins ago',
      upvotes: 48,
      category: 'System Design',
      replyCount: 3,
      topReply: 'Rohit Sharma (Swiggy): Focus on Database indexing, Caching strategies with Redis, and REST vs gRPC trade-offs.'
    },
    {
      id: 2,
      author: 'Neha Verma (2nd Year IT)',
      message: 'Can non-CSE students get off-campus referrals for SDE-1 roles? How should I structure my cold emails to alumni?',
      timestamp: '1 hour ago',
      upvotes: 82,
      category: 'Referral Strategy',
      replyCount: 5,
      topReply: 'Arjun Verma (Amazon): 100%! Always attach a clean 1-page resume, link to your best 2 deployed projects, and specify the Job ID.'
    },
    {
      id: 3,
      author: 'Prakhar Gupta (4th Year ECE)',
      message: 'Is the 30-Day DSA bootcamp suitable for someone who has just started LeetCode mediums?',
      timestamp: '3 hours ago',
      upvotes: 35,
      category: 'Bootcamp Prep',
      replyCount: 2,
      topReply: 'Vineet Pathak (Lead Mentor): Absolutely. We start with pattern recognition and progress to DP & Graphs with 1-on-1 mentor support.'
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorBranch, setAuthorBranch] = useState('3rd Year CSE');
  const [showInputForm, setShowInputForm] = useState(false);

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    playClickSound(950);

    const post = {
      id: Date.now(),
      author: `${authorName.trim() || 'Anonymous Student'} (${authorBranch})`,
      message: newQuestion.trim(),
      timestamp: 'Just now',
      upvotes: 1,
      category: 'Career & Prep',
      replyCount: 0,
      topReply: null
    };

    setQuestions([post, ...questions]);
    setNewQuestion('');
    setShowInputForm(false);
  };

  const handleUpvote = (id) => {
    playClickSound(800);
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const socialFeeds = [
    {
      platform: 'Instagram // @salaah_abesec',
      handle: 'salaah_abesec',
      url: 'https://www.instagram.com/salaah_abesec/',
      color: 'gold',
      title: 'Follow our official Instagram for daily tech reels, podcast teasers, and event announcements.',
      status: 'Active Student Hub',
      cta: 'View Instagram'
    },
    {
      platform: 'LinkedIn // Salaah The Mentor Community',
      handle: 'salaah-the-mentor-community',
      url: 'https://www.linkedin.com/company/salaah-the-mentor-community/',
      color: 'cyan',
      title: 'Connect with our official LinkedIn page to network with 150+ alumni working across top global tech firms.',
      status: 'Alumni Network',
      cta: 'View LinkedIn'
    },
    {
      platform: 'YouTube // The Salaah Talkshow',
      handle: 'SalaahPodcastHub',
      url: 'https://www.youtube.com',
      color: 'red',
      title: 'Watch full video podcast episodes, placement mock interviews, and tech masterclass recordings.',
      status: '45+ Episodes',
      cta: 'Watch Talkshow'
    }
  ];

  return (
    <section id="community" className="community-section">
      <div className="section-container container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-badge">
            <Users size={14} className="text-emerald" />
            <span>COLLEGE & ALUMNI NETWORK PULSE</span>
          </div>
          <h2 className="section-title">
            COMMUNITY <span className="title-highlight">& SOCIAL PULSE</span>
          </h2>
          <p className="section-subtitle">
            Ask career questions, get advice from verified alumni, and stay connected across our official
            Instagram and LinkedIn channels.
          </p>
        </div>

        {/* 2-Column Community Layout */}
        <div className="community-main-grid">
          {/* Left Column: Student Doubt & Mentorship Wall */}
          <div className="blessings-wall-card">
            <div className="wall-header">
              <div className="wall-title-wrap">
                <MessageSquare size={18} className="text-emerald" />
                <span className="wall-title">Student Doubt & Mentorship Wall</span>
              </div>
              <button
                className="hud-btn-primary mini"
                onClick={() => {
                  playClickSound(800);
                  setShowInputForm(!showInputForm);
                }}
              >
                <span>{showInputForm ? 'Close Form' : '+ Ask Career Question'}</span>
              </button>
            </div>

            {/* Input Form */}
            {showInputForm && (
              <form onSubmit={handleAddQuestion} className="blessing-input-form">
                <div className="form-row-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Rahul)"
                    className="form-input"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Branch / Year (e.g. 3rd Year CSE)"
                    className="form-input"
                    value={authorBranch}
                    onChange={(e) => setAuthorBranch(e.target.value)}
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="Ask a question on DSA, internships, off-campus referrals, or mock interviews..."
                  className="form-textarea"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                ></textarea>
                <button type="submit" className="hud-btn-primary full-w">
                  <Send size={14} />
                  <span>Post Question to Community Wall</span>
                </button>
              </form>
            )}

            {/* Questions list */}
            <div className="blessings-list">
              {questions.map((q) => (
                <div key={q.id} className="blessing-card" onMouseEnter={playHoverSound}>
                  <div className="blessing-card-top">
                    <span className="blessing-author">{q.author}</span>
                    <span className="blessing-time">{q.timestamp}</span>
                  </div>
                  <p className="blessing-message">"{q.message}"</p>

                  {q.topReply && (
                    <div className="mentor-reply-bubble">
                      <div className="reply-badge">
                        <CheckCircle2 size={12} className="text-emerald" />
                        <span>VERIFIED ALUMNI ANSWER:</span>
                      </div>
                      <p className="reply-text">{q.topReply}</p>
                    </div>
                  )}

                  <div className="blessing-card-bottom">
                    <span className="blessing-category-tag">{q.category}</span>
                    <button
                      className="ameen-btn"
                      onClick={() => handleUpvote(q.id)}
                      title="Upvote Question"
                    >
                      <Heart size={14} className="text-emerald" />
                      <span>Upvote ({q.upvotes})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Official Social Channels */}
          <div className="social-channels-column">
            <div className="social-header-card">
              <span className="social-tag">OFFICIAL SALAAH CHANNELS</span>
              <h3 className="social-heading">Follow The Mentor Community</h3>
            </div>

            <div className="social-cards-stack">
              {socialFeeds.map((feed, idx) => (
                <div key={idx} className={`social-feed-card ${feed.color}`} onMouseEnter={playHoverSound}>
                  <div className="social-card-head">
                    <div className="social-handle-info">
                      <span className="feed-platform">{feed.platform}</span>
                    </div>
                    <span className="feed-status-badge">{feed.status}</span>
                  </div>

                  <p className="feed-title">{feed.title}</p>

                  <a
                    href={feed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-action-btn"
                    onClick={() => playClickSound(800)}
                  >
                    <span>{feed.cta}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
