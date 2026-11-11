import React from 'react';
import {
  UmLogo,
  IconArrowRight,
  IconDoor,
  IconBook,
  IconClock,
  IconMapPin,
  IconUser,
  IconBuilding
} from './icons/Icons';

export default function ScreenOnboarding({ onGetStarted }) {
  return (
    <div className="screen-onboarding">
      {/* Top Section: UM Logo, Title, Subtitle */}
      <div className="onboarding-top">
        <div className="onboarding-logo-wrap">
          <UmLogo size={56} />
          <span className="onboarding-pill">University of Mindanao</span>
        </div>
        <h1 className="onboarding-title">
          Welcome to <span className="highlight-text">UM Room Finder</span>
        </h1>
        <p className="onboarding-subtitle">
          Find your room, subject, and schedule in seconds
        </p>
      </div>

      {/* Center Section: Campus Building & Orbiting Feature Bubbles */}
      <div className="onboarding-center">
        <div className="orbit-system">
          {/* Subtle concentric rings */}
          <div className="orbit-ring ring-outer"></div>
          <div className="orbit-ring ring-middle"></div>
          <div className="orbit-ring ring-inner"></div>

          {/* Central Campus Building Card */}
          <div className="center-campus-card">
            <div className="campus-badge">CAMPUS V1</div>
            <div className="campus-icon-wrap">
              <IconBuilding size={36} className="campus-building-svg" />
            </div>
            <div className="campus-card-text">
              <span className="campus-code">DAVAO MATINA</span>
              <span className="campus-desc">Smart Indoor Directory</span>
            </div>
            <div className="campus-card-glow"></div>
          </div>

          {/* 5 Orbiting Icon Bubbles */}
          <div className="orbit-bubble bubble-top-left" title="Room Finder">
            <IconDoor size={18} />
          </div>
          <div className="orbit-bubble bubble-top-right" title="Class Subject">
            <IconBook size={18} />
          </div>
          <div className="orbit-bubble bubble-bottom-left" title="Class Timetable">
            <IconClock size={18} />
          </div>
          <div className="orbit-bubble bubble-bottom-right" title="Campus Map & Pin">
            <IconMapPin size={18} />
          </div>
          <div className="orbit-bubble bubble-top-center" title="Instructor Info">
            <IconUser size={18} />
          </div>
        </div>
      </div>

      {/* Bottom Section: Maroon CTA with Gold Arrow */}
      <div className="onboarding-bottom">
        <button
          type="button"
          className="btn-get-started"
          onClick={onGetStarted}
          aria-label="Get Started with UM Room Finder"
        >
          <span>Get Started</span>
          <div className="gold-arrow-circle">
            <IconArrowRight size={18} />
          </div>
        </button>
        <p className="onboarding-footer-note">
          Designed for freshmen & campus visitors • Offline ready
        </p>
      </div>
    </div>
  );
}

