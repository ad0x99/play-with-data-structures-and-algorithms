// --- Directions
// Implement a Queue data structure using two stacks.
// *Do not* create an array inside of the 'Queue' class.
// Queue should implement the methods 'add', 'remove', and 'peek'.
// For a reminder on what each method does, look back
// at the Queue exercise.
// --- Examples
//     const q = new Queue();
//     q.add(1);
//     q.add(2);
//     q.peek();  // returns 1
//     q.remove(); // returns 1
//     q.remove(); // returns 2

import Stack from './stack.js';

/* We use two stacks to implement a queue */
class Queue {
  constructor() {
    this.firstStack = new Stack();
    this.secondStack = new Stack();
  }

  /**
   * Add an element to the first stack.
   * @param element - the element to add to the queue
   */
  add(element) {
    this.firstStack.push(element);
  }

  /**
   * We pop all the elements from the first stack into the second stack, then pop the top element from
   * the second stack, and then push all the elements back into the first stack
   * @returns The element that was removed from the queue.
   */
  remove() {
    while (this.firstStack.peek()) {
      this.secondStack.push(this.firstStack.pop());
    }

    const element = this.secondStack.pop();
    return element;
  }

  /**
   * We pop all the elements from the first stack and push them into the second stack. Then we peek at
   * the top of the second stack
   * @returns The element at the top of the queue.
   */
  peek() {
    while (this.firstStack.peek()) {
      this.secondStack.push(this.firstStack.pop());
    }

    const element = this.secondStack.peek();
    return element;
  }
}

export default Queue;
