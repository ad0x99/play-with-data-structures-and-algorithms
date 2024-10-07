/**
 * https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/
 *
 * Recursion Approach
 *
 * Idea: We will traversal through each value in the preorder array and construct each value in valid specified range which adheres the BST properties.
 *
 * As we know in a BST, for any node with value V:
 * - All values in the left subtree are less than V.
 * - All values in the right subtree are greater than V.
 *
 * In a preorder traversal, the root node is processed first, followed by the left subtree, and then the right subtree.
 *
 * As we construct the tree, we need to ensure that each node falls within the valid range determined by its parent nodes.
 *
 * When constructing the left subtree of a node with value V, the valid range is `[lowerBound, V]`. When constructing the right subtree, the valid range is `[V, upperBound]`.
 *
 * Using these bounds ensures that we build each node in the tree within the valid range which adheres the BST properties.
 *
 * Implementation
 *
 * 1. We create a `index` variable to keep track the current node in the preorder array.
 *
 * 2. The `buildBST` function constructs the binary search tree (BST) recursively. It takes two parameters, `lowerBound` and `upperBound`, which define the valid range of values for nodes in the current subtree.
 *
 * 3. Base Case: If `index` equals the length of the preorder array, it means we have processed all elements, so we return null.
 *
 * 4. For the current value (`preorder[index]`), if it falls outside the range `[lowerBound, upperBound]`, it means this value does not belong in the current subtree, and we return null.
 *
 * 5. If the current value is within the bounds, we create a new `TreeNode` with this value. We then increment the index to move to the next element in the preorder array.
 *
 * 6. Recursive Calls: These recursive calls ensure that the BST properties are maintained.
 * - 6.1: We recursively build the `left` subtree with the updated bounds (lowerBound, currentValue).
 *
 * - 6.2: We recursively build the `right` subtree with the updated bounds (currentValue, upperBound).
 *
 * 7. Finally, we return the root of the BST constructed by the buildBST function.
 *
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the number of nodes in the tree.
 */
const bstFromPreorder = (preorder) => {
  let index = 0;

  const buildBST = (lowerBound, upperBound) => {
    // Base case: if index exceeds the length of preorder list
    if (index === preorder.length) return null;

    const currentValue = preorder[index];
    // If the current value is out of the bounds, it doesn't belong in this subtree
    if (currentValue < lowerBound || currentValue > upperBound) return null;

    // Create a new node with the current value
    const node = new TreeNode(currentValue);
    index++;

    // Recursively build the left and right subtrees with updated bounds
    node.left = buildBST(lowerBound, currentValue);
    node.right = buildBST(currentValue, upperBound);

    return node;
  };

  return buildBST(-Infinity, Infinity);
};
