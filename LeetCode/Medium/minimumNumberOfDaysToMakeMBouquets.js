/**
 * https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/
 *
 * The more days there are, the more flowers bloom, and the more bouquets you can make and vice versa. Therefore, we want to find the smallest day such that we can make enough number of bouquets as expected.
 *
 * 1. We create a left variable to store the the smallest bloom day, and the right variable to store the largest bloom day.
 * 2. As long as there is at least 1 bloom day, we iterate through the bloom day array and get the middle bloom day of the array.
 * 3. We will calculate the number of bouquets we can make at the current day. In the calculateNumberOfBouquetsAtDay function, we need a variable to store the number of bouquets we can make at the current day, and the number of adjacent flowers to make a bouquet.
 * - 3.1: We iterate through the bloom day array. If the current day is greater than or equal to the current day in the bloom day, that means we found a bloomed flower, we increase the numberOfAdjacentFlowers by 1.
 * - 3.2: Otherwise, If the current day is less than the current day in the bloom day, that means, there is no bloomed flower at the current day. We will check how much bouquets we can make with the current number of adjacent flowers. And we reset the numberOfAdjacentFlowers to 0 for the next iteration.
 * - 3.3: Out of the iteration, we will calculate the number of bouquets we can make the the current number of adjacent flowers, and return the number of bouquets
 *
 * 4. If the number of bouquets are greater than or equal to the number of bouquets we have to make, then we update the ans by the current day, and move to the left to find for the next possible minimum day. Because we want to find the minimum day to make m bouquets.
 * 5. Otherwise, the number of bouquets are less than the number of bouquets we have to make, we want to move to the right to make enough bouquets.
 * 6. We return the ans.
 *
 * Time complexity: O(n * log(MAX_BLOOM_DAY)) - because we have to iterate through each day to calculate the number of bouquets we can make, and in the binary search, we iterate until we reach to the MAX_BLOOM_DAY.
 *
 * Space complexity: O(1)
 */
const minDays = (bloomDay, m, k) => {
  function calculateNumberOfBouquetsAtDay(currentDay) {
    let numberOfBouquets = 0;
    let numberOfAdjacentFlowers = 0;

    for (let day of bloomDay) {
      if (currentDay >= day) {
        numberOfAdjacentFlowers += 1;
      } else {
        numberOfBouquets += Math.floor(numberOfAdjacentFlowers / k);
        numberOfAdjacentFlowers = 0;
      }
    }

    numberOfBouquets += Math.floor(numberOfAdjacentFlowers / k);
    return numberOfBouquets;
  }

  let left = Math.min(...bloomDay);
  let right = Math.max(...bloomDay);
  let ans = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (calculateNumberOfBouquetsAtDay(mid) >= m) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};
