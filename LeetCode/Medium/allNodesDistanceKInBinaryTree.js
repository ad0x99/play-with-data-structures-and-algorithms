/**
 * https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/
 *
 * Graph + Breadth-First Search (BFS) Approach
 *
 * Idea: The problem requires us to find all nodes at a specific distance K from a given target node in a binary tree. This involves exploring both upward (towards the parent) and downward (towards children) directions from the target node.
 *
 * A binary tree is inherently unidirectional, it means we can only traverse from a parent to its children.
 *
 * In this case, by converting the binary tree to a graph, we introduce bidirectional edges between nodes (parent-child and child-parent connections). This allows us to move freely in both directions, making it easier to explore nodes at a specific distance.
 *
 * For example: tree = [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]
 *
 * ```js
 * // This is how graph looks like.
 *
 * {
 *    [3,5,1,6,2,0,8,null,null,7,4] => [ [5,6,2,null,null,7,4], [1,0,8] ],
 *    [5,6,2,null,null,7,4] => [ [3,5,1,6,2,0,8,null,null,7,4], [6], [2,7,4] ],
 *    [6] => [ [5,6,2,null,null,7,4] ],
 *    [2,7,4] => [ [5,6,2,null,null,7,4], [7], [4] ],
 *    [7] => [ [2,7,4] ],
 *    [4] => [ [2,7,4] ],
 *    [1,0,8] => [ [3,5,1,6,2,0,8,null,null,7,4], [0], [8] ],
 *    [0] => [ [1,0,8] ],
 *    [8] => [ [1,0,8] ]
 * }
 *
 *```
 * Implementation
 *
 * 1. Building the Graph: We iterate through the tree starting from the root node.
 * - 1.1: We create an adjacency list: For each node encountered, it checks if an entry exists for that node in the graph map (which is an adjacency list representation of the tree).
 *
 * - 1.2: If not present, we create a new empty array for that node in the graph map. This array will store the node's neighbors (children and parent).
 *
 * - 1.3: We add the node's left and right children to its neighbors list in the graph map (two-way connections are created for parent-child relationships).
 *
 * - 1.4: Recursive calls: We recursively call buildGraph function on both node.left and node.right to explore the entire tree and build the complete adjacency list representation in the graph map.
 *
 * 2. We create a queue for Breadth-First Search (BFS) traversal. It starts with a list containing the target node and its distance (0).
 *
 * 3. We create a visited set to keep track of nodes already explored to avoid cycles. And, the result array will eventually store the nodes at distance k from the target.
 *
 * 4. BFS Traversal:  As long as the queue is not empty, we traverse through each node in the queue. In each iteration:
 * - 4.1: We dequeue the current node and its distance ([node, distance]) from the queue.
 *
 * - 4.2: Check distance: If the current distance is equal to k, it means we've reached nodes at the desired distance. We then add their values to the result array.
 *
 * - 4.3: If the current distance is already greater than k, it signifies that further exploration won't find closer nodes (as BFS explores levels), so we break the loop to avoid unnecessary processing.
 *
 * - 4.4: Explore neighbors: For each neighbor of the current node: If the neighbor hasn't been visited yet, we add the neighbor to the queue with an incremented distance (moving to the next level) and mark the neighbor as visited to prevent revisiting.
 *
 * Time complexity: O(n), where n is the number of nodes of the tree.
 * - buildGraph: O(n)
 * - BFS: O(n)
 *
 * Space complexity: O(n), where n is the number of nodes of the tree.
 * - graph: O(n)
 * - queue: O(n)
 * - visited set: O(n)
 */
const distanceK = (root, target, k) => {
  const graph = new Map();
  buildGraph(root, graph);

  const queue = [[target, 0]]; // [node, distance]
  const visited = new Set();
  visited.add(target);
  const result = [];

  while (queue.length) {
    const [node, distance] = queue.shift();

    if (distance === k) {
      result.push(node.val);
    }

    if (distance > k) {
      break;
    }

    for (const neighbor of graph.get(node)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return result;
};

const buildGraph = (node, graph) => {
  if (!node) return;

  if (!graph.has(node)) {
    graph.set(node, []);
  }

  if (node.left) {
    if (!graph.has(node.left)) {
      graph.set(node.left, []);
    }
    graph.get(node).push(node.left);
    graph.get(node.left).push(node);
    buildGraph(node.left, graph);
  }

  if (node.right) {
    if (!graph.has(node.right)) {
      graph.set(node.right, []);
    }
    graph.get(node).push(node.right);
    graph.get(node.right).push(node);
    buildGraph(node.right, graph);
  }
};
