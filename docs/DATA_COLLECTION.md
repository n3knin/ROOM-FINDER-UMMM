# Data Collection & Building Survey Guide

This guide describes how to survey a campus building, draw 2D vector floor plans, catalog graph nodes and edges using spreadsheets, and place physical QR stickers.

---

## 1. Phase 1: Physical Building Survey

Start with **one pilot building** (the building where new students get lost most frequently). Do not attempt to survey multiple buildings at once.

### Required Materials
- Clipboard with paper and pencil
- Smartphone camera for capturing doorway layouts and landmark cues
- Measuring tape or step-pacing log (approximate meter pacing)

### Survey Procedure
1. **Entrances**: Note every main entrance and ground-floor door. Take an exterior photo for `buildings.json`.
2. **Walk Floor by Floor**: Starting on Floor 1, walk clockwise along every corridor.
3. **Record Rooms in Order**: Write down every room code exactly as written on the door placard (e.g., `B-101`, `B-102`).
4. **Identify Junctions & Corners**: Every spot where a hallway turns or splits must become a `hallway_corner` node.
5. **Mark Vertical Connectors**: Note exact locations of stairwells and elevators. Record which floors each stairwell connects.

---

## 2. Phase 2: Drawing 2D Floor Plans

Floor plans do **not** need to be architectural blueprints or drawn to precise millimeter scale. Clear, schematic diagramming is much easier for students to interpret quickly.

### Drawing Guidelines
- **Tool**: Use [Figma](https://figma.com) or [draw.io](https://app.diagrams.net).
- **Format**: Export as clean, optimized **SVG** (Scalable Vector Graphics).
- **Styling**:
  - Exterior walls: Thick dark border (e.g. 3px `#1F2937`).
  - Rooms: Simple colored rectangular boxes with room code text centered inside.
  - Corridors: Clear open white/light-gray space.
  - Staircases: Distinct cross-hatched pattern or stair icon.
  - Elevators: Dedicated box labeled with an elevator icon.
- **Coordinate System**: Establish standard canvas dimensions (e.g., `1000px` width by `600px` height) so coordinates align cleanly with node `(x, y)` values.

---

## 3. Phase 3: Recording Graph Data in Google Sheets

Maintain data in a two-tab Google Spreadsheet for easy collaborative editing before exporting to JSON.

### Tab 1: `Nodes`
Columns:
- `nodeId` (e.g., `NODE-B-F1-101`, `NODE-B-F1-STAIRS-A`)
- `buildingId` (`BLDG-B`)
- `floor` (`1`)
- `x` (X-coordinate matching SVG canvas)
- `y` (Y-coordinate matching SVG canvas)
- `type` (`room`, `qr_spot`, `stairs`, `elevator`, `hallway_corner`, `entrance`)
- `label` (Readable description: *"Outside Room 101"*, *"North Staircase Landing"*)

### Tab 2: `Edges`
Columns:
- `fromNodeId`
- `toNodeId`
- `distance` (Estimated distance in meters)
- `accessible` (`TRUE` or `FALSE`—mark `FALSE` for stairs)

> **Note**: For bidirectional hallways, ensure an edge or path logic connects both directions (`A -> B` and `B -> A`).

---

## 4. Phase 4: Exporting to JSON

1. Verify there are no duplicate `nodeId` entries.
2. Ensure every `roomCode` in `rooms.json` points to an existing `nodeId` in `nodes.json`.
3. Ensure every `fromNodeId` and `toNodeId` in `edges.json` exists in `nodes.json`.
4. Export or convert rows to JSON format and save directly into `/data/nodes.json`, `/data/edges.json`, `/data/rooms.json`, and `/data/classes.json`.

---

## 5. Phase 5: QR Sticker Placement Checklist

Physical QR code stickers anchor the navigation system. 

### School Permission
> [!IMPORTANT]
> Official approval from campus administration or building facilities management is required before adhering QR stickers to walls or fixtures. Use removable, non-damaging adhesive material (e.g. durable matte vinyl).

### Placement Locations:
- [ ] **Main Building Entrances**: Eye-level (approx. 1.5 meters from floor) on the immediate right-hand side of entry doors.
- [ ] **Stairwell Landings**: Placed on wall next to stairwell entry doors on every floor.
- [ ] **Elevator Lobbies**: Placed beside the call buttons on each floor.
- [ ] **Major Hallway Intersections / T-Junctions**: Placed on corridor corners where direction changes occur.

### Sticker Quality Standards:
- Minimum QR code size: 5 cm x 5 cm for quick phone camera focus.
- Clear human-readable text beneath the code (e.g., *"Room Finder Location: B-F2-STAIRS-A"*).
- High-contrast matte finish (avoids harsh glare from hallway fluorescent lights).

