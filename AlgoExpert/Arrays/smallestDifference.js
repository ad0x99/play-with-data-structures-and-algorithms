/**
 * QUESTION
 *
 * Write a function that takes in 2 non-empty arrays of integers, finds the pair of numbers (one from each array) whose absolute difference is closest to zero, and returns an array containing these 2 numbers, with the number from the first array in the first position.
 *
 * Note that the absolute difference of 2 integers is the distance between them on the real number line.
 *
 * For example, the absolute difference of -5 and 5 is 10, and the absolute difference of -5 and -4 is 1.
 *
 * You can assume that there will only be one pair of numbers with the smallest difference.
 *
 * Sample Input:
 * arrayOne = [-1, 5, 10, 20, 28, 3]
 * arrayTwo = [26, 134, 135, 15, 17]
 *
 * Sample Output:
 * [28, 26]
 */

/**
 * SOLUTION 1
 * 
 * The time complexity of this function is O(n log n + m log m), where n is the length of the array one and m is the length of the array two. This is because the function sorts both input arrays, which has a time complexity of O(n log n). The while loop then iterates through the sorted arrays, which has a time complexity of O(n). Therefore, the overall time complexity is dominated by the sorting step.

 * The space complexity of this function is O(1) because it only uses a constant amount of additional space to store variables such as idxOne, idxTwo, smallest, current, and smallestPair. The input arrays are sorted in place and do not require any additional space.
 */
const smallestDifference = (arrayOne, arrayTwo) => {
  // First, we sort both arrays in ascending order
  arrayOne = arrayOne.sort((a, b) => a - b);
  arrayTwo = arrayTwo.sort((a, b) => a - b);

  // We're using 2 pointers to keep track integers between 2 arrays
  let idxOne = 0;
  let idxTwo = 0;
  let smallest = Infinity;
  let current = Infinity;
  let smallestPair = [];

  // We loop through both arrays until one of those arrays is out of bounds
  while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
    let firstNumber = arrayOne[idxOne];
    let secondNumber = arrayTwo[idxTwo];
    let absoluteDifference = Math.abs(firstNumber - secondNumber);

    // Because both arrays are sorted,
    // and the bigger the distance between 2 numbers, the greater the absolute difference
    // Hence, we can leverage that condition to move the proper pointer to match our purpose
    // If the firstNumber is less than the secondNumber, the absolute difference is bigger if we increase the second pointer.
    // Therefore, we should move the first pointer to get closer to the second number
    // which can make the absolute difference smaller
    if (firstNumber < secondNumber) {
      current = absoluteDifference;
      idxOne += 1;
    }
    // Otherwise, we increase the second pointer to get closer to the firstNumber
    else if (firstNumber > secondNumber) {
      current = absoluteDifference;
      idxTwo += 1;
    } else {
      // If the firstNumber is equal to the secondNumber, then the absolute difference is equal to 0
      // That means we found the smallest pair of number
      return [firstNumber, secondNumber];
    }

    // We keep updating the smallest by comparing the current smallest with the current absolute difference value
    // And update the corresponding smallestPair value
    if (smallest > current) {
      smallest = current;
      smallestPair = [firstNumber, secondNumber];
    }
  }

  return smallestPair;
};

const arrayOne = [-1, 5, 10, 20, 28, 3];
const arrayTwo = [26, 134, 135, 15, 17];
console.log(smallestDifference(arrayOne, arrayTwo)); // [28, 26]

/**
 * SOLUTION 2
 *
 * The time and space complexity are the same as the previous solution
 */
const smallestDifferenceShorterVersion = (arrayOne, arrayTwo) => {
  arrayOne = arrayOne.sort((a, b) => a - b);
  arrayTwo = arrayTwo.sort((a, b) => a - b);

  let idxOne = 0;
  let idxTwo = 0;
  // We initialize a default value for smallestPair to compare the absolution difference
  let smallestPair = [Number.MIN_VALUE, Number.MAX_VALUE];

  while (idxOne < arrayOne.length && idxTwo < arrayTwo.length) {
    let firstNumber = arrayOne[idxOne];
    let secondNumber = arrayTwo[idxTwo];
    let currentAbsoluteDifference = Math.abs(firstNumber - secondNumber);
    let absoluteDifferenceOfSmallestPair = Math.abs(
      smallestPair[0] - smallestPair[1]
    );

    // If current difference of current numbers is less than the current difference of current smallest numbers
    // That means we found a new smallest pair, then we update the corresponding smallest pair
    if (currentAbsoluteDifference < absoluteDifferenceOfSmallestPair) {
      smallestPair = [firstNumber, secondNumber];
    }

    if (firstNumber < secondNumber) {
      idxOne += 1;
    } else if (firstNumber > secondNumber) {
      idxTwo += 1;
    } else {
      return [firstNumber, secondNumber];
    }
  }

  return smallestPair;
};

console.log(smallestDifferenceShorterVersion(arrayOne, arrayTwo)); // [28, 26]
