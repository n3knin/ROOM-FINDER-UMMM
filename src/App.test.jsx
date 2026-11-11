import { describe, it, expect } from 'vitest';
import { ROOMS, BUILDINGS, calculateRoomAvailability, timeToMinutes } from './data/mockData';

describe('Room Finder Data & Business Logic', () => {
  it('loads sample buildings and rooms across 3 buildings', () => {
    expect(BUILDINGS.length).toBe(3);
    expect(ROOMS.length).toBeGreaterThanOrEqual(12);

    // Verify all 3 building IDs are represented
    const buildingIds = new Set(ROOMS.map((r) => r.buildingId));
    expect(buildingIds.has('BLDG-A')).toBe(true);
    expect(buildingIds.has('BLDG-B')).toBe(true);
    expect(buildingIds.has('BLDG-C')).toBe(true);
  });

  it('correctly converts HH:mm time string to minutes', () => {
    expect(timeToMinutes('08:30')).toBe(510);
    expect(timeToMinutes('00:00')).toBe(0);
    expect(timeToMinutes('12:00')).toBe(720);
    expect(timeToMinutes('23:59')).toBe(1439);
  });

  it('computes "Occupied" status when current time is during an active class', () => {
    // Room A-101 has CHEM 101 on Monday 08:30 - 10:00
    const roomA101 = ROOMS.find((r) => r.roomCode === 'A-101');
    expect(roomA101).toBeDefined();

    const result = calculateRoomAvailability(roomA101, 'Monday', '09:00');
    expect(result.status).toBe('Occupied');
    expect(result.currentClass).toBeDefined();
    expect(result.currentClass.subjectCode).toBe('CHEM 101');
  });

  it('computes "Starting Soon" status when current time is within 30 minutes of class start', () => {
    // Room A-101 has CHEM 101 on Monday 08:30 - 10:00; test at 08:15 (15 mins prior)
    const roomA101 = ROOMS.find((r) => r.roomCode === 'A-101');
    const result = calculateRoomAvailability(roomA101, 'Monday', '08:15');
    expect(result.status).toBe('Starting Soon');
    expect(result.remainingMinutes).toBe(15);
  });

  it('computes "Available" status when no classes are scheduled for the day', () => {
    const roomA101 = ROOMS.find((r) => r.roomCode === 'A-101');
    const result = calculateRoomAvailability(roomA101, 'Sunday', '10:00');
    expect(result.status).toBe('Available');
    expect(result.currentClass).toBeNull();
  });

  it('verifies that each room has required metadata and directions', () => {
    ROOMS.forEach((room) => {
      expect(room.roomCode).toBeTruthy();
      expect(room.name).toBeTruthy();
      expect(room.capacity).toBeGreaterThan(0);
      expect(room.floor).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(room.facilities)).toBe(true);
      expect(Array.isArray(room.directions)).toBe(true);
      expect(room.directions.length).toBeGreaterThan(0);
      expect(room.landmarkHint).toBeTruthy();
    });
  });
});
