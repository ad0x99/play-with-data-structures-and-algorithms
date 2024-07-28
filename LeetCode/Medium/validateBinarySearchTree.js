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
 * 1. We initialize a ans variable to indicate whether the tree is valid or not. It's initialized to true.
 *
 * 2. Recursive Calls: The dfs function takes a node as input and returns a pair of values: the minimum and maximum values found in the subtree rooted at the node.
 *
 * - 2.1: Base case: If the node is null, we return Infinity as the minimum and -Infinity as the maximum.
 *
 * - 2.2: We recursively calculate the minimum and maximum values for the left and right subtrees.
 *
 * - 2.3: If the current node's value is greater than the maximum value in the left subtree and less than the minimum value in the right subtree. If either condition is violated, it means the tree is not a BST, so we update the ans flag to false.
 *
 * - 2.4: At eacj recursion, we return the minimum and maximum values for the current subtree, which are the minimum of the left subtree's minimum and the current node's value, and the maximum of the right subtree's maximum and the current node's value, respectively.
 *
 * 3. Finally, we return the ans variable, which indicates whether the tree is a valid BST.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
const isValidBST = (root) => {
  let ans = true;

  const dfs = (node) => {
    if (!node) return [Infinity, -Infinity];

    const [leftMin, leftMax] = dfs(node.left);
    const [rightMin, rightMax] = dfs(node.right);

    // Check the validity of the current node
    if (node.val >= rightMin || node.val <= leftMax) {
      ans = false;
    }

    return [Math.min(leftMin, node.val), Math.max(rightMax, node.val)];
  };

  dfs(root);
  return ans;
};

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
const isValidBST = (root) => {
  const dfs = (node) => {
    if (!node) return [Infinity, -Infinity, true];

    const [leftMin, leftMax, isLeftValid] = dfs(node.left);
    const [rightMin, rightMax, isRightValid] = dfs(node.right);

    // Check the validity of the current node
    const isCurrentValid =
      isLeftValid && isRightValid && node.val > leftMax && node.val < rightMin;

    if (!isCurrentValid) {
      return [0, 0, false];
    }

    return [Math.min(leftMin, node.val), Math.max(rightMax, node.val), true];
  };

  return dfs(root)[2];
};

/**
 * Breadth-First Search (BFS) Approach
 *
 * Same idea with the previous solution
 */
const isValidBST = (root) => {
  if (!root) return true;

  // Queue to store nodes along with the valid range [min, max] for their values
  const queue = [[root, -Infinity, Infinity]];

  while (queue.length) {
    const [node, min, max] = queue.shift();

    // Check the validity of the current node
    if (node.val <= min || node.val >= max) return false;

    // Add left child to the queue with updated range
    if (node.left) queue.push([node.left, min, node.val]);

    // Add right child to the queue with updated range
    if (node.right) queue.push([node.right, node.val, max]);
  }

  return true;
};
