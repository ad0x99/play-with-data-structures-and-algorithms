// --- Directions
// Implement classes Node and Linked Lists
// See 'directions' document

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * We're inserting a new node at the beginning of the linked list
   * @param data - the data to be inserted
   */
  insertFirst(data) {
    // this.head = new Node(data, this.head);
    this.insertAt(data, 0);
  }

  /**
   * Start at the head, count up until you reach the end.
   * @returns The size of the linked list.
   */
  size() {
    let node = this.head;
    let counter = 0;

    while (node) {
      counter++;
      node = node.next;
    }

    return counter;
  }

  /**
   * It returns the first node in the linked list
   * @returns The first node in the linked list.
   */
  getFirst() {
    // return this.head;
    return this.getAt(0);
  }

  /**
   * If there is no head, return null. Otherwise, start at the head and loop through the list until you
   * find the last node. Return the last node.
   * @returns The last node in the linked list.
   */
  getLast() {
    // if (!this.head) {
    //   return null;
    // }

    // let node = this.head;
    // while (node) {
    //   if (!node.next) {
    //     return node;
    //   }

    //   node = node.next;
    // }

    // return node;
    return this.getAt(this.size() - 1);
  }

  /**
   * We set the head to null, which means that the list is now empty
   */
  clear() {
    this.head = null;
  }

  /**
   * If there is no head, return. Otherwise, set the head to the current head's next node
   * @returns The head of the linked list.
   */
  removeFirst() {
    if (!this.head) {
      return;
    }

    this.head = this.head.next;
  }

  /**
   * Loop through the list until you find the last node, then set the second to last node's next to null.
   * @returns The last node in the list.
   */
  removeLast() {
    if (!this.head) {
      return;
    }

    if (!this.head.next) {
      this.head = null;
      return;
    }

    let previous = this.head;
    let node = this.head.next;
    while (node.next) {
      previous = node;
      node = node.next;
    }

    previous.next = null;
  }

  /**
   * If there is a last node, set its next to a new node, otherwise set the head to a new node
   * @param data - the data to be inserted into the list
   */
  insertLast(data) {
    let last = this.getLast();
    if (last) {
      last.next = new Node(data);
    } else {
      this.head = new Node(data);
    }
  }

  /**
   * "Loop through the linked list until you find the node at the given index."
   *
   * The function starts by setting a node variable to the head of the linked list. It also sets a
   * counter variable to 0
   * @param index - The index of the node you want to get.
   * @returns The node at the index.
   */
  getAt(index) {
    let node = this.head;
    let counter = 0;

    while (node) {
      if (counter === index) {
        return node;
      }

      counter++;
      node = node.next;
    }

    return null;
  }

  /**
   * If the index is 0, set the head to the next node. Otherwise, get the previous node and set its next
   * to the next node
   * @param index - The index of the node we want to remove.
   * @returns The value of the node at the given index.
   */
  removeAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
    }

    let previous = this.getAt(index - 1);

    if (!previous || !previous.next) {
      return;
    }

    previous.next = previous.next.next;
  }

  /**
   * If the index is 0, set the head to a new node with the data and the current head. Otherwise, set the
   * next property on the node that's at the previous index to be a new node with the data and the next
   * property of the previous node
   * @param data - the data to be inserted
   * @param index - the index of the node we want to insert at
   * @returns The node at the given index.
   */
  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
      return;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return;
    }

    let previous = this.getAt(index - 1) || this.getLast();
    let node = new Node(data, previous.next);

    previous.next = node;
  }

  /**
   * "Iterate over the list, calling the given function with each node and its index."
   *
   * The function takes a function as an argument. It then iterates over the list, calling the given
   * function with each node and its index
   * @param fn - the function that will be called on each node.
   */
  forEach(fn) {
    let node = this.head;
    let counter = 0;

    while (node) {
      fn(node, counter);
      node = node.next;
      counter++;
    }
  }

  /**
   * "While there is a node, yield the node and then move on to the next node."
   *
   * The *[Symbol.iterator]() function is a generator function. It uses the yield keyword to return the
   * value of node to the caller
   */
  *[Symbol.iterator]() {
    let node = this.head;

    while (node) {
      yield node;
      node = node.next;
    }
  }
}

export { Node, LinkedList };
