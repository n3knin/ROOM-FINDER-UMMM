# Figma Floor Plan Creation Guide

A step-by-step tutorial for students on how to draw a clean 2D floor plan in Figma, find exact $(X, Y)$ coordinates for navigation checkpoints, and export the file as an SVG for Room Finder.

---

## 1. Golden Rules Before You Start

> [!IMPORTANT]
> **What YOU Draw in Figma**:
> - The outer walls
> - The hallway corridors
> - The classroom boxes and room numbers (`Room 101`, `Room 102`)
> - The stairs, elevators, and entrances
>
> **What You Do NOT Draw**:
> - Do **NOT** draw the blue navigation route line.
> - Do **NOT** draw the green "You Are Here" pin or red destination pins.
> - *(The app’s code will draw the pins and route line automatically on top of your map!)*

---

## 2. Phase 1: Setting Up Your Canvas

1. Open your browser and go to **[figma.com](https://figma.com)** (sign in or create a free account).
2. Click **+ New Design File** in the top right.
3. Press **`F`** on your keyboard (or click the **Frame tool** in the top toolbar).
4. Click anywhere on the blank canvas.
5. In the **right-hand sidebar** under the **Frame** section, set the exact size:
   - **W (Width)**: `1000`
   - **H (Height)**: `600`
6. Double-click the frame name in the top-left of the canvas and rename it: **`floor-1`**.
7. In the right sidebar under **Fill**, set the background color to white (`#FFFFFF`) or off-white (`#F8FAFC`).

---

## 3. Phase 2: Drawing the Floor Plan

### A. Draw the Walkable Hallways
1. Press **`R`** on your keyboard (Rectangle tool).
2. Click and drag to create the hallway corridor where students walk.
3. In the right sidebar under **Fill**, choose a light gray color (e.g., `#F1F5F9` or `#E2E8F0`).

### B. Draw the Classroom Boxes
1. Press **`R`** to draw a rectangle for each room along the hallway.
2. In the right sidebar:
   - **Fill**: White (`#FFFFFF`).
   - **Stroke**: Dark slate (`#334155`), thickness `2px`.
   - **Corner radius** (optional): `4px` to make corners slightly rounded.

### C. Add Room Number Labels
1. Press **`T`** on your keyboard (Text tool).
2. Click inside the room rectangle.
3. Type the room number (e.g., `B-101`).
4. In the right sidebar under **Text**:
   - Font size: `14px` or `16px`.
   - Font weight: **Bold**.
   - Alignment: Center.

### D. Mark Doors and Openings
Leave a small gap in the classroom border or draw a small line showing where students enter the room from the hallway.

### E. Draw the Stairs
1. Press **`R`** to draw a box where the staircase is located.
2. Fill with a darker gray (`#CBD5E1`).
3. Press **`L`** (Line tool) to draw 3 or 4 parallel lines across the box so it looks like steps.
4. Add text: `STAIRS (To Floor 2)`.

### F. Draw the Main Entrance
1. At the building entrance doorway, draw a small green box or label: `MAIN ENTRANCE`.

---

## 4. Phase 3: How to Find the $(X, Y)$ Coordinates for Nodes

To connect your drawing to the app, the app needs the exact coordinate numbers for each checkpoint (node).

### How to see the $(X, Y)$ in Figma:
1. Draw a tiny circle (`O` key) right at the **doorway of Room 101**.
2. Look at the **top of the right-hand sidebar** in Figma under **Position**:
   ```text
   X: 250
   Y: 180
   ```
3. Those two numbers are your coordinates!

### What Checkpoints to Record:
Keep a notepad open and write down $(X, Y)$ for:
* **The Main Entrance** (where the QR sticker goes): e.g. `X=150, Y=390`
* **Every Room Doorway**:
  * `Room 101`: e.g. `X=160, Y=230`
  * `Room 102`: e.g. `X=365, Y=230`
  * `Room 103`: e.g. `X=560, Y=230`
* **Every Hallway Turn / Corner**: e.g. `X=150, Y=280`
* **The Stairs Landing**: e.g. `X=690, Y=280`

*(After recording the numbers, you can delete the tiny temporary circles in Figma, or keep them hidden).*

---

## 5. Phase 4: Exporting as Clean SVG

1. In the left-hand layer panel (or by clicking the canvas title), select the entire **`floor-1`** frame.
2. Look at the **very bottom of the right-hand sidebar** for the **Export** section.
3. By default, it says `PNG`. Click the dropdown and change it to **`SVG`**.
4. Click the three dots `...` next to SVG and ensure:
   - [x] **Include "id" attribute** (checked)
   - [ ] *Outline text* (optional, keep default)
5. Click the button: **Export floor-1**.
6. Save the downloaded file as `bldg-b-floor-1.svg`.

---

## 6. What to Hand Over to the Project

Once you finish, you only need to provide two things:
1. The exported **`floor-1.svg`** file.
2. A simple text list of your coordinates:
   ```text
   Entrance (QR Spot): X=150, Y=390
   Hallway Corner:     X=150, Y=280
   Room 101 Door:      X=160, Y=230
   Room 102 Door:      X=365, Y=230
   Room 103 Door:      X=560, Y=230
   Stairs Landing:     X=690, Y=280
   ```

