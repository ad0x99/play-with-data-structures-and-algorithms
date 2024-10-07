/**
 * https://leetcode.com/problems/remove-k-digits/
 *
 * Idea: We use a stack to keep track of smaller number to build increasing stack. We want to remove the larger number first, then we can make sure that we will have the as smallest number as possible.
 *
 * 1. Base case: if the length of num string is less than or equal to `k`, we return "0".
 *
 * 2. We create a `stack` to build increasing numbers which is the result.
 *
 * 3. We create a `remainingK` variable to store the remaining removed number of `k`. This will be used to remove the trailing larger number of the `stack` latter.
 *
 * 4. Build the stack: We iterate through each digit and check:
 * - 4.1: If the haven't reach `k` yet, and the last number from the `stack` is greater than the current number, we keep popping out the `stack` to make sure that we remove all the number that greater than the current number.
 *
 * - 4.2: After that, we increase the `remainingK` by `1` to notify that we've removed `remainingK` time.
 *
 * - 4.3: Each iteration, we will add the current number to the `stack`.
 *
 * 5. Once we iterated through all digits in the num string, there might still be digits remaining in the `stack` that need to be removed to reach the `k` digit quota. We use another while loop that runs as long as `remainingK < k`, and simply remove the top element from the `stack` and increments `remainingK` by `1`.
 *
 * 6. After all the loops, the `stack` should contain the digits of the smallest possible number formed by removing `k` digits from the original string.
 * - 6.1: We join all the digits in the `stack` into a single string representation of the resulting number.
 *
 * - 6.2: After that, we remove any leading zeros (zeros at the beginning of the string) from the resulting number. The regular expression ^0+ matches one or more zeros at the beginning of the string.
 *
 * - 6.3: We handle the case if the `stack` is empty, we returns '0' as the final result. Otherwise, we return the string after removing leading zeros.
 *
 *
 * Time complexity: O(n), where n is the length of the num.
 *
 * Space complexity: O(n), where n is the length of the stack.
 */
const removeKdigits = (num, k) => {
  if (num.length <= k) return '0';
  let stack = [];
  let remainingK = 0;

  for (let i = 0; i < num.length; i++) {
    while (remainingK < k && stack.length && stack[stack.length - 1] > num[i]) {
      stack.pop();
      remainingK++;
    }

    stack.push(num[i]);
  }

  // Remove remaining larger numbers
  while (remainingK < k) {
    stack.pop();
    remainingK++;
  }

  // Join the stack together and remove leading zeros
  return stack.join('').replace(/^0+/, '') || '0';
};
