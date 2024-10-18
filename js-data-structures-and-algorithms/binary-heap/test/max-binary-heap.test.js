import { MaxBinaryHeap } from '../max-binary-heap.js';

describe('MaxBinaryHeap', () => {
  const maxBinaryHeap = new MaxBinaryHeap();

  test('Max Heap - Insert item to max binary heap success', () => {
    expect(typeof maxBinaryHeap.insert).toEqual('function');

    expect(maxBinaryHeap.insert(1).heap[0]).toEqual(maxBinaryHeap.heap[0]);
    expect(maxBinaryHeap.insert(2).heap[1]).toEqual(maxBinaryHeap.heap[1]);
    expect(maxBinaryHeap.insert(3).heap[2]).toEqual(maxBinaryHeap.heap[2]);
    expect(maxBinaryHeap.insert(4).heap[3]).toEqual(maxBinaryHeap.heap[3]);
    expect(maxBinaryHeap.insert(5).heap[4]).toEqual(maxBinaryHeap.heap[4]);
    expect(maxBinaryHeap.insert(6).heap[5]).toEqual(maxBinaryHeap.heap[5]);

    const expected = [1, 2, 3, 4, 5, 6];
    expect(maxBinaryHeap.heap).toEqual(expect.arrayContaining(expected));
  });

  test('Max Heap - Remove biggest item from max binary heap success', () => {
    expect(typeof maxBinaryHeap.extractMax).toEqual('function');

    expect(maxBinaryHeap.extractMax()).toEqual(6);

    const expected = [1, 2, 3, 4, 5];
    expect(maxBinaryHeap.heap).toEqual(expect.arrayContaining(expected));
  });
});
