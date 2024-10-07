/**
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 *
 * Depth-First Search (DFS) Approach
 *
 * A node is ancestor of p and q if:
 * - The node itself is p or q.
 * - Its left or right node are the ancestor of p or q.
 *
 * Implementation
 *
 * 1. Base case: If the current node is null, it means we've reached the end of a branch. Return [false, false] indicating that neither p nor q is a descendant of this node.
 *
 * 3. We recursively call dfs on the left and right children of the current node to check if a node is ancestor of either p or q.
 * - 3.1: At each recursive call, we return values are boolean arrays indicating whether a node is the ancestors either p or q.
 *
 * - 3.2: If a node is found in the left or right subtree, or if the node is p itself, that means, we found a ancestor of p
 *
 * - 3.3: If a node is found in the left or right subtree, or if the node is q itself, that means, we found a ancestor of q
 *
 * - 3.4: Combine those two conditions, if we found a node is ancestor of both p and q, and the lca is null which indicates the current lca is the first one we have found, we then update the lca to the current node.
 *
 * 4. Finally, we return lca variable, which now holds the LCA node.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn lowest_common_ancestor(
        root: Option<Rc<RefCell<TreeNode>>>,
        p: Option<Rc<RefCell<TreeNode>>>,
        q: Option<Rc<RefCell<TreeNode>>>,
    ) -> Option<Rc<RefCell<TreeNode>>> {
        fn dfs(
            node: Option<&Rc<RefCell<TreeNode>>>,
            p: &Rc<RefCell<TreeNode>>,
            q: &Rc<RefCell<TreeNode>>,
            lca: &mut Option<Rc<RefCell<TreeNode>>>,
        ) -> (bool, bool) {
            if let Some(node) = node {
                let node_borrowed = node.borrow();
                let (is_left_ancestor_p, is_left_ancestor_q) =
                    dfs(node_borrowed.left.as_ref(), p, q, lca);
                let (is_right_ancestor_p, is_right_ancestor_q) =
                    dfs(node_borrowed.right.as_ref(), p, q, lca);

                let is_node_ancestor_p =
                    is_left_ancestor_p || is_right_ancestor_p || Rc::ptr_eq(node, p);
                let is_node_ancestor_q =
                    is_left_ancestor_q || is_right_ancestor_q || Rc::ptr_eq(node, q);

                if is_node_ancestor_p && is_node_ancestor_q && lca.is_none() {
                    *lca = Some(Rc::clone(node));
                }

                return (is_node_ancestor_p, is_node_ancestor_q);
            }
            (false, false)
        }

        let mut lca: Option<Rc<RefCell<TreeNode>>> = None;
        dfs(
            root.as_ref(),
            p.as_ref().unwrap(),
            q.as_ref().unwrap(),
            &mut lca,
        );
        lca
    }
}
