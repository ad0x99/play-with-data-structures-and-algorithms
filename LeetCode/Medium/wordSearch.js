/**
 * https://leetcode.com/problems/word-search/description/
 *
 * 1. The base case: we return if any of these conditions are met:
 * - Out of bounds (invalid cell): return false
 * - Character mismatch (current cell character doesn't match the word character): return false
 * - Word found (entire word has been matched): return true
 *
 * 2. Marking and Backtracking: To avoid revisiting the same cell, the current cell character is temporarily replaced with "#" (marked as visited). After exploring possibilities, the cell value is restored using backtracking.
 *
 * 3. Recursive Exploration: we use recursion to explore four directions (up, down, left, right) from the current cell.
 * - 3.1: For each direction, we call `dfs` with the updated coordinates and incremented currIndex to check if the remaining word can be formed from the next cell.
 * - 3.2: The || operator allows the function to return true as soon as the word is found in any direction (short-circuiting).
 *
 * 4. In the outer loop, we iterate through every cell in the grid using nested loops. If the current cell character matches the first character of the word (word[0]), we call `dfs` starting from that cell.
 *
 * 5. If the word is found in any cell using `dfs`, we return true. Otherwise, we return false.
 *
 * Time complexity: O(n * m * 4^k), where n is the number of rows in the board, m is the number of columns in the board, and k is the length of the word. This is because for each cell in the board, we are exploring 4 directions (up, down, left, right) recursively until we find the word or reach the end of the word.
 *
 * Space complexity: O(n) where n is the length of the word.
 *
 */
const exist = (board, word) => {
  const rows = board.length;
  const cols = board[0].length;

  const dfs = (row, col, index) => {
    // If word is found
    if (index === word.length) return true;

    // If row or col is out of bounds, or the current character is not matched
    const isOutOfBoundsOrCharacterMismatched =
      row < 0 ||
      row >= rows ||
      col < 0 ||
      col >= cols ||
      board[row][col] !== word[index];
    if (isOutOfBoundsOrCharacterMismatched) return false;

    // The cell is marked as visited by temporarily changing its value to "#".
    const temp = board[row][col];
    board[row][col] = '#';

    // Explore adjacent cells
    // Up: row - 1, Down: row + 1, Left: col - 1, Right: col + 1
    const found =
      dfs(row - 1, col, index + 1) ||
      dfs(row + 1, col, index + 1) ||
      dfs(row, col - 1, index + 1) ||
      dfs(row, col + 1, index + 1);

    board[row][col] = temp; // Reset cell

    return found;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === word[0] && dfs(row, col, 0)) {
        return true;
      }
    }
  }

  return false;
};
