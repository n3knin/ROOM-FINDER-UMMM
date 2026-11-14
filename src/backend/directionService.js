/**
 * Looks up the distance in meters between two connected nodes.
 */
function getDistance(fromId, toId, edges) {
  if (!edges || edges.length === 0) return 0;
  
  const edge = edges.find(
    e => (e.fromNodeId === fromId && e.toNodeId === toId) ||
         (e.fromNodeId === toId && e.toNodeId === fromId)
  );
  
  return edge ? edge.distance : 0;
}
/**
 * Generates human-readable, step-by-step directions from a list of path nodes.
 * @param {Array} pathNodes - The ordered list of node objects from Dijkstra
 * @param {Array} edges - The list of edges from edges.json
 */
export function generateDirections(pathNodes, edges) {
  // If there is no path or only 1 point, return empty list
  if (!pathNodes || pathNodes.length < 2) {
    return [];
  }

  const directions = [];

  // Loop through each step in the chain (from Point A to Point B)
  for (let i = 0; i < pathNodes.length - 1; i++) {
    const currNode = pathNodes[i];
    const nextNode = pathNodes[i + 1];

    // 1. Get the walking distance in meters between these two points
    const distance = getDistance(currNode.nodeId, nextNode.nodeId, edges);

    let instructionText = '';
    let isFloorTransition = false;
    let isDestination = false;

    // Case A: Taking the stairs or elevator to another floor
    if (currNode.floor !== nextNode.floor) {
      isFloorTransition = true;
      const directionWord = nextNode.floor > currNode.floor ? 'up' : 'down';
      instructionText = `Take ${currNode.label} ${directionWord} to Floor ${nextNode.floor}.`;
    }
    // Case B: Arriving at the final destination room
    else if (i === pathNodes.length - 2 && nextNode.type === 'room') {
      isDestination = true;
      instructionText = `Arrive at ${nextNode.label} on your right.`;
    }
    // Case C: The very first step starting from an entrance or guardhouse
    else if (i === 0 && currNode.type === 'entrance') {
      instructionText = `From ${currNode.label}, walk ${distance}m towards ${nextNode.label}.`;
    }
    // Case D: Normal walking along a walkway or hallway
    else {
      instructionText = `Walk ${distance}m towards ${nextNode.label}.`;
    }

    // Add this step to our list
    directions.push({
      step: directions.length + 1,
      text: instructionText,
      distance: distance,
      floor: currNode.floor,
      isFloorTransition,
      isDestination
    });
  }

  return directions;
}

// When the student clicks "Navigate":

// STEP 1: The algorithm finds the shortest path of dots:
const pathNodes = findShortestPath(startNodeId, targetNodeId, allNodes, allEdges);
// pathNodes = [Guardhouse, Walkway, Building Entrance, Room 101]


// STEP 2: IMMEDIATELY CALL YOUR FUNCTION!
const textDirections = generateDirections(pathNodes, allEdges);
// textDirections = [
//   "1. From Guardhouse, walk 20m to Walkway",
//   "2. Walk 15m to Building Entrance",
//   "3. Arrive at Room 101 on your right"
// ]


// STEP 3: The screen shows BOTH at the same time:
// - The SVG Map draws the blue line through the dots (pathNodes)
// - The card below the map shows the text directions (textDirections)