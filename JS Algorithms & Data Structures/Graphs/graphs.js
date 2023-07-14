/**
 * Undirected Graph - Adjacency List Representation
 */
export class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  /**
   * The addVertex function adds a new vertex to the adjacency list if it doesn't already exist.
   * @param vertex - The "vertex" parameter is the value or label of the vertex that you want to add to the adjacency list.
   * @returns The updated object with the new vertex added to the adjacency list.
   */
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this;
  }

  /**
   * The `removeVertex` function removes a vertex from an adjacency list and deletes all edges connected to that vertex.
   * @param vertex - The `vertex` parameter represents the vertex (or node) that you want to remove from the graph.
   * @returns The method is returning the updated graph after removing the specified vertex.
   */
  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) return undefined;
    let currentEdges = this.adjacencyList[vertex];

    for (const edge of currentEdges) {
      if (this.adjacencyList[edge]) {
        this.adjacencyList[edge] = this.#removeEdgeFromVertexArray(
          edge,
          vertex
        );
      }
    }

    delete this.adjacencyList[vertex];
    return this;
  }

  /**
   * The addEdge function adds an edge between two vertices in an adjacency list.
   * @param firstVertex - The first vertex is the starting point of the edge. It represents one of the vertices connected by the edge.
   * @param secondVertex - The secondVertex parameter is the vertex that will be connected to the firstVertex parameter by adding an edge between them.
   * @returns The `addEdge` method is returning the current instance of the object (`this`) after adding the new edge to the adjacency list.
   */
  addEdge(firstVertex, secondVertex) {
    if (!this.adjacencyList[firstVertex]) {
      this.adjacencyList[firstVertex] = [];
    }

    if (!this.adjacencyList[secondVertex]) {
      this.adjacencyList[secondVertex] = [];
    }

    this.#addNewEdgeToCurrentArray(firstVertex, secondVertex);
    this.#addNewEdgeToCurrentArray(secondVertex, firstVertex);
    return this;
  }

  /**
   * The `removeEdge` function removes an edge between two vertices in an adjacency list.
   * @param firstVertex - The first vertex is the starting vertex of the edge that you want to remove.
   * @param secondVertex - The `secondVertex` parameter in the `removeEdge` function represents the vertex that is connected to the `firstVertex` by an edge. It is the vertex that we want to remove the edge with.
   * @returns The `removeEdge` method returns the updated graph object.
   */
  removeEdge(firstVertex, secondVertex) {
    if (!this.adjacencyList[firstVertex] || !this.adjacencyList[secondVertex]) {
      return undefined;
    }

    this.adjacencyList[firstVertex] = this.#removeEdgeFromVertexArray(
      firstVertex,
      secondVertex
    );
    this.adjacencyList[secondVertex] = this.adjacencyList[firstVertex] =
      this.#removeEdgeFromVertexArray(secondVertex, firstVertex);

    return this;
  }

  /**
   * The function adds a new value to an array in the adjacency list of a given vertex.
   * @param vertex - The vertex parameter represents the key or label of the vertex in the adjacency list. It is used to identify the specific vertex to which the new value will be added.
   * @param value - The value parameter is the value that you want to add to the array of the specified vertex in the adjacency list.
   * @returns the updated object that contains the adjacency list.
   */
  #addNewEdgeToCurrentArray(vertex, value) {
    if (!this.adjacencyList[vertex] || !value) {
      return undefined;
    }
    return this.adjacencyList[vertex].push(value);
  }

  /**
   * The function removes a specific value from an array in the adjacency list of a graph.
   * @param vertex - The vertex parameter represents a vertex in a graph. It is used to identify a specific node in the graph.
   * @param value - The value parameter represents the value of the edge that you want to remove from the array.
   * @returns an array with the specified value removed from the adjacency list of the given vertex.
   */
  #removeEdgeFromVertexArray(vertex, edge) {
    if (!this.adjacencyList[vertex] || !edge) {
      return undefined;
    }
    return this.adjacencyList[vertex].filter((v) => v !== edge);
  }

  /**
   * The dfsRecursive function performs a depth-first search on a graph starting from a given vertex and returns an array of visited vertices.
   *
   * Pseudocode - DFS Recursive
   *
   * 1. The function should accepts a starting node (vertex)
   * 2. Create a list to store the result, to be returned at the end of the function
   * 3. Create an object to store visited vertices
   * 4. Create a helper function which accepts a vertex
   * 5. If the vertex is empty, then return `null`
   * 6. Otherwise, place the vertex that it accepts into the visited object and push that vertex into the result list
   * 7. Loop over all of the values in the adjacencyList for that vertex, if any of those values have not been visited, recursively invoke the helper function with that vertex
   * 8. Return the result list
   *
   * @param vertex - The `vertex` parameter represents the starting vertex from which the Depth First Search (DFS) algorithm will begin traversing the graph.
   * @returns an array containing the vertices visited during the depth-first search traversal starting from the given vertex.
   */
  dfsRecursive(vertex) {
    const result = [];
    const visited = {};

    const dfs = (vertex) => {
      // If there is no vertex then return null
      if (!vertex || !this.adjacencyList[vertex]) return null;

      // Otherwise, mark current vertex as visited
      // and push into result list
      visited[vertex] = true;
      result.push(vertex);

      // Loop through neighbor of current vertex
      // If it has not visited yet, then recursively call dfs to find neighbor of neighbor until all the neighbors are visited
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    };
    dfs.call(this, vertex);

    return result;
  }

  /**
   * The dfsIterative function performs a depth-first search on a graph starting from a given vertex.
   *
   * Pseudocode - DFS Iterative
   *
   * 1. The function accepts a starting node (vertex)
   * 2. Create a stack to keep track of vertices
   * 3. Create a list to store the result
   * 4. Create an object to store visited vertices
   * 5. Add the starting vertex to the stack, and mark it visited
   * 6. If stack is not empty then pop the next vertex from the stack
   * 7. If that vertex has not been visited yet, then
   *  7.1 Mark it as visited
   *  7.2 Add it to the result list
   *  7.3 Push all of its neighbors into the stack
   * 8. Return the result list
   *
   * @param vertex - The `vertex` parameter represents the starting vertex from which the Depth First Search (DFS) traversal will begin.
   * @returns an array containing the vertices visited during the Depth First Search traversal.
   */
  dfsIterative(vertex) {
    const stack = [];
    const result = [];
    const visited = {};
    let currentVertex;

    // Push the starting vertex into the stack
    stack.push(vertex);
    // Mark the starting vertex as visited
    visited[vertex] = true;

    // If stack is not empty
    while (stack.length) {
      // Get the last vertex from stack
      // And push to result list
      currentVertex = stack.pop();
      result.push(currentVertex);

      // Loop through current vertex's neighbor until out of neighbors
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        // If its neighbor is not marked as visited yet
        // Then mark it as visited and push to the stack
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }

    return result;
  }

  /**
   *
   */
  /**
   * The bfs function performs a breadth-first search starting from a given vertex and returns an array of vertices visited in the order they were visited.
   *
   * Pseudocode - BFS
   *
   * 1. This function accepts a start vertex
   * 2. Create a queue and place the starting vertex in it as initial value
   * 3. Create an array to store the result (visited nodes)
   * 4. Create an object to store the visited nodes
   * 5. Make the starting vertex as visited
   * 6. Loop through the queue until it's empty
   * 7. Remove the first vertex from the queue and push it into the array that store visited nodes
   * 8. Loop over each vertex in the current vertex's adjacency list
   * 9. If it's not visited yet, mark it as visited and enqueue that vertex
   * 10. Once finished looping, return the array of visited nodes
   *
   * @param vertex - The parameter "vertex" represents the starting vertex from which the breadth-first search (BFS) algorithm will begin traversing the graph.
   * @returns an array containing the vertices visited in breadth-first order.
   */
  bfs(vertex) {
    const queue = [];
    const result = [];
    const visited = {};

    // Push the starting vertex into the stack
    queue.push(vertex);
    // Mark the starting vertex as visited
    visited[vertex] = true;

    // If the queue is not empty
    while (queue.length) {
      // Get first vertex from queue
      // And push it into result array
      const currentVertex = queue.shift();
      result.push(currentVertex);

      // Loop through current vertex's adjacency list to get all of its neighbors
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        // If neighbor is not marked visited yet
        // The mark it as visited and push into the queue
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}
