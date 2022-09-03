// --- Directions
// Check to see if two provided strings are anagrams of each other.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

/**
 * It takes a string and a boolean as arguments, and returns a sorted array of the string's characters
 * if the boolean is true, and an unsorted array of the string's characters if the boolean is false
 * @param string - The string to be cleaned.
 * @param isSort - boolean
 * @returns A function that takes a string and a boolean as arguments.
 */
const stringCleaner = (string, isSort) => {
  if (typeof isSort === 'boolean' && isSort) {
    return string.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
  }

  return string.replace(/[^\w]/g, '').toLowerCase().split('');
};

// Solution 1
/**
 * We check if the two strings are anagrams by comparing the characters of each string to see if they
 * are the same
 * @param stringA - 'rail safety'
 * @param stringB - "rail safety"
 * @returns a boolean value.
 */
const anagrams1 = (stringA, stringB) => {
  const arrayStringA = stringCleaner(stringA, false);
  const arrayStringB = stringCleaner(stringB, false);

  const isAnagramsA = arrayStringA.filter((str) => !arrayStringB.includes(str));
  const isAnagramsB = arrayStringB.filter((str) => !arrayStringA.includes(str));

  if (!isAnagramsA.length && !isAnagramsB.length) {
    return true;
  }

  return false;
};

// Solution 2
/**
 * It takes a string, converts it to lowercase, removes all non-alphanumeric characters, and returns an
 * object with the characters as keys and the number of times they appear as values
 * @param string - The string that we want to create a character map for.
 * @returns An object with the keys being the characters in the string and the values being the number
 * of times that character appears in the string.
 */
const charMapGenerator = (string) => {
  const stringMap = {};
  const arrayStr = string.toLowerCase().replace(/[^\w]/g, '');

  for (const str of arrayStr) {
    stringMap[str] = stringMap[str] + 1 || 1;
  }

  return stringMap;
};

/**
 * We create two character maps, one for each string, and then we compare the two character maps to see
 * if they are the same
 * @param stringA - The first string to compare
 * @param stringB - The second string to compare to the first string.
 * @returns A boolean value.
 */
const anagrams2 = (stringA, stringB) => {
  const charMapA = charMapGenerator(stringA);
  const charMapB = charMapGenerator(stringB);

  if (Object.keys(charMapA).length !== Object.keys(charMapB).length) {
    return false;
  }

  for (const char in charMapA) {
    if (charMapA[char] !== charMapB[char]) {
      return false;
    }
  }

  return true;
};

// Solution 3
/**
 * We clean the strings, then compare them
 * @param stringA - The first string to compare.
 * @param stringB - The string to compare against.
 * @returns A boolean value.
 */
const anagrams = (stringA, stringB) => {
  const cleanedStringA = stringCleaner(stringA, true);
  const cleanedStringB = stringCleaner(stringB, true);

  return cleanedStringA === cleanedStringB;
};

module.exports = anagrams;
