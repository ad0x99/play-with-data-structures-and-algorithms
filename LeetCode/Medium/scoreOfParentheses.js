/**
 * https://leetcode.com/problems/score-of-parentheses/description/
 * We keep track of the power of 2 that we need to add to the count, and we increment the power of 2
 * when we see an open parenthesis, and we add the power of 2 to the count when we see a closed
 * parenthesis that is preceded by an open parenthesis
 * @param s - the string of parentheses
 * @returns The score of the parentheses.
 */
const scoreOfParentheses = (s) => {
  let count = 0;
  let pwr = 0;
  const open = '(';

  for (let i = 1; i < s.length; i++) {
    if (s.charAt(i) === open) {
      pwr++;
    } else if (s.charAt(i - 1) === open) {
      count += 1 << pwr--; // left shift operator
    } else {
      pwr--;
    }
  }

  return count;
};

scoreOfParentheses('()');
scoreOfParentheses('(())');
scoreOfParentheses('()()');
scoreOfParentheses('(()(()))');
scoreOfParentheses('()()()');
