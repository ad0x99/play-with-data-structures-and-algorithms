import fs from 'fs';
import path from 'path';
import { BinarySearchTree } from './binary-search-tree.js';

//    10
//  5    13
// 2 7 11  16
let tree = new BinarySearchTree();
tree.insert(10);
tree.insert(5);
tree.insert(13);
tree.insert(2);
tree.insert(7);
tree.insert(11);
tree.insert(16);
tree.insert(10);

console.log('==========Insert value to tree==========');
console.log(tree);
console.log(JSON.stringify(tree, null, '\t'));
console.log('==========Insert value to tree==========');

console.log('==========Find value in tree==========');
console.log(tree.find(10));
console.log(tree.find(12));
console.log('==========Find value in tree==========');

console.log('==========BFS Tree==========');
console.log(tree.bfs());
console.log('==========BFS Tree==========');

console.log('==========DFS PreOrder Tree==========');
console.log(tree.dfsPreOrder());
console.log('==========DFS PreOrder Tree==========');

console.log('==========DFS PostOrder Tree==========');
console.log(tree.dfsPostOrder());
console.log('==========DFS PostOrder Tree==========');

console.log('==========DFS InOrder Tree==========');
console.log(tree.dfsInOrder());
console.log('==========DFS InOrder Tree==========');
