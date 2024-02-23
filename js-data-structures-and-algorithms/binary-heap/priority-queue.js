import { PriorityNode } from '../data-structures/index.js';

/**
 * The `PriorityQueue` class is a data structure that allows for efficient insertion and removal of
elements based on their priority using Min Binary Heap implementation.
 */
export class PriorityQueue {
  constructor() {
    this.values = [];
  }

  /**
   * The enqueue function adds a new value to the heap and then bubbles it up to maintain the heap
   * property.
   *
   * Pseudocode - Enqueue
   *
   * 1. This function accepts 2 arguments are value and priority
   * 2. Create a new node with the args are passed into
   * 3. Push the new node to the last of the array on the heap
   * 2. Bubble the value up to its correct spot
   * 2.1 Create a variable called `index` which is the length of the array minus 1
   * 2.2 Create a variable called `parentIndex` which is the floor of (index - 1) / 2
   * 2.3 Keep looping as long as the values element at the `parentIndex` is greater than the values element at the child index
   * 2.4 Then, swap the new value with the value at the `parentIndex`
   * 2.5 Set the index to be the `parentIndex`, and start over
   * 3. Return the new list of values
   *
   * @param value - The value parameter represents the value that you want to insert into the heap.
   * @returns The "this" object is being returned.
   */
  enqueue(value, priority) {
    let newNode = new PriorityNode(value, priority);
    this.values.push(newNode);
    this.#bubbleUp();
    return this;
  }

  /**
   * The function `bubbleUp()` is used to move a value up in a binary heap until it reaches its correct position.
   */
  #bubbleUp() {
    let index = this.values.length - 1;
    const value = this.values[index];

    // If there is more than one value in the array
    while (index > 0) {
      // To get the root parent of current child: (n - 1) / 2
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.values[parentIndex];

      // If new value's priority is greater than parent' priority, then break the loop
      if (value.priority >= parent.priority) break;

      // Otherwise, swap new value with the parent value
      this.values[parentIndex] = value;
      this.values[index] = parent;
      // Update index of new value and parent value
      index = parentIndex;
    }

    return;
  }

  /**
   * The function extracts the minimum value from an array and rearranges the remaining elements to
   * maintain the heap property.
   *
   * Pseudocode - Dequeue
   *
   * 1. Swap the first value with the last value in the array
   * 2. Pop from the values array, then can return the value at the end
   * 3. Have the new root `sink down` to the correct spot
   * 3.1 Parent index starts at 0 (the root)
   * 3.2 Find the index of the left child: `2 * index + 1` (make sure its not out of bounds)
   * 3.3 Find the index of the right child: `2 * index + 2` (make sure its not out of bounds)
   * 3.4 If the left or right child is less than the value, then swap. If both left and right children are smaller, swap with smallest one
   * 3.5 The child index which is swapped to now becomes the new parent index
   * 3.6 Keep looping and swapping until neither child is smallest than the value
   * 4. Return the old root (removed value)
   *
   * @returns The minimum value that was extracted from the heap.
   */
  dequeue() {
    // If there is only one element, then do nothing
    if (this.values.length === 1) return null;

    const min = this.values[0];
    // Take the last value and assign it to be the new root
    const end = this.values.pop();
    this.values[0] = end;
    this.#sinkDown();

    return min;
  }

  /**
   * The function `sinkDown` is used to maintain the heap property by moving a value down the heap until it is in the correct position.
   *
   * Sink down: the procedure for deleting the root from the heap (effectively extracting the maximum element in a max-heap or the minimum element in a min-heap) and restoring the properties is called `down-heap` (also known as `bubble-down`, `percolate-down`, `sift-down`, `trickle-down`, `heapify-down`, `cascade-down`, and `extract-min/max`)
   *
   * @returns Nothing is being returned. The function does not have a return statement.
   */
  #sinkDown() {
    let index = 0;
    const length = this.values.length;
    const value = this.values[index];

    while (true) {
      // Get the left and right child indexes of current root
      // To get the left child of current root: 2n + 1
      // To get the right child of current root: 2n + 2
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];

        // If leftChild priority is less than current root priority, then swap
        if (leftChild.priority <= value.priority) {
          swap = leftChildIndex;
        }

        if (rightChildIndex < length) {
          rightChild = this.values[rightChildIndex];

          // If has no swap the leftChild yet, and the rightChild priority is less than the current root priority
          // Or if leftChild has been swapped but rightChild priority is less than leftChild priority, then swap
          if (
            (!swap && rightChild.priority < value.priority) ||
            (swap && rightChild.priority < leftChild.priority)
          ) {
            swap = rightChildIndex;
          }
        }
      }

      // If no swap is happened, then break the loop
      if (!swap) break;

      // If swap is done
      // Update swap value and the current root value
      this.values[index] = this.values[swap];
      this.values[swap] = value;
      // Update the new index to swapped value
      index = swap;
    }

    return;
  }
}
