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
use std::collections::VecDeque;

impl Solution {
    pub fn is_bipartite(graph: Vec<Vec<i32>>) -> bool {
        let n = graph.len();
        let mut colors = vec![-1; n]; // -1 means not visited, 0 = red, 1 = black
        let mut is_bipartite_graph = true;

        fn dfs(
            graph: &Vec<Vec<i32>>,
            colors: &mut Vec<i32>,
            u: usize,
            color: i32,
            is_bipartite_graph: &mut bool,
        ) {
            // If we already know the graph is not bipartite, exit early
            if !*is_bipartite_graph {
                return;
            }

            colors[u] = color;

            for &v in &graph[u] {
                if colors[v as usize] == -1 {
                    // Color all its adjacent vertices with the opposite color
                    dfs(graph, colors, v as usize, 1 - color, is_bipartite_graph);
                } else if colors[v as usize] == color {
                    *is_bipartite_graph = false;
                    return;
                }
            }
        }

        for u in 0..n {
            // If a vertex u has not been visited
            if colors[u] == -1 {
                dfs(&graph, &mut colors, u, 0, &mut is_bipartite_graph);
                // Early exit from the main loop
                if !is_bipartite_graph {
                    return false;
                }
            }
        }

        is_bipartite_graph
    }
}
