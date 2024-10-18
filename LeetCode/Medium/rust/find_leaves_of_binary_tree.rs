/**
 * https://leetcode.com/problems/find-leaves-of-binary-tree/description/
 * https://leetcode.ca/all/366.html
 *
 * Idea: Collect all the leaf nodes which have the same depth level, and group all of them into the same array.
 *
 * We will collect the nodes have the height of 0 first which is the leaf node, then move to the higher height.
 *
 * Implementation
 *
 * 1. We create an `leaf_nodes` to store the leaves grouped by their depth. The `leaf_nodes[h]`` will contain all nodes with height `h`.
 *
 * 2. Inside the dfs function, if there the node is empty, we return -1, indicating a leaf node with height 0.
 *
 * 3. We recursively call the dfs function in the left and right nodes.
 *
 * 4. At each recursion, we get the maximum of the left and right subtree heights plus 1.
 * - 4.1 The height of a node is the length of the longest path from the node to a leaf.
 *
 * - 4.2: The depth of a node is the length of the path from the root to the node.
 *
 * - 4.3: By taking the maximum height of the left and right subtrees and adding 1, we correctly calculate the depth or level of the current node. Because we're grouping nodes by their levels in the `leaf_nodes` array.
 *
 * 5. If the current height is greater than or equal to the length of the `leaf_nodes` array, it means we've reached a new level, so a new empty list is added to `leaf_nodes`.
 *
 * 6. We push the current node's value to the `leaf_nodes` array at the calculated height index.
 *
 * 7. We return the current height at each recursion.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n) + O(h) = O(n), where n is the height of the tree.
 */
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

impl Solution {
    pub fn find_leaves(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        let mut leaf_nodes: Vec<Vec<i32>> = Vec::new();
        Self::height_of(&root, &mut leaf_nodes);
        leaf_nodes
    }

    fn height_of(node: &Option<Rc<RefCell<TreeNode>>>, leaf_nodes: &mut Vec<Vec<i32>>) -> i32 {
        if let Some(node) = node {
            let node = node.borrow();

            let left_height = Self::height_of(&node.left, leaf_nodes);
            let right_height = Self::height_of(&node.right, leaf_nodes);
            let height = i32::max(left_height, right_height) + 1;

            if height as usize >= leaf_nodes.len() {
                leaf_nodes.push(Vec::new());
            }

            leaf_nodes[height as usize].push(node.val);
            height
        } else {
            -1
        }
    }
}
