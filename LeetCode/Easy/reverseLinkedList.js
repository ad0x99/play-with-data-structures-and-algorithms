/**
 * https://leetcode.com/problems/reverse-linked-list/description/
 *
 * Iterative Approach: Reverse linked list by point the current's next node to be the previous node.
 *
 * For example: 1 -> 2 -> 3 -> 4 -> 5 => 1 <- 2 <- 3 <- 4 <- 5 => 5 -> 4 -> 3 -> 2 -> 1
 *            prev                                        prev   prev
 *            next
 * prev = previous node
 * Each time we iterate through the linked list, we update the next node to be the previous node, which means to re-direct the connection between node reversely
 *
 * 1. We create a variable prev to store the head of the reversed linked list we're building. Initially, it's set to null since there's no reversed list yet.
 * 2. We create a variable next to keep track of the next node in the original linked list during the loop. It's initialized with the head of the original list, which is the starting point for the reversal process.
 * 3. The loop continues as long as head is not null. This means there are more nodes to process in the original linked list.
 * 4. In the iteration, we store the next node of the original list in the next variable. This is important because after reversing the current node's link, we need to move on to the next node in the original list.
 * 5. We're essentially setting the next pointer of the current node to point to previous node (which means reversed head). This effectively breaks the forward connection in the original list.
 * 6. Next, we update the previous node to point to the current node. This adds the current node to the beginning of the reversed list we're building.
 * 7. We move the head pointer to the next node in the original list for the next iteration of the loop.
 * 8. The loop continues in this way, iterating through each node in the original list, reversing its link to point to the previously processed node, and updating previous node to maintain the head of the growing reversed list.
 * 9. After the loop finishes processing all nodes, previous node will point to the head of the fully reversed linked list. The function returns this previous node, which is now the head of the reversed version of the original linked list.
 *
 * Time complexity: O(n) - because the function iterates through each node in the original linked list exactly once, where n is the number of nodes in the list.
 *
 * Space complexity: O(1) - because the function doesn't create any additional nodes. It only uses a constant amount of extra space for variables like prev and next.
 */
const reverseListIterative = (head) => {
  let prev = null;
  let next = head;

  while (head != null) {
    next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }

  return prev;
};
