/**
 * https://leetcode.com/problems/palindromic-substrings/description/
 *
 * Two Pointer Approach
 *
 * Idea: At each i-th position, we expand to the left and right accordingly and keep track the count of palindrome found at each substring. There are 2 scenarios where the string is odd and even, we need to make sure that we expand for both cases to get the correct palindrome.
 * 
 * At each position, we expand to the left and right and count the number of palindrome substring. The total palindrome substring is equal to the total palindrome of the odd and even substring at each position.
 *
 * Time complexity: O(n ^ 2), where n is the number of characters in the string s.
 *
 * Space complexity: O(1)
 */
const countSubstrings = (s) => {
  const expand = (left, right) => {
    let count = 0;

    while (left >= 0 && right < s.length && s[left] === s[right]) {
      count += 1;
      left--;
      right++;
    }

    return count;
  };

  let totalCount = 0;
  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome
    const oddCount = expand(i, i);
    // Even length palindrome
    const evenCount = expand(i, i + 1);
    // Update total count of palindrome substring found
    totalCount += oddCount + evenCount;
  }

  return totalCount;
};
