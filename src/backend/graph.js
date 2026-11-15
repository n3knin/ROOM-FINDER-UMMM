/**
 * Builds an Adjacency List (Fast Address Book) from the edges list.
 * @param {Array} edges - The list of connections from edges.json
 * @param {Object} options - { accessibleOnly: boolean }
 * @returns {Object} A graph map where each node points to its neighbors.
 */
export function buildGraph(edges, options = { accessibleOnly: false }) {
  const graph = {};

  if (!edges || !Array.isArray(edges)) {
    return graph;
  }

  // Helper to safely add a neighbor connection
  function addConnection(from, to, distance) {
    if (!graph[from]) {
      graph[from] = [];
    }
    graph[from].push({ node: to, distance: distance });
  }

  // Loop through every edge in edges.json
  for (const edge of edges) {
    // 1. Accessibility Filter: If wheelchair mode is ON and this edge uses stairs, SKIP IT!
    if (options.accessibleOnly && edge.accessible === false) {
      continue; // Ignore this staircase!
    }

    // 2. Connect Point A -> Point B
    addConnection(edge.fromNodeId, edge.toNodeId, edge.distance);

    // 3. Connect Point B -> Point A (Walkways work in both directions!)
    addConnection(edge.toNodeId, edge.fromNodeId, edge.distance);
  }

  return graph;
}

/**
 * Gets all direct neighbors for a specific node.
 * @param {Object} graph - The graph produced by buildGraph
 * @param {string} nodeId - The ID of the node to check
 * @returns {Array} List of neighbor objects [{ node, distance }, ...]
 */
export function getNeighbors(graph, nodeId) {
  if (!graph || !nodeId) return [];
  return graph[nodeId] || [];
}