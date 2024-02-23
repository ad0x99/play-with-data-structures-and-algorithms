import { MaxBinaryHeap } from './max-binary-heap.js';
import { PriorityQueue } from './priority-queue.js';

describe('MaxBinaryHeap', () => {
  let maxBinaryHeap = new MaxBinaryHeap();

  test('MBH - Insert item to max binary heap success', () => {
    expect(typeof maxBinaryHeap.insert).toEqual('function');

    expect(maxBinaryHeap.insert(1).values[0]).toEqual(maxBinaryHeap.values[0]);
    expect(maxBinaryHeap.insert(2).values[1]).toEqual(maxBinaryHeap.values[1]);
    expect(maxBinaryHeap.insert(3).values[2]).toEqual(maxBinaryHeap.values[2]);
    expect(maxBinaryHeap.insert(4).values[3]).toEqual(maxBinaryHeap.values[3]);
    expect(maxBinaryHeap.insert(5).values[4]).toEqual(maxBinaryHeap.values[4]);
    expect(maxBinaryHeap.insert(6).values[5]).toEqual(maxBinaryHeap.values[5]);

    const expected = [1, 2, 3, 4, 5, 6];
    expect(maxBinaryHeap.values).toEqual(expect.arrayContaining(expected));
  });

  test('MBH - Remove biggest item from max binary heap success', () => {
    expect(typeof maxBinaryHeap.extractMax).toEqual('function');

    expect(maxBinaryHeap.extractMax()).toEqual(6);

    const expected = [1, 2, 3, 4, 5];
    expect(maxBinaryHeap.values).toEqual(expect.arrayContaining(expected));
  });
});

describe('PriorityQueue', () => {
  let hospitalEmergency = new PriorityQueue();

  test('PQ - Enqueue item to priority queue success', () => {
    expect(typeof hospitalEmergency.enqueue).toEqual('function');

    expect(hospitalEmergency.enqueue('common cold', 1).values[0].value).toEqual(
      hospitalEmergency.values[0].value
    );

    expect(
      hospitalEmergency.enqueue('gunshot wound', 2).values[1].value
    ).toEqual(hospitalEmergency.values[1].value);

    expect(hospitalEmergency.enqueue('high fever', 3).values[2].value).toEqual(
      hospitalEmergency.values[2].value
    );
    expect(hospitalEmergency.enqueue('broken arm', 4).values[3].value).toEqual(
      hospitalEmergency.values[3].value
    );
    expect(
      hospitalEmergency.enqueue('glass in foot', 5).values[4].value
    ).toEqual(hospitalEmergency.values[4].value);
  });

  test('PQ - Dequeue item from priority queue success', () => {
    expect(typeof hospitalEmergency.dequeue).toEqual('function');

    const min = hospitalEmergency.dequeue();

    expect(min.value).toEqual('common cold');
    expect(min.priority).toEqual(1);
  });
});
