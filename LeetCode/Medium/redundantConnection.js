/**
 * https://leetcode.com/problems/redundant-connection/
 *
 * Union-Find Approach
 *
 * Idea: We have a undirected graph that exists one additional edge which forms a cycle. Therefore, we want to make the graph acyclic by removing the additional edge.
 *
 * The approach here is we will build a acyclic graph using Union-Find. While building the graph, if we found a cycle, meaning two nodes have the same root, it means, we found the additional edge.
 *
 * Implementation
 *
 * The UnionFindGraph includes 3 methods:
 *
 * - The isCycleFound method is used to add a edge between 2 nodes to form a graph, and check the cycle graph at the same time
 * - The find method is used to find the root of a node
 * - The union method is used to merge two nodes to form a graph
 *
 * We traverse through each pair of nodes in the edges, and call the isCycleFound to add those 2 nodes to form a single graph. 
 * 
 * If the method returns true, that means, while building the graph, we found a cycle where 2 nodes have the same root. We then return those 2 nodes.
 *
 * Time complexity: O(n), where n is the number of nodes in the graph.
 *
 * Space complexity: O(n), where n is the length of parent and height.
 */
class UnionFindGraph {
  constructor(numberOfNodes) {
    this.n = numberOfNodes;
    this.parent = new Array(numberOfNodes + 1).fill(-1);
    this.height = new Array(numberOfNodes + 1).fill(1);
  }

  isCycleFound(u, v) {
    let rootU = this.find(u);
    let rootV = this.find(v);

    // If found a cycle
    if (rootU === rootV) {
      return true;
    }

    // Merge two nodes
    this.union(rootU, rootV);
    return false;
  }

  find(node) {
    let root = node;

    // Find root node
    while (this.parent[root] !== -1) {
      root = this.parent[root];
    }

    // Path compression - assigning all vertices in the same path from vertex to root to be the same root to optimize finding root of a node process
    while (node !== root) {
      const parent = this.parent[node];
      this.parent[node] = root;
      this.height[node] = 1;
      node = parent;
    }

    return root;
  }

  /** Merge 2 nodes by making a node is a root of the other */
  union(u, v) {
    // The node has higher height will be the parent of shorter vertex for optimization
    // The purpose is to make the graph as short as possible when merging 2 nodes.
    if (this.height[u] > this.height[v]) {
      this.parent[v] = u;
    } else if (this.height[u] < this.height[v]) {
      this.parent[u] = v;
    } else {
      this.parent[u] = v;
      this.height[v] += 1;
    }
  }
}

const findRedundantConnection = (edges) => {
  const unionFindGraph = new UnionFindGraph(edges.length);

  for (const [u, v] of edges) {
    if (unionFindGraph.isCycleFound(u, v)) {
      return [u, v];
    }
  }

  return [];
};
