/**
 * https://leetcode.com/problems/evaluate-reverse-polish-notation/
 *
 * Stack Approach
 *
 * Idea: Using stack to store only numbers. Whenever we reach a operand, we pop element from the stack and evaluate the operation.
 *
 * 1. We create a stack to store numbers.
 *
 * 2. We iterate through each element of the tokens.
 *
 * 3. If the current token is a number, we push it onto the stack.
 *
 * 4. Otherwise, if the current token is a operand
 * - 4.1: We get 2 top elements from the stack and evaluate the operation
 *
 * - 4.2: When the calculation is done, we add the calculated operation back to the stack for later evaluation.
 *
 * 5. After iterating through all tokens, the final result will be the only element remaining on the stack. We return the top element of the stack, which represents the evaluated expression in RPN.
 *
 * Time complexity: O(n), where n is the number of tokens in the tokens array
 *
 * Space complexity: O(n), where n is the size of the stack
 */
impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        let n = tokens.len();
        let mut stack: Vec<i32> = Vec::new();

        for token in tokens {
            match token.parse::<i32>() {
                Ok(num) => stack.push(num),
                Err(_) => {
                    let first_token = stack.pop().unwrap();
                    let second_token = stack.pop().unwrap();
                    let operator = token;

                    let eval_result = Self::evaluate(second_token, first_token, &operator);
                    stack.push(eval_result);
                }
            }
        }

        stack.pop().unwrap()
    }

    fn evaluate(x: i32, y: i32, operator: &str) -> i32 {
        let mut result = 0;

        match operator {
            "+" => result = x + y,
            "-" => result = x - y,
            "*" => result = x * y,
            _ => result = x / y,
        }

        result
    }
}
