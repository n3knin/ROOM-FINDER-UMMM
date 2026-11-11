import React, { useState, useMemo } from 'react';
import {
  IconChevronLeft,
  IconFilter,
  IconDoor,
  IconComputer,
  IconMapPin,
  IconClock,
  IconUser,
  IconBook,
  IconSparkles,
  IconNavigation
} from './icons/Icons';
import { calculateRoomAvailability } from '../data/mockData';
import FloatingBottomNav from './FloatingBottomNav';

export default function ScreenRoomList({
  rooms = [],
  buildings = [],
  loading = false,
  onBack,
  onSelectRoom,
  selectedBuildingFilter = 'ALL',
  onSelectBuildingFilter,
  searchQuery = '',
  onSearchChange,
  activeTab = 'search',
  onSelectTab,
  onQuickFind
}) {
  const [roomTypeFilter, setRoomTypeFilter] = useState('ALL');
  const [floorFilter, setFloorFilter] = useState('ALL');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Available room count
  const availableCount = useMemo(() => {
    return rooms.filter((r) => calculateRoomAvailability(r, 'Monday', '09:00').status === 'Available').length;
  }, [rooms]);

  // Filtered rooms
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      // 1. Building filter
      if (selectedBuildingFilter !== 'ALL' && room.buildingId !== selectedBuildingFilter) {
        return false;
      }
      // 2. Room Type filter
      if (roomTypeFilter !== 'ALL' && room.type !== roomTypeFilter) {
        return false;
      }
      // 3. Floor filter
      if (floorFilter !== 'ALL' && String(room.floor) !== String(floorFilter)) {
        return false;
      }
      // 4. Only available
      if (onlyAvailable) {
        const avail = calculateRoomAvailability(room, 'Monday', '09:00');
        if (avail.status !== 'Available') return false;
      }
      return true;
    });
  }, [rooms, selectedBuildingFilter, roomTypeFilter, floorFilter, onlyAvailable]);

  return (
    <div className="screen">
      {/* Header */}
      <header className="sticky-header room-list-header">
        <button
          type="button"
          className="header-icon-btn"
          onClick={onBack}
          aria-label="Back to home"
        >
          <IconChevronLeft size={20} />
        </button>

        <h2 className="header-page-title">Rooms</h2>

        <button
          type="button"
          className={`header-icon-btn ${onlyAvailable ? 'active-filter' : ''}`}
          onClick={() => setOnlyAvailable(!onlyAvailable)}
          aria-label="Filter available rooms"
          title="Toggle Available Rooms Only"
        >
          <IconFilter size={18} />
        </button>
      </header>

      {/* Main Scrollable Content */}
      <div className="scroll-body">
        {/* Top Featured Card (Fintech Budget Style) */}
        <div className="budget-featured-card">
          <div className="budget-orbit-icons">
            <span className="budget-mini-bubble"><IconDoor size={14} /></span>
            <span className="budget-mini-bubble"><IconComputer size={14} /></span>
            <span className="budget-mini-bubble"><IconSparkles size={14} /></span>
            <span className="budget-mini-bubble"><IconClock size={14} /></span>
          </div>

          <h3 className="budget-card-title">Rooms Available Now</h3>
          <p className="budget-card-desc">
            {availableCount} classrooms and laboratories are currently vacant for study and review sessions.
          </p>

          <button
            type="button"
            className="budget-action-btn"
            onClick={() => setOnlyAvailable(!onlyAvailable)}
          >
            {onlyAvailable ? 'Showing Available (Clear)' : `View All (${availableCount} Vacant)`}
          </button>
        </div>

        {/* Filter Chips Row */}
        <div className="filter-chips-wrapper">
          <div className="filter-chips-scroll">
            {/* Building Chips */}
            <button
              type="button"
              className={`filter-chip ${selectedBuildingFilter === 'ALL' ? 'active' : ''}`}
              onClick={() => onSelectBuildingFilter('ALL')}
            >
              All Buildings
            </button>
            <button
              type="button"
              className={`filter-chip ${selectedBuildingFilter === 'BLDG-A' ? 'active' : ''}`}
              onClick={() => onSelectBuildingFilter('BLDG-A')}
            >
              Main Bldg
            </button>
            <button
              type="button"
              className={`filter-chip ${selectedBuildingFilter === 'BLDG-B' ? 'active' : ''}`}
              onClick={() => onSelectBuildingFilter('BLDG-B')}
            >
              Engineering
            </button>
            <button
              type="button"
              className={`filter-chip ${selectedBuildingFilter === 'BLDG-C' ? 'active' : ''}`}
              onClick={() => onSelectBuildingFilter('BLDG-C')}
            >
              Computing (IT)
            </button>

            {/* Room Type Chips */}
            <button
              type="button"
              className={`filter-chip ${roomTypeFilter === 'Lecture' ? 'active' : ''}`}
              onClick={() => setRoomTypeFilter(roomTypeFilter === 'Lecture' ? 'ALL' : 'Lecture')}
            >
              Lecture
            </button>
            <button
              type="button"
              className={`filter-chip ${roomTypeFilter === 'Computer Lab' ? 'active' : ''}`}
              onClick={() => setRoomTypeFilter(roomTypeFilter === 'Computer Lab' ? 'ALL' : 'Computer Lab')}
            >
              Computer Lab
            </button>
            <button
              type="button"
              className={`filter-chip ${roomTypeFilter === 'Laboratory' ? 'active' : ''}`}
              onClick={() => setRoomTypeFilter(roomTypeFilter === 'Laboratory' ? 'ALL' : 'Laboratory')}
            >
              Laboratory
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="list-section-header">
          <h3 className="list-section-title">Classrooms & Labs</h3>
          <span className="list-count-badge">{filteredRooms.length} found</span>
        </div>

        {/* Room Cards List */}
        <div className="room-cards-stack">
          {filteredRooms.length === 0 ? (
            <div className="empty-rooms-state">
              <IconDoor size={36} className="empty-state-icon" />
              <h4>No rooms found</h4>
              <p>Try resetting your filters to see more classrooms.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  onSelectBuildingFilter('ALL');
                  setRoomTypeFilter('ALL');
                  setFloorFilter('ALL');
                  setOnlyAvailable(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredRooms.map((room) => {
              const availability = calculateRoomAvailability(room, 'Monday', '09:00');
              const activeClass = availability.currentClass || availability.nextClass || (room.schedule && room.schedule[0]);
              const isAvailable = availability.status === 'Available';
              const isStartingSoon = availability.status === 'Starting Soon';

              return (
                <article
                  key={room.id}
                  className="room-card-fintech"
                  onClick={() => onSelectRoom(room)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => e.key === 'Enter' && onSelectRoom(room)}
                >
                  <div className="room-card-top">
                    <div className="room-card-icon-box">
                      {room.type === 'Computer Lab' ? (
                        <IconComputer size={22} />
                      ) : (
                        <IconDoor size={22} />
                      )}
                    </div>

                    <div className="room-card-header-info">
                      <div className="room-card-title-row">
                        <h4 className="room-card-name">{room.name}</h4>
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
                      <span className="room-card-location">
                        {room.buildingName} • Floor {room.floor}
                      </span>
                    </div>
                  </div>

                  {/* Class & Schedule preview */}
                  <div className="room-card-class-preview">
                    {activeClass ? (
                      <>
                        <div className="class-preview-row">
                          <span className="class-subject-name">{activeClass.subject}</span>
                          <span className="class-subject-code">{activeClass.subjectCode}</span>
                        </div>
                        <div className="class-instructor-row">
                          <span className="class-instructor-name">
                            <IconUser size={13} /> {activeClass.instructor}
                          </span>
                          <span className="class-time-tag">
                            <IconClock size={13} /> {activeClass.startTime} - {activeClass.endTime}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="class-empty-preview">
                        <span className="class-subject-name">Available for Self-Study</span>
                        <span className="class-time-tag">Open All Morning</span>
                      </div>
                    )}
                  </div>

                  {/* Maroon "View Location" Button */}
                  <div className="room-card-footer">
                    <button
                      type="button"
                      className="btn-view-location"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoom(room);
                      }}
                    >
                      <IconNavigation size={15} />
                      <span>View Location</span>
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
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

