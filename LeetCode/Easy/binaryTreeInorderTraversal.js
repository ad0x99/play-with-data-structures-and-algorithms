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
const inorderTraversal = (root) => {
  const ans = [];

  const dfs = (node) => {
    if (!node) return;

    // Left -> Node -> Right
    dfs(node.left);
    ans.push(node.val);
    dfs(node.right);
  };

  dfs(root);
  return ans;
};
