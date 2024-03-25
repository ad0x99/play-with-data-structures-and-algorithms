/**
 * You're given a Linked List with at least one node. Write a function that returns the middle node of the Linked List.
 *
 * If there are 2 middle nodes (i.e. an even length list), your function should return the second of these nodes.
 *
 * Each Linked List node has an integer value as well as a next node pointing to the next node in the list or to None / null if it's the tail of the list.
 *
 * Sample Input:
 * linkedList = 2 -> 7 -> 3 -> 5
 *
 * Sample Output:
 * // The middle could be 7 or 3
 * // We return the second middle node
 * 3 -> 5
 */
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

/**
 * Approach: The middle node is the node at the index of length / 2. What we're trying to do is to find the node that has the same index as the index at position of length / 2
 *
 * 1. We have to count the length of the list. In the first iteration, we iterate through the list and use a countLength variable to store the length of the list.
 * 2. We create a targetNodeIndex which holds the index at position of length / 2. We use Math.floor here because in the even list, we want the get the second middle node.
 * 3. In the second iteration, as long as there is a node
 * 4. If we found a node that has the same index as the target node index, that means we found the middle node, then we return it.
 * 5. Otherwise, we continue to iterate through the remaining list.
 *
 * Time complexity: O(n) - where n is the number of nodes in the linked list. This is because we iterate through the linked list twice - once to calculate the length of the list and once to find the middle node.
 *
 * Space complexity: O(1)
 *
 */
const middleNodeWithIterative = (linkedList) => {
  let countLength = 0;
  let currentNode = linkedList;

  while (currentNode !== null) {
    countLength++;
    currentNode = currentNode.next;
  }

  let targetNodeIndex = Math.floor(countLength / 2);
  let currentIndex = 0;
  currentNode = linkedList;

  while (currentNode) {
    if (currentIndex === targetNodeIndex) {
      return currentNode;
    }

    currentNode = currentNode.next;
    currentIndex++;
  }

  return null;
};

/**
 * Approach: Using two pointers technique, one fast and one slow. The slow and fast nodes will start at the same position, each iteration, the slow node will move once and the fast node will move twice.
 *
 * 1. Initialize the slow and fast nodes to be the first node in the list.
 * 2. Because the fast node will always be ahead the slow node, we just need to check, as long as the fast node still has the next node behind it.
 * 3. We move the slow node once and move the fast node twice.
 * 4. Because when the fast node is moved to the end or out of the list, at that point, the slow node will be at the middle of the list, then we just return the slow node which means the middle node of the list.
 *
 * Time complexity: O(n) - where n is the number of nodes in the linked list. Because we iterate through the linked list once.
 *
 * Space complexity: O(1) - because the algorithm only uses two pointers (slowNode and fastNode) regardless of the size of the linked list.
 *
 */
const middleNodeWithTwoPointers = (linkedList) => {
  let slowNode = linkedList;
  let fastNode = linkedList;

  while (fastNode.next) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next ? fastNode.next.next : fastNode.next;
  }

  return slowNode;
};
