import { MaxBinaryHeap } from './max-binary-heap.js';

let maxBinaryHeap = new MaxBinaryHeap();

console.log('==========Insert - Max Binary Heap==========');
maxBinaryHeap.insert(41);
maxBinaryHeap.insert(39);
maxBinaryHeap.insert(33);
maxBinaryHeap.insert(18);
maxBinaryHeap.insert(27);
maxBinaryHeap.insert(12);
maxBinaryHeap.insert(55);
console.log(maxBinaryHeap);
console.log('==========Insert - Max Binary Heap==========');

console.log('==========Remove (extractMax) - Max Binary Heap==========');
maxBinaryHeap.extractMax();
console.log(`Removed Value: ${maxBinaryHeap.extractMax()}`);
console.log(maxBinaryHeap);
console.log('==========Remove (extractMax) - Max Binary Heap==========');
