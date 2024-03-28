/**
 * https://leetcode.com/problems/generate-parentheses/description/
 * We start with an empty string, and each time we add a parenthesis, we either add an opening bracket
 * if it's less than n, or a closing bracket if there's more opening brackets than closing brackets
 * @param n - the number of pairs of parentheses
 * @returns An array of all possible combinations of n pairs of parentheses.
 */
const generateParenthesis = (n) => {
  const result = [];

  let iterate = (str, open, close) => {
    if (open === n && close === n) {
      result.push(str);
    }

    if (open !== n) {
      iterate(str + '(', open + 1, close);
    }

    if (open > close) {
      iterate(str + ')', open, close + 1);
    }
  };

  iterate('', 0, 0);
  return result;
};

generateParenthesis(3);
