/**
 * https://leetcode.com/problems/two-sum-iv-input-is-a-bst/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: We iterate through each node, calculate the complement of a node's value has been encountered before and store that complement into a Set. This allows us to find two nodes whose sum equals the target value k by using the complement result.
 *
 * Implementation
 *
 * 1. We initialize a seen set to store the complement of node values encountered so far.
 *
 * 2. We create a queue for Breadth-First Search (BFS) traversal.
 *
 * 3. In the dfs function, we perform a level-order traversal of the binary tree using BFS. For each node visited:
 * - 3.1: We calculate the complement as `k - node.val`.
 *
 * - 3.2: Base case: If the current node's value exists in the seen set. It means a pair of nodes with sum k is found, and we return true.
 *
 * - 3.3: After that, we add the current node's value to the seen set for future checks.
 *
 * - 3.4: If the `node.left` child exists, we add it to the queue. This ensures that the left child is processed in the next iteration of the loop at the appropriate level (one level deeper than the current node).
 *
 * - 3.5: Similarly, if the `node.right` child exists, it's also added to the queue.
 *
 * 4. If no pair of nodes with sum k is found during the traversal, we return false.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n) + O(n) = O(n), where n is the number of nodes in the queue, and the length of seen Set.
 */
const findTarget = (root, k) => {
  if (!root) return false;

  const seen = new Set();
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    const complement = k - node.val;

    if (seen.has(node.val)) return true;
    seen.add(complement);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return false;
};

/**
 * Depth-First Search (DFS) Approach
 *
 * The same idea as BFS approach, but instead of using BFS, we'll use DFS for traversal.
 *
 * The core logic is the same.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the number of node.val in the seen Set.
 */
const findTarget = (root, k) => {
  const seen = new Set();

  const dfs = (node) => {
    if (!node) return false;

    if (seen.has(node.val)) return true;
    seen.add(k - node.val);

    return dfs(node.left) || dfs(node.right);
  };

  return dfs(root);
};
