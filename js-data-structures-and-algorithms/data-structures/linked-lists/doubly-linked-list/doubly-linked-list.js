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
   * This is a shift function that removes the first element from a doubly linked list and returns it.
   *
   * Pseudocode - Shift
   *
   * 1. If there is no node, return undefined
   * 2. Store the current head in the variable which is called `old head`
   * 3. If the length is 1, then set the head and tail to be null
   * 4. Otherwise, update the head to be the next of the old head
   * 5. Set the head's previous value to null
   * 6. Set the old head's next to null
   * 7. Decrement the length and return old head
   *
   * @returns The `shift()` method is returning the old head node that was removed from the doubly linked
   * list.
   */
  shift() {
    if (!this.length) return undefined;

    let oldHead = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.previous = null;
      oldHead.next = null;
    }

    this.length--;
    return oldHead;
  }

  /**
   * This function adds a new node to the beginning of a doubly linked list.
   *
   * Pseudocode - Unshift
   *
   * 1. Create a new node with the value passed to the function
   * 2. If the length is, then set the head and tail to be the new node
   * 3. Otherwise, set the previous node on the head of the list to be the new node
   * 4. Set the next node on the new node to be the head property
   * 5. Update the head to be the new node
   * 6. Increment the length and return the list
   *
   * @param value - The value to be added to the beginning of the doubly linked list.
   * @returns The `unshift` method is returning the updated doubly linked list instance (`this`).
   */
  unshift(value) {
    const newNode = new DoublyNode(value);

    if (!this.length) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;
    return this;
  }

  /**
   * This function retrieves a node from a doubly linked list based on its index.
   *
   * Pseudocode - Get
   *
   * 1. If the index is less than 0 or greater or equal to the length, return null
   * 2. If the index is less than or equal to half the length of the list, loop through the list starting from the head and loop towards the middle, then return the node once it's found
   * 3. If the index is greater than half of the length of the list, loop through the list starting from the tail and loop towards the middle, then return the node once it's found
   *
   * @param index - The index of the node to be retrieved from the doubly linked list.
   * @returns The method `get(index)` returns the node at the specified index in the doubly linked list.
   * If the index is out of range (less than 0 or greater than or equal to the length of the list), it
   * returns `null`.
   */
  get(index) {
    if (index < 0 || index >= this.length) return null;

    let count, current;
    const mid = Math.floor(this.length / 2);

    if (index <= mid) {
      count = 0;
      current = this.head;

      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      count = this.length - 1;
      current = this.tail;

      while (count !== index) {
        current = current.previous;
        count--;
      }
    }

    return current;
  }

  /**
   * The "set" function updates the value of a node at a given index in a doubly linked list.
   *
   * Pseudocode - Set
   *
   * 1. Create a variable which is the result of the `get` method at the index passed to the function
   * 2. If the `get` method returns a valid node, set the value of that node to be the value passed to the function
   * 3. Return true
   * 4. Otherwise, return false
   *
   * @param index - The index parameter is the position of the node in the linked list where the value
   * needs to be updated.
   * @param value - The new value that we want to set for the node at the specified index in the linked
   * list.
   * @returns The `set` method returns a boolean value. It returns `true` if the node at the specified
   * index is found and its value is updated successfully, and `false` if the node is not found.
   */
  set(index, value) {
    const foundNode = this.get(index);

    if (foundNode !== null) {
      foundNode.value = value;
      return true;
    }

    return false;
  }

  /**
   * This function inserts a new node with a given value at a specified index in a doubly linked list.
   *
   * Pseudocode - Insert
   *
   * 1. If the index is less than 0 or greater than or equal to the length of the list, then return false
   * 2. If the index is 0, `unshift`
   * 3. If the index is equal to the length of the list, `push`
   * 4. Otherwise, use the `get` method to access the index -1
   * 5. Set the next and previous properties on the correct nodes to link with new node
   * 6. Increment the length and return true
   *
   * @param index - The index at which the new value should be inserted in the Doubly Linked List.
   * @param value - The value to be inserted into the Doubly Linked List.
   * @returns The `insert` method returns a boolean value indicating whether the insertion was successful
   * or not. It returns `true` if the insertion was successful and `false` if the index is out of range.
   */
  insert(index, value) {
    if (index < 0 || index >= this.length) return false;
    if (index === 0) {
      return !!this.unshift(value);
    }
    if (index === this.length) {
      return !!this.push(value);
    }

    let newNode = new DoublyNode(value);
    let beforeNode = this.get(index - 1);
    let afterNode = beforeNode.next;

    if (beforeNode !== null) {
      beforeNode.next = newNode;
      newNode.previous = beforeNode;
      newNode.next = afterNode;
      afterNode.previous = newNode;
    }

    this.length++;
    return true;
  }

  /**
   * This function removes a node from a doubly linked list at a specified index.
   *
   * Pseudocode - Remove
   *
   * 1. If the index is less than 0 or greater than or equal to the length, return undefined
   * 2. If the index is 0, `shift`
   * 3. If the index equals the length - 1, `pop`
   * 4. Use the `get` method to retrieve the node to be removed
   * 5. Update the next and previous node to remove the found node from the list
   * 6. Set the next and previous node to null on the found node
   * 7. Decrement the length and return the removed node
   *
   * @param index - The index parameter in the remove method represents the index of the node that needs
   * to be removed from the doubly linked list.
   * @returns The method is returning the removed node from the doubly linked list. If the index is
   * invalid, it returns undefined. If the index is 0, it removes the first node and returns it. If the
   * index is the last node, it removes the last node and returns it. Otherwise, it removes the node at
   * the specified index and returns it.
   */
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift(index);
    if (index === this.length - 1) return this.pop(index);

    let removedNode = this.get(index);
    let beforeNode = removedNode.previous;
    let afterNode = removedNode.next;

    beforeNode.next = afterNode;
    afterNode.previous = beforeNode.next;

    removedNode.next = null;
    removedNode.previous = null;

    this.length--;
    return removedNode;
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
