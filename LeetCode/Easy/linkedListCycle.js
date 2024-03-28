/**
 * https://leetcode.com/problems/linked-list-cycle/description/
 *
 * Approach: Floyd's Cycle Finding Algorithm - using two pointers - one fast and one slow such that each time the slow move once, the fast will move twice. As long as there is next node, we continue to iterate through the list until the slow pointer meets the fast pointer, that means it's a cycle.
 *
 * 1. We initialize the slow and fast pointers which start from the head of the linked list.
 * 2. As long as the fast pointer and the fast's next pointer are not null, we iterate through each node of the list. Because cause the fast pointer will move twice, therefore we want to make sure that the fast's next pointer is not null.
 * 3. We move the slow pointer once, and fast pointer twice and check if the slow and fast meet each other, we return true. Otherwise, we continue to iterate through the list until we reach the tail.
 * 4. We return false if we didn't found a cycle.
 *
 * Time complexity: O(n) - where n is the number of nodes in the linked list. This is because in the worst case scenario, we will have to iterate through all the nodes in the linked list to determine if there is a cycle.
 *
 * Space complexity: O(1) because it uses a constant amount of extra space regardless of the size of the input linked list. This is because we only uses two pointers (slow and fast) to traverse the linked list and does not use any additional data structures.
 *
 */
const hasCycleTwoPointers = (head) => {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    if (slow === fast) return true;

    slow = slow.next;
    fast = fast.next;
  }

  return false;
};

/**
 * Approach: In case the linked list has cycle, that means, some of the nodes in the linked list should be visited twice. Based on that assumption, we can use a hash set to store the current node of the linked list each time we're iterating through it. As long as we meet a visited node that is stored in the hash set, that means, the linked list has cycle.
 *
 * 1. We create a Set to store visited node.
 * 2. We create a currentNode variable start from the head of the linked list.
 * 3. As long as the current node is not null, we continue to iterate through the list and check.
 * 4. If the current node is already visited, that means we found a cycle and then we return true.
 * 5. Otherwise, we continue to iterate through the list until we reach the tail.
 * 6. If there is no cycle found, we return false.
 *
 * Time complexity: O(n) because we iterate through each node in the linked list once, where n is the number of nodes in the linked list.
 *
 * Space complexity: O(n) because we use a HashSet to store references to each node we have seen so far, and in the worst case scenario, we would need to store references to all nodes in the linked list.
 */
const hasCycleHashSet = (head) => {
  let seen = new Set();
  let currentNode = head;

  while (currentNode !== null) {
    if (seen.has(currentNode)) return true;

    seen.add(currentNode);
    currentNode = currentNode.next;
  }

  return false;
};

/**
 *  Approach: We iterate through each node in the linked list and modify the list in place to check if a node is already visited.
 *
 * 1. We initialize the visitedNode as the first node of the list, and a currentNode variable starts from the head of the list.
 * 2. As long as we have not reached the tail, we continue to iterate through each node and validate the condition.
 * 3. If the next node of the current node is equal to visited node, it means it has been visited once, at that time, we found a cycle, and then return true.
 * 4. Otherwise, we swap the pointer of currentNode and currentNode.next. In this case, basically, the visitedNode becomes the new value of currentNode.next. This effectively changes the pointer of the current node (head) to point to visitedNode. Similarly, currentNode.next (which previously pointed to the next node in the list) becomes the new value of head. This moves the current node reference one node forward in the list.
 * 5. We iterate through the list until we reach the tail. If there is no cycle found, we return false.
 *
 * Time complexity: O(n) where n is the number of nodes in the linked list. This is because we iterate through each node in the linked list once to check for a cycle.
 *
 * Space complexity: O(1)
 */
const hasCycle = (head) => {
  let visitedNode = new ListNode(0);
  let currentNode = head;

  while (currentNode !== null) {
    if (currentNode.next === visitedNode) {
      return true;
    }

    [currentNode.next, currentNode] = [visitedNode, currentNode.next];
  }
  return false;
};
