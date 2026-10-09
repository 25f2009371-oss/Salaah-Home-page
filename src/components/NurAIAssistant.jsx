import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  X,
  UserCheck,
  Calendar,
  Layers,
  Sparkles,
  Radio,
  BookOpen
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const NurAIAssistant = ({ isOpen, onClose, onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'salaah-ai',
      text: "Hello! I am **Salaah AI**, your 24/7 college career and alumni mentorship assistant at ABESEC Ghaziabad. How can I assist your career journey today? You can ask about alumni referrals at Swiggy/Amazon/HCLTech, booking a mock interview, our 6 club wings, or upcoming DSA bootcamps!",
      time: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  const quickPrompts = [
    { label: '🚀 How to get an Alumni Referral?', query: 'How can I get an alumni referral for Swiggy or Amazon?' },
    { label: '🎯 Book a Mock Interview', query: 'How do mock interviews work at Salaah?' },
    { label: '💻 30-Day DSA Bootcamp Info', query: 'Tell me about the 30-Day DSA & Placement Sprint' },
    { label: '🏢 How to join Salaah Wings?', query: 'How can I apply to join the Tech or Media Wing?' }
  ];

  useEffect(() => {
    if (isOpen && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;
    playClickSound(900);

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateAIResponse(query);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'salaah-ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      playClickSound(750);
    }, 850);
  };

  const generateAIResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('referral') || q.includes('swiggy') || q.includes('amazon') || q.includes('hcltech') || q.includes('alumni')) {
      return "To request a referral from our alumni:\n1. Browse our **Alumni Mentors Directory** on the website.\n2. Click on **Request 1-on-1 Mentorship** with the alumni in your target domain (e.g. Rohit Sharma @ Swiggy or Arjun Verma @ Amazon).\n3. Prepare a crisp 1-page resume, specify the exact Job ID from the company careers page, and include your best GitHub project links!";
    }

    if (q.includes('mock') || q.includes('interview') || q.includes('prep') || q.includes('practice')) {
      return "Salaah offers comprehensive **1-on-1 Mock Interviews** across 4 tracks: DSA Problem Solving, Full-Stack SDE & System Design, Product Management, and HR/Behavioral STAR method. You can reserve your preferred weekend slot directly from the **Mock Prep** section on this page!";
    }

    if (q.includes('bootcamp') || q.includes('dsa') || q.includes('event') || q.includes('hackathon')) {
      return "Our flagship **30-Day Ultimate DSA & Placement Sprint 2026** starts on October 28! It covers Trees, DP, Graphs, and System Design with live mentor feedback. Head to the **Bootcamps & Events** section to claim your free Student Delegate Pass!";
    }

    if (q.includes('wing') || q.includes('join') || q.includes('volunteer') || q.includes('team') || q.includes('apply')) {
      return "Salaah has 6 specialized wings: **Tech & Coding Guild**, **Podcasts & Media Wing**, **Corporate Readiness & Mock Interviews**, **Bootcamps & Operations**, **Alumni Network**, and **Creative Design & PR**. Go to the **Wings / Depts** section and submit your application to join!";
    }

    if (q.includes('podcast') || q.includes('talkshow') || q.includes('episode')) {
      return "Check out **The Salaah Talkshow** in our Podcasts section! Listen to recent episodes like *'Cracking Tier-1 Product Companies from a Tier-3 College'* with Rohit Sharma (Swiggy SDE) and *'Off-Campus Hiring Playbook'* with Arjun Verma (Amazon SDE).";
    }

    return `Thanks for reaching out about "${query}". At Salaah The Mentor Community, we are dedicated to helping every ABESEC student achieve their dream career. Feel free to explore our Alumni Directory, listen to our podcasts, or book a mock interview!`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="ai-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-modal-header">
          <div className="ai-header-brand">
            <div className="ai-avatar-badge">
              <Bot size={22} className="text-emerald ai-icon-spin" />
              <span className="ai-pulse-dot"></span>
            </div>
            <div>
              <div className="ai-modal-title">Salaah AI Career Assistant</div>
              <div className="ai-modal-sub">POWERED BY SALAAH MENTOR CORPUS // ABESEC</div>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Chat Body */}
        <div className="ai-chat-body">
          {messages.map((m) => (
            <div key={m.id} className={`ai-chat-bubble-wrap ${m.sender === 'user' ? 'is-user' : 'is-nur'}`}>
              <div className="bubble-sender-row">
                <span className="sender-tag">{m.sender === 'user' ? 'YOU (STUDENT)' : 'SALAAH AI'}</span>
                <span className="bubble-time">{m.time}</span>
              </div>
              <div className="ai-bubble-content">
                <p>{m.text}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="ai-chat-bubble-wrap is-nur">
              <div className="ai-typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-text">Salaah AI is generating career roadmap...</span>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Prompts */}
        <div className="ai-quick-prompts-bar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              className="quick-prompt-btn"
              onClick={() => handleSendMessage(p.query)}
              onMouseEnter={playHoverSound}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="ai-input-bar"
        >
          <input
            type="text"
            placeholder="Ask Salaah AI about alumni referrals, mock interviews, wings, or DSA..."
            className="ai-text-input"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
          />
          <button type="submit" className="ai-send-btn" title="Send Message">
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
