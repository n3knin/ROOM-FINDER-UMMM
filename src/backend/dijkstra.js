import { getNeighbors } from './graph.js';

/**
 * Finds the shortest walking path between two nodes using Dijkstra's algorithm.
 * @param {Object} graph - The adjacency list from buildGraph(edges)
 * @param {string} startNodeId - The starting node ID (e.g. "NODE-GUARDHOUSE")
 * @param {string} targetNodeId - The destination node ID (e.g. "NODE-ROOM-101")
 * @param {Array} nodes - The full list of node objects from nodes.json
 * @returns {Array} Ordered list of full node objects from start to destination
 */
export function findShortestPath(graph, startNodeId, targetNodeId, nodes) {
  // 1. Safety Check: If any input is missing, return empty array
  if (!graph || !startNodeId || !targetNodeId || !nodes || !Array.isArray(nodes)) {
    return [];
  }

  // 2. If student is already at the target, return just that single node
  if (startNodeId === targetNodeId) {
    const startNode = nodes.find(n => n.nodeId === startNodeId);
    return startNode ? [startNode] : [];
  }

  // 3. Setup our 3 tracking notebooks:
  // distances: keeps track of the shortest meters found to each point
  // previous: keeps track of who led to who (so we can trace backward at the end)
  // unvisited: list of all points we haven't finished exploring yet
  const distances = {};
  const previous = {};
  const unvisited = new Set(nodes.map(n => n.nodeId));

  // Initialize all distances to Infinity, except the starting point which is 0m
  for (const node of nodes) {
    distances[node.nodeId] = Infinity;
  }
  distances[startNodeId] = 0;

  // 4. Dijkstra Search Loop
  while (unvisited.size > 0) {
    // A. Find the unvisited node with the smallest known distance
    let closestNodeId = null;
    let smallestDistance = Infinity;

    for (const nodeId of unvisited) {
      if (distances[nodeId] < smallestDistance) {
        smallestDistance = distances[nodeId];
        closestNodeId = nodeId;
      }
    }

    // If remaining nodes are unreachable (distance is Infinity), stop
    if (closestNodeId === null || smallestDistance === Infinity) {
      break;
    }

    // If we have reached our target destination, we are DONE!
    if (closestNodeId === targetNodeId) {
      break;
    }

    // Mark this closest node as visited
    unvisited.delete(closestNodeId);

    // B. Check all neighbors of this node
    const neighbors = getNeighbors(graph, closestNodeId);

    for (const neighbor of neighbors) {
      // Only check neighbors that haven't been visited yet
      if (!unvisited.has(neighbor.node)) {
        continue;
      }

      // Calculate the distance to this neighbor through closestNodeId
      const newDistance = distances[closestNodeId] + neighbor.distance;

      // If this route is shorter than whatever we found before, update it!
      if (newDistance < distances[neighbor.node]) {
        distances[neighbor.node] = newDistance;
        previous[neighbor.node] = closestNodeId; // Record who brought us here
      }
    }
  }

  // 5. If destination was never reached, return empty array
  if (distances[targetNodeId] === Infinity) {
    return [];
  }

  // 6. Trace our steps backward from target to start using the "previous" notebook
  const pathIds = [];
  let curr = targetNodeId;
  while (curr) {
    pathIds.unshift(curr); // Insert at the beginning of the list
    curr = previous[curr];
  }

  // Safety check: ensure the reconstructed path actually starts at startNodeId
  if (pathIds[0] !== startNodeId) {
    return [];
  }

  // 7. Convert the winning node IDs into full node objects (with names, floor, X, Y)
  const nodeMap = new Map(nodes.map(n => [n.nodeId, n]));
  return pathIds.map(id => nodeMap.get(id)).filter(Boolean);
}