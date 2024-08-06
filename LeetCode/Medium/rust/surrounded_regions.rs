/**
 * https://leetcode.com/problems/surrounded-regions/
 *
 * Breadth-First Search (BFS) Approach
 *
 * Idea: We will find all the 'O's on the border and mark them as can not be captured, and traversal all the others cell and flip them to the correct 'X'.
 *
 * 1. Identify Border 'O's: Any 'O' on the border cannot be captured. Also, any 'O' connected to a border 'O' cannot be captured.
 *
 * 2. Mark Connected 'O's: Use BFS to mark all 'O's connected to the border as non-capturable by temporarily changing their value to a different character, like 'Y'.
 *
 * 3. Flip Captured 'O's: Iterate over the board and flip all 'O's to 'X' (since these are surrounded). Change all 'Y's back to 'O'.
 *
 * Implementation
 *
 * 1. We create an directions array to store the possible moves (up, down, left, right) from a cell.
 *
 * 2. We perform a breadth-first search starting from a specific cell (row, col). Inside the BFS:
 * - 2.1: We initialize a queue with the starting cell and mark this cell as 'Y' on the board to indicate that it should not be flipped.
 *
 * - 2.2: As long as the queue is not empty, we keep iterating.
 *
 * - 2.3: In each iteration, we dequeue the front cell from the queue., representing the current cell to be processed.
 *
 * - 2.4: Exploring Adjacent Cells: We then iterate over all possible directions from the current cell.
 *
 * - 2.5: For each direction, we calculate the new cell coordinates (newRow, newCol), and check if the new cell is within the bounds of the board.
 *
 * - 2.6: If the new cell is within bounds and is an 'O', we mark the cell as 'Y' and add it to the queue for further processing.
 *
 * 3. Border Traversal: We iterate over all the border cells of the board. For each border cell that is an 'O', we initiate a BFS to mark all 'O's connected to the current border cell as 'Y' to indicate they are not surrounded.
 *
 * 4. Flipping Cells: After marking all border-connected 'O's, we iterate over the entire board.
 * - 4.1: We flip all remaining 'O's to 'X' (indicating they are surrounded).
 *
 * - 4.2: And then, we revert all 'Y's back to 'O' (indicating they are not surrounded and should remain as 'O').
 *
 * Time complexity: O(m * n) where m is the number of rows and n is the number of columns.
 *
 * Space complexity: O(m * n) due to the additional space used by the queue and marking.
 */
impl Solution {
    pub fn solve(board: &mut Vec<Vec<char>>) {
        let directions = vec![(-1, 0), (1, 0), (0, -1), (0, 1)];
        let rows = board.len();
        let cols = if rows > 0 { board[0].len() } else { 0 };

        let bfs = |board: &mut Vec<Vec<char>>, row: usize, col: usize| {
            let mut queue = std::collections::VecDeque::new();
            queue.push_back((row, col));
            board[row][col] = 'Y'; // Temporarily mark as 'Y' to indicate it shouldn't be flipped

            while let Some((current_row, current_col)) = queue.pop_front() {
                for (row_offset, col_offset) in &directions {
                    let new_row = (current_row as isize + row_offset) as usize;
                    let new_col = (current_col as isize + col_offset) as usize;

                    if new_row < rows && new_col < cols && board[new_row][new_col] == 'O' {
                        board[new_row][new_col] = 'Y';
                        queue.push_back((new_row, new_col));
                    }
                }
            }
        };

        // Step 1: Mark all 'O's on the border and connected to the border
        // Iterate from the first row (row = 0) to the last row (row < rows).
        // For each row, check the cell in the first column (board[row][0]) and the last column (board[row][cols - 1]).
        // If a cell in the first or last column is an 'O', we call the bfs function starting from that cell to mark all 'O's connected to the current border cell as 'Y' to indicate they are not surrounded.
        for row in 0..rows {
            if board[row][0] == 'O' {
                bfs(board, row, 0);
            }
            if board[row][cols - 1] == 'O' {
                bfs(board, row, cols - 1);
            }
        }

        // Iterate from the first column (col = 0) to the last column (col < cols).
        // For each column, the loop checks the cell in the first row (board[0][col]) and the last row (board[rows - 1][col]).
        // If a cell in the first or last row is an 'O', we call the bfs function starting from that cell to mark all 'O's connected to the current border cell as 'Y' to indicate they are not surrounded.
        for col in 0..cols {
            if board[0][col] == 'O' {
                bfs(board, 0, col);
            }
            if board[rows - 1][col] == 'O' {
                bfs(board, rows - 1, col);
            }
        }

        // Step 2: Flip all 'O's to 'X' and 'Y's back to 'O'
        for row in 0..rows {
            for col in 0..cols {
                if board[row][col] == 'O' {
                    board[row][col] = 'X';
                } else if board[row][col] == 'Y' {
                    board[row][col] = 'O';
                }
            }
        }
    }
}

/**
 * Depth-First Search (DFS) Approach
 *
 * The idea is the same as BFS approach.
 *
 * Instead of using BFS to traverse the board, we use DFS traversal.
 *
 * Time complexity: O(m * n) where m is the number of rows and n is the number of columns.
 *
 * Space complexity: O(m * n) due to the recursive call stack.
 */
impl Solution {
    pub fn solve(board: &mut Vec<Vec<char>>) {
        let directions = vec![(-1, 0), (1, 0), (0, -1), (0, 1)];
        let rows = board.len();
        let cols = if rows > 0 { board[0].len() } else { 0 };

        fn dfs(
            board: &mut Vec<Vec<char>>,
            row: isize,
            col: isize,
            directions: &Vec<(isize, isize)>,
            rows: usize,
            cols: usize,
        ) {
            let is_cell_out_of_board_bounds =
                row < 0 || row >= rows as isize || col < 0 || col >= cols as isize;
            if is_cell_out_of_board_bounds || board[row as usize][col as usize] != 'O' {
                return;
            }

            board[row as usize][col as usize] = 'Y'; // Temporarily mark as 'Y' to indicate it shouldn't be flipped

            for &(row_offset, col_offset) in directions.iter() {
                dfs(
                    board,
                    row + row_offset,
                    col + col_offset,
                    directions,
                    rows,
                    cols,
                );
            }
        }

        // Step 1: Mark all 'O's on the border and connected to the border
        // Iterate from the first row (row = 0) to the last row (row < rows).
        // For each row, check the cell in the first column (board[row][0]) and the last column (board[row][cols - 1]).
        // If a cell in the first or last column is an 'O', we call the bfs function starting from that cell to mark all 'O's connected to the current border cell as 'Y' to indicate they are not surrounded.
        for row in 0..rows {
            if board[row][0] == 'O' {
                dfs(board, row as isize, 0, &directions, rows, cols);
            }
            if board[row][cols - 1] == 'O' {
                dfs(
                    board,
                    row as isize,
                    (cols - 1) as isize,
                    &directions,
                    rows,
                    cols,
                );
            }
        }

        // Iterate from the first column (col = 0) to the last column (col < cols).
        // For each column, the loop checks the cell in the first row (board[0][col]) and the last row (board[rows - 1][col]).
        // If a cell in the first or last row is an 'O', we call the bfs function starting from that cell to mark all 'O's connected to the current border cell as 'Y' to indicate they are not surrounded.
        for col in 0..cols {
            if board[0][col] == 'O' {
                dfs(board, 0, col as isize, &directions, rows, cols);
            }
            if board[rows - 1][col] == 'O' {
                dfs(
                    board,
                    (rows - 1) as isize,
                    col as isize,
                    &directions,
                    rows,
                    cols,
                );
            }
        }

        // Step 2: Flip all 'O's to 'X' and 'Y's back to 'O'
        for row in 0..rows {
            for col in 0..cols {
                if board[row][col] == 'O' {
                    board[row][col] = 'X';
                } else if board[row][col] == 'Y' {
                    board[row][col] = 'O';
                }
            }
        }
    }
}
