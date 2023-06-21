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

console.log('======Pop======');
list.pop();

console.log(list);
list.print();

console.log(`head: ${list.head.value}`);
console.log(`tail: ${list.tail.value}`);
console.log(`head.next: ${list.head.next.value}`);
console.log(`tail.previous: ${list.tail.previous.value}`);
console.log('======Pop======');

console.log('======Shift======');
list.shift();

console.log(list);
list.print();

console.log(`head: ${list.head.value}`);
console.log(`tail: ${list.tail.value}`);
console.log(`head.next: ${list.head.next.value}`);
console.log(`tail.previous: ${list.tail.previous.value}`);
console.log('======Shift======');

console.log('======Unshift======');
list.unshift(24);

console.log(list);
list.print();

console.log(`head: ${list.head.value}`);
console.log(`tail: ${list.tail.value}`);
console.log(`head.next: ${list.head.next.value}`);
console.log(`tail.previous: ${list.tail.previous.value}`);
console.log('======Unshift======');

console.log('======Get======');
const getFirstItem = list.get(0);
const getLastItem = list.get(2);

console.log(`getFirstItem: ${getFirstItem.value}`);
console.log(`getLastItem: ${getLastItem.value}`);
list.print();

console.log(`head: ${list.head.value}`);
console.log(`tail: ${list.tail.value}`);
console.log(`head.next: ${list.head.next.value}`);
console.log(`tail.previous: ${list.tail.previous.value}`);
console.log('======Get======');
