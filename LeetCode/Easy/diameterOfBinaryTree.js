/**
 * https://leetcode.com/problems/diameter-of-binary-tree/
 *
 * The idea is using the DFS traversal algorithm and calculate the diameter of each node recursively to find the longest path between nodes.
 *
 * The dfs function will return an array containing 2 values: [diameter, height]
 * - diameter: Represents the maximum path length (number of edges) passing through the current node (including the node itself).
 * - height: Represents the maximum height (number of nodes) from the current node to a leaf node (either left or right subtree).
 *
 * 1. With the base case, If there is no root (root is null - meaning an empty tree or a null node encountered during traversal, we return `[0, -1]` as diameter: 0 (no path through an empty node) and height: -1 (no height from an empty node)
 * 2. If `root.left` and `root.right` are both `null` (meaning a leaf node), we return `[0, 0]` as diameter: 0 (diameter through a single node is 0) and height: 0 (height of a leaf node is 0)
 * 3. Otherwise, we perform recursive calls to dfs for the left (root.left) and right (root.right) subtrees.
 * - 3.1: `[diameterLeft, heightLeft]`: Represents the diameter and height calculated from the left subtree.
 * - 3.2: `[diameterRight, heightRight]`: Represents the diameter and height calculated from the right subtree.
 *
 * 4. And then, we calculate the diameter at the current node (root) using the following possibilities:
 * - 4.1: `Math.max(diameterLeft, diameterRight)`: The maximum diameter found in either the left or right subtree.
 * - 4.2: `heightLeft + heightRight + 2`: The potential diameter if the longest paths from the left and right subtrees pass through the current node (adding 2 for the edges connecting the current node to the left and right subtrees).
 * - 4.3: Finally, we return an array containing the calculated diameter (diameter) and the maximum height (`height`) from the current node (`Math.max(heightLeft, heightRight) + 1`).
 *
 * 5. We return the diameter of the binary tree by accessing the first element of the returned array.
 *
 * Time complexity: O(n) -  where n is the number of nodes in the binary tree.
 *
 * Space complexity: O(h) - where h <= n and h is the height of the tree
 */
const diameterOfBinaryTree = (root) => {
  const dfs = (root) => {
    if (!root) {
      return [0, -1];
    }

    if (!root.left && !root.right) {
      return [0, 0];
    }

    let [diameterLeft, heightLeft] = dfs(root.left);
    let [diameterRight, heightRight] = dfs(root.right);
    let diameter = Math.max(
      diameterLeft,
      diameterRight,
      heightLeft + heightRight + 2
    );

    return [diameter, Math.max(heightLeft, heightRight) + 1];
  };

  return dfs(root)[0];
};
