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

/**
 * The BSTNode class represents a node in a binary search tree with a value, left child, and right
child.
 */
export class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/* The PriorityNode class represents a node with a value and priority in a priority queue. */
export class PriorityNode {
  constructor(value, priority) {
    this.value = value;
    this.priority = priority;
  }
}
