/**
 * https://leetcode.com/problems/linked-list-cycle-ii/description/
 *
 * Hash Table Approach : In case the linked list has cycle, that means, some of the nodes in the linked list should be visited twice. Based on that assumption, we can use a hash set to store the current node of the linked list each time we're iterating through it. As long as we meet a visited node that is stored in the hash set, that means, the linked list has cycle, we just the return the visited node which is the start of the cycle.
 *
 * 1. We create a Set to store visited node.
 * 2. We create a currentNode variable start from the head of the linked list.
 * 3. As long as the current node is not null, we continue to iterate through the list and check.
 * 4. If the current node is already visited, that means we found a cycle and then we return the current node which is the start of the cycle.
 * 5. Otherwise, we continue to iterate through the list until we reach the tail.
 * 6. If there is no cycle found, we return null.
 *
 * Time complexity: O(n) because we iterate through each node in the linked list once, where n is the number of nodes in the linked list.
 *
 * Space complexity: O(n) because we use a HashSet to store references to each node we have seen so far, and in the worst case scenario, we would need to store references to all nodes in the linked list.
 */
const detectCycleHashSet = (head) => {
  let seen = new Set();
  let current = head;

  while (current) {
    if (seen.has(current)) {
      return current;
    }

    seen.add(current);
    current = current.next;
  }

  return null;
};

/**
 * Slow & Fast Approach: Each time the slow move once, the fast will move twice. As long as there is next node, we continue to iterate through the list until the slow pointer meets the fast pointer, that means it's a cycle.
 *
 * First iteration
 * S          5->6
 * F         /    \
 * 0->1->2->4      7
 *           \    /
 *            9<-8
 *
 * Final Iteration
 *            5->6
 *           /    \
 * 0->1->2->4      7 SF => found a cycle
 *           \    /
 *            9<-8
 *
 * Assumption:
 * |--------X--------|
 * |----D---|----P---|---R---|
 * 0->1->2->4->5->6->7->8-9->4....
 * |-----------T-------------|
 *
 * D = the distance from the beginning of the linked list to the node that starts the cycle. (0->1->2->4)
 * P = the distance from the node that starts the cycle to the position where the slow pointer equals the fast pointer. (4->5->6->7)
 * X = the total distance from the beginning of the list to P. (0->1->2->4->5->6->7)
 * R = the remaining distance from P back to D. (7->8->9->4)
 * T = the total distance from the beginning of the list to the node that starts the cycle. (0->1->2->4->5->6->7->8->9->4)
 *
 * Then we have the formula
 * S = 1X = D + P
 * F = 2X = 2D + 2P
 * T = 2D + 2P - P => T = 2D + P
 * R = T - P - D = 2D + P - P - D => R = D
 *
 * Theoretically, the distance from where we discover a cycle to the node that starts the cycle is equal the distance from the beginning of the list to the node that starts the cycle.
 * By leveraging these formula, we can reset the slow pointer to the head of the list and change the increment of the fast pointer move twice to move once per iteration.
 * We move the fast and fast pointers until they meets each other, it means we found the start node of the cycle.
 *
 */
const detectCycleTwoPointers = (head) => {
  let slow = head;
  let fast = head;

  // Find the cycle using fast and slow pointers
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // If we found a cycle
    if (fast === slow) {
      // Reset the slow to the head
      slow = head;

      // Move the fast and slow until they meet each other.
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }

      // Return slow when fast === slow.
      return slow;
    }
  }

  return null;
};
