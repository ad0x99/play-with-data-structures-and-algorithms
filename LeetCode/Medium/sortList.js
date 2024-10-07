/**
 * https://leetcode.com/problems/sort-list/description/
 *
 * Recursion & Merge Sort Approach: Divide the linked list into 2 sub-lists and sort them recursively and merge into a single list
 *
 * 1. Base case: if the head is `null` or the next node is `null`, we return head as the list is already sorted.
 *
 * 2. In order to separate the list into two lists, we need to find the middle node. We use 2 pointers, slow and fast to traverse the list.
 * - 2.1: We continue as long as `fast` and `fast.next` are not `null`. Slow moves `1 step` at a time, while fast moves `2 steps` at a time.
 *
 * - 2.1: After traversing through the list, when the `fast` reached to the end, the slow will be pointing to the middle node (or the second middle node if the list has even length).
 *
 * 3. We create 2 new variables, `leftIdx` pointing to the head and `rightIdx` pointing to the node after the middle node.
 *
 * 4. We set `slow.next` to `null` to split the linked list into 2 sub-lists.
 * - 4.1: The left part starts from head to the middle node inclusively.
 *
 * - 4.2: The right part starts from the node after the middle node to the tail.
 *
 * 5. Sorting: We recursively call sortList on both the left and right slices to sort them independently. This recursive approach ensures that smaller and smaller sub-lists are sorted until they reach base cases (empty or single node lists).
 *
 * 6. Merging: After sorting the list independently, we call the mergeSort function with the sorted left part and the sorted right part to merge those 2 parts into a single sorted linked list.
 * - 6.1: Inside the mergeSort function, we create a dummy node with value of 0. This node will be used to build the final merged linked list.
 *
 * - 6.2: We also create a temporary pointer (temp) that initially points to the dummy node.
 *
 * - 6.3: As long as both left and right are not null, we continue to iterate through each node.
 *
 * - 6.4: We check if the value of left is less than or equal to the value of right, we attach the node at left to be the temp.next and then move left forward one step. Otherwise, we attach the node at right to the temp.next and move right forward one step. In this way, the smaller node from either list is always attached to the end of the merged list being built, preserving the sorted order.
 *
 * - 6.5: After the loop exits, there might be remaining elements in either the left or right parts that weren't compared yet. We attach the entire remaining left or right sub-lists to the end of the merged list.
 *
 * - 6.6: Since the dummy node (node) was created with a value of 0 and wasn't included in the actual merged list, it's necessary to return the node.next. This points to the head of the actual sorted linked list built by merging the left and right sub-lists.
 *
 * 7. We return the sorted list.
 *
 *
 * Time complexity: O(n) * O(n log n) = O(n log n), where n is the number of nodes in the linked list
 *
 * Space complexity: O(log n), where n is the number of nodes in the linked list. Because we use recursion to divide the linked list into 2 slices
 */
const sortList = (head) => {
  if (!head || !head.next) return head;

  // Find middle node
  let slow = head;
  let fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Split the linked list into 2 slices:
  // left: from head to rightIdx (mid)
  // right: from rightIdx to tail
  let leftIdx = head;
  let rightIdx = slow.next;
  slow.next = null;

  let leftPart = sortList(leftIdx);
  let rightPart = sortList(rightIdx);

  return mergeSort(leftPart, rightPart);
};

const mergeSort = (left, right) => {
  let node = new ListNode(0);
  let temp = node;

  while (left && right) {
    if (left.val <= right.val) {
      temp.next = left;
      left = left.next;
    } else {
      temp.next = right;
      right = right.next;
    }

    temp = temp.next;
  }

  // Copy remaining elements from left linked list (if any)
  if (left) {
    temp.next = left;
  }

  // Copy remaining elements from right linked list (if any)
  if (right) {
    temp.next = right;
  }

  return node.next;
};
