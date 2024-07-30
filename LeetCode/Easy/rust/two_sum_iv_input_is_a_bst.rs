/**
 * https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: We iterate through each node, calculate the complement of a node's value has been encountered before and store that complement into a Set. This allows us to find two nodes whose sum equals the target value k by using the complement result.
 *
 * Implementation
 *
 * 1. We initialize a seen set to store the complement of node values encountered so far.
 *
 * 2. We create a queue for Breadth-First Search (BFS) traversal.
 *
 * 3. In the dfs function, we perform a level-order traversal of the binary tree using BFS. For each node visited:
 * - 3.1: We calculate the complement as `k - node.val`.
 *
 * - 3.2: Base case: If the current node's value exists in the seen set. It means a pair of nodes with sum k is found, and we return true.
 *
 * - 3.3: After that, we add the current node's value to the seen set for future checks.
 *
 * - 3.4: If the `node.left` child exists, we add it to the queue. This ensures that the left child is processed in the next iteration of the loop at the appropriate level (one level deeper than the current node).
 *
 * - 3.5: Similarly, if the `node.right` child exists, it's also added to the queue.
 *
 * 4. If no pair of nodes with sum k is found during the traversal, we return false.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n) + O(n) = O(n), where n is the number of nodes in the queue, and the length of seen Set.
 */
use std::cell::RefCell;
use std::collections::HashSet;
use std::rc::Rc;

impl Solution {
    pub fn find_target(root: Option<Rc<RefCell<TreeNode>>>, k: i32) -> bool {
        if root.is_none() {
            return false;
        }

        let mut seen = HashSet::new();
        let mut queue = vec![root.unwrap()];

        while let Some(node) = queue.pop() {
            let node_val = node.borrow().val;
            let complement = k - node_val;

            if seen.contains(&node_val) {
                return true;
            }
            seen.insert(complement);

            if let Some(left) = node.borrow().left.clone() {
                queue.push(left)
            }
            if let Some(right) = node.borrow().right.clone() {
                queue.push(right)
            }
        }

        false
    }
}

/**
 * Depth-First Search (DFS) Approach
 *
 * The same idea as BFS approach, but instead of using BFS, we'll use DFS for traversal.
 *
 * The core logic is the same.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the number of node.val in the seen Set.
 */
use std::cell::RefCell;
use std::collections::HashSet;
use std::rc::Rc;

impl Solution {
    pub fn find_target(root: Option<Rc<RefCell<TreeNode>>>, k: i32) -> bool {
        let mut seen = HashSet::new();
        Self::dfs(&root, k, &mut seen)
    }

    fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, k: i32, seen: &mut HashSet<i32>) -> bool {
        if let Some(n) = node {
            let node_borrow = n.borrow();

            if seen.contains(&node_borrow.val) {
                return true;
            }
            seen.insert(k - node_borrow.val);

            return Self::dfs(&node_borrow.left, k, seen) || Self::dfs(&node_borrow.right, k, seen);
        }

        false
    }
}
