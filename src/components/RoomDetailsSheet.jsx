import React, { useState } from 'react';
import {
  IconClose,
  IconMapPin,
  IconClock,
  IconUser,
  IconCalendar,
  IconNavigation,
  IconCheck,
  IconDoor,
  IconComputer,
  IconBuilding
} from './icons/Icons';
import { calculateRoomAvailability } from '../data/mockData';

export default function RoomDetailsSheet({ room, onClose, onNavigateMap }) {
  const [activeTab, setActiveTab] = useState('directions'); // 'directions' | 'timetable' | 'facilities'

  if (!room) return null;

  const availability = calculateRoomAvailability(room, 'Monday', '09:00');
  const isAvailable = availability.status === 'Available';
  const isStartingSoon = availability.status === 'Starting Soon';

  // Coordinates for the gold pin on the floor plan SVG
  const pinX = room.mapCoordinates?.x || 50;
  const pinY = room.mapCoordinates?.y || 45;

  return (
    <div className="sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="sheet-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Pill Handle */}
        <div className="sheet-drag-handle-bar">
          <div className="sheet-drag-handle" />
        </div>

        {/* Header Bar */}
        <div className="sheet-header">
          <div className="sheet-title-info">
            <div className="sheet-badge-row">
              <span className="room-code-pill">{room.roomCode}</span>
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
            <h3 className="sheet-room-name">{room.name}</h3>
            <p className="sheet-location-sub">
              {room.buildingName} • Floor {room.floor} • Capacity: {room.capacity} students
            </p>
          </div>

          <button
            type="button"
            className="sheet-close-btn"
            onClick={onClose}
            aria-label="Close room details sheet"
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Interactive 2D Floor Plan Canvas with Gold Pin */}
        <div className="sheet-map-canvas-card">
          <div className="map-canvas-header">
            <span className="map-canvas-label">
              <IconBuilding size={14} /> Floor Plan (Floor {room.floor})
            </span>
            <span className="map-canvas-hint">Pinch or tap to view full map</span>
          </div>

          <div className="svg-floorplan-wrapper">
            <svg
              viewBox="0 0 100 100"
              className="floorplan-svg-visual"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Floor Plan Background & Walls */}
              <rect x="5" y="10" width="90" height="80" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              
              {/* Hallway Corridor */}
              <rect x="20" y="25" width="60" height="50" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2" />
              
              {/* Room Blocks */}
              <rect x="8" y="14" width="22" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <text x="19" y="27" fontSize="3.5" textAnchor="middle" fill="#64748B" fontWeight="600">Room 1</text>

              <rect x="36" y="14" width="28" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <text x="50" y="27" fontSize="3.5" textAnchor="middle" fill="#64748B" fontWeight="600">Room 2</text>

              <rect x="70" y="14" width="22" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <text x="81" y="27" fontSize="3.5" textAnchor="middle" fill="#64748B" fontWeight="600">Stairs</text>

              <rect x="8" y="62" width="24" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <text x="20" y="75" fontSize="3.5" textAnchor="middle" fill="#64748B" fontWeight="600">Lab A</text>

              <rect x="38" y="62" width="24" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <text x="50" y="75" fontSize="3.5" textAnchor="middle" fill="#64748B" fontWeight="600">Lab B</text>

              <rect x="68" y="62" width="24" height="24" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
              <text x="80" y="75" fontSize="3.5" textAnchor="middle" fill="#64748B" fontWeight="600">Exit</text>

              {/* Entrance Gate */}
              <circle cx="50" cy="88" r="3.5" fill="#16A34A" />
              <text x="50" y="96" fontSize="3.5" textAnchor="middle" fill="#16A34A" fontWeight="700">Entrance</text>

              {/* Static Dashed Navigation Route Line */}
              <path
                d={`M 50 85 L 50 50 L ${pinX} 50 L ${pinX} ${pinY + 4}`}
                fill="none"
                stroke="#7A0019"
                strokeWidth="1.8"
                strokeDasharray="3 2"
                strokeLinecap="round"
              />

              {/* Highlighted UM Gold Pin on the Room */}
              <g transform={`translate(${pinX}, ${pinY})`}>
                {/* Pulsing ring animation */}
                <circle cx="0" cy="0" r="7" fill="#FFC20E" opacity="0.4" className="pin-pulse" />
                <circle cx="0" cy="0" r="4.5" fill="#FFC20E" stroke="#7A0019" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="2" fill="#7A0019" />
              </g>
            </svg>
          </div>

          <div className="map-landmark-hint">
            <IconMapPin size={14} className="landmark-icon" />
            <span><strong>Landmark:</strong> {room.landmarkHint}</span>
          </div>
        </div>

        {/* Tab Switcher: Directions / Timetable / Facilities */}
        <div className="sheet-subtabs">
          <button
            type="button"
            className={`sheet-tab-btn ${activeTab === 'directions' ? 'active' : ''}`}
            onClick={() => setActiveTab('directions')}
          >
            Directions
          </button>
          <button
            type="button"
            className={`sheet-tab-btn ${activeTab === 'timetable' ? 'active' : ''}`}
            onClick={() => setActiveTab('timetable')}
          >
            Timetable ({room.schedule?.length || 0})
          </button>
          <button
            type="button"
            className={`sheet-tab-btn ${activeTab === 'facilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('facilities')}
          >
            Facilities
          </button>
        </div>

        {/* Tab 1: Step-by-Step Directions */}
        {activeTab === 'directions' && (
          <div className="sheet-tab-pane">
            <h4 className="pane-section-title">Step-by-Step Route</h4>
            <div className="step-directions-list">
              {room.directions.map((step, idx) => (
                <div key={idx} className="direction-step-item">
                  <div className="step-number-circle">{idx + 1}</div>
                  <div className="step-text-content">
                    <p className="step-instruction">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Weekly Timetable */}
        {activeTab === 'timetable' && (
          <div className="sheet-tab-pane">
            <h4 className="pane-section-title">Weekly Schedule</h4>
            {room.schedule && room.schedule.length > 0 ? (
              <div className="schedule-cards-list">
                {room.schedule.map((sch) => (
                  <div key={sch.id} className="schedule-row-item">
                    <div className="schedule-day-box">
                      <span className="sch-day-abbr">{sch.day.slice(0, 3)}</span>
                      <span className="sch-time-span">{sch.startTime}</span>
                    </div>

                    <div className="schedule-details-box">
                      <div className="sch-subject-title">{sch.subject}</div>
                      <div className="sch-instructor-line">
                        <IconUser size={13} /> {sch.instructor} • <span className="sch-code-tag">{sch.subjectCode}</span>
                      </div>
                      <div className="sch-duration-text">
                        <IconClock size={12} /> {sch.startTime} - {sch.endTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-schedule-note">No scheduled classes found for this room.</p>
            )}
          </div>
        )}

        {/* Tab 3: Facilities */}
        {activeTab === 'facilities' && (
          <div className="sheet-tab-pane">
            <h4 className="pane-section-title">Available Amenities</h4>
            <div className="facilities-chips-grid">
              {room.facilities.map((fac, idx) => (
                <div key={idx} className="facility-chip-badge">
                  <IconCheck size={14} className="facility-check-icon" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

