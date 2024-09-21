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
use std::cmp::Reverse;
use std::collections::BinaryHeap;

struct MedianFinder {
    max_heap: BinaryHeap<i32>,          // Max-heap to store the smaller half
    min_heap: BinaryHeap<Reverse<i32>>, // Min-heap to store the larger half (Reverse used to mimic min-heap)
}

impl MedianFinder {
    fn new() -> Self {
        MedianFinder {
            max_heap: BinaryHeap::new(),
            min_heap: BinaryHeap::new(),
        }
    }

    // Adds a number to the data structure
    fn add_num(&mut self, num: i32) {
        // Add the new number to the max_heap
        self.max_heap.push(num);

        // Balance between max_heap and min_heap
        if let Some(&max_top) = self.max_heap.peek() {
            if let Some(&Reverse(min_top)) = self.min_heap.peek() {
                if max_top > min_top {
                    self.min_heap.push(Reverse(self.max_heap.pop().unwrap()));
                }
            }
        }

        // Maintain balance by size between heaps
        if self.max_heap.len() > self.min_heap.len() + 1 {
            self.min_heap.push(Reverse(self.max_heap.pop().unwrap()));
        } else if self.min_heap.len() > self.max_heap.len() {
            self.max_heap.push(self.min_heap.pop().unwrap().0);
        }
    }

    // Finds the median from the current numbers
    fn find_median(&self) -> f64 {
        if self.max_heap.len() > self.min_heap.len() {
            *self.max_heap.peek().unwrap() as f64
        } else {
            let max_top = *self.max_heap.peek().unwrap() as f64;
            let min_top = self.min_heap.peek().unwrap().0 as f64;
            (max_top + min_top) / 2.0
        }
    }
}
