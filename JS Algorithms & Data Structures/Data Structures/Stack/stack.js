import { Node } from '../index.js';
/**
 * Stack with Class Implementation
 */

export class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /**
   * The `push` function adds a new node with the given value to the beginning of a stack.
   *
   * Pseudocode - Push
   *
   * 1. The function should accept a value
   * 2. Create a new node with that value
   * 3. If there are no nodes in the stack, set the first and last properties to be the newly created node
   * 4. If there is at least one node, create a variable that stores the current first property on the stack
   * 5. Reset the first property to be the newly created node
   * 6. Set the next property to be the previously created variable
   * 7. Increment the size of the stack by 1
   *
   * @param value - The value parameter represents the value that you want to add to the stack.
   * @returns The size of the stack after pushing the new value.
   */
  push(value) {
    const newNode = new Node(value);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      let temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }

    return ++this.size;
  }

  /**
   * The `pop()` function removes and returns the value of the first element in a stack.
   *
   * Pseudocode - Pop
   *
   * 1. If there are no nodes in the stack, return `null`
   * 2. Create a temporary variable to store the first property on the stack
   * 3. If there is only 1 node, set the first and last properties to be `null`
   * 4. If there is more than one node, set the first property to be the next property on the current first
   * 5. Decrement the size by 1
   * 6. Return the value of the node removed
   *
   * @returns The value of the node that is being removed from the beginning of the linked list.
   */
  pop() {
    if (!this.first) return null;

    let temp = this.first;

    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}
