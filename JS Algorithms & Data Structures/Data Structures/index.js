/**
 * The Node class represents a node in a linked list with a value and a reference to the next node.
 */
export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/* The DoublyNode class represents a node in a doubly linked list with a value, a reference to the next
node, and a reference to the previous node. */
export class DoublyNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}
