/**
 * https://leetcode.com/problems/arranging-coins/description/
 *
 * As we can see that, the n is the number of coins we have to form a staircase, but we don't know the value of n. In this case, the n is supposed to be a list of numbers in increasing order.
 *
 * For example: n = 10
 *
 * In this case, the list of coins will be [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *
 * We have to find how much completed rows could be formed by using n coins. Somehow, we have to find out how many coins do we need to form a number of rows.
 *
 * There is an Gaussian sum math theory, we will use the list above to analysis
 *
 * How do we calculate the sum of all the number in this list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]. We can see a pattern that:
 *
 * 1 + 10 = 11
 * 2 + 9 = 11
 * 3 + 8 = 11  and so on.
 * until the middle where 5 + 6 = 11
 *
 * What we found here is that if we split half of the number here, we have a list of n / 2 = 5 numbers, that has each pair of values will add up to the sum of 11. => 5 * 11 = 55 is the sum of all the numbers
 *
 * We've got the formula:
 * - Firstly, we split the list into half: `n / 2`
 * - Secondly, we calculate the sum of the first number and the last number: `n + 1`
 * - => sum = `n / 2 * n + 1` = `n * (n + 1) / 2`
 *
 * As above example, 10 / 2 * (10 + 1) = 55, exact the sum of all the number.
 *
 * Regarding to this coin problem, with the constraints, the number of coin will always be more than 0, that means we have to have at least 1 coin to form 1 complete row. But the problem is that we don't know how much row do we have to fill up the coin. But we can see a pattern that, the more rows the more coins we need. We can notice the Monotonic function, therefore, we can leverage the upper bound technique in binary search.
 *
 * We will iterate through each coin from 1 to n, and split the list into half to find the maximum complete row. At each row, we will calculate to know how much coin do we need to fill up for each row. As long as the number of coins are enough for the specific row, we keep find the potential max row in the right, otherwise, if we don't have enough coin for the row, we'll look for the potential max row in the left.
 *
 * n = 5 => [1, 2, 3, 4, 5]
 * left = 1
 * right = 5
 * mid = 3
 * maxRows = 1;
 * numberOfCoinsRequiredToFormACompleteRow = 3 * (3 + 1) / 2 = 6
 *
 * 6 > 5 => right = 3 - 1 = 2
 *
 * mid = 1
 * right = 2;
 * numberOfCoinsRequiredToFormACompleteRow = 1 * (1 + 1) / 2 = 1
 * 1 < 5 => maxRows = 1 & left = 1 + 1 = 2
 *
 * left = 2
 * right = 2
 * mid = 2
 * numberOfCoinsRequiredToFormACompleteRow = 2 * (2 + 1) / 2 = 3
 * 3 < 5 => maxRows = 2 & left = 2 + 1 = 3
 *
 * Out of bounds, stop the loop and return 2 as the max complete row.
 *
 * Implementation:
 *
 * 1. We create the left starts from 1, and the right starts from n, and we create a variable to keep track the maximum complete rows which is called maxCompleteRows.
 * 2. As long as there are coins to iterate through.
 * 3. We get the midCoin, and calculate the total number of coins required to form a complete row with current mid coins
 * 4. If the number of coins are not out of the available coins, we update the maxCompleteRows by the mid value, and move to the right to look for next potential maximum row.
 * 5. Otherwise, we move to the left to look for the next possible maximum row.
 * 6. Return the maxCompleteRows as the result.
 *
 * Time complexity: O(log n)
 *
 * Space complexity: O(1)
 *
 */
const arrangeCoins = (n) => {
  let left = 1;
  let right = n;
  let maxCompleteRows = 1;

  while (left <= right) {
    let midCoin = Math.floor((left + right) / 2);
    let numberOfCoinsRequiredToFormACompleteRow = (midCoin * (midCoin + 1)) / 2;

    if (numberOfCoinsRequiredToFormACompleteRow <= n) {
      maxCompleteRows = midCoin;
      left = midCoin + 1;
    } else {
      right = midCoin - 1;
    }
  }

  return maxCompleteRows;
};
