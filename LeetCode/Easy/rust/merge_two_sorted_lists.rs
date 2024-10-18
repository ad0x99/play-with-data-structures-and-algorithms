/**
 * https://leetcode.com/problems/merge-two-sorted-lists/description/
 *
 * Approach: We use the dummy head technique to keep track the actual head. As long as those 2 lists still have node, we will iterate through them and compare each node to get the smaller one (because we want a sorted list as result), and push into the new sorted list.
 *
 * 1. Initialize current head and dummy head as pointing to the same node.
 *
 * 2. As long as one of the two lists is not empty, we keep iterating though each list.
 *
 * 3. If the current node of list 1 is less than or equal the current node of list 2, we pick the smaller one first, because we want the final list to be sorted. If this condition is true, we point the next node of current head to the list 1, move the current head to the next node of list 1, and move the list 1 to the next node.
 *
 * 5. Otherwise, we pick the list 2 and do the same process as above.
 *
 * 6. If one of two lists is out of bounds, we pick the list still has remaining node, and push to the current list.
 *
 * 7. Because the dummy head is pointing to the actual head, and we want to return the actual head, that means we want to return the next node of the current dummy head.
 *
 * Time complexity: O(n + m) - where n and m are the lengths of the two input lists.
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn merge_two_lists(
        mut list1: Option<Box<ListNode>>,
        mut list2: Option<Box<ListNode>>,
    ) -> Option<Box<ListNode>> {
        let mut dummy_head = Box::new(ListNode::new(0));
        let mut current = &mut *dummy_head;

        while let (Some(node1), Some(node2)) = (&list1, &list2) {
            if node1.val <= node2.val {
                current.next = list1.take();
                list1 = current.next.as_mut()?.next.take();
            } else {
                current.next = list2.take();
                list2 = current.next.as_mut()?.next.take();
            }
            current = current.next.as_mut()?;
        }

        current.next = list1.or(list2);
        dummy_head.next
    }
}
