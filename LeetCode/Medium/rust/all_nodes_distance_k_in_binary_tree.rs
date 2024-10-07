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
 * 4. BFS Traversal:  As long as the queue is not empty, where traverse through each node in the queue. In each iteration:
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
use std::cell::RefCell;
use std::collections::{HashMap, HashSet, VecDeque};
use std::rc::Rc;

impl Solution {
    pub fn distance_k(
        root: Option<Rc<RefCell<TreeNode>>>,
        target: Option<Rc<RefCell<TreeNode>>>,
        k: i32,
    ) -> Vec<i32> {
        let mut graph = HashMap::new();
        Self::build_graph(&root, &mut graph);

        let mut queue: VecDeque<(Rc<RefCell<TreeNode>>, i32)> = VecDeque::new();
        let target = target.unwrap();
        queue.push_back((target.clone(), 0));

        let mut visited = HashSet::new();
        visited.insert(target.borrow().val);

        let mut result = Vec::new();

        while let Some((node, distance)) = queue.pop_front() {
            if distance == k {
                result.push(node.borrow().val);
            } else if distance < k {
                if let Some(neighbors) = graph.get(&node.borrow().val) {
                    for neighbor in neighbors {
                        if !visited.contains(&neighbor.borrow().val) {
                            visited.insert(neighbor.borrow().val);
                            queue.push_back((neighbor.clone(), distance + 1));
                        }
                    }
                }
            }
        }

        result
    }

    fn build_graph(
        node: &Option<Rc<RefCell<TreeNode>>>,
        graph: &mut HashMap<i32, Vec<Rc<RefCell<TreeNode>>>>,
    ) {
        if let Some(node) = node {
            let node_val = node.borrow().val;
            graph.entry(node_val).or_insert(vec![]);

            if let Some(left) = &node.borrow().left {
                let left_val = left.borrow().val;
                graph.entry(left_val).or_insert(vec![]);

                graph.get_mut(&node_val).unwrap().push(left.clone());
                graph.get_mut(&left_val).unwrap().push(node.clone());

                Self::build_graph(&node.borrow().left, graph);
            }

            if let Some(right) = &node.borrow().right {
                let right_val = right.borrow().val;
                graph.entry(right_val).or_insert(vec![]);

                graph.get_mut(&node_val).unwrap().push(right.clone());
                graph.get_mut(&right_val).unwrap().push(node.clone());

                Self::build_graph(&node.borrow().right, graph);
            }
        }
    }
}
