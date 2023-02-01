/**
 * https://leetcode.com/problems/remove-outermost-parentheses/description/
 * We iterate through the string, and if we encounter an open parenthesis, we add it to the result if
 * count is greater than 0. If we encounter a closed parenthesis, we add it to the result if count is
 * greater than 1
 * @param s - the string to be processed
 * @returns The string with the outer parentheses removed.
 * Time complexity: O(n)
 * Space complexity: O(1)
 */
const removeOuterParentheses = (s) => {
  let result = '';
  let count = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      if (count > 0) result += s[i];
      count++;
    }

    if (s[i] === ')') {
      if (count > 1) result += s[i];
      count--;
    }
  }

  return result;
};

console.log(removeOuterParentheses('(()())(())'));
console.log(removeOuterParentheses('(()())(())(()(()))'));
console.log(removeOuterParentheses('()()'));
