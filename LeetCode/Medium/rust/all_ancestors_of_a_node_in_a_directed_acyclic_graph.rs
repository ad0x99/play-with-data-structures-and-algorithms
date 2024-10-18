/**
 * https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph/
 *
 * Topological Sort Approach
 *
 * Idea: We can see that each node is a vertex (node) in the graph, the edgeList can be represented as a graph where an edge from node A to node B indicates that node A is the ancestor of node B.
 *
 * Since we need to know all of the indirect and direct ancestors of a node, each time we explore a node, we want to keep track all of indirect and direct in the same time.
 *
 * Here, we will use a edgeMap to store the relationship such that the key is the current node and its value is the list direct ancestors that it depends on, it means the direct ancestor list of the current node.
 *
 * But, we want to get both indirect and direct ancestors, to do that, we will use a reachability map to store all the indirect and direct ancestors of a node based on the direct ancestors from edgeMap.
 *
 * Finally, we can use the reachability map to form a result.
 *
 * For example:
 * - numCourses = 8
 * - edgeList = [[0, 3], [0, 4], [1, 3], [2, 4], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6]]
 *
 * ```js
 * edgeMap(8) {
 *  0 => [],
 *  1 => [],
 *  2 => [],
 *  3 => [ 0, 1 ],
 *  4 => [ 0, 2 ],
 *  5 => [ 3 ],
 *  6 => [ 3, 4 ],
 *  7 => [ 2, 3 ]
 *
 * reachability(8) {
 *   0 => Set(0) {},
 *   1 => Set(0) {},
 *   2 => Set(0) {},
 *   3 => Set(2) { 0, 1 },
 *   4 => Set(2) { 0, 2 },
 *   5 => Set(3) { 3, 0, 1 },
 *   6 => Set(5) { 3, 0, 1, 4, 2 },
 *   7 => Set(4) { 2, 3, 0, 1 }
 * }
 *
 * result:
 * [
 *   [],
 *   [],
 *   [],
 *   [ 0, 1 ],
 *   [ 0, 2 ],
 *   [ 0, 1, 3 ],
 *   [ 0, 1, 2, 3, 4 ],
 *   [ 0, 1, 2, 3 ]
 * ]
 * ```
 *
 * Implementation
 *
 * 1. We create a map (`edgeMap`) where each key is a node, and its value is a list of ancestors that the current node depends on directly. It means, if we want to reach the current node, all of the ancestors in this list need to be reached first.
 *
 * 2. We create another map (`reachability`), where each key is a node, and its value is a set of all the ancestors that the current node can be reached from either directly or indirectly. It means, all the nodes in the list are ancestors of the current course.
 *
 * 3. The `DFS` function: For each node, we perform a DFS to determine all the ancestors that can be reached from the current node. During DFS, if a node A can reach node B, then A is a ancestor of B. We update the reachability set for B to include A. It means, we update the set of B to contain all of its ancestors.
 * - 3.1: We iterate through each node to explore all possible paths starting from each node.
 *
 * - 3.2: If the node hasn't been visited yet, we run DFS to explore all nodes that can be reached from it. It means we explore all the ancestor might be the indirect ancestor of the current node.
 *
 * 4: The `BFS` function: For each node, we perform a BFS starting from the current node to explore all directly reachable nodes (its ancestors) and mark them as reachable in the reachability map.
 * - 4.1: We create a queue to store a list of ancestors need to be explored.
 *
 * - 4.2: As long as the queue is not empty, we explore all the ancestors of the current node.
 *
 * - 4.3: If the ancestor is not visited yet, we mark the current ancestor as reachable for the current node by adding it to the ancestor list of the current node.
 *
 * - 4.4: We then add the ancestor to the queue to explore more higher ancestor.
 *
 * 5. The `buildAncestorList` build the ancestor list for each node by iterating through the reachability map and map the correct ancestors for each node.
 *
 * Time complexity: O(n + m log m), where n is the number of nodes (vertices), and m is the number of ancestor pairs (edges).
 * - edgeMap/reachability: O(n)
 * - DFS: O(m + n)
 * - BFS: O(m + n)
 * - buildAncestorList: O(m log m)
 *
 * Space complexity: O(m ^ 2 + n), where n is the number of nodes, and m is the number of ancestors
 * - edgeMap: O(m + n)
 * - reachability: O(m ^ 2), in the worst case.
 * - BFS/DFS: O(n), where n is the length of queue and recursion stack
 * - Ancestor List: O(n), where n is the number of ancestor nodes.
 */
use std::collections::{HashMap, HashSet, VecDeque};

struct TopologicalSort {
    n: usize,
    edge_map: HashMap<usize, Vec<usize>>,
    reachability: HashMap<usize, HashSet<usize>>,
}

impl TopologicalSort {
    pub fn new(number_of_nodes: usize, edge_list: Vec<Vec<usize>>) -> Self {
        let mut edge_map: HashMap<usize, Vec<usize>> = HashMap::new();
        let mut reachability: HashMap<usize, HashSet<usize>> = HashMap::new();

        // Initialize the adjacency list
        for node in 0..number_of_nodes {
            edge_map.insert(node, Vec::new());
            reachability.insert(node, HashSet::new());
        }

        // Build the graph - where key is child node, and value is the direct ancestor
        for edge in edge_list {
            let from = edge[0];
            let to = edge[1];
            edge_map.get_mut(&to).unwrap().push(from);
        }

        let mut topo = TopologicalSort {
            n: number_of_nodes,
            edge_map,
            reachability,
        };

        // Build ancestor list for each node using DFS
        for node in 0..number_of_nodes {
            topo.sort_bfs(node);
            // topo.sort_dfs(node, node);
        }

        topo
    }

    fn sort_bfs(&mut self, node: usize) {
        let mut queue = VecDeque::new();
        queue.push_back(node);

        while let Some(current_node) = queue.pop_front() {
            if let Some(ancestors) = self.edge_map.get(&current_node) {
                for &ancestor in ancestors {
                    if !self.reachability.get(&node).unwrap().contains(&ancestor) {
                        self.reachability.get_mut(&node).unwrap().insert(ancestor);
                        queue.push_back(ancestor);
                    }
                }
            }
        }
    }

    fn sort_dfs(&mut self, parent_node: usize, current_node: usize) {
        // Explore all the ancestor nodes of the current node
        if let Some(ancestors) = self.edge_map.get(&current_node).cloned() {
            for ancestor in ancestors {
                // If the ancestor has not been visited yet
                if !self
                    .reachability
                    .get(&parent_node)
                    .unwrap()
                    .contains(&ancestor)
                {
                    // Mark the current ancestor as reachable from the parent node
                    self.reachability
                        .get_mut(&parent_node)
                        .unwrap()
                        .insert(ancestor);
                    // Recursively traverse to collect all ancestors of the current ancestor if any
                    self.sort_dfs(parent_node, ancestor);
                }
            }
        }
    }

    pub fn build_ancestor_list(&self) -> Vec<Vec<usize>> {
        let mut ancestors = Vec::with_capacity(self.n);

        for node in 0..self.n {
            // Map the ancestor list for each node and sort the ancestor list
            let mut ancestor_list: Vec<usize> = self
                .reachability
                .get(&node)
                .unwrap()
                .iter()
                .copied()
                .collect();
            ancestor_list.sort_unstable();
            ancestors.push(ancestor_list);
        }

        ancestors
    }
}

impl Solution {
    pub fn get_ancestors(n: i32, edges: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let edges_usize: Vec<Vec<usize>> = edges
            .into_iter()
            .map(|e| e.into_iter().map(|v| v as usize).collect())
            .collect();
        let topo = TopologicalSort::new(n as usize, edges_usize);

        topo.build_ancestor_list()
            .into_iter()
            .map(|v| v.into_iter().map(|x| x as i32).collect())
            .collect()
    }
}
