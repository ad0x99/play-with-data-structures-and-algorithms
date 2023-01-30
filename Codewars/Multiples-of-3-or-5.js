/**
 * We loop through all the numbers from 0 to the number given, and if the number is divisible by 3 or
 * 5, we add it to the sum
 * @param number - the number to sum up to
 * @returns The sum of all the multiples of 3 or 5 below the number passed in.
 */
function solution(number) {
  let sum = 0;

  for (let i = 0; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      sum += i;
    }
  }

  return sum;
}

console.log(solution(10));
