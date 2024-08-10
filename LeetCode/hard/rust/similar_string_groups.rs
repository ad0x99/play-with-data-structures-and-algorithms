/**
 * https://leetcode.com/problems/similar-string-groups/
 *
 * Union-Find Approach
 *
 * Idea: We assume each string as a vertex (node) in a graph, where an edge between two vertices exists if the corresponding strings are similar (they can be made identical by swapping at most two characters).
 *
 * For example, we have the following strings: ["abc", "acb", "bac", "xyz"]
 *
 * The graph should look like this:
 *
 *```js
 *      abc
 *     /  \
 *   acb - bac     xyz
 *```
 *
 * Nodes "abc", "acb", and "bac" form a connected component, meaning they are all similar to each other. The "xyz" is isolated, meaning it forms its own group.
 *
 * The goal is to count the number of connected components (groups of similar strings) in this graph.
 *
 * - Union-Find is used to efficiently manage and merge these groups.
 *
 * - By using path compression and union operations, the code ensures that the time complexity for finding and merging groups remains nearly constant.
 *
 * - The similarity check (isSimilar) ensures that only relevant connections (edges) between nodes are considered, thereby building the correct groups.
 *
 * Implementation
 *
 * 1. We build a UnionFindGraph to represent each string as vertex in the graph.
 *
 * 2. The UnionFindGraph contains 4 methods:
 * - 2.1: The `find` method: This method finds the root of the set to which vertex belongs. It uses path compression to optimize future lookups by directly linking nodes to their root. That means, every time we traverse through a vertex, we assign the root of all vertices in the same path from vertex to root to be the same root.
 *
 * - 2.2: The `union` method: This method connects two nodes (u and v) by setting the parent of u to v, effectively merging the two sets.
 *
 * - 2.3: The `countGroups` method: This method counts the number of groups by iterating over all elements and checking how many are roots (have a parent value of -1). Each root represents a distinct group. Because the each group has only one root, therefore, the number of root is the number of group.
 *
 * - 2.4: The `isSimilar` method: This method checks whether two strings a and b are similar. Two strings are considered similar if they are identical or if they can become identical by swapping two different characters. The method counts the positions where a and b differ and verifies that these differences can be swapped to make the strings identical.
 *
 * 3. In the initialization logic, we create a `UnionFindGraph` instance with n nodes, where n is the number of strings.
 *
 * 4. Similarity Check and Union Operation: We iterate over all pairs of strings and check if they are similar.
 * - 4.1:  If they are similar, we find the roots of their respective sets using `find` method and merge them into the same graph using `union` method.
 *
 * 5. Counting Groups: After all pairs have been processed, we call `countGroups` to determine how many distinct groups exist.
 *
 * Time complexity: O(n ^ 2 * m) where m is length of a string, and n is the number of strings.
 *
 * Space complexity: O(n)
 */
struct UnionFindGraph {
    parent: Vec<i32>,
}

impl UnionFindGraph {
    fn new(n: usize) -> Self {
        Self {
            parent: vec![-1; n],
        }
    }

    // Find function with path compression
    fn find(&mut self, vertex: usize) -> usize {
        let mut root = vertex;

        // Find the root of the component
        while self.parent[root] != -1 {
            root = self.parent[root] as usize;
        }

        // Path compression
        let mut current = vertex;
        while current != root {
            let parent = self.parent[current] as usize;
            self.parent[current] = root as i32;
            current = parent;
        }

        root
    }

    // Merge two components
    fn union(&mut self, u: usize, v: usize) {
        self.parent[u] = v as i32;
    }

    // Count the number of groups (components)
    fn count_groups(&self) -> i32 {
        self.parent.iter().filter(|&&p| p == -1).count() as i32
    }

    // Check if two strings are similar
    fn is_similar(a: &str, b: &str) -> bool {
        // If they are identical
        if a == b {
            return true;
        }

        // Counts the positions where a and b differ
        let mut different_positions = Vec::new();
        for (i, (char_a, char_b)) in a.chars().zip(b.chars()).enumerate() {
            if char_a != char_b {
                different_positions.push(i);
            }
        }

        // If more than 2 different position, that means, we can't swap two 2 positions to make both strings become identical
        if different_positions.len() != 2 {
            return false;
        }

        // If they can become identical by swapping two different characters
        let first_pos = different_positions[0];
        let second_pos = different_positions[1];
        a.chars().nth(first_pos) == b.chars().nth(second_pos)
            && a.chars().nth(second_pos) == b.chars().nth(first_pos)
    }
}

impl Solution {
    pub fn num_similar_groups(strs: Vec<String>) -> i32 {
        let n = strs.len();
        let mut union_find_graph = UnionFindGraph::new(n);

        for i in 0..n {
            for j in i + 1..n {
                if UnionFindGraph::is_similar(&strs[i], &strs[j]) {
                    let u = union_find_graph.find(i);
                    let v = union_find_graph.find(j);

                    if u != v {
                        union_find_graph.union(u, v);
                    }
                }
            }
        }

        union_find_graph.count_groups()
    }
}

/**
 * Breath-First Search (BFS) + Depth-First Search (DFS) Approach
 *
 * Idea: We iterate through all the strings. If a string hasn't been visited, we trigger a BFS, marking all strings in that connected component (group) as visited.
 *
 * Each BFS call corresponds to discovering a new group, so we increment the group count (numGroups) to keep track how many groups have been discovered.
 *
 * Time complexity: O(n ^ 2 * m) where n is the number of strings and m is the length of each string.
 *
 * Space complexity: O(n) for the visited array and the BFS queue or recursion stack in DFS.
 */
use std::collections::VecDeque;
impl Solution {
    pub fn num_similar_groups(strs: Vec<String>) -> i32 {
        let n = strs.len();
        let mut visited = vec![false; n];
        let mut num_groups = 0;

        for i in 0..n {
            if !visited[i] {
                num_groups += 1;
                // Choose either BFS or DFS for traversal
                Solution::bfs(i, &strs, &mut visited, n);
                // Solution::dfs(i, &strs, &mut visited, n);
            }
        }

        num_groups
    }

    fn bfs(start: usize, strs: &Vec<String>, visited: &mut Vec<bool>, n: usize) {
        let mut queue = VecDeque::new();
        queue.push_back(start);

        while let Some(current) = queue.pop_front() {
            visited[current] = true;

            for i in 0..n {
                if !visited[i] && Solution::is_similar(&strs[current], &strs[i]) {
                    visited[i] = true;
                    queue.push_back(i);
                }
            }
        }
    }

    fn dfs(index: usize, strs: &Vec<String>, visited: &mut Vec<bool>, n: usize) {
        visited[index] = true;

        for i in 0..n {
            if !visited[i] && Solution::is_similar(&strs[index], &strs[i]) {
                Solution::dfs(i, strs, visited, n);
            }
        }
    }

    fn is_similar(a: &str, b: &str) -> bool {
        let mut diff_count = 0;
        let a_chars: Vec<char> = a.chars().collect();
        let b_chars: Vec<char> = b.chars().collect();

        for i in 0..a.len() {
            if a_chars[i] != b_chars[i] {
                diff_count += 1;
            }
            if diff_count > 2 {
                return false;
            }
        }
        true
    }
}
