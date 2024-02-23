/**
 * Pseudocode for search string
 * 1. Loop over the longer string
 * 2. Loop over the shorter string
 * 3. If the chars don't match, break out of the inner loop, if the chars do match, keep going
 * 4. If you complete the inner loop and find a match, then increment the count of matches
 * 5. Return the count
 */

/**
 * The function searches for occurrences of a shorter string within a longer string and returns the
 * count of matches.
 * @param longStr - a string that we want to search for occurrences of another string within it.
 * @param shortString - The `shortString` parameter is a string that we want to search for within a
 * longer string (`longStr`). The function `naiveSearchString` counts the number of times the
 * `shortString` appears in the `longStr`.
 * @returns The function `naiveSearchString` returns the count of matches of the `shortString` in the
 * `longStr`.
 */
const naiveSearchString = (longStr, shortString) => {
  let count = 0;

  /* It is looping over the longer string
 (`longStr`) and for each character in the longer string, it is looping over the shorter string
 (`shortString`). It is checking if the characters in the shorter string match the characters in the
 longer string starting from the current index of the outer loop (`i`). If the characters don't
 match, it breaks out of the inner loop and moves on to the next character in the outer loop. If the
 inner loop completes and finds a match, it increments the count of matches. Finally, it returns the
 count of matches. */
  for (let i = 0; i < longStr.length; i++) {
    for (let j = 0; j < shortString.length; j++) {
      if (longStr[i + j] !== shortString[j]) {
        break;
      }

      if (j === shortString.length - 1) {
        count++;
      }
    }
  }

  return count;
};

console.log(naiveSearchString('lorie loled', 'lol'));
