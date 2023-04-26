/**
 * Given 2 strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another
 */

/**
 * The function sorts a given string by removing non-alphanumeric characters, converting to lowercase,
 * sorting the characters, and joining them back into a string.
 * @param str - The parameter `str` is a string that will be sorted by removing all non-alphanumeric
 * characters, converting all characters to lowercase, sorting the resulting characters in alphabetical
 * order, and then joining them back into a string.
 * @returns The function `sortString` is returning a sorted string with all non-alphanumeric characters
 * removed and all letters converted to lowercase.
 */
const sortString = (str) => {
  return str.replace(/[^\w]/g, '').toLowerCase().split('').sort().join('');
};

/**
 * Solution 1
 * The function checks if two strings are valid anagrams by sorting and comparing them.
 * @param firstStr - The first string to be compared in the anagram check.
 * @param secondStr - The second string that will be compared to the first string to check if they are
 * anagrams.
 * @returns The function `validAnagram` is returning a boolean value indicating whether the two input
 * strings are anagrams of each other or not. If the strings are anagrams, it will return `true`,
 * otherwise it will return `false`.
 */

const validAnagram1 = (firstStr, secondStr) => {
  const cleanedFirstStr = sortString(firstStr);
  const cleanedSecondStr = sortString(secondStr);

  return cleanedFirstStr === cleanedSecondStr;
};

console.log(validAnagram1('', '')); // true
console.log(validAnagram1('aaz', 'zza')); // false
console.log(validAnagram1('anagram', 'nagaram')); // true
console.log(validAnagram1('rat', 'car')); // false) // false
console.log(validAnagram1('awesome', 'awesom')); // false
console.log(validAnagram1('amanaplanacanalpanama', 'acanalmanplanpamana')); // false
console.log(validAnagram1('qwerty', 'qeywrt')); // true
console.log(validAnagram1('texttwisttime', 'timetwisttext')); // true

/**
 * Solution 2
 * The function checks if two strings are valid anagrams by comparing their lengths and using a lookup
 * object to count the frequency of each letter.
 * @param firstStr - The first string to compare in the anagram check.
 * @param secondStr - The second parameter `secondStr` is not provided in the code snippet. It seems to
 * be missing or incomplete.
 * @returns a boolean value indicating whether the two input strings are valid anagrams or not.
 */
function validAnagram2(firstStr, secondStr) {
  if (firstStr.length !== secondStr.length) {
    return false;
  }

  const lookup = {};

  for (let i = 0; i < firstStr.length; i++) {
    let letter = firstStr[i];
    // if letter exists, increment, otherwise set to 1
    lookup[letter] ? (lookup[letter] += 1) : (lookup[letter] = 1);
  }
  console.log(lookup);

  for (let i = 0; i < secondStr.length; i++) {
    let letter = secondStr[i];
    // can't find letter or letter is zero then it's not an anagram
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }

  return true;
}

// {a: 0, n: 0, g: 0, r: 0, m: 0,s:1}
console.log(validAnagram2('', '')); // true
console.log(validAnagram2('aaz', 'zza')); // false
console.log(validAnagram2('anagram', 'nagaram')); // true
console.log(validAnagram2('rat', 'car')); // false) // false
console.log(validAnagram2('awesome', 'awesom')); // false
console.log(validAnagram2('amanaplanacanalpanama', 'acanalmanplanpamana')); // false
console.log(validAnagram2('qwerty', 'qeywrt')); // true
console.log(validAnagram2('texttwisttime', 'timetwisttext')); // true
