# Glossary of Terms

Clear definitions of key concepts and terminology used throughout Room Finder.

---

### Node
A discrete point on a building floor plan graph representing a specific physical coordinate `(x, y)`. Nodes represent rooms, hallway intersections, entrances, stair landings, or elevator lobbies.

### Edge
A connection between two adjacent nodes on the navigation graph representing a walkable corridor or stair transition. Edges store the walking distance (in meters) and an accessibility flag.

### QR Spot
A physical location inside a building (such as an entrance, stairwell door, or hallway intersection) where a durable QR code sticker is placed. Scanning this sticker sets the student's exact starting node on the navigation graph.

### Pilot Building
The single initial campus building chosen for the first deployment of Room Finder (typically the building where freshmen experience the greatest difficulty finding classrooms). The pilot building validates all procedures before wider campus rollout.

### Floor Plan
A 2D vector graphic (SVG) diagram of a single building level, showing the exterior boundaries, hallways, rooms, stairs, and elevators in a clear, simplified layout.

### Route
The calculated shortest walkable sequence of connected nodes and edges from a student's starting point to their target classroom, rendered as a highlighted static line on the floor plan and accompanied by text directions.

### Accessible Route
A route calculated exclusively across edges marked as `accessible: true`. This path avoids stairs, guiding students solely through step-free corridors, ramps, and elevators.

