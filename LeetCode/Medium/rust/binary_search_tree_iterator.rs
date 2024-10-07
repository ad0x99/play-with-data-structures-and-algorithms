/**
 * https://leetcode.com/problems/binary-search-tree-iterator/description/
 *
 * Idea:
 *
 * 1. At each node, we will go to the leftmost descendant first and append all of the node in that path to the stack.
 *
 * 2. From that, the next node to visit should be the node at the top of the stack
 *
 * 3. When visiting a node, if a node has right child, we back to step 1 to collect all the leftmost descendants of that node. Otherwise, we go to the step 2.
 *
 * Implementation
 *
 * 1. We initialize an empty `stack` to store nodes during traversal.
 *
 * 2. From the root node, we call `go_to_leftmost_node` function to populate the stack with the leftmost nodes of the tree. This ensures that the next element to be returned is the smallest in the BST. Because in the in-order traversal, the leftmost node will be the smallest node.
 *
 * 3. Inside the `go_to_leftmost_node` function, we iteratively push leftmost nodes onto the stack. It starts from the given node and repeatedly pushes it onto the stack and moves to its left child until it reaches a null node.
 *
 * 4.  The next function:
 * - 4.1: We pop the top node from the stack, which is the smallest node not yet visited.
 *
 * - 4.2: After that, we call `go_to_leftmost_node` function on the right child of the popped node to prepare for the next next call. This will collect all the leftmost nodes of a new node and push onto the stack for next visit.
 *
 * - 4.3: Finally, we return the value of the popped node.
 *
 * 5. The hasNext function: We check if the stack is empty. If it's not empty, there are more elements to be iterated over, so it returns true. Otherwise, it returns false.
 *
 * Time complexity: O(n), where n is the number of the nodes in the tree.
 *
 * Space complexity: O(n), where n is the number of the nodes in the stack.
 */
use std::cell::RefCell;
use std::rc::Rc;

struct BSTIterator {
    stack: Vec<Rc<RefCell<TreeNode>>>,
}

impl BSTIterator {
    fn new(root: Option<Rc<RefCell<TreeNode>>>) -> Self {
        let mut iterator = BSTIterator { stack: vec![] };
        if let Some(node) = root {
            iterator.go_to_leftmost_node(Some(node))
        }
        iterator
    }

    fn next(&mut self) -> i32 {
        if let Some(node) = self.stack.pop() {
            let value = node.borrow().val;

            if node.borrow().right.is_some() {
                self.go_to_leftmost_node(node.borrow().right.clone())
            }

            value
        } else {
            -1
        }
    }

    fn has_next(&self) -> bool {
        !self.stack.is_empty()
    }

    fn go_to_leftmost_node(&mut self, mut node: Option<Rc<RefCell<TreeNode>>>) {
        while let Some(n) = node {
            self.stack.push(Rc::clone(&n));
            node = n.borrow().left.clone()
        }
    }
}
