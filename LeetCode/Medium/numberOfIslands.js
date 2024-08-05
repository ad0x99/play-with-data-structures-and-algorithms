/**
 * https://leetcode.com/problems/number-of-islands/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: An island is defined as a group of connected '1's  surrounded by '0's (horizontally or vertically)
 *
 * We want to find all the unconnected '1' cells in the grid, which represent potential new islands.
 *
 * For every cell in the grid, if the cell has not been visited yet, then we do:
 * - Increase the number of connected component by 1
 * - All connected '1' cells belonging to the same island are marked as visited
 *
 * Each traversal, we will explore as much connected '1' cells as possible, therefore, when we found a new cell that contains a '1' and has not been visited yet, it indicates the start of a new island
 *
 * Implementation
 *
 * 1. We create an directions array to store the possible moves (up, down, left, right) from a cell.
 *
 * 2. We create a visited set to keep track of visited cells, and a numberOfIslands counter to keep track of the number of islands found.
 *
 * 3. Inside the BFS function
 * - 3.1: We create a queue with with the starting cell coordinates.
 *
 * - 3.2: While the queue is not empty, we dequeue the front cell from the queue.
 *
 * - 3.3: We iterate through directions array to explore all neighboring cells.
 *
 * - 3.4. If a neighbor is within the grid bounds, not visited, and is also '1' (a land), we add it to the queue and mark it as visited.
 *
 * 4. We iterate through each cell in the grid.
 * - 4.1: If a cell is '1' and hasn't been visited yet, it means a new island has been found, We increment the numberOfIslands count by 1.
 *
 * - 4.2: After that, we perform the BFS to explore all connected '1' (land) cells belonging to the the current island and mark all connected '1' cells as visited.
 *
 * 5. Finally, we return the total number of islands found.
 *
 *
 * Time complexity: O(m * n), where m and n are the dimensions of the grid. In this case, m is the number of rows and n is the number of columns
 *
 * Space complexity: O(m * n), where m and n are the dimensions of the grid. In this case, m is the number of rows and n is the number of columns
 *
 */
const numIslands = (grid) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = new Set();
  let numberOfIslands = 0;

  const bfs = (row, col) => {
    const queue = [[row, col]];

    while (queue.length) {
      {
        const [row, col] = queue.shift();

        // Check all 4 possible directions
        for (const [rowOffset, colOffset] of directions) {
          const newRow = rowOffset + row;
          const newCol = colOffset + col;
          // Check if the new cell is within the grid bounds
          const isCellWithinGridBounds =
            newRow >= 0 &&
            newRow < grid.length &&
            newCol >= 0 &&
            newCol < grid[0].length;

          // If the cell is within bounds, not visited, and is land ('1')
          if (
            isCellWithinGridBounds &&
            !visited.has(`${newRow},${newCol}`) &&
            grid[newRow][newCol] === '1'
          ) {
            // Mark the cell as visited
            visited.add(`${newRow},${newCol}`);

            // Enqueue the cell for further exploration
            queue.push([newRow, newCol]);
          }
        }
      }
    }
  };

  // Iterate over each cell in the grid
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // If the cell is not visited and is land ('1'), start a BFS
      if (!visited.has(`${row},${col}`) && grid[row][col] === '1') {
        // Increment the number of islands
        numberOfIslands += 1;

        // Perform BFS to visit all cells in this island
        bfs(row, col);
      }
    }
  }

  return numberOfIslands;
};

/**
 * The same approach as previous solution, but instead of using a set to keep track visited nodes,
 * we can re-use the grid itself.
 *
 * Every time we traverse a cell, we mark it as visited but update the value at that cell to be "0"
 */
const numIslands = (grid) => {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let ans = 0;

  const bfs = (row, col) => {
    const queue = [[row, col]];

    while (queue.length) {
      const [row, col] = queue.shift();

      for (const [rowOffset, colOffset] of directions) {
        const newRow = row + rowOffset;
        const newCol = col + colOffset;
        const isCellWithinGridBounds =
          newRow >= 0 &&
          newRow < grid.length &&
          newCol >= 0 &&
          newCol < grid[0].length;

        if (isCellWithinGridBounds && grid[newRow][newCol] === '1') {
          grid[newRow][newCol] = '0'; // Mark the cell as visited
          queue.push([newRow, newCol]);
        }
      }
    }
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === '1') {
        ans++;
        bfs(row, col);
      }
    }
  }

  return ans;
};
