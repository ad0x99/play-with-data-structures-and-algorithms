/**
 * QUESTION
 *
 * Given an array of positive integers representing the values of coins in your possession, write a function that returns the minimum amount of change (the minimum sum of money) that you cannot create. The given coins can have any positive integer value and aren't necessarily unique (i.e., you can have multiple coins of the same value).
 *
 * For example, if you're given `coins = [1, 2, 5]`, the minimum amount of change that you can't create is 4. If you're given no coins, the minimum amount of change that you can't create is 1.
 *
 * Sample Input:
 * coins = [5, 7, 1, 1, 2, 3, 22]
 *
 * Sample Output:
 * 20
 */

/**
 * SOLUTION 1
 * 
 * The time complexity of this function is O(n log n), where n is the number of coins. This is because the function first sorts the coins array, which has a time complexity of O(n log n) in the worst case. Then, it iterates through the sorted coins array once, which has a time complexity of O(n). Therefore, the overall time complexity is O(n log n).

 * The space complexity of this function is O(1), because it only uses a constant amount of additional space to store the currentAmountOfChange and sortedCoins variables. The function does not create any additional data structures that grow with the input size, so the space complexity is constant.
 */
const nonConstructibleChange = (coins) => {
  if (!coins.length) return 1;

  // First, we keep track current amount of change
  let currentAmountOfChange = 0;
  // Sort the coins
  let sortedCoins = coins.sort((a, b) => a - b);

  // We iterate through the sorted coins
  for (const coin of sortedCoins) {
    // If the current coin value is greater than the current amount of change plus 1
    // This means, we found the non constructible value
    if (coin > currentAmountOfChange + 1) {
      return currentAmountOfChange + 1;
    }

    // Otherwise, we continue to calculate the coin until we found the non constructible value
    currentAmountOfChange += coin;
  }

  // Return the current amount of change plus 1
  // This means the next value that can't be created
  return currentAmountOfChange + 1;
};

const coins = [5, 7, 1, 1, 2, 3, 22];
const emptyCoins = [];
console.log(nonConstructibleChange(coins)); // 20
console.log(nonConstructibleChange(emptyCoins)); // 1
