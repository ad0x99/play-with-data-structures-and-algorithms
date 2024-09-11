/**
 * https://leetcode.com/problems/furthest-building-you-can-reach/description/
 *
 * Min Heap Approach
 *
 * Idea: Prioritize using ladders as much as possible for largest jumps (tallest building differences). And then, using bricks for the smaller jumps to converse ladders for when they are most needed.
 *
 * Implementation
 *
 * 1. We use a min-heap (minHeap) to store the differences between buildings (i.e., how much higher the next building is compared to the current one). A heap is used because we need to prioritize the smallest differences for bricks, leaving ladders for larger differences.
 *
 * 2. We loop through each building, and compare the difference of distance of each building with the next one.
 *
 * 3. For each pair of consecutive buildings, we calculate the difference in height. If the next building is taller than the current one (distanceBetweenBuildings > 0), we must decide whether to use bricks or a ladder to overcome the difference.
 *
 * 4. If the height difference is greater than zero (i.e., the next building is taller), we insert the difference into the min-heap. The min-heap ensures that the smallest height differences are at the root of the heap, so that ladders can be used on the largest differences.
 *
 * 5. If the size of the min-heap exceeds the number of ladders available, we start using bricks for the smallest jumps (those at the top of the min-heap).
 *
 * 6. After that, we use remove the smallest height difference from the heap, and subtract that difference from the number of bricks, indicating the number of bricks have been used.
 *
 * 7. If we've used more bricks than available (bricks < 0), it means we can’t make this jump, so return the index of the current building which is the furthest building we can reach.
 *
 * 8. If we successfully get through all the buildings without running out of bricks or ladders, we return the last building's index (n - 1), meaning we've reached the furthest building.
 *
 * Time complexity: O(n log n)
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
    let parentIndex = Math.floor((index - 1) / 2);

    while (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  sinkDown(index) {
    const n = this.heap.length;
    let smallest = index;

    const leftIdx = 2 * index + 1;
    const rightIdx = 2 * index + 2;

    if (leftIdx < n && this.heap[leftIdx] < this.heap[smallest]) {
      smallest = leftIdx;
    }

    if (rightIdx < n && this.heap[rightIdx] < this.heap[smallest]) {
      smallest = rightIdx;
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

const furthestBuilding = (heights, bricks, ladders) => {
  const minHeap = new MinHeap();
  const n = heights.length;

  for (let i = 0; i < n - 1; i++) {
    const distanceBetweenBuildings = heights[i + 1] - heights[i];

    // Uses ladders, and stores bricks for later use
    if (distanceBetweenBuildings > 0) {
      minHeap.insert(distanceBetweenBuildings);
    }

    // Uses bricks
    if (minHeap.size() > ladders) {
      bricks -= minHeap.extractMin();

      if (bricks < 0) return i; // Furthest building can be reached
    }
  }

  // Reached to the last building
  return n - 1;
};
