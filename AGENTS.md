# AGENTS.md

> **CRITICAL**: All AI agents and developers working on this project must read this file and everything in `/docs` before doing anything. Do not ask about anything that is already answered here.

---

## Project Summary

Room Finder is a mobile-first app for students, especially first-year students, who forget or don't know where their classroom is. It is a room **FINDER** only. There is **NO room booking**.

We are students building this for our own school. We already have the school's class schedules (they include building and room codes like "B-305"). We do not have reliable building maps, so we will draw simple floor plans and collect route data ourselves.

---

## WORKING RULES (apply now and put them word for word in AGENTS.md)

1. Read first. Read AGENTS.md and the /docs folder before doing anything. Do not ask about anything that is already answered there.
2. Never assume. If something is unclear or missing, STOP and ask me. Do not guess and do not decide on your own.
3. Before starting any task, show me:
   - Your understanding of the task
   - Your assumptions (a list)
   - Your proposed solution
   - Anything unclear (questions)
   Then wait for my approval before writing code or files.
4. Minimum only. Write the minimum needed for what I asked. Add nothing I did not ask for: no extra features, no extra files, no refactoring, no "improvements", no extra libraries.
5. Touch only the files the task needs. Do not edit, rename, move, or reformat any other file. If another file needs to change, ask me first.
6. If you find a way to make the code smaller or more efficient, do NOT apply it. Describe it and ask for my approval first.
7. Bugs: do NOT fix a bug on your own. Follow this order:
   a. Reproduce the bug and write a test that fails because of it.
   b. Show me the failing test and its result.
   c. Wait for my approval to fix it.
   d. After the approved fix, run the same test and show that it passes.
   If you find a bug while working on something else, report it and do not fix it.
8. Always show test results (pass or fail). Never say something works without running it.
9. Beginner-friendly: simple code, clear comments, small files.
10. Never add anything listed under "Out of scope for V1" unless I explicitly ask.
11. Record decisions in docs/DECISIONS.md only AFTER I approve them (date, decision, reason).

---

## Final Decisions (V1)

- **Navigation Approach**:
  - 2D floor plans only.
  - No GPS, no live tracking, no camera/AR, no outside campus map, no moving dot, no BLE beacons.
  - Starting position set by scanning a QR code with a location ID (e.g. `B-F2-STAIRS-A`).
  - Route line is static and drawn directly on the floor plan; pins do not move.
  - Step-by-step text directions shown below the map.
  - Multi-floor navigation displays one floor plan at a time with a floor transition step.
  - Manual start fallback if no QR code is nearby.
  - Outside the building, display only building name, entrance photo, and landmark hint.
- **Data & Buildings**:
  - Start with ONE pilot building only. Verify fully before expanding.
  - Route graph composed of nodes and edges solved via Dijkstra or A*.

---

## Out of Scope for V1

Do NOT build or add any of the following:
- Room booking / reservations
- Outside campus map / GPS
- Live indoor tracking, moving dot, or step counting
- Camera / Augmented Reality (AR) navigation
- BLE beacons or Wi-Fi positioning
- Professor / Admin dashboard or portal
- User accounts / login / authentication

---

## Tech Stack (Proposed, Needs User Approval)

- **Frontend**: React + Vite (Progressive Web App / PWA)
- **Map & Routing**: 2D SVG floor plans + client-side Dijkstra/A* pathfinding algorithm
- **Data Storage**: Local JSON files in `/data`
- **Offline Mode**: Service Worker cache
- *Status*: Pending explicit approval from the project owner. Do not install any npm packages until approved.

---

## Folder Structure

```text
ROOM FINDER/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── FEATURES.md
│   ├── NAVIGATION.md
│   ├── DATA_MODEL.md
│   ├── DATA_COLLECTION.md
│   ├── SCREENS.md
│   ├── DECISIONS.md
│   ├── ROADMAP.md
│   └── GLOSSARY.md
├── data/
│   ├── classes.json
│   ├── rooms.json
│   ├── buildings.json
│   ├── nodes.json
│   ├── edges.json
│   ├── floorPlans.json
│   └── qrLocations.json
├── public/
└── src/
```

---

## Coding Conventions

- **Simplicity**: Write small, self-contained files that a first-year student can understand.
- **Clarity over cleverness**: Avoid complex abstractions or multi-layered wrappers.
- **Comments**: Include short, helpful comments explaining non-obvious logic.
- **Strict Scope**: Modify only the exact files designated for each task.

---

## Data Model Summary

All data resides in local JSON files inside `/data`:
- `classes`: `classCode`, `subject`, `professor`, `roomCode`, `day`, `startTime`, `endTime`
- `rooms`: `roomCode`, `buildingId`, `floor`, `nodeId`, `landmarkHint`
- `buildings`: `buildingId`, `name`, `entrancePhoto`, `landmarkHint`
- `nodes`: `nodeId`, `buildingId`, `floor`, `x`, `y`, `type` (`room`, `qr_spot`, `stairs`, `elevator`, `hallway_corner`, `entrance`), `label`
- `edges`: `fromNodeId`, `toNodeId`, `distance`, `accessible` (`true`/`false`)
- `floorPlans`: `buildingId`, `floor`, `image` (SVG or PNG)
- `qrLocations`: `qrId`, `nodeId`

---

## How to Run and Test

*(To be finalized and verified once the project stack is approved and installed)*
- Dev Server: `npm run dev`
- Tests: `npm test`
- Always run tests and report real pass/fail output before and after any fix.

---

## Definition of Done

A task is complete ONLY when:
1. The implementation matches exactly what the user approved beforehand.
2. Only the approved files were touched.
3. No out-of-scope features or unsolicited improvements were added.
4. Any relevant tests were executed and the output was shown to the user.
5. If decisions were approved, they were logged in `docs/DECISIONS.md`.

