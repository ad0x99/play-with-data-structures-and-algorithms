/**
 * https://leetcode.com/problems/remove-k-digits/
 *
 * Idea: We use a stack to keep track of smaller number to build increasing stack. We want to remove the larger number first, then we can make sure that we will have the as smallest number as possible.
 *
 * 1. Base case: if the length of num string is less than or equal to k, we return "0".
 *
 * 2. We create a `stack` to build increasing numbers which is the result.
 *
 * 3. We create a `remaining_k` variable to store the remaining removed number of k. This will be used to remove the trailing larger number of the stack latter.
 *
 * 4. Build the stack: We iterate through each digit and check:
 * - 4.1: If the haven't reach `k` yet, and the last number from the stack is greater than the current number, we keep popping out the stack to make sure that we remove all the number that greater than the current number.
 *
 * - 4.2: After that, we increase the `remaining_k` by `1` to notify that we've removed `remaining_k` time.
 *
 * - 4.3: Each iteration, we will add the current number to the stack.
 *
 * 5. Once we iterated through all digits in the num string, there might still be digits remaining in the stack that need to be removed to reach the k digit quota. We use another while loop that runs as long as `remaining_k < k`, and simply remove the top element from the stack and increments `remaining_k` by `1`.
 *
 * 6. After all the loops, the stack should contain the digits of the smallest possible number formed by removing k digits from the original string.
 *
 * - 6.1: After that, we remove any leading zeros (zeros at the beginning of the string) from the resulting number.
 *
 * - 6.2: We join all the digits in the stack into a single string representation of the resulting number.
 *
 * - 6.3: We handle the case if the stack is empty, we returns '0' as the final result. Otherwise, we return the string after removing leading zeros.
 *
 * Time complexity: O(n), where n is the length of the num.
 *
 * Space complexity: O(n), where n is the length of the stack.
 */
impl Solution {
    fn remove_kdigits(num: String, k: i32) -> String {
        if num.is_empty() {
            return String::from("0");
        }

        let mut stack: Vec<char> = Vec::new();
        let mut remaining_k = 0;

        for c in num.chars() {
            while stack.len() > 0 && c < stack[stack.len() - 1] && remaining_k < k {
                stack.pop();
                remaining_k += 1;
            }
            stack.push(c);
        }

        // Remove all remaining large numbers
        while remaining_k < k && !stack.is_empty() {
            stack.pop();
            remaining_k += 1;
        }

        // Remove all leading zeroes
        while stack.len() > 0 && stack[0] == '0' {
            stack.remove(0);
        }

        // Convert stack to string and handle empty stack
        let result = stack.iter().collect::<String>();
        if result.is_empty() {
            return String::from("0");
        }

        result
    }
}
