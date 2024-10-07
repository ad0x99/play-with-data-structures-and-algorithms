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
const findTheCity = (n, edges, distanceThreshold) => {
  // Store the distance between cities
  const distanceMatrix = Array.from({ length: n }, () =>
    Array(n).fill(Infinity)
  );

  // Build undirected graph based on edges
  for (const [from, to, weight] of edges) {
    distanceMatrix[from][to] = weight;
    distanceMatrix[to][from] = weight; // For undirected graph
  }

  // Find shortest path between cities
  // Floyd-Warshall: For each city, find all its closest neighbors such that the distance between them is less than or equal to distance threshold
  for (let k = 0; k < n; k++) {
    for (let fromCity = 0; fromCity < n; fromCity++) {
      for (let toCity = 0; toCity < n; toCity++) {
        const newDistance =
          distanceMatrix[fromCity][k] + distanceMatrix[k][toCity];
        const currentDistance = distanceMatrix[fromCity][toCity];

        // If the current distance between cities is greater than the new distance
        // We update the distance of current cities to be new distance
        // Because we want to find shortest distance
        if (currentDistance > newDistance) {
          distanceMatrix[fromCity][toCity] = newDistance;
        }
      }
    }
  }

  // Count the number of reachable cities within the distance threshold for each city
  // And return the biggest city with fewest neighbors
  let reachableCityCounts = new Array(n).fill(0);
  let cityWithFewestNeighbors = 0;

  for (let currentCity = 0; currentCity < n; currentCity++) {
    for (let neighborCity = 0; neighborCity < n; neighborCity++) {
      if (
        currentCity !== neighborCity &&
        distanceMatrix[currentCity][neighborCity] <= distanceThreshold
      ) {
        reachableCityCounts[currentCity]++;
      }
    }

    // Update the city with the fewest neighbors
    if (
      reachableCityCounts[currentCity] <=
      reachableCityCounts[cityWithFewestNeighbors]
    ) {
      cityWithFewestNeighbors = currentCity;
    }
  }

  return cityWithFewestNeighbors;
};
