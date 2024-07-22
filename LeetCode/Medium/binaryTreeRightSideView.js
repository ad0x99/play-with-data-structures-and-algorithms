/**
 * https://leetcode.com/problems/binary-tree-right-side-view/description/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: Find the rightmost node at each level of a binary tree and return their values in an array.
 *
 * 1. If the root is null (empty tree), return an empty array.
 *
 * 2. We create an array `queue` to store nodes during level-order traversal. Each element in the queue is an array [node, depth] where node is the current node and depth is its level in the tree.
 *
 * 3. We create an array ans to store the rightmost nodes of each level, and a currentDepth variable to Keep track of the current depth being processed.
 *
 * 4. As long as there are nodes in the queue, we iterate through each node in the order of right node first, then the left node. In each iteration:
 * - 4.1: We dequeue the first node from the queue, and extract the node and its depth level ([node, depth])
 *
 * - 4.2: If depth is greater than currentDepth, it means we've reached a new level. We then add `node.val` to the ans array as the rightmost node of the previous level. This ensures that the first node encountered at each depth is added to the ans array, which will be the rightmost node at that depth due to the order of traversal (right first, left later).
 *
 * - 4.3: And we update the currentDepth to the depth of current node.
 *
 * 5. After that, we keep adding the right and left nodes to the queue (right child first, then left child), and their `depths + 1` which indicates a new level of depth.
 *
 * 6. After the traversal, we return ans array which contains the rightmost nodes at each level, representing the right side view of the tree.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(n), where n is the length of the queue.
 */
const rightSideView = (root) => {
  if (!root) return [];

  const queue = [[root, 0]]; // [node, depth]
  const ans = [];
  let currentDepth = -1;

  while (queue.length) {
    const [node, depth] = queue.shift();

    if (depth > currentDepth) {
      ans.push(node.val);
      currentDepth = depth;
    }

    // Right -> Left -> Node
    if (node.right) queue.push([node.right, depth + 1]);
    if (node.left) queue.push([node.left, depth + 1]);
  }

  return ans;
};

/**
 * Same approach as the previous example.
 *
 * But instead of using the currentDepth variable to keep track the level of depth, we can use the length of ans array which indicates the depth level as at each level we only have 1 node that added to the ans.
 */
const rightSideView = (root) => {
  if (!root) return [];

  const queue = [[root, 0]]; // [node, depth]
  const ans = [];

  while (queue.length) {
    const [node, depth] = queue.shift();

    if (depth >= ans.length) {
      ans.push(node.val);
    }

    if (node.right) queue.push([node.right, depth + 1]);
    if (node.left) queue.push([node.left, depth + 1]);
  }

  return ans;
};

/**
 *
 * Depth-First Search (DFS) Approach
 *
 * 1. Base case: If the node is null (meaning it's an empty subtree), we simply return as there's nothing to traverse further.
 *
 * 2. The core logic of the dfs traversal: Node -> Right -> Left
 * - 2.1: If depth is greater than or equal to the length of ans (because at each level, we only add 1 node to the ans which is the rightmost one, therefore, the length of ans is the level of depth of the current node), it means we've reached a new level.
 *
 * - 2.2: We then add `node.val` to the ans array as the rightmost node of the previous level. This ensures that the first node encountered at each depth is added to the ans array, which will be the rightmost node at that depth due to the order of traversal (right first, left later).
 *
 * - 2.3: Right Subtree: we recursively call dfs on the node.right child, which initiates the traversal on the right subtree.
 *
 * - 2.4: Left Subtree: After the right subtree is traversed, we recursively call dfs on the node.left child, traversing the left subtree.
 *
 * 3. We return the ans array.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree.
 *
 * Space complexity: O(h), where h is the height of the tree.
 */
const rightSideView = (root) => {
  const ans = [];

  const dfs = (node, depth) => {
    if (!node) return;

    if (depth >= ans.length) {
      ans.push(node.val);
    }

    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  };

  dfs(root, 0);
  return ans;
};
