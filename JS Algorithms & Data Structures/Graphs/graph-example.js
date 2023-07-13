import { Graph } from './graphs.js';

const newGraph = new Graph();

console.log('============addVertex============');
newGraph.addVertex('san francisco');
newGraph.addVertex('new york');
newGraph.addVertex('helsinki');
console.log(newGraph);
console.log('============addVertex============');

console.log('============addEdge============');
newGraph.addEdge('helsinki', 'frankfurt');
newGraph.addEdge('helsinki', 'new york');
newGraph.addEdge('san francisco', 'new york');
newGraph.addEdge('singapore', 'seoul');
newGraph.addEdge('singapore', 'tokyo');
newGraph.addEdge('seoul', 'tokyo');
console.log(newGraph);
console.log('============addEdge============');

console.log('============removeEdge============');
console.log(newGraph.removeEdge('helsinki', 'frankfurt'));
console.log(newGraph.removeEdge('helsinki', 'no where'));
console.log('============removeEdge============');

console.log('============removeVertex============');
console.log(newGraph.removeVertex('singapore'));
console.log('============removeVertex============');
