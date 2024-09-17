/**
 * QUESTION
 *
 * You're given two positive integers representing the height of a staircase and the maximum number of steps that you can advance up the staircase at a time. Write a function that returns the number of ways in which you can climb the staircase.
 *
 * For example, if you were given a staircase of `height = 3` and `maxStep = 2`, you could climb the staircase in 3 ways. You could take `1 step`, `1 step`, then `1 step`, you could also take `1 step`, then `2 steps`, and you could take `2 steps`, then `1 step`.
 *
 * Note that `maxSteps <= height` will always be true.
 *
 * Sample Input:
 * height = 4, maxSteps = 2
 *
 * Sample Output:
 * 5
 * You can climb the staircase in the following ways:
 * - 1, 1, 1, 1
 * - 1, 1, 2
 * - 1, 2, 1
 * - 2, 1, 1
 * - 2, 2
 */

/**
 * Recursion Approach
 *
 * For example: height = 4, maxSteps = 2
 *
 * So, we have a staircase of the height of 4 like this:
 *
 * 4
 *   3
 *     2
 *       1
 *         0
 *
 * How many ways can we take to reach the top at each height?
 *
 *                  rec(4)
 *                /        \
 *             rec(3)      rec(2)
 *            /     \      /      \
 *        rec(2)   rec(1) rec(1)   rec(0)
 *       /      \
 *     rec(1)   rec(0)
 *
 * - height = 0 => step: [1] => ways to reach = 1
 * - height = 1 => step: [1] => ways to reach = 1
 * - height = 2 => step: [1,1] or [2] => ways to reach = 2
 * - height = 3 => step: [1,1,1] or [2,1] or [1,2] => ways to reach = 3
 * - height = 4 => step: [1,1,1,1] or [2,1,1] or [1,1,2] or [2,2] or [1,2,1] => ways to reach = 5 => total of ways to reach the top at height of 4 is 5
 *
 * We can see that the total ways to reach at height of 4 = ways to reach at current height minus one plus current height minus two = (4 - 1) + (4 - 2) = 3 + 2 = 5
 *
 * We can see the pattern is that the number of ways to get to a staircase of height H is equal to the number of ways to get to a staircase of height H minus 1 plus H minus 2 plus H mins S, where S is the maximum number of steps. We can form a formula: `waysToReachTheTop(H) = (H - 1) + (H - 2) + ... + (H - S) = currentH - currentS`
 *
 *
 * Implementation
 *
 * 1. The Base Case: we first check if the height is less than or equal to 1, we then return 1. This represents reaching the top stair or the bottom (ground level). In either case, there's only one way to reach it (staying put or taking the last step).
 *
 * 2. Recursion:
 * - 2.1: If the height is greater than 1, we calculate the total number of ways to reach the top by exploring all possible steps within the limit.
 * - 2.2: We create a variable `numberOfWays` to accumulate the total number of ways.
 * - 2.3: We create a variable `minStep` and calculate the minimum between the `maxSteps` and the remaining `height`. This ensures the loop doesn't iterate beyond the remaining steps or the staircase height. It uses a loop that iterates from step = 1 to minStep (inclusive).
 *
 * 3. Inside the loop, we iterate through each possible step size (step) and make a recursive call to `numberOfWaysToTop` with the following arguments:
 * - 3.1: `height - step`: This represents the remaining height after taking the current step. We are trying to get the height such that the ways to reach from that height to the current height is the sum of all the ways to reach between that height and current height.
 * - 3.2: `maxSteps`: The maximum number of steps allowed remains the same.
 * - 3.3: The returned value from the recursive call represents the number of ways to reach the top from the remaining height after taking the current step size.
 * - 3.4: Then the number of ways at each height is added to the `numberOfWays` variable to accumulate the total ways considering different possible steps.
 *
 * 4. After iterating through all possible steps, the `numberOfWays` variable holds the accumulated total number of ways to reach the top from the initial height considering all possible step combinations within the maxSteps limit. We return the `numberOfWays` value.
 *
 * Time complexity: O(k^n) - where k is the max step and n is height of the staircase
 *
 * Space complexity: O(n)
 */
const staircaseTraversal = (height, maxSteps) => {
  return numberOfWaysToTop(height, maxSteps);
};

const numberOfWaysToTop = (height, maxSteps) => {
  // Base case
  if (height <= 1) return 1;

  // Recursion
  let numberOfWays = 0;
  // In case the height is smaller than the max steps, we get the smaller one
  let minStep = Math.min(maxSteps, height) + 1;

  for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps);
  }

  return numberOfWays;
};

/**
 * Recursion Approach With Memoization
 *
 *                  rec(4)
 *                /        \
 *             rec(3)      rec(2)
 *            /     \      /      \
 *        rec(2)   rec(1) rec(1)   rec(0) (duplicate)
 *       /      \
 *     rec(1)   rec(0) (duplicate)
 *
 * We can see that some of the duplicate calculation. To be able to reducing calculation time, we can create a cache to store calculated result, and then we can return it when needed instead of re-calculate it.
 *
 * Time complexity: O(n * k) - where k is the max step and n is height of the staircase
 *
 * Space complexity: O(n)
 */
const staircaseTraversal = (height, maxSteps) => {
  return numberOfWaysToTop(height, maxSteps, { 0: 1, 1: 1 });
};

const numberOfWaysToTop = (height, maxSteps, memo) => {
  if (memo[height]) return memo[height];

  // Base case
  if (height <= 1) return 1;

  // Recursion
  let numberOfWays = 0;
  // In case the height is smaller than the max steps, we get the smaller one
  let minStep = Math.min(maxSteps, height) + 1;

  for (let step = 1; step < Math.min(maxSteps, height) + 1; step++) {
    numberOfWays += numberOfWaysToTop(height - step, maxSteps, memo);
  }

  memo[height] = numberOfWays;

  return numberOfWays;
};

/**
 * Dynamic Programming  Approach
 *
 * The idea is we will create a data structure to store all the answers of the number of ways to reach to the top at each height.
 *
 * 1. We create an array `waysToTop` of size `height + 1` and fills it with `zeros`. This array will store the number of ways to reach each height from the bottom (0th index) up to the top stair (height-th index).
 *
 * 2. We add the base case to the waysToTop array.
 * - waysToTop[0] = 1: There's one way to reach the ground level (starting point).
 * - waysToTop[1] = 1: There's one way to reach the first stair (taking one step).
 *
 * 3. Iterative Calculation: we iteratively calculate the number of ways to reach each height.
 * - 3.1: The Outer Loop: we iterate from `currentHeight = 2` to `height`. This loop considers heights from the second stair onwards (since the first two base cases were already handled).
 * - 3.2: The Inner Loop: we iterate from `step = 1` to `min(maxSteps, currentHeight)`. This loop explores possible step sizes for the current height, considering both the maximum allowed steps and the remaining height.
 *
 * 4. The `waysToTop[currentHeight]` represents the number of ways to reach the current height.
 * - 4.1: We add the value from `waysToTop[currentHeight - step]` to `waysToTop[currentHeight]`. The `waysToTop[currentHeight - step]` represents the number of ways to reach a height step less than the current height (achieved by taking a step of size step).
 * - 4.2: Adding these values essentially combines the number of ways to reach different heights that are `step` away from the current height. This considers all possible step combinations within the limit.
 *
 * 5. After the loops finish iterating, the `waysToTop` array will be populated with the number of ways to reach each height. We return the value at `waysToTop[height]`, which represents the number of ways to reach the top stair from the bottom to the specified height.
 *
 *
 * For example: height = 4, maxSteps = 2
 *
 * Initialization: waysToTop = [1, 1, 0, 0, 0] // The base case at height of 0, and 1 is 1
 *
 * First Iteration:
 * - waysToTop = [1, 1, 0, 0, 0]
 * - step = 1
 * - currentHeight = 2
 * - waysToTop[2] = waysToTop[2] + waysToTop[2 - 1] = waysToTop[2] + waysToTop[1] = 0 + 1 = 1
 * - waysToTop = [1, 1, 1, 0, 0]
 * - Increase step by 1
 * - step = 2
 * - waysToTop[2] = waysToTop[2] + waysToTop[2 - 2] = waysToTop[2] + waysToTop[0] = 1 + 1 = 2
 * - waysToTop = [1, 1, 2, 0, 0]
 *
 * Second Iteration:
 * - waysToTop = [1, 1, 2, 0, 0]
 * - step = 1
 * - currentHeight = 3
 * - waysToTop[3] = waysToTop[3] + waysToTop[3 - 1] = waysToTop[3] + waysToTop[2] = 0 + 2 = 2
 * - waysToTop = [1, 1, 2, 2, 0]
 * - Increase step by 1
 * - step = 2
 * - waysToTop[3] = waysToTop[3] + waysToTop[3 - 2] = waysToTop[3] + waysToTop[1] = 2 + 1 = 3
 * - waysToTop = [1, 1, 2, 3, 0]
 *
 * Third Iteration:
 * - waysToTop = [1, 1, 2, 3, 0]
 * - step = 1
 * - currentHeight = 4
 * - waysToTop[4] = waysToTop[4] + waysToTop[4 - 1] = waysToTop[4] + waysToTop[3] = 0 + 3 = 3
 * - waysToTop = [1, 1, 2, 3, 3]
 * - Increase step by 1
 * - step = 2
 * - waysToTop[4] = waysToTop[4] + waysToTop[4 - 2] = waysToTop[4] + waysToTop[2] = 3 + 2 = 5
 * - waysToTop = [1, 1, 2, 3, 5]
 *
 * => Final total ways to reach to the top with the height of 4 is 5 ways.
 *
 *
 * Time complexity: O(n * k) - where k is the max step and n is height of the staircase
 *
 * Space complexity: O(n)
 */
const staircaseTraversal = (height, maxSteps) => {
  let waysToTop = new Array(height + 1).fill(0);
  waysToTop[0] = 1;
  waysToTop[1] = 1;

  for (let currentHeight = 2; currentHeight < height + 1; currentHeight++) {
    let step = 1;

    while (step <= maxSteps && step <= currentHeight) {
      waysToTop[currentHeight] += waysToTop[currentHeight - step];
      step += 1;
    }
  }

  return waysToTop[height];
};

/**
 * Sliding Window Approach
 *
 * 1. We initialize 2 variables:
 * - 1.1: The `currentNumberOfWays` variable will temporarily store the number of ways to reach the current height.
 * - 1.2: The `waysToTop` array will store the number of ways to reach each height, starting with `waysToTop[0] = 1` (one way to reach the ground level).
 *
 * 2. We iterate through each height and iteratively calculate the number of ways to reach each height.
 *
 * 3. Sliding Window: we create 2 variables:
 * - 3.1: The `startOfWindow` variable will represent the starting index in the `waysToTop` array for the current sliding window. The `currentHeight - maxSteps - 1` positions the window's starting index `maxSteps + 1` elements before the current height.
 * - 3.2: The `endOfWindow` variable will represent the ending index in the `waysToTop` array for the current sliding window. The `currentHeight - 1` positions the ending index at the previous height.
 *
 * 4. Inside the loop
 * - 4.1: We check if the `startOfWindow` is greater than or equal to `0`. This ensures the window stays within the array bounds. It means the window includes elements beyond the ground level (index 0). In this case, we subtract the value at `waysToTop[startOfWindow]` from `currentNumberOfWays`. This removes the contribution of heights that are too far away (beyond maxSteps + 1) from the current height.
 * - 4.2: We then add the value at `waysToTop[endOfWindow]` to `currentNumberOfWays`. This adds the contribution of the previous height (which is within maxSteps + 1 from the current height).
 * - 4.3: The initial window size is `maxSteps + 1` because the number of ways to reach the current height depends on the previous `maxSteps + 1` heights.
 *
 * 5. After updating `currentNumberOfWays`, we append it to the waysToTop array. This stores the number of ways to reach the current height.
 * - 5.1: Since the window size is `maxSteps + 1`, as we move to the next height in the loop, the starting index (startOfWindow) automatically shifts one position to the right, effectively excluding the contribution of a height that is now `maxSteps + 2` away from the new current height.
 *
 * 6. After iterating through all heights, we return the `currentNumberOfWays` which will hold the number of ways to reach the top stair.
 *
 * For example: height = 4, maxSteps = 2
 *
 * Initialization:
 * - currentNumberOfWays = 0
 * - The base case at height of 0 is 1 => waysToTop = [1]
 * - maxSteps = 2
 *
 * First Iteration
 * - currentNumberOfWays = 0
 * - currentHeight = 1
 * - startOfWindow = currentHeight - maxSteps - 1 = 1 - 2 - 1 = -2
 * - endOfWindow = currentHeight - 1 = 1 - 1 = 0
 * - Window: [1, 1]
 * -      [  ]
 * - startOfWindow < 0 => currentNumberOfWays = currentNumberOfWays + waysToTop[endOfWindow] = 0 + 1 = 1
 * - Window: [1, 1]
 * -       [     ]
 * - waysToTop = [1, 1]
 *
 * Second Iteration
 * - waysToTop = [1, 1]
 * - currentNumberOfWays = 1
 * - currentHeight = 2
 * - startOfWindow = currentHeight - maxSteps - 1 = 2 - 2 - 1 = -1
 * - endOfWindow = currentHeight - 1 = 2 - 1 = 1
 * - Window: [1, 1]
 * -       [     ]
 * - startOfWindow < 0 => currentNumberOfWays = currentNumberOfWays + waysToTop[endOfWindow] = 1 + 1 = 2
 * - Window: [1, 1]
 * -         [     ]
 * - waysToTop = [1, 1, 2]
 *
 * Third Iteration
 * - waysToTop = [1, 1, 2]
 * - currentNumberOfWays = 2
 * - currentHeight = 3
 * - startOfWindow = currentHeight - maxSteps - 1 = 3 - 2 - 1 = 0
 * - endOfWindow = currentHeight - 1 = 3 - 1 = 2
 * - Window: [1, 1, 2]
 * -          [     ]
 * - startOfWindow >= 0 => currentNumberOfWays = currentNumberOfWays - waysToTop[startOfWindow] = 2 - 1 = 1
 * - Window: [1, 1, 2]
 * -             [  ]
 * - currentNumberOfWays += waysToTop[endOfWindow] = 1 + 2 = 3
 * - waysToTop = [1, 1, 2, 3]
 *
 * Fourth Iteration
 * - waysToTop = [1, 1, 2, 3]
 * - currentNumberOfWays = 3
 * - currentHeight = 4
 * - startOfWindow = currentHeight - maxSteps - 1 = 4 - 2 - 1 = 1
 * - endOfWindow = currentHeight - 1 = 4 - 1 = 3
 * - Window: [1, 1, 2, 3]
 * -             [     ]
 * - startOfWindow >= 0 => currentNumberOfWays = currentNumberOfWays - waysToTop[startOfWindow] = 3 - 1 = 2
 * - Window: [1, 1, 2, 3]
 * -                [  ]
 * - currentNumberOfWays += waysToTop[endOfWindow] = 2 + 3 = 5
 * - waysToTop = [1, 1, 2, 3, 5]
 *
 * => Final total ways to reach to the top with the height of 4 is 5 ways.
 *
 * Time complexity: O(n * k) - where k is the max step and n is height of the staircase
 *
 * Space complexity: O(n)
 */
const staircaseTraversal = (height, maxSteps) => {
  let currentNumberOfWays = 0;
  let waysToTop = [1];

  for (let currentHeight = 1; currentHeight < height + 1; currentHeight++) {
    let startOfWindow = currentHeight - maxSteps - 1;
    let endOfWindow = currentHeight - 1;

    if (startOfWindow >= 0) {
      currentNumberOfWays -= waysToTop[startOfWindow];
    }

    currentNumberOfWays += waysToTop[endOfWindow];
    waysToTop.push(currentNumberOfWays);
  }

  return currentNumberOfWays;
};
