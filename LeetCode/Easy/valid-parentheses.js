/**
 * If the length of the string is odd, return false. If the first or last character is a closing
 * bracket, return false. If the string is empty, return true. Otherwise, push the opening brackets
 * onto a stack and pop them off as you encounter the corresponding closing brackets. If the stack is
 * empty at the end, return true
 * @param s - the string to check
 * @returns return true if the all the brackets in stack are matched
 */

/**
 * Complexity
 * Time complexity: O(N); we need to, worse case, iterate over every item in the string
 * Space complexity: O(N); because of the usage of stack/array
 */
const isValid = (s) => {
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  if (s.length % 2 === 1) return false;

  if (
    s[0] === ')' ||
    s[0] === ']' ||
    s[0] === '}' ||
    s[s.length - 1] === '(' ||
    s[s.length - 1] === '[' ||
    s[s.length - 1] === '{'
  ) {
    return false;
  }

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

console.log(isValid('()'));
console.log(isValid('()[]{}'));
console.log(isValid('(]'));
console.log(isValid('(){}}{'));
