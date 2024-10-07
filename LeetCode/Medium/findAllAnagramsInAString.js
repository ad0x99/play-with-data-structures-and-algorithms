/**
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/description/
 *
 * Approach: Using sliding window to find substring that match anagrams of p
 *
 * 1. Create a counter to store the frequency of all characters of p.
 * 2. Iterates through each character in the pattern string.
 * 3. Add the current char of p into counter with initial value is -1.
 * 4. We create a ans array to store the result and left pointer starts from 0.
 * 5. Iterate through each character in the search string s using a right pointer right.
 * 6. If current character is already in the charCount, we increment the counter by 1, otherwise, we assign by zero and plus with one.
 * 7. We slide the window left until all characters in p are found in s. This loop continues as long as the count of the currentChar (from s) is greater than 0. This ensures that the sliding window only includes characters that are present in p with the required frequency.
 * 8. We decrement the count of the character at the left window in the charCount object. This simulates sliding the window by reducing the contribution of the leftmost character. And increments the left pointer to move the left window boundary.
 * 9. If the window size matches p's length, that means, we found a anagram pattern, then we add it into ans array. And continuing the iteration until out of bounds.
 *
 * Time Complexity: O(n + m) - In the worst case, both pointers might traverse the entire string s (length n).
 *
 * Space Complexity: O(min(n, m)) - In the worst case, the charCount object will store all unique characters from the pattern string p (length m). However, if the search string s has a smaller set of unique characters than p, the charCount object will only store characters present in s. Therefore, the space complexity is considered O(min(n, m)), where n is the length of s and m is the length of p.
 */
const findAnagrams = (s, p) => {
  // Count frequency of all characters of p and add into charCount
  const charCount = new Map();
  for (let char of p) {
    let count = (charCount.get(char) || 0) - 1;
    charCount.set(char, count);
  }

  const ans = [];
  let left = 0; // Initializes a variable left to keep track of the left window

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];
    // Updates the count of the current character. This effectively increments the count for characters found in s.
    charCount.set(currentChar, (charCount.get(currentChar) || 0) + 1); // Decrement for p, increment for s

    // Slide the window left until all characters in p are found in s
    while (charCount.get(currentChar) > 0) {
      const leftChar = s[left];
      charCount.set(leftChar, charCount.get(leftChar) - 1);

      left++;
    }

    // Check if the window size matches p's length (anagram found)
    if (right - left + 1 === p.length) {
      ans.push(left);
    }
  }

  return ans;
};

console.log(findAnagrams('cbaebabacd', 'abc')); // [0,6]
console.log(findAnagrams('abab', 'ab')); // [0,1,2]
