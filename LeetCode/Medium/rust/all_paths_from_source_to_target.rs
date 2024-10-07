/**
 * https://leetcode.com/problems/all-paths-from-source-to-target/
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
impl Solution {
    pub fn all_paths_source_target(graph: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut current_path = Vec::new();
        let mut paths = Vec::new();

        fn dfs(
            graph: &Vec<Vec<i32>>,
            node: usize,
            current_path: &mut Vec<i32>,
            paths: &mut Vec<Vec<i32>>,
        ) {
            // Base case: if the current node is the target node
            if node == graph.len() - 1 {
                let mut path = current_path.clone();
                path.push(node as i32);
                paths.push(path);
                return;
            }

            // Add the current node to the path
            current_path.push(node as i32);

            // Explore each neighbor of the current node
            for &neighbor in &graph[node] {
                dfs(graph, neighbor as usize, current_path, paths);
            }

            // Remove the current node from the path (backtrack)
            current_path.pop();
        }

        dfs(&graph, 0, &mut current_path, &mut paths);
        paths
    }
}

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
use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;

impl Solution {
    pub fn all_paths_source_target(graph: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut result = Vec::new();
        let mut queue = VecDeque::new();
        let target = (graph.len() - 1) as i32;

        queue.push_back((0, vec![0])); // (current_node, current_path)

        while let Some((node, path)) = queue.pop_front() {
            // If we reached the target node, add the current path to the result
            if node == target {
                result.push(path.clone());
            } else {
                // Explore each neighbor of the current node
                for &neighbor in &graph[node as usize] {
                    let mut new_path = path.clone();

                    new_path.push(neighbor);
                    queue.push_back((neighbor, new_path));
                }
            }
        }

        result
    }
}
