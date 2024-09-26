/**
 * https://leetcode.com/problems/longest-common-prefix/description/
 *
 * Prefix Matching Approach
 *
 * Implementation
 *
 * 1. We initialize a pointer `i` to track the position in the prefix.
 *
 * 2. We initialize a infinite loop to iterate through each string in `strs` and checks if the i-th character of all strings is the same.
 *
 * 3. If `i` exceeds the length of any string or if characters at position `i` do not match, we return the common prefix found so far. The slice(0, i) returns the substring from the beginning of the string up to i.
 *
 * Time complexity: O(m * n), where n is the number of strings, and m is the length of the shortest string.
 *
 * Space complexity: O(1)
 */
const longestCommonPrefix = (strs) => {
  if (!strs.length) return '';

  let char = 0;
  while (true) {
    for (let i = 0; i < strs.length; i++) {
      const currentCharacterOfFirstString = strs[0][char];
      const currentString = strs[i];
      const currentCharacter = strs[i][char];

      // If we reach the end of any string or the characters don't match, return the prefix
      if (
        char >= currentString.length ||
        currentCharacterOfFirstString !== currentCharacter
      ) {
        return strs[0].slice(0, char);
      }
    }

    char++;
  }
};
