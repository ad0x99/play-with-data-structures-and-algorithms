/**
 * https://leetcode.com/problems/combination-sum/description/
 *
 * Goal: We want to find all possible combinations of numbers from candidates that add up to target.
 *
 * Constraint: We can't add any number from candidates more times than allowed to avoid exceeding the target.
 *
 * Maximum Frequency Calculation: The formula `(target - currentSum) / candidates[i]` essentially represents the remaining amount we can add to the current combination (`target - currentSum`) divided by the value of the current candidate (`candidates[i]`).
 * - The difference between the `target` and `currentSum` gives us the remaining sum that we need to achieve the target (`target - currentSum`).
 * - To find out how many times the current candidate can be added without exceeding the target, we divide the remaining sum by the value of the current candidate.
 *
 * This gives us the maximum number of times we can add candidates[i] to the combination without going over the target.
 *
 * Let's say target = 10, currentSum = 5, and candidates[i] = 2.
 * - Using the formula: maxFrequency = Math.floor((10 - 5) / 2) = Math.floor(5 / 2) = 2.
 * - This means the maximum number of times we can add 2 (the current candidate) to the combination without exceeding 10 is 2.
 *
 * Calculating the maximum frequency upfront helps in pruning unnecessary branches during exploration. If the maxFrequency is 0 (meaning the current candidate can't be included in the combination without exceeding the target), we can skip exploring that branch altogether, saving time and computation.
 *
 * Implementation
 *
 * Recursion & Backtracking Approach
 *
 * 1. We sort the candidates array in descending order. This can potentially help in reducing the number of recursive calls by attempting larger numbers first.
 *
 * 2. We initialize the `currentCombination` array to store the current combination being built, the `currentSum` variable to track the sum of the current combination, and the `combinations` array to store the final combinations found.
 *
 * 3. The base case:
 * - 3.1: Base Case 1: If the `currentSum` is already greater than or equal to the target (meaning we've exceeded the target), or if we've reached the end of the candidates array (i at length), we return.
 * - 3.2: Base Case 2: If `currentSum` matches the target and we've reached the end (or beyond) of candidates, it means we found a valid combination. In this case, we push a copy of the current combination to the combinations array to prevent modifications during backtracking.
 *
 * 4. Looping through Frequencies.
 * - 4.1: We calculate the maximum frequency for the current candidate. This is the maximum number of times we can add `candidates[i]` to the combination without exceeding the target.
 * - 4.2: We iterate through possible frequencies (number of times to use the current candidate) from `0` to `maxFrequency`.
 *
 * 5. Building the Combination - Inside the loop:
 * - 5.1: We add the current candidate (`candidates[i]`) to the `currentCombination` array frequency times and fill to create a repeating sequence.
 * - 5.1: We update the `currentSum` by adding the product of `candidates[i]` and its frequency.
 *
 * 6. Recursion: We call the `buildCombination` function recursively with `i + 1` to explore combinations with the next candidate (skipping duplicates due to sorting).
 *
 * 7. Backtracking: After exploring branches with the current frequency, we backtrack by removing the contribution of the current candidate from the currentSum. And we loop frequency times to pop the elements (copies of candidates[i]) that were added earlier. This ensures that `currentCombination` reflects the state before exploring this frequency path.
 *
 * 8. After exploring all possibilities, we return the final set of valid combinations found and stored in the combinations array.
 *
 * Time complexity: O((target / min(candidates) ^ n) - where n is the length of candidates. This is because for each candidate, we have two choices - either include it in the combination or not include it.
 *
 * Space complexity: O((target / min(candidates)) ^ n) + O(nlogn) + O(n) = O(k * n)
 * - n is the length of currentCombination.
 * - target / min(candidates) is the maximum of frequency
 * - O(n log n) for sorting
 * - O(n) for recursion
 * - O(k * n) where n is equal to max(1, target / min(candidates))
 */
const combinationSum = (candidates, target) => {
  candidates.sort((a, b) => b - a);
  let currentCombination = [];
  let currentSum = 0;
  let combinations = [];

  const buildCombination = (i) => {
    if (currentSum >= target || i === candidates.length) {
      if (currentSum === target) {
        combinations.push([...currentCombination]);
      }
      return;
    }

    let maxFrequency = Math.floor(target - currentSum / candidates[i]);

    for (let frequency = 0; frequency < maxFrequency + 1; frequency++) {
      currentCombination.push(...Array(frequency).fill(candidates[i]));
      currentSum += candidates[i] * frequency;

      buildCombination(i + 1);

      currentSum -= candidates[i] * frequency;
      for (let j = 0; j < frequency; j++) {
        currentCombination.pop();
      }
    }
  };

  buildCombination(0);
  return combinations;
};

/**
 *
 * This solution has the same idea as the previous one. Here are some differences:
 *
 * Frequency Tracking: We use a separate `currentCombination` array to store the frequencies of each candidate instead of directly adding them to the combination multiple times.
 *
 * Combination Building: The combination itself is constructed within the loop when a valid combination is found, creating a copy for storage.
 *
 * Backtracking: Backtracking is implicit in this approach. No explicit removal of elements from `currentCombination` is needed because the next iteration with a different frequency starts fresh.
 *
 * Implementation
 *
 * 1. We initialize the `n` variable to store the length of the candidates array, the `ans` array to store the final combinations found, the `currentCombination` array to track the current combination being built, and the currentSum variable to track the sum of the current combination.
 *
 * 2. The base case:
 * - 2.1: Base Case 1: If i reaches the end of the candidates array (i at length), it means we've explored all possible combinations starting from the beginning.
 * - 2.2: Base Case 2: If the `currentSum` matches the target and we've reached the end (or beyond) of candidates, it means we found a valid combination. In this case: we create a `combination` array to store a copy of the current combination.
 * - 2.3: We iterate through the `currentCombination` array, which stores the frequencies of each candidate. Based on the frequencies of the current candidate, we create a sequence of the current candidate (`candidates[candidate]`) repeated the number of times specified by the corresponding frequency in `currentCombination[candidate]`. This effectively builds the final combination array.
 * - 2.4: After that, we push the newly created copy of the combination to the `ans` array to store it.
 *
 * 3. Looping through Frequencies:
 * - 3.1: We calculate the maximum frequency (number of times) we can include the current candidate (candidates[i]) in the combination without exceeding the target.
 * - 3.2: We iterate through possible frequencies (number of times to use the current candidate) from `0` to `maxFrequency`.
 *
 * 4. Unlike the previous algorithm, this one doesn't explicitly add the candidate to `currentCombination` multiple times. Instead, it keeps track of frequencies in `currentCombination`.
 *
 * 5. Recursive Exploration
 * - 5.1: We update the `currentSum` by adding the product of the current candidate (`candidates[i]`) and its frequency.
 * - 5.2: After that, we call the `buildCombination` function recursively with `i + 1` to explore combinations with the next candidate.
 *
 * 6. Backtracking: The recursive call explores a branch with the current frequency, and after returning, no explicit actions are needed to remove elements from `currentCombination`. The next iteration with a different frequency starts fresh.
 *
 * 7. After exploring all possibilities, we return the final set of valid combinations found and stored in the `ans` array.
 *
 * Time complexity: O((target / 2) ^ n * n)
 *
 * Space complexity: O(n) + O(n) = O(n) - where n is the length of currentCombination and the depth of recursion
 */
const combinationSum = (candidates, target) => {
  const n = candidates.length;
  const ans = [];
  const currentCombination = [];
  let currentSum = 0;

  const buildCombination = (i) => {
    if (i === n) {
      if (currentSum === target) {
        const combination = []; // Create a new array for each combination

        for (
          let candidate = 0;
          candidate < currentCombination.length;
          candidate++
        ) {
          combination.push(
            ...Array(currentCombination[candidate]).fill(candidates[candidate])
          );
        }

        ans.push(combination); // Push the copied combination
      }
      return;
    }

    const maxFrequency = Math.floor((target - currentSum) / candidates[i]);

    for (let frequency = 0; frequency <= maxFrequency; frequency++) {
      currentCombination.push(frequency);
      currentSum += frequency * candidates[i];

      buildCombination(i + 1);

      currentSum -= frequency * candidates[i];
      currentCombination.pop();
    }
  };

  buildCombination(0);
  return ans;
};
