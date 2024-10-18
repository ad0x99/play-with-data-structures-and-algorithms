/**
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 *
 * Breadth-First Search (BFS)
 *
 * The core logic of bfs is Node -> Left -> Right. It means we will traverse the current node (parent) first, then move to the left and right of the current node.
 *
 * But in this case, we need to transform it a bit because we want the order to alternate between left-to-right and right-to-left for each level.
 *
 * By assuming if the depth is even, that means we will build the left-to-right order, otherwise, if the depth is odd, we'll build the right-to-left order for each level.
 *
 * Implementation
 *
 * 1. Base case: If the tree is empty (root is null), we return an empty array as there are no nodes to process.
 *
 * 2. We create a queue that will be used as a FIFO (First-In-First-Out) queue to store nodes during the BFS traversal. It's initialized with a single element, a sub-array [root, 0]. Here, root is the root node of the tree, and 0 represents the depth (level) of the root node (which is always 0).
 *
 * 3. We create an empty array ans that will eventually store the nodes' values in level order, and a `current_depth` variable to keep track of the most recent level encountered during the traversal. This depth allows us to know when we end an depth level and build the result at each level.
 *
 * 4. As long as there are nodes in the queue, we iterate through each node.
 *
 * 5. At each iteration, we remove the first element ([node, depth]) from the queue. This node represents the current node being processed, and depth represents its level in the tree.
 *
 * 6. If the current depth is greater than the `current_depth` variable, it means we've reached a new level (deeper than any previously encountered level). In this case:
 * - 6.1: We create a new sub-array with the current `node.val` and push into the ans array. This sub-array represents the start of a new level in the result.
 *
 * - 6.2: We then update the `current_depth` to the new depth to keep track of the current level.
 *
 * - 6.3: If depth is not greater than `current_depth`, it means we're still processing nodes at the same level we were on previously. In this case, there are 2 cases happen here. If depth is even which indicates the `left-right` order, the current node's value is appended to the end of the current level's array in ans.
 *
 * - 6.4 Or, if depth is odd which indicates the `right-left` order, the current node's value is prepended to the beginning of the current level's array in ans.
 *
 * 7. After processing the current node, we check if the current node has any children:
 * - 7.1: If the `node.left` child exists, we add it to the queue along with its corresponding depth (depth + 1). This ensures that the left child is processed in the next iteration of the loop at the appropriate level (one level deeper than the current node).
 *
 * - 7.2: Similarly, if the `node.right` child exists, it's also added to the queue with its depth (depth + 1).
 *
 * 8. We return ans array which contains sub-arrays representing each level of the tree, with each sub-array holding the node values at that level.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the length of the queue.
 */
use std::cell::RefCell;
use std::collections::VecDeque;
use std::rc::Rc;

impl Solution {
    pub fn zigzag_level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
        if root.is_none() {
            return vec![];
        }

        let mut queue: VecDeque<(Rc<RefCell<TreeNode>>, usize)> = VecDeque::new();
        let mut ans: Vec<Vec<i32>> = Vec::new();
        let mut current_depth = 0;

        queue.push_back((root.unwrap(), 0));

        while let Some((node, depth)) = queue.pop_front() {
            let node = node.borrow();

            if depth == ans.len() {
                ans.push(vec![node.val]);
            } else {
                if depth % 2 == 0 {
                    ans[depth].push(node.val);
                } else {
                    ans[depth].insert(0, node.val);
                }
            }

            if let Some(left) = &node.left {
                queue.push_back((Rc::clone(left), depth + 1));
            }

            if let Some(right) = &node.right {
                queue.push_back((Rc::clone(right), depth + 1));
            }
        }

        ans
    }
}
