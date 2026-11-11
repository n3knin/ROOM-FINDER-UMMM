import React from 'react';
import {
  IconHome,
  IconSearch,
  IconMap,
  IconCalendar,
  IconUser,
  IconCompass
} from './icons/Icons';

export default function FloatingBottomNav({ activeTab, onSelectTab, onQuickFind }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: IconHome },
    { id: 'search', label: 'Search', icon: IconSearch },
    { id: 'map', label: 'Map', icon: IconMap },
    { id: 'schedule', label: 'Schedule', icon: IconCalendar },
    { id: 'profile', label: 'Profile', icon: IconUser }
  ];

  return (
    <div className="floating-bottom-nav-container">
      <nav className="floating-bottom-nav" aria-label="Bottom Navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`nav-tab-item ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTab(tab.id)}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="nav-icon-wrapper">
                <Icon size={20} />
              </div>
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}

        {/* Round UM Gold Action Button */}
        <button
          type="button"
          className="nav-action-fab"
          onClick={onQuickFind}
          aria-label="Quick Find Room"
          title="Quick Find Room"
        >
          <IconCompass size={22} className="fab-icon" />
        </button>
      </nav>
    </div>
  );
}

