/**
 * https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
 *
 * 1. We initialize the `left` is set to the maximum weight of any item in weights, and the `right` is set to the total weight of all items. This represents the absolute maximum capacity needed if all items are shipped together.
 * 2. The `leastCapacity` is initialized to right, assuming the worst case (all items shipped together) initially.
 * 3. As long as left is less than or equal to right. We implement binary search to find the minimum capacity.
 * 4. A middle capacity is calculated as the floor of the average of left and right, and the `countDayNeeded` function is called with the capacity to determine the number of days needed to ship all items if that capacity limit is enforced per shipment.
 * 5. In the `countDayNeeded`
 * - 5.1: We initialize two variables are the `count` will represent the number of days needed to ship all items with the given capacity, and the `currentSumOfWeights` to keep track of the current weight accumulated in a shipment.
 * - 5.2: We loop through each item weight (`w`) in the weights list.
 * - 5.2.1: The current weight (`currentSumOfWeights`) is incremented by the weight of the current item (`w`).
 * - 5.2.2: If the `currentSumOfWeights` exceeds the given capacity, it means the current shipment is full.
 * - 5.2.3: If the capacity is exceeded: The `currentSumOfWeights` is reset to the current item's weight (`w`), signifying a new shipment starts. The count is incremented by 1 to reflect an additional day needed for shipping due to the new shipment.
 * - 5.2.4: After iterating through all weights, we return the final count, which represents the number of days needed to ship all items with the provided capacity.
 *
 * 6. If the countDayNeeded for the capacity is less than or equal to the allowed days, this means the capacity is sufficient to ship all items within the allowed days.
 * - 6.1: The leastCapacity is updated to the current capacity as a potential minimum.
 * - 6.2: The search space is narrowed down by setting right to `capacity - 1` to focus on lower capacities that might also be sufficient.
 *
 * 7. If the countDayNeeded for the capacity is greater than days. This means the capacity is not enough to ship all items within the allowed days. The search space is narrowed down by setting left to `capacity + 1` to focus on higher capacities that can guarantee shipping within days.
 * 8. After the loop finishes, the leastCapacity variable holds the minimum capacity required to ship all items within the allowed days.
 * 9. We return the leastCapacity, as the least required capacity to ship all items within the allowed days.
 *
 * Time complexity: O(n) * O(log m) = O(n log m)
 * - countDayNeeded: O(n) - where n is the number of weights
 * - Binary search: O(log m) - where m is the number of capacities (sum of weights)
 *
 * Space complexity: O(1)
 */
const shipWithinDays = (weights, days) => {
  const countDayNeeded = (capacity) => {
    let count = 1;
    let currentSumOfWeights = 0;

    for (let w of weights) {
      currentSumOfWeights += w;

      if (currentSumOfWeights > capacity) {
        currentSumOfWeights = w;
        count += 1;
      }
    }

    return count;
  };

  let left = Math.max(...weights);
  let right = weights.reduce((sum, weight) => sum + weight, 0);
  let leastCapacity = right;

  while (left <= right) {
    let capacity = Math.floor((left + right) / 2);

    if (countDayNeeded(capacity) <= days) {
      leastCapacity = capacity;
      right = capacity - 1;
    } else {
      left = capacity + 1;
    }
  }

  return leastCapacity;
};
