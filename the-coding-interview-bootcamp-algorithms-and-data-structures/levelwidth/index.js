// --- Directions
// Given the root node of a tree, return
// an array where each element is the width
// of the tree at each level.
// --- Example
// Given:
//     0
//   / |  \
// 1   2   3
// |       |
// 4       5
// Answer: [1, 3, 2]

/**
 * We use a counter array to keep track of the number of nodes at each level. We use a sentinel value
 * to keep track of when we've reached the end of a level
 * @param root - the root node of the tree
 * @returns An array of counters.
 */
const levelWidth = (root) => {
  const counters = [0];
  const array = [root, 'f'];

  while (array.length > 1) {
    const node = array.shift();

    if (node === 'f') {
      counters.push(0);
      array.push('f');
    } else {
      array.push(...node.children);
      counters[counters.length - 1]++;
    }
  }

  return counters;
};

module.exports = levelWidth;
