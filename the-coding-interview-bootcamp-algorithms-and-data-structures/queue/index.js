// --- Description
// Create a queue data structure.  The queue
// should be a class with methods 'add' and 'remove'.
// Adding to the queue should store an element until
// it is removed
// --- Examples
//     const q = new Queue();
//     q.add(1);
//     q.remove(); // returns 1;

/* A queue is a data structure that allows you to add elements to the beginning of the queue and remove
elements from the end of the queue. */
class Queue {
  constructor() {
    this.data = [];
  }

  add(element) {
    this.data.unshift(element);
  }

  remove() {
    return this.data.pop();
  }
}

module.exports = Queue;
