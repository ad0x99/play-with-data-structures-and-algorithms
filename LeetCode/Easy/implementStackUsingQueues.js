/**
 * https://leetcode.com/problems/implement-stack-using-queues/description/
 *
 * Time complexity:
 * - push(): O(1)
 * - pop(): O(n) - due to multiple enqueue/dequeue operations
 * - top(): O(n) - due to multiple enqueue/dequeue operations
 * - empty(): O(1)
 *
 * Space complexity: O(n) - where n is the length of the queue
 */
class MyStack {
  constructor() {
    this.queue = [];
  }

  /**
   * Adds the element to the top of the stack
   */
  push(x) {
    this.queue.push(x);
  }

  /**
   * Removes the element on the top of the stack and return it
   */
  pop() {
    const n = this.queue.length;
    for (let i = 0; i < n - 1; i++) {
      // Use shift() for FIFO behavior
      let firstElementFromQueue = this.queue.shift();
      this.queue.push(firstElementFromQueue);
    }
    return this.queue.shift();
  }

  /**
   * Gets the element on the top of the stack
   */
  top() {
    const n = this.queue.length;
    for (let i = 0; i < n - 1; i++) {
      this.queue.push(this.queue.shift());
    }
    const topElement = this.queue[0];
    const firstElementFromQueue = this.queue.shift();

    // Push back the top element to maintain order
    this.queue.push(firstElement);
    return topElement;
  }

  /**
   * Returns true if the stack is empty, false otherwise
   */
  empty() {
    return this.queue.length === 0;
  }
}
