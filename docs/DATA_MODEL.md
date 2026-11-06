# Data Model Specification (V1)

All application data resides as static JSON files located inside the `/data` directory. This document outlines the schema, field types, validation rules, and sample entries for each file.

---

## 1. `classes.json`

Stores scheduled class sessions linked to physical rooms.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `classCode` | string | Unique section or class identifier | `"CS101-A"` |
| `subject` | string | Full course or subject title | `"Introduction to Computing"` |
| `professor` | string | Name of the instructor | `"Dr. Alan Turing"` |
| `roomCode` | string | Room where class meets (references `rooms.json`) | `"B-201"` |
| `day` | string | Day of the week (`"Monday"`, `"Tuesday"`, etc.) | `"Monday"` |
| `startTime` | string | Start time in 24-hour format (`HH:mm`) | `"08:30"` |
| `endTime` | string | End time in 24-hour format (`HH:mm`) | `"10:00"` |

```json
[
  {
    "classCode": "CS101-A",
    "subject": "Introduction to Computing",
    "professor": "Dr. Alan Turing",
    "roomCode": "B-201",
    "day": "Monday",
    "startTime": "08:30",
    "endTime": "10:00"
  }
]
```

---

## 2. `rooms.json`

Stores physical classrooms, lecture halls, and laboratories.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `roomCode` | string | Unique room code identifier | `"B-201"` |
| `buildingId` | string | Building identifier (references `buildings.json`) | `"BLDG-B"` |
| `floor` | integer | Floor number (e.g., `1`, `2`) | `2` |
| `nodeId` | string | Associated navigation node (references `nodes.json`) | `"NODE-B-201"` |
| `landmarkHint` | string | Visual cue near the room entrance | `"Opposite the east staircase"` |

```json
[
  {
    "roomCode": "B-201",
    "buildingId": "BLDG-B",
    "floor": 2,
    "nodeId": "NODE-B-201",
    "landmarkHint": "Opposite the east staircase"
  }
]
```

---

## 3. `buildings.json`

Metadata for campus buildings included in the system.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `buildingId` | string | Unique building identifier | `"BLDG-B"` |
| `name` | string | Full official name of the building | `"Science and Engineering Hall"` |
| `entrancePhoto` | string | Path to entrance image asset | `"/images/buildings/bldg-b-entrance.jpg"` |
| `landmarkHint` | string | Exterior campus landmark guidance | `"Directly opposite the University Library"` |

```json
[
  {
    "buildingId": "BLDG-B",
    "name": "Science and Engineering Hall",
    "entrancePhoto": "/images/buildings/bldg-b-entrance.jpg",
    "landmarkHint": "Directly opposite the University Library"
  }
]
```

---

## 4. `nodes.json`

Point coordinates representing key positions on each floor plan graph.

| Field | Type | Description | Allowed Values |
| :--- | :--- | :--- | :--- |
| `nodeId` | string | Unique identifier for the graph vertex | e.g. `"NODE-B-F1-ENTRANCE"` |
| `buildingId` | string | References `buildings.json` | `"BLDG-B"` |
| `floor` | integer | Floor level | `1`, `2`, `3` |
| `x` | number | X coordinate on the floor plan SVG canvas | `150` |
| `y` | number | Y coordinate on the floor plan SVG canvas | `280` |
| `type` | string | Semantic classification of the point | `"room"`, `"qr_spot"`, `"stairs"`, `"elevator"`, `"hallway_corner"`, `"entrance"` |
| `label` | string | User-friendly label for directions | `"Main Floor Entrance"` |

```json
[
  {
    "nodeId": "NODE-B-F1-ENTRANCE",
    "buildingId": "BLDG-B",
    "floor": 1,
    "x": 100,
    "y": 250,
    "type": "entrance",
    "label": "Building B Main Entrance"
  }
]
```

---

## 5. `edges.json`

Walkable connections between nodes used for pathfinding algorithms (Dijkstra/A*).

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `fromNodeId` | string | Starting node ID (references `nodes.json`) | `"NODE-B-F1-ENTRANCE"` |
| `toNodeId` | string | Ending node ID (references `nodes.json`) | `"NODE-B-F1-CORNER-1"` |
| `distance` | number | Weight / physical walking distance in meters | `15.5` |
| `accessible` | boolean | True if traversable without using stairs | `true` |

```json
[
  {
    "fromNodeId": "NODE-B-F1-ENTRANCE",
    "toNodeId": "NODE-B-F1-CORNER-1",
    "distance": 15.5,
    "accessible": true
  }
]
```

---

## 6. `floorPlans.json`

Maps building floors to their respective vector or raster floor plan asset files.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `buildingId` | string | References `buildings.json` | `"BLDG-B"` |
| `floor` | integer | Floor number | `1` |
| `image` | string | Path to SVG or PNG asset | `"/floorplans/bldg-b-floor-1.svg"` |

```json
[
  {
    "buildingId": "BLDG-B",
    "floor": 1,
    "image": "/floorplans/bldg-b-floor-1.svg"
  }
]
```

---

## 7. `qrLocations.json`

Maps physical scanned QR code payload strings to graph nodes.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `qrId` | string | Encoded string value embedded in the physical QR code | `"QR-B-F1-ENTRANCE"` |
| `nodeId` | string | Exact graph node associated with the sticker position | `"NODE-B-F1-ENTRANCE"` |

```json
[
  {
    "qrId": "QR-B-F1-ENTRANCE",
    "nodeId": "NODE-B-F1-ENTRANCE"
  }
]
```

