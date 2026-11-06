# Screen Layouts & Wireframe Descriptions (V1)

This document describes the visual and functional layouts of the core application screens in plain English.

---

## 1. Home Screen

The initial screen greeted by students upon opening the web app.

### Layout Elements (Top to Bottom):
1. **Header Bar**: 
   - App title ("Room Finder") with a clean school accent color.
   - Offline status indicator badge (displays *"Offline Mode"* when disconnected, otherwise subtle).
2. **Prominent Search Input**:
   - Large touch-friendly search box with placeholder: *"Search room (e.g. B-201), subject, prof, or code..."*.
   - Clear ("X") icon appears when text is entered.
3. **Primary Action: "Scan QR Code" Button**:
   - High-contrast, full-width button with a camera/QR icon.
   - Subtext: *"Scan a hallway QR sticker to set your location"*.
4. **"Today's Classes" Section**:
   - Card listing scheduled classes for the current day.
   - Each card displays Subject Title, Time range, Room Code, and an active Status Badge (*Ongoing*, *Starts soon*, etc.).
   - Tapping any card navigates to that Room's Detail view.
5. **Quick Helper / Manual Start**:
   - Secondary link at bottom: *"Not near a QR code? Choose your starting point manually"*.

---

## 2. Search Results Screen

Displays live filtered matches as the user types into the search bar.

### Layout Elements:
1. **Header with Search Input**: Maintains active keyboard focus.
2. **Results List**:
   - Grouped into matching **Rooms** and **Classes**.
   - **Room Card**: Shows Room Code in bold (e.g., `B-201`), Building Name, Floor, and current class status badge.
   - **Class Card**: Shows Subject Name, Class Code, Professor Name, Scheduled Hours, and Room badge.
3. **Empty State**:
   - If no items match: Friendly graphic with text: *"No matching rooms or classes found. Check for typos or search by room code (e.g. B-101)."*

---

## 3. Room Details Screen

Full contextual profile for a selected classroom.

### Layout Elements:
1. **Top Navigation**: Back button (`<`) and Room Code heading (`Room B-201`).
2. **Location Overview Card**:
   - Building Name (`Science & Engineering Hall - Building B`).
   - Floor (`2nd Floor`).
   - Current Status Badge (`Ongoing` / `Starts soon` / `Finished` / `No class today`).
3. **Action Button**:
   - Large prominent button: **"Navigate to this Room"**.
4. **Today's Schedule Table**:
   - Chronological list of all subjects meeting in this room today.
   - Columns: Time, Subject, Section, Professor.
5. **Building & Landmark Hint**:
   - Entrance photo thumbnail.
   - Landmark description text (e.g., *"Take the East Entrance opposite the campus library; room is second door past the stairs."*).
6. **Report Link**:
   - Subtle text button at the bottom: *"Notice wrong info? Report a change"*.

---

## 4. QR Scanner Screen

Camera interface for reading physical location stickers.

### Layout Elements:
1. **Header**: Back arrow with title *"Scan Hallway QR"*.
2. **Camera Viewport**:
   - Centered square scanning reticle with animated corner borders.
   - Guidance text below reticle: *"Align the QR sticker inside the frame"*.
3. **Controls Overlay**:
   - Flashlight / Torch toggle button for dim hallway lighting.
4. **Fallback Option**:
   - Prominent button at the bottom: *"Can't scan? Select your location from a list"*.

---

## 5. Navigation Screen

The core routing interface showing the static floor plan path and text steps.

### Layout Elements:
1. **Header Bar**:
   - Destination title (`Routing to Room B-201`).
   - Start location banner: *"You are here: Building B, 2nd floor, near Stairs A"*.
   - Rescan icon button to quickly update position.
2. **Floor Switcher Tabs (For Multi-Floor Routes)**:
   - Horizontal tab bar (e.g., `[ Floor 1 ] [ Floor 2 (Active) ]`).
   - Clearly indicates which floor segment is currently displayed.
3. **Interactive 2D Floor Plan Canvas**:
   - Clean SVG rendering of the active floor.
   - Green start pin at starting node; red destination pin at target room door.
   - Highlighted static route line connecting nodes along the hallway.
   - Multi-touch pinch-to-zoom and drag-to-pan capabilities.
4. **Directions Bottom Sheet**:
   - Collapsible panel beneath the map with ordered turn-by-turn text:
     1. *"From Stairs A, turn right into the main hallway."*
     2. *"Walk past Room 202 on your left."*
     3. *"Arrive at Room 204 on your right."*
   - For multi-floor paths, includes highlighted transition card: *"Take stairs up to Floor 2"*.

---

## 6. Report Issue Form Screen

Simple feedback mechanism for crowdsourcing updates from students.

### Layout Elements:
1. **Header**: Back button and title *"Report Room Issue"*.
2. **Target Room Input**: Pre-filled with room code (if navigated from Room Details) or editable text input.
3. **Issue Category Radio Selector**:
   - ( ) Wrong class schedule
   - ( ) Class moved to another room
   - ( ) Damaged or missing QR code
   - ( ) Other
4. **Description Text Area**: Optional field for additional notes.
5. **Submit Button**: Submits report and displays a confirmation toast message: *"Thank you! Your report has been noted."*

