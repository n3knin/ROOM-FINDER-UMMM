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
  // 1. Safety Check: If any required input is missing, return empty path
  if (!graph || !startNodeId || !targetNodeId || !nodes) {
    return [];
  }

  // 2. If the student is already at their destination, return just that node
  if (startNodeId === targetNodeId) {
    const startNode = nodes.find(n => n.nodeId === startNodeId);
    return startNode ? [startNode] : [];
  }