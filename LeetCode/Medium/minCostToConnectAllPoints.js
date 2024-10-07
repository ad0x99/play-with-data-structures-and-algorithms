/**
 * https://leetcode.com/problems/min-cost-to-connect-all-points/
 *
 * Kruskal's Minimum Spanning Tree (MST) Algorithm Approach
 *
 * Idea: We can assume each point (coordinates) is a vertex in the graph, where the cost between points is the weighted edge.
 *
 * We want to find the minimum cost to make all points connected. It means, we want to find a way to connect all the points such that the distance (cost) to connect points is minimum, and we only allow single path to connect to a point, meaning there is no more than 1 direct edge pointing to it.
 *
 * To find the minimum path, we will use the MST algorithm. We will build a undirected graph by connect points (vertices) to each other. Each time we connect 2 points (vertices), we want to make sure that when those 2 are connected, it will not create a cyclic graph.
 *
 * In order to connect 2 points (vertices) together, we will use Union-Find to merge 2 points (vertices) together, indicating 2 points belong to the same graph.
 *
 * Implementation
 *
 * 1. The Union-Find contains 2 methods:
 * - The find method is used to find the root of a node
 * - The union method is used to merge two nodes to form a graph
 *
 * 2. We create an array edges to store all possible edges between pairs of points along with their corresponding distances (cost).
 *
 * 3. We iterate over every possible pair of points and extract 4 coordinates of 2D-plane which are [xi, xj] and [yi, yj]. Each pair (i, j), we calculate the Manhattan distance (|xi - xj| + |yi - yj|) between them and store this information as a tuple (i, j, distance) in the edges array.
 *
 * 4. Once all edges are generate, we then sort the edges by their distance (cost) in ascending order. This ensures that we will consider the smallest edges first, which is used for constructing the MST.
 *
 * 5. We use Kruskal's Algorithm to find the MST by adding the smallest edges one by one, ensuring that no cycles are formed. We iterate over the sorted list of edges. For each edge:
 * - 5.1: We check whether the two points (nodes) connected by this edge are already in the same connected component using the UnionFind data structure.
 *
 * - 5.2: If they are not connected, the edge is added to the MST by calling the union method, which merges the two components.
 *
 * - 5.3: We add the current weight of the edge to the total cost (totalCost).
 *
 * - 5.4: If the number of edges in the MST equals n-1 (where n is the number of points), we terminate early and return the total cost because all points are now connected.
 *
 * 6. Finally, If the graph is disconnected, we return 0.
 *
 * Time complexity: O(n ^ 2) + O(n ^ 2 log n) + O(n ^ 2) = O(n ^ 2 log n), where n is the number of points.
 * - Build adjacent list: O(n ^ 2)
 * - Sort the edges: O(n ^ 2 log n)
 * - Build graph using Union-Find: O(n ^ 2)
 *
 * Space complexity: O(n ^ 2) + O(n) = O(n ^ 2)
 * - edges array: O(n ^ 2)
 * - Union-Find: O(n)
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(1);
  }

  find(node) {
    // Find root
    let root = node;
    while (this.parent[root] !== root) {
      root = this.parent[root];
    }

    // Path compression
    while (node !== root) {
      const parent = this.parent[node];
      this.parent[node] = root;
      node = parent;
    }

    return root;
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);

    // Cycle detected
    if (rootX === rootY) return false;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX] += 1;
    }

    return true;
  }
}

const minCostConnectPoints = (points) => {
  const n = points.length;
  const edges = [];

  // Build adjacent list
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const xi = points[i][0];
      const xj = points[j][0];
      const yi = points[i][1];
      const yj = points[j][1];

      const distance = Math.abs(xi - xj) + Math.abs(yi - yj);
      edges.push([i, j, distance]);
    }
  }

  // Sort the edges by distance in ascending order
  edges.sort((x, y) => x[2] - y[2]);

  // Build graph using Union-Find
  const unionFind = new UnionFind(points.length);
  let totalCost = 0;
  let visitedPoint = 0;

  for (const [x, y, cost] of edges) {
    if (unionFind.union(x, y)) {
      totalCost += cost;
      visitedPoint += 1;

      if (visitedPoint === points.length - 1) return totalCost;
    }
  }

  return 0;
};
