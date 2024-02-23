// --- Directions
// 1) Complete the task in weave/queue.js
// 2) Implement the 'weave' function.  Weave
// receives two queues as arguments and combines the
// contents of each into a new, third queue.
// The third queue should contain the *alteration* content
// of the two queues.  The function should handle
// queues of different lengths without inserting
// 'undefined' into the new one.
// *Do not* access the array inside of any queue, only
// use the 'add', 'remove', and 'peek' functions.
// --- Example
//    const queueOne = new Queue();
//    queueOne.add(1);
//    queueOne.add(2);
//    const queueTwo = new Queue();
//    queueTwo.add('Hi');
//    queueTwo.add('There');
//    const q = weave(queueOne, queueTwo);
//    q.remove() // 1
//    q.remove() // 'Hi'
//    q.remove() // 2
//    q.remove() // 'There'

import Queue from './queue.js';

/**
 * "While there are still elements in either source queue, add the next element from each queue to the
 * new queue."
 *
 * The function starts by creating a new queue, q. It then enters a while loop that will continue to
 * run as long as there are elements in either source queue
 * @param sourceOne - a Queue instance
 * @param sourceTwo - a Queue instance
 * @returns A new queue that is a combination of the two queues.
 */
const weave = (sourceOne, sourceTwo) => {
  const q = new Queue();

  while (sourceOne.peek() || sourceTwo.peek()) {
    if (sourceOne.peek()) {
      q.add(sourceOne.remove());
    }

    if (sourceTwo.peek()) {
      q.add(sourceTwo.remove());
    }
  }

  return q;
};

export { weave };
