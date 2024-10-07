import { MinBinaryHeap } from '../min-binary-heap';

describe('MinBinaryHeap', () => {
  const minBinaryHeap = new MinBinaryHeap();

  test('Min Heap - Insert item to min binary heap success', () => {
    expect(typeof minBinaryHeap.insert).toEqual('function');

    minBinaryHeap.insert(1);
    minBinaryHeap.insert(2);
    minBinaryHeap.insert(3);
    minBinaryHeap.insert(4);
    minBinaryHeap.insert(5);
    minBinaryHeap.insert(6);

    expect(minBinaryHeap.heap[0]).toEqual(minBinaryHeap.heap[0]);
    expect(minBinaryHeap.heap[1]).toEqual(minBinaryHeap.heap[1]);
    expect(minBinaryHeap.heap[2]).toEqual(minBinaryHeap.heap[2]);
    expect(minBinaryHeap.heap[3]).toEqual(minBinaryHeap.heap[3]);
    expect(minBinaryHeap.heap[4]).toEqual(minBinaryHeap.heap[4]);
    expect(minBinaryHeap.heap[5]).toEqual(minBinaryHeap.heap[5]);

    const expected = [1, 2, 3, 4, 5, 6];
    expect(minBinaryHeap.heap).toEqual(expect.arrayContaining(expected));
  });

  test('Min Heap - Remove smallest item from min binary heap success', () => {
    expect(typeof minBinaryHeap.extractMin).toEqual('function');

    expect(minBinaryHeap.extractMin()).toEqual(1);

    const expected = [2, 3, 4, 5, 6];
    expect(minBinaryHeap.heap).toEqual(expect.arrayContaining(expected));
  });
});
