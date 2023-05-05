/**
 * The function calculates the factorial of a given number using a for loop.
 * @param num - The parameter `num` is a number for which we want to calculate the factorial.
 * @returns The function `factorial` is returning the factorial of the input `num`.
 */
const iterativeFactorial = (num) => {
  let total = 1;

  for (let i = num; i > 1; i--) {
    total *= i;
  }

  return total;
};

console.log(iterativeFactorial(3));

/**
 * The function calculates the factorial of a given number using recursion.
 * @param num - The parameter `num` represents the number for which we want to calculate the factorial
 * using recursion.
 * @returns The function `recursiveFactorial` returns the factorial of the input `num`.
 */
const recursiveFactorial = (num) => {
  if (num === 1) return 1;
  return num * recursiveFactorial(num - 1);
};

console.log(recursiveFactorial(3));
