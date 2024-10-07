/**
 * https://leetcode.com/problems/design-circular-queue/description/
 *
 * We create a new array of size `k` and fill it with `0`. This pre-initializes the queue with empty slots (represented by zeros).
 * We initialize
 * - The `headIndex` to `0`, which points to the first element (initially empty) in the queue.
 * - The `count` to `0`, indicating an empty queue initially.
 * - We store the `maximum capacity` (`k`) of the queue.
 *
 * Time complexity: O(1) for all operations
 *
 * Space complexity: O(n) - where n the length of the queue
 */
class MyCircularQueue {
  constructor(k) {
    this.queue = new Array(k).fill(0);
    this.count = 0;
    this.headIndex = 0;
    this.capacity = k;
  }

  /**
   * Inserts an element into the circular queue.
   */
  enQueue(value) {
    // Check if the queue is full
    if (this.isFull()) {
      return false;
    }

    /**
     * Calculates the index for the new element (tailIndex) using the modulo operator (%).
     *
     * this.headIndex: Points to the first element (initially empty).
     * this.count: Represents the number of elements currently in the queue.
     *
     * If the calculated index (tailIndex) reaches the end of the array (equal to the capacity), the modulo operation ensures it wraps around to the beginning, effectively achieving circular behavior. For example:
     *
     * Consider a queue with capacity of 5 and headIndex at 2 (pointing to the 3rd element).
     *
     * If you try to enqueue a new element (count is already 4), the calculation would be:
     * - tailIndex = (2 + 4) % 5 = 1
     *
     * The modulo operation ensures tailIndex becomes 1, which points to the second element in the array, allowing the new element to be inserted there while maintaining the circular order.
     *
     * The modulo operation ensures the index wraps around to the beginning of the array if it reaches the end (circular behavior).
     */
    const tailIndex = (this.headIndex + this.count) % this.capacity;
    this.queue[tailIndex] = value;
    this.count++;
    return true;
  }

  /**
   * Deletes an element from the circular queue.
   */
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }

    /**
     * Updates the headIndex using the modulo operator.
     * This effectively moves the head pointer to the next element in the queue (circular behavior).
     *
     * This line updates the headIndex to point to the next element after removing the front element. The modulo operation is used here to handle the scenario where the headIndex reaches the end of the array.
     *
     * If headIndex is currently at the last element (equal to capacity -1), the modulo operation ensures it wraps around to 0, pointing to the beginning of the array for the next element to be considered the front. This maintains the circular queue behavior.
     */
    this.headIndex = (this.headIndex + 1) % this.capacity;
    this.count--;
    return true;
  }

  /**
   * Gets the front item from the queue.
   */
  Front() {
    if (this.isEmpty()) {
      return -1;
    }

    // Gets the value at the head of the queue
    return this.queue[this.headIndex];
  }

  /**
   * Gets the last item from the queue.
   */
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }

    /**
     * Gets the value at the tail of the queue
     * Calculates the index for the rear element (rearIndex) using the modulo operator.
     *
     * this.headIndex: Points to the first element.
     * this.count: Represents the number of elements.
     * Subtracting 1 accounts for the zero-based indexing and ensures we get the index of the last element.
     *
     * Subtracting 1 from `this.count` accounts for zero-based indexing and ensures we get the index of the last element.
     *
     * If the calculated index (rearIndex) goes below 0 (meaning it would point before the first element), the modulo operation ensures it wraps around to the end of the array, effectively finding the rear element in the circular queue.
     *
     */
    const rearIndex = (this.headIndex + this.count - 1) % this.capacity;
    return this.queue[rearIndex];
  }

  /**
   * Checks whether the circular queue is empty or not.
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * Checks whether the circular queue is full or not.
   */
  isFull() {
    return this.count === this.capacity;
  }
}
