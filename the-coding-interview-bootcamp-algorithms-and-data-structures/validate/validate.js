// --- Directions
// Given a node, validate the binary search tree,
// ensuring that every node's left hand child is
// less than the parent node's value, and that
// every node's right hand child is greater than
// the parent

/**
 * If the node's data is greater than the max or less than the min, return false. Otherwise,
 * recursively check the left and right nodes
 * @param node - the current node we're validating
 * @param [min=null] - the minimum value allowed in the tree
 * @param [max=null] - the maximum value allowed in the tree
 * @returns A boolean value.
 */
const validate = (node, min = null, max = null) => {
  if (max !== null && node.data > max) {
    return false;
  }

  if (min !== null && node.data < min) {
    return false;
  }

  if (node.left && !validate(node.left, min, node.data)) {
    return false;
  }

  if (node.right && !validate(node.right, node.data, max)) {
    return false;
  }

  return true;
};

export { validate };
