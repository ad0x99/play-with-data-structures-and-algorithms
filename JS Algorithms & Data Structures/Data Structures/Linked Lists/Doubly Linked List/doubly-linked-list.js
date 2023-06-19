// @ts-nocheck
import { DoublyNode } from '../../index.js';

export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * This is a method to add a new node to the end of a doubly linked list.
   *
   * Pseudocode - Push
   *
   * 1. Create a new node with the value as a argument
   * 2. If the head property is `null`, set the head and tail to be the newly created node
   * 3. Otherwise, set the `next` property on the tail to be that node
   * 4. Set the previous property on the newly created node to be the tail
   * 5. Set the tail to be the newly created node
   * 6. Return the doubly linked list
   *
   * @param value - The value to be added to the end of the doubly linked list.
   * @returns The `push` method is returning the updated instance of the DoublyLinkedList class, which
   * allows for method chaining.
   */
  push(value) {
    const newNode = new DoublyNode(value);

    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }

  /**
   *
   */
  /**
   * This is a pop function that removes the last node from a doubly linked list.
   *
   * Pseudocode - Pop
   *
   * 1. If there is no head, return undefined
   * 2. Store the current tail in a temporary variable
   * 3. If the length is 1, set the head and tail to be null
   * 4. Otherwise, update the tail to be the previous node
   * 5. Set the new tail's next to null
   * 6. Decrement the length
   * 7. Return the removed value
   *
   * @returns The `pop()` method is returning the node that was removed from the end of the doubly linked
   * list.
   */
  pop() {
    if (!this.head) return undefined;

    let poppedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.previous;
      this.tail.next = null;
    }

    this.length--;
    return poppedNode;
  }

  /**
   * This function prints the values of a doubly linked list as an array.
   */
  print() {
    let array = [];
    let current = this.head;

    while (current) {
      array.push(current.value);
      current = current.next;
    }

    console.log('Doubly Linked List as Array: ', array);
  }
}
