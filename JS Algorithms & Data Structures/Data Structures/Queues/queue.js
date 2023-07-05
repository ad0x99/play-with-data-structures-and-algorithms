// @ts-nocheck
import { Node } from '../index.js';

/**
 * Queue with Class Implementation
 */
export class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /**
   * The enqueue function adds a new node with a given value to the end of a queue.
   *
   * Pseudocode - Enqueue
   *
   * 1. This function accepts some value
   * 2. Create a new node using the given value
   * 3. If there are node nodes in the queue, set this node to be the first and last properties of the queue
   * 4. Otherwise, set the next property on the current last to be the new node, and set the last property of the queue to be that node
   * 5. Increment the size of the queue by 1 and return
   *
   * @param value - The value parameter represents the value of the node that is being added to the
   * queue.
   * @returns The size of the queue after the new node has been enqueued.
   */
  enqueue(value) {
    let newNode = new Node(value);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    return ++this.size;
  }

  /**
   * The `dequeue()` function removes and returns the value of the first element in a queue.
   *
   * Pseudocode - Dequeue
   *
   * 1. If there is no first property, return `null`
   * 2. Store the first property in a variable
   * 3. If the first is the same as the last (to check if there is only one node), then set the first and last to be null
   * 4. If there is more than 1 node, set the first property to be the next property of first node
   * 5. Decrement the size by 1 and return the value of the dequeued node
   *
   * @returns The value of the dequeued element is being returned.
   */
  dequeue() {
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
