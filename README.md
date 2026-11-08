asdss# Room Finder

Room Finder is a lightweight, mobile-first web app made by students for students—especially first-year students who get lost or forget which classroom they need to go to.

> **Important**: This is a room **FINDER** only. There is **NO room booking**.

---

## The Problem

Campus buildings can be confusing. Freshmen and transferees often wander hallways searching for room numbers (like `B-305`), risking being late for class. Our school already provides class schedules with building and room codes, but lacks reliable building maps.

---

## How It Works

1. **Scan a QR code**: Find a QR code posted on a wall, stairwell, or entrance to set your starting location.
2. **Find your room**: Search by room code (e.g., `B-201`), subject, professor name, or class code.
3. **Follow the route**: View a 2D floor plan with a highlighted route line from your location to the room pin, plus step-by-step text directions.
4. **Works offline**: Once opened, schedules, maps, and route data work without an active internet connection.

---

## Features (V1)

- **Instant Search**: Search by room number, subject, professor, or section code as you type.
- **Room Details & Status**: See building, floor, ongoing schedule, landmark notes, and entrance photo. Status badges show whether class is *Ongoing*, *Starts soon* (within 30 mins), *Finished*, or *No class today*.
- **2D Static Route Line**: Clean path drawn directly on the floor plan.
- **Step-by-Step Directions**: Clear text instructions (e.g., "Turn left and walk 15 meters to Room 204").
- **Manual Start Option**: If no QR sticker is nearby, pick a starting point from a list (e.g., "Main entrance of Building B").
- **Multi-Floor Support**: View one floor at a time with clear steps to transition between floors.
- **Report an Issue**: Quick form to submit room discrepancies or schedule changes.

---

## Proposed Tech Stack (Pending Approval)

- **Frontend**: React + Vite (Progressive Web App / PWA)
- **Map & Routing**: 2D SVG floor plans + client-side Dijkstra/A* pathfinding graph
- **Data**: Static JSON files stored in `/data`
- **Offline Storage**: Service Worker cache

*(No external frameworks or libraries are installed yet. Waiting for team lead approval.)*

---

## Project Structure

```text
ROOM FINDER/
├── AGENTS.md            # Working rules and core instructions for AI agents
├── CLAUDE.md            # Quick pointer to AGENTS.md
├── README.md            # Project overview and guide (this file)
├── docs/                # Comprehensive project documentation
│   ├── PROJECT_BRIEF.md # Problem, users, goals, non-goals
│   ├── FEATURES.md      # V1 features and acceptance criteria
│   ├── NAVIGATION.md    # QR navigation and routing approach
│   ├── DATA_MODEL.md    # JSON data schemas and sample entries
│   ├── DATA_COLLECTION.md # Building survey and data gathering guide
│   ├── SCREENS.md       # Screen-by-screen layout descriptions
│   ├── DECISIONS.md     # Decision log with dates and rationale
│   ├── ROADMAP.md       # Development milestones and checklist
│   └── GLOSSARY.md      # Key terms and definitions
├── data/                # Static JSON datasets (buildings, rooms, nodes, edges)
└── src/                 # Application source code
```

---

## How to Add a New Building

1. **Walk and Survey**: Follow [`docs/DATA_COLLECTION.md`](docs/DATA_COLLECTION.md) to record hallways, stairs, doors, and potential QR spots.
2. **Draw Floor Plan**: Create simple box floor plans in Figma or draw.io and export as clean SVG.
3. **Enter Data**: Add rooms, graph nodes, and edges into the corresponding JSON files in `/data`.
4. **Test Route**: Verify that navigation lines and text directions calculate accurately.

---

## Current Status

- **Phase 1: Foundation & Documentation**. Setting up project rules, architecture guides, and sample data.

