/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/
 *
 * Approach: We use a `seen` Set to store the unique node's value in the linked list. Each time we iterate through linked list, if the node's value is already visited, that means, it's duplicates, then we remove it from the linked list.
 *
 * This solution is suitable for unsorted list.
 *
 * 1. We create a new Set which is called seen to store the unique value of the node.
 * 2. We start the currentNode as the head of the linked list, and use a previousNode to keep track the previous node. This will be used to update the pointer (or remove the duplicate values).
 * 3. As long as the linked list still has node.
 * 4. We check if the current node is not visited, we set the previousNode as the currentNode and add the current node's value to the seen Set.
 * 5. Otherwise, if we found a duplicate, we update the pointer of previous node to point to the current's next node. Because the current node is the duplicate node, so we want the pointer to point to the next distinct node which is the current's next node.
 * 6. Out of the loop, we move to the next node and repeat the process.
 * 7. Return the new linked list without duplicate values.
 *
 * Time complexity: O(n) - where n is the number of nodes in the linked list. This is because we iterate through each node in the linked list once to check for duplicates and remove them if necessary.
 *
 * Space complexity: O(n) - because we use a set to keep track of the values we have seen so far. In the worst case scenario, where there are no duplicates, the set will contain all unique values from the linked list, resulting in O(n) space complexity.
 */
const deleteDuplicatesWithSet = (head) => {
  let seen = new Set();
  let currentNode = head;
  let previousNode = null;

  while (currentNode !== null) {
    if (!seen.has(currentNode.val)) {
      previousNode = currentNode;
      seen.add(currentNode.val);
    } else {
      previousNode.next = currentNode.next;
    }

    currentNode = currentNode.next;
  }

  return head;
};

/**
 * Approach: The linked list is already sorted, that means the duplicate values will be close to each other. In the linked list, in order to remove a node, we basically update the pointer that point to a specific node. Because all the node is pointing to each other by a pointer.
 *
 * The idea we'll use 2 pointers, the first pointer will hold the current node, and the second pointer will hold the next distinct node (it means the next node which is not duplicated with any previous nodes). Each time we iterate through the linked list, we will pass through the duplicate nodes and update the current node to the next distinct node, it means we update the pointer of the current node to the next distinct node. Because we update the pointer, all the node between the current node and the next distinct node will be removed.
 *
 * 1. We declare 2 variables which are the currentNode and nextDistinctNode. The currentNode will start from the head of the linked list, and the nextDistinctNode will start the next node of the current node.
 * 2. If the nextDistinctNode is not null (it means it's not out of bounds), and the nextDistinctNode is equal to the currentNode (it means it's duplicated), then we continue to update the nextDistinctNode to the next node of the current nextDistinctNode until we reach the new next distinct node.
 * 3. When we reach the new next distinct node, we update the pointer of the current's next node to point the the new next distinct node.
 * 4. And then we update the currentNode to start from the new next distinct node. It means we continue to iterate the next potential list of nodes.
 * 5. Return the new distinct linked list.
 *
 * Time complexity: O(n) - where n is the length of the linked list
 *
 * Space complexity: O(1) - because we modified the linked list in place
 */
const deleteDuplicatesWithTwoPointers = (head) => {
  let currentNode = head;

  while (currentNode !== null) {
    let nextDistinctNode = currentNode.next;

    while (
      nextDistinctNode !== null &&
      nextDistinctNode.val === currentNode.val
    ) {
      nextDistinctNode = nextDistinctNode.next;
    }

    currentNode.next = nextDistinctNode;
    currentNode = nextDistinctNode;
  }

  return head;
};