/**
 * https://leetcode.com/problems/reverse-bits/description/
 *
 * Two Pointer & Bitwise Operations Approach
 *
 * 1. We initialize the left pointer starts zero, and the right pointer starts from 31 (since the input n is the 32 bits unsigned integer)
 * 2. As long as there are bits to perform
 * - 2.1: We get the bit at the left and the right positions.
 * - 2.2: And then, we set the bit at the left ot the the right and vice versa.
 *
 * 3. We increase the left and the right pointers by 1 to perform the next bit.
 * 4. We convert the n to an unsigned 32-bit integer and return it.
 *
 * Time complexity: O(32) = O(1) - where n is the number of the bits.
 *
 * Space complexity: O(1)
 */
const reverseBits = (n) => {
  let left = 0;
  let right = 31;

  while (left < right) {
    let leftBit = getBit(n, left);
    let rightBit = getBit(n, right);

    n = setBit(n, left, rightBit);
    n = setBit(n, right, leftBit);

    left++;
    right--;
  }

  return n >>> 0;
};

/**
 * https://leetcode.com/problems/reverse-bits/description/
 *
 * Two Pointer & Bitwise Operations Approach
 *
 * 1. We initialize the left pointer starts zero, and the right pointer starts from 31 (since the input n is the 32 bits unsigned integer)
 * 2. As long as there are bits to perform
 * 3. We get the bit at the left and the right positions.
 * 4. If the left, and the right bits are not the same.
 * - 4.1: We flip at the position of the left and the right to the corresponding 1 or 0.
 *
 * 5. We increase the left and the right pointers by 1 to perform the next bit.
 * 6. We convert the n to an unsigned 32-bit integer and return it.
 *
 * Time complexity: O(32) = O(1) - where n is the number of the bits.
 *
 * Space complexity: O(1)
 */
const reverseBits = (n) => {
  let left = 0;
  let right = 31;

  while (left < right) {
    let leftBit = getBit(n, left);
    let rightBit = getBit(n, right);

    if (leftBit !== rightBit) {
      n = n ^ (1 << left);
      n = n ^ (1 << right);
    }

    left++;
    right--;
  }

  return n >>> 0;
};

const getBit = (n, k) => {
  return (n >> k) & 1;
};

const setBit = (n, k, value) => {
  return value === 1 ? n | (1 << k) : n & ~(1 << k);
};
