# Project Roadmap & Milestones

This document tracks the phased rollout of Room Finder from initial setup to multi-building expansion.

---

## Development Milestones

### Milestone 1: Documentation & Project Foundation
- [x] Project Brief, working rules, and architectural guidelines defined (`AGENTS.md`, `CLAUDE.md`, `README.md`).
- [x] Complete feature specifications and simple acceptance criteria (`docs/FEATURES.md`).
- [x] Navigation model and technical justification documented (`docs/NAVIGATION.md`).
- [x] JSON data schemas and data collection guide established (`docs/DATA_MODEL.md`, `docs/DATA_COLLECTION.md`).
- [x] Screen wireframe descriptions logged (`docs/SCREENS.md`).
- [x] Architectural decisions recorded (`docs/DECISIONS.md`).

### Milestone 2: Sample Data for Pilot Building
- [ ] Create mock dataset for a 2-floor pilot building (`Building B`) in `/data`.
- [ ] Define room nodes, hallway corner nodes, stair nodes, and entrance nodes.
- [ ] Connect nodes with bidirectional weighted edges in `edges.json`.
- [ ] Add sample class schedules and QR code ID mappings.

### Milestone 3: Search & Room Details Implementation
- [ ] Scaffold React + Vite application.
- [ ] Implement responsive Home screen with instant live search bar.
- [ ] Implement real-time filtering by room code, subject, professor, and section code.
- [ ] Build Room Details screen showing building metadata, landmark hints, and class schedules.
- [ ] Implement dynamic Class Status Badges (*Ongoing*, *Starts soon*, *Finished*, *No class today*).

### Milestone 4: Pathfinding Graph & Text Directions
- [ ] Implement client-side Dijkstra / A* pathfinding algorithm over `nodes.json` and `edges.json`.
- [ ] Validate shortest path calculation between any two nodes on the same floor.
- [ ] Implement multi-floor pathfinding traversing stair and elevator nodes.
- [ ] Implement direction text generator (translating node transitions into readable turn-by-turn steps).

### Milestone 5: 2D Floor Plan SVG Route Visualization
- [ ] Render 2D SVG floor plans scaled cleanly for mobile viewports.
- [ ] Overlay static start pin ("You are here") and destination pin.
- [ ] Render highlighted SVG path line along calculated route coordinates.
- [ ] Implement floor switcher tabs and transition cards for multi-floor routes.

### Milestone 6: QR Code Scanner Integration
- [ ] Integrate lightweight HTML5 / mobile camera QR scanner.
- [ ] Map scanned QR payload to graph starting node via `qrLocations.json`.
- [ ] Display immediate confirmation banner (*"You are here: Building B, 2nd floor, near Stairs A"*).
- [ ] Implement manual start fallback dropdown for camera-less or damaged sticker scenarios.

### Milestone 7: Offline PWA Support
- [ ] Configure `vite-plugin-pwa` Service Worker cache.
- [ ] Cache all application code, CSS, SVG floor plans, and JSON datasets on first load.
- [ ] Test complete offline functionality by disabling mobile data and Wi-Fi.

### Milestone 8: Issue Reporting Form
- [ ] Build lightweight "Report Issue" screen.
- [ ] Capture discrepancy category (wrong schedule, moved room, damaged QR) and user notes.
- [ ] Provide submission confirmation.

### Milestone 9: Real-World Pilot Building Testing
- [ ] Survey the actual school pilot building and draw genuine floor plans in Figma/draw.io.
- [ ] Import real semester class schedules into `classes.json`.
- [ ] Print and install durable QR stickers at approved building locations.
- [ ] Perform field testing with actual first-year students and verify route accuracy.

### Milestone 10: Campus Expansion
- [ ] Survey secondary buildings.
- [ ] Incorporate additional building SVGs and graph datasets.
- [ ] Implement building switcher on home/search screen.

---

## Future Upgrades (Documented Only — Do NOT Build in V1)

These enhancements are strictly out of scope for V1 and will only be evaluated after successful pilot completion:

1. **Dead-Reckoning Step Counter**:
   - Utilize smartphone accelerometer/pedometer sensors to advance a moving dot along the pre-computed static line.
   - Use periodic QR code rescans at hallway checkpoints to correct sensor drift.
2. **Bluetooth Low Energy (BLE) Beacons**:
   - If the university administration provides hardware funding, install battery-backed BLE beacons at major junctions for automatic hands-free proximity detection.
3. **Web-Based Schedule & Room Admin Portal**:
   - Build a password-protected administrative interface allowing department secretaries to update schedules or relocate classrooms dynamically without manual JSON editing.

