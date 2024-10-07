import { PriorityQueue } from '../priority-queue.js';

describe('PriorityQueue', () => {
  const hospitalEmergency = new PriorityQueue();

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
