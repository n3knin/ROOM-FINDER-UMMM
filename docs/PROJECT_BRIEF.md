# Project Brief: Room Finder

## 1. Problem Statement

Navigating a college campus is stressful, especially during the first few weeks of a semester. First-year students and transferees regularly struggle to locate classrooms designated by codes like `B-305` or `ENG-102`. 

While the school provides official class schedules containing subject names, professors, and room codes, there are no reliable, accessible indoor building maps. Students often wander hallways, ask strangers, or arrive late to classes.

---

## 2. Target Users

- **Primary Users**: First-year students and transferees navigating unfamiliar campus buildings for the first time.
- **Secondary Users**: Upperclassmen taking classes in buildings outside their home department, and visiting lecturers or staff.

---

## 3. Core Goals (V1)

1. **Instant, Zero-Friction Access**: Mobile-first web app that loads instantly in a phone's browser when scanning a QR code on a wall, with no mandatory app store installation.
2. **Deterministic Indoor Location**: Establish an exact "You are here" starting location by scanning physical QR code stickers placed at building entrances, stairwells, and key hallway junctions.
3. **Intuitive 2D Floor Plans**: Render clean 2D floor plans with a static, highlighted route line leading directly from the starting node to the target room.
4. **Step-by-Step Directions**: Display clear, readable text steps directly beneath the floor plan (e.g., "Walk past Room 202, turn right at the stairs").
5. **Multi-Floor Navigation**: Provide straightforward floor transitions (showing one floor at a time with a "Continue on Floor X" transition step).
6. **Robust Search**: Instant search by room code, course subject, professor name, or section code.
7. **Offline-First Functionality**: Once loaded, schedules, floor plans, and route data function seamlessly without cellular reception or Wi-Fi.
8. **Manual Start Fallback**: Enable users to select a starting point manually from a list if no QR sticker is immediately reachable.

---

## 4. Non-Goals (Strictly Out of Scope for V1)

To ensure delivery of a robust pilot, the following features are strictly **out of scope**:

- **No Room Booking or Reservations**: This is exclusively a room *finder*.
- **No Outdoor Campus Map or GPS**: Navigation is indoor-only; outside of buildings, only the building name, entrance photo, and landmark hint are shown.
- **No Live Tracking or Moving Dot**: The route line and pins are static. No real-time sensor tracking or moving blue dot.
- **No Augmented Reality (AR) or Camera Overlays**: No live camera HUD navigation.
- **No BLE Beacons or Wi-Fi Fingerprinting**: No complex or costly hardware positioning infrastructure.
- **No User Accounts or Authentication**: No login screens, passwords, or personal profiles.
- **No Admin or Professor Portals**: Data is managed via structured local JSON files.

