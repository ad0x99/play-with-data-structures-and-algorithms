/**
 * https://leetcode.com/problems/merge-two-sorted-lists/description/
 *
 * Approach: We use the dummy head technique to keep track the actual head. As long as those 2 lists still have node, we will iterate through them and compare each node to get the smaller one (because we want a sorted list as result), and push into the new sorted list.
 *
 * 1. Initialize current dead and dummy head as pointing to the same node.
 * 2. As long as one of the two lists is not empty.
 * 3. If the current node of list 1 is less than or equal the current node of list 2, we pick the smaller one first, because we want the final list to be sorted.
 * 4. In the first condition, we point the next node of current head to the list 1, move the current head to the next node (it means the list 1), and move the list 1 to the next node.
 * 5. Otherwise, we pick the list 2 and do the same process as above.
 * 6. If one of two lists is out of bounds, we pick the list still has remaining node, and push to the current list.
 * 7. Because the dummy head is pointing to the actual head, and we want to return the actual head, that means we want to return the next node of the current dummy head.
 * 
 * Time complexity: O(n + m) - where n and m are the lengths of the two input lists. This is because we iterate through both lists once to merge them together.
 * 
 * Space complexity: O(1) - because we are only using a constant amount of extra space for the variables and pointers.
 */
const mergeTwoLists = (list1, list2) => {
  let currentHead = new ListNode(0);
  let dummyHead = currentHead.head;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      currentHead.next = list1;
      currentHead = currentHead.next;
      list1 = list1.next;
    } else {
      currentHead.next = list2;
      currentHead = currentHead.next;
      list2 = list2.next;
    }
  }

  currentHead.next = list1 || list2;
  return dummyHead.next;
};

console.log(mergeTwoLists([1, 2, 4], [1, 3, 4])); // [1, 1, 2, 3, 4, 4]
console.log(mergeTwoLists([], [])); // []
console.log(mergeTwoLists([], [0])); // [0]
