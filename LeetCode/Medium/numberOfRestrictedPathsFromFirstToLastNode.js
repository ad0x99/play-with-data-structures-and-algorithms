/**
 * https://leetcode.com/problems/number-of-restricted-paths-from-first-to-last-node/
 *
 * Dijkstra Algorithm Approach
 *
 * Idea:
 *
 * 1. Build a undirected weighted connected graph based on the edges list.
 * 2. Build a distanceToLastNode list where distanceToLastNode[i] is the shortest path (distance) from the node `ith` to the last node. Using Dijkstra Algorithm to find the shortest path for each node.
 * 3. A path from node 1 to node n is called restricted if distanceToLastNode[i] is greater than distanceToLastNode[i + 1].
 * 4. We use dynamic programming to count the number of restricted paths from node 1 to node based on the distanceToLastNode list.
 *
 * Implementation
 *
 * 1. We create an adjacency list graph to represent the connection between nodes. For each edge in edges, we add bidirectional edges between the nodes `u` and `v` with the corresponding weight.
 *
 * 2. We use Dijkstra's algorithm to find the shortest distance from the last node (node n) to all other nodes, and store the distances in the distanceToLastNode array.
 *
 * 3. Dynamic Programming: We initialize a totalPath array to store the number of restricted paths to reach each node.
 * - 3.1: We set totalPath[n] to 1 as there's only one way to reach the last node from itself.
 *
 * - 3.2: We call dfs function recursively to calculate the number of restricted paths to reach a node.
 *
 * - 3.3: Base case: If the totalPath value for the current node is already calculated, we return it to avoid redundant calculations.
 *
 * - 3.4: We initialize totalPaths to 0.
 *
 * - 3.5: For each neighbor of the current node, If the distance to the neighbor from the last node is less than the distance from the current node to the last node (indicating a path that doesn't pass through the last node), recursively calculate the number of restricted paths to the neighbor and add it to totalPaths.
 *
 * - 3.6: We store the calculated totalPaths in the totalPath array for future reference, and return totalPaths.
 *
 *
 * Time complexity: O((n ^ 2 log n + m), where n is the number of nodes, and m is the number of edges.
 * - Build graph: O(m)
 * - Min-heap + sorting: O(n * n log n)
 * - DP: O(n)
 *
 * Space complexity: O(n + m), where n is the length of the graph, and m is the length of DP.
 */
const countRestrictedPaths = (n, edges) => {
  // Build the graph
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v, weight] of edges) {
    graph[u].push([v, weight]);
    graph[v].push([u, weight]);
  }

  const distanceToLastNode = new Array(n + 1).fill(Infinity);
  distanceToLastNode[n] = 0;
  // Traverse each neighbor from node n
  const minHeap = [[n, 0]];

  // Find the shortest distance from node n to all other nodes
  while (minHeap.length) {
    minHeap.sort((a, b) => a[1] - b[1]);
    const [currentNode, currentDistance] = minHeap.shift();

    for (const [neighbor, weight] of graph[currentNode]) {
      const newDistance = currentDistance + weight;

      if (newDistance < distanceToLastNode[neighbor]) {
        distanceToLastNode[neighbor] = newDistance;
        minHeap.push([neighbor, newDistance]);
      }
    }
  }

  // DP to count restricted paths
  const totalPath = new Array(n + 1).fill(-1);
  // Set the totalPath[n] to 1 because only one way to reach n from itself
  totalPath[n] = 1;

  const dfs = (node) => {
    if (totalPath[node] !== -1) return totalPath[node];
    let totalPaths = 0;

    for (const [neighbor, weight] of graph[node]) {
      if (distanceToLastNode[node] > distanceToLastNode[neighbor]) {
        totalPaths = (totalPaths + dfs(neighbor)) % (1e9 + 7);
      }
    }

    totalPath[node] = totalPaths;
    return totalPath[node];
  };

  return dfs(1);
};

/**
 * Dijkstra Algorithm with Min Priority Queue Approach
 *
 * The same approach as previous solution. But instead of using min-heap, we will use Min Priority Queue to enhance the time complexity.
 *
 * Time complexity: O((n + m)log n), where n is the number of nodes, and m is the number of edges.
 * - Build graph: O(m)
 * - Min-heap: O(n log n)
 * - DP: O(n)
 *
 * Space complexity: O(n + m), where n is the length of the graph, and m is the length of DP.
 */
const countRestrictedPaths = (n, edges) => {
  // Build the graph
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [u, v, weight] of edges) {
    graph[u].push([v, weight]);
    graph[v].push([u, weight]);
  }

  const distanceToLastNode = new Array(n + 1).fill(Infinity);
  distanceToLastNode[n] = 0;

  // Traverse each neighbor from node n
  const minHeap = new MinPriorityQueue({ priority: (x) => x[1] });

  minHeap.enqueue([n, 0]);

  // Find the shortest distance from node n to all other nodes
  while (!minHeap.isEmpty()) {
    const [currentNode, currentDistance] = minHeap.dequeue().element;

    for (const [neighbor, weight] of graph[currentNode]) {
      const newDistance = currentDistance + weight;
      if (newDistance < distanceToLastNode[neighbor]) {
        distanceToLastNode[neighbor] = newDistance;
        minHeap.enqueue([neighbor, newDistance]);
      }
    }
  }

  // DP to count restricted paths
  const totalPath = new Array(n + 1).fill(-1);
  // Set the totalPath[n] to 1 because only one way to reach n from itself
  totalPath[n] = 1;

  const dfs = (node) => {
    if (totalPath[node] !== -1) return totalPath[node];
    let totalPaths = 0;

    for (const [neighbor, weight] of graph[node]) {
      if (distanceToLastNode[node] > distanceToLastNode[neighbor]) {
        totalPaths = (totalPaths + dfs(neighbor)) % (1e9 + 7);
      }
    }

    totalPath[node] = totalPaths;
    return totalPath[node];
  };

  return dfs(1);
};
