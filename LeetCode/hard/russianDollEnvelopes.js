/**
 * https://leetcode.com/problems/russian-doll-envelopes/description/
 *
 * Binary Search Approach
 *
 * As the problem is given that "One envelope can fit into another if and only if both the width and height of one envelope are greater than the other envelope's width and height".
 *
 * That means, as long as the height is in increasing order (currentHeight > previousHeight), we can fit the previous envelope into the current one. We can leverage that to find the longest increasing subsequence based on the height of the envelope. Because the LIS will be the maximum number of envelopes that can be nested within each other.
 *
 * But in case there are 2 widths is the same, we'll prioritize to take the envelope that has the higher height by sorting the envelope in descending order based on the height of the envelope. Because the LIS can only take one subsequence at a time, therefore, if we put the envelope that has the higher height first, we can only lose one potential subsequence.
 *
 * For example: Envelope A: Width = 5, Height = 4 and Envelope B: Width = 5, Height = 7
 *
 * If we encounter another wider envelope (say, Width = 6) later in the sorted list, there's a higher chance of nesting Envelope B (taller) inside it because it appears earlier due to its greater height. By sorting envelopes with the same width in descending order of height, Envelope B (taller) will come before Envelope A (shorter) in the sorted list.
 *
 * If we encounter another wider envelope (say, Width = 6) later in the sorted list, there's a higher chance of nesting Envelope B (taller) inside it because it appears earlier due to its greater height.
 *
 * Conversely, if we sorted by ascending height (shorter first), there's a chance we might miss the opportunity to nest Envelope B inside a wider envelope encountered later. Envelope A (shorter) might have already been nested within another wider envelope, leaving no space for the taller Envelope B.
 *
 * 1. We start by sorting the envelopes based on their widths. This ensures that when considering nested envelopes, the outer envelope will always have a larger width than the inner ones.
 * - 1.1: Within envelopes with the same width, the sorting prioritizes descending height. This means taller envelopes with the same width come before shorter ones. This prioritizes fitting taller envelopes inside wider ones whenever possible.
 *
 * 2. After sorting the envelopes, we create a new array containing only the heights of the envelopes. This is because we're interested in finding the longest increasing subsequence (LIS) of heights, which represents the maximum number of envelopes that can be nested based on their heights.
 * 3. The LIS represents the maximum number of envelopes that can be nested based on their heights, where each envelope's height is strictly less than the one above it in the sequence.
 * 4. The final result returned by maxEnvelopes is the length of the LIS calculated on the heights array. This value represents the maximum number of envelopes that can be nested within each other based on their widths and heights.
 *
 * Time complexity: O(n log n) + O(n) + O(log n) = O(n log n)
 * - Sorting: O(n log n) - based on the sorting algorithms
 * - lengthOfLIS: O(n) - for iterating through each height
 * - Binary search: O(log n) - for finding LIS
 *
 * Space complexity: O(n) - where n is the length of sorting envelopes and the length of subsequence array in lengthOfLIS function
 */
const maxEnvelopes = (envelopes) => {
  // Sort envelopes by width (ascending) and height (descending if width is equal)
  envelopes.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  // Extract heights for LIS calculation
  const heights = envelopes.map(([width, height]) => height);

  return lengthOfLIS(heights);
};

/**
 * Find longest increasing subsequence in the array
 */
const lengthOfLIS = (nums) => {
  const subsequence = [];

  for (const num of nums) {
    if (subsequence.length === 0 || num > subsequence[subsequence.length - 1]) {
      subsequence.push(num);
    } else {
      let idx = lowerBound(subsequence, num);
      subsequence[idx] = num;
    }
  }

  return subsequence.length;
};

/**
 * Find the first element that is greater than or equal to the target
 */
const lowerBound = (subsequence, num) => {
  let left = 0;
  let right = subsequence.length - 1;
  let ans = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (subsequence[mid] >= num) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};

const envelopes = [
  [5, 4],
  [6, 4],
  [6, 7],
  [2, 3],
];

console.log(maxEnvelopes(envelopes));
