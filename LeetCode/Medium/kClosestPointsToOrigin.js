/**
 * https://leetcode.com/problems/k-closest-points-to-origin/description/
 *
 * Brute Force Approach
 *
 * Idea:
 *
 * - 1. Calculate the distance between two points, store the result in an array
 * - 2. Sort the calculated distance in ascending order (because we want to get smallest one first)
 * - 3. Get k result from sorted distances.
 *
 * Time complexity: O(n log n), where n is the number of points and sorting.
 *
 * Space complexity: O(n), where n is the number of points.
 */
const kClosest = (points, k) => {
  const distances = [];

  // Calculate the distance between 2 points
  for (const [x, y] of points) {
    const distance = x * x + y * y;
    distances.push([distance, x, y]);
  }

  // Sort the distances in ascending order - minimum first
  distances.sort((a, b) => a[0] - b[0]);

  // Get k point(s)
  const result = [];
  for (let i = 0; i < k; i++) {
    const [distance, x, y] = distances[i];
    result.push([x, y]);
  }
  return result;
};

/**
 * Min-Heap Approach
 *
 * Idea: We want to know the distance between a specific point to the origin one, and finally get the k closest one.
 *
 * The closest one is the one that has smallest distance between them (from a point to the origin). That means, we can use min-heap to store the distance by leverage the smallest one would be stored at the start of the min-heap, we can get k smallest (closest) points from the heap.
 *
 * Implementation:
 *
 * 1. Min-Heap:
 * - 1.1: The insert method allows us to insert a value to the heap. In this case, we store an array which contains the distance of the current point to the origin and themselves (`[distance, x, y]`) to the heap. We want to store the distance, because it would be used to sort the min-heap.
 *
 * - 1.2: The extractMin method allows us to get the smallest value from the heap.
 *
 * 2. We iterate through each points, calculate the distance from current point to the origin and store it in the heap.
 *
 * 3. As long as the heap is not empty, and we've had k closest point(s) yet.
 * - 3.1: We extract the smallest point from the heap (the closest one would be in the start of the heap).
 * - 3.2: After that, we add the current point to the result array.
 *
 * Time complexity: O(k log n)
 *
 * Space complexity: O(n), where n is the size of the heap.
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

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);

    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    let parentIdx = Math.floor((index - 1) / 2);

    while (index > 0 && this.heap[parentIdx][0] > this.heap[index][0]) {
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
      this.heap[leftChildIdx][0] < this.heap[smallest][0]
    ) {
      smallest = leftChildIdx;
    }

    if (
      rightChildIdx < length &&
      this.heap[rightChildIdx][0] < this.heap[smallest][0]
    ) {
      smallest = rightChildIdx;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.sinkDown(smallest);
    }
  }

  swap(index, parent) {
    [this.heap[index], this.heap[parent]] = [
      this.heap[parent],
      this.heap[index],
    ];
  }
}

const kClosest = (points, k) => {
  const distances = [];
  const minHeap = new MinHeap();

  // Calculate the distance between 2 points
  for (const [x, y] of points) {
    const distance = x * x + y * y;
    minHeap.insert([distance, x, y]);
  }

  // Extract `k` point(s) from min-heap
  const result = [];
  while (minHeap.size() && result.length !== k) {
    const [_, x, y] = minHeap.extractMin();
    result.push([x, y]);
  }
  return result;
};
