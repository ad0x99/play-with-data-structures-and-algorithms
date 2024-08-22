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
struct UnionFind {
    parent: Vec<usize>,
    rank: Vec<usize>,
}

impl UnionFind {
    fn new(n: usize) -> Self {
        UnionFind {
            parent: (0..n).collect(),
            rank: vec![1; n],
        }
    }

    fn find(&mut self, mut node: usize) -> usize {
        // Find root node
        let mut root = node;
        while self.parent[root] != root {
            root = self.parent[root];
        }

        // Path compression
        while node != root {
            let parent = self.parent[node];
            self.parent[node] = root;
            node = parent;
        }

        root
    }

    fn union(&mut self, x: usize, y: usize) -> bool {
        let root_x = self.find(x);
        let root_y = self.find(y);

        if root_x == root_y {
            return false;
        }

        if self.rank[root_x] > self.rank[root_y] {
            self.parent[root_y] = root_x;
        } else if self.rank[root_x] < self.rank[root_y] {
            self.parent[root_x] = root_y;
        } else {
            self.parent[root_y] = root_x;
            self.rank[root_x] += 1;
        }

        true
    }
}

impl Solution {
    pub fn min_cost_connect_points(points: Vec<Vec<i32>>) -> i32 {
        let n = points.len();
        let mut edges = Vec::new();

        // Build adjacent list
        for i in 0..n {
            for j in i + 1..n {
                let distance =
                    (points[i][0] - points[j][0]).abs() + (points[i][1] - points[j][1]).abs();
                edges.push((i, j, distance));
            }
        }

        // Sort the edges by distance in ascending order
        edges.sort_unstable_by(|a, b| a.2.cmp(&b.2));

        // Build graph using Union-Find
        let mut union_find = UnionFind::new(n);
        let mut total_cost = 0;
        let mut edges_used = 0;

        for (x, y, cost) in edges {
            if union_find.union(x, y) {
                total_cost += cost;
                edges_used += 1;

                if edges_used == n - 1 {
                    break;
                }
            }
        }

        total_cost
    }
}
