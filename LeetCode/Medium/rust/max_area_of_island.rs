/**
 * https://leetcode.com/problems/max-area-of-island/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: An island is made up of connected land cells (represented by 1s) connected 4-directionally (up, down, left, right). We want to find the size of the largest island in the grid.
 *
 * We want to explore all the directions of a cell and calculate the maximum area that a land could be reached.
 *
 * 1. Count the size of island: We will explore all cells connected to the current cell, and count the number of lands in the current island.
 *
 * 2. Keep track max area of island: After processing each island, we compare its area with the maximum area found so far. Update the maximum if the current island’s area is larger.
 *
 * Implementation
 *
 * 1. We create an directions array to store the possible moves (up, down, left, right) from a cell.
 *
 * 2. We create a maxAreaOfIsland variable to keep track of the maximum area of an island found.
 *
 * 3. The BFS function:
 * - 3.1: We initialize a queue with the starting cell and mark the current cell as 0 on the grid to indicate that it has been visited.
 *
 * - 3.2: We create a area to keep track the current island's max areas.
 *
 * - 3.3: As long as the queue is not empty, we keep iterating.
 *
 * - 3.4: In each iteration, we dequeue the front cell from the queue representing the current cell to be processed, and increment the area count each time we visit a land.
 *
 * - 3.5: Exploring Adjacent Cells: We then iterate over all possible directions from the current cell.
 *
 * - 3.6: For each direction, we calculate the new cell coordinates (newRow, newCol), and check if the new cell is within the bounds of the grid, and If the new cell is a land.
 *
 * - 3.7: If both conditions met, we mark it as visited, add it to the queue for further exploration.
 *
 * - 3.8: After exploring all connected land cells (part of the same island), we return the area of the current island.
 *
 * 4. In the main logic, we iterate through each cell of the grid.
 * - 4.1: If the cell is a land, we call the BFS to visit all its surrounding cells.
 *
 * - 4.2: After exploring the surrounding lands of the current cell, we get the maximum area of the current island, we then compare that area with the max area has been found so far and update maxAreaOfIsland with the maximum area found.
 *
 * Time complexity:  O(m * n), where m is the number of rows and n is the number of columns in the grid.
 *
 * Space complexity: O(m * n), which is the maximum size of the queue.
 */
use std::collections::VecDeque;

impl Solution {
    pub fn max_area_of_island(mut grid: Vec<Vec<i32>>) -> i32 {
        let directions = vec![(-1, 0), (0, -1), (1, 0), (0, 1)];
        let rows = grid.len();
        let cols = grid[0].len();
        let mut max_area_of_island = 0;

        let bfs = |grid: &mut Vec<Vec<i32>>, start_row: usize, start_col: usize| -> i32 {
            let mut queue = VecDeque::new();
            queue.push_back((start_row, start_col));

            // Mark as visited
            grid[start_row][start_col] = 0;

            // Keep track of the current island's area
            let mut area = 0;

            while let Some((row, col)) = queue.pop_front() {
                // Increment the area count each time we find a land cell
                area += 1;

                // Explore all connected land cells
                for &(row_offset, col_offset) in &directions {
                    let new_row = row as isize + row_offset;
                    let new_col = col as isize + col_offset;

                    // If the new cell is within grid bounds and is a land cell,
                    // mark it as visited, add it to the queue
                    if new_row >= 0
                        && new_row < rows as isize
                        && new_col >= 0
                        && new_col < cols as isize
                    {
                        let new_row = new_row as usize;
                        let new_col = new_col as usize;

                        if grid[new_row][new_col] == 1 {
                            grid[new_row][new_col] = 0; // Mark as visited
                            queue.push_back((new_row, new_col));
                        }
                    }
                }
            }

            area
        };

        // Iterate over each cell in the grid
        for row in 0..rows {
            for col in 0..cols {
                if grid[row][col] == 1 {
                    let current_area = bfs(&mut grid, row, col);
                    max_area_of_island = max_area_of_island.max(current_area);
                }
            }
        }

        max_area_of_island
    }
}

/**
 * Depth-First Search (DFS) Approach
 *
 * The idea is the same as BFS approach.
 *
 * Instead of using BFS to traverse the board, we use DFS traversal.
 *
 * Time complexity: O(m * n), where m is the number of rows and n is the number of columns.
 *
 * Space complexity: O(m * n), due to the call stack if the entire grid is filled with land.
 */
impl Solution {
    pub fn max_area_of_island(mut grid: Vec<Vec<i32>>) -> i32 {
        let directions = vec![(-1, 0), (0, -1), (1, 0), (0, 1)];
        let rows = grid.len();
        let cols = grid[0].len();
        let mut max_area_of_island = 0;

        fn dfs(
            grid: &mut Vec<Vec<i32>>,
            row: isize,
            col: isize,
            rows: usize,
            cols: usize,
            directions: &[(isize, isize)],
        ) -> i32 {
            // If the new cell is out of grid bounds, return 0
            if row < 0
                || row >= rows as isize
                || col < 0
                || col >= cols as isize
                || grid[row as usize][col as usize] == 0
            {
                return 0;
            }

            // Mark as visited
            grid[row as usize][col as usize] = 0;

            // Start with area 1
            let mut area = 1;

            // Explore all connected land cells
            for &(row_offset, col_offset) in directions {
                area += dfs(
                    grid,
                    row + row_offset,
                    col + col_offset,
                    rows,
                    cols,
                    directions,
                );
            }

            area
        }

        // Iterate each row and col of the grid
        for row in 0..rows {
            for col in 0..cols {
                // If the current cell is a land
                if grid[row][col] == 1 {
                    let current_area = dfs(
                        &mut grid,
                        row as isize,
                        col as isize,
                        rows,
                        cols,
                        &directions,
                    );
                    max_area_of_island = max_area_of_island.max(current_area);
                }
            }
        }

        max_area_of_island
    }
}
