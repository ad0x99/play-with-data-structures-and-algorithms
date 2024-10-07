/**
 * https://leetcode.com/problems/remove-invalid-parentheses/
 * https://www.youtube.com/watch?v=wtoNj0d-OEI
 *
 * Recursion with Depth-first Search & Backtracking Approach
 *
 * 1. We initialize the following variables:
 * - 1.1: The `longestString` variable to -1 and will store the length of the longest valid string found so far.
 * - 1.2: The `result` Set object is used to store the unique valid strings found during the search. Using a Set ensures we don't add duplicate strings.
 * - 1.3: The `currentSolution` array will hold the current combination of parentheses (including letters) being explored during the search.
 * - 1.4: The `openingCount` variable keeps track of the number of opening parentheses (() encountered so far.
 * - 1.5: The `closingCount` variable keeps track of the number of closing parentheses ()) encountered so far.
 *
 * 2. The base case:
 * - 2.1: If `currentIdx` reaches the end of the string, it means we've processed all characters.
 * - 2.2: Inside the base case, if we found potentially valid parentheses combination.
 * - 2.3: And if we found a new longest valid string, then we update `longestString` with the new length, clear the result set to remove previous entries (we only want the longest valid strings for a given length), and we add the current valid string to the result set.
 * - 2.4: Otherwise, if the current valid string has the same length as the longest found so far, simply add it to the result set (we might have multiple longest strings).
 *
 * 3. Recursive Exploration: There are 3 scenarios where the current string is an opening or closing parenthesis, and a letter.
 *
 * 4. If the current character is an opening parenthesis:
 * - 4.1: We add the opening parenthesis to the currentSolution.
 * - 4.2: We make a recursive call to dfs with increased currentIdx to move to the next character, updated currentSolution with the added opening parenthesis, incremented openingCount, and unchanged closingCount.
 * - 4.3: After the recursive call, we remove the opening parenthesis from currentSolution (backtracking).
 * - 4.4: This explores the possibility of including the opening parenthesis in the valid combination.
 *
 * 5. If the current character is a closing parenthesis, there are two sub-cases to consider here are to skip or include the closing parenthesis.
 *
 * 6. If we choose to skip the closing parenthesis.
 * - 6.1: We make a recursive call to dfs with, increased currentIdx, unchanged currentSolution, unchanged openingCount, and unchanged closingCount.
 * - 6.2: This explores the possibility of excluding the closing parenthesis from the valid combination.
 *
 * 7. If we choose to include the closing parenthesis only if openingCount > closingCount. This check ensures we only include closing parentheses if there are enough opening parentheses before it. Otherwise, it wouldn't be a valid combination.
 * - 7.1: We add the closing parenthesis to currentSolution
 * - 7.2: We make a recursive call to dfs with increased currentIdx, updated currentSolution with the added closing parenthesis, unchanged openingCount, and incremented closingCount.
 * - 7.3: After the recursive call, we remove the closing parenthesis from currentSolution (backtracking).
 * - 7.4: This explores the possibility of including the closing parenthesis in the valid combination, but only if it's a valid placement.
 *
 * 8. If the current character is a letter:
 * - 8.1. We simply add the letter to the currentSolution and make a recursive call to dfs with all parameters unchanged.
 * - 8.2: After the recursive call, remove the letter from currentSolution (backtracking).
 * - 8.3: This includes the letter in the current combination and continues exploring
 *
 * Time complexity: O(2 ^ n) - where n is the length of the input string. This is because in the worst case scenario, we are exploring all possible combinations of removing parentheses from the input string.
 *
 * Space complexity: O(n)
 */
const removeInvalidParentheses = (s) => {
  let longestString = -1;
  let result = new Set();
  let currentSolution = [];
  let openingCount = 0;
  let closingCount = 0;

  const dfs = (
    string,
    currentIdx,
    currentSolution,
    openingCount,
    closingCount
  ) => {
    // Base case
    // If we iterate through all possible combinations
    if (currentIdx >= string.length) {
      // If we found a valid parentheses
      if (openingCount === closingCount) {
        // We want to get the minium way to get the longest possible string
        // If we found a new valid parentheses that is longer than the previous one
        if (currentSolution.length > longestString) {
          // We update the longest possible string
          longestString = currentSolution.length;

          // Reset the result to remove the previous result
          result = new Set();
          // Add the new valid parentheses to the result Set
          result.add(currentSolution.join(''));
        } else if (currentSolution.length === longestString) {
          // Otherwise, if the new valid parentheses is not longer than the previous one
          // We just add the new valid parentheses to result Set
          result.add(currentSolution.join(''));
        }
      }
    } else {
      // Get the current string (parentheses or letter)
      let currentString = string.charAt(currentIdx);

      // If the current string is a opening parenthesis
      if (currentString === '(') {
        // In case we take the current opening parenthesis
        currentSolution.push(currentString);
        dfs(
          string,
          currentIdx + 1,
          currentSolution,
          openingCount + 1,
          closingCount
        );
        currentSolution.pop();

        // In case we don't take the current opening parenthesis
        dfs(
          string,
          currentIdx + 1,
          currentSolution,
          openingCount,
          closingCount
        );
      } else if (currentString === ')') {
        // If the current character is a closing parenthesis
        // In case we don't take the current closing parenthesis
        dfs(
          string,
          currentIdx + 1,
          currentSolution,
          openingCount,
          closingCount
        );

        // In case we can't take the current closing parenthesis
        // Because the number of opening and closing parentheses should be the same to form a valid parentheses
        // In case, the closing parenthesis is greater than all the previous opening parenthesis, there is no way to form a valid parentheses anymore.
        if (openingCount > closingCount) {
          currentSolution.push(currentString);
          dfs(
            string,
            currentIdx + 1,
            currentSolution,
            openingCount,
            closingCount + 1
          );
          currentSolution.pop();
        }
      } else {
        // If the current character is a letter
        // We don't do anything, just add it to the current solution
        currentSolution.push(currentString);
        dfs(
          string,
          currentIdx + 1,
          currentSolution,
          openingCount,
          closingCount
        );
        currentSolution.pop();
      }
    }
  };

  dfs(s, 0, currentSolution, openingCount, closingCount);
  return Array.from(result);
};

/**
 * Recursion with Breadth-first Search & Backtracking Approach
 *
 * 1. We initialize a `result` Set object to store the unique valid strings found during the search. Using a Set ensures we don't add duplicate strings, a queue to store strings that will be explored in a Breadth-First Search (BFS) manner,and a found boolean flag to track if a valid string has been found in the current level of BFS exploration.
 *
 * 2. As long as there is element in the queue, we continue the loop
 *
 * 3. Inside the loop:
 * - 3.1: We initialize `numberOfString` variable to store the number of strings in the current level (number of elements in the queue at the beginning of the loop).
 * - 3.2: We initialize `seen` as a new Set object for each level to keep track of strings already explored within that level. This avoids revisiting the same string with a single character removed multiple times in the same level.
 *
 * 4. Exploring Strings in a Level: We iterate through each string (currentString) in the current level.
 * - 4.1: The first string in the queue is removed.
 * - 4.2: We check if the current string is valid (if the string has balanced parentheses), we add it to the result set and set found to true to indicate a valid string was found in this level.
 * - 4.3: If found is true, we can skip the rest of the exploration for this level (optimization) because we're only interested in finding the shortest valid strings.
 *
 * 5. Generating and Adding New Strings: We iterate through each character (j) in the currentString.
 * - 5.1: We will skip characters that are not opening or closing parentheses.
 * - 5.2: We create a new string (nextString) by removing the character at index j from currentString.
 * - 5.2: If the new string (nextString) hasn't been explored in the current level, we add the new string to the `seen` set to mark it as explored in this level and to the queue for exploration in the next level.
 *
 * 6. If found becomes true after processing a level, we break the loop. This is because we're only interested in the shortest valid strings, and finding one in a level guarantees no shorter strings will be found in later levels.
 *
 * 7. After the BFS exploration finishes, we convert the result set (containing unique valid strings) to an array and return it.
 *
 * Time complexity: O(2^n), where n is the length of the input `string`. This is because in the worst case scenario, we are exploring all possible combinations of removing parentheses from the input string.
 *
 * Space complexity: O(2^n) because in the worst case scenario, the `queue` can contain all possible combinations of the input string after removing parentheses.
 *
 */
const removeInvalidParentheses = (s) => {
  let result = new Set();
  let queue = [s];
  let found = false;

  while (queue.length) {
    let numberOfString = queue.length;
    let seen = new Set();

    for (let i = 0; i < numberOfString; i++) {
      let currentString = queue.shift();

      if (isValid(currentString)) {
        result.add(currentString);
        found = true;
      }

      if (found) continue;

      for (let j = 0; j < currentString.length; j++) {
        if (currentString[j] !== '(' && currentString[j] !== ')') continue;

        let nextString = currentString.slice(0, j) + currentString.slice(j + 1);

        if (!seen.has(nextString)) {
          seen.add(nextString);
          queue.push(nextString);
        }
      }
    }

    if (found) break;
  }

  return Array.from(result);
};

const isValid = (s) => {
  let balance = 0;

  for (let char of s) {
    if (char === '(') balance++;
    if (char === ')') balance--;
    if (balance < 0) return false;
  }

  return balance === 0;
};
