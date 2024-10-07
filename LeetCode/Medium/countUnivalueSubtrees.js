/**
 * https://leetcode.com/problems/count-univalue-subtrees/description/
 * https://www.lintcodelo.com/problem/921/
 *
 * Depth-First Search (DFS) Approach
 *
 * Idea: Iterating through each node and check the if a subtree of a node is univalue.
 *
 * A subtree is univalue if and only if:
 * - All its children are univalue subtrees.
 * - All nodes in the subtree have the same value as the root node.
 *
 * Edge case is some subtrees might be missing its left or right, so, as long as the current's left or right exists and all above conditions are met, then it's still a valid univalue.
 *
 * Implementation
 *
 * 1. We create a ans counter to keep track of the total number of univalue subtrees found. Initially set to 0.
 *
 * 2. The isUnivalue function recursively checks if a given subtree is univalue.
 *
 * 3: Base Case: If the node is null, it's considered a univalue subtree (technically, an empty subtree), we return true.
 *
 * 4: Recursive Checks:
 * - 4.1: If the left subtree is univalue using isLeftUnivalue, and if the right subtree is univalue using isRightUnivalue.
 *
 * - 4.2: After that, we check if the left or right is either null or the current node's value matches the values of its left and right children (if they exist).
 *
 * - 4.3: If all conditions are met, it means the current subtree is univalue. We increment ans by 1. Finally, we return isCurrentNodeUnivalue indicating the subtree is either a univalue or not.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
const countUnivalSubtrees = (root) => {
  let univalueCount = 0;

  const isUnivalue = (node) => {
    if (!node) return true; // Empty subtree is considered univalue

    const isLeftUnivalue = isUnivalue(node.left);
    const isRightUnivalue = isUnivalue(node.right);

    const isCurrentNodeUnivalue =
      (!node.left || node.left.val === node.val) &&
      (!node.right || node.right.val === node.val);

    if (isCurrentNodeUnivalue && isLeftUnivalue && isRightUnivalue) {
      univalueCount++;
    }

    return isCurrentNodeUnivalue;
  };

  isUnivalue(root);
  return univalueCount;
};
