/**
 * https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
 *
 * Recursion Approach
 *
 * Idea: We will traversal through each value in the preorder array and construct each value in valid specified range which adheres the BST properties.
 *
 * As we know in a BST, for any node with value V:
 * - All values in the left subtree are less than V.
 * - All values in the right subtree are greater than V.
 *
 * In a preorder traversal, the root node is processed first, followed by the left subtree, and then the right subtree.
 *
 * As we construct the tree, we need to ensure that each node falls within the valid range determined by its parent nodes.
 *
 * When constructing the left subtree of a node with value V, the valid range is `[lower_bound, V]`. When constructing the right subtree, the valid range is `[V, upper_bound]`.
 *
 * Using these bounds ensures that we build each node in the tree within the valid range which adheres the BST properties.
 *
 * Implementation
 *
 * 1. We create a `index` variable to keep track the current node in the preorder array.
 *
 * 2. The `build_bst` function constructs the binary search tree (BST) recursively. It takes two parameters, `lower_bound` and `upper_bound`, which define the valid range of values for nodes in the current subtree.
 *
 * 3. Base Case: If `index` equals the length of the preorder array, it means we have processed all elements, so we return null.
 *
 * 4. For the current value (`preorder[index]`), if it falls outside the range `[lower_bound, upper_bound]`, it means this value does not belong in the current subtree, and we return null.
 *
 * 5. If the current value is within the bounds, we create a new `TreeNode` with this value. We then increment the index to move to the next element in the preorder array.
 *
 * 6. Recursive Calls: These recursive calls ensure that the BST properties are maintained.
 * - 6.1: We recursively build the `left` subtree with the updated bounds (lower_bound, currentValue).
 *
 * - 6.2: We recursively build the `right` subtree with the updated bounds (currentValue, upper_bound).
 *
 * 7. Finally, we return the root of the BST constructed by the build_bst function.
 *
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the number of nodes in the tree.
 */
use std::cell::RefCell;
use std::rc::Rc;

impl Solution {
    pub fn bst_from_preorder(preorder: Vec<i32>) -> Option<Rc<RefCell<TreeNode>>> {
        fn build_bst(
            preorder: &Vec<i32>,
            index: &mut usize,
            lower_bound: i32,
            upper_bound: i32,
        ) -> Option<Rc<RefCell<TreeNode>>> {
            // Base case: if index exceeds the length of preorder list
            if *index == preorder.len() {
                return None;
            }

            // If the current value is out of the bounds, it doesn't belong in this subtree
            let value = preorder[*index];
            if value < lower_bound || value > upper_bound {
                return None;
            }

            // Create a new node with the current value
            *index += 1;
            let node = Rc::new(RefCell::new(TreeNode::new(value)));

            // Recursively build the left and right subtrees with updated bounds
            node.borrow_mut().left = build_bst(preorder, index, lower_bound, value);
            node.borrow_mut().right = build_bst(preorder, index, value, upper_bound);

            Some(node)
        }

        let mut index = 0;
        build_bst(&preorder, &mut index, i32::MIN, i32::MAX)
    }
}
