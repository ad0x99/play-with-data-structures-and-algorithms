export class MinBinaryHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    // Add a new value to the last of the heap
    this.heap.push(value);
    // Bubble it up from the last added value
    this.#bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#sinkDown(0);

    return min;
  }

  getMin() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  #bubbleUp(index) {
    let parentIndex = Math.floor((index - 1) / 2); // (n - 1) / 2

    // If there is more than one value in the heap
    // And the parent is greater than new value
    while (index > 0 && this.heap[parentIndex] > this.heap[index]) {
      // Swap new value with the parent value (parent < child)
      this.#swap(index, parentIndex);

      // Update the index of new value and parent value
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  #sinkDown(index) {
    const length = this.heap.length;
    let smallest = index;

    // Get the left and right child indexes of the current index
    const leftChildIdx = 2 * index + 1;
    const rightChildIdx = 2 * index + 2;

    // If the leftChildIdx is inbound of the heap
    // And the current leftChild value is less than the current value
    if (
      leftChildIdx < length &&
      this.heap[leftChildIdx] < this.heap[smallest]
    ) {
      // Update smallest to be the leftChild
      smallest = leftChildIdx;
    }

    // If the rightChildIdx is inbound of the heap
    // And the current rightChild value is less than the current value
    if (
      rightChildIdx < length &&
      this.heap[rightChildIdx] < this.heap[smallest]
    ) {
      // Update smallest to be the rightChild
      smallest = rightChildIdx;
    }

    // If the current index is not the smallest yet
    if (smallest !== index) {
      this.#swap(index, smallest);
      this.#sinkDown(smallest);
    }
  }

  #swap(index, parent) {
    [this.heap[index], this.heap[parent]] = [
      this.heap[parent],
      this.heap[index],
    ];
  }
}

const minHeap = new MinBinaryHeap();

minHeap.insert(1);
minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(6);

console.log(minHeap.heap);
