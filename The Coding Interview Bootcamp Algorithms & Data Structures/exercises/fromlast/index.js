// --- Directions
// Given a linked list, return the element n spaces
// from the last node in the list.  Do not call the 'size'
// method of the linked list.  Assume that n will always
// be less than the length of the list.
// --- Examples
//    const list = new List();
//    list.insertLast('a');
//    list.insertLast('b');
//    list.insertLast('c');
//    list.insertLast('d');
//    fromLast(list, 2).data // 'b'

// Solution 1
/**
 * We create a slow pointer that moves one node at a time and a fast pointer that moves n nodes at a
 * time. When the fast pointer reaches the end of the list, the slow pointer will be at the node we're
 * looking for
 * @param list - the linked list
 * @param n - the number of nodes from the end of the list
 * @returns The node that is n nodes from the end of the list.
 */
const fromLast = (list, n) => {
  let slow = list.getFirst();
  let fast = list.getFirst();
  let node = list.getAt(n);

  while (fast.next) {
    fast = node;

    if (fast.next) {
      slow = slow.next;
      fast = fast.next;
    }
  }

  return slow;
};

// Solution 2
/**
 * "Move fast n nodes from the head, then move both pointers until fast reaches the end."
 * 
 * The above function is linear time and constant space
 * @param list - the linked list
 * @param n - the number of nodes from the end of the list
 * @returns The node that is n nodes from the end of the list.
 */
const fromLast2 = (list, n) => {
  let slow = list.getFirst();
  let fast = list.getFirst();

  while (n > 0) {
    fast = fast.next;
    n--;
  }

  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};

module.exports = fromLast;
