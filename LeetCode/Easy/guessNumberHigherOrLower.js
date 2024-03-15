/**
 * https://leetcode.com/problems/guess-number-higher-or-lower/description/
 * This is a binary search algorithm that guesses a number between 1 and n by repeatedly dividing the
 * search interval in half.
 * @param n - The parameter `n` represents the maximum number in the range of possible numbers to
 * guess. The function `guessNumber` uses binary search to guess a number between 1 and `n`.
 * @returns If the function runs successfully and finds the correct number, it will return the guessed
 * number. If it does not find the correct number, it will return -1.
 *
 * Time complexity : O(log⁡2n)
 * Space complexity : O(1)
 */
const guessNumber = function (n) {
  let left = 1;
  let right = n;

  while (left <= right) {
    let mid = Math.floor(left + (right - left) / 2);
    const g = guess(mid);

    if (g == 0) {
      return mid;
    } else if (g < 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
};

const guess = (guessNumber) => {
  const targetNumber = 10;

  if (guessNumber === targetNumber) {
    return 0;
  } else if (guessNumber < targetNumber) {
    return 1;
  } else {
    return -1;
  }
};

console.log(guessNumber(20));
