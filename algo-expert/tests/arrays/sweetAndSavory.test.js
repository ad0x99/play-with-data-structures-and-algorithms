import {
  majorityElementWithBitwise,
  majorityElementWithCounter,
  majorityElementWithHashmap,
} from '../../arrays/majorityElement';

describe('majorityElement', () => {
  const nums1 = [2];
  const nums2 = [1, 2, 1];
  const nums3 = [3, 3, 1];
  const nums4 = [4, 5, 5];
  const nums5 = [1, 2, 3, 2, 2, 1, 2];
  const nums6 = [1, 1, 1, 1, 2, 2, 2, 2, 2];
  const nums7 = [435, 6543, 6543, 435, 535, 6543, 6543, 12, 43, 6543, 6543];
  const nums8 = [1, 2, 2, 2, 1];
  const nums9 = [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1];
  const nums10 = [1, 2, 3, 2, 2, 4, 2, 2, 5, 2, 1];

  test('majorityElementWithHashmap- should return expected array results', () => {
    expect(typeof majorityElementWithHashmap).toEqual('function');
    expect(majorityElementWithHashmap(nums1)).toEqual(2);
    expect(majorityElementWithHashmap(nums2)).toEqual(1);
    expect(majorityElementWithHashmap(nums3)).toEqual(3);
    expect(majorityElementWithHashmap(nums4)).toEqual(5);
    expect(majorityElementWithHashmap(nums5)).toEqual(2);
    expect(majorityElementWithHashmap(nums6)).toEqual(2);
    expect(majorityElementWithHashmap(nums7)).toEqual(6543);
    expect(majorityElementWithHashmap(nums8)).toEqual(2);
    expect(majorityElementWithHashmap(nums9)).toEqual(4);
    expect(majorityElementWithHashmap(nums10)).toEqual(2);
  });

  test('majorityElementWithCounter- should return expected array results', () => {
    expect(typeof majorityElementWithCounter).toEqual('function');
    expect(majorityElementWithCounter(nums1)).toEqual(2);
    expect(majorityElementWithCounter(nums2)).toEqual(1);
    expect(majorityElementWithCounter(nums3)).toEqual(3);
    expect(majorityElementWithCounter(nums4)).toEqual(5);
    expect(majorityElementWithCounter(nums5)).toEqual(2);
    expect(majorityElementWithCounter(nums6)).toEqual(2);
    expect(majorityElementWithCounter(nums7)).toEqual(6543);
    expect(majorityElementWithCounter(nums8)).toEqual(2);
    expect(majorityElementWithCounter(nums9)).toEqual(4);
    expect(majorityElementWithCounter(nums10)).toEqual(2);
  });

  test('majorityElementWithBitwise- should return expected array results', () => {
    expect(typeof majorityElementWithBitwise).toEqual('function');
    expect(majorityElementWithBitwise(nums1)).toEqual(2);
    expect(majorityElementWithBitwise(nums2)).toEqual(1);
    expect(majorityElementWithBitwise(nums3)).toEqual(3);
    expect(majorityElementWithBitwise(nums4)).toEqual(5);
    expect(majorityElementWithBitwise(nums5)).toEqual(2);
    expect(majorityElementWithBitwise(nums6)).toEqual(2);
    expect(majorityElementWithBitwise(nums7)).toEqual(6543);
    expect(majorityElementWithBitwise(nums8)).toEqual(2);
    expect(majorityElementWithBitwise(nums9)).toEqual(4);
    expect(majorityElementWithBitwise(nums10)).toEqual(2);
  });
});
