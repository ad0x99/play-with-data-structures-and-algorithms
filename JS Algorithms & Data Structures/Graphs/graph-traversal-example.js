import { Graph } from './graphs.js';

console.log('============dfsRecursive============');

const dfsGraph = new Graph();

/**
 * Example Graph
 *    A
 *  /   \
 * B     C
 * |     |
 * D --- E
 * \     /
 *    F
 */

dfsGraph.addVertex('A');
dfsGraph.addVertex('B');
dfsGraph.addVertex('C');
dfsGraph.addVertex('D');
dfsGraph.addVertex('E');
dfsGraph.addVertex('F');

dfsGraph.addEdge('A', 'B');
dfsGraph.addEdge('A', 'C');
dfsGraph.addEdge('B', 'D');
dfsGraph.addEdge('C', 'E');
dfsGraph.addEdge('D', 'E');
dfsGraph.addEdge('D', 'F');
dfsGraph.addEdge('E', 'F');

console.log(dfsGraph);
console.log(dfsGraph.dfsRecursive('A'));
console.log('============dfsRecursive============');
