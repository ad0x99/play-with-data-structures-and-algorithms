import { printAsArray } from '../index.js';
import { Queue } from './queue.js';

let queue = new Queue();

console.log('============Enqueue============');
queue.enqueue(10);
queue.enqueue(11);
queue.enqueue(12);
queue.enqueue(13);

console.log(queue);
printAsArray(queue.first, 'Queue');
console.log('============Enqueue============');

console.log('============Dequeue============');
console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue);
printAsArray(queue.first, 'Queue');
console.log('============Dequeue============');
