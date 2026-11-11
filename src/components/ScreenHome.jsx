import React, { useState } from 'react';
import {
  IconMenu,
  IconBell,
  IconSearch,
  IconMapPin,
  IconCalendar,
  IconNavigation,
  IconClock,
  IconDoor,
  IconComputer,
  IconChevronRight,
  IconClose,
  IconBuilding
} from './icons/Icons';
import { calculateRoomAvailability } from '../data/mockData';
import FloatingBottomNav from './FloatingBottomNav';

export default function ScreenHome({
  rooms = [],
  buildings = [],
  loading = false,
  searchQuery,
  onSearchChange,
  onSelectRoom,
  onQuickSearchBuilding,
  onViewAllRooms,
  activeTab = 'home',
  onSelectTab,
  onQuickFind
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Department quick search chips
  const departments = [
    { id: 'ALL', name: 'Show All', short: 'All', color: '#7A0019' },
    { id: 'BLDG-A', name: 'Main Bldg', short: 'MB', color: '#990000' },
    { id: 'BLDG-B', name: 'Engineering', short: 'ENG', color: '#1E3A8A' },
    { id: 'BLDG-C', name: 'IT / CCE', short: 'CCE', color: '#0F766E' },
    { id: 'NURSING', name: 'Nursing', short: 'NUR', color: '#7C3AED' },
    { id: 'BUSINESS', name: 'Business', short: 'CBA', color: '#B45309' }
  ];

  // Pick a realistic "Next Class" for the student demo
  const nextClassRoom = rooms.find((r) => r.roomCode === 'A-101') || rooms[0];
  const nextClass = nextClassRoom?.schedule?.[0] || {
    subject: 'General Chemistry 1',
    subjectCode: 'CHEM 101',
    instructor: 'Dr. Maria Santos',
    startTime: '08:30',
    endTime: '10:00'
  };

  // Live suggestions when typing in the search bar
  const searchSuggestions = searchQuery.trim()
    ? rooms
        .filter((r) => {
          const q = searchQuery.toLowerCase();
          return (
            r.roomCode.toLowerCase().includes(q) ||
            r.name.toLowerCase().includes(q) ||
            r.buildingName.toLowerCase().includes(q) ||
            (r.schedule || []).some(
              (s) =>
                s.subject.toLowerCase().includes(q) ||
                s.instructor.toLowerCase().includes(q) ||
                s.subjectCode.toLowerCase().includes(q)
            )
          );
        })
        .slice(0, 4)
    : [];

  return (
    <div className="screen">
      {/* Top Header */}
      <header className="sticky-header home-header">
        <button
          type="button"
          className="header-icon-btn"
          aria-label="Open navigation menu"
          onClick={() => alert('UM Room Finder • University of Mindanao')}
        >
          <IconMenu size={20} />
        </button>

        <div className="header-actions">
          <button
            type="button"
            className="header-icon-btn notification-btn"
            aria-label="View notifications"
          >
            <IconBell size={20} />
            <span className="notification-dot" />
          </button>

          <div className="student-avatar" title="Student Profile (UM Matina)">
            <span>UM</span>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="scroll-body">
        {/* Title & Subtitle */}
        <div className="home-greeting">
          <h2 className="screen-title">Find Your Room</h2>
          <p className="screen-subtitle">Search by room, subject, or instructor</p>
        </div>

        <div className="search-bar-container">
          <div className={`search-input-box ${isSearchFocused ? 'focused' : ''}`}>
            <IconSearch size={18} className="search-input-icon" />
            <input
              type="text"
              className="search-field"
              placeholder="Search room, subject, instructor..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              aria-label="Search rooms, subjects, or instructors"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
              >
                <IconClose size={14} />
              </button>
            )}
          </div>

          {/* Live Search Suggestions Dropdown */}
          {isSearchFocused && searchSuggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              <div className="suggestions-header">Quick Matches</div>
              {searchSuggestions.map((item) => (
                <div
                  key={item.id}
                  className="suggestion-item"
                  onMouseDown={() => {
                    onSelectRoom(item);
                    setIsSearchFocused(false);
                  }}
                >
                  <div className="suggestion-icon">
                    <IconMapPin size={16} />
                  </div>
                  <div className="suggestion-info">
                    <span className="suggestion-name">{item.roomCode} • {item.name}</span>
                    <span className="suggestion-sub">
                      {item.buildingName} • Floor {item.floor}
                    </span>
                  </div>
                  <IconChevronRight size={14} className="suggestion-arrow" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hero Card: "Your Next Class" (Maroon Gradient Fintech Style) */}
        {nextClassRoom && (
          <div className="hero-next-class-card">
            <div className="hero-card-header">
              <span className="hero-badge">YOUR NEXT CLASS</span>
              <div className="hero-countdown-pill">
                <IconClock size={12} />
                <span>starts in 25 min</span>
              </div>
            </div>

            <div className="hero-card-body">
              <div className="hero-subject-row">
                <h3 className="hero-subject-name">{nextClass.subject}</h3>
                <span className="hero-code-badge">{nextClass.subjectCode}</span>
              </div>

              <div className="hero-location-info">
                <div className="hero-room-highlight">
                  <span className="hero-room-code">{nextClassRoom.roomCode}</span>
                  <span className="hero-building-floor">
                    {nextClassRoom.buildingName} • Floor {nextClassRoom.floor}
                  </span>
                </div>
                <div className="hero-time-tag">
                  {nextClass.startTime} - {nextClass.endTime}
                </div>
              </div>
            </div>

            {/* 3 Action Buttons Inside Card */}
            <div className="hero-card-actions">
              <button
                type="button"
                className="hero-btn"
                onClick={() => onSelectRoom(nextClassRoom)}
              >
                <IconMapPin size={15} />
                <span>Locate</span>
              </button>

              <button
                type="button"
                className="hero-btn"
                onClick={() => onSelectRoom(nextClassRoom)}
              >
                <IconCalendar size={15} />
                <span>Schedule</span>
              </button>

              <button
                type="button"
                className="hero-btn highlight"
                onClick={() => onSelectRoom(nextClassRoom)}
              >
                <IconNavigation size={15} />
                <span>Directions</span>
              </button>
            </div>
          </div>
        )}

        {/* Quick Search Row (Fintech Quick Send Style) */}
        <section className="quick-search-section">
          <div className="section-header-row">
            <h4 className="section-heading">Quick Search</h4>
            <button
              type="button"
              className="section-link-btn"
              onClick={onViewAllRooms}
            >
              Show all
            </button>
          </div>

          <div className="quick-chips-scroll">
            {departments.map((dept) => (
              <button
                key={dept.id}
                type="button"
                className="dept-chip-item"
                onClick={() => onQuickSearchBuilding(dept.id)}
              >
                <div
                  className="dept-chip-circle"
                  style={{
                    backgroundColor: dept.id === 'ALL' ? 'var(--um-gold-primary)' : '#FAF7F5',
                    color: dept.id === 'ALL' ? 'var(--um-maroon-dark)' : 'var(--um-maroon-primary)',
                    border: `1.5px solid ${dept.id === 'ALL' ? 'var(--um-gold-primary)' : 'rgba(122,0,25,0.15)'}`
                  }}
                >
                  <span className="dept-chip-abbr">{dept.short}</span>
                </div>
                <span className="dept-chip-label">{dept.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Available Rooms Now List */}
        <section className="available-rooms-section">
          <div className="section-header-row">
            <h4 className="section-heading">Available Rooms Now</h4>
            <button
              type="button"
              className="section-link-btn"
              onClick={onViewAllRooms}
            >
              View all
            </button>
          </div>

          <div className="home-rooms-list">
            {rooms.slice(0, 4).map((room) => {
              const availability = calculateRoomAvailability(room, 'Monday', '09:00');
              const isAvailable = availability.status === 'Available';
              const isStartingSoon = availability.status === 'Starting Soon';

              return (
                <div
                  key={room.id}
                  className="home-room-row-card"
                  onClick={() => onSelectRoom(room)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onSelectRoom(room)}
                >
                  <div className="room-icon-block">
                    {room.type === 'Computer Lab' ? (
                      <IconComputer size={20} />
                    ) : (
                      <IconDoor size={20} />
                    )}
                  </div>

                  <div className="room-row-details">
                    <div className="room-row-title-bar">
                      <span className="room-row-code">{room.roomCode}</span>
                      <span
                        className={`status-badge ${
                          isAvailable
                            ? 'badge-available'
                            : isStartingSoon
                            ? 'badge-soon'
                            : 'badge-occupied'
                        }`}
                      >
                        {availability.status}
                      </span>
                    </div>

                    <div className="room-row-sub">
                      <span>{room.buildingName} • Fl {room.floor}</span>
                      <span className="dot-sep">•</span>
                      <span>Cap: {room.capacity}</span>
                    </div>
                  </div>

                  <div className="room-row-action">
                    <IconChevronRight size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Floating Bottom Nav */}
      <FloatingBottomNav
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onQuickFind={onQuickFind}
      />
    </div>
  );
}

