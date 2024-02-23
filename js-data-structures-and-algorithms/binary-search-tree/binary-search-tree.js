// @ts-nocheck
import { BSTNode } from '../data-structures/index.js';

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * The insert function adds a new node with the given value to a binary search tree.
   *
   * Pseudocode - Insert
   *
   * 1. Create a new node
   * 2. Start at the root
   * 3. If there is no root, assign the root to be that new node
   * 4. If there is a root, check if the value of the new node is greater than or less than the value of the root
   * 5. If it's greater, check to see if there is a node to the right
   * 5.1 If there is, move to that node and  repeat these steps
   * 5.3 If there is not, add that node as the right property
   * 6. If it's less, check to see if there is a node to the left
   * 6.1 If there is, move to that node and repeat these steps
   * 6.2 If there is not, add that node as the left property
   *
   * @param value - The value parameter represents the value that needs to be inserted into the binary
   * search tree.
   * @returns The `insert` method returns the instance of the binary search tree (`this`).
   */
  insert(value) {
    let newNode = new BSTNode(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;
    while (true) {
      if (value === current.value) return undefined;

      /**
       * This code block is checking if the value of the
       * new node is less than the value of the current
       * node in the binary search tree. If it is, it check
       * if there is a node to the left of the current node
       * If there is no node to the left, it assigns the new
       * node as the left property of the current node and
       * returns the binary search tree instance. If there is a node to the left, it moves to that node and repeats
       * the steps. This ensures that the new node is active
       * in the binary search tree inserted in the
       * correct position in the binary search tree based on
       * its value.
       */
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return this;
        } else {
          current = current.left;
        }
      } else if (value > current.value) {
        /**
         * This code block is checking if there is a node to
         * the right of the current node in the binary search
         * tree. If there is no node to the right, it assigns
         * the new node as the right property of the current
         * node and returns the binary search tree instance.
         * If there is a node to the right, it moves to that
         * node and repeats the steps. This ensures that the
         * new node is inserted in the correct position in the
         * binary search tree based on its value.
         */
        if (!current.right) {
          current.right = newNode;
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /**
   * The function finds a value in a binary search tree and returns it if found, or null if not found.
   *
   * Pseudocode - Find
   *
   * 1. Start at the root of the binary search tree
   * 2. If there is no root, return `null`
   * 3. If there is a root, check if the value of the new node equals the value of root, return found value
   * 4. If not, check to see if the value is greater than or less than the value of the root
   * 5. If it's greater, check to see if there is a node to the right
   * 5.1 If there is, move to that node and repeat these steps
   * 5.2 If there is not, return `null`
   * 6. If it's less, check to see if there is a node to the left
   * 6.1 If there is, move to that node and repeat these steps
   * 6.2 If there is not, return `null`
   *
   * @param value - The value parameter represents the value that we are searching for in the binary
   * search tree.
   * @returns The value of the node that matches the given value, or null if no matching node is found.
   */
  find(value) {
    if (!this.root) return null;

    let current = this.root;
    let found = null;

    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = current.value;
      }
    }

    return found;
  }

  /**
   * The bfs function performs a breadth-first search traversal on a binary tree and returns an array of the values of all the nodes in the
   * tree.
   *
   * Pseudocode - Breadth First Search (Iteratively Approach)
   *
   * 1. Create a queue (or array) and a variable to store the values of visited nodes
   * 2. Place the root node in the queue
   * 3. If has node in the queue, loop through the queue
   * 4. Dequeue a node from the queue and push the value of the node into the variable that stores the nodes
   * 5. If there is left property on the dequeued node, then add it to the queue
   * 6. If there is right property on the dequeued node, then add it to the queue
   * 7. Return list of values
   *
   * @returns The `bfs()` function returns an array containing the values of all nodes in the binary
   * tree, traversed in breadth-first order.
   */
  bfs() {
    if (!this.root) return null;

    let node = this.root;
    let data = [];
    let queue = [];

    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      data.push(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return data;
  }

  /**
   * The `dfsPreOrder` function performs a depth-first search traversal on a binary tree and returns an array of node values in pre-order.
   *
   * Pseudocode - Depth First Search - PreOrder (Recursively Approach)
   *
   * 1. Create a variable to store the values of visited nodes
   * 2. Store the root of the BST in a variable
   * 3. Write a helper function which accepts a node
   * 4. Push the value of the node to the variable that store the values
   * 5. If the node has a left property, call the helper function with the left property on the node
   * 6. If the node has a right property, call the helper function with the right property on the node
   * 7. Invoke the helper function with the current variable
   * 8. Return the array of values
   *
   * @returns The `dfsPreOrder()` function returns an array containing
   * the values of the nodes in the binary tree in pre-order traversal
   * order.
   */
  dfsPreOrder() {
    let data = [];
    let current = this.root;

    const traverse = (node) => {
      data.push(node.value);

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(current);
    return data;
  }

  /**
   * The `dfsPostOrder` function performs a post-order traversal on a  binary tree and returns an array of the node values.
   *
   * Pseudocode - Depth First Search - PostOrder (Recursively Approach)
   *
   * 1. Create a variable to store the values of visited nodes
   * 2. Store the root of the BST in a variable
   * 3. Write a helper function which accepts a node
   * 4. Push the value of the node to the variable that store the values
   * 5. If the node has a left property, call the helper function with the left property on the node
   * 6. If the node has a right property, call the helper function with the right property on the node
   * 7. Push the value of the node to the variable that store the visited
   * values
   * 8. Invoke the help function with the current variable
   * 9. Return the array of values
   *
   * @returns The `dfsPostOrder()` function returns an array containing the values of the nodes in the
   * binary tree in post-order traversal.
   */
  dfsPostOrder() {
    let data = [];
    let current = this.root;

    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }

      data.push(node.value);
    };

    traverse(current);
    return data;
  }

  /**
   * The `dfsInOrder` function performs a depth-first search on a binary tree and returns the values of the nodes in the tree in in-order traversal.
   *
   * Pseudocode - Depth First Search - InOrder (Recursively Approach)
   *
   * 1. Create a variable to store the values of visited nodes
   * 2. Store the root of the BST in a variable
   * 3. Write a helper function which accepts a node
   * 4. Push the value of the node to the variable that store the values
   * 5. If the node has a left property, call the helper function with the left property on the node
   * 6. Push the value of the node to the variable that store the visited
   * values
   * 7. If the node has a right property, call the helper function with the right property on the node
   * 8. Invoke the help function with the current variable
   * 9. Return the array of values
   *
   * @returns The `dfsInOrder()` function returns an array containing the values of the nodes in the
   * binary tree in in-order traversal order.
   */
  dfsInOrder() {
    let data = [];
    let current = this.root;

    const traverse = (node) => {
      /* The line `node.left && traverse(node.left);` is using the logical AND operator (`&&`) to check
      if the `node.left` property exists. If `node.left` is truthy (i.e., it exists), then the `traverse` function is called recursively with `node.left` as the argument. This line of code is a shorthand way of checking if the left child node exists before traversing it. */
      node.left && traverse(node.left);
      data.push(node.value);
      node.right && traverse(node.right);
    };

    traverse(current);
    return data;
  }
}
