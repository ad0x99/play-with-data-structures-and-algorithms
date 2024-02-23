// @ts-nocheck
import { Node } from '../../index.js';

export class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * This function adds a new node with a given value to the end of a linked list.
   *
   *  * Pseudocode - Push
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

  /**
   * This function inserts a new node with a given value at a specified index in a linked list.
   *
   * Pseudocode - Insert
   *
   * 1. This function should accept a value and an index
   * 2. If the index is less than 0 or greater than the length, return false
   * 3. If the index is the same as the length, push a new node to the end of the list
   * 4. If the index is 0, `unshift` a new node to start of the list
   * 5. Otherwise, using the `get` method, access the node at the index -1
   * 6. Set the next property on that node to be the new node
   * 7. Set the next property on the new node to be the previous next
   * 8. Increment the length and return true
   *
   * @param index - The index at which the new value should be inserted in the linked list.
   * @param value - The value to be inserted into the linked list.
   * @returns The method is returning a boolean value indicating whether the insertion was successful or
   * not. It returns `true` if the insertion was successful and `false` if the index is out of bounds.
   */
  insert(index, value) {
    if (index < 0 || index >= this.length) return false;

    if (index === this.length) return this.push(value);
    if (index === 0) return this.unshift(value);

    const newNode = new Node(value);
    let previous = this.get(index - 1);
    let temp = previous.next;
    previous.next = newNode;
    newNode.next = temp;
    this.length++;
    return true;
  }

  /**
   * This function removes a node from a linked list at a specified index.
   *
   * Pseudocode - Remove
   *
   * 1. If the index is less than zero or greater than the length, then return undefined
   * 2. If the index is the same as the length - 1, `pop`
   * 3. If the index is 0, `shift`
   * 4. Otherwise, using `get` method, access the node at the index `-1`
   * 5. Set the next property on that node to be the next of the next node
   * 6. Decrement the length
   * 7. Return the removed value
   *
   * @param index - The index parameter represents the index of the node to be removed from the linked
   * list.
   * @returns The method is returning the node that was removed from the linked list. If the index is
   * invalid (less than 0 or greater than or equal to the length of the list), the method returns
   * undefined. If the index is the last index of the list, the method removes and returns the last node
   * using the pop() method. If the index is the first index of the list, the method removes
   */
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === this.length) return this.shift();
    if (index === this.length - 1) return this.pop();

    let previousNode = this.get(index - 1);
    let removed = previousNode.next;
    previousNode.next = removed.next;
    this.length--;
    return removed;
  }

  /**
   * This function reverses the order of a linked list.
   *
   * Pseudocode - Reverse
   *
   * 1. Swap the head and tail
   * 2. Create a variable to keep track next value which is called `next`
   * 3. Create a variable to keep track previous value which is called `previous`
   * 4. Create a variable called node and initialize it to the head property
   * 5. Loop through the list
   * 6. Set next to be the `next` property on whatever node is
   * 7. Set the next property on the node to be whatever `previous` is
   * 8. Set `previous` to be the value of the node variable
   * 9. Set the node variable to be the value of the `next` variable
   *
   * @returns The updated linked list with its nodes reversed is being returned.
   */
  reverse() {
    let currentNode = this.head;
    this.head = this.tail;
    this.tail = currentNode;

    let next;
    let previous = null;

    for (let i = 0; i < this.length; i++) {
      next = currentNode.next;
      currentNode.next = previous;
      previous = currentNode;
      currentNode = next;
    }

    return this;
  }

  /**
   * The function prints the values of a linked list in an array format.
   */
  print() {
    let array = [];
    let current = this.head;

    while (current) {
      array.push(current.value);
      current = current.next;
    }

    console.log(array);
  }
}
