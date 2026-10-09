import React, { useState, useEffect } from 'react';
import {
  Search,
  Users,
  Layers,
  Calendar,
  Sparkles,
  Radio,
  UserCheck,
  Target,
  ArrowRight,
  Command,
  Bot
} from 'lucide-react';
import { playClickSound, playHoverSound } from '../utils/audio';

export const CommandPalette = ({ isOpen, onClose, onNavigate, onOpenAI }) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commandItems = [
    { id: 'hero', title: 'Home / Quantum Campus Nexus', category: 'Navigation', icon: Command },
    { id: 'about', title: 'About Salaah & The 3 Pillars (Aim, Grow, Win)', category: 'Mission', icon: Target },
    { id: 'wings', title: 'Explore 6 Specialized Wings & Departments', category: 'Wings', icon: Layers },
    { id: 'alumni', title: 'Alumni Mentors Directory (Swiggy, Amazon, HCLTech)', category: 'Mentors', icon: Users },
    { id: 'bootcamps', title: 'Bootcamps, Hackathons & Event Passes', category: 'Events', icon: Calendar },
    { id: 'podcasts', title: 'The Salaah Talkshow & Podcasts', category: 'Media', icon: Radio },
    { id: 'mock-interviews', title: 'Book 1-on-1 Mock Interview Session', category: 'Corporate Prep', icon: UserCheck },
    { id: 'community', title: 'Student Doubt Wall & Social Channels', category: 'Community', icon: Sparkles },
    { id: 'ai', title: 'Ask Salaah AI Career Companion', category: 'AI Assistant', icon: Bot, isAI: true },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filteredItems.length || 1)) % (filteredItems.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  const handleSelect = (item) => {
    playClickSound(900);
    onClose();
    if (item.isAI) {
      onOpenAI();
    } else {
      onNavigate(item.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="command-palette-card" onClick={(e) => e.stopPropagation()}>
        <div className="command-search-bar">
          <Search size={18} className="text-emerald search-icon-left" />
          <input
            type="text"
            autoFocus
            placeholder="Search alumni, wings, bootcamps, podcasts, mock interviews..."
            className="command-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="key-badge">ESC</span>
        </div>

        <div className="command-results-list">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`command-result-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => {
                    playHoverSound();
                    setSelectedIndex(idx);
                  }}
                >
                  <div className="command-item-left">
                    <div className="command-icon-box">
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="command-item-title">{item.title}</div>
                      <div className="command-item-cat">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="command-item-arrow" />
                </div>
              );
            })
          ) : (
            <div className="command-no-results">
              <span>No commands or sections matching "{search}"</span>
            </div>
          )}
        </div>

        <div className="command-palette-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵ Enter</kbd></span>
          <span>Close with <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
};
