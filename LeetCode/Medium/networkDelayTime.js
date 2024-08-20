/**
 * https://leetcode.com/problems/network-delay-time/description/
 *
 * Dijkstra's Algorithm Approach
 *
 * Idea: In this problem, we want to calculate the time it takes for a signal to travel from a starting node k to all other nodes in a network, or determine if some nodes are unreachable.
 *
 * The goal is to find the minimum time a node takes to send the signal to all other nodes in the network. That means we want to find the shortest path from a node k to other nodes such that the signal can be reached to all nodes.
 *
 * Typically, we can use Dijkstra's algorithm for finding the shortest paths from a source node to all other nodes in a weighted graph.
 *
 * In this case, the network represents as a graph with each node connects to each other using weighted edge (time), meaning time taken to travel between them.
 *
 * - First step, we will find the shortest path from node k to other nodes. We will have a list of distances at each node, representing the distance from k to that node.
 * - Next step, we will find the biggest distance which represents the minimum time to travel all nodes.
 * - Finally, we return that distance.
 *
 * Implementation
 *
 * 1. Firstly, we need to build the graph to represent the connection between nodes and its weighted edge (distance).
 *
 * 2. We need some data structures:
 * - 2.1: An array `distance` to store the shortest distance from the starting node k to each node. We initialize Infinity distance for each node, representing the distance has not been processed.
 *
 * - 2.2: A map which is called timeWeight to store the time (weight) between 2 connected nodes.
 *
 * - 2.3: An adjacency list to represent the connection between nodes.
 *
 * - 2.4: A min-heap to store nodes with their current shortest estimated distance.
 *
 * - 2.5: A set to keep track of visited nodes, meaning their shortest path has been determined.
 *
 * 3. Build the graph: We iterate through times list to process each edge. For each edge [fromA, toB, time]:
 * - 3.1: We update `timeWeight[fromA][toB]` to store the time (weight) between nodes `fromA` (A) and `toB` (B)
 *
 * - 3.2: And we update `adjacent[fromA]` to include node `toB` as a direct neighbor
 *
 * 4. Find shortest path: We add the starting node k to the heap with a distance of 0. This means the distance from k to itself is 0. And, the distance of node k in the distance array is set to 0.
 *
 * 5. As long as the heap is not empty, we process each node in the heap.
 * - 5.1: We need to sort the heap by distance to ensure the node with the shortest distance is processed first.
 *
 * - 5.2: We extract the smallest distance from the heap to process.
 *
 * - 5.3: If the node has already been visited (its shortest path is already determined), we skip. Otherwise, we mark the current node as visited.
 *
 * - 5.4: Relaxing Edges: We traverse through each neighbor of current node.
 *
 * - 5.5: If a shorter path to that neighbor can be found through the current node, we update the distance of the neighbor and push the neighbor into the heap with the updated distance for processing more neighbors.
 *
 * 6. After all nodes have been processed, we find the maximum value in the distance array (ignoring the 0th index, as node indices are 1-based).
 *
 * 7. Finally, If the maximum distance is still Infinity, it means that some nodes are unreachable from the starting node k, and we return -1. Otherwise, we return the maximum distance, which represents the time it takes for the signal to reach the farthest node.
 *
 * Time complexity: O((m + n) log n), where m is the number of edges, and n is the number of nodes.
 *
 * Space complexity: O(m + n)
 */
const networkDelayTime = (times, n, k) => {
  const distance = new Array(n + 1).fill(Infinity);
  const timeWeight = new Map();
  const adjacent = Array.from({ length: n + 1 }, () => []);

  // Build the graph
  for (const [fromA, toB, time] of times) {
    timeWeight.set(`${fromA}-${toB}`, time);
    adjacent[fromA].push(toB);
  }

  // Push the starting node (k) into heap - [distance, node]
  // The distance from k to itself is 0
  const heap = [[0, k]];
  const visited = new Set();
  distance[k] = 0;

  // Process nodes
  while (heap.length) {
    // Sort the heap to visit the node with shortest distance first
    heap.sort((a, b) => a[0] - b[0]);
    const [currentDistance, node] = heap.shift();

    // If the current node is already visited, skip it
    if (visited.has(node)) continue;

    // Mark the current node as visited
    visited.add(node);

    // Relax all edges from the current node
    for (const neighbor of adjacent[node]) {
      // If a shorter path to that neighbor can be found through the current node.
      const newDistance =
        currentDistance + timeWeight.get(`${node}-${neighbor}`);

      if (!visited.has(neighbor) && distance[neighbor] > newDistance) {
        // If a shorter path is found, we update the distance of the neighbor and push the neighbor into the heap with the updated distance.
        distance[neighbor] = newDistance;
        heap.push([newDistance, neighbor]);
      }
    }
  }

  // Find the maximum distance from the start node to all other nodes
  const maxDistance = Math.max(...distance.slice(1));

  // If the maximum distance is still Infinity, return -1 (unreachable nodes exist)
  return maxDistance === Infinity ? -1 : maxDistance;
};
