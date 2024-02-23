import { MaxBinaryHeap } from './max-binary-heap.js';
import { PriorityQueue } from './priority-queue.js';

console.log('*************Start - Max Binary Heap*************');
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
console.log('*************End - Max Binary Heap*************');

console.log('*************Start - Priority Queue*************');
let hospitalEmergency = new PriorityQueue();

console.log('==========Enqueue - Min Binary Heap==========');
hospitalEmergency.enqueue('common cold', 1);
hospitalEmergency.enqueue('gunshot wound', 5);
hospitalEmergency.enqueue('high fever', 4);
hospitalEmergency.enqueue('broken arm', 2);
hospitalEmergency.enqueue('glass in foot', 3);
console.log(hospitalEmergency);
console.log('==========Enqueue - Min Binary Heap==========');

console.log('==========Dequeue - Min Binary Heap==========');
hospitalEmergency.dequeue();
console.log(hospitalEmergency);
console.log('==========Dequeue - Min Binary Heap==========');
console.log('*************End - Priority Queue*************');
