/**
 * https://leetcode.com/problems/network-delay-time/description/
 *
 * Dijkstra's Algorithm Approach
 *
 * Idea: In this problem, we want to calculate the time it takes for a signal to travel from a starting node k to all other nodes in a network, or determine if some nodes are unreachable.
 *
 * The goal is to find the minimum time a node takes to send the signal to all other nodes in the network. That means we want to find the shortest path from a node k to other nodes such that the signal can be reached to all nodes.
 *
 * Typically, we can use Dijkstra's algorithm for finding the shortest paths from a source node to all other nodes in a weighted graph.
 *
 * In this case, the network represents as a graph with each node connects to each other using weighted edge (time), meaning time taken to travel between them.
 *
 * - First step, we will find the shortest path from node k to other nodes. We will have a list of distances at each node, representing the distance from k to that node.
 * - Next step, we will find the biggest distance which represents the minimum time to travel all nodes.
 * - Finally, we return that distance.
 *
 * Implementation
 *
 * 1. Firstly, we need to build the graph to represent the connection between nodes and its weighted edge (distance).
 *
 * 2. We need some data structures:
 * - 2.1: An array `distance` to store the shortest distance from the starting node k to each node. We initialize Infinity distance for each node, representing the distance has not been processed.
 *
 * - 2.2: A map which is called timeWeight to store the time (weight) between 2 connected nodes.
 *
 * - 2.3: An adjacency list to represent the connection between nodes.
 *
 * - 2.4: A min-heap to store nodes with their current shortest estimated distance.
 *
 * - 2.5: A set to keep track of visited nodes, meaning their shortest path has been determined.
 *
 * 3. Build the graph: We iterate through times list to process each edge. For each edge [fromA, toB, time]:
 * - 3.1: We update `timeWeight[fromA][toB]` to store the time (weight) between nodes `fromA` (A) and `toB` (B)
 *
 * - 3.2: And we update `adjacent[fromA]` to include node `toB` as a direct neighbor
 *
 * 4. Find shortest path: We add the starting node k to the heap with a distance of 0. This means the distance from k to itself is 0. And, the distance of node k in the distance array is set to 0.
 *
 * 5. As long as the heap is not empty, we process each node in the heap.
 * - 5.1: We need to sort the heap by distance to ensure the node with the shortest distance is processed first.
 *
 * - 5.2: We extract the smallest distance from the heap to process.
 *
 * - 5.3: If the node has already been visited (its shortest path is already determined), we skip. Otherwise, we mark the current node as visited.
 *
 * - 5.4: Relaxing Edges: We traverse through each neighbor of current node.
 *
 * - 5.5: If a shorter path to that neighbor can be found through the current node, we update the distance of the neighbor and push the neighbor into the heap with the updated distance for processing more neighbors.
 *
 * 6. After all nodes have been processed, we find the maximum value in the distance array (ignoring the 0th index, as node indices are 1-based).
 *
 * 7. Finally, If the maximum distance is still Infinity, it means that some nodes are unreachable from the starting node k, and we return -1. Otherwise, we return the maximum distance, which represents the time it takes for the signal to reach the farthest node.
 *
 * Time complexity: O((m + n) log n), where m is the number of edges, and n is the number of nodes.
 *
 * Space complexity: O(m + n)
 */
use std::cmp::Reverse;
use std::collections::{BinaryHeap, HashMap, HashSet};

impl Solution {
    pub fn network_delay_time(times: Vec<Vec<i32>>, n: i32, k: i32) -> i32 {
        let n = n as usize;
        let mut distance = vec![i32::MAX; n + 1];
        let mut time_weight = HashMap::new();
        let mut adjacent = vec![vec![]; n + 1];

        // Build the graph
        for time in &times {
            let (from_a, to_b, time) = (time[0] as usize, time[1] as usize, time[2]);
            time_weight.insert((from_a, to_b), time);
            adjacent[from_a].push(to_b);
        }

        // Push the starting node (k) into heap - [distance, node]
        // The distance from k to itself is 0
        let mut heap = BinaryHeap::new();
        heap.push(Reverse((0, k as usize)));
        let mut visited = HashSet::new();
        distance[k as usize] = 0;

        // Process nodes
        // Sort the heap to visit the node with shortest distance first
        while let Some(Reverse((current_distance, node))) = heap.pop() {
            // If the current node is already visited, skip it
            if !visited.insert(node) {
                continue;
            }

            // Relax all edges from the current node
            for &neighbor in &adjacent[node] {
                // If a shorter path to that neighbor can be found through the current node.
                let current_weight = *time_weight.get(&(node, neighbor)).unwrap();
                let new_distance = current_weight + current_distance;

                if (distance[neighbor] > new_distance) {
                    // If a shorter path is found, we update the distance of the neighbor and push the neighbor into the heap with the updated distance.
                    distance[neighbor] = new_distance;
                    heap.push(Reverse((new_distance, neighbor)));
                }
            }
        }

        // Find the maximum distance from the start node to all other nodes
        let max_distance = distance[1..].iter().cloned().max().unwrap();

        // If the maximum distance is still i32::MAX, return -1 (unreachable nodes exist)
        if max_distance == i32::MAX {
            -1
        } else {
            max_distance
        }
    }
}
