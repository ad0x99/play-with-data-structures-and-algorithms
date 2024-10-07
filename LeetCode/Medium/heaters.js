/**
 * https://leetcode.com/problems/heaters/description/
 *
 *
 * For example: houses = [1,2,3,4], heaters = [1,4]
 *
 * houses  =  1-----2-----3----4
 * heaters =  1                4
 *
 * We will calculate the minimum distance between a house and a heat such that all the will be warmed.
 *
 * The distance between heater 1 and house 1 is 0
 * The distance between heater 1 and house 2 is 1
 * The distance between heater 4 and house 4 is 0
 * The distance between heater 4 and house 3 is 1
 *
 * Therefore, the 4 houses could be warmed by 2 heaters with the minimum distance between them is 1. We get the maximum distance between 0 and 1 and we get the larger one.
 *
 * The idea here is to find all the minimum distances between a house and a heater. We will find all potential minimum distance and get the largest distance, because, the largest distance will be the minimum needed distance to warm all the houses with specific heaters.
 *
 * We will use binary search to find all the potential minimum distance between the current house with all the heaters in the left and right sides of the current house. And then, when we have all the potential minimum distances, we'll get the largest one.
 *
 * Implementation:
 *
 * 1. We sort the heaters array. Because we want to find the minimum distance between the current house with all the heaters in the left and right sides of the current house.
 * 2. We create a minDistance variable to store the minimum distance between a house and a heater such that all the house will be warmed.
 * 3. We iterate through all the houses.
 * 4. Firstly, we need to find the closest heater in the right the current house. (It means the closest heater that has the position greater than the current house, because the heaters list is already sorted)
 * 5. We create a minRadius variable to store the current minimum distance between the current house and the current heater.
 * 6. If the current right heater is not out of bounds of the headers array, we'll get the distance between the current house and the current heater, and then compare that distance with the current minimum radius to get the smaller one and update to the minRadius variable.
 * 7. After getting the minimum distance in the right side, we'll calculate the distance of the left heater with the current house. In this case, we get the left heater is the heater is at the previous position of the current right heater. To get the left heater, we decrease the position of the current right heater by 1.
 * 8. If the left heater is not out of bounds, we'll calculate the distance between the current house and the current left heater, and then, we'll compare that distance of the current minimum radius to get the smaller one.
 * 9. After getting the minimum distance (minRadius) between the current house and the current left and right heaters, we'll compare the current minimum radius with the current minimum distance (minDistance) to get the larger one. Because, the larger one will be the minimum distance between a house and a heater such that all the houses will be warmed.
 * 10. We continue to iterate through all the houses and return the minimum distance (minDistance) result.
 *
 * Time complexity: O(m log m) + O(n) * O(log m) = O (m log m + n log m)
 *  - Sorting the heaters: O(m log m) - where m is the number of heaters
 *  - Iterating through the houses: O(n) - where n is the number of houses
 *  - Binary search:       O(log m) - where m is the number of the heaters
 *
 * Space complexity: O(sorting(m)) - where m is the number of heaters, because we sort the heaters
 *
 */
const findRadius = (houses, heaters) => {
  heaters.sort((a, b) => a - b);
  let minDistance = 0;

  for (let house of houses) {
    // Find the closest heater which is greater than the current house
    let rightIdx = upperBound(heaters, house);

    let minRadius = Infinity;

    // If the current heater is less than the current house
    // We'll get the minimum radius between the current house and the right side heater
    if (rightIdx < heaters.length) {
      minRadius = Math.min(minRadius, heaters[rightIdx] - house);
    }

    let leftIdx = rightIdx - 1;
    if (leftIdx >= 0) {
      minRadius = Math.min(minRadius, house - heaters[leftIdx]);
    }

    minDistance = Math.max(minDistance, minRadius);
  }

  return minDistance;
};

/**
 * Find the first number that is greater and closest with the current number in the right side
 */
const upperBound = (nums, target) => {
  let left = 0;
  let right = nums.length - 1;
  let ans = nums.length;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let currentMid = nums[mid];

    if (currentMid > target) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};
