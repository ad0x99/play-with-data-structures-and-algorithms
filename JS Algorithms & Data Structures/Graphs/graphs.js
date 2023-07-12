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
}
