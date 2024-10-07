/**
 * https://leetcode.com/problems/range-sum-of-bst/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * 1. We initialize sum variable to 0 to keep track of the sum of the values within the given range.
 *
 * 2. We use the dfs function to traverse the tree.
 *
 * 3. Calculate sum: If the current node's value is within the range [low, high], we add the value of the current node to the sum to calculate the sum.
 *
 * 4. Recursive Calls: In the BST, the parent node is always greater than or equal to its left nodes, and is always less than or equal to its right nodes. We can leverage this characteristic to find the node in the correct range.
 * - 4.1: If the current node is greater than the lowest range, we want to find greater value in the left subtree. In this case, we will recursively call dfs function on the left subtree to find smaller node's value.
 *
 * - 4.2: Similarly, If the current node is less than the highest range, we want to find smaller value in the right subtree. In this case, we will recursively call dfs function on the right subtree to find bigger node's value.
 *
 * 5. Finally, we return sum variable which is the accumulated sum.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn range_sum_bst(root: Option<Rc<RefCell<TreeNode>>>, low: i32, high: i32) -> i32 {
        fn dfs(node: Option<Rc<RefCell<TreeNode>>>, low: i32, high: i32, sum: &mut i32) {
            if let Some(n) = node {
                let n = n.borrow();

                if low <= n.val && n.val <= high {
                    *sum += n.val;
                }
                if low < n.val {
                    dfs(n.left.clone(), low, high, sum);
                }
                if n.val < high {
                    dfs(n.right.clone(), low, high, sum);
                }
            }
        }

        let mut sum = 0;
        dfs(root, low, high, &mut sum);
        sum
    }
}
