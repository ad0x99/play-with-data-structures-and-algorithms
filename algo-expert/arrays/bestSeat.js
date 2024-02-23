/**
 * QUESTION
 *
 * You walk into a theatre you're about to see a show in. The usher within the theatre walks you to your row and mentions you're allowed to sit anywhere within the given row. Naturally, you'd like to sit in the seat that gives the most space. You also would prefer this space to be evenly distributed on either side of you (e.g. if there are 3 empty seats in a row, you would prefer to sit in the middle of those 3 seats).
 *
 * Given the theatre row represented as an integer array, return the seat index of where you should sit. Ones represent occupied seats and zeroes represent empty seats.
 *
 * You may assume that someone is always sitting in the first and last seat of the row. Whenever there are 2 equally good seats, you should sit in the seat with the lower index. If there is no seat to sit in, return -1. The given array will always have a length of at least one and contain only ones and zeroes.
 *
 * Sample Input:
 * seats = [1, 0, 1, 0, 0, 0, 1]
 *
 * Sample Output:
 * 4
 */

/**
 * SOLUTION
 *
 * The time complexity of this function is O(n), because it iterates through the 'seats' array once, with nested loops that do not depend on the size of the input. Therefore, the time complexity is linear O(n), where n is the number of elements in the 'seats' array.
 *
 * The space complexity of this function is O(1) because it only uses a constant amount of additional space to store variables such as bestSeat, maxSpace, left, and right.
 */
const bestSeat = (seats) => {
  let bestSeat = -1;
  let maxSpace = 0;
  let left = 0;
  let right;

  // Collect all of possible best seat
  // and pick the best possible seat and update the best seat variable
  while (left < seats.length) {
    // We start the right index at the left's next index
    right = left + 1;

    // As long as the right is not out of bounds and current right seat is equal to zero
    // we will increase the right index by 1 to find and go to the next 1 value
    while (right < seats.length && seats[right] === 0) {
      right += 1;
    }

    // Otherwise, if we get to the next 1 value
    // we'll calculate the current available max space and compare with current max space
    // if the current available max space is greater than current max space
    // that means we found a new good potential seat
    // then we update the current max space and the index of the best seat
    let availableSpace = right - left - 1;
    if (availableSpace > maxSpace) {
      maxSpace = availableSpace;
      bestSeat = Math.floor((right + left) / 2);
    }

    // We move the left pointer to the position of the right pointer and continue the loop
    left = right;
  }

  return bestSeat;
};

const seats1 = [1];
const seats2 = [1, 0, 1, 0, 0, 0, 1];
const seats3 = [1, 0, 1];
const seats4 = [1, 0, 0, 1];
const seats5 = [1, 1, 1];
const seats6 = [1, 0, 0, 1, 0, 0, 1];
const seats7 = [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1];
const seats8 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1];
const seats9 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1];
const seats10 = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
const seats11 = [
  1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
  1,
];
const seats12 = [1, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const seats13 = [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1];
const seats14 = [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1];
console.log(bestSeat(seats1)); // -1
console.log(bestSeat(seats2)); // 4
console.log(bestSeat(seats3)); // 1
console.log(bestSeat(seats4)); // 1
console.log(bestSeat(seats5)); // -1
console.log(bestSeat(seats6)); // 1
console.log(bestSeat(seats7)); // 3
console.log(bestSeat(seats8)); // 4
console.log(bestSeat(seats9)); // 4
console.log(bestSeat(seats10)); // 13
console.log(bestSeat(seats11)); // 13
console.log(bestSeat(seats12)); // 6
console.log(bestSeat(seats13)); // 3
console.log(bestSeat(seats14)); // 5
