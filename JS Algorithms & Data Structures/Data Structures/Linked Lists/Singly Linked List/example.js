import { SinglyLinkedList } from './singly-linked-list.js';

const list = new SinglyLinkedList();

console.log('=====Push=====');
list.push('Hello');
list.push('Thomas');
list.push('Is');
list.push('Me');

console.log(list);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Push=====');

console.log('=====Pop=====');
list.pop();
console.log(list);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Pop=====');

console.log('=====Shift=====');
list.shift();
console.log(list);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Shift=====');

console.log('=====Unshift=====');
list.unshift('Hi');
console.log(list);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Unshift=====');

console.log('=====Get=====');
const value = list.get(1);
console.log(value);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Get=====');

console.log('=====Set=====');
list.set(1, 'Anonymous');
console.log(list);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Set=====');

console.log('=====Insert=====');
list.insert(1, 'Mr Robot');
list.insert(2, 'Hacker');
console.log(list);
console.log(list.get(2));
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Insert=====');

console.log('=====Remove=====');
list.remove(1);
console.log(list);
console.log(`head: ${list.head?.value}`);
console.log(`tail: ${list.tail?.value}`);
console.log('=====Remove=====');

console.log('=====Reverse=====');
const newList = new SinglyLinkedList();

newList.push('This');
newList.push('is');
newList.push('reversed');
newList.push('linked ');
newList.push('list');

console.log(`List before reverse: ${newList.print()}`);

newList.reverse();
console.log(newList);
console.log(`List after reversed: ${newList.print()}`);
console.log(`head: ${newList.head?.value}`);
console.log(`tail: ${newList.tail?.value}`);
console.log('=====Reverse=====');
