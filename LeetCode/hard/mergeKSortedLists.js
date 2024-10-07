/**
 * https://leetcode.com/problems/merge-k-sorted-lists/description/
 *
 * Min Heap Approach
 *
 * Idea: Each sub-list is sorted, we need a way to leverage this sorted lists. By using min-heap, we can keep track the smallest value in each list and merge the smallest values into a list.
 *
 * In each step of merging, we need to add the smallest element from the current k heads of the linked lists to the result list. The min-heap allows us to always extract the minimum element in O(log k) time.
 *
 * When a node is extracted from the heap, the next node from the same list needs to be inserted back into the heap. This ensures that the smallest node across all lists is always at the top of the heap.
 *
 * Implementation
 *
 * 1. We create a min-heap (minHeap) to store the heads of all k sorted lists, which are the smallest value from k sorted lists.
 *
 * 2. We iterate through each value in the list. If a list has at least one element, we insert the head of that list into the heap. The head node is the smallest node, because the list is sorted.
 *
 * 3. Sorting: We create a dummyHead node that acts as the head of the merged list, and its next node will eventually be the actual head of the final list. And we create a current pointer which is used to traverse and build the merged list.
 *
 * 4. As long as the heap is not empty.
 * - 4.1: We extract the smallest node (the node with the smallest value) from the heap. This ensures that the smallest node across all lists is added to the merged list.
 *
 * - 4.2: We update the current pointer to point to the current smallest node, and we move current to the next node in the merged list for next sorting.
 *
 * - 4.3: If the node we just extracted has a next node in its original list, we insert that next node into the heap, for further merging.
 *
 * 5. After the heap is empty, it means we merged all the lists. We return the dummyHead.next which points to the head of the fully merged list.
 *
 * Time complexity: O(n * k * log(k))
 *
 * Space complexity: O(n), where n is the size of the heap.
 */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);

    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    let parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex >= 0 && this.heap[parentIndex].val > this.heap[index].val) {
      this.swap(index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  sinkDown(index) {
    const n = this.heap.length;
    let smallest = index;

    const leftIdx = 2 * index + 1;
    const rightIdx = 2 * index + 2;

    if (leftIdx < n && this.heap[leftIdx].val < this.heap[smallest].val) {
      smallest = leftIdx;
    }

    if (rightIdx < n && this.heap[rightIdx].val < this.heap[smallest].val) {
      smallest = rightIdx;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.sinkDown(smallest);
    }
  }

  swap(index, parent) {
    [this.heap[index], this.heap[parent]] = [
      this.heap[parent],
      this.heap[index],
    ];
  }
}

const mergeKLists = (lists) => {
  const minHeap = new MinHeap();

  // Add the first node of each list to the minHeap
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      minHeap.insert(lists[i]);
    }
  }

  // Sort the list using min-heap
  const dummyHead = new ListNode();
  let current = dummyHead;

  while (minHeap.size()) {
    const node = minHeap.extractMin();
    current.next = node;
    current = current.next;

    if (node.next) {
      minHeap.insert(node.next);
    }
  }

  return dummyHead.next;
};
