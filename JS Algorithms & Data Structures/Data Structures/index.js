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

/**
 * The function takes a linked list and a name as input, and returns a string representation of the
 * linked list as an array.
 * @param head - The `head` parameter is the starting node of a linked list.
 * @param dsName - The `dsName` parameter represents the name of the data structure that you want to
 * print.
 * @returns a string that represents the given data structure (dsName) as an array. The array contains
 * the values of each node in the linked list starting from the head node.
 */
export const printAsArray = (head, dsName) => {
  let array = [];
  let current = head;

  while (current) {
    array.push(current.value);
    current = current.next;
  }

  console.log(`${dsName} as Array:`, array);
  return;
};
