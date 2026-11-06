# Navigation Architecture & Approach (V1)

## 1. Overview

Room Finder uses a deterministic, **QR-code initialized, 2D floor plan routing model**. 

Unlike outdoor mapping services that rely on continuous satellite tracking, indoor academic environments present severe physical constraints: thick concrete walls, multi-level structures, and dead zones. Our system eliminates positioning uncertainty by using physical QR code anchors to establish a verified starting location, calculating the shortest path over a graph of nodes and edges, and rendering a static route line on simple 2D vector floor plans.

---

## 2. Step-by-Step User Flow

```
[Scan Physical QR Code] 
          │
          ▼
[Confirm "You are here: Building B, Floor 2, near Stairs A"]
          │
          ▼
[Select Destination Room (via Search or Schedule)]
          │
          ▼
[Calculate Shortest Route via Dijkstra / A*]
          │
          ▼
[Display 2D Floor Plan with Static Route Line & Pins]
          │
          ▼
[Read Step-by-Step Text Directions Below Map]
          │
     ┌────┴─────────────────────────────┐
     ▼                                  ▼
[Single Floor: Arrive at Room]   [Multi-Floor: Follow Transition Step]
                                        │
                                        ▼
                                 [Floor Switcher: View Next Floor]
```

1. **Locate & Scan**: The user scans a QR sticker affixed to a wall, doorway, or stairwell landing.
2. **Location Resolution**: The QR scanner reads a concise location ID (e.g., `B-F2-STAIRS-A`). The app displays an immediate confirmation: *"You are here: Building B, 2nd floor, near Stairs A"*.
3. **Choose Destination**: The user selects their target room (via the instant search bar or room details card).
4. **Static Route Display**: A clear, highlighted route line is rendered on the floor plan SVG connecting the starting pin to the destination room pin. Both pins and the line remain static.
5. **Turn-by-Turn Text Instructions**: Numbered walking directions appear directly underneath the map (e.g., *"1. Face away from Stairs A and walk straight down the main corridor. 2. Pass Room 202 on your left. 3. Room 204 is the second door on your right."*).
6. **Rescanning at Any Time**: If the user takes a wrong turn or finds another QR sticker, scanning it immediately re-calculates the route from their new position.

---

## 3. Multi-Floor Navigation

To maintain clarity on mobile screens, Room Finder **never displays multiple floors simultaneously**.

* **Floor-by-Floor Segments**: The route is broken into discrete segments per floor.
* **Transition Step**: When a path crosses floors, an intermediate transition card is shown between segments:
  > *"Take Stairs B to the 3rd floor"* or *"Take Elevator A to the 3rd floor"*.
* **Floor Switcher**: The navigation screen provides interactive floor tabs (e.g., `Floor 2` -> `Floor 3`). Tapping the next floor renders that floor's plan with the route starting at the stair/elevator exit node and terminating at the destination room.

---

## 4. Manual Start Fallback

If a student is in a section of the building without a visible QR sticker:
1. The student taps **"Set Start Manually"**.
2. A searchable list of prominent, easily identifiable landmarks is presented (e.g., *"Building B Main Entrance"*, *"Floor 1 West Staircase"*, *"Floor 2 North Restrooms"*).
3. Selecting a landmark initializes the navigation graph from that node, allowing full route generation without a camera scan.

---

## 5. Outside the Building View

Room Finder does **not** render an outdoor campus map. When a user selects a room in a building different from their current location or when viewing a room from outside:
* The screen displays:
  1. Official **Building Name** and Code.
  2. A clear **Entrance Photo** of the building exterior.
  3. A descriptive **Landmark Hint** (e.g., *"Directly opposite the University Library, adjacent to the North Courtyard"*).
* Instructions prompt the student to enter through the main doors and scan the entrance QR sticker.

---

## 6. Technology Trade-off Analysis: Why QR Codes?

| Technology | Why We Rejected It for V1 |
| :--- | :--- |
| **GPS / Satellite** | Fails completely indoors; satellite signals cannot penetrate multi-story concrete and steel structures. |
| **BLE Beacons** | Prohibitively expensive; requires purchasing, battery replacements, signal calibration, and physical maintenance across dozens of hardware units. |
| **Wi-Fi Positioning** | Highly inaccurate (~5–15m drift); requires complex signal-strength fingerprinting that breaks whenever access points change. |
| **Ultra-Wideband (UWB)** | Requires specialized, expensive anchors and is only supported by select high-end smartphones. |
| **Augmented Reality (AR)** | Causes rapid phone battery drain, severe device overheating, complex 3D camera tracking calibration, and high student drop-off. |

### Why QR Codes are the Superior Choice for V1:
- **Zero Hardware Cost**: Printed on standard durable vinyl/paper stickers.
- **100% Deterministic**: A scanned QR code has zero position drift; the student's exact coordinates are known immediately.
- **Universal Compatibility**: Operates on any smartphone equipped with a standard mobile camera.
- **Zero Maintenance**: No batteries, no firmware updates, no server dependencies.

