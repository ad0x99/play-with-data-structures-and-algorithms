/**
 * https://leetcode.com/problems/plus-one/
 *
 * The idea is to get the last digit in the array and plus by one to get the new sum. But in case the digit is equal to zero, we have to take the carry over add up to the next nine digit.
 *
 * 1. We create carryOver variable to hold carry over value, which initialized as one, because we want to make sure that we still have carry over to take for the next 9 digit.
 * 2. We start reverse the original array and loop through from zero.
 * 3. As long as there is carry over value (it means carryOver === 1).
 * 4. We will check if the index is in of bounds.
 * 5. We check if the current digit is equal to 9, then it we assign the current digit to equal 0.
 * 6. Otherwise, we take the current digit and plus 1, and update the carryOver to equal 0 (that means we're done calculation).
 * 7. In case the index is out of bounds, and there is carry over to take, we push the carry over to the last of the digits array, and reset carryOver to 0 to break the iteration.
 * 8. Every time we iterate through the digits array, we increase the index by 1 to move to the next digit if the loop is still valid.
 * 9. We reserve the digits and return the reversed digits array which contains the expected sum.
 *
 * Time complexity: O(n) - where n is the number of digits in the input array. This is because we iterate through the array once to reverse it, and then iterate through it again to perform the addition operation.
 *
 * Space complexity: O(n)
 */
const plusOne = (digits) => {
  let carryOver = 1;
  let i = 0;
  digits.reverse();

  while (carryOver) {
    if (i < digits.length) {
      if (digits[i] === 9) {
        digits[i] = 0;
      } else {
        digits[i] += 1;
        carryOver = 0;
      }
    } else {
      digits.push(carryOver);
      carryOver = 0;
    }

    i++;
  }

  return digits.reverse();
};

/**
 * Same approach with above solution but different implementation
 *
 * 1. We create carryOver variable to hold carry over value, which initialized as one, because we want to make sure that we still have carry over to take for the next 9 digit.
 * 2. We iterate through the array from end to start.
 * 3. We check if the current digit is not equal to 9, we update the last digit with the sum of the last digit plus 1 and return the final digits array.
 * 4. Otherwise, in case the digit is equal to 9, we set the current digit is equal to zero.
 * 5. Out of the loop, we add the carry over value to the start of the digits array and return the digits array.
 *
 * Time complexity: O(n) - where n is the number of elements in the input array
 * 'digits'.
 *
 * Space complexity: O(n)
 */
const plusOne = (digits) => {
  let carryOver = 1;

  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i] += 1;
      return digits;
    } else {
      digits[i] = 0;
    }
  }

  digits.unshift(carryOver);
  return digits;
};
