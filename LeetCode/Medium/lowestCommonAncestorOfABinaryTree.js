/**
 * https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
 *
 * Depth-First Search (DFS) Approach
 *
 * A node is ancestor of p and q if:
 * - The node itself is p or q.
 * - Its left or right node are the ancestor of p or q.
 *
 * Implementation
 *
 * 1. Base case: If the current node is null, it means we've reached the end of a branch. Return [false, false] indicating that neither p nor q is a descendant of this node.
 *
 * 3. We recursively call dfs on the left and right children of the current node to check if a node is ancestor of either p or q.
 * - 3.1: At each recursive call, we return values are boolean arrays indicating whether a node is the ancestors either p or q.
 *
 * - 3.2: If a node is found in the left or right subtree, or if the node is p itself, that means, we found a ancestor of p
 *
 * - 3.3: If a node is found in the left or right subtree, or if the node is q itself, that means, we found a ancestor of q
 *
 * - 3.4: Combine those two conditions, if we found a node is ancestor of both p and q, and the lca is null which indicates the current lca is the first one we have found, we then update the lca to the current node.
 *
 * 4. Finally, we return lca variable, which now holds the LCA node.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
const lowestCommonAncestor = (root, p, q) => {
  let lca = null;

  const dfs = (node) => {
    if (!node) return [false, false];

    const [isLeftNodeAncestorOfP, isLeftNodeAncestorOfQ] = dfs(node.left);
    const [isRightNodeAncestorOfP, isRightNodeAncestorOfQ] = dfs(node.right);

    const isNodeAncestorOfP =
      isLeftNodeAncestorOfP || isRightNodeAncestorOfP || node === p;
    const isNodeAncestorOfQ =
      isLeftNodeAncestorOfQ || isRightNodeAncestorOfQ || node === q;

    if (isNodeAncestorOfP && isNodeAncestorOfQ && lca === null) {
      lca = node;
    }

    return [isNodeAncestorOfP, isNodeAncestorOfQ];
  };

  dfs(root);
  return lca;
};

/**
 * This solution has the same approach as previous one but simplifier version
 *
 * 1. The dfs function takes a node as an argument and returns a boolean indicating whether the node is an ancestor of either `p` or `q`.
 *
 * 2. We recursively call the dfs function on the left and right children of the current node. The `isLeftNodeAncestor` and `isRightNodeAncestor` variables store the results of the left and right subtree searches.
 * - 2.1: The `isLeftNodeAncestor` variable returns true if either p or q is found in the left subtree of the current node.
 *
 * - 2.2: The `isRightNodeAncestor` variable returns true if either p or q is found in the right subtree of the current node.
 *
 * - 2.3: The `isNodeEqual` variable returns true if the current node itself is either `p` or `q`.
 *
 * 3. In JavaScript, when performing arithmetic operations with booleans, true is converted to 1 and false is converted to 0. Therefore, `isLeftNodeAncestor + isRightNodeAncestor + isNodeEqual` calculates the total number of true values among those three variables.
 *
 * 4. The condition `isLeftNodeAncestor + isRightNodeAncestor + isNodeEqual >= 2` checks if at least two out of the three components are true. absThis indicates that:
 * - 4.1: Either both p and q are in different subtrees of the current node (maybe one is in the left subtree and the other is in the right subtree).
 *
 * - 4.2: Or one of p or q is the current node, and the other is in either the left or right subtree.
 *
 * - 4.3: If the condition is true, that means the current node is ancestor of p and q. We then update the lca variable to the current node.
 *
 * 5. At the end of each recursive call, we return a boolean indicating whether the current node is an ancestor of p or q (`isLeftNodeAncestor || isRightNodeAncestor || isNodeEqual`).
 *
 */
const lowestCommonAncestor = (root, p, q) => {
  let lca = null;

  const dfs = (node) => {
    if (!node) return false;

    const isLeftNodeAncestor = dfs(node.left);
    const isRightNodeAncestor = dfs(node.right);

    const isNodeEqual = node === p || node === q;

    if (isLeftNodeAncestor + isRightNodeAncestor + isNodeEqual >= 2) {
      lca = node;
    }

    return isLeftNodeAncestor || isRightNodeAncestor || isNodeEqual;
  };

  dfs(root);
  return lca;
};
