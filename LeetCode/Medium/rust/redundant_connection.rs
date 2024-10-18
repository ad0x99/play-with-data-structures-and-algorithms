/**
 * https://leetcode.com/problems/redundant-connection/
 *
 * Union-Find Approach
 *
 * Idea: We have a undirected graph that exists one additional edge which forms a cycle. Therefore, we want to make the graph acyclic by removing the additional edge.
 *
 * The approach here is we will build a acyclic graph using Union-Find. While building the graph, if we found a cycle, meaning two nodes have the same root, it means, we found the additional edge.
 *
 * Implementation
 *
 * The UnionFindGraph includes 3 methods:
 *
 * - The isCycleFound method is used to add a edge between 2 nodes to form a graph, and check the cycle graph at the same time
 * - The find method is used to find the root of a node
 * - The union method is used to merge two nodes to form a graph
 *
 * We traverse through each pair of nodes in the edges, and call the isCycleFound to add those 2 nodes to form a single graph.
 *
 * If the method returns true, that means, while building the graph, we found a cycle where 2 nodes have the same root. We then return those 2 nodes.
 *
 * Time complexity: O(n), where n is the number of nodes in the graph.
 *
 * Space complexity: O(n), where n is the length of parent and height.
 */
struct UnionFindGraph {
    parent: Vec<i32>,
    height: Vec<i32>,
}

impl UnionFindGraph {
    fn new(number_of_nodes: usize) -> Self {
        UnionFindGraph {
            parent: vec![-1; number_of_nodes + 1],
            height: vec![1; number_of_nodes + 1],
        }
    }

    fn is_cycle_found(&mut self, u: usize, v: usize) -> bool {
        let root_u = self.find(u);
        let root_v = self.find(v);

        // If found a cycle
        if root_u == root_v {
            return true;
        }

        // Merge two nodes
        self.union(root_u, root_v);
        false
    }

    fn find(&mut self, node: usize) -> usize {
        let mut root = node;

        // Find root node
        while self.parent[root] != -1 {
            root = self.parent[root] as usize;
        }

        // Path compression - assigning all vertices in the same path from vertex to root to be the same root to optimize finding root of a node process
        let mut current = node;
        while current != root {
            let parent = self.parent[current] as usize;
            self.parent[current] = root as i32;
            self.height[current] = 1;
            current = parent;
        }

        root
    }

    /** Merge 2 nodes by making a node the root of the other */
    fn union(&mut self, u: usize, v: usize) {
        // The node with higher height will be the parent of the shorter vertex for optimization
        // The purpose is to make the graph as short as possible when merging 2 nodes.
        if self.height[u] > self.height[v] {
            self.parent[v] = u as i32;
        } else if self.height[u] < self.height[v] {
            self.parent[u] = v as i32;
        } else {
            self.parent[u] = v as i32;
            self.height[v] += 1;
        }
    }
}

impl Solution {
    pub fn find_redundant_connection(edges: Vec<Vec<i32>>) -> Vec<i32> {
        let mut union_find_graph = UnionFindGraph::new(edges.len());

        for edge in edges {
            let u = edge[0] as usize;
            let v = edge[1] as usize;

            if union_find_graph.is_cycle_found(u, v) {
                return vec![u as i32, v as i32];
            }
        }

        vec![]
    }
}
