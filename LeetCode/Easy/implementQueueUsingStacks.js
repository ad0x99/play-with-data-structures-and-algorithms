/**
 * https://leetcode.com/problems/implement-queue-using-stacks/description/
 *
 * Time complexity: O(1) for all operations
 *
 * Space complexity: O(n) - where n is the number of elements in the queue, as we are using two stacks to store the elements.
 */
class MyQueue {
  constructor() {
    this.firstStack = [];
    this.secondStack = [];
  }

  /**
   * Add the element to the back of the queue
   */
  push(element) {
    this.firstStack.push(element);
  }

  move() {
    if (!this.secondStack.length) {
      while (this.firstStack.length) {
        let lastElementFromTheFirstStack = this.firstStack.pop();
        this.secondStack.push(lastElementFromTheFirstStack);
      }
    }
  }

  /**
   * Remove the element from the front of the queue and return it
   */
  pop() {
    this.move();
    // Returns null if it's empty
    return this.secondStack.pop() || null;
  }

  /**
   * Get the element at the front of the queue
   */
  peek() {
    this.move();

    let lastElementFromTheSecondStack = this.secondStack.length - 1;
    // Returns null if it's empty
    return this.secondStack[lastElementFromTheSecondStack] || null;
  }

  /**
   * Return true if the queue is empty, false otherwise
   */
  empty() {
    return this.firstStack.length === 0 && this.secondStack.length === 0;
  }
}
