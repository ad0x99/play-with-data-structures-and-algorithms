import { WeightedGraph } from './dijkastras-algorithm.js';

const weightedGraph = new WeightedGraph();

// Example: Find the shortest path from A to E
//      A ---4--- B
//    2/            \3
//   C --2-- D --3-- E
//   4\      |1      /1
//      ---- F -----
//

weightedGraph.addVertex('A');
weightedGraph.addVertex('B');
weightedGraph.addVertex('C');
weightedGraph.addVertex('D');
weightedGraph.addVertex('E');
weightedGraph.addVertex('F');

weightedGraph.addWeightedEdge('A', 'B', 4);
weightedGraph.addWeightedEdge('A', 'C', 2);
weightedGraph.addWeightedEdge('B', 'E', 3);
weightedGraph.addWeightedEdge('C', 'D', 2);
weightedGraph.addWeightedEdge('C', 'F', 4);
weightedGraph.addWeightedEdge('D', 'E', 3);
weightedGraph.addWeightedEdge('D', 'F', 1);
weightedGraph.addWeightedEdge('E', 'F', 1);

console.log(JSON.stringify(weightedGraph, null, '\t'));

const shortestPath = weightedGraph.findShortestPath('A', 'E');
console.log('Shortest path from A to E: ', shortestPath);
