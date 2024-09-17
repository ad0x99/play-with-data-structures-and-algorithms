/**
 * https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/
 *
 * Min-Heap Approach
 *
 * Idea:
 *
 * - Insert all elements in the matrix into the min-heap.
 * - Extract the kth smallest element from the min-heap
 *
 * Time complexity: O(n * m log k), where n is the number of rows, m is the number of columns, and k is the number of elements in the matrix.
 *
 * Space complexity: O(k), where k is the number of elements in the matrix.
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();

    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);

    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    let parentIdx = Math.floor((index - 1) / 2);

    while (index > 0 && this.heap[parentIdx] > this.heap[index]) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    let smallest = index;

    const leftChildIdx = 2 * index + 1;
    const rightChildIdx = 2 * index + 2;

    if (
      leftChildIdx < length &&
      this.heap[leftChildIdx] < this.heap[smallest]
    ) {
      smallest = leftChildIdx;
    }

    if (
      rightChildIdx < length &&
      this.heap[rightChildIdx] < this.heap[smallest]
    ) {
      smallest = rightChildIdx;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.sinkDown(smallest);
    }
  }

  swap(index, parentIdx) {
    [[this.heap[index], this.heap[parentIdx]]] = [
      [this.heap[parentIdx], this.heap[index]],
    ];
  }
}

const kthSmallest = (matrix, k) => {
  const minHeap = new MinHeap();

  // Insert all elements into the min-heap
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      minHeap.insert(matrix[row][col]);
    }
  }

  // Extract the smallest element `k` times
  let kthSmallest = 0;
  for (let i = 0; i < k; i++) {
    kthSmallest = minHeap.extractMin();
  }

  return kthSmallest;
};
