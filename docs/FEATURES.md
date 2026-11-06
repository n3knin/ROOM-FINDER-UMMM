# Features & Acceptance Criteria (V1)

This document specifies the core features for Room Finder V1 and their simple acceptance criteria.

---

## 1. Instant Search

### Description
Users can search across classes and rooms using a single search input. Matches are shown instantly as the user types.

### Acceptance Criteria
- [ ] Typing into the search bar filters matching records by:
  - Room code (e.g., `B-201`, `201`)
  - Course/Subject name (e.g., `Calculus 1`, `Intro to CS`)
  - Professor name (e.g., `Dr. Santos`, `Prof. Reyes`)
  - Class/Section code (e.g., `CS101-A`)
- [ ] Results update immediately upon typing without requiring a submit button.
- [ ] If no matches are found, display a clear "No rooms or classes found" message.
- [ ] Tapping a search result navigates directly to that room's detail view.

---

## 2. Room Details & Schedule

### Description
Displays complete contextual information about a specific room, including its current schedule and physical location hints.

### Acceptance Criteria
- [ ] Displays room identification: Room Code, Building Name, and Floor Number.
- [ ] Displays full schedule for the room (day, start time, end time, subject, professor, class code).
- [ ] Displays external building landmark hint (e.g., "Beside the campus library") and an entrance photo reference.
- [ ] Provides a clear "Navigate to this room" button.

---

## 3. Class Status Badge

### Description
Computes a dynamic status badge for the room based on the current system time and the room's class schedule.

### Acceptance Criteria
- [ ] Evaluates current day and time against scheduled intervals:
  - **Ongoing**: Current time falls between a class's `startTime` and `endTime`.
  - **Starts soon**: Current time is within 30 minutes before a scheduled class.
  - **Finished**: All scheduled classes for today have ended.
  - **No class today**: No scheduled entries exist for the current day.
- [ ] Displays the corresponding badge prominently on the Room Details card and Search result snippets.

---

## 4. 2D Indoor Navigation

### Description
Renders a 2D floor plan with a static route line from the user's starting point to the destination room, accompanied by step-by-step text directions.

### Acceptance Criteria
- [ ] **QR Code Start**: Scanning a valid QR code (e.g., containing `B-F2-STAIRS-A`) resolves the user's starting node and displays: *"You are here: Building B, 2nd floor, near the stairs"*.
- [ ] **Manual Start Fallback**: If no QR sticker is scanned, the user can select their starting location from a dropdown/list of predefined spots (e.g., "Main Entrance", "East Stairs").
- [ ] **Route Visualization**: Computes the shortest path using Dijkstra/A* on the graph nodes/edges and draws a highlighted static line on the 2D floor plan SVG from start to destination.
- [ ] **Static Pins**: Pin markers indicate start ("You are here") and destination; pins remain static with no moving dot.
- [ ] **Step-by-Step Directions**: Displays ordered text instructions below the map (e.g., *"1. From Main Entrance, go straight 15m. 2. Turn left into Hallway B. 3. Arrive at Room 201 on your right."*).
- [ ] **Multi-Floor Handling**: For paths spanning multiple floors:
  - Displays only one floor plan at a time.
  - Shows an intermediate transition step (e.g., *"Take stairs to 3rd floor"*).
  - Provides a floor switcher or "Continue on Floor X" button to view the next floor's segment.
- [ ] **Rescan**: Allows users to scan another QR code at any time to re-route from their new position.

---

## 5. Accessible Route Toggle *(Optional - Needs Approval)*

> **Note**: Do not implement this feature until explicit user approval is granted.

### Description
Provides an accessibility toggle that routes users exclusively through elevators and accessible ramps, avoiding staircases.

### Acceptance Criteria
- [ ] Toggle button: "Accessible Route (Avoid Stairs)".
- [ ] When enabled, pathfinding restricts graph traversal to edges where `accessible: true`.
- [ ] If no accessible path exists, display an alert explaining that no accessible route is available.

---

## 6. Report Issue Form

### Description
A lightweight form for students to report incorrect room details, changed schedules, or missing QR tags.

### Acceptance Criteria
- [ ] Contains simple input fields: Room Code, Issue Type (e.g., "Wrong Schedule", "Moved Room", "Damaged QR Tag"), and optional Description.
- [ ] Shows a confirmation message upon submission.
- [ ] In V1, stores reports locally or prepares data for submission without requiring a user login.

---

## 7. Offline Support (PWA)

### Description
Ensures the entire app functions without active Wi-Fi or cellular connectivity after initial load.

### Acceptance Criteria
- [ ] Static assets (HTML, CSS, JS, SVG floor plans) and JSON datasets are cached by the Service Worker on first load.
- [ ] Full search, room detail views, graph pathfinding, and floor plan rendering function identically whether online or completely offline.
- [ ] Displays no breaking network errors when cellular data is toggled off.

---

## 8. "My Schedule" Saved Classes *(Optional - Needs Approval)*

> **Note**: Do not implement this feature until explicit user approval is granted.

### Description
Allows students to bookmark their enrolled classes to view their personalized daily room list in one place.

### Acceptance Criteria
- [ ] Users can bookmark classes from search or room details.
- [ ] Bookmarked classes are saved locally in the browser (`localStorage`).
- [ ] Dedicated view displays today's enrolled classes in chronological order with direct "Find Room" navigation shortcuts.

