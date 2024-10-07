/**
 * https://leetcode.com/problems/find-median-from-data-stream/description/
 *
 * Min-Heap & Max-Heap Approach
 *
 * Idea: Split the heap into 2 parts, the first half part will be stored in a max-heap, and the second half part will be stored in a min-heap.
 *
 * - The Max-Heap will store the smaller half of the numbers.
 * - The Min-Heap will store the larger half of the numbers.
 *
 * The goal is to ensure that the two heaps are balanced, so that:
 * - If the total number of elements is `odd`, the extra number is in the max-heap.
 * - If it's `even`, the median is the average of the largest number in the max-heap and the smallest number in the min-heap.
 *
 *
 * Time complexity: O(log n), where n is the number of elements in the heap.
 *
 * Space complexity: O(n + m), where n is the size of smaller heap (max-heap), and m is the size of larger heap (min-heap).
 */
class MedianFinder {
  constructor() {
    this.max = new MaxPriorityQueue(); // Store the first part of a sorted heap
    this.min = new MinPriorityQueue(); // Store the second part of a sorted heap
  }

  addNum(num) {
    this.max.enqueue(num);

    // Make sure every element in the max is less than or equal to the min
    if (
      this.max.size() &&
      this.min.size() &&
      this.max.front().element > this.min.front().element
    ) {
      const max = this.max.dequeue().element;
      this.min.enqueue(max);
    }

    if (this.isOdd()) {
      const max = this.max.dequeue().element;
      this.min.enqueue(max);
    }

    if (this.isEven()) {
      const min = this.min.dequeue().element;
      this.max.enqueue(min);
    }
  }

  findMedian() {
    if (this.isOdd()) {
      return this.max.front().element;
    } else if (this.isEven()) {
      return this.min.front().element;
    } else {
      return (this.max.front().element + this.min.front().element) / 2;
    }
  }

  isEven() {
    return this.max.size() < this.min.size();
  }

  isOdd() {
    return (
      this.max.size() > this.min.size() || this.max.size() > this.min.size() + 1
    );
  }
}

/**
 *
 * Min-Heap & Max-Heap Approach
 *
 * Same approach but simplified implementation
 *
 * Time complexity: O(log n), where n is the number of elements in the heap.
 *
 * Space complexity: O(n + m), where n is the size of smaller heap (max-heap), and m is the size of larger heap (min-heap).
 */
class MedianFinder {
  constructor() {
    // Max-heap to store the smaller half
    this.maxHeap = new MaxPriorityQueue();
    // Min-heap to store the larger half
    this.minHeap = new MinPriorityQueue();
  }

  addNum(num) {
    // Add the new number to the maxHeap
    this.maxHeap.enqueue(num);

    // Ensure that the maxHeap's top is not greater than the minHeap's top
    // If the largest number from smaller heap is greater than smallest number from larger heap
    if (
      this.minHeap.size() &&
      this.maxHeap.front().element > this.minHeap.front().element
    ) {
      // Get the largest number of the max-heap (smaller half) and push into the min-heap (larger half)
      const maxTop = this.maxHeap.dequeue().element;
      this.minHeap.enqueue(maxTop);
    }

    // Balance the sizes of the heaps - ensure that minHeap is always smaller than maxHeap
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      // Get the largest number of the max-heap (smaller half) and push into min-heap (larger half) to balance the size
      const maxTop = this.maxHeap.dequeue().element;
      this.minHeap.enqueue(maxTop);
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      // Get the smallest number of the min-heap (larger half) and push into max-heap (smaller half) to balance the size
      const minTop = this.minHeap.dequeue().element;
      this.maxHeap.enqueue(minTop);
    }
  }

  findMedian() {
    // If odd, return the top of the maxHeap
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.front().element;
    }
    // If even, return the average of the two middle values
    return (this.maxHeap.front().element + this.minHeap.front().element) / 2;
  }
}
