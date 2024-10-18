/**
 * Radix Sort Approach
 *
 * The idea is to use radix sort algorithm to sort numbers by their digits. Radix sort only supports for sorting non-negative numbers, therefore, in order to handle negative numbers, we will use separate buckets for storing the positive and negative numbers.
 *
 * 1. First, we need to get the most digits in the nums array.
 * - 1.1: We find the absolute value of the largest number. Using absolute here to handle the negative value.
 *
 * - 1.2: We then then call `most_digits` function to calculate the most significant digit.
 *
 * 2. We iterate through each digit position (from least significant to most significant) up to the maxDigitCount.
 *
 * 3. Inside the outer loop, we create two bucket arrays: `positive_buckets` and `negative_buckets`. These arrays will hold numbers based on their digits at the current position (k). Each bucket index represents a digit (`0-9`).
 *
 * 4. In the inner loop, we iterate through each number.
 * - 4.1: We call `get_digit` function to get the digit at the current position (k) of the current number.
 *
 * - 4.2: Based on the sign of the number: If the number is non-negative, we push it to the corresponding bucket (`positive_buckets`[digit]) based on the digit at position k.
 *
 * - 4.3: Otherwise, if the number is negative, we push it to the corresponding bucket (`negative_buckets`[digit]) in the `negative_buckets` array.
 *
 * 5. After iterating through all numbers, we merge the buckets back into the nums array.
 * - 5.1: We first reverse the `negative_buckets` array because negative numbers should appear before positive numbers in the final sorted array.
 *
 * - 5.2: We concatenate the reversed `negative_buckets`, followed by `positive_buckets`, into a new array. This merges the numbers based on their digit at the current position (k). We assign the merged array back to the nums array, effectively sorting the numbers based on the digit at the current position (k).
 *
 * 6. The loop iterates through different digit positions (k) until it reaches the `max_digit_count`. This ensures that the sorting happens from the least significant digit to the most significant digit, achieving a stable sort.
 *
 * 7. After iterating through all digit positions, we return the sorted nums array.
 *
 * Time complexity: O(n * k), where n is the number of elements in the nums array, and k is the max digit number.
 *
 * Space complexity: O(n), where n is the number of elements in the nums array
 */
impl Solution {
    pub fn sort_array(mut nums: Vec<i32>) -> Vec<i32> {
        let max_digit_count = Self::most_digits(nums.iter().map(|&x| x.abs()).max().unwrap());

        for k in 0..max_digit_count {
            let mut positive_buckets: Vec<Vec<i32>> = vec![vec![]; 10];
            let mut negative_buckets: Vec<Vec<i32>> = vec![vec![]; 10];

            for &num in &nums {
                let digit = Self::get_digit(num, k);
                if num >= 0 {
                    positive_buckets[digit as usize].push(num);
                } else {
                    negative_buckets[digit as usize].push(num);
                }
            }

            negative_buckets.reverse();
            nums = negative_buckets
                .into_iter()
                .flatten()
                .chain(positive_buckets.into_iter().flatten())
                .collect();
        }

        nums
    }

    fn most_digits(value: i32) -> i32 {
        if value < 10 {
            1
        } else {
            (value.abs() as f64).log10().floor() as i32 + 1
        }
    }

    fn get_digit(num: i32, index: i32) -> i32 {
        (num.abs() / 10_i32.pow(index as u32)) % 10
    }
}

impl Solution {
    pub fn sort_array(mut nums: Vec<i32>) -> Vec<i32> {
        let max_digit_count = Self::most_digits(nums.iter().map(|&x| x.abs()).max().unwrap());

        for k in 0..max_digit_count {
            let mut digit_buckets: Vec<Vec<i32>> = vec![vec![]; 20];

            for &num in &nums {
                let digit = Self::get_digit(num, k);
                if num >= 0 {
                    digit_buckets[(digit + 10) as usize].push(num);
                } else {
                    digit_buckets[(9 - digit) as usize].push(num);
                }
            }

            nums = digit_buckets.into_iter().flatten().collect();
        }

        nums
    }

    fn most_digits(value: i32) -> i32 {
        if value < 10 {
            1
        } else {
            (value.abs() as f64).log10().floor() as i32 + 1
        }
    }

    fn get_digit(num: i32, index: i32) -> i32 {
        (num.abs() / 10_i32.pow(index as u32)) % 10
    }
}
