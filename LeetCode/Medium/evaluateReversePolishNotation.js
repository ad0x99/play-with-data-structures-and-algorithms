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
const evalRPN = (tokens) => {
  const n = tokens.length;
  let stack = [];

  for (const token of tokens) {
    if (Number.isInteger(Number.parseInt(token))) {
      stack.push(Number.parseInt(token));
    } else {
      const firstToken = stack.pop();
      const secondToken = stack.pop();
      const operator = token;

      const evalResult = evaluate(secondToken, firstToken, operator);
      stack.push(evalResult);
    }
  }

  return stack.pop();
};

const evaluate = (x, y, operator) => {
  let result = 0;
  switch (operator) {
    case '+':
      result = x + y;
      break;

    case '-':
      result = x - y;
      break;

    case '*':
      result = x * y;
      break;

    default:
      result = Math.trunc(x / y);
      break;
  }

  return result;
};
