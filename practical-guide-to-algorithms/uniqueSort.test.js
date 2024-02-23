import { uniqueSort } from './uniqueSort';

describe('uniqueSort function testing', () => {
  const input = [4, 2, 2, 3, 2, 4, 2];
  const expected = [2, 3, 4];

  test('uniqueSort - should sort the input array and return the correct result', () => {
    expect(typeof uniqueSort).toEqual('function');
    expect(uniqueSort(input)).toEqual(expected);
  });
});
