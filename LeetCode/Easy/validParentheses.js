/**
 * Approach: Because each pair of parentheses need corresponding open and close. We can leverage the stack property to compare each pair of parentheses and validate each pair of open and close.
 *
 * 1. Create a pairs map which contains the correct pair of parentheses.
 * 2. Create a stack to store the open parenthesis.
 * 3. We iterate through each pair of open and close.
 * 4. If we found a open parenthesis, we add it to the stack
 * 5. Otherwise, if we found a close parenthesis, we pop the last open parenthesis from the stack, then we use the pairs map to check if the last open parenthesis is a valid pair with the current close parenthesis. If it is valid, we continue to the next iteration, otherwise we return false, because we found an invalid pair of parentheses.
 * 6. Out of the iteration, we return length of the stack. If the length of the stack is equal to 0, that means all pair of open and close parentheses are valid, because it's all visited from the pop operation.
 *
 * Time complexity: O(n) where n is the length of the input string s. This is because we iterate through each character in the string once.
 *
 * Space complexity: O(n) - because in the worst case scenario, we could potentially push all opening brackets onto the stack before encountering any closing brackets. This would result in the stack containing n/2 elements, where n is the length of the input string s.
 */
const isValid = (s) => {
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  let stack = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      stack.push(s[i]);
    } else if (pairs[stack.pop()] !== s[i]) {
      return false;
    }
  }

  return stack.length === 0;
};

console.log(isValid('()')); // true
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
console.log(isValid('(){}}{')); // false
