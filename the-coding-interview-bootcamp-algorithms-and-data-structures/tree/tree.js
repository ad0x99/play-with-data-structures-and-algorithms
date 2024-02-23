// --- Directions
// 1) Create a node class.  The constructor
// should accept an argument that gets assigned
// to the data property and initialize an
// empty array for storing children. The node
// class should have methods 'add' and 'remove'.
// 2) Create a tree class. The tree constructor
// should initialize a 'root' property to null.
// 3) Implement 'traverseBF' and 'traverseDF'
// on the tree class.  Each method should accept a
// function that gets called with each element in the tree

/* It creates a node with a data property and an array of children. It also has methods to add and
remove children */
export class Node {
  constructor(data) {
    this.data = data;
    this.children = [];
  }

  /**
   * Add a new node to the end of the children array.
   * @param data - The data that the node will hold.
   */
  add(data) {
    const node = new Node(data);
    this.children.push(node);
  }

  /**
   * It removes a node from the children array if the node's data matches the data passed in
   * @param data - the data that's stored in the node
   */
  remove(data) {
    this.children = this.children.filter((node) => {
      return node.data !== data;
    });
  }
}

export class Tree {
  constructor() {
    this.root = null;
  }

  // Breadth First Traversal
  /**
   * We create an array with the root node, then we loop through the array, shift the first node off the
   * array, push all of its children onto the array, and call the callback function on the node
   * @param fn - a function that will be called with each node in the tree.
   */
  traverseBF(fn) {
    const array = [this.root];

    while (array.length) {
      const node = array.shift();
      array.push(...node.children);

      fn(node);
    }
  }

  // Depth First Traversal
  /**
   * "We're going to traverse the tree in depth-first order, and for each node we encounter, we're going
   * to call the function fn on it."
   *
   * The function takes a function as an argument. This function will be called on each node as we
   * traverse the tree
   * @param fn - The function to call for each node.
   */
  traverseDF(fn) {
    const array = [this.root];

    while (array.length) {
      const node = array.shift();
      array.unshift(...node.children);
      fn(node);
    }
  }
}
