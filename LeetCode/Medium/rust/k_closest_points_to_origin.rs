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
impl Solution {
    pub fn k_closest(points: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let mut distances: Vec<(i32, i32, i32)> = Vec::new();
        for point in &points {
            let x = point[0];
            let y = point[1];
            let distance = x * x + y * y;
            distances.push((distance, x, y));
        }

        distances.sort_by(|a, b| a.0.cmp(&b.0));

        let mut result: Vec<Vec<i32>> = Vec::new();
        for i in 0..k as usize {
            let (_, x, y) = distances[i];
            result.push(vec![x, y]);
        }
        result
    }
}

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
use std::collections::HashMap;

struct MinHeap {
    heap: Vec<(i32, i32, i32)>, // (distance, x, y)
}

impl MinHeap {
    pub fn new() -> Self {
        MinHeap { heap: Vec::new() }
    }

    pub fn insert(&mut self, value: (i32, i32, i32)) {
        self.heap.push(value);
        self.bubble_up(self.heap.len() - 1);
    }

    pub fn extract_min(&mut self) -> (i32, i32, i32) {
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
            if self.heap[index].0 < self.heap[parent_idx].0 {
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

            if left_child_idx < length && self.heap[left_child_idx].0 < self.heap[smallest].0 {
                smallest = left_child_idx;
            }

            if right_child_idx < length && self.heap[right_child_idx].0 < self.heap[smallest].0 {
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
    pub fn k_closest(points: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let mut min_heap = MinHeap::new();

        for point in &points {
            let x = point[0];
            let y = point[1];
            let distance = x * x + y * y;
            min_heap.insert((distance, x, y));
        }

        let mut result: Vec<Vec<i32>> = Vec::new();
        for i in 0..k as usize {
            let (_, x, y) = min_heap.extract_min();
            result.push(vec![x, y]);
        }
        result
    }
}
