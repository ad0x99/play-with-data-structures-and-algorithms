/**
 * https://leetcode.com/problems/different-ways-to-add-parentheses/description/
 *
 * 1. The base case: We first check if the entire expression is a valid integer (meaning it doesn't contain operators), we return expressions as single numbers.
 *
 * 2. Optimization: We initialize a `memo` object to store previously calculated results for expressions. We check if the expression already exists in the memo object,it means the results for this expression have already been calculated, we directly return the calculated value.
 *
 * 3. Otherwise, We iterate through element in the expression.
 *
 * 4. Operator Check and Recursion
 * - 4.1: If the current character is not a number, that means it is the operator characters.
 * - 4.2: We make a recursive call for the left sub-expression, obtained by slicing the expression from the beginning (0) up to (but not including) the current operator's index (i). We want to calculate the possible results for the left side of the expression.
 * - 4.3: Similarly, We make a recursive call for the right sub-expression, obtained by slicing the expression from one position after the current operator's index (i + 1) to the end. We want to calculate the possible results for the right side of the expression.
 * - 4.4: After calculating, those left and right results will be stored in the leftResults and rightResults variables.
 *
 * 5. After getting the calculation results, we iterate through each element (left) in leftResults and each element (right) in rightResults.
 * - 5.1: We perform the calculation based on the current operator and push the result into result array.
 * - 5.2: After processing all operators in the expression, the calculated results are stored in the memo to reuse for later recursion.
 *
 * 6. Finally, We return the `result` array containing the possible computed values.
 *
 * For example:
 *                                "2*3-4*5"
 *                             /       \
 *                          "2"        "*3-4*5"
 *                                       /      \
 *                                  "3"         "4*5"
 *                                             /   \
 *                                           "4"   "5"
 *                                            |
 *                         -------------------
 *                         /                 \
 *                      "2*3"                 "4*5"
 *                      /  \                  /   \
 *                     "2" "3"               "4"  "5"
 *                    Combine "2" and "3"    Combine "4" and "5"
 *                    result: [6]            result: [20]
 *
 * Combine results:
 * result: [2*3 - 4*5] = [6 - 20] = [-14]
 *
 * Other splits:
 *                       Combine results for each operator position
 *                       Generate results for each split point
 *
 * Finally:
 *                       Results for "2*3-4*5" including all combinations
 *
 *
 *
 *
 * Time complexity: O(2^n) where n is the number of operators in the expression. This is because for each operator in the expression, we are recursively splitting the expression into two parts and calculating all possible combinations of results which will take in an exponential time complexity.
 *
 * Space complexity: O(2^n) because we are storing all possible combinations of results in the memoization table. This can potentially grow exponentially with the number of operators in the expression.
 *
 */
const diffWaysToCompute = (expression) => {
  const compute = () => {
    // If the entire expression is a valid number (not containing any operators), we return expression
    if (Number.isInteger(Number(expression))) {
      return [Number(expression)];
    }

    const result = [];

    if (memo[expression]) {
      return memo[expression];
    }

    for (let i = 0; i < expression.length; i++) {
      const operator = expression[i];

      if (Number.isNaN(Number(operator))) {
        const leftResults = diffWaysToCompute(expression.slice(0, i));
        const rightResults = diffWaysToCompute(expression.slice(i + 1));

        for (let left of leftResults) {
          for (let right of rightResults) {
            result.push(
              operator === '+'
                ? left + right
                : operator === '-'
                ? left - right
                : left * right
            );
          }
        }
      }
    }

    memo[expression] = result;
    return result;
  };

  let memo = {};
  return compute();
};
