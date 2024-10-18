/**
 * https://leetcode.com/problems/top-k-frequent-elements/description/
 *
 * Counting Sort Approach
 *
 * Idea: Sort the elements by its frequency and return the k elements from sorted array.
 *
 * 1. We create a frequencies Map to store the frequency of the each element from the nums array.
 *
 * 2. We iterate through each element, count the frequency and push into frequencies Map.
 *
 * 3. We sort the elements by frequency.
 *
 * 4. We create an result array to store the most frequent elements from sorted array.
 *
 * 5. We iterate through each element, and push k unique sorted element into result array. Inside the loop:
 * - 5.1: If the current number is not existed in result array, and the result array's length is less than k (because we want to push unique element and k elements into the result array), we then push the current number into result array.
 *
 * - 5.2: If the result array contains exact k elements, we immediately break the loop to avoid redundant iteration.
 *
 * 6. We return the result array which contains the most frequent elements.
 *
 * Time complexity: O(n log n), where n is the number of elements in nums array
 *
 * Space complexity: O(n), where n is the number of elements in frequencies Map
 */
use std::collections::HashMap;
impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut frequencies = HashMap::new();

        // Calculate the frequencies of each number
        for &num in &nums {
            *frequencies.entry(num).or_insert(0) += 1;
        }

        // Create a vector of numbers sorted by their frequency in descending order
        let mut nums_sorted: Vec<_> = nums.clone();
        nums_sorted.sort_unstable_by(|a, b| frequencies.get(b).cmp(&frequencies.get(a)));

        // Get the top k frequent elements
        let mut result = Vec::new();
        let mut seen = HashMap::new();
        for &num in &nums_sorted {
            if !seen.contains_key(&num) {
                result.push(num);
                seen.insert(num, true);
            }
            if result.len() == k as usize {
                break;
            }
        }

        result
    }
}

/**
 * Bucket Sort Approach
 *
 * Idea: We count the frequency of each element. And then we store each element into specific bucket based on its frequency. After that, we sort the element based on the frequency in the bucket.
 *
 * 1. We create a frequencies Map to store the frequency of each number.
 *
 * 2. We iterate through each element, count the frequency and push into frequencies Map.
 *
 * 3. We create a bucket array with a length equal to the maximum possible frequency (nums.length + 1) where each element is an empty array.
 *
 * 4. We iterate through the key-value pairs of the frequencies map. For each number (num) and its frequency (freq), we push the num to the bucket[freq] array. This essentially creates buckets where each bucket index represents a frequency and the array at that index stores the numbers that have that frequency.
 *
 * 5. We initialize an empty array sorted_unique_nums to store the final result (k most frequent numbers).
 *
 * 6. We iterate through the bucket array in reverse order. This ensures that higher frequencies are processed first.
 * - 6.1: We iterate through the numbers (num) stored in the current bucket bucket[freq], and check if the current number (num) already exists in the sorted_unique_nums array, we continue to next number. This avoids adding duplicate numbers even if they have the same frequency.
 *
 * - 6.2: If the number is not yet present, we push the num to the sorted_unique_nums array.
 *
 * 7. After iterating through all buckets and collecting numbers, we extract and return the first k elements from the array, representing the k most frequent numbers encountered in the original sorted_unique_nums array.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(n), where n is the number of elements in the frequencies Map, bucket array, and sortedNums array.
 */
use std::collections::HashMap;
impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut frequencies = HashMap::new();
        for &num in &nums {
            *frequencies.entry(num).or_insert(0) += 1;
        }

        let mut bucket: Vec<Vec<i32>> = vec![Vec::new(); nums.len() + 1];
        for (&num, &freq) in &frequencies {
            bucket[freq].push(num);
        }

        let mut sorted_unique_nums = Vec::new();
        for freq in (0..=nums.len()).rev() {
            for &num in &bucket[freq] {
                sorted_unique_nums.push(num);
                if sorted_unique_nums.len() == k as usize {
                    return sorted_unique_nums;
                }
            }
        }

        sorted_unique_nums
    }
}

/**
 * Max Heap Approach
 *
 * Idea:
 *
 * - Count the frequency of each element
 * - Store the each element to the max heap based on the its frequency. The biggest one would be at first of the max heap
 * - Extract first k element(s) from max heap, representing k largest elements.
 *
 * Time complexity: O(n log n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(n), where n is the size of the heap.
 */
use std::collections::HashMap;

struct MaxHeap {
    heap: Vec<(i32, i32)>, // (frequency, number)
}

impl MaxHeap {
    pub fn new() -> Self {
        MaxHeap { heap: Vec::new() }
    }

    pub fn insert(&mut self, value: (i32, i32)) {
        self.heap.push(value);
        self.bubble_up(self.heap.len() - 1);
    }

    pub fn extract_max(&mut self) -> (i32, i32) {
        if self.heap.len() == 1 {
            return self.heap.pop().unwrap();
        }

        let max = self.heap[0];
        let last = self.heap.pop().unwrap();
        self.heap[0] = last;
        self.sink_down(0);

        max
    }

    fn bubble_up(&mut self, mut index: usize) {
        while index > 0 {
            let parent_idx = (index - 1) / 2;
            if self.heap[index].0 > self.heap[parent_idx].0 {
                self.swap(index, parent_idx);
                index = parent_idx;
            } else {
                break;
            }
        }
    }

    fn sink_down(&mut self, mut index: usize) {
        let length = self.heap.len();
        loop {
            let left_child_idx = 2 * index + 1;
            let right_child_idx = 2 * index + 2;
            let mut largest = index;

            if left_child_idx < length && self.heap[left_child_idx].0 > self.heap[largest].0 {
                largest = left_child_idx;
            }

            if right_child_idx < length && self.heap[right_child_idx].0 > self.heap[largest].0 {
                largest = right_child_idx;
            }

            if largest != index {
                self.swap(index, largest);
                index = largest;
            } else {
                break;
            }
        }
    }

    fn swap(&mut self, i: usize, j: usize) {
        self.heap.swap(i, j);
    }

    pub fn size(&self) -> usize {
        self.heap.len()
    }
}

impl Solution {
    pub fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
        // Build frequency map
        let mut frequencies = HashMap::new();
        for &num in &nums {
            *frequencies.entry(num).or_insert(0) += 1;
        }

        // Create a max heap
        let mut max_heap = MaxHeap::new();

        // Insert all elements from the frequency map into the heap
        for (&num, &frequency) in frequencies.iter() {
            max_heap.insert((frequency, num));
        }

        // Extract the top k frequent elements
        let mut result = Vec::new();
        for _ in 0..k {
            let (_, num) = max_heap.extract_max();
            result.push(num);
        }

        result
    }
}
