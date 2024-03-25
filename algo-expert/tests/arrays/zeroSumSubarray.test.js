import { zeroSumSubarray } from '../../arrays/zeroSumSubarray';

describe('zeroSumSubarray', () => {
  const nums1 = [-5, -5, 2, 3, -2];
  const nums2 = [4, -3, 2, 4, -1, -5, 7];
  const nums3 = [];
  const nums4 = [0];
  const nums5 = [1];
  const nums6 = [1, 2, 3];
  const nums7 = [1, 1, 1];
  const nums8 = [-1, -1, -1];
  const nums9 = [
    -8, -22, 104, 73, -120, 53, 22, 20, 25, -12, 1, 14, -90, 13, -22,
  ];
  const nums10 = [-8, -22, 104, 73, -120, 53, 22, -12, 1, 14, -90, 13, -22];

  test('zeroSumSubarray - should return true', () => {
    expect(typeof zeroSumSubarray).toEqual('function');
    expect(zeroSumSubarray(nums1)).toBeTruthy();
    expect(zeroSumSubarray(nums2)).toBeTruthy();
    expect(zeroSumSubarray(nums4)).toBeTruthy();
    expect(zeroSumSubarray(nums9)).toBeTruthy();
  });

  test('zeroSumSubarray - should return false', () => {
    expect(typeof zeroSumSubarray).toEqual('function');
    expect(zeroSumSubarray(nums3)).toBeFalsy();
    expect(zeroSumSubarray(nums5)).toBeFalsy();
    expect(zeroSumSubarray(nums6)).toBeFalsy();
    expect(zeroSumSubarray(nums7)).toBeFalsy();
    expect(zeroSumSubarray(nums8)).toBeFalsy();
    expect(zeroSumSubarray(nums10)).toBeFalsy();
  });
});
