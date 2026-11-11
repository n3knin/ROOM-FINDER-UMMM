import React, { useState, useEffect, useMemo } from 'react';
import ScreenOnboarding from './components/ScreenOnboarding';
import ScreenHome from './components/ScreenHome';
import ScreenRoomList from './components/ScreenRoomList';
import RoomDetailsSheet from './components/RoomDetailsSheet';
import { getRoomsApi, getBuildingsApi } from './data/mockData';

export default function App() {
  // --- Onboarding: only shown once (skipped after first visit) ---
  const [showOnboarding, setShowOnboarding] = useState(() => {
    try { return localStorage.getItem('um_seen_onboarding') !== '1'; }
    catch { return true; }
  });

  // --- Screen ---
  // 'home' | 'rooms'
  const [activeScreen, setActiveScreen] = useState('home');

  // --- Bottom Nav Tab ---
  // 'home' | 'search' | 'map' | 'schedule' | 'profile'
  const [activeTab, setActiveTab] = useState('home');

  // --- Data ---
  const [rooms, setRooms] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Search & Filter ---
  const [searchQuery, setSearchQuery] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('ALL');

  // --- Room Details Sheet ---
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Load data once on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [roomsData, buildingsData] = await Promise.all([
          getRoomsApi(),
          getBuildingsApi()
        ]);
        setRooms(roomsData);
        setBuildings(buildingsData);
      } catch (err) {
        console.error('UM Room Finder: data load failed', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered rooms (driven by searchQuery + buildingFilter)
  const filteredRooms = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return rooms.filter((room) => {
      if (buildingFilter !== 'ALL' && room.buildingId !== buildingFilter) return false;
      if (q) {
        const inRoom     = room.roomCode.toLowerCase().includes(q) || room.name.toLowerCase().includes(q);
        const inBuilding = room.buildingName.toLowerCase().includes(q);
        const inSchedule = (room.schedule || []).some(
          (s) =>
            s.subject.toLowerCase().includes(q) ||
            s.instructor.toLowerCase().includes(q) ||
            s.subjectCode.toLowerCase().includes(q)
        );
        if (!inRoom && !inBuilding && !inSchedule) return false;
      }
      return true;
    });
  }, [rooms, searchQuery, buildingFilter]);

  // --- Handlers ---
  const handleGetStarted = () => {
    try { localStorage.setItem('um_seen_onboarding', '1'); } catch {}
    setShowOnboarding(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home')   setActiveScreen('home');
    if (tab === 'search') { setActiveScreen('rooms'); }
  };

  const handleViewAllRooms = () => {
    setActiveScreen('rooms');
    setActiveTab('search');
  };

  const handleQuickSearchBuilding = (buildingId) => {
    setBuildingFilter(buildingId);
    setActiveScreen('rooms');
    setActiveTab('search');
  };

  const handleQuickFind = () => {
    setSearchQuery('');
    setBuildingFilter('ALL');
    setActiveScreen('rooms');
    setActiveTab('search');
  };

  const handleBack = () => {
    setActiveScreen('home');
    setActiveTab('home');
  };

  // === ONBOARDING ===
  if (showOnboarding) {
    return (
      <div className="app-wrapper">
        <ScreenOnboarding onGetStarted={handleGetStarted} />
      </div>
    );
  }

  // === MAIN APP ===
  return (
    <div className="app-wrapper">
      {/* HOME SCREEN */}
      {activeScreen === 'home' && (
        <ScreenHome
          rooms={rooms}
          buildings={buildings}
          loading={loading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectRoom={setSelectedRoom}
          onQuickSearchBuilding={handleQuickSearchBuilding}
          onViewAllRooms={handleViewAllRooms}
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          onQuickFind={handleQuickFind}
        />
      )}

      {/* ROOM LIST / SEARCH SCREEN */}
      {activeScreen === 'rooms' && (
        <ScreenRoomList
          rooms={filteredRooms}
          buildings={buildings}
          loading={loading}
          onBack={handleBack}
          onSelectRoom={setSelectedRoom}
          selectedBuildingFilter={buildingFilter}
          onSelectBuildingFilter={setBuildingFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeTab}
          onSelectTab={handleTabChange}
          onQuickFind={handleQuickFind}
        />
      )}

      {/* ROOM DETAILS BOTTOM SHEET (global overlay) */}
      {selectedRoom && (
        <RoomDetailsSheet
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  );
}
