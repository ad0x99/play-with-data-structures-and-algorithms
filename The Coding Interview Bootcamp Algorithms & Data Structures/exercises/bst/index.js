// --- Directions
// 1) Implement the Node class to create
// a binary search tree.  The constructor
// should initialize values 'data', 'left',
// and 'right'.
// 2) Implement the 'insert' method for the
// Node class.  Insert should accept an argument
// 'data', then create an insert a new node
// at the appropriate location in the tree.
// 3) Implement the 'contains' method for the Node
// class.  Contains should accept a 'data' argument
// and return the Node in the tree with the same value.

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }

/**
 * If the data is less than the current node's data, and there is a left node, then insert the data
 * into the left node. Otherwise, if the data is less than the current node's data, then create a new
 * node with the data as the left node. Otherwise, if the data is greater than the current node's data,
 * and there is a right node, then insert the data into the right node. Otherwise, if the data is
 * greater than the current node's data, then create a new node with the data as the right node
 * @param data - the data to be inserted
 */
  insert(data) {
    if (data < this.data && this.left) {
      this.left.insert(data);
    } else if (data < this.data) {
      this.left = new Node(data);
    } else if (data > this.data && this.right) {
      this.right.insert(data);
    } else if (data > this.data) {
      this.right = new Node(data);
    }
  }

/**
 * If the data is equal to the current node's data, return the current node. Otherwise, if the data is
 * greater than the current node's data, search the right subtree. Otherwise, search the left subtree
 * @param data - the data we're looking for
 * @returns The node that contains the data.
 */
  contains(data) {
    if (data === this.data) {
      return this;
    }

    if (this.data < data && this.right) {
      return this.right.contains(data);
    } else if (this.data > data && this.left) {
      return this.left.contains(data);
    }

    return null;
  }
}

module.exports = Node;
