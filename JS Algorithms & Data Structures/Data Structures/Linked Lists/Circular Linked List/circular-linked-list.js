import { Node } from '../../index.js';

export class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Add a new element to the end of the list
   */
  append(data) {
    const newNode = new Node(data);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode; // Circular link
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  /**
   * Insert a new element at a specific index
   */
  insertAt(index, data) {
    if (index < 0 || index > this.length) {
      throw new Error('Invalid index');
    }

    if (index === 0) {
      this.prepend(data);
    } else {
      const newNode = new Node(data);

      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }

      newNode.next = current.next;
      current.next = newNode;
      this.length++;

      // Update tail if inserting at the end
      if (index === this.length - 1) {
        this.tail = newNode;
      }
    }
  }

  /**
   * Prepend a new element to the beginning of the list
   */
  prepend(data) {
    const newNode = new Node(data);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode; // Circular link
    } else {
      newNode.next = this.head;
      this.tail.next = newNode;
      this.head = newNode;
    }

    this.length++;
  }

  /**
   * Remove the element at a specific index
   */
  removeAt(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Invalid index');
    }

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      let previous = null;

      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }

      if (previous === null) {
        this.head = current.next;
      } else {
        previous.next = current.next;
      }

      if (current === this.tail) {
        this.tail = previous;
      }
    }

    this.length--;
  }

  /**
   * Get the data at a specific index
   */
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Invalid index');
    }

    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current.data;
  }

  /**
   * Print the contents of the list
   */
  printList() {
    if (this.head === null) {
      console.log('List is empty');
      return;
    }

    let current = this.head;
    do {
      console.log(current.data);
      current = current.next;
    } while (current !== this.head);
  }
}
