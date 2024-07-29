/**
 * https://leetcode.com/problems/binary-search-tree-iterator/description/
 *
 * Idea:
 *
 * 1. At each node, we will go to the leftmost descendant first and append all of the node in that path to the stack.
 *
 * 2. From that, the next node to visit should be the node at the top of the stack
 *
 * 3. When visiting a node, if a node has right child, we back to step 1 to collect all the leftmost descendants of that node. Otherwise, we go to the step 2.
 *
 * Implementation
 *
 * 1. We initialize an empty `stack` to store nodes during traversal.
 *
 * 2. From the root node, we call `goToLeftmostNode` function to populate the stack with the leftmost nodes of the tree. This ensures that the next element to be returned is the smallest in the BST. Because in the in-order traversal, the leftmost node will be the smallest node.
 *
 * 3. Inside the `goToLeftmostNode` function, we iteratively push leftmost nodes onto the stack. It starts from the given node and repeatedly pushes it onto the stack and moves to its left child until it reaches a null node.
 *
 * 4.  The next function:
 * - 4.1: We pop the top node from the stack, which is the smallest node not yet visited.
 *
 * - 4.2: After that, we call `goToLeftmostNode` function on the right child of the popped node to prepare for the next next call. This will collect all the leftmost nodes of a new node and push onto the stack for next visit.
 *
 * - 4.3: Finally, we return the value of the popped node.
 *
 * 5. The hasNext function: We check if the stack is empty. If it's not empty, there are more elements to be iterated over, so it returns true. Otherwise, it returns false.
 *
 * Time complexity: O(h), where h is the height of the tree.
 *
 * Space complexity: O(n), where n is the number of the nodes in the stack.
 */
class BSTIterator {
  constructor(root) {
    this.stack = [];
    this.goToLeftmostNode(root);
  }

  goToLeftmostNode(node) {
    while (node) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next() {
    const node = this.stack.pop();
    this.goToLeftmostNode(node.right);
    return node.val;
  }

  hasNext() {
    return this.stack.length > 0;
  }
}

/**
 * Using yield keyword to stop the iteration.
 *
 * The yield keyword allows a function to return multiple values over time, pausing execution between each yield and resuming when the next value is requested.
 *
 * When a generator function is called, it doesn't execute its code right away. Instead, it returns a generator object that can be used to control the execution of the function. The generator function's execution can be paused and resumed using the yield keyword.
 *
 * Implementation
 *
 * 1. We create a inorderTraversal generator function to perform an in-order traversal of the BST.
 * - 1.1: The function uses recursion to yield values from the left subtree, then the current node, and finally the right subtree.
 *
 * - 1.2: When inorderTraversal is called, it doesn't execute the function body. Instead, it returns an iterator (generator object).
 *
 * 2. Inside the BSTIterator class, we initialize the generator with the root of the BST. We create a generator from the inorderTraversal function. And we initialize the nextValue property to store the result of the next call to the generator.
 *
 * 3. The next function retrieves the current value from nextValue, then advances nextValue to the next value in the generator. And then we return the retrieved value.
 * - 3.1: When the next function is called on the generator object, the function starts executing until it encounters the first yield.
 *
 * - 3.2: For example, if the root node is not null, the generator will recursively call inorderTraversal(node.left). Since this is also a generator function, it yields values from the left subtree first.
 *
 * - 3.3: When it reaches yield node.val, it pauses and returns the current node's value.
 *
 * - 3.4: Each subsequent call to next function resumes the function execution right after the last yield statement. The function continues to execute, yielding values from the right subtree after the left subtree and current node.
 *
 * 4. The hasNext function checks if there are more values to yield by checking if nextValue.done is false. If the nextValue.done returns true, that means we reached the last node, and no more node in the generator.
 *
 * Time complexity: O(1)
 *
 * Space complexity: O(n)
 */
function* inorderTraversal(node) {
  if (node) {
    yield* inorderTraversal(node.left);
    yield node.val;
    yield* inorderTraversal(node.right);
  }
}

class BSTIterator {
  constructor(root) {
    this.generator = inorderTraversal(root);
    this.nextValue = this.generator.next();
  }

  next() {
    const value = this.nextValue.value;
    this.nextValue = this.generator.next();
    return value;
  }

  hasNext() {
    return !this.nextValue.done;
  }
}
