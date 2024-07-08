/**
 * https://leetcode.com/problems/permutation-in-string/
 *
 * Brute Force Approach
 *
 * Idea: Iterating through each substring of s2. After that, we sort both s2's substring and s1 in the same order. We compare both strings, if both string is the same, that means we found a permutation, we return true. Otherwise, return false.
 *
 * Time complexity: O(n * m * log(m)), where n is the length of s2 and m is the length of s1.
 * - Sort substring of s2 with length of m: O(m * log(m)).
 * - Sort s1 with length of m: O(m * log(m)).
 *
 * Space complexity: O(1)
 */
const checkInclusion = (s1, s2) => {
  const n = s1.length;
  const m = s2.length;
  s1 = s1.split('').sort().join('');

  if (m < n) {
    return false;
  }

  for (let i = 0; i < n; i++) {
    const sortedSubstringOfS2 = s2
      .slice(i, i + n)
      .split('')
      .sort()
      .join('');

    if (sortedSubstringOfS2 === s1) {
      return true;
    }
  }

  return false;
};

/**
 * Sliding Window + Hashing Approach
 *
 * Idea: A permutation appears when the substring of s2 is equal to the string s1.
 *
 * However, the order of each character might be different, therefore, we will need to sort both strings and then we compare it. But this approach will take more time because, each time we iterate through each substring, we need to sort the substring.
 *
 * By using additional condition beside comparing sorted string, we can improve the time complexity. In this case, we will hash each character of both s2's substring and s1 to the same formula. This will make sure that, whenever we found both substrings have the same hashing, there is a high chance that we have found a permutation.
 *
 *  And by checking the hashes first, we will not sort the substring until both hashes are the same, this will avoid sorting in each iteration.
 *
 * The hash function will hash each character as following format:
 *
 * ```js
 * a -> 1, b -> 2, c -> 4, d -> 8, e -> 16, f -> 32....
 * ```
 *
 * Implementation
 *
 * 1. We initialize 2 variables: `s1CharHash` and `s2CharHash`, which are used to store the hash value of string s1 and s2's substring.
 *
 * 2. We iterate through `n` characters to calculate the hash value of s1, and s2's first `n` characters.
 *
 * 3. We iterate through each character of s2 and keep track a window of substring with length of n (length of s1). Inside the loop, we check:
 * - 3.1: If the current `s1CharHash` (representing the characters in s1) is equal to the current `s2CharHash` (representing the characters in the current window of s2)
 *
 * - 3.2: If the hash values match, it means that both strings might have the same set of characters.
 *
 * - 3.3: We call `isPermutation` to check the second condition is that if the characters within the current window of s2 (substring from i-n to i in s2) can be rearranged to form s1.
 *
 * - 3.4: If both the hash values match and `isPermutation` returns `true`, it means we've found a window in `s2` that contains the same characters as s1 and can be rearranged to form `s1`. We return true.
 *
 * - 3.5: Otherwise, we keep re-calculating the hash value of substring in s2 by removing the leftmost character from the current window, and adding the next character in the rightmost side to the window to form a new substring for next iteration.
 *
 * 4. After the loop completes, we check one last time if the hash values of the entire s2 and s1 match (`s1CharHash === s2CharHash`), and if the substring of s2 from `m-n` to `m` (the last n characters) and s1 are formed a permutation. This final check handles cases where s1 might be present at the end of `s2`.
 *
 * 5. If any of the checks within the loop or the final check return true, it means s1 can be formed by rearranging characters from `s2`. We return true. Otherwise, we return false.
 *
 * Time complexity: O(m + n), where m is the length of s2, and n is the length of s1.
 *
 * Space complexity: O(1)
 */
const checkInclusion = (s1, s2) => {
  const n = s1.length;
  const m = s2.length;

  if (m < n) {
    return false;
  }

  let s1CharHash = 0;
  let s2CharHash = 0;
  for (let i = 0; i < n; i++) {
    s1CharHash += getHash(s1.charAt(i));
    s2CharHash += getHash(s2.charAt(i));
  }

  for (let i = n; i < m; i++) {
    if (
      s1CharHash === s2CharHash &&
      isPermutation(s2.substring(i - n, i), s1)
    ) {
      return true;
    }

    s2CharHash = s2CharHash - getHash(s2.charAt(i - n)) + getHash(s2.charAt(i));
  }

  return s1CharHash === s2CharHash && isPermutation(s2.substring(m - n, m), s1);
};

/**
 * Step 1: Gets numerical representation of current char
 *
 * Step 2: Subtracts the character code of 'a' ('a'.charCodeAt(0)) from the character code from step 1 and shifts the focus to the alphabetical position of the character relative to 'a'.
 *
 * Step 3: Uses the left shift operator (<<) to create a bitmask by shifting a 1 to the left by the number of positions calculated in step 2.
 */
const getHash = (char) => {
  return 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
};

/**
 * - Converts string to array
 * - Sorts the array in ascending order
 * - Joins the array into string
 * - Compares both string
 */
const isPermutation = (a, b) => {
  return a.split('').sort().join('') === b.split('').sort().join('');
};

/**
 * Sliding Window + Frequency Counting Approach
 *
 * Idea: Instead of hashing the character as previous solution, we will compare both substring string to find the permutation by using its character frequencies.
 *
 * A permutation is formed if both string have the same number of character's frequencies. But instead of counting the frequency as usual, we will hash the frequency of each character to prevent duplication.
 *
 * Implementation
 *
 * 1. We initialize 2 arrays: `s1Count` and `s2Count`, both of size 26. These arrays will store the frequency of each character (a-z) in `s1` and `s2`, respectively. We initialize all elements in both arrays to 0.
 *
 * 2. We iterate through the first `n` characters of both strings (s1 and s2) and update the corresponding character counts in the s1Count and s2Count arrays.
 * - 2.1: We calculate the index for each character in the count arrays by subtracting the character code of 'a' from the character's code. This effectively uses the character's position in the alphabet (0 for 'a', 1 for 'b', etc.) as the index in the count array.
 *
 * 3. We iterate through each character of s2 string and keep a window of size n to find permutation. Inside the loop, we check:
 * - 3.1: If both character counts of s1 and s2's current substring are equal. it means both strings (s1 and the current window in s2) have the same character frequencies, indicating a potential match. We return true.
 *
 * - 3.2: Otherwise, we need to adjust the character counts in `s2Count` to reflect the new window by incrementing the count for the character entering the window (index i in s2), and decrementing the count for the character leaving the window (index i-n in s2). This maintains accurate character frequencies within the current window.
 *
 * 4. After the loop completes, we check one last time to compare the character counts of s1 and the entire s2. This final check handles cases where s1 might be present at the end of s2 and return true if we found a permutation, otherwise, we return false.
 *
 * Time complexity: O(m + n)
 *
 * Space complexity: O(26) + O(26) => O(1)
 */
const checkInclusion = (s1, s2) => {
  const n = s1.length;
  const m = s2.length;

  if (m < n) {
    return false;
  }

  const s1Count = new Array(26).fill(0);
  const s2Count = new Array(26).fill(0);

  // Initialize the character count arrays
  for (let i = 0; i < n; i++) {
    s1Count[s1.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
  }

  for (let i = n; i < m; i++) {
    if (matches(s1Count, s2Count)) {
      return true;
    }

    // Update the counts for the sliding window
    s2Count[s2.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    s2Count[s2.charCodeAt(i - n) - 'a'.charCodeAt(0)]--;
  }

  return matches(s1Count, s2Count);
};

// Check if two arrays are equal by comparing its frequency counts.
const matches = (a, b) => {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};
