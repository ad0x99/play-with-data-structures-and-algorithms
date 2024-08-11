/**
 * https://leetcode.com/problems/number-of-islands-ii/
 * https://leetcode.ca/all/305.html
 *
 * Union-Find Approach
 *
 * Idea: We assume each land (`1`) in the grid as a vertex in a graph, where an edge between vertices exists if they all lands, and connect to each other in `4` directions. We will use union-find to build the graph which represents an island.
 *
 * We will form a graph to represent an island by iterating through each cell in the grid, and connect neighbor lands into the same graph. Therefore, the number of graphs are the number of islands.
 *
 * A grid is a 2D structure, but we want to keep track the graph in 1D structure. Therefore, we will hash each cell in the 2D grid to be a unique index using formula `row * n + col`. Each unique index will represent a cell in the 2D grid.
 *
 * Implementation
 *
 * 1. The UnionFindGraph contains 2 methods:
 * - 1.1: The `find` method: This method finds the root of the set to which vertex belongs. It uses path compression to optimize future lookups by directly linking nodes to their root. That means, every time we traverse through a vertex, we assign the root of all vertices in the same path from vertex to root to be the same root.
 *
 * - 1.2: The `union` method: This method connects two nodes (u and v) by setting the parent of u to v, effectively merging the two sets.
 *
 * 2. In the numIslands2 function, we initialize UnionFindGraph to store the parent of each cell in the grid.
 *
 * 3. We build a grid of m * n, and create an directions array to store the possible moves (up, down, left, right) from a cell.
 *
 * 4. We create an result array to keep track the number of islands at each time we add a new land, and the count variable to count the number of islands.
 *
 * 5. We traverse through each positions in the positions array to add the new land.
 *
 * 6. Edge case: If the current cell is already part of an island, we update result as the island doesn't change, and skip the current cell.
 *
 * 7. We mark the current cell to be a land (1), and calculate hashed index of the current cell.
 *
 * 8. We traverse through 4 directions of current cell to connect the current cell to its neighbors.
 * - 8.1: From the current cell, we calculate the neighbor of the current cell. If the neighbor is within the grid bounds, and is also '1' (a land), we hash the index of the neighbor cell.
 *
 * - 8.2: After that, we find the root node of both current cell and its neighbor.
 *
 * - 8.3: If the roots are different, the two cells are merged to form a new connected component, and the island count is decremented since two islands have merged into one.
 *
 * 9. After traversing through the current position, we update the current island count to the result array.
 *
 * 10. After processing all positions, we return the result array, containing the number of islands after each addition of land.
 *
 * Time complexity: O(m * n), where m is the number of rows, n is the number of cols.
 * - find: O(m * n)
 * - union: O(1)
 * - directions: O(4)
 * - positions: O(n)
 *
 * Space complexity: O(m * n), where m is the number of rows, n is the number of cols.
 * - grid, parent: O(m * n)
 */
class UnionFindGraph {
  constructor(m, n) {
    this.parent = new Array(m * n).fill(-1);
  }

  find(vertex) {
    let root = vertex;
    // Find root
    while (this.parent[root] !== -1) {
      root = this.parent[root];
    }

    // Optimize
    while (vertex !== root) {
      const parent = this.parent[vertex];
      this.parent[vertex] = root;
      vertex = parent;
    }

    return root;
  }

  // Connect 2 vertices
  union(u, v) {
    this.parent[u] = v;
  }
}

const numIslands2 = (m, n, positions) => {
  const graph = new UnionFindGraph(m, n);
  const grid = Array.from({ length: m }, () => new Array(n).fill(0));
  const directions = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const result = [];
  let count = 0;

  for (const [row, col] of positions) {
    if (grid[row][col] === 1) {
      result.push(count);
      continue;
    }

    // Mark the current cell as land
    grid[row][col] = 1;

    // Calculate the hashed index of the current cell
    const mappedIndexOfCurrentCell = row * n + col;
    count++;

    // Traverse through 4 directions of current cell to connect the current cell to its neighbors
    for (const [rowOffset, colOffset] of directions) {
      const newRow = rowOffset + row;
      const newCol = colOffset + col;
      const isCellWithinGridBounds =
        newRow >= 0 && newRow < m && newCol >= 0 && newCol < n;

      if (isCellWithinGridBounds && grid[newRow][newCol] === 1) {
        const mappedIndexOfNewCell = newRow * n + newCol;
        const u = graph.find(mappedIndexOfNewCell);
        const v = graph.find(mappedIndexOfCurrentCell);

        // If the cells are not already connected, connect them and reduce the island count
        if (u !== v) {
          graph.union(u, v);
          count--;
        }
      }
    }

    // Update result with the current island count
    result.push(count);
  }

  return result;
};
