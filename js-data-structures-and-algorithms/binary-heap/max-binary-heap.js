export class MaxBinaryHeap {
  constructor() {
    this.heap = [];
  }

  /**
   * Adds a new value to the heap and then bubbles it up to maintain the heap property.
   */
  insert(value) {
    // Add a new value to the last of the heap
    this.heap.push(value);
    // Bubble it up from the last added value
    this.#bubbleUp(this.heap.length - 1);
    return this;
  }

  /**
   * Extracts the maximum value from an array and rearranges the remaining elements to maintain the heap property.
   */
  extractMax() {
    // If there is only one element, then do nothing
    if (this.heap.length === 1) return null;

    const max = this.heap[0];
    // Take the last value and assign it to be the new root
    const end = this.heap.pop();
    this.heap[0] = end;
    this.#sinkDown(0);

    return max;
  }

  /**
   * Moves a value up in a binary heap until it reaches its correct position.
   */
  #bubbleUp(index) {
    let parentIndex = Math.floor((index - 1) / 2); // (n - 1) / 2
    const parent = this.heap[parentIndex];
    const value = this.heap[index];

    // If there is more than one value in the heap
    // And the parent is less than value value
    while (index > 0 && parent < value) {
      // Swap new value with the parent value (parent > child)
      this.#swap(index, parentIndex);

      // Update index of new value and parent value
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  /**
   * Maintains the heap property by moving a value down the heap until it is in the correct position.
   *
   * Sink down: the procedure for deleting the root from the heap (effectively extracting the maximum element in a max-heap or the minimum element in a min-heap) and restoring the properties is called `down-heap` (also known as `bubble-down`, `percolate-down`, `sift-down`, `trickle-down`, `heapify-down`, `cascade-down`, and `extract-min/max`)
   *
   */
  #sinkDown(index) {
    const length = this.heap.length;
    const value = this.heap[index];
    let largest = index;

    // Get the left and right child indexes of the current index
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;

    // If the leftChildIdx is inbound of the heap
    // And the current leftChild value is less than the current value
    if (
      leftChildIndex < length &&
      this.heap[leftChildIndex] > this.heap[largest]
    ) {
      largest = leftChildIndex;
    }

    // If the rightChildIdx is inbound of the heap
    // And the current rightChild value is less than the current value
    if (
      rightChildIndex < length &&
      this.heap[rightChildIndex] > this.heap[largest]
    ) {
      largest = rightChildIndex;
    }

    // If the current index is not the largest yet
    if (largest !== index) {
      this.#swap(index, largest);
      this.#sinkDown(largest);
    }
  }

  #swap(index, parent) {
    [this.heap[index], this.heap[parent]] = [
      this.heap[parent],
      this.heap[index],
    ];
  }
}
