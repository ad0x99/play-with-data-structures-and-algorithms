/**
 * https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * Backtracking & Recursion Approach
 *
 * 1. Firstly,we check if the input digits string is empty, we return an empty array as there are no combinations for an empty phone number.
 * 2. We create two arrays:
 * - `currentSolution`: This array is used to temporarily store the letters corresponding to the digits encountered so far during the recursive exploration
 * - `ans`: This array will eventually store all the valid letter combinations found for the entire phone number.
 * 3. We create a digitMap object (key-value pairs) to represent the corresponding letter combinations in a phone keypad (values).
 *
 * 4. Recursion to find all the letter combinations
 * - 4.1: Base Case: If i reaches the length of the digits string (meaning we've processed all digits), it indicates a complete combination has been built in `currentSolution`. we then join the characters in `currentSolution` into a string and pushes it into the ans array to store the combination. It then returns to stop further recursion for this branch.
 * - 4.2: Otherwise, we iterate through each letter (`char`) associated with the current digit (`digits[i]`) using the digitMap.
 * - 4.3: For each letter: The letter is appended to the currentSolution array, we recursively call the choose function with an incremented index (`i + 1`) to explore the combinations for the remaining digits. This explores all possible combinations for the current digit.
 * - 4.4: After the recursive call returns, the recently added letter is removed from currentSolution using pop to backtrack and explore other letter options for the current digit.
 *
 * 5. We call the choose function to start from index of 0 to initiate the exploration starting from the first digit. After exploring all combinations for all digits using recursion, we return the `ans` array containing all the valid letter combinations for the given phone number digits.
 *
 * Time complexity: O(n * 4^n) - where n is the number of digits in the input. This is because for each digit, there are at most 4 possible characters (for digits 7 and 9) that can be mapped to it, and we are recursively exploring all possible combinations.
 *
 * Space complexity: O(n)
 * - Storing all possible combinations in currentSolution (O(n))
 * - Recursion can potentially create a call stack of depth n. (O(n))
 */
const letterCombinations = (digits) => {
  if (digits.length === 0) {
    return [];
  }
  // Create a array to store the found solution
  let currentSolution = [];
  // Create a new array to store the final solution
  let ans = [];
  // Phone number letters combination
  let digitMap = {
    1: '',
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz',
    0: '',
  };

  // Choose the ith element for the current solution
  const choose = (i) => {
    // Base case
    if (i === digits.length) {
      ans.push(currentSolution.join(''));
      return;
    }

    // Recursion
    for (const char of digitMap[digits[i]]) {
      currentSolution.push(char);
      choose(i + 1);
      currentSolution.pop();
    }
  };

  choose(0);
  return ans;
};
