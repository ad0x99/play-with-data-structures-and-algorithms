/**
 * https://leetcode.com/problems/binary-tree-postorder-traversal/
 *
 * Depth-First Search Traversal
 *
 * 1. Base case: If the node is null (meaning it's an empty subtree), we simply return as there's nothing to traverse further.
 *
 * 2. The core logic of the postorder traversal: Left -> Right -> Node
 * - 2.1: Left Subtree: we recursively call dfs on the node.left child, which initiates the traversal on the left subtree.
 *
 * - 2.2: Right Subtree: After the left subtree is traversed, we recursively call dfs on the node.right child, traversing the right subtree.
 *
 * - 2.3: Node Value: After both the left and right subtrees are traversed (meaning all their descendant nodes have been visited), we append the current node's value (node.val) to the ans array.
 *
 * 3. We return the ans array.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 *
 */
const postorderTraversal = (root) => {
  const ans = [];

  const dfs = (node) => {
    if (!node) return;

    // Left -> Right -> Node
    dfs(node.left);
    dfs(node.right);
    ans.push(node.val);
  };

  dfs(root);
  return ans;
};
