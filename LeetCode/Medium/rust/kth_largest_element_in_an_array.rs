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
impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums.clone();
        nums.sort_by(|a, b| b.cmp(a));
        nums[(k - 1) as usize]
    }
}

/**
 * Quickselect Approach
 *
 * 1. In the findKthLargest function, we call the quick_select function with the original `nums` array and the calculated `k_smallest` index.
 *
 * 2. Inside the quick_select function, we choose random element from the nums array.
 *
 * 3. We create 3 empty arrays:
 * - left: used to store the elements which are smaller than the random_value
 * - mid: used to store the elements which are equal to the random_value
 * - right: used to store the elements which are greater than the random_value
 *
 * 4. Partitioning: We iterate through each element (num) in the nums array.
 * - 4.1: If current number is equal to the random_value, we push it to the mid array (elements equal to the random_value can be ignored for finding the kth largest).
 *
 * - 4.2: If current number is less than the random_value, we push it to the left array which represents potential candidates for the kth largest element.
 *
 * - 4.3: If current number is greater than the random_value, we push it to the right array which is not considered relevant for finding the kth largest.
 *
 * 5. Recursion: Based on the value of target k_smallest:
 *
 * - 5.1: If k_smallest is less than the length of the left array, it means the kth largest element resides in the left sub-array. We recursively call quick_select function with the left sub-array and the same k_smallest value.
 *
 * - 5.2: If k_smallest is equal to the combined length of left and mid arrays, then k_smallest points to the random_value itself, which is the kth largest element. In this case, we return the random_value.
 *
 * - 5.3: If k_smallest is greater than the combined length of left and mid arrays, it means the kth largest element resides in the right sub-array. We recursively call quick_select function with the right sub-array and a modified k_smallest value. This modified value is calculated by subtracting the combined lengths of left and mid arrays from the original k_smallest to adjust the index for the remaining sub-array.
 *
 * Time complexity: O(n) on average, where n is the number of elements in the nums array. O(n^2) on worst case if the algorithm consistently picks the smallest or largest element as the random_value.
 *
 * Space complexity: O(n), where n is the number of elements in the left, mid and right arrays.
 */
use rand::Rng;
impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        Self::quick_select(nums, n - k as usize)
    }

    fn quick_select(nums: Vec<i32>, k_smallest: usize) -> i32 {
        // Pick a random element from the array
        let random_index = rand::thread_rng().gen_range(0..nums.len());
        let random_value = nums[random_index];

        let (mut left, mut mid, mut right) = (vec![], vec![], vec![]);

        for &num in nums.iter() {
            if num == random_value {
                mid.push(num);
            } else if num < random_value {
                // Push all the smaller elements to the left
                left.push(num);
            } else {
                // Push all the bigger elements to the right
                right.push(num);
            }
        }

        // k_smallest is on the left side
        if k_smallest < left.len() {
            return Self::quick_select(left, k_smallest);
        }

        // k_smallest is in the middle
        if k_smallest < left.len() + mid.len() {
            return random_value;
        }

        // k_smallest is on the right side
        return Self::quick_select(right, k_smallest - left.len() - mid.len());
    }
}

/**
 * Quickselect Approach (Optimal Space)
 *
 * Similar approach with previous solution, but with optimized space complexity
 *
 * 1. The quick_select function takes four arguments:
 * - nums: The array to search.
 * - start: The starting index of the sub-array to consider.
 * - end: The ending index of the sub-array to consider.
 * - k_smallest: The index of the kth smallest element we're searching for within the current sub-array.
 *
 * 2. We choose a random value within the current sub-array.
 *
 * 3. Partitioning: We initialize a left index starting at start.
 * - 3.1: We iterate through the sub-array, and check if the current element (nums[i]) is less than the pivot (random_value), we swap the current element (nums[i]) with the element at the left index to move all the smaller element to the left of the current random element.
 *
 * - 3.2: We then increase the left index to point to the next position for a smaller element.
 *
 * 4. We initialize a right index starting at end.
 * - 4.1:  We iterate from the end of the sub-array, and check if the current element (nums[i]) is greater than the pivot (random_value), we swap the current element (nums[i]) with the element at the right index to move all the larger element to the right of the current random element.
 *
 * - 4.2: We then decrease the right index to point to the next position for a larger element.
 *
 * 5. Recursion: Based on the value of target k_smallest:
 * - 5.1: If the k_smallest index (k_smallest) is less than the final position of the smaller elements (left - 1), it means the kth smallest element must be in the left sub-array. We recursively call quick_select function with the left sub-array.
 *
 * - 5.2: If the k_smallest index (k_smallest) is less than or equal to the final position of the larger elements (right), it means the pivot element (random_value) is the kth smallest element. We return the random_value as the kth largest element.
 *
 * - 5.3: Otherwise, the kth smallest element must be in the right sub-array. We recursively call quick_select function with the right sub-array.
 *
 * Time complexity: O(n), where n is the number of elements in the nums array.
 *
 * Space complexity: O(1)
 */
use rand::Rng;
impl Solution {
    pub fn find_kth_largest(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len();
        Self::quick_select(nums, 0, n as i32 - 1, n as i32 - k)
    }

    fn quick_select(mut nums: Vec<i32>, start: i32, end: i32, k_smallest: i32) -> i32 {
        // Pick random element from the array
        let mut rng = rand::thread_rng();
        let random_index = rng.gen_range(start..=end) as usize;
        let random_value = nums[random_index];

        // Move all the smaller element to the left
        let mut left = start as usize;
        for i in start as usize..=end as usize {
            if nums[i] < random_value {
                nums.swap(left, i);
                left += 1;
            }
        }

        // Move all the bigger element to the right
        let mut right = end as usize;
        for i in (start as usize..=end as usize).rev() {
            if nums[i] > random_value {
                nums.swap(right, i);
                right -= 1;
            }
        }

        // k_smallest is on the left side
        if k_smallest < left as i32 {
            return Self::quick_select(nums, start, left as i32 - 1, k_smallest);
        }
        // k_smallest is in the middle
        if k_smallest <= right as i32 {
            return random_value;
        }

        // k_smallest is in the right side
        Self::quick_select(nums, right as i32 + 1, end, k_smallest)
    }
}
