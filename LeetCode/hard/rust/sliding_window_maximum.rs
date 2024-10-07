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
use std::collections::VecDeque;

struct MaxQueue {
    queue: VecDeque<i32>,
}

impl MaxQueue {
    fn new() -> Self {
        Self {
            queue: VecDeque::new(),
        }
    }

    fn enqueue(&mut self, element: i32) {
        while !self.queue.is_empty() && *self.queue.back().unwrap() < element {
            self.queue.pop_back();
        }
        self.queue.push_back(element);
    }

    fn dequeue(&mut self, removed_element: i32) -> i32 {
        if !self.queue.is_empty() && *self.queue.front().unwrap() == removed_element {
            self.queue.pop_front().unwrap()
        } else {
            removed_element
        }
    }

    // Get the maximum element in the queue
    fn get_max(&self) -> Option<i32> {
        self.queue.front().copied()
    }
}

impl Solution {
    pub fn max_sliding_window(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let n = nums.len();
        let mut max_queue = MaxQueue::new();
        let mut result: Vec<i32> = vec![0; n - k + 1];

        // Fill initial window in the MaxQueue
        for i in 0..k {
            max_queue.enqueue(nums[i]);
        }

        // Calculate maximum for each window
        for i in k..n {
            // Get maximum from MaxQueue
            result[i - k] = max_queue.get_max().unwrap();

            // Move window by dequeuing the element leaving the window
            max_queue.dequeue(nums[i - k]);

            // Add the current element to the MaxQueue
            max_queue.enqueue(nums[i]);
        }

        // Get the maximum for the last window
        result[n - k] = max_queue.get_max().unwrap();

        result
    }
}
