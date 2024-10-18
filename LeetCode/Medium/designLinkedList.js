/**
 * https://leetcode.com/problems/design-linked-list/
 */

const Node = function (val) {
  this.val = val;
  this.next = null;
};

// Initialize empty linked list
const MyLinkedList = function () {
  this.head = null;
  this.tail = null;
  this.length = 0;
};

/**
 * Get node at specified index
 *
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function (index) {
  if (index < 0 || index > this.length - 1 || this.length === 0) return -1;

  let counter = 0;
  let current = this.head;

  while (counter !== index) {
    current = current.next;
    counter++;
  }

  return current.val;
};

/**
 * Add a new node to the beginning of the linked list
 *
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function (val) {
  const newNode = new Node(val);

  if (!this.head) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    newNode.next = this.head;
    this.head = newNode;
  }

  this.length++;
  return this;
};

/**
 * Add a new node to the end of the linked list
 *
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function (val) {
  const newNode = new Node(val);

  if (!this.head) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

  this.length++;
  return this;
};

/**
 * Add a new node to specified index of the linked list
 *
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function (index, val) {
  if (index > this.length) return;
  if (index <= 0) return this.addAtHead(val);
  if (index === this.length) return this.addAtTail(val);

  const newNode = new Node(val);
  let current = this.head;
  for (let i = 0; i < index - 1; i++) {
    current = current.next;
  }

  let currentNext = current.next;
  newNode.next = currentNext;
  current.next = newNode;
  this.length++;
  return this;
};

/**
 * Remove a node from specified index of the linked list
 *
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function (index) {
  if (index >= this.length || index < 0) return;
  if (index === 0) {
    this.head = this.head.next;
    this.length--;
    return this;
  }

  let counter = 0;
  let current = this.head;

  while (counter !== index - 1) {
    current = current.next;
    counter++;
  }

  let nextValue = current.next.next;
  current.next = nextValue ? nextValue : null;
  if (!current.next) {
    this.tail = current;
  }

  this.length--;
  return this;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
