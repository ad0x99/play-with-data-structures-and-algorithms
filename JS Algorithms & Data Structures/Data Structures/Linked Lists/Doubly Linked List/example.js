// @ts-nocheck
import { DoublyLinkedList } from './doubly-linked-list.js';

const list = new DoublyLinkedList();

console.log('======Push======');
list.push(15);
list.push(99);
list.push(45);
list.push(20);

console.log(list);
list.print();

console.log(`head: ${list.head.value}`);
console.log(`tail: ${list.tail.value}`);
console.log(`head.next: ${list.head.next.value}`);
console.log(`tail.previous: ${list.tail.previous.value}`);
console.log('======Push======');
