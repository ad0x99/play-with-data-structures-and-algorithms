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
use std::collections::HashSet;
use std::collections::VecDeque;

impl Solution {
    pub fn num_islands(grid: Vec<Vec<char>>) -> i32 {
        let directions = vec![(-1, 0), (1, 0), (0, -1), (0, 1)];

        let mut visited = HashSet::new();
        let mut number_of_islands = 0;
        let rows = grid.len();
        let cols = grid[0].len();

        let bfs = |start_row: usize,
                   start_col: usize,
                   grid: &Vec<Vec<char>>,
                   visited: &mut HashSet<(usize, usize)>| {
            let mut queue = VecDeque::new();
            queue.push_back((start_row, start_col));

            while let Some((row, col)) = queue.pop_front() {
                // Check all 4 possible directions
                for (row_offset, col_offset) in &directions {
                    let new_row = row as isize + row_offset;
                    let new_col = col as isize + col_offset;
                    // Check if the new cell is within the grid bounds
                    let is_cell_within_grid_bounds = new_row >= 0
                        && new_row < rows as isize
                        && new_col >= 0
                        && new_col < cols as isize;

                    // If the cell is within bounds, not visited, and is land ('1')
                    if is_cell_within_grid_bounds {
                        let (new_row, new_col) = (new_row as usize, new_col as usize);

                        if !visited.contains(&(new_row, new_col)) && grid[new_row][new_col] == '1' {
                            // Mark the cell as visited
                            visited.insert((new_row, new_col));

                            // Enqueue the cell for further exploration
                            queue.push_back((new_row, new_col));
                        }
                    }
                }
            }
        };

        // Iterate over each cell in the grid
        for row in 0..rows {
            for col in 0..cols {
                // If the cell is not visited and is land ('1'), start a BFS
                if !visited.contains(&(row, col)) && grid[row][col] == '1' {
                    // Increment the number of islands
                    number_of_islands += 1;

                    // Perform BFS to visit all cells in this island
                    visited.insert((row, col));
                    bfs(row, col, &grid, &mut visited);
                }
            }
        }

        number_of_islands
    }
}
