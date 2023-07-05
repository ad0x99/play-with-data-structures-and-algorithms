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
console.log(JSON.stringify(tree));
console.log('==========Insert value to tree==========');

console.log('==========Find value in tree==========');
console.log(tree.find(10));
console.log(tree.find(12));
console.log('==========Find value in tree==========');

console.log(
  '==========Print tree into json file for watching easier=========='
);
try {
  fs.writeFileSync(
    `${path.resolve()}/JS Algorithms & Data Structures/Binary Search Trees/bst-example.json`,
    JSON.stringify(tree),
    'utf8'
  );

  console.log('Saved!');
} catch (e) {
  throw new Error(e);
}
console.log(
  '==========Print tree into json file for watching easier=========='
);
