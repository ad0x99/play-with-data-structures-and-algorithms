/**
 * The function recursively counts down from a given number until it reaches 0 and logs each number to
 * the console.
 * @param num - The parameter `num` is a number that represents the starting point of the countdown.
 * The function recursively logs each number from `num` to 1, and then logs "All done!" when the
 * countdown is complete.
 * @returns If the `num` parameter is less than or equal to 0, the function will return `undefined`
 * since there is no explicit return statement. Otherwise, the function will recursively call itself
 * with `num` decremented by 1 until `num` is less than or equal to 0, at which point the function will
 * return `undefined`.
 */
const countDown = (num) => {
  // The base case
  if (num <= 0) {
    console.log('All done!');
    return;
  }

  console.log(num);
  num--;
  countDown(num);
};

countDown(5);
