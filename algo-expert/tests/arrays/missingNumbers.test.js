import {
  missingNumbersWithBitwise,
  missingNumbersWithSet,
  missingNumbersWithSum,
} from '../../arrays/missingNumbers';

describe('missingNumbers', () => {
  const nums1 = [1, 4, 3];
  const nums2 = [];
  const nums3 = [1];
  const nums4 = [2];
  const nums5 = [3, 1];
  const nums6 = [3, 1, 2];
  const nums7 = [4, 5, 3];
  const nums8 = [1, 3, 4, 5];
  const nums9 = [1, 2, 7, 5, 4];
  const nums10 = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10,
  ];

  test('missingNumbersWithSet- should return expected array results', () => {
    expect(typeof missingNumbersWithSet).toEqual('function');
    expect(missingNumbersWithSet(nums1)).toEqual(
      expect.arrayContaining([2, 5])
    );
    expect(missingNumbersWithSet(nums2)).toEqual(
      expect.arrayContaining([1, 2])
    );
    expect(missingNumbersWithSet(nums3)).toEqual(
      expect.arrayContaining([2, 3])
    );
    expect(missingNumbersWithSet(nums4)).toEqual(
      expect.arrayContaining([1, 3])
    );
    expect(missingNumbersWithSet(nums5)).toEqual(
      expect.arrayContaining([2, 4])
    );
    expect(missingNumbersWithSet(nums6)).toEqual(
      expect.arrayContaining([4, 5])
    );
    expect(missingNumbersWithSet(nums7)).toEqual(
      expect.arrayContaining([1, 2])
    );
    expect(missingNumbersWithSet(nums8)).toEqual(
      expect.arrayContaining([2, 6])
    );
    expect(missingNumbersWithSet(nums9)).toEqual(
      expect.arrayContaining([3, 6])
    );
    expect(missingNumbersWithSet(nums10)).toEqual(
      expect.arrayContaining([23, 24])
    );
  });

  test('missingNumbersWithSum - should return expected array results', () => {
    expect(typeof missingNumbersWithSum).toEqual('function');
    expect(missingNumbersWithSum(nums1)).toEqual(
      expect.arrayContaining([2, 5])
    );
    expect(missingNumbersWithSum(nums2)).toEqual(
      expect.arrayContaining([1, 2])
    );
    expect(missingNumbersWithSum(nums3)).toEqual(
      expect.arrayContaining([2, 3])
    );
    expect(missingNumbersWithSum(nums4)).toEqual(
      expect.arrayContaining([1, 3])
    );
    expect(missingNumbersWithSum(nums5)).toEqual(
      expect.arrayContaining([2, 4])
    );
    expect(missingNumbersWithSum(nums6)).toEqual(
      expect.arrayContaining([4, 5])
    );
    expect(missingNumbersWithSum(nums7)).toEqual(
      expect.arrayContaining([1, 2])
    );
    expect(missingNumbersWithSum(nums8)).toEqual(
      expect.arrayContaining([2, 6])
    );
    expect(missingNumbersWithSum(nums9)).toEqual(
      expect.arrayContaining([3, 6])
    );
    expect(missingNumbersWithSum(nums10)).toEqual(
      expect.arrayContaining([23, 24])
    );
  });

  test('missingNumbersWithBitwise - should return expected array results', () => {
    expect(typeof missingNumbersWithBitwise).toEqual('function');
    expect(missingNumbersWithBitwise(nums1)).toEqual(
      expect.arrayContaining([2, 5])
    );
    expect(missingNumbersWithBitwise(nums2)).toEqual(
      expect.arrayContaining([1, 2])
    );
    expect(missingNumbersWithBitwise(nums3)).toEqual(
      expect.arrayContaining([2, 3])
    );
    expect(missingNumbersWithBitwise(nums4)).toEqual(
      expect.arrayContaining([1, 3])
    );
    expect(missingNumbersWithBitwise(nums5)).toEqual(
      expect.arrayContaining([2, 4])
    );
    expect(missingNumbersWithBitwise(nums6)).toEqual(
      expect.arrayContaining([4, 5])
    );
    expect(missingNumbersWithBitwise(nums7)).toEqual(
      expect.arrayContaining([1, 2])
    );
    expect(missingNumbersWithBitwise(nums8)).toEqual(
      expect.arrayContaining([2, 6])
    );
    expect(missingNumbersWithBitwise(nums9)).toEqual(
      expect.arrayContaining([3, 6])
    );
    expect(missingNumbersWithBitwise(nums10)).toEqual(
      expect.arrayContaining([23, 24])
    );
  });
});
