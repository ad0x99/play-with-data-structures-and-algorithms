/**
 * https://leetcode.com/problems/clone-graph/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: We want to traverse through each node in the graph, make a copy of the node, and build a new graph using the copied node.
 *
 * In graphs, nodes can have cycles (a node might eventually reference itself through a series of edges) and nodes can be shared (multiple nodes can reference the same neighbor). To handle this, we need to keep track of nodes that have already been cloned.
 *
 * We want to make sure that each node, we only make one copied version of it. To do that, we will use a Map to keep track the cloned node.
 *
 * Whenever we want to use the cloned node, we just need to check the Map to get the cloned node first, otherwise, we will make a copy of the current node and map it into the Map to use later.
 *
 * Implementation
 *
 * 1. We create a clonedNode map to keep track of already cloned nodes. This prevents creating duplicate copies of the same node.
 *
 * 2. The clone function recursively clone the graph.
 * - 2.1: Base Case: If the current node is null, we return null.
 *
 * - 2.2: Check for Existing Clone: If the current node has already been cloned, we return the cloned version from the clonedNode map. We don't need to clone the same node twice.
 *
 * - 2.3: We create a new node with the same value as the current node to make a new copied node.
 *
 * - 2.4: We then map the current node to the newly copied node in the clonedNode map.
 *
 * - 2.5: Clone Neighbors: We recursively clone each neighbor of the current node and add the cloned neighbor to the neighbors list of the copied node.
 *
 * - 2.6: After each recursive call, we return the newly created copied node for the next recursion.
 *
 * 3: We call the clone function with the root node to start the cloning process.
 *
 * Time complexity: O(V + E), where V is the number of nodes and E is the number of edges in the graph.
 *
 * Space complexity: O(V + E), due to the clonedNode map and the recursion stack.
 */
const cloneGraph = (node) => {
  // Map the old node to the new copied node
  const clonedNode = new Map();

  const clone = (currentNode) => {
    // Edge case: If the node is null, return null
    if (!currentNode) return null;

    // If the node is already copied, we return the copied node
    if (clonedNode.has(currentNode)) {
      return clonedNode.get(currentNode);
    }

    // Copy the current node with its value
    const copiedNode = new Node(currentNode.val);
    // Map the current node to the new copied node
    clonedNode.set(currentNode, copiedNode);

    // Recursively clone all current node's neighbors
    for (const neighbor of currentNode.neighbors) {
      // Add each cloned neighbor to the neighbors list of the copied node
      const copiedNeighbor = clone(neighbor);
      copiedNode.neighbors.push(copiedNeighbor);
    }

    return copiedNode;
  };

  return clone(node);
};

/**
 * Breadth-First Search (BFS) Approach
 *
 * Time complexity: O(V + E), where V is the number of nodes and E is the number of edges in the graph.
 *
 * Space complexity: O(V + E), due to the clonedNode map and the queue.
 */
const cloneGraph = (node) => {
  // Edge case: If the node is null, return null
  if (!node) return null;

  // Map the old node to the new copied node
  const clonedNode = new Map();
  const queue = [node];

  // Set the current node to map with the new copied node
  clonedNode.set(node, new Node(node.val));

  // As long as there are nodes to process
  while (queue.length) {
    const currentNode = queue.shift();
    const copiedNode = clonedNode.get(currentNode);

    for (const neighbor of currentNode.neighbors) {
      // If the neighbor is not copied
      if (!clonedNode.has(neighbor)) {
        // Add neighbor to the queue to explore further
        queue.push(neighbor);
        // Map the current neighbor to the new copied neighbor
        clonedNode.set(neighbor, new Node(neighbor.val));
      }

      // Add each cloned neighbor to the neighbors list of the copied node
      copiedNode.neighbors.push(clonedNode.get(neighbor));
    }
  }

  return clonedNode.get(node);
};
