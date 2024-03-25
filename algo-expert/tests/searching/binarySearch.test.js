import { binarySearch } from '../../searching/binarySearch';

describe('binarySearch', () => {
  test('binarySearch - should return the expected value', () => {
    expect(typeof binarySearch).toEqual('function');
    expect(binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 33)).toEqual(3);
    expect(binarySearch([1, 5, 23, 111], 111)).toEqual(3);
    expect(binarySearch([1, 5, 23, 111], 5)).toEqual(1);
    expect(binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 0)).toEqual(0);
    expect(binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 1)).toEqual(1);
  });

  test('binarySearch - should return -1', () => {
    expect(typeof binarySearch).toEqual('function');
    const minus1 = -1;

    expect(binarySearch([1, 5, 23, 111], 35)).toEqual(minus1);
    expect(binarySearch([1, 5, 23, 111], 120)).toEqual(minus1);
    expect(binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73], 70)).toEqual(
      minus1
    );
    expect(binarySearch([5, 23, 111], 3)).toEqual(minus1);
    expect(
      binarySearch([0, 1, 21, 33, 45, 45, 61, 71, 72, 73, 355], 354)
    ).toEqual(minus1);
  });
});
