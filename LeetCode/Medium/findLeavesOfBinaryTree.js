/**
 * https://leetcode.com/problems/find-leaves-of-binary-tree/description/
 * https://leetcode.ca/all/366.html
 *
 * Idea: Collect all the leaf nodes which have the same depth level, and group all of them into the same array.
 *
 * We will collect the nodes have the height of 0 first which is the leaf node, then move to the higher height.
 *
 * Implementation
 *
 * 1. We create an `leafNodes` to store the leaves grouped by their depth. The `leafNodes[h]` will contain all nodes with height `h`.
 *
 * 2. Inside the dfs function, if there the node is empty, we return -1, indicating a leaf node with height 0.
 *
 * 3. We recursively call the dfs function in the left and right nodes.
 *
 * 4. At each recursion, we get the maximum of the left and right subtree heights plus 1.
 * - 4.1 The height of a node is the length of the longest path from the node to a leaf.
 *
 * - 4.2: The depth of a node is the length of the path from the root to the node.
 *
 * - 4.3: By taking the maximum height of the left and right subtrees and adding 1, we correctly calculate the depth or level of the current node. Because we're grouping nodes by their levels in the `leafNodes` array.
 *
 * 5. If the current height is greater than or equal to the length of the `leafNodes` array, it means we've reached a new level, so a new empty list is added to `leafNodes`.
 *
 * 6. We push the current node's value to the `leafNodes` array at the calculated height index.
 *
 * 7. We return the current height at each recursion.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n) + O(h) = O(n), where n is the height of the tree.
 */
const findLeaves = (root) => {
  // leafNodes[h] contains all the nodes have the height of h
  const leafNodes = [];

  const dfs = (node) => {
    if (!node) return -1;

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Get the max height to calculate the current depth of the node
    const height = Math.max(leftHeight, rightHeight) + 1;

    if (height >= leafNodes.length) {
      leafNodes.push([]);
    }

    leafNodes[height].push(node.val);
    return height;
  };

  dfs(root);
  return leafNodes;
};
