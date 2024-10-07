/**
 * https://leetcode.com/problems/path-with-maximum-probability/
 *
 * Dijkstra Algorithm Approach
 *
 * Idea: The maximum probability between two nodes is the largest path to traverse from node U to node V.
 *
 * We will use Dijkstra's algorithm with a max-heap to find the path with the highest probability.
 *
 * Implementation
 *
 * 1. We create an adjacency list graph to represent the connection between nodes and its edge is probability. For each edge in edges, we add bidirectional edges between the nodes `u` and `v` with the corresponding probability.
 *
 * 2. We create a max-heap to store nodes and their associated probabilities. And we initialize an array `maxProbability` to store the maximum probability of reaching each node from the starting node.
 * - 2.1: We start traversing from the starting node (start_node) and set its probability to 1 in the maxProbability array.
 *
 * 3. As long as there are nodes in the heap to process.
 * - 3.1: We manually sort the heap to keep the the node with highest probability to be processed first.
 *
 * - 3.2: We extract the node with the highest probability from the heap.
 *
 * - 3.3: Base case: If the extracted node is the target node (end_node), we return the current probability as the maximum probability.
 *
 * - 3.4: If the extracted node's current probability is less than its previously stored probability, skip it (because a higher probability path has already been found).
 *
 * - 3.5: Otherwise, for each neighbor of the extracted node, we calculate the new probability by multiplying the current node's probability with the edge probability.
 *
 * - 3.6: If the new probability is greater than the previously stored probability for the neighbor, update the maxProbability array and push the neighbor with the new probability into the heap for further exploration.
 *
 * 4. Finally, If the loop completes without finding the target node, it means no path exists, so we return 0. Otherwise, we return the maximum probability stored for the (end_node), representing the highest probability path from the starting node to the end node.
 *
 * Time complexity: O(n) + O(n) * O(n log n) + O(m) = O(n ^ 2 log n + m)
 * - Building the graph: O(n), where n is the number of edges
 * - Iterating maxHeap + sorting: O(n * n log n)
 * - Iterating through its adjacent nodes: O(m)
 *
 * Space complexity: O(n) + O(m) + O(m) = O(m + n), where n is the number of edges, and m is length of heap and maxProbability.
 */
const maxProbability = (n, edges, succProb, start_node, end_node) => {
  const graph = Array.from({ length: n }, () => []);

  // Build the graph
  // graph[u] = [v, probability]
  // graph[v] = [u, probability]
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const probability = succProb[i];

    graph[u].push([v, probability]);
    graph[v].push([u, probability]);
  }

  // [probability, node]
  const maxHeap = [[start_node, 1]];
  const maxProbability = new Array(n).fill(0);
  maxProbability[start_node] = 1;

  while (maxHeap.length) {
    // Sort the heap to visit the node with larger probability first
    maxHeap.sort((a, b) => b[1] - a[1]);
    const [currentNode, currentProbability] = maxHeap.shift();

    if (currentNode === end_node) return currentProbability;
    if (maxProbability[currentNode] > currentProbability) continue;

    for (const [neighbor, probability] of graph[currentNode]) {
      const newProbability = currentProbability * probability;

      if (newProbability > maxProbability[neighbor]) {
        maxProbability[neighbor] = newProbability;
        maxHeap.push([neighbor, newProbability]);
      }
    }
  }

  return 0;
};

/**
 *
 * Dijkstra Algorithm with Max Priority Queue Approach
 *
 * This solution is the same as previous one. But instead of using max-heap to keep track processing node, we use a max priority queue to enhance the time complexity.
 *
 * Time complexity: O(n) + O(log m) + O(m) = O(n + m log m)
 * - Building the graph: O(n), where n is the number of edges
 * - Enqueue, Dequeue: O(log m)
 * - Visiting adjacent edges: O(m)
 * - Iterating through its adjacent nodes: O(m)
 *
 * Space complexity: O(n) + O(m) + O(m) = O(m + n), where n is the number of edges, and m is length of heap and maxProbability.
 */
const maxProbability = (n, edges, succProb, start_node, end_node) => {
  const graph = Array.from({ length: n }, () => []);

  // Build the graph
  // graph[u] = [v, probability]
  // graph[v] = [u, probability]
  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const probability = succProb[i];

    graph[u].push([v, probability]);
    graph[v].push([u, probability]);
  }

  // [probability, node]
  const maxHeap = new MaxPriorityQueue({ priority: (x) => x[1] });
  maxHeap.enqueue([start_node, 1]);
  const maxProbability = new Array(n).fill(0);
  maxProbability[start_node] = 1;

  while (!maxHeap.isEmpty()) {
    const [currentNode, currentProbability] = maxHeap.dequeue().element;

    if (currentNode === end_node) return currentProbability;
    if (maxProbability[currentNode] > currentProbability) continue;

    for (const [neighbor, probability] of graph[currentNode]) {
      const newProbability = currentProbability * probability;

      if (newProbability > maxProbability[neighbor]) {
        maxProbability[neighbor] = newProbability;
        maxHeap.enqueue([neighbor, newProbability]);
      }
    }
  }

  return 0;
};
