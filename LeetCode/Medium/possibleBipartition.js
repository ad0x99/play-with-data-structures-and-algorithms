/**
 * https://leetcode.com/problems/possible-bipartition/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: We can model the problem as a bipartite graph problem. In a bipartite graph, the vertices can be divided into two disjoint and independent sets such that no two graph vertices within the same set are adjacent.
 *
 * We represent each person as a node and each dislike relationship is an edge between 2 nodes in the graph.
 *
 * We can split everyone into 2 groups if there is no dislike edge between 2 nodes.
 *
 * We will paint each node using 2 colors: red(0), and black (1). The color represents the dislike relationship between nodes. If 2 adjacent nodes have the same color, that means, there is a dislike relationship between them.
 *
 * For each node, we attempt to color all of its adjacent child nodes (neighbors) share the same color.
 *
 * If an adjacent node is already colored with the same color, a dislike relationship is detected, it means the graph is not bipartite.
 *
 * If dislike relationships are found after coloring all reachable vertices, the portion of the graph explored so far is bipartite.
 *
 * Implementation
 *
 * 1. We create a graph variable to store the person and dislike relationships.
 *
 * 2. We create an array colors to keep track of the color assigned to each node. A value of -1 means the node hasn't been visited, 0 means the node is colored "red", and 1 means the node is colored "black". And we use isPossibleBipartition variable to keep track the bipartite result.
 *
 * 3. We iterate through each person in the dislikes array to build person and dislike relationship graph. The graph[i] represents the i person which contains its neighbors.
 *
 * 4. The DFS function takes a node and a color to paint the node.
 * - 4.1: We first color the current node
 *
 * - 4.2: After that, we traverse all the adjacent nodes.
 *
 * - 4.3: If the neighbor is not colored, we color it with the opposite color.
 *
 * - 4.4: If the neighbor is already colored with the same color of the current node, it means, a dislike relationship is detected. We update isPossibleBipartition to be false, and return.
 *
 * 5. We iterate through each person (from 1 to nth person).
 * - 5.1: If the current node is not colored, start a DFS from that node to explore all of its adjacent nodes.
 *
 * - 5.2: If the DFS returns false, we return false.
 *
 * 6. If the entire graph is traversed without finding a conflict, we return true, indicating that we can split everyone into 2 groups.
 *
 * Time complexity: O(v + e), where v is the number of nodes (vertices), and e is the number of edges.
 *
 * Space complexity: O(v + e)
 * - Graph: O(v + e)
 * - Colors: O(v)
 * - DFS: O(v)
 */
const possibleBipartition = (n, dislikes) => {
  const graph = Array.from({ length: n + 1 }, () => []);
  const colors = new Array(n + 1).fill(-1);
  let isPossibleBipartition = true;

  // Build person and dislike relationship graph
  for (const [firstPerson, secondPerson] of dislikes) {
    graph[firstPerson].push(secondPerson);
    graph[secondPerson].push(firstPerson);
  }

  // Use 2 colors to represent 2 groups of people
  // 0 = red, 1 = black
  const dfs = (node, color) => {
    // If we already know the graph is not bipartite, exit early
    if (!isPossibleBipartition) return;

    // Color the current node
    colors[node] = color;

    // Traverse all the adjacent nodes
    for (const neighbor of graph[node]) {
      // If the neighbor is not colored, color it with the opposite color
      if (colors[neighbor] === -1) {
        dfs(neighbor, 1 - color);
      } else if (colors[neighbor] === color) {
        // If the neighbor is already colored with the same color, return false
        isPossibleBipartition = false;
        return;
      }
    }
  };

  for (let person = 1; person <= n; person++) {
    // If the node is not colored, start a DFS from that node
    if (colors[person] === -1) {
      dfs(person, 0);
      if (!isPossibleBipartition) return false;
    }
  }

  return isPossibleBipartition;
};
