/**
 * https://leetcode.com/problems/all-paths-from-source-to-target/
 *
 * DFS Approach
 *
 * 1. We create an currentPath array to store the current path being explored, and an paths array to store all valid paths found.
 *
 * 2. The dfs function takes the current node as input.
 * - 2.1: Base case: If the current node is the target node, it means the current path is a valid path from the source to the target, we then append the current path to the paths array.
 *
 * - 2.2 : Explore neighbors: We add the current node to the currentPath array, and traverse through each neighbors of the current node.
 *
 * - 2.3: In side the loop, we recursively call dfs function for each neighbor of the current node.
 *
 * - 2.4: After exploring the current node's path, we remove the current node from the currentPath (backtrack) to explore other paths.
 *
 * 3. Finally, we return the paths array, which contains all the valid paths from the source to the target node.
 *
 * Time complexity: O(n * 2^n), because in a directed acyclic graph (DAG) with n nodes, the number of paths can be exponential in n. Specifically, there can be up to 2^(n-1) paths.
 *
 * Space complexity: O(n), where n is the number of nodes in the graph.
 */
const allPathsSourceTarget = (graph) => {
  const target = graph.length - 1;
  const currentPath = [];
  const paths = [];

  const dfs = (node) => {
    // Base case: if the current node is the target node
    if (node === target) {
      paths.push([...currentPath, node]);
      return;
    }

    // Add the current node to the path
    currentPath.push(node);

    // Explore each neighbor of the current node
    for (const neighbor of graph[node]) {
      dfs(neighbor);
    }

    // Remove the current node from the path (backtrack)
    currentPath.pop();
  };

  dfs(0);
  return paths;
};

/**
 * BFS Approach
 *
 * The core idea is the same as previous solution.
 *
 * In this solution, we will use a queue to keep track the current node and current path for each traversal.
 *
 * Time complexity: O(N * 2^N), because in a directed acyclic graph (DAG) with n nodes, the number of paths can be exponential in n. Specifically, there can be up to 2^(n-1) paths.
 *
 * Space complexity: O(n), where n is the length of the queue.
 */
const allPathsSourceTarget = (graph) => {
  const target = graph.length - 1;
  const paths = [];
  const queue = [[0, [0]]]; // [node, path]

  while (queue.length) {
    const [node, path] = queue.shift();

    // If we reached the target node, add the current path to the result
    if (node === target) {
      paths.push(path);
    }

    // Explore each neighbor of the current node
    for (const neighbor of graph[node]) {
      queue.push([neighbor, [...path, neighbor]]);
    }
  }

  return paths;
};
