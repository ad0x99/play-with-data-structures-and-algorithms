/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: We traverse through the tree using in-order traversal, where elements are visited in ascending order, and we store encountered element in an array.
 *
 * Then, we just need to return the element at k-1 position from the array (because the tree is 1-indexed)
 *
 * Implementation:
 *
 * 1. We initialize an ans array to store the elements in ascending order as they are encountered during the traversal.
 *
 * 2. Depth-First Search (DFS): We call dfs function recursively to traverse the BST.
 * - 2.1: Left Subtree: The left subtree is visited first to ensure elements are processed in ascending order.
 *
 * - 2.2: Check for k: If the length of the ans array becomes equal to k, it means we've found the k-th smallest element, so the function returns to stop further traversal.
 *
 * - 2.3: Node Value: The current node's value is added to the ans array.
 *
 * - 2.4: Right Subtree: The right subtree is visited.
 *
 * 3. Finally, we return the `k-1th` element of the ans array, which corresponds to the k-th smallest element.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h + k), where h is the height of the tree, and in the worst case, the ans array will store k elements.
 */
const kthSmallest1 = (root, k) => {
  const ans = [];

  const dfs = (node) => {
    if (!node) return;

    // Left -> Node -> Right
    // Traverse the left subtree
    dfs(node.left);

    // Check if we have found k elements already
    // we return immediately to avoid redundant traversal
    if (ans.length === k) return;

    // Visit the current node
    ans.push(node.val);

    // Traverse the right subtree
    dfs(node.right);
  };

  dfs(root);
  return ans[k - 1];
};
