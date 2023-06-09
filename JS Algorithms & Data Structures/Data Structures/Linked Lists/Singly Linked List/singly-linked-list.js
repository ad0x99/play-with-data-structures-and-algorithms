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

  /**
   * This is a shift function that removes the first element from a linked list and returns it.
   *
   * Pseudocode - Shift
   *
   * 1. If there are no nodes, return undefined
   * 2. Store the current head property in a variable
   * 3. Set the head property to be the current head's next property
   * 4. Decrement the length by 1
   * 5. Return the value of the node removed
   *
   * @returns The method `shift()` is returning the node that was removed from the beginning of the
   * linked list. If the linked list is empty, it returns `undefined`.
   */
  shift() {
    if (!this.head) return undefined;

    let currentHead = this.head;
    this.head = currentHead.next;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return currentHead;
  }

  /**
   * This function adds a new node with the given value to the beginning of a linked list.
   *
   * Pseudocode - Unshift
   *
   * 1. This function should accept a value
   * 2. Create a new node using the value passed to the function
   * 3. If there is no head property on the list, set the head and tail to be the newly created node
   * 4. Otherwise, set the newly created node's next property to be the current head property on the list
   * 5. Set the head property on the list to be that newly created node
   * 6. Increment the length of the list by 1
   * 7. Return the linked list
   *
   * @param value - The value parameter represents the value of the node that we want to add to the
   * beginning of the linked list.
   * @returns The updated linked list is being returned.
   */
  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  /**
   * This function retrieves the node at a specified index in a linked list.
   *
   * Pseudocode - Get
   *
   * 1. This function should accept an index
   * 2. If the index is less than zero or greater than or equal to the length of the list, return null
   * 3. Loop through the list until reach the index and return the node at that specific index
   *
   * @param index - The index parameter is the position of the node that we want to retrieve from the
   * linked list. It starts from 0 for the first node and goes up to length-1 for the last node.
   * @returns The `get(index)` method returns the node at the specified index position in the linked
   * list. If the index is out of range (less than 0 or greater than or equal to the length of the list),
   * it returns `null`.
   */
  get(index) {
    if (index < 0 || index >= this.length) return null;

    let counter = 0;
    let current = this.head;

    while (counter !== index) {
      current = current.next;
      counter++;
    }

    return current;
  }

  /**
   * This function sets the value of a node at a specific index in a data structure.
   *
   * Pseudocode - Set
   *
   * 1. This function should accept a value and an index
   * 2. Use `get` method to find the specific node
   * 3. If the node is not found, return false
   * 4. If the node is found, set the value of that node to be the value which passed to the function and return true
   *
   * @param index - The index parameter is the position of the node in the linked list where the value
   * needs to be updated.
   * @param value - The new value that we want to set for the node at the specified index in the linked
   * list.
   * @returns The `set` method returns a boolean value. It returns `true` if the node at the specified
   * index is found and its value is updated successfully, and `false` if the node is not found.
   */
  set(index, value) {
    let foundNode = this.get(index);

    if (foundNode) {
      foundNode.value = value;
      return true;
    }

    return false;
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
