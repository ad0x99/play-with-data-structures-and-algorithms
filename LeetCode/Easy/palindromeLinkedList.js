/**
 * https://leetcode.com/problems/palindrome-linked-list/description/
 *
 * Approach: There is no way to using two pointers to traverse from the end to the start of the linked list because this is a singly linked list. Therefore, we have a way to do that by reverse the second half of the linked list and traverse from the end to the start of original list.
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
const isPalindrome = (head) => {
  // Get the middle node which is the head of the linked list's second half
  let middleNode = getMiddleNode(head);

  // Reverse the second half of the linked list
  let reversedSecondHalfNode = reverseLinkedList(middleNode);
  let firstHalfNode = head;

  // Traverse through the first and second half lists and compare them to each other
  while (reversedSecondHalfNode !== null) {
    if (reversedSecondHalfNode.val !== firstHalfNode.val) {
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
