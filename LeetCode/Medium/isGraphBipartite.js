/**
 * https://leetcode.com/problems/is-graph-bipartite/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: We paint each node using two colors (commonly 0 and 1, or red and black) to represent the two sets.
 *
 * For each vertex, we attempt to color all its adjacent vertices with the opposite color.
 *
 * If a graph is bipartite, we can color it such that no two adjacent vertices share the same color.
 *
 * If an adjacent vertex is already colored with the same color, a conflict is detected, it means the graph is not bipartite.
 *
 * If no conflicts are found after coloring all reachable vertices, the portion of the graph explored so far is bipartite.
 *
 * Implementation:
 *
 * 1. We create an array colors to keep track of the color assigned to each vertex. A value of -1 means the vertex hasn't been visited, 0 means the vertex is colored "red," and 1 means the vertex is colored "black."
 *
 * 2. DFS: The dfs function takes a vertex u and a color.
 *
 * 3. If the graph is already determined to be not bipartite (isBipartiteGraph === false), we return immediately.
 *
 * 4. The current vertex u is colored with the provided color.
 *
 * 5. We iterate through all adjacent vertices v of u.
 * - 5.1: If v has not been colored (colors[v] === -1), we call dfs recursively with v and the opposite color (1 - color). It means, for each vertex, we attempt to color all its adjacent vertices with the opposite color.
 *
 * - 5.2: If v has already been colored and has the same color as u, the graph is not bipartite, so we set isBipartiteGraph to false, and return immediately.
 *
 * 6. If the entire graph is traversed without finding a conflict, we return true, indicating that the graph is bipartite.
 *
 * Time complexity: O(n), where n is the number of edges.
 *
 * Space complexity: O(m), where m is the number of vertices.
 */
const isBipartite = (graph) => {
  const n = graph.length;
  const colors = new Array(n).fill(-1); // -1 means not visited, 0 = red, 1 = black
  let isBipartiteGraph = true;

  const dfs = (u, color) => {
    // If we already know the graph is not bipartite, exit early
    if (!isBipartiteGraph) return;

    colors[u] = color;

    for (const v of graph[u]) {
      if (colors[v] === -1) {
        // Color all its adjacent vertices with the opposite color
        dfs(v, 1 - color);
      } else if (colors[v] === color) {
        isBipartiteGraph = false;
        return;
      }
    }
  };

  for (let u = 0; u < n; u++) {
    // If a vertex u has not been visited
    if (colors[u] === -1) {
      dfs(u, 0);
      // Early exit from the main loop
      if (!isBipartiteGraph) return false;
    }
  }

  return isBipartiteGraph;
};
