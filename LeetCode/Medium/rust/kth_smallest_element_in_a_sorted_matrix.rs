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
use std::collections::HashMap;

struct MinHeap {
    heap: Vec<i32>,
}

impl MinHeap {
    pub fn new() -> Self {
        MinHeap { heap: Vec::new() }
    }

    pub fn insert(&mut self, value: i32) {
        self.heap.push(value);
        self.bubble_up(self.heap.len() - 1);
    }

    pub fn extract_min(&mut self) -> i32 {
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
            if self.heap[index] < self.heap[parent_idx] {
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
            let mut smallest = index;

            if left_child_idx < length && self.heap[left_child_idx] < self.heap[smallest] {
                smallest = left_child_idx;
            }

            if right_child_idx < length && self.heap[right_child_idx] < self.heap[smallest] {
                smallest = right_child_idx;
            }

            if smallest != index {
                self.swap(index, smallest);
                index = smallest;
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
    pub fn kth_smallest(matrix: Vec<Vec<i32>>, k: i32) -> i32 {
        let mut min_heap = MinHeap::new();
        let mut count = 0;

        // Insert all elements into the min-heap
        for row in matrix.iter() {
            for &element in row.iter() {
                min_heap.insert(element);
            }
        }

        // Extract the smallest element `k` times
        let mut kth_smallest = 0;
        for _ in 0..k {
            kth_smallest = min_heap.extract_min();
        }

        kth_smallest
    }
}

/**
 * Min-Heap Approach
 *
 * Idea: Using built-in Binary Heap
 *
 * - Insert all elements in the matrix into the min-heap.
 * - Extract the kth smallest element from the min-heap
 *
 * Time complexity: O(n * m log k), where n is the number of rows, m is the number of columns, and k is the number of elements in the matrix.
 *
 * Space complexity: O(k), where k is the number of elements in the matrix.
 */
use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn kth_smallest(matrix: Vec<Vec<i32>>, k: i32) -> i32 {
        let mut min_heap = BinaryHeap::new();
        let mut count = 0;

        // Insert all elements into the min-heap
        for row in matrix.iter() {
            for &element in row.iter() {
                min_heap.push(Reverse(element));
            }
        }

        // Extract the smallest element `k` times
        let mut kth_smallest = 0;
        for _ in 0..k {
            if let Some(Reverse(val)) = min_heap.pop() {
                kth_smallest = val;
            }
        }

        kth_smallest
    }
}
