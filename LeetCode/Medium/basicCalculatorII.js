/**
 * https://leetcode.com/problems/basic-calculator-ii/
 *
 * Stack Approach
 *
 * 1. Base case:
 * - 1.1: We remove starting and trailing spaces.
 * - 1.2: If the string s is empty or null, we return null
 *
 * 2. We initialize a stack to store intermediate results during the evaluation.
 *
 * 3. We initialize two variables:
 * - 3.1: The num variable will store the current number being built from digits.
 *
 * - 3.2: The sign variable will store the current operator (+, -, *, /). It's initialized to '+' assuming a positive starting value.
 *
 * 4. We iterate through each character.
 *
 * 5. Inside the loop, if currentValue is a space, we skip and move to the next character.
 *
 * 6. If the current value is a digit, we build the current number (num):
 * - 6.1: We multiply the existing num by 10 to account for the place value of the new digit.
 *
 * - 6.2: We get the character code of the current digit, and them subtract the character code of '0' ('0'.charCodeAt(0)) to convert the digit character code to its numerical value (e.g., '5'.charCodeAt(0) - '0'.charCodeAt(0) = 53 - 48 = 5).
 *
 * - 6.4: Finally, we add the converted digit value to the existing num.
 *
 * 7. If the current value is not a digit or it's the last character, it means we've encountered an operator or the end of the expression, we use a switch statement based on the current sign:
 * - 7.1: '+': Pushes the current num onto the stack (positive value).
 *
 * - 7.2: '-': Pushes the negative of num onto the stack.
 *
 * - 7.3: '*': Pops the top element from the stack, multiplies it by num, and pushes the result back onto the stack.
 *
 * - 7.4: '/': Pops the top element from the stack, performs integer division with num, and pushes the result onto the stack.
 *
 * - 7.5: We update the sign to the current value (the encountered operator), and reset num to 0 to start building the next number.
 *
 * 8. After iterating through the entire string, the stack will contain the final evaluated results. We iteratively iterate through each remaining evaluated result and calculate the sum. We return the final sum calculated from the stack.
 *
 * Time complexity: O(n), where n is the length of the string
 *
 * Space complexity: O(n), where n is the length of the stack
 *
 */
const calculate = (s) => {
  s = s.trim();
  if (!s || !s.length) return null;

  let stack = [];
  let num = 0;
  let operand = '+';

  for (let i = 0; i < s.length; i++) {
    const currentValue = s[i];

    // Skip empty string
    if (currentValue === ' ') continue;

    // If the current value is number
    if (!isNaN(currentValue)) {
      // Build final number digit
      num = num * 10 + currentValue.charCodeAt(0) - '0'.charCodeAt(0);
    }

    // If the current value is operand
    if (isNaN(currentValue) || i === s.length - 1) {
      switch (operand) {
        case '+':
          stack.push(num);
          break;
        case '-':
          stack.push(-num);
          break;
        case '*':
          stack.push(stack.pop() * num);
          break;
        case '/':
          stack.push(Math.trunc(stack.pop() / num));
          break;
      }

      operand = currentValue;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b);
};
