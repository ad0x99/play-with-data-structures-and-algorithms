import { PriorityQueue } from '../Binary Heap/priority-queue.js';
import { Graph } from '../Graphs/graphs.js';

export class WeightedGraph extends Graph {
  constructor() {
    super();
  }

  /**
   * The addWeightedEdge function adds a weighted edge between two vertices in a graph.
   * @param vertex1 - The first vertex of the edge.
   * @param vertex2 - The second vertex that the weighted edge connects to.
   * @param weight - The weight parameter represents the weight or cost associated with the edge between the two vertices. It is used to determine the distance or importance of the connection between the vertices.
   * @returns The updated graph object is being returned.
   */
  addWeightedEdge(vertex1, vertex2, weight) {
    if (!this.adjacencyList[vertex1]) {
      this.adjacencyList[vertex1] = [];
    }
    if (!this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex2] = [];
    }

    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });

    return this;
  }

  /**
   * Pseudocode - Dijkastra's Algorithm
   *
   * 1. Every time we look to visit a new node, we pick the node with the smallest known distance to visit first
   * 2. Once we've moved to the node which we're going to visit, we look at each of its neighbors
   * 3. For each neighboring node, we calculate the distance by summing the total edges that lead to the node we're checking from the starting node
   * 4. If the new total distance to a node is less than the previous total, we store the new shorter distance for that node
   */

  /**
   * The function `findShortestPath` uses Dijkstra's algorithm to find the shortest path between a root node and a destination node in a graph.
   *
   * Pseudocode - Dijkastra's Algorithm
   *
   * 1. This function accepts a starting and ending vertex
   * 2. Create an distance object and set each key to be every vertex in the adjacency list with a value of infinity, except for the starting vertex which should have a value of `zero`
   * 3. After setting a value in the distance object, add each vertex with a priority of Infinity to the priority queue, except the starting vertex, which should have a priority of `zero` because that's where we begin
   * 4. Create another object called previous and set each key to be every vertex in the adjacency list with a value of `null`
   * 5. Start looping as long as there is anything in the priority queue
   * 6. Dequeue a vertex from the priority queue
   * 7. If that vertex is the same as the ending vertex - we're done
   * 8. Otherwise, loop through each value in the adjacency list at that vertex
   * 9. Calculate the distance to that vertex from the starting vertex
   * 10. If the distance is less than what is currently stored in distance object
   * 11. Update the distances object with new lower distance
   * 12. Update the previous object to contain that vertex
   * 13 Enqueue the vertex with the total distance from the starting node
   *
   * @param root - The root parameter represents the starting vertex or node from which we want to find the shortest path.
   * @param destination - The `destination` parameter in the `findShortestPath` function represents the node in the graph that we want to find the shortest path to from the `root` node.
   * @returns an array representing the shortest path from the root node to the destination node.
   */
  findShortestPath(root, destination) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    const path = [];
    let smallest;

    // Build up initial state
    // Loop through entire adjacencyList
    for (let vertex in this.adjacencyList) {
      // If vertex in adjacencyList equals to root
      if (vertex === root) {
        // Set default distance for root vertex to 0
        // And enqueue new root vertex node with priority equals to 0
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        // Otherwise, set distance to current vertex as Infinity
        // And enqueue current vertex node with priority equals to Infinity
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }

      // Assign previous visited vertex of current vertex as null
      previous[vertex] = null;
    }

    // As long as there is something to visit
    while (nodes.values.length) {
      // Get the smallest value from priority queue
      smallest = nodes.dequeue().value;

      // If reach to destination node
      if (smallest === destination) {
        // Build up path to return in the end
        // If has previous value of current smallest
        // Then push smallest to the path array
        // And re-assign smallest value by the previous value of current smallest
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // Find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // Calculate new distance to the neighboring node
          // By using current smallest's distance value pluses with the nextNode's weight
          let newDistance = distances[smallest] + nextNode.weight;
          // Get next neighbor
          let nextNeighbor = nextNode.node;

          if (newDistance < distances[nextNeighbor]) {
            // Updating new smallest distance to neighbor
            distances[nextNeighbor] = newDistance;
            // Updating previous visited node by the current smallest (updating how we got to neighbor)
            previous[nextNeighbor] = smallest;
            // Enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, newDistance);
          }
        }
      }
    }

    return path.concat(smallest).reverse();
  }
}
