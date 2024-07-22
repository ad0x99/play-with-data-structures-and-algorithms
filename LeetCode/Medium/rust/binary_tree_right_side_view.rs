/**
 * https://leetcode.com/problems/binary-tree-right-side-view/description/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: Find the rightmost node at each level of a binary tree and return their values in an array.
 *
 * 1. If the root is null (empty tree), return an empty array.
 *
 * 2. We create an array `queue` to store nodes during level-order traversal. Each element in the queue is an array [node, depth] where node is the current node and depth is its level in the tree.
 *
 * 3. We create an array ans to store the rightmost nodes of each level.
 *
 * 4. As long as there are nodes in the queue, we iterate through each node in the order of right node first, then the left node. In each iteration:
 * - 4.1: We dequeue the first node from the queue, and extract the node and its depth level ([node, depth])
 *
 * - 4.2: We check if depth is greater than or equal to the length of ans (because at each level, we only add 1 node to the ans which is the rightmost one, therefore, the length of ans is the level of depth of the current node), it means we've reached a new level.
 *
 * - 4.3: We then add `node.val` to the ans array as the rightmost node of the previous level. This ensures that the first node encountered at each depth is added to the ans array, which will be the rightmost node at that depth due to the order of traversal (right first, left later).
 *
 * 5. After that, we keep adding the right and left nodes to the queue (right child first, then left child), and their `depths + 1` which indicates a new level of depth.
 *
 * 6. After the traversal, we return ans array which contains the rightmost nodes at each level, representing the right side view of the tree.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the length of the queue.
 */
use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;

impl Solution {
    pub fn right_side_view(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut ans: Vec<i32> = Vec::new();
        if root.is_none() {
            return ans;
        }

        let mut queue: VecDeque<(Rc<RefCell<TreeNode>>, usize)> = VecDeque::new();
        queue.push_back((root.unwrap(), 0));

        while let Some((node, depth)) = queue.pop_front() {
            if depth >= ans.len() {
                ans.push(node.borrow().val);
            }

            if let Some(right) = node.borrow().right.clone() {
                queue.push_back((right, depth + 1))
            }

            if let Some(left) = node.borrow().left.clone() {
                queue.push_back((left, depth + 1))
            }
        }

        ans
    }
}

/**
 *
 * Depth-First Search (DFS) Approach
 *
 * 1. Base case: If the node is null (meaning it's an empty subtree), we simply return as there's nothing to traverse further.
 *
 * 2. The core logic of the dfs traversal: Node -> Right -> Left
 * - 2.1: If depth is greater than or equal to the length of ans (because at each level, we only add 1 node to the ans which is the rightmost one, therefore, the length of ans is the level of depth of the current node), it means we've reached a new level.
 *
 * - 2.2: We then add `node.val` to the ans array as the rightmost node of the previous level. This ensures that the first node encountered at each depth is added to the ans array, which will be the rightmost node at that depth due to the order of traversal (right first, left later).
 *
 * - 2.3: Right Subtree: we recursively call dfs on the node.right child, which initiates the traversal on the right subtree.
 *
 * - 2.4: Left Subtree: After the right subtree is traversed, we recursively call dfs on the node.left child, traversing the left subtree.
 *
 * 3. We return the ans array.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn right_side_view(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut ans = Vec::new();

        fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, depth: usize, ans: &mut Vec<i32>) {
            if let Some(node) = node {
                if depth == ans.len() {
                    ans.push(node.borrow().val);
                }

                dfs(&node.borrow().right, depth + 1, ans);
                dfs(&node.borrow().left, depth + 1, ans);
            }
        }

        dfs(&root, 0, &mut ans);
        ans
    }
}
