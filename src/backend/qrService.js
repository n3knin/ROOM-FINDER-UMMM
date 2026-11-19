
export function getNodeIdByQr(qrId, qrLocations) {
  if (!qrId || !qrLocations || !Array.isArray(qrLocations)) {
    return null;
  }

  // Find the matching QR record in qrLocations.json
  const match = qrLocations.find(item => item.qrId === qrId);
  return match ? match.nodeId : null;
}

export function getQrDescription(qrId, qrLocations) {
  if (!qrId || !qrLocations || !Array.isArray(qrLocations)) {
    return 'Unknown Location';
  }

  const match = qrLocations.find(item => item.qrId === qrId);
  return match && match.description ? match.description : 'Scanned Location';
}

// 1. IMPORT ALL YOUR BACKEND MODULES
import { getRoomStatus } from '../backend/statusService.js';
import { getNodeIdByQr, getQrDescription } from '../backend/qrService.js';
import { buildGraph } from '../backend/graph.js';
import { findShortestPath } from '../backend/dijkstra.js';
import { 
  generateDirections, 
  getTotalDistance, 
  getEstimatedTime 
} from '../backend/directionService.js';

// 2. THE NAVIGATION FUNCTION
export function startNavigation(scannedQrId, targetRoom, campusData) {
  const { nodes, edges, classes, qrLocations } = campusData;

  // ------------------------------------------------------------------
  // STEP 1: Check Room Status (statusService.js)
  // ------------------------------------------------------------------
  const status = getRoomStatus(targetRoom.roomCode, classes, new Date());
  console.log("Room status:", status.badgeText); // e.g. "Available until 2:00 PM"

  // ------------------------------------------------------------------
  // STEP 2: Find Where the Student is Standing (qrService.js)
  // ------------------------------------------------------------------
  const startNodeId = getNodeIdByQr(scannedQrId, qrLocations);
  const startName = getQrDescription(scannedQrId, qrLocations);
  // e.g. startNodeId = "NODE-GUARDHOUSE", startName = "Main Gate Guardhouse"

  // ------------------------------------------------------------------
  // STEP 3: Build the Connected Map (graph.js)
  // ------------------------------------------------------------------
  const graph = buildGraph(edges);

  // ------------------------------------------------------------------
  // STEP 4: Calculate the Winning Shortest Route (dijkstra.js)
  // ------------------------------------------------------------------
  const targetNodeId = targetRoom.nodeId; // e.g. "NODE-ROOM-101"
  const pathNodes = findShortestPath(graph, startNodeId, targetNodeId, nodes);
  // Returns: [Guardhouse Node, Hallway Node, Room 101 Node]

  // ------------------------------------------------------------------
  // STEP 5: Create English Sentences & Times (directionService.js)
  // ------------------------------------------------------------------
  const directions = generateDirections(pathNodes, edges);
  const totalMeters = getTotalDistance(directions);    // e.g. 150
  const timeEstimate = getEstimatedTime(totalMeters); // e.g. "2 mins walk"

  // ------------------------------------------------------------------
  // STEP 6: SEND EVERYTHING TO THE SCREEN!
  // ------------------------------------------------------------------
  return {
    startName,       // "Main Gate Guardhouse"
    targetName: targetRoom.name, // "Room 101"
    status,          // Room availability badge
    pathNodes,       // Used by SVG to draw the BLUE ROUTE LINE
    directions,      // Used to render Step 1, Step 2, Step 3 text cards
    totalMeters,     // "150m"
    timeEstimate     // "2 mins walk"
  };
}