/**
 * Write a function that takes in the head of a Singly Linked List and returns a boolean representing whether the linked lists's nodes from a palindrome. Your function shouldn't make use of any auxiliary data structure.
 *
 * A palindrome is usually defined as a string that's written the same forward and backward. For a linked list's nodes to form a palindrome, their values must be the same when read from the left to right and from the right to left. Note that single-character strings are palindromes, which means that single-node linked lists from palindromes.
 *
 * Each Linked List node has an integer value as well as a next node pointing to the next node in the list of to None/null if it's the tail of the list.
 *
 * You can assume that the input linked list will always have at least one node; in other words, the head will never be Node/null.
 *
 * Sample Input:
 * head = 0 -> 1 -> 2 -> 2 -> 1 -> 0 // the head node with value 0
 *
 * Sample Output:
 * true
 */
class LinkedList {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListInfo {
  constructor(outerNodesAreEqual, leftNodeToCompare) {
    this.outerNodesAreEqual = outerNodesAreEqual;
    this.leftNodeToCompare = leftNodeToCompare;
  }
}

/**
 *  Approach: Using recursion and an extra Linked List to validate each pair of node with each reversion result
 *
 * Time complexity: O(n), where n is the number of nodes in the linked list. This is because we recursively traverse through the linked list once, comparing nodes from the left and right ends towards the center.
 *
 * Space complexity: O(n) due to the recursive calls on the call stack. In the worst case scenario, the call stack can grow to a depth of n, where n is the number of nodes in the linked list.
 */
const linkedListPalindrome = (head) => {
  let isPalindromeResults = isPalindrome(head, head);
  return isPalindromeResults.outerNodesAreEqual;
};

const isPalindrome = (leftNode, rightNode) => {
  if (rightNode === null) {
    return new LinkedListInfo(true, leftNode);
  }

  let recursiveCallResults = isPalindrome(leftNode, rightNode.next);
  this.leftNodeToCompare = recursiveCallResults.leftNodeToCompare;
  this.outerNodesAreEqual = recursiveCallResults.outerNodesAreEqual;

  let recursiveIsEqual =
    outerNodesAreEqual && leftNodeToCompare.value === rightNode.value;
  let nextLeftNodeToCompare = leftNodeToCompare.next;

  return new LinkedListInfo(recursiveIsEqual, nextLeftNodeToCompare);
};

/**
 *  Approach: There is no way to using two pointers to traverse from the end to the start of the linked list because this is a singly linked list. Therefore, we have a way to do that by reverse the second half of the linked list and traverse from the end to the start of original list.
 *
 * In order to traverse the second half of the linked list, we have to know its new head. We can do that by finding the middle node of the original list.
 *
 * After that, we reverse the second half of the linked list using the found middle node and then traverse through the new reversed list using 2 pointers.
 *
 * Example:
 * head = 0 -> 1 -> 2 -> 2 -> 1 -> 0
 *                      mid
 * reversed = 0 -> 1 -> 2 null <- 2 <- 1 <- 0
 * pointers left                           right
 * firstHalfHead = 0, secondHalfHead = 0
 *
 * 1. We get the middle node by using slow and fast pointers. The slow will move once and the fast will move twice. When the fast pointer is in the end of the list, at that time, the slow pointer will be at the middle node.
 * 2. After getting the middle node, we reverse the second half of the linked list start from the middle node. We do that by changing the pointer of the next node to point to the previous node until we reach the end of the list.
 * 3. After the second half list is reversed, we'll use the first pointer to start from the head of the first half list and the second pointer to start from the head of the second half list.
 * 4. Each time we iterate both lists, we compare the both values
 * 5. If the current value of the first half is the same as the current value of the second half, that means it's still a valid palindrome. Otherwise, if we found 2 values that doesn't not equal to each other, we return false because it's a invalid palindrome.
 *
 * Time complexity: O(n) - where n is the length of the linked list. Because we have to iterate through the linked list to validate each pair of node.
 *
 * Space complexity: O(1) - because we modified the linked list in place
 *
 */
const linkedListPalindromeTwoPointers = (head) => {
  // Get the middle node which is the head of the linked list's second half
  let middleNode = getMiddleNode(head);

  // Reverse the second half of the linked list
  let reversedSecondHalfNode = reverseLinkedList(middleNode);
  let firstHalfNode = head;

  // Traverse through the first and second half lists and compare them to each other
  while (reversedSecondHalfNode !== null) {
    if (reversedSecondHalfNode.value !== firstHalfNode.value) {
      return false;
    }

    reversedSecondHalfNode = reversedSecondHalfNode.next;
    firstHalfNode = firstHalfNode.next;
  }

  return true;
};

const getMiddleNode = (head) => {
  let slowNode = head;
  let fastNode = head;

  while (fastNode !== null && fastNode.next !== null) {
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;
  }

  return slowNode;
};

const reverseLinkedList = (head) => {
  let previousNode = null;
  let currentNode = head;

  while (currentNode !== null) {
    let nextNode = currentNode.next;
    currentNode.next = previousNode;
    previousNode = currentNode;
    currentNode = nextNode;
  }

  return previousNode;
};
