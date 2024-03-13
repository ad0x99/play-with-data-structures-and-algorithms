/**
 * https://leetcode.com/problems/add-two-numbers/description/
 *
 * 1. Creates a dummy head node with a value of 0. This node is used to simplify the logic and avoid handling edge cases for an empty list.
 * 2. Creates another head node with a value of 0. This will eventually point to the head of the resulting linked list containing the sum.
 * 3. Initializes a variable carryOver to store the carry-over value (digit to be added to the next position) during the addition process.
 * 4. As long as there is at least one node in l1 or l2 or the carry-over value from the previous addition. We iterate through the linked lists
 * 5. If there's a node in l1, we add the value of the current node in l1 to the carry variable and move l1 to the next node in the first linked list.
 * 6. If there's a node in l2, we add the value of the current node in l2 to the carry variable and move l2 to the next node in the first linked list.
 * 7. After checking 2 above condition, we create a new node with the value equal to the remainder (% 10) of the current carry (the digit at the current position). This represents the sum of the digits at the current position from l1 and l2 (including any carry-over).
 * 8. We update the carry variable by calculating the integer quotient (Math.floor) of the current carry divided by 10. This captures the carry-over value to be added in the next iteration.
 * 9. We need to update the head pointer to point to the next node
 * 9. Repeat the iteration and return the head of the result linked list. In this case, we return dummyHead.next because the dummy head is pointer to the actual head.
 *
 * Time Complexity: O(n + m) - n is the length of l1 and m is the length of l2
 * Space Complexity: O(max(n, m)), because in the worst case, the length of the resulting linked list can be equal to the length of the longer input list (either n or m), therefore, the space complexity is considered to the linear in the length of the longer input list.
 *
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const addTwoNumbers = (l1, l2) => {
  let newNode = new ListNode(0)
  let dummyHead = newNode;
  let head = newNode;
  let carryOver = 0;

  while (l1 !== null || l2 !== null || carryOver > 0) {
    if (l1 !== null) {
      carryOver += l1.val;
      l1 = l1.next;
    }

    if (l2 !== null) {
      carryOver += l2.val;
      l2 = l2.next;
    }

    head.next = new ListNode(carryOver % 10);
    head = head.next;
    carryOver = Math.floor(carryOver / 10);
  }

  return dummyHead.next;
};
