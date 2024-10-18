/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/description/
 *
 * Sorting Approach: We want to find the largest element at the k position. We'll sort the array in descending order and retrieve the element at the k position.
 *
 * Because the array starts from `0`, thus we have to get the element at the `k - 1` position
 *
 * Time complexity: O(n log n) - where n is the length of the array and we sort the array in descending order
 *
 * Space complexity: O(1)
 */
const findKthLargest = (nums, k) => {
  return nums.sort((a, b) => b - a)[k - 1];
};

/**
 * Quickselect Approach
 *
 * 1. In the findKthLargest function, we call the quickSelect function with the original `nums` array and the calculated `kSmallest` index.
 *
 * 2. Inside the quickSelect function, we choose random element from the nums array.
 *
 * 3. We create 3 empty arrays:
 * - left: used to store the elements which are smaller than the randomValue
 * - mid: used to store the elements which are equal to the randomValue
 * - right: used to store the elements which are greater than the randomValue
 *
 * 4. Partitioning: We iterate through each element (num) in the nums array.
 * - 4.1: If current number is equal to the randomValue, we push it to the mid array (elements equal to the randomValue can be ignored for finding the kth largest).
 *
 * - 4.2: If current number is less than the randomValue, we push it to the left array which represents potential candidates for the kth largest element.
 *
 * - 4.3: If current number is greater than the randomValue, we push it to the right array which is not considered relevant for finding the kth largest.
 *
 * 5. Recursion: Based on the value of target kSmallest:
 *
 * - 5.1: If kSmallest is less than the length of the left array, it means the kth largest element resides in the left sub-array. We recursively call quickSelect function with the left sub-array and the same kSmallest value.
 *
 * - 5.2: If kSmallest is equal to the combined length of left and mid arrays, then kSmallest points to the randomValue itself, which is the kth largest element. In this case, we return the randomValue.
 *
 * - 5.3: If kSmallest is greater than the combined length of left and mid arrays, it means the kth largest element resides in the right sub-array. We recursively call quickSelect function with the right sub-array and a modified kSmallest value. This modified value is calculated by subtracting the combined lengths of left and mid arrays from the original kSmallest to adjust the index for the remaining sub-array.
 *
 * Time complexity: O(n) on average, where n is the number of elements in the nums array. O(n^2) on worst case if the algorithm consistently picks the smallest or largest element as the randomValue.
 *
 * Space complexity: O(n), where n is the number of elements in the left, mid and right arrays.
 */
const findKthLargest = (nums, k) => {
  return quickSelect(nums, nums.length - k);
};

const quickSelect = (nums, kSmallest) => {
  // Pick random element from the array
  const randomValue = nums[Math.floor(Math.random() * nums.length)];
  const left = [];
  const mid = [];
  const right = [];

  for (const num of nums) {
    if (num === randomValue) {
      mid.push(num);
    } else if (num < randomValue) {
      // Push all the smaller element to the left
      left.push(num);
    } else {
      // Push all the bigger element to the right
      right.push(num);
    }
  }

  // kSmallest is on the left side
  if (kSmallest < left.length) {
    return quickSelect(left, kSmallest);
  }

  // kSmallest is in the middle
  if (kSmallest < left.length + mid.length) {
    return pivot;
  }

  // kSmallest is in the right side
  return quickSelect(right, kSmallest - left.length - mid.length);
};

/**
 * Quickselect Approach (Optimal Space)
 *
 * Similar approach with previous solution, but with optimized space complexity
 *
 * 1. The quickSelect function takes four arguments:
 * - nums: The array to search.
 * - start: The starting index of the sub-array to consider.
 * - end: The ending index of the sub-array to consider.
 * - kSmallest: The index of the kth smallest element we're searching for within the current sub-array.
 *
 * 2. We choose a random value within the current sub-array.
 *
 * 3. Partitioning: We initialize a left index starting at start.
 * - 3.1: We iterate through the sub-array, and check if the current element (nums[i]) is less than the pivot (randomValue), we swap the current element (nums[i]) with the element at the left index to move all the smaller element to the left of the current random element.
 *
 * - 3.2: We then increase the left index to point to the next position for a smaller element.
 *
 * 4. We initialize a right index starting at end.
 * - 4.1:  We iterate from the end of the sub-array, and check if the current element (nums[i]) is greater than the pivot (randomValue), we swap the current element (nums[i]) with the element at the right index to move all the larger element to the right of the current random element.
 *
 * - 4.2: We then decrease the right index to point to the next position for a larger element.
 *
 * 5. Recursion: Based on the value of target kSmallest:
 * - 5.1: If the kSmallest index (kSmallest) is less than the final position of the smaller elements (left - 1), it means the kth smallest element must be in the left sub-array. We recursively call quickSelect function with the left sub-array.
 *
 * - 5.2: If the kSmallest index (kSmallest) is less than or equal to the final position of the larger elements (right), it means the pivot element (randomValue) is the kth smallest element. We return the randomValue as the kth largest element.
 *
 * - 5.3: Otherwise, the kth smallest element must be in the right sub-array. We recursively call quickSelect function with the right sub-array.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(1)
 */
const findKthLargest = (nums, k) => {
  const n = nums.length;
  return quickSelect(nums, 0, n - 1, n - k);
};

const quickSelect = (nums, start, end, kSmallest) => {
  // Pick random element from the array
  const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;
  const randomValue = nums[randomIndex];

  // Move all the smaller element to the left
  let left = start;
  for (let i = start; i <= end; i++) {
    if (nums[i] < randomValue) {
      [nums[left], nums[i]] = [nums[i], nums[left]];
      left += 1;
    }
  }

  // Move all the bigger element to the right
  let right = end;
  for (let i = end; i >= start; i--) {
    if (nums[i] > randomValue) {
      [nums[right], nums[i]] = [nums[i], nums[right]];
      right -= 1;
    }
  }

  // kSmallest is on the left side
  if (kSmallest < left) {
    return quickSelect(nums, start, left - 1, kSmallest);
  }
  // kSmallest is in the middle
  if (kSmallest <= right) {
    return randomValue;
  }

  // kSmallest is in the right side
  return quickSelect(nums, right + 1, end, kSmallest);
};

/**
 * Heap - Min Binary Heap
 *
 * Time complexity: O(n log k), where n is the number of elements, and inserting takes O(log k), where k is the size of the heap.
 *
 * Space complexity: O(k), where k is the size of the heap.
 */
class MinBinaryHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    // Add a new value to the last of the heap
    this.heap.push(value);
    // Bubble it up from the last added value
    this.#bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#sinkDown(0);

    return min;
  }

  getMin() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  #bubbleUp(index) {
    let parentIndex = Math.floor((index - 1) / 2); // (n - 1) / 2

    // If there is more than one value in the heap
    // And the parent is greater than new value
    while (index > 0 && this.heap[parentIndex] > this.heap[index]) {
      // Swap new value with the parent value (parent < child)
      this.#swap(index, parentIndex);

      // Update the index of new value and parent value
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  #sinkDown(index) {
    const length = this.heap.length;
    let smallest = index;

    // Get the left and right child indexes of the current index
    const leftChildIdx = 2 * index + 1;
    const rightChildIdx = 2 * index + 2;

    // If the leftChildIdx is inbound of the heap
    // And the current leftChild value is less than the current value
    if (
      leftChildIdx < length &&
      this.heap[leftChildIdx] < this.heap[smallest]
    ) {
      // Update smallest to be the leftChild
      smallest = leftChildIdx;
    }

    // If the rightChildIdx is inbound of the heap
    // And the current rightChild value is less than the current value
    if (
      rightChildIdx < length &&
      this.heap[rightChildIdx] < this.heap[smallest]
    ) {
      // Update smallest to be the rightChild
      smallest = rightChildIdx;
    }

    // If the current index is not the smallest yet
    if (smallest !== index) {
      this.#swap(index, smallest);
      this.#sinkDown(smallest);
    }
  }

  #swap(index, parent) {
    [this.heap[index], this.heap[parent]] = [
      this.heap[parent],
      this.heap[index],
    ];
  }
}

const findKthLargest = (nums, k) => {
  const minHeap = new MinBinaryHeap();

  // Insert each number from the input array nums into the min-heap.
  // If the heap size exceeds k, remove the smallest element from the heap by calling extractMin(). This ensures that the heap always contains the largest k elements.
  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin();
    }
  }

  return minHeap.getMin();
};
