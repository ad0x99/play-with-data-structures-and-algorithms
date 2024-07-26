/**
 * https://leetcode.com/problems/path-sum/description/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: We iterate through each left and right nodes from the root.
 *
 * At each iteration, we calculate the current sum by adding the current node's value to the current sum.
 *
 * When we reached the leaf node, and the current sum is equal to the target sum, that means we found a valid path.
 *
 * Implementation
 *
 * 1. We create a ans variable to keep track the result if we found a valid path or not.
 *
 * 2. The dfs function will recursively traverse over each node in the tree.
 *
 * 3. Base case: if the node is empty, we return.
 *
 * 4. If we reached a leaf node and the current sum is equal to target sum, that means we found a valid path, we then update the ans to true.
 *
 * 5. We recursively call the dfs in the left and right nodes to calculate the accumulate sum at each node.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 *
 */
const hasPathSum = (root, targetSum) => {
  let ans = false;

  const dfs = (node, currentSum) => {
    if (!node) return;

    // If the current node is a leaf node
    // and the current sum is equal to the target sum
    if (!node.left && !node.right && currentSum + node.val === targetSum) {
      ans = true;
    }

    // Recursively check the left and right subtrees
    dfs(node.left, currentSum + node.val);
    dfs(node.right, currentSum + node.val);
  };

  dfs(root, 0);
  return ans;
};

/**
 * The same approach but different implementation.
 *
 * Instead of using an additional variable to keep track the result, at each recursive call, if we found a valid path, we immediately return the result.
 */
const hasPathSum = (root, targetSum) => {
  const dfs = (node, currentSum) => {
    if (!node) return false;

    // If the current node is a leaf node
    // and the current sum is equal to the target sum
    if (!node.left && !node.right) {
      return currentSum + node.val === targetSum;
    }

    // Recursively check the left and right subtrees
    return (
      dfs(node.left, currentSum + node.val) ||
      dfs(node.right, currentSum + node.val)
    );
  };

  return dfs(root, 0);
};
