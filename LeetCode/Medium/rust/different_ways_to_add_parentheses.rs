use std::collections::HashMap;

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
 * Time complexity: O(2^n) where n is the number of operators in the expression. This is because for each operator in the expression, we are recursively splitting the expression into two parts and calculating all possible combinations of results which will take in an exponential time complexity.
 *
 * Space complexity: O(2^n) because we are storing all possible combinations of results in the memoization table. This can potentially grow exponentially with the number of operators in the expression.
 *
 */
impl Solution {
    pub fn diff_ways_to_compute(expression: String) -> Vec<i32> {
        fn compute(expression: &str, memo: &mut HashMap<String, Vec<i32>>) -> Vec<i32> {
            // If the entire expression is a valid number (not containing any operators), return it as a vector
            if let Ok(num) = expression.parse::<i32>() {
                return vec![num];
            }

            // If the result is already memoized, return it
            if let Some(cached) = memo.get(expression) {
                return cached.clone();
            }

            let mut result = Vec::new();

            // Iterate over the expression to find operators
            for (i, ch) in expression.chars().enumerate() {
                if ch == '+' || ch == '-' || ch == '*' {
                    // Split the expression into left and right parts
                    let left_results = compute(&expression[..i], memo);
                    let right_results = compute(&expression[i + 1..], memo);

                    // Compute results for the current operator
                    for &left in &left_results {
                        for &right in &right_results {
                            let res = match ch {
                                '+' => left + right,
                                '-' => left - right,
                                '*' => left * right,
                                _ => unreachable!(),
                            };
                            result.push(res);
                        }
                    }
                }
            }

            // Memoize the result
            memo.insert(expression.to_string(), result.clone());
            result
        }

        let mut memo = HashMap::new();
        compute(&expression, &mut memo)
    }
}
