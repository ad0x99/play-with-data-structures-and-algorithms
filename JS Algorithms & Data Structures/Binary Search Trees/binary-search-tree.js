// @ts-nocheck
import { BSTNode } from '../Data Structures/index.js';

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
}
