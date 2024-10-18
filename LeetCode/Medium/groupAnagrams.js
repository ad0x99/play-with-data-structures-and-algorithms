/**
 * https://leetcode.com/problems/group-anagrams/description/
 *
 * Using Map and sorting key to group anagrams
 *
 * 1. We create a Map to store group of string has the same key.
 * 2. We iterate through each string.
 * 3. We create a key by sorting the current string in ascending order. This will make sure that even the current string is in the random order, we still know it belongs to the same key, and can map it into the correct group of strings.
 * 4. If the current key (current sorted string) is not in the map, we initialize an empty array for the group with the current key.
 * 5. And then, we add the current string to the group based on the its key.
 * 6. After iterating all the string, we convert Map values to an array of arrays and return the result.
 *
 *
 * Time complexity: O(n * m * log(m)),
 * - n is the number of strings in the array `strs`
 * - m is the average length of each string. This is because for each string in the input array, we are sorting the characters in the string, which has a time complexity of O(m * log(m)).
 *
 * Space complexity: O(n * m)
 * - n is the number of strings in the array `strs`
 * - m is the average length of each string. This is because we are storing the groups of anagrams in a Map, which can potentially store all the strings in the input array.
 *
 */
const groupAnagrams = (strs) => {
  const groups = new Map();

  for (const s of strs) {
    const key = getKeyV1(s);

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(s);
  }

  return Array.from(groups.values());
};

const getKeyV1 = (str) => {
  return str.split('').sort().join('');
};

/**
 * Counting Sort Approach
 *
 * Time complexity: O(n * m * log(m)),
 * - n is the number of strings in the array `strs`
 * - m is the average length of each string. This is because for each string in the input array, we are sorting the characters in the string, which has a time complexity of O(m * log(m)).
 *
 * Space complexity: O(n * m)
 * - n is the number of strings in the array `strs`
 * - m is the average length of each string. This is because we are storing the groups of anagrams in a Map, which can potentially store all the strings in the input array.
 *
 */
const groupAnagrams = (strs) => {
  const groups = new Map();

  for (const s of strs) {
    const key = getKeyV2(s);

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(s);
  }

  return Array.from(groups.values());
};

/**
 * Hash the key using counting sort
 *
 * 1. We create a new Map to store the frequency counting of each character.
 * 2. We iterate through each character to count the frequency of each character and add to the cnt Map.
 * 3. We create a ans array to store the characters and their counts.
 * 4. We iterate through the lowercase alphabets.
 * - 4.1: If the character exits in the cnt map and its count is greater than 0. We push the character, convert its count to string and push to the ans array.
 *
 * 5. We join the elements of ans array into a single string and return it.
 *
 * Time complexity: O(26 + n) = O(n)
 *
 * Space complexity: O(m)
 */
const getKeyV2 = (key) => {
  const cnt = new Map();
  for (const char of key) {
    const count = cnt.get(char) || 0;
    cnt.set(char, count + 1);
  }

  const ans = [];
  // Generate the alphabet characters in lowercase
  const alphabetLowerCase = [...Array(26)].map(
    (v, i) => (v = String.fromCharCode(i + 97))
  );

  for (const char of alphabetLowerCase) {
    if (cnt.has(char) && cnt.get(char) > 0) {
      ans.push(char);
      ans.push(cnt.get(char).toString());
    }
  }

  return ans.join('');
};
