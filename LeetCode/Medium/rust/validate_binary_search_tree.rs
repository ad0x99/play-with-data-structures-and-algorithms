/**
 * https://leetcode.com/problems/validate-binary-search-tree/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: At each node, we will get the biggest node of the left subtree, and the smallest value of the right tree, and verify if the current parent node is greater than biggest left node, and less than the smallest right node.
 *
 * Because, a valid BTS contains:
 * - The left subtree of a node is always less than the node.
 * - The right subtree of a node is always greater than the node.
 *
 * Therefore, whenever we found a subtree such that the left node is greater than node or the right node is less than node, it means it's a invalid BST.
 *
 * At each recursion, we will get the smallest left node and the biggest right node to compare with the current parent node to verify a valid BST.
 *
 * Implementation
 *
 * 1. Recursive Calls: The dfs function takes a node as input and returns a pair of values: the minimum and maximum values found in the subtree rooted at the node.
 *
 * 2. Base case: If the node is null, we return the current node along with Infinity as the minimum and -Infinity as the maximum [node, Infinity, -Infinity].
 *
 * 3. We recursively calculate the minimum and maximum values for the left and right subtrees, and keep track the validation result.
 *
 * 4. If the left and right subtrees are valid BST and If the current node's value is greater than the maximum value in the left subtree and less than the minimum value in the right subtree. If either condition is violated, it means the tree is not a BST, so we return [0, 0, false], indicating the BST is invalid.
 *
 * 5. At each recursion, we return the minimum and maximum values for the current subtree, which are the minimum of the left subtree's minimum and the current node's value, and the maximum of the right subtree's maximum and the current node validation result.
 *
 * 6. In the isValidBST function, we call the dfs function and return the result at the index of 3 which indicates the validation result.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn is_valid_bst(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        fn dfs(node: Option<Rc<RefCell<TreeNode>>>, min: Option<i32>, max: Option<i32>) -> bool {
            match node {
                Some(n) => {
                    let n = n.borrow();
                    // Check the validity of the current node
                    if let Some(min) = min {
                        if n.val <= min {
                            return false;
                        }
                    }

                    if let Some(max) = max {
                        if n.val >= max {
                            return false;
                        }
                    }

                    dfs(n.left.clone(), min, Some(n.val)) && dfs(n.right.clone(), Some(n.val), max)
                }
                None => true,
            }
        }

        dfs(root, None, None)
    }
}
/**
 * Breadth-First Search (BFS) Approach
 *
 * Same idea with the previous solution
 */
use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;

impl Solution {
    pub fn is_valid_bst(root: Option<Rc<RefCell<TreeNode>>>) -> bool {
        if root.is_none() {
            return true;
        }

        // Queue to store nodes along with the valid range [min, max] for their values
        let mut queue = VecDeque::new();
        queue.push_back((root.clone(), None, None));

        while let Some((node, min, max)) = queue.pop_front() {
            if let Some(n) = node {
                let n = n.borrow();

                // Check the validity of the current node
                if let Some(min) = min {
                    if n.val <= min {
                        return false;
                    }
                }
                if let Some(max) = max {
                    if n.val >= max {
                        return false;
                    }
                }

                // Add left child to the queue with updated range
                queue.push_back((n.left.clone(), min, Some(n.val)));
                // Add right child to the queue with updated range
                queue.push_back((n.right.clone(), Some(n.val), max));
            }
        }

        true
    }
}
