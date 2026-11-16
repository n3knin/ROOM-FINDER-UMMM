/**
 * Builds an Adjacency List (Fast Lookup Map) from edges.json.
 * @param {Array} edges - The list of walkways from edges.json
 * @returns {Object} A map where each node points to all its direct neighbors.
 */
export function buildGraph(edges) {
  const graph = {};

  // Safety check: if no edges provided, return an empty graph
  if (!edges || !Array.isArray(edges)) {
    return graph;
  }

  // Helper function to safely add a neighbor
  function addConnection(from, to, distance) {
    if (!graph[from]) {
      graph[from] = [];
    }
    graph[from].push({ node: to, distance: distance });
  }

  // Loop through every walkway in edges.json
  for (const edge of edges) {
    // 1. You can walk from A to B
    addConnection(edge.fromNodeId, edge.toNodeId, edge.distance);

    // 2. You can walk from B to A (hallways work both ways!)
    addConnection(edge.toNodeId, edge.fromNodeId, edge.distance);
  }

  return graph;
}

/**
 * Gets all direct neighbors you can step to from a specific node.
 */
export function getNeighbors(graph, nodeId) {
  if (!graph || !nodeId) return [];
  return graph[nodeId] || [];
}