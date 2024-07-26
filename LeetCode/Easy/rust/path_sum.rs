/**
 * https://leetcode.com/problems/path-sum/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: We iterate through each left and right nodes from the root.
 *
 * At each iteration, we calculate the current sum by adding the current node's value to the current sum.
 *
 * When we reached the leaf node, and the current sum is equal to the target sum, that means we found a valid path.
 *
 * Implementation
 *
 * 1. We create a ans variable to keep track the result if we found a valid path or not.
 *
 * 2. The dfs function will recursively traverse over each node in the tree.
 *
 * 3. Base case: if the node is empty, we return.
 *
 * 4. If we reached a leaf node and the current sum is equal to target sum, that means we found a valid path, we then update the ans to true.
 *
 * 5. We recursively call the dfs in the left and right nodes to calculate the accumulate sum at each node.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 *
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn has_path_sum(root: Option<Rc<RefCell<TreeNode>>>, target_sum: i32) -> bool {
        let mut ans = false;
        Self::dfs(root.as_ref(), 0, target_sum, &mut ans);
        ans
    }

    fn dfs(
        node: Option<&Rc<RefCell<TreeNode>>>,
        current_sum: i32,
        target_sum: i32,
        ans: &mut bool,
    ) {
        if let Some(node) = node {
            let node_borrowed = node.borrow();

            // If the current node is a leaf node
            // and the current sum is equal to the target sum
            if (node_borrowed.left.is_none() && node_borrowed.right.is_none())
                && current_sum + node_borrowed.val == target_sum
            {
                *ans = true
            }

            // Recursively check the left and right subtrees
            Self::dfs(
                node_borrowed.left.as_ref(),
                current_sum + node_borrowed.val,
                target_sum,
                ans,
            );
            Self::dfs(
                node_borrowed.right.as_ref(),
                current_sum + node_borrowed.val,
                target_sum,
                ans,
            )
        }
    }
}

/**
 * The same approach but different implementation.
 *
 * Instead of using an additional variable to keep track the result, at each recursive call, if we found a valid path, we immediately return the result.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn has_path_sum(root: Option<Rc<RefCell<TreeNode>>>, target_sum: i32) -> bool {
        Solution::dfs(root.as_ref(), 0, target_sum)
    }

    fn dfs(node: Option<&Rc<RefCell<TreeNode>>>, current_sum: i32, target_sum: i32) -> bool {
        if let Some(node) = node {
            let node_borrowed = node.borrow();

            // If the current node is a leaf node
            if node_borrowed.left.is_none() && node_borrowed.right.is_none() {
                return current_sum + node_borrowed.val == target_sum;
            }

            // Recursively check the left and right subtrees
            return Solution::dfs(
                node_borrowed.left.as_ref(),
                current_sum + node_borrowed.val,
                target_sum,
            ) || Solution::dfs(
                node_borrowed.right.as_ref(),
                current_sum + node_borrowed.val,
                target_sum,
            );
        }

        false
    }
}
