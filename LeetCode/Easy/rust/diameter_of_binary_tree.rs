/**
 * https://leetcode.com/problems/diameter-of-binary-tree/
 *
 * DFS Approach
 *
 * The idea is using the DFS traversal algorithm and calculate the diameter of each node recursively to find the longest path between nodes.
 *
 * The dfs function will return an array containing 2 values: [diameter, height]
 * - `diameter`: Represents the maximum path length (number of edges) passing through the current node (including the node itself).
 * - `height`: Represents the maximum height (number of nodes) from the current node to a leaf node (either left or right subtree).
 *
 * 1. Base case: If there is no root (root is null - meaning an empty tree or a null node encountered during traversal, we return `[0, -1]` as diameter: 0 (no path through an empty node) and height: -1 (no height from an empty node).
 *
 * 2. If `root.left` and `root.right` are both `null` (meaning a leaf node), we return `[0, 0]` as diameter: 0 (diameter through a single node is 0) and height: 0 (height of a leaf node is 0).
 *
 * 3. Otherwise, we perform recursive calls to dfs for the left (root.left) and right (root.right) subtrees.
 * - 3.1: `[left_diameter, left_height]`: Represents the diameter and height calculated from the left subtree.
 *
 * - 3.2: `[right_diameter, right_height]`: Represents the diameter and height calculated from the right subtree.
 *
 * 4. And then, we calculate the diameter at the current node (root) using the following possibilities:
 * - 4.1: We get the maximum diameter found in either the left or right subtree, and the potential diameter if the longest paths from the left and right subtrees pass through the current node (`left_height + rightHeight + 2` - adding 2 for the edges connecting the current node to the left and right subtrees).
 *
 * - 4.3: Finally, we return an array containing the calculated diameter (diameter) and the maximum height (`height`) from the current node.
 *
 * 5. We return the diameter of the binary tree by accessing the first element of the returned array.
 *
 * Time complexity: O(n) -  where n is the number of nodes in the binary tree.
 *
 * Space complexity: O(h) - where h <= n and h is the height of the tree
 */
use std::cell::RefCell;
use std::rc::Rc;
impl Solution {
    pub fn diameter_of_binary_tree(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
        Self::dfs(root).0
    }

    fn dfs(node: Option<Rc<RefCell<TreeNode>>>) -> (i32, i32) {
        if let Some(node) = node {
            let (left_diameter, left_height) = Self::dfs(node.borrow().left.clone());
            let (right_diameter, right_height) = Self::dfs(node.borrow().right.clone());

            let diameter = left_diameter
                .max(right_diameter)
                .max(left_height + right_height + 2);
            let height = left_height.max(right_height) + 1;

            (diameter, height)
        } else {
            (0, -1)
        }
    }
}
