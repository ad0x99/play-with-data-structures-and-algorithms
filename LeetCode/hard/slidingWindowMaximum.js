/**
 * https://leetcode.com/problems/sliding-window-maximum/
 *
 * Max Queue Approach
 *
 * Using a Max Queue to keep track the maximum value of each window that contains k elements.
 *
 * Max Queue Implementation:
 *
 * 1. The enqueue function adds a new element to the queue and keep only the maximum value at the end of queue
 * - 1.1: We iterate through the maxQueue from the back
 *
 * - 1.2: If the current element in the queue is smaller than the new element, we remove the smaller element. This ensures the maximum element remains at the front.
 *
 * - 1.3: Finally, we add the new element to the back of the queue
 *
 * 2. The dequeue function removes an element from the queue:
 * - 2.1: We check if the removedElement is the same as the element at the front of the queue. This indicates the element being removed was the maximum. We remove it.
 *
 * - 2.2: We return the removedElement.
 *
 * 3. The getMax function simply returns the element at the front of the queue which is guaranteed to be the maximum element.
 *
 * Apply Max Queue to get the maximum element
 *
 * 1. We create a new instance of MaxQueue called maxQueue to store the maximum elements within the current window.
 *
 * 2. We create an empty array result of size n - k + 1 to store the maximum element for each window.
 *
 * 3. In the first loop, we iterate through the first k elements of the nums array and add each element to the maxQueue. This ensures the maxQueue reflects the maximum element within the initial window.
 *
 * 4. In the second loop, we iterate through the remaining elements of the array and simulate a sliding window of size k moving from left to right.
 * - 4.1: Calculate maximum: At each iteration, we call the getMax function to retrieve the current maximum element within the window and store it in the corresponding position (i - k) of the result array.
 *
 * - 4.2: Move window: we call dequeue function to remove the element leaving the window (nums[i - k]) from the maxQueue only if it was the current maximum element. This is because the dequeue function only removes the front element if it matches the removedElement.
 *
 * - 4.3: Finally, we call enqueue function to add the current element (nums[i]) to the maxQueue. This updates the maxQueue to reflect the elements within the new window position.
 *
 * 5. After iterating through all elements, we call getMax function one last time to get the maximum element for the final window position and store it in the last position (n - k) of the result array.
 *
 * 6. Finally, we return the result array which contains the maximum element for each window of size k in the original nums array.
 *
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 * - enqueue(): O(1)
 * - dequeue(): O(1)
 *
 * Space complexity: O(n), where n is the length of the maxQueue.
 */
class MaxQueue {
  constructor() {
    this.maxQueue = new Array();
  }

  enqueue(element) {
    while (
      this.maxQueue.length > 0 &&
      this.maxQueue[this.maxQueue.length - 1] < element
    ) {
      this.maxQueue.pop();
    }

    this.maxQueue.push(element);
  }

  dequeue(removedElement) {
    if (removedElement === this.maxQueue[0]) {
      this.maxQueue.shift();
    }

    return removedElement;
  }

  getMax() {
    return this.maxQueue[0];
  }
}

const maxSlidingWindow = (nums, k) => {
  const n = nums.length;
  let maxQueue = new MaxQueue();
  let result = new Array(n - k + 1);

  for (let i = 0; i < k; i++) {
    maxQueue.enqueue(nums[i]);
  }

  for (let i = k; i < n; i++) {
    // Calculate the maximum
    result[i - k] = maxQueue.getMax();

    // Move window to the right
    maxQueue.dequeue(nums[i - k]);

    // Add the current element to the queue
    maxQueue.enqueue(nums[i]);
  }

  result[n - k] = maxQueue.getMax();
  return result;
};

/**
 * Same approach as the previous solution but uses function implementation instead of class
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(n)
 */
const maxSlidingWindow = (nums, k) => {
  const n = nums.length;
  let maxQueue = new Array();
  let result = new Array(n - k + 1);

  const enqueue = (element) => {
    while (maxQueue.length > 0 && maxQueue[maxQueue.length - 1] < element) {
      maxQueue.pop();
    }

    maxQueue.push(element);
  };

  const dequeue = (element) => {
    if (element === maxQueue[0]) {
      maxQueue.shift();
    }
  };

  for (let i = 0; i < k; i++) {
    enqueue(nums[i]);
  }

  for (let i = k; i < n; i++) {
    // Calculate the maximum
    result[i - k] = maxQueue[0];

    // Move window to the right
    dequeue(nums[i - k]);

    // Add the current element to the queue
    enqueue(nums[i]);
  }

  result[n - k] = maxQueue[0];
  return result;
};

/**
 * Brute Force Approach - TLE
 *
 * Time complexity: O(n * k)
 *
 * Space complexity: O(n)
 *
 */
const maxSlidingWindow = (nums, k) => {
  const n = nums.length;
  let result = new Array(n - k + 1).fill(0);

  for (let i = 0; i < n - k + 1; i++) {
    // Slide through each window of size k
    const window = nums.slice(i, i + k);

    // Calculate the maximum
    const max = Math.max(...window);

    // Assign the max value at corresponding position
    result[i] = max;
  }

  return result;
};
