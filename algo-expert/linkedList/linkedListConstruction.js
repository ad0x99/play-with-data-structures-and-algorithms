/**
 * Write a DoublyLinkedList class that has a head and a tail, both of which point to either a linked list Node or None/null.
 *
 * The class should support:
 * Setting the head and tail of the linked list
 * Inserting nodes before and after other nodes as well as at given positions (the position of the head node is 1)
 * Removing given nodes and removing nodes with given values.
 * Searching for nodes with given values
 *
 * Note that the setHead, setTail, insertBefore, insertAfter, insertAtPosition, and remove methods all take in actual node as input parameters - not integers (except for insertAtPosition, which also takes in an integer representing the position). This means that you don't need to create any new Nodes in these methods. The input nodes can be either stand-alone nodes or nodes that are already in the linked list. If they're nodes that are already in the list, the methods will effectively be moving the nodes within the linked list. You won't be told of the input nodes are already in the linked list, so your code will have to defensively handle this scenario.
 *
 * Each Node has an integer value as well as a prev node and a next node, both of which can point to either another node or None/null.
 *
 * Sample Usage:
 * // Assume the following linked list has already been created
 * 1 <-> 2 <-> 3 <-> 4 <-> 5
 *
 * // Assume that we also have following stand-alone nodes
 * 3, 3, 6
 *
 * setHead(4): 4 <-> 1 <-> 2 <-> 3 <-> 5
 * setTail(6): 4 <-> 1 <-> 2 <-> 3 <-> 5 <-> 6
 * insertBefore(6, 3): 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6
 * insertAfter(6, 3): 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <-> 3
 * insertAtPosition(1, 3): 3 <-> 4 <-> 1 <-> 2 <-> 5 <-> 3 <-> 6 <-> 3
 * removeNodesWithValue(3): 4 <-> 1 <-> 2 <-> 5 <-> 6
 * remove(2): 4 <-> 1 <-> 5 <-> 6
 * containsNodeWithValue(5): true
 */

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // Time complexity: O(1) & Space complexity: O(1)
  setHead(node) {
    // If there is no head
    // Assign new node as head and tail
    if (this.head === null) {
      this.head = node;
      this.tail = node;
      return;
    }

    // Otherwise, push new node before the current head
    this.insertBefore(this.head, node);
  }

  // Time complexity: O(1) & Space complexity: O(1)
  setTail(node) {
    // If the tail is equal to null, that means, the list has only one head.
    // We set the current head to new node;
    if (this.tail === null) {
      this.setHead(node);
      return;
    }

    // Otherwise, we add the new node after the current tail
    this.insertAfter(this.tail, node);
  }

  // Time complexity: O(1) & Space complexity: O(1)
  insertBefore(node, nodeToInsert) {
    // If the new node is equal to either the current head or tail
    // We do nothing
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;

    // Otherwise, remove the new node from the list
    // Re-assign the pointer to add the new node right before the current node
    this.remove(nodeToInsert);
    nodeToInsert.prev = node.prev;
    nodeToInsert.next = node;

    // If the current node's prev is equal to null
    // It's mean we're in the head, re-assign the current head to point to new node
    // Otherwise, re-assign the pointer of prev node to point to the new node
    if (node.prev === null) {
      this.head = nodeToInsert;
    } else {
      node.prev.next = nodeToInsert;
    }

    // Redirect the current node prev's pointer to point to the new node
    node.prev = nodeToInsert;
  }

  // Time complexity: O(1) & Space complexity: O(1)
  insertAfter(node, nodeToInsert) {
    // If the new node is equal to either the current head or tail
    // We do nothing
    if (nodeToInsert === this.head && nodeToInsert === this.tail) return;

    // Otherwise, remove the new node from the list
    // Re-assign the pointer to add the new node right after the current node
    this.remove(nodeToInsert);
    nodeToInsert.prev = node;
    nodeToInsert.next = node.next;

    // If the current node's prev is equal to null
    // It's mean we're in the tail, re-assign the current tail to point to new node
    // Otherwise, re-assign the pointer of next node to point to the new node
    if (node.next === null) {
      this.tail = nodeToInsert;
    } else {
      node.next.prev = nodeToInsert;
    }

    // Redirect the current node next's pointer to point to the new node
    node.next = nodeToInsert;
  }

  // Time complexity: O(n) - n is number of node at each pos & Space complexity: O(1)
  insertAtPosition(position, nodeToInsert) {
    // If the position is equal to one, it's a head node
    // Set the current head node to the new node
    if (position === 1) {
      this.setHead(nodeToInsert);
      return;
    }

    // Otherwise, we iterate through the list to find the node at specified position
    let node = this.head;
    let currentPosition = 1;

    while (node !== null && currentPosition !== position) {
      node = node.next;
      currentPosition += 1;
    }

    // If the found node is not equal to null
    // We insert the new node right before the current node
    // Otherwise, if the found node is equal to null, it means it's a tail
    // We set the current tail to be the new node
    if (node !== null) {
      this.insertBefore(node, nodeToInsert);
    } else {
      this.setTail(nodeToInsert);
    }
  }

  // Time complexity: O(n) & Space complexity: O(1)
  removeNodesWithValue(value) {
    // Iterate through the list to find the node at specified position and remove it from the list
    let node = this.head;

    while (node !== null) {
      let nodeToRemove = node;
      node = node.next;

      if (nodeToRemove.value === value) {
        this.remove(nodeToRemove);
      }
    }
  }

  // Time complexity: O(1) & Space complexity: O(1)
  remove(node) {
    if (node === this.head) {
      this.head = this.head.next;
    }
    if (node === this.tail) {
      this.tail = this.tail.prev;
    }

    // Redirect the pointers of surrounding node
    // And remove the current node by remove its pointers
    this.removeNodeBindings(node);
  }

  // Time complexity: O(n) & Space complexity: O(1)
  containsNodeWithValue(value) {
    // Iterate through the list until we found the expected node
    let node = this.head;

    while (node !== null && node.value !== value) {
      node = node.next;
    }

    return node !== null;
  }

  // Time complexity: O(1) & Space complexity: O(1)
  removeNodeBindings(node) {
    // Redirect surrounding node to point to new node
    // Because the current node will be removed
    if (node.prev !== null) {
      node.prev.next = node.next;
    }
    if (node.next !== null) {
      node.next.prev = node.prev;
    }

    // Remove pointers of the current node
    node.prev = null;
    node.next = null;
  }
}
