/**
 * https://leetcode.com/problems/repeated-dna-sequences/description/
 *
 * Map + Prefix Matching Approach
 *
 * Idea: We want to find all the 10-letter-long sequences that occur more than once.
 *
 * So, the idea here is to store all 10-letter-long substrings and its frequency into a Map.
 *
 * From that, we can get the 10-letter-long substrings that have frequency is greater than 0. It means, that substring is a repeated sequence.
 *
 * Implementation
 *
 * 1. We initialize a prefix Map to store the 10-letter-long substrings, and a sequence array to store the result of all sequences that occur more than once.
 *
 * 2. We iterate through each character of the string.
 *
 * 3. At each iteration, we get the current substring start from `ith` to `ith + 10`to build a 10-letter-long substring.
 *
 * 4. Base case: If the current substring length is less than 10, from this position to the end of the string, we're no longer building a valid 10-letter-long substring. We break the iteration.
 *
 * 5. Otherwise, if the current substring is valid, we count its frequency.
 *
 * 6. If the frequency of the current substring is greater than 0, and it doesn't exist in the sequence array, it means, found a 10-letter long substring that occurs more than once, we then push the current substring to the sequence array.
 *
 * 7. After that, we add the current substring and its frequency to the prefix map, and increase i by 1 to move to the next character.
 *
 * Time complexity: O(n), where n is the length of the string.
 *
 * Space complexity: O(n), where n is the length of the prefix and sequence.
 */
const findRepeatedDnaSequences = (string) => {
  if (string.length < 10) {
    return [];
  }

  const prefix = new Map();
  const sequence = new Array();

  // Build substring & sequence
  let i = 0;
  while (i < string.length) {
    const substring = string.slice(i, i + 10);
    if (substring.length < 10) break;

    const freq = prefix.has(substring) ? prefix.get(substring) + 1 : 0;
    if (freq > 0 && !sequence.includes(substring)) {
      sequence.push(substring);
    }

    prefix.set(substring, freq);

    i++;
  }

  return sequence;
};
