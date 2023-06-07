// @ts-nocheck
import { Node } from '../../index.js';

/**
 * Pseudocode - Pushing
 *
 * 1. This function should accept a value
 * 2. Create a new node using the value passed to the function
 * 3. If there is no head property on the list, set the head and tail to be the newly created node
 * 4. Otherwise, set the next property on the tail to be the new node and set the tail property on the list to be the newly created node
 * 5. Increment the length by one
 */
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * This function adds a new node with a given value to the end of a linked list.
   *
   *  * Pseudocode - Pushing
   *
   * 1. This function should accept a value
   * 2. Create a new node using the value passed to the function
   * 3. If there is no head property on the list, set the head and tail to be the newly created node
   * 4. Otherwise, set the next property on the tail to be the new node and set the tail property on the list to be the newly created node
   * 5. Increment the length by one
   *
   * @param value - The value parameter represents the value of the node that needs to be added to the
   * end of the linked list.
   * @returns The updated linked list is being returned.
   */
  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  /**
   * This function removes the last element from a linked list and updates the tail pointer.
   *
   * Pseudocode - Popping
   *
   * 1. If there are no nodes in the list, return `undefined`
   * 2. Loop through the list until reach the tail
   * 3. Set the next property of the 2nd to last node to be `null`
   * 4. Set the tail to be the 2nd to last node
   * 5. Decrement the length of the list by 1
   * 6. Return the value of the node removed
   *
   * @returns The `pop()` method is returning the node that was removed from the end of the linked list.
   */
  pop() {
    if (!this.head) return undefined;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }
}

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
