/**
 * https://leetcode.com/problems/different-ways-to-add-parentheses/description/
 */

const diffWaysToCompute = (expression) => {
  const result = [];

  for (let i = 0; i < expression.length; i++) {
    const current = expression[i];

    if (Number.isNaN(expression[i])) {
      let leftPart = diffWaysToCompute(expression.slice(0, i));
      let rightPart = diffWaysToCompute(expression.slice(i + 1));

      console.log('left: ', leftPart);
      console.log('right: ', rightPart);

      // for (let left of leftPart) {
      //   for (let right of rightPart) {
      //     if (current === '+') {
      //       result.push(left + right);
      //     } else if (current === '-') {
      //       result.push(left - right);
      //     } else {
      //       result.push(left * right);
      //     }
      //   }
      // }
    }
  }

  return result.length ? result : [expression];
};

// console.log(diffWaysToCompute('2-1-1'));
console.log(diffWaysToCompute('2*3-4*5'));
