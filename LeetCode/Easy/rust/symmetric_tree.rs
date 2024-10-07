/**
 * https://leetcode.com/problems/symmetric-tree/
 *
 * Idea: We iterate through each node at each level and check if two subtrees are mirror images of each other.
 *
 * Two nodes are mirror images of each other if:
 *
 * - Both nodes have the same value.
 * - The left subtree of the first node is a mirror image of the right subtree of the second node.
 * - The right subtree of the first node is a mirror image of the left subtree of the second node.
 *
 * Implementation
 *
 * 1.  We create a isMirror function which receives a `u` node which represents the left node, and `v` represents the right node from the current parent node.
 *
 * 2. Base Cases:
 * - 2.1: If both `u` and `v` are `null`, they are mirror images of each other, and we return true.
 *
 * - 2.2: If only one of `u` or `v` is `null`, they are not mirror images, and we return false.
 *
 * 3. Recursive Check:
 * - 3.1: We check if the values of the root nodes of both subtrees are equal (u.val === v.val).
 *
 * - 3.:2 We then recursively check if the left subtree of `u` is a mirror image of the right subtree of `v` (isMirror(u.left, v.right)).
 *
 * - 3.3: And finally, we recursively check if the right subtree of `u` is a mirror image of the left subtree of `v` (isMirror(u.right, v.left)).
 *
 * - 3.4: If all conditions are true, the subtrees are mirror images, we then return true. Otherwise, return false.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn is_symmetric(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        if let Some(node) = root {
            let node = node.borrow();
            Self::is_mirror(node.left.clone(), node.right.clone())
        } else {
            true
        }
    }

    fn is_mirror(u: Option<Rc<RefCell<TreeNode>>>, v: Option<Rc<RefCell<TreeNode>>>) -> bool {
        match (u, v) {
            (Some(u_node), Some(v_node)) => {
                let (u, v) = (u_node.borrow(), v_node.borrow());

                u.val == v.val
                    && Self::is_mirror(u.left.clone(), v.right.clone())
                    && Self::is_mirror(u.right.clone(), v.left.clone())
            }

            (None, None) => true,
            _ => false,
        }
    }
}
