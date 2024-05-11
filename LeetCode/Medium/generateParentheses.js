/**
 * https://leetcode.com/problems/generate-parentheses/description/
 *
 * Recursion & Backtracking Approach
 *
 * To be able to get a valid pair of parentheses, we have to match some conditions:
 *
 * 1. There is always a pair of opening and closing brackets to form a valid parenthesis. Therefore, the number of closing brackets is less than or equal to the number of opening brackets in any i-th positions.
 * 2. All the opening brackets have to be closed. It means, at the last position, the number of closing brackets is equal to the number of opening brackets
 *
 * Implementation
 *
 * 1. The code creates an empty array result to store the generated valid parentheses combinations.
 *
 * 2. Recursion:
 * - 2.1: The choose function receives 3 arguments: a string (`str`) which is representing the current combination of parentheses being built (initially empty), an `open` which is an integer representing the current number of opening parentheses '(' used so far, and an `close` which is an integer representing the current number of closing parentheses ')' used so far.
 *
 * 3. The base case: we check if both open and close are equal to `n`. This indicates a valid combination with the required number of opening and closing parentheses has been built, then we push the the current `str` (combination) to the result array.
 *
 * 4. Recursive Exploration (Adding Opening Parentheses): If open is not equal to n (meaning we can still add more opening parentheses):
 * - 4.1: We create a new string by concatenating an opening parenthesis '(' to the current str.
 * - 4.2: We then call the choose function recursively with the updated arguments:
 * - 4.2.1: The new string with the added opening parenthesis.
 * - 4.2.2: The incremented open value (since one more opening parenthesis is added).
 * - 4.2.3: The same close value (since no closing parenthesis was added yet).
 * - 4.3: This recursive call explores the possibility of adding more opening parentheses to the current combination.
 *
 * 5. Recursive Exploration (Adding Closing Parentheses): If open is greater than close (meaning we have more opening parentheses than closing parentheses so far):
 * - 5.1: We create a new string by concatenating a closing parenthesis ')' to the current str.
 * - 5.2: We then call the choose function recursively with the updated arguments:
 * - 5.2.1: The new string with the added closing parenthesis.
 * - 5.2.2: The same open value (since no opening parenthesis was added).
 * - 5.2.3: The incremented close value (since one more closing parenthesis is added).
 * - 5.3: This recursive call explores the possibility of adding closing parentheses to the current combination, but only if there are enough opening parentheses to balance them.
 *
 * 6. We call the choose function initially with an empty string (''), open = 0, and close = 0. After the recursive exploration finishes, the result array containing all the valid combinations of parentheses for the given n.
 *
 * Time complexity: O(4^n / sqrt(n)), where n is the number of pairs of parentheses. This is because for each position in the output string, we have 4 choices: either open or close a parenthesis, and we have a total of 2n positions.
 *
 * Space complexity: O(n), where n is the number of pairs of parentheses. This is because we are using recursion to generate all possible combinations of parentheses, and the maximum depth of the recursion stack is n. Additionally, the result array will contain all valid combinations of parentheses, which can have a maximum length of 2n.
 *
 */
const generateParenthesis = (n) => {
  const result = [];

  let choose = (str, open, close) => {
    if (open === n && close === n) {
      result.push(str);
    }

    if (open !== n) {
      choose(str + '(', open + 1, close);
    }

    if (open > close) {
      choose(str + ')', open, close + 1);
    }
  };

  choose('', 0, 0);
  return result;
};

/**
 *
 * Recursion & Backtracking Approach
 *
 * 1. We create an empty string array (`currentSolution`) to store the current combination being built (initially empty), an empty array (`ans`) to store the final valid combinations, and an integer (`numberOfOpeningBracket`) to keep track of the current number of opening brackets encountered during the recursive exploration.
 *
 * 2. The choose function takes an index `i` as input. This index might not directly represent the position in the combination string, but it helps track the number of decisions made so far (2n decisions are needed for n pairs of parentheses).
 *
 * 3. Base Case (Valid Combination)
 * - 3.1: We check if `i` has reached `2 * n`, which represents the total number of decisions needed for n pairs of parentheses (each pair requires an opening and closing bracket) and `numberOfOpeningBracket` is equal to `n`, it means a valid combination with balanced parentheses has been built in currentSolution.
 * - 3.2: We join the characters in `currentSolution` into a string and push it into the `ans` array.
 *
 * 4. Recursive Exploration (Adding Opening Parentheses): If the `numberOfOpeningBracket` is less than `n` (meaning we can still add more opening parentheses).
 * - 4.1: We add an opening parenthesis '(' to the `currentSolution`.
 * - 4.2: We increment the `numberOfOpeningBracket` by 1.
 * - 4.3: We call the choose function recursively with an incremented `i` to explore further decisions
 * - 4.4: After the recursive call returns, we perform backtracking by decrementing numberOfOpeningBracket by 1 and removing the last element (opening parenthesis) from `currentSolution`.
 *
 * 5. Recursive Exploration (Adding Closing Parentheses): Instead of checking open > close, we check if the number of closing brackets can be equal or less than the number of opening brackets. This ensures we don't add closing brackets before we have enough opening ones.
 * - 5.1: We add a closing parenthesis ')' to the `currentSolution`.
 * - 5.2: We call the choose function recursively with an incremented `i` to explore further decisions.
 * - 5.3: After the recursive call returns, we perform backtracking by removing the last element (closing parenthesis) from `currentSolution`.
 *
 * 6. The choose function is called initially with i = 0 to initiate the exploration. After the recursive exploration finishes, we returns the `ans` array containing all the valid combinations of parentheses.
 *
 * Time complexity: O(4^n / sqrt(n)) because for each position in the string, we have 2 choices (open or close bracket) and we make 2 recursive calls for each choice. This results in a total of 2^(2n) recursive calls. However, we can prune some branches of the recursion tree based on certain conditions, which reduces the actual number of recursive calls made.
 *
 * Space complexity is O(n) + O(n) = O(2n) = O(n)
 * - O(n) where n is the length of currentSolution array.
 * - O(n) where n is the depth of the recursion
 *
 */
const generateParenthesis = (n) => {
  let currentSolution = [];
  let ans = [];
  let numberOfOpeningBracket = 0;

  let choose = (i) => {
    // Base case
    if (i === 2 * n && numberOfOpeningBracket === n) {
      ans.push(currentSolution.join(''));
      return;
    }

    // Choose the opening bracket
    // If the number of opening bracket is not greater than a half of 2 * n
    if (numberOfOpeningBracket < n) {
      currentSolution.push('(');
      numberOfOpeningBracket += 1;
      choose(i + 1);
      numberOfOpeningBracket -= 1;
      currentSolution.pop();
    }

    // Choose the closing bracket
    // If the number of closing brackets can be equal or less than the number of opening brackets.
    if (numberOfOpeningBracket >= i + 1 - numberOfOpeningBracket) {
      currentSolution.push(')');
      choose(i + 1);
      currentSolution.pop();
    }
  };

  choose(0);
  return ans;
};
