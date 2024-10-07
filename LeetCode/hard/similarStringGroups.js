/**
 * https://leetcode.com/problems/similar-string-groups/
 *
 * Union-Find Approach
 *
 * Idea: We assume each string as a vertex (node) in a graph, where an edge between two vertices exists if the corresponding strings are similar (they can be made identical by swapping at most two characters).
 *
 * For example, we have the following strings: ["abc", "acb", "bac", "xyz"]
 *
 * The graph should look like this:
 *
 *```js
 *      abc
 *     /  \
 *   acb - bac     xyz
 *```
 *
 * Nodes "abc", "acb", and "bac" form a connected component, meaning they are all similar to each other. The "xyz" is isolated, meaning it forms its own group.
 *
 * The goal is to count the number of connected components (groups of similar strings) in this graph.
 *
 * - Union-Find is used to efficiently manage and merge these groups.
 *
 * - By using path compression and union operations, the code ensures that the time complexity for finding and merging groups remains nearly constant.
 *
 * - The similarity check (isSimilar) ensures that only relevant connections (edges) between nodes are considered, thereby building the correct groups.
 *
 * Implementation
 *
 * 1. We build a UnionFindGraph to represent each string as vertex in the graph.
 *
 * 2. The UnionFindGraph contains 4 methods:
 * - 2.1: The `find` method: This method finds the root of the set to which vertex belongs. It uses path compression to optimize future lookups by directly linking nodes to their root. That means, every time we traverse through a vertex, we assign the root of all vertices in the same path from vertex to root to be the same root.
 *
 * - 2.2: The `union` method: This method connects two nodes (u and v) by setting the parent of u to v, effectively merging the two sets.
 *
 * - 2.3: The `countGroups` method: This method counts the number of groups by iterating over all elements and checking how many are roots (have a parent value of -1). Each root represents a distinct group. Because the each group has only one root, therefore, the number of root is the number of group.
 *
 * - 2.4: The `isSimilar` method: This method checks whether two strings a and b are similar. Two strings are considered similar if they are identical or if they can become identical by swapping two different characters. The method counts the positions where a and b differ and verifies that these differences can be swapped to make the strings identical.
 *
 * 3. In the initialization logic, we create a `UnionFindGraph` instance with n nodes, where n is the number of strings.
 *
 * 4. Similarity Check and Union Operation: We iterate over all pairs of strings and check if they are similar.
 * - 4.1:  If they are similar, we find the roots of their respective sets using `find` method and merge them into the same graph using `union` method.
 *
 * 5. Counting Groups: After all pairs have been processed, we call `countGroups` to determine how many distinct groups exist.
 *
 * Time complexity: O(n ^ 2 * m) where m is length of a string, and n is the number of strings.
 *
 * Space complexity: O(n)
 */
class UnionFindGraph {
  constructor(n) {
    this.parent = new Array(n).fill(-1);
  }

  // Find function with path compression
  find(vertex) {
    let root = vertex;

    // Find the root of the component
    while (this.parent[root] !== -1) {
      root = this.parent[root];
    }

    // Path compression for optimization
    while (vertex !== root) {
      let parent = this.parent[vertex];
      this.parent[vertex] = root;
      vertex = root;
    }

    return root;
  }

  // Merge two components
  union(u, v) {
    this.parent[u] = v;
  }

  // Count the number of groups (components)
  countGroups() {
    let groupCount = 0;

    for (let i = 0; i < this.parent.length; i++) {
      if (this.parent[i] === -1) {
        groupCount++;
      }
    }
    return groupCount;
  }

  // Check if two strings are similar
  isSimilar(a, b) {
    // If they are identical
    if (a === b) return true;

    // Counts the positions where a and b differ
    const differentPosition = [];
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        differentPosition.push(i);
      }
    }

    // If more than 2 different position, that means, we can't swap two 2 positions to make both strings become identical
    if (differentPosition.length > 2) return false;

    // If they can become identical by swapping two different characters
    const firstPos = differentPosition[0];
    const secondPos = differentPosition[1];
    return (
      a.charAt(firstPos) === b.charAt(secondPos) &&
      a.charAt(secondPos) === b.charAt(firstPos)
    );
  }
}

const numSimilarGroups = (strs) => {
  const n = strs.length;
  const unionFindGraph = new UnionFindGraph(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (unionFindGraph.isSimilar(strs[i], strs[j])) {
        let u = unionFindGraph.find(i);
        let v = unionFindGraph.find(j);

        if (u !== v) {
          unionFindGraph.union(u, v);
        }
      }
    }
  }

  return unionFindGraph.countGroups();
};

/**
 * Breath-First Search (BFS) + Depth-First Search (DFS) Approach
 *
 * Idea: We iterate through all the strings. If a string hasn't been visited, we trigger a BFS, marking all strings in that connected component (group) as visited.
 *
 * Each BFS call corresponds to discovering a new group, so we increment the group count (numGroups) to keep track how many groups have been discovered.
 *
 * Time complexity: O(n ^ 2 * m) where n is the number of strings and m is the length of each string.
 *
 * Space complexity: O(n) for the visited array and the BFS queue or recursion stack in DFS.
 */
const numSimilarGroups = (strs) => {
  const n = strs.length;
  const visited = new Array(n).fill(false);

  // BFS
  const bfs = (node) => {
    const queue = [node];
    visited[node] = true;

    while (queue.length) {
      const current = queue.shift();

      for (let i = 0; i < n; i++) {
        if (!visited[i] && isSimilar(strs[current], strs[i])) {
          visited[i] = true;
          queue.push(i);
        }
      }
    }
  };

  // DFS
  const dfs = (node) => {
    visited[node] = true;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && isSimilar(strs[node], strs[i])) {
        dfs(i);
      }
    }
  };

  // Counts group
  let groupCounts = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      // Choose either BFS or DFS for traversal
      bfs(i);
      // dfs(i);
      groupCounts++;
    }
  }
  return groupCounts;
};

const isSimilar = (a, b) => {
  // If they are identical
  if (a === b) return true;

  // Counts the positions where a and b differ
  const differentPosition = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differentPosition.push(i);
    }

    // If more than 2 different position, that means, we can't swap two 2 positions to make both strings become identical
    if (differentPosition.length > 2) return false;
  }

  // If they can become identical by swapping two different characters
  const firstPos = differentPosition[0];
  const secondPos = differentPosition[1];
  return (
    a.charAt(firstPos) === b.charAt(secondPos) &&
    a.charAt(secondPos) === b.charAt(firstPos)
  );
};
