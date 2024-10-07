/**
 * https://leetcode.com/problems/range-sum-of-bst/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * 1. We initialize sum variable to 0 to keep track of the sum of the values within the given range.
 *
 * 2. We use the dfs function to traverse the tree.
 *
 * 3. Base Case: If the current node is null, we return.
 *
 * 4. Calculate sum: If the current node's value is within the range [low, high], we add the value of the current node to the sum to calculate the sum.
 *
 * 5. Recursive Calls: In the BST, the parent node is always greater than to its left nodes, and is always less than to its right nodes. We can leverage this characteristic to find the node in the correct range.
 * - 5.1: If the current node is greater than the lowest range, we want to find greater value in the left subtree. In this case, we will recursively call dfs function on the left subtree to find smaller node's value.
 *
 * - 5.2: Similarly, If the current node is less than the highest range, we want to find smaller value in the right subtree. In this case, we will recursively call dfs function on the right subtree to find bigger node's value.
 *
 * 6. Finally, we return sum variable which is the accumulated sum.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
const rangeSumBST = (root, low, high) => {
  let sum = 0;

  const dfs = (node) => {
    if (!node) return;

    if (low <= node.val && node.val <= high) {
      sum += node.val;
    }

    if (node.val > low) {
      dfs(node.left, low, high);
    }

    if (node.val < high) {
      dfs(node.right, low, high);
    }
  };

  dfs(root, low, high);
  return sum;
};

/**
 * https://leetcode.com/problems/range-sum-of-bst/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * 1. We initialize sum variable to 0 to keep track of the sum of the values within the given range.
 *
 * 2. We use the dfs function to traverse the tree. It takes three parameters: node (current node), left (lower bound of the current range), and right (upper bound of the current range).
 *
 * 3. Base Case: If the node is null or the current range [left, right] doesn't overlap with the target range [low, high], the function returns immediately.
 *
 * 4. Calculate sum: If the current node's value is within the range [low, high], we add the value of the current node to the sum to calculate the sum.
 *
 * 5. Recursive Calls: We recursively call the dfs function for the left and right children, and updating the range accordingly.
 *
 * 6. Finally, we return sum variable which is the accumulated sum.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
const rangeSumBST = (root, low, high) => {
  let sum = 0;

  const dfs = (node, left, right) => {
    if (!node || left > high || right < low) return;

    if (low <= node.val && node.val <= high) {
      sum += node.val;
    }

    dfs(node.left, left, Math.min(right, node.val));
    dfs(node.right, Math.min(left, node.val), right);
  };

  dfs(root, -Infinity, Infinity);
  return sum;
};
