/**
 * https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
 *
 * Floyd-Warshall Algorithm Approach
 *
 * Idea: We find the shortest path between cities using Floyd-Warshall algorithm.
 *
 * For each vertex (city) in the graph, we find all its closest neighbors (cites) such that the distance between them is less than or equal to distance threshold
 *
 * Finally, we find the biggest city that has fewest neighbors.
 *
 * Implementation
 *
 * 1. We create a 2D array (distanceMatrix) to store the shortest distances between each pair of cities, with Infinity as initial value to indicate that no cities are reachable from each other.
 *
 * 2. The edges array contains information about direct connections between cities. We use the edges array to build a graph that represents the path between cities, and its weight.
 * - 2.1: For each edge, the distance between the two connected cities is updated in the distanceMatrix.
 *
 * - 2.2: Since the graph is undirected, the distance is symmetrical, meaning the distance from city A to city B is the same as from city B to city A.
 *
 * 3. We use the Floyd-Warshall algorithm to find the shortest path between all pairs of cities.
 * - 3.1: By considering each city k as an intermediate point and checking if the path from fromCity to toCity can be shortened by passing through k.
 *
 * - 3.2: If a shorter path is found, we update distanceMatrix with the new shorter distance.
 *
 * 4. We count how many cities are reachable within the given distanceThreshold for each city.
 * - 4.1: For each pair of cities (currentCity, neighborCity), if the distance between them is less than or equal to the threshold, reachableCityCounts[currentCity] is incremented to indicate the number of cities that the current city can reach.
 *
 * - 4.2: While doing this, we will keep track the city with the fewest reachable neighbors. If there are ties (cities with the same number of neighbors), the city with the larger index is selected.
 *
 *
 * Time complexity: O(m) + O(n ^ 3) + O(n ^ 2) = O(n ^ 3), where n is the number of cities in the graph.
 * - Build undirected graph: O(m), where m is the number of edges.
 * - Find shortest path: O(n ^ 3)
 * - Find city with fewest neighbors: O(n ^ 2)
 *
 * Space complexity: O(n ^ 2) + O(n) = O(n ^ 2)
 * - distanceMatrix: O(n ^ 2)
 * - reachableCityCounts: O(n)
 */
impl Solution {
    pub fn find_the_city(n: i32, edges: Vec<Vec<i32>>, distance_threshold: i32) -> i32 {
        let n = n as usize;
        // Store the distance between cities
        let mut distance_matrix = vec![vec![i32::MAX; n]; n];

        // Build undirected graph based on edges
        for edge in edges {
            let (from, to, weight) = (edge[0] as usize, edge[1] as usize, edge[2]);
            distance_matrix[from][to] = weight;
            distance_matrix[to][from] = weight;
        }

        // Find shortest path between cities
        // Floyd-Warshall: For each city, find all its closest neighbors such that the distance between them is less than or equal to distance threshold
        for k in 0..n {
            for from_city in 0..n {
                for to_city in 0..n {
                    if distance_matrix[from_city][k] != i32::MAX
                        && distance_matrix[k][to_city] != i32::MAX
                    {
                        let new_distance =
                            distance_matrix[from_city][k] + distance_matrix[k][to_city];
                        let current_distance = distance_matrix[from_city][to_city];

                        // If the current distance between cities is greater than the new distance
                        // We update the distance of current cities to be new distance
                        // Because we want to find shortest distance
                        if current_distance > new_distance {
                            distance_matrix[from_city][to_city] = new_distance;
                        }
                    }
                }
            }
        }

        // Count the number of reachable cities within the distance threshold for each city
        // And return the biggest city with fewest neighbors
        let mut reachable_city_counts = vec![0; n];
        let mut city_with_fewest_neighbors = 0;

        for current_city in 0..n {
            for neighbor_city in 0..n {
                if current_city != neighbor_city
                    && distance_matrix[current_city][neighbor_city] <= distance_threshold
                {
                    reachable_city_counts[current_city] += 1;
                }
            }

            // Update the city with the fewest neighbors
            if reachable_city_counts[current_city]
                <= reachable_city_counts[city_with_fewest_neighbors]
            {
                city_with_fewest_neighbors = current_city;
            }
        }

        city_with_fewest_neighbors as i32
    }
}
