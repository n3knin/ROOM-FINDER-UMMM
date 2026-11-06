# Architecture & Design Decisions Log

> **MANDATORY RULE FOR AGENTS & DEVELOPERS**:
> Never record a decision in this document on your own. You must append an entry here **only AFTER the project owner explicitly approves it** during a conversation.
> Format for each approved entry: `Date | Decision | Reason`.

---

## Decision Log

### 2026-11-06: Room Finder Scope Boundary (No Booking)
- **Decision**: The application is strictly a classroom **FINDER**. No room reservation, booking, scheduling admin, or seat claiming features will be included.
- **Reason**: The core user problem is freshmen getting lost trying to find rooms specified on existing school class schedules. Room booking is out of scope and introduces heavy scheduling conflict logic.

### 2026-11-06: 2D Floor Plan Navigation Approach
- **Decision**: Navigation will utilize clean, 2D vector floor plans (SVG) with a static highlighted route line and step-by-step text directions. No 3D models, no AR camera overlays, and no moving blue dots.
- **Reason**: 2D floor plans are lightweight, easy to draw in Figma/draw.io, run fast on all mobile browsers, and avoid the battery drain and development complexity of 3D/AR.

### 2026-11-06: Deterministic QR-Code Localization
- **Decision**: Set the user's starting point via physical QR codes placed at building entrances, stairwells, and hallway junctions (with a manual dropdown fallback).
- **Reason**: Satellite GPS does not penetrate concrete indoor buildings. BLE beacons, Wi-Fi fingerprinting, and UWB require expensive hardware, batteries, and school budget. QR codes are 100% accurate, cost \$0, and require zero hardware maintenance.

### 2026-11-06: Technology Stack — React + Vite PWA (No Backend Server)
- **Decision**: Build the application as a client-side Progressive Web App (PWA) using React + Vite, with zero backend runtime server and zero database.
- **Reason**: Students scanning a QR code need the app to open instantly in their mobile browser without downloading a large app from the App Store. Hosting a 24/7 backend server introduces maintenance costs and single points of failure. The PWA caches all static assets and operates 100% offline.

### 2026-11-06: Local JSON Data Storage
- **Decision**: Store all room, class, node, and edge data in static JSON files inside `/data`. No SQLite, PostgreSQL, or external database will be used for V1.
- **Reason**: The dataset for a campus pilot building is small (<100 KB). Reading JSON files directly in JavaScript provides sub-millisecond search and Dijkstra pathfinding, caches effortlessly offline via Service Workers, and allows any student contributor to edit data without SQL tooling.

### 2026-11-06: Pilot Building First Strategy
- **Decision**: Build and rigorously test Room Finder in one pilot building first before surveying or expanding to additional campus buildings.
- **Reason**: Validating the end-to-end data collection, SVG drawing, graph connectivity, and real-world student usability on a single building minimizes risk and prevents rework.

