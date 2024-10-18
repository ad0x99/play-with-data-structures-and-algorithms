/**
 * https://leetcode.com/problems/binary-tree-inorder-traversal/description/
 *
 * Depth-First Search Traversal
 *
 * 1. Base case: If the node is null (meaning it's an empty subtree), we simply return as there's nothing to traverse further.
 *
 * 2. The core logic of the in-order traversal: Left -> Node (Parent) -> Right 
 * - 2.1: Left Subtree: we recursively call dfs on the node.left child, which initiates the traversal on the left subtree.
 * 
 * - 2.2: Node Value: We append the current node's value (node.val) to the ans array.
 *
 * - 2.3: Right Subtree: After the parent node and left subtree are traversed, we recursively call dfs on the node.right child, traversing the right subtree.
 *
 * 3. We return the ans array.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 *
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn inorder_traversal(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut ans = Vec::new();

        fn dfs(node: &Option<Rc<RefCell<TreeNode>>>, ans: &mut Vec<i32>) {
            if let Some(n) = node {
                let n = n.borrow();

                dfs(&n.left, ans);
                ans.push(n.val);
                dfs(&n.right, ans);
            }
        }

        dfs(&root, &mut ans);
        ans
    }
}
