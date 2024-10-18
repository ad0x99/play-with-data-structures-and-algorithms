/**
 * https://leetcode.com/problems/sort-characters-by-frequency/description/
 *
 * Counter Approach: The idea is to calculate the frequency of each character and sort them by frequency.
 *
 * 1. We use a Map to store character frequencies.
 *
 * 2. We iterate through the string s and updates the count for each character in the frequencies Map.
 *
 * 3. We can't not sort a string, therefore, we will convert the string s into an array first.
 *
 * 4. After that, we use sort function with custom sort condition
 * - 4.1: We compare 2 characters (a and b) based on their frequencies.
 * - 4.2: We retrieve the frequency of two characters (a and b).
 * - 4.3: We sort the characters by frequency in descending order (countB - countA).
 * - 4.4: If frequencies are equal, the characters are sorted alphabetically using their character codes (charCodeAt()). This ensures stability (preserving order within characters with the same frequency).
 *
 * 5. Because we have to return the sorted string, therefore we have to convert the array back to string using join() function and return the sorted string (s).
 *
 * Time complexity: O(n log n), where n is the length of the input string s.
 * - Iterating to count the frequency of each character: O(n).
 * - Sorting the characters: O(n log n).
 *
 * Space complexity: O(n), where n is the length of the input string s.
 * - Using a Map to store the frequency of each character, which can potentially store all unique characters in the input string.
 * - Splitting the input string into an array of characters.
 *
 */
const frequencySort = (s) => {
  let frequencies = new Map();

  for (const char of s) {
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }

  s = s.split('');
  s.sort((a, b) => {
    const countA = frequencies.get(a);
    const countB = frequencies.get(b);

    return countB - countA || a.charCodeAt() - b.charCodeAt();
  });

  return s.join('');
};

/**
 * Bucket Sort Approach: Using a bucket to store characters based on its frequency, and then build sorted string using frequency bucket.
 *
 * 1. We create a map (`frequencies`) to store the character frequencies and iterate through each character to count the frequency.
 *
 * 2. We create a `bucket` array with size equal to the string `length + 1` to hold characters based on their frequencies.
 *
 * 3. We iterate through `frequencies` entries. For each character (`char`) and its frequency (`freq`), the character is pushed into the corresponding bucket at index `freq` in the bucket array. It means, we want to group the character by its frequency.
 *
 * 4. We create a empty `sortedString` variable to store the sorted characters.
 *
 * 5. We iterate through frequencies in descending order.
 * - 5.1: Inside the inner loop, we iterate through each character (char) in the current bucket (`bucket[freq]`). Because we want sort the string in descending order based on the frequency.
 *
 * - 5.2: Instead of appending the character multiple times, char.repeat(`freq`) is used to create a string with the character repeated freq times (more efficient).The repeated character string is appended into the `sortedString` string.
 *
 * 6. We return the sorted string which is stored in the `sortedString` variable.
 *
 * Time complexity: O(n) + O(n) = O(2n) => O(n) where n is the length of the input string s.
 * - Iterating through the string once to count the character frequencies: O(n)
 * - Iterating through the bucket array to build the sorted string: O(n)
 *
 * Space complexity: O(n) - because we use a Map to store the character frequencies, a bucket array to store characters based on their frequency, and a string to store the final sorted string.
 */
const frequencySortBucketSort = (s) => {
  const frequencies = new Map();
  for (const char of s) {
    frequencies.set(char, (frequencies.get(char) || 0) + 1);
  }

  const bucket = Array.from({ length: s.length + 1 }, () => []);
  for (const [char, freq] of frequencies.entries()) {
    bucket[freq].push(char);
  }

  let sortedString = '';
  for (let freq = s.length; freq >= 0; freq--) {
    for (const char of bucket[freq]) {
      sortedString += char.repeat(freq);
    }
  }

  return sortedString;
};
