/**
 * University of Mindanao (UM) Room Finder - Central Data Store
 * 
 * BACKEND INTEGRATION NOTE:
 * When connecting to a real backend REST/GraphQL API or Supabase/Firebase,
 * replace the simulated API functions (getRoomsApi, getBuildingsApi)
 * with your fetch/axios calls.
 */

export const BUILDINGS = [
  {
    id: 'BLDG-A',
    name: 'Main Building',
    code: 'MB',
    department: 'Administration & General Education',
    floors: 4,
    description: 'Central campus building containing administrative offices, registrar, and general lecture halls.',
    entrancePhoto: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80',
    landmarkHint: 'Facing the main university entrance plaza, opposite the flagpole'
  },
  {
    id: 'BLDG-B',
    name: 'College of Engineering',
    code: 'ENG',
    department: 'Engineering & Architecture',
    floors: 3,
    description: 'Specialized facility housing engineering science laboratories, drafting studios, and lecture halls.',
    entrancePhoto: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=600&q=80',
    landmarkHint: 'East wing of the campus, beside the university library walkway'
  },
  {
    id: 'BLDG-C',
    name: 'College of Computing Education',
    code: 'CCE',
    department: 'Information Technology & Computer Science',
    floors: 3,
    description: 'Modern high-tech building with dedicated software, multimedia, and networking laboratories.',
    entrancePhoto: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    landmarkHint: 'North campus quadrangle, next to the innovation center'
  }
];

export const ROOMS = [
  // --- BUILDING A (Main Building) ---
  {
    id: 'ROOM-A-101',
    roomCode: 'A-101',
    name: 'Lecture Hall 101',
    buildingId: 'BLDG-A',
    buildingName: 'Main Building',
    floor: 1,
    type: 'Lecture',
    capacity: 50,
    facilities: ['High-definition Projector', 'Air Conditioning', 'Magnetic Whiteboard', 'Campus Wi-Fi', 'PA System'],
    landmarkHint: 'Ground floor, first door to the right of the Main Lobby entrance',
    directions: [
      'Enter through the Main Building primary facade doors',
      'Walk past the security reception desk and central lobby',
      'Turn right into East Hallway 1',
      'Room A-101 is immediately on your right'
    ],
    mapCoordinates: { x: 28, y: 35, floor: 1 },
    schedule: [
      {
        id: 'SCH-101-1',
        classCode: 'CHEM101-A',
        subject: 'General Chemistry 1',
        subjectCode: 'CHEM 101',
        instructor: 'Dr. Maria Santos',
        day: 'Monday',
        startTime: '08:30',
        endTime: '10:00'
      },
      {
        id: 'SCH-101-2',
        classCode: 'MATH105-B',
        subject: 'Calculus with Analytic Geometry',
        subjectCode: 'MATH 105',
        instructor: 'Engr. Roberto Gomez',
        day: 'Monday',
        startTime: '10:30',
        endTime: '12:00'
      },
      {
        id: 'SCH-101-3',
        classCode: 'ENG101-C',
        subject: 'Purposive Communication',
        subjectCode: 'ENG 101',
        instructor: 'Prof. Corazon Aquino',
        day: 'Tuesday',
        startTime: '09:00',
        endTime: '10:30'
      }
    ]
  },
  {
    id: 'ROOM-A-204',
    roomCode: 'A-204',
    name: 'Room 204 (Multimedia)',
    buildingId: 'BLDG-A',
    buildingName: 'Main Building',
    floor: 2,
    type: 'Lecture',
    capacity: 45,
    facilities: ['Interactive Smart Board', 'Air Conditioning', 'Surround Sound', 'Ergonomic Tablet Chairs'],
    landmarkHint: 'Second floor, second room on the left after taking the central stairs',
    directions: [
      'Enter Main Building and proceed to the center atrium',
      'Take the central staircase up to the 2nd Floor',
      'Turn left at the floor directory sign',
      'Walk 10 meters; Room A-204 is on your left'
    ],
    mapCoordinates: { x: 45, y: 40, floor: 2 },
    schedule: [
      {
        id: 'SCH-204-1',
        classCode: 'FIL101-A',
        subject: 'Kontekstwalisadong Komunikasyon',
        subjectCode: 'FIL 101',
        instructor: 'Prof. Danilo Lim',
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:30'
      },
      {
        id: 'SCH-204-2',
        classCode: 'HIST102-D',
        subject: 'Readings in Philippine History',
        subjectCode: 'HIST 102',
        instructor: 'Dr. Elena Valenzuela',
        day: 'Monday',
        startTime: '13:00',
        endTime: '14:30'
      }
    ]
  },
  {
    id: 'ROOM-A-305',
    roomCode: 'A-305',
    name: 'Auditorium Hall 305',
    buildingId: 'BLDG-A',
    buildingName: 'Main Building',
    floor: 3,
    type: 'Lecture',
    capacity: 120,
    facilities: ['Dual Laser Projectors', 'Central AC', 'Tiered Theater Seating', 'Stage Lighting', 'Microphone Podium'],
    landmarkHint: 'Third floor, directly opposite the West Stairwell',
    directions: [
      'Take either the West Staircase or Elevator to the 3rd Floor',
      'Follow the corridor signs toward the Main Auditorium wing',
      'Room A-305 double doors are straight ahead'
    ],
    mapCoordinates: { x: 72, y: 30, floor: 3 },
    schedule: [
      {
        id: 'SCH-305-1',
        classCode: 'NSTP101-ALL',
        subject: 'National Service Training Program',
        subjectCode: 'NSTP 101',
        instructor: 'Lt. Col. Arthur Cruz',
        day: 'Monday',
        startTime: '14:00',
        endTime: '16:00'
      }
    ]
  },
  {
    id: 'ROOM-A-402',
    roomCode: 'A-402',
    name: 'Seminar Room 402',
    buildingId: 'BLDG-A',
    buildingName: 'Main Building',
    floor: 4,
    type: 'Lecture',
    capacity: 35,
    facilities: ['Conference Display', 'Air Conditioning', 'Polycom Video Cam', 'Conference Table'],
    landmarkHint: 'Top floor, adjacent to Graduate Studies Office',
    directions: [
      'Take the elevator to the 4th Floor',
      'Turn right down the executive hall',
      'Room A-402 is the last door on the left'
    ],
    mapCoordinates: { x: 60, y: 55, floor: 4 },
    schedule: [
      {
        id: 'SCH-402-1',
        classCode: 'RES100-M',
        subject: 'Methods of Research',
        subjectCode: 'RES 100',
        instructor: 'Dr. Fernando Poe',
        day: 'Wednesday',
        startTime: '16:00',
        endTime: '19:00'
      }
    ]
  },

  // --- BUILDING B (Engineering Building) ---
  {
    id: 'ROOM-B-101',
    roomCode: 'B-101',
    name: 'Physics & Mechanics Lab',
    buildingId: 'BLDG-B',
    buildingName: 'College of Engineering',
    floor: 1,
    type: 'Laboratory',
    capacity: 30,
    facilities: ['Lab Workbenches', 'Force Sensors', 'Fume Hood', 'Safety Eyewash Station', 'Overhead Projector'],
    landmarkHint: 'Ground floor Engineering, east corridor near the machine shop',
    directions: [
      'Enter College of Engineering through the glass portal',
      'Turn left down Hallway B-1',
      'Pass the Dean\'s Office',
      'Room B-101 is located on the right'
    ],
    mapCoordinates: { x: 30, y: 45, floor: 1 },
    schedule: [
      {
        id: 'SCH-B101-1',
        classCode: 'PHYS101-LAB',
        subject: 'University Physics 1 (Laboratory)',
        subjectCode: 'PHYS 101L',
        instructor: 'Engr. Gabriel Ramos',
        day: 'Monday',
        startTime: '07:30',
        endTime: '10:30'
      },
      {
        id: 'SCH-B101-2',
        classCode: 'MECH201-B',
        subject: 'Engineering Mechanics',
        subjectCode: 'MECH 201',
        instructor: 'Engr. Teresa Diaz',
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '12:00'
      }
    ]
  },
  {
    id: 'ROOM-B-201',
    roomCode: 'B-201',
    name: 'Circuit Analysis Studio',
    buildingId: 'BLDG-B',
    buildingName: 'College of Engineering',
    floor: 2,
    type: 'Laboratory',
    capacity: 35,
    facilities: ['Oscilloscopes', 'DC Power Supplies', 'Soldering Stations', 'Air Conditioning', 'Digital Multimeters'],
    landmarkHint: 'Second floor, directly opposite the north emergency exit stairs',
    directions: [
      'Climb the North Stairwell of Engineering Building to Floor 2',
      'Push through the fire doors',
      'Room B-201 is immediately across the hallway'
    ],
    mapCoordinates: { x: 50, y: 35, floor: 2 },
    schedule: [
      {
        id: 'SCH-B201-1',
        classCode: 'EE204-A',
        subject: 'Electric Circuits 1',
        subjectCode: 'EE 204',
        instructor: 'Engr. Vincent Sy',
        day: 'Monday',
        startTime: '11:00',
        endTime: '12:30'
      },
      {
        id: 'SCH-B201-2',
        classCode: 'ECE301-C',
        subject: 'Electronic Devices & Circuits',
        subjectCode: 'ECE 301',
        instructor: 'Engr. Leila Tan',
        day: 'Monday',
        startTime: '13:30',
        endTime: '15:00'
      }
    ]
  },
  {
    id: 'ROOM-B-205',
    roomCode: 'B-205',
    name: 'Drafting & CAD Studio',
    buildingId: 'BLDG-B',
    buildingName: 'College of Engineering',
    floor: 2,
    type: 'Laboratory',
    capacity: 40,
    facilities: ['Drafting Tables', 'CAD Workstations', 'Large Format Plotter', 'Natural Light Glass Walls'],
    landmarkHint: 'Second floor, southern corner facing the athletic oval',
    directions: [
      'Take the main staircase to Floor 2',
      'Head south along the breezeway corridor',
      'Room B-205 is at the end of the hall on the left'
    ],
    mapCoordinates: { x: 75, y: 60, floor: 2 },
    schedule: [
      {
        id: 'SCH-B205-1',
        classCode: 'ENGG111-D',
        subject: 'Engineering Drawing & CAD',
        subjectCode: 'ENGG 111',
        instructor: 'Ar. Paolo Mendoza',
        day: 'Monday',
        startTime: '15:30',
        endTime: '17:30'
      }
    ]
  },
  {
    id: 'ROOM-B-302',
    roomCode: 'B-302',
    name: 'Thermodynamics Lecture Room',
    buildingId: 'BLDG-B',
    buildingName: 'College of Engineering',
    floor: 3,
    type: 'Lecture',
    capacity: 40,
    facilities: ['Air Conditioning', 'Laser Projector', 'Whiteboard', 'Sound Isolation'],
    landmarkHint: 'Third floor, middle room between faculty lounge and restroom',
    directions: [
      'Go to the 3rd floor of Engineering Building',
      'Walk down the central corridor past the faculty lounge',
      'Room B-302 is the third door on the right'
    ],
    mapCoordinates: { x: 55, y: 40, floor: 3 },
    schedule: [
      {
        id: 'SCH-B302-1',
        classCode: 'ME302-A',
        subject: 'Thermodynamics 2',
        subjectCode: 'ME 302',
        instructor: 'Dr. Samuel Mercado',
        day: 'Wednesday',
        startTime: '08:00',
        endTime: '09:30'
      }
    ]
  },

  // --- BUILDING C (College of Computing Education / IT) ---
  {
    id: 'ROOM-C-101',
    roomCode: 'C-101',
    name: 'IT Computer Lab 1 (Software Dev)',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 1,
    type: 'Computer Lab',
    capacity: 40,
    facilities: ['40 High-Spec Core i7 PCs', 'Dual Monitors for Instructor', 'Gigabit LAN', 'Central AC', 'Overhead Projector'],
    landmarkHint: 'Ground floor, first lab immediately to the left of CCE entrance lobby',
    directions: [
      'Enter the College of Computing Education building',
      'Turn sharp left by the student tech showcase display',
      'Room C-101 is right in front of you'
    ],
    mapCoordinates: { x: 22, y: 38, floor: 1 },
    schedule: [
      {
        id: 'SCH-C101-1',
        classCode: 'CS101-A',
        subject: 'Introduction to Programming (Python)',
        subjectCode: 'CS 101',
        instructor: 'Prof. Alan Turing',
        day: 'Monday',
        startTime: '08:00',
        endTime: '10:00'
      },
      {
        id: 'SCH-C101-2',
        classCode: 'IT205-C',
        subject: 'Web Systems and Technologies',
        subjectCode: 'IT 205',
        instructor: 'Prof. Grace Hopper',
        day: 'Monday',
        startTime: '10:30',
        endTime: '12:30'
      },
      {
        id: 'SCH-C101-3',
        classCode: 'CS202-B',
        subject: 'Data Structures and Algorithms',
        subjectCode: 'CS 202',
        instructor: 'Dr. Ada Lovelace',
        day: 'Tuesday',
        startTime: '13:00',
        endTime: '15:00'
      }
    ]
  },
  {
    id: 'ROOM-C-104',
    roomCode: 'C-104',
    name: 'Networking & Cisco Lab',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 1,
    type: 'Computer Lab',
    capacity: 35,
    facilities: ['Cisco Routers & Switches Racks', 'Patch Panels', 'Crimping Stations', 'Air Conditioning', 'Fiber Optic Test Kits'],
    landmarkHint: 'Ground floor, rear corridor adjacent to Server Room',
    directions: [
      'Enter CCE Building and walk down the main ground floor corridor',
      'Continue past the elevator bank to the rear corridor',
      'Room C-104 is on the left opposite Server Room'
    ],
    mapCoordinates: { x: 38, y: 65, floor: 1 },
    schedule: [
      {
        id: 'SCH-C104-1',
        classCode: 'NET201-A',
        subject: 'CCNA Routing and Switching',
        subjectCode: 'NET 201',
        instructor: 'Engr. Marco Villanueva',
        day: 'Monday',
        startTime: '13:00',
        endTime: '16:00'
      }
    ]
  },
  {
    id: 'ROOM-C-202',
    roomCode: 'C-202',
    name: 'Artificial Intelligence & Data Lab',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 2,
    type: 'Computer Lab',
    capacity: 36,
    facilities: ['GPU Computing Workstations (RTX 4080)', 'Ultra-wide Curved Displays', 'Central AC', 'Dual Projector Array'],
    landmarkHint: 'Second floor, directly across from the CCE Dean\'s office',
    directions: [
      'Take the CCE central glass staircase to Floor 2',
      'Turn right at the top landing',
      'Room C-202 is situated right across from the Dean\'s Suite'
    ],
    mapCoordinates: { x: 52, y: 35, floor: 2 },
    schedule: [
      {
        id: 'SCH-C202-1',
        classCode: 'AI301-A',
        subject: 'Machine Learning & Neural Networks',
        subjectCode: 'AI 301',
        instructor: 'Dr. Geoffrey Hinton',
        day: 'Monday',
        startTime: '09:00',
        endTime: '11:00'
      },
      {
        id: 'SCH-C202-2',
        classCode: 'DS201-B',
        subject: 'Applied Data Science with Python',
        subjectCode: 'DS 201',
        instructor: 'Prof. Linus Torvalds',
        day: 'Monday',
        startTime: '14:00',
        endTime: '16:00'
      }
    ]
  },
  {
    id: 'ROOM-C-208',
    roomCode: 'C-208',
    name: 'Mobile App Development Studio',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 2,
    type: 'Computer Lab',
    capacity: 32,
    facilities: ['Apple iMacs (M3)', 'Android Test Tablets', 'Air Conditioning', 'Collaborative Pod Seating', 'Interactive Display'],
    landmarkHint: 'Second floor, east hallway near the student collaboration balcony',
    directions: [
      'Take the stairs to Floor 2',
      'Walk toward the East terrace collaboration area',
      'Room C-208 is the corner glass studio'
    ],
    mapCoordinates: { x: 80, y: 40, floor: 2 },
    schedule: [
      {
        id: 'SCH-C208-1',
        classCode: 'MOB301-A',
        subject: 'Cross-Platform Mobile Development (Flutter/React Native)',
        subjectCode: 'MOB 301',
        instructor: 'Prof. Steve Wozniak',
        day: 'Tuesday',
        startTime: '08:30',
        endTime: '11:30'
      }
    ]
  },
  {
    id: 'ROOM-C-301',
    roomCode: 'C-301',
    name: 'Cybersecurity & Forensics Lab',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 3,
    type: 'Computer Lab',
    capacity: 30,
    facilities: ['Air-gapped Network Island', 'Forensics Hardware Analyzers', 'Air Conditioning', 'Smart Card Access Control'],
    landmarkHint: 'Third floor, secure wing behind access door',
    directions: [
      'Take elevator to Floor 3',
      'Turn left into the specialized security wing',
      'Room C-301 is the first secured door on the right'
    ],
    mapCoordinates: { x: 30, y: 50, floor: 3 },
    schedule: [
      {
        id: 'SCH-C301-1',
        classCode: 'SEC401-A',
        subject: 'Ethical Hacking & Penetration Testing',
        subjectCode: 'SEC 401',
        instructor: 'Prof. Kevin Mitnick',
        day: 'Thursday',
        startTime: '13:00',
        endTime: '16:00'
      }
    ]
  },
  {
    id: 'ROOM-C-305',
    roomCode: 'C-305',
    name: 'CCE Innovation Hub & Lecture Hall',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 3,
    type: 'Lecture',
    capacity: 65,
    facilities: ['Dual Interactive Displays', 'Acoustic Wall Paneling', 'Modular Desks', 'Air Conditioning', 'Full Wi-Fi 6 Coverage'],
    landmarkHint: 'Third floor, center auditorium facing the atrium',
    directions: [
      'Take the main staircase or elevator to Floor 3',
      'The Innovation Hub C-305 is directly at the center of the floor'
    ],
    mapCoordinates: { x: 55, y: 55, floor: 3 },
    schedule: [
      {
        id: 'SCH-C305-1',
        classCode: 'CAP402-A',
        subject: 'Capstone Project Defense & Colloquium',
        subjectCode: 'CAP 402',
        instructor: 'Dr. Tim Berners-Lee',
        day: 'Friday',
        startTime: '08:30',
        endTime: '12:00'
      }
    ]
  },
  {
    id: 'ROOM-C-310',
    roomCode: 'C-310',
    name: 'Cloud Computing & DevOps Studio',
    buildingId: 'BLDG-C',
    buildingName: 'College of Computing Education',
    floor: 3,
    type: 'Computer Lab',
    capacity: 35,
    facilities: ['Linux Thin Clients', 'Cloud Sandbox Terminals', 'Air Conditioning', 'Dual Projectors'],
    landmarkHint: 'Third floor, west end next to the fire exit stairs',
    directions: [
      'Take elevator to Floor 3',
      'Walk to the western end of the corridor',
      'Room C-310 is the final classroom before the emergency exit'
    ],
    mapCoordinates: { x: 82, y: 65, floor: 3 },
    schedule: [
      {
        id: 'SCH-C310-1',
        classCode: 'CLOUD301-A',
        subject: 'Cloud Infrastructure & DevOps',
        subjectCode: 'CLOUD 301',
        instructor: 'Prof. James Gosling',
        day: 'Monday',
        startTime: '16:30',
        endTime: '18:30'
      }
    ]
  }
];

/**
 * Convert time string "HH:mm" to total minutes from midnight
 */
export function timeToMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/**
 * Calculates real-time room availability status based on day and 24-hr time
 * Statuses:
 * - 'Occupied': currently has an ongoing class
 * - 'Starting Soon': a class starts within 30 minutes
 * - 'Available': free right now
 */
export function calculateRoomAvailability(room, currentDay = 'Monday', currentTime = '09:00') {
  if (!room || !Array.isArray(room.schedule)) {
    return {
      status: 'Available',
      currentClass: null,
      nextClass: null,
      remainingMinutes: 0
    };
  }

  const nowMins = timeToMinutes(currentTime);
  const dayClasses = room.schedule.filter((sch) => sch.day.toLowerCase() === currentDay.toLowerCase());

  if (dayClasses.length === 0) {
    return {
      status: 'Available',
      currentClass: null,
      nextClass: null,
      remainingMinutes: 0,
      note: 'No classes scheduled for today'
    };
  }

  // 1. Check for ongoing class
  for (const item of dayClasses) {
    const startMins = timeToMinutes(item.startTime);
    const endMins = timeToMinutes(item.endTime);

    if (nowMins >= startMins && nowMins < endMins) {
      return {
        status: 'Occupied',
        currentClass: item,
        nextClass: null,
        remainingMinutes: endMins - nowMins,
        note: `Ends in ${endMins - nowMins} min (${item.endTime})`
      };
    }
  }

  // 2. Check for class starting soon (within 30 mins)
  const upcomingClasses = dayClasses
    .filter((item) => timeToMinutes(item.startTime) > nowMins)
    .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));

  if (upcomingClasses.length > 0) {
    const nextClass = upcomingClasses[0];
    const diffMins = timeToMinutes(nextClass.startTime) - nowMins;

    if (diffMins <= 30) {
      return {
        status: 'Starting Soon',
        currentClass: null,
        nextClass: nextClass,
        remainingMinutes: diffMins,
        note: `Starts in ${diffMins} min (${nextClass.startTime})`
      };
    }

    return {
      status: 'Available',
      currentClass: null,
      nextClass: nextClass,
      remainingMinutes: diffMins,
      note: `Next class at ${nextClass.startTime}`
    };
  }

  return {
    status: 'Available',
    currentClass: null,
    nextClass: null,
    remainingMinutes: 0,
    note: 'All classes completed for today'
  };
}

/**
 * Simulated Async API Getters for easy backend replacement
 */
export async function getRoomsApi() {
  // Simulate network latency (0ms for instant client execution)
  return new Promise((resolve) => {
    setTimeout(() => resolve([...ROOMS]), 10);
  });
}

export async function getBuildingsApi() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...BUILDINGS]), 10);
  });
}

