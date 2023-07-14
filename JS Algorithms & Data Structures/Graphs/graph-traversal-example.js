import { Graph } from './graphs.js';
import _ from 'lodash';

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

console.log('============dfsRecursive============');
console.log(dfsGraph);
let actualResult = dfsGraph.dfsRecursive('A');
let expectedResult = ['A', 'B', 'D', 'E', 'C', 'F'];
console.log(actualResult);
console.log(
  'Is actual result correct as expected: ',
  _.isEqual(expectedResult, actualResult)
);
console.log('============dfsRecursive============');

console.log('============dfsIterative============');
console.log(dfsGraph);
actualResult = dfsGraph.dfsIterative('A');
expectedResult = ['A', 'C', 'E', 'F', 'D', 'B'];
console.log(actualResult);
console.log(
  'Is actual result correct as expected: ',
  _.isEqual(expectedResult, actualResult)
);
console.log('============dfsIterative============');

console.log('============bfs============');
console.log(dfsGraph);
actualResult = dfsGraph.bfs('A');
expectedResult = ['A', 'B', 'C', 'D', 'E', 'F'];
console.log(actualResult);
console.log(
  'Is actual result correct as expected: ',
  _.isEqual(expectedResult, actualResult)
);
console.log('============bfs============');
