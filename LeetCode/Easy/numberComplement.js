/**
 * https://leetcode.com/problems/number-complement/description/
 *
 * Bit Manipulation Approach
 *
 * For example: num = 5 (binary: 101)
 *
 * Step 1: Finding Highest Set Bit: The highestBit is initialized to 0.
 *
 * The first iteration: num >> highestBit (5 >> 0) is still 5 (binary: 101).
 * - Since 5 is greater than 0, the loop continues.
 * 
 * The second iteration:
 * - highestBit is incremented to 1.
 * - num >> highestBit (5 >> 1) is 2 (binary: 10).
 * - Since 2 is still greater than 0, the loop continues.
 * 
 * The third iteration:
 * - highestBit is incremented to 2.
 * - num >> highestBit (5 >> 2) is 0 (binary: 00).
 * - Since 0 is not greater than 0, the loop terminates.
 * - After the loop, highestBit holds the value 2, indicating the leftmost 1 bit is in the third position from the right.
 *
 * Step 2: Creating a Bit Mask:
 *
 * - mask = (1 << highestBit) - 1 = (1 << 2) - 1 = 4 - 1 = 3 (binary: 011)
 * 
 * Step 4: Performing Bitwise XOR:
 *
 * - return num ^ mask = 5 ^ 3 = 2 (binary: 10)
 *
 * Implementation:
 *
 * 1. If the input num is zero, its complement is all bits set to 1, which is represented by the number 1. We just return 1 in this case.
 * 2. Find the highest set bit position (leftmost 1)
 * - 2.1: We perform a right shift operation on the input number num by highestBit positions. Basically, it moves the bits in num highestBit positions to the right, discarding the bits that fall off the right end.
 * - 2.2: And then we check if the result of the right shift operation (num >> highestBit) is greater than 0. We're trying to find the leftmost 1 bit in the binary representation of num. As long as num has at least one 1 bit remaining (not shifted off completely), the right-shifted value will still be greater than 0.
 * - 2.3: As long as there are at least one 1 bit remaining after the right shift, the highestBit variable is incremented by 1. This effectively moves the right shift operation one position further to the right in the next iteration.
 * - 2.4: We continue iterating until the right shift operation by highestBit completely shifts off the leftmost 1 bit in num. Once that happens, the right-shifted value will become 0.
 *
 * 3. We create a bit mask with all bits set to 1 up to the highestBit position (the position of the leftmost 1 bit). The left shift (<<) by highestBit creates a number with a single 1 at that position. Subtracting 1 from this value ensures all bits to the right are set to 0.
 * - 3.1: We perform a left shift operation on the number 1 by highestBit positions. Basically, it moves a single 1 bit in the number 1 highestBit positions to the left, creating a new number with a 1 at that specific position and all other bits set to 0.
 * - 3.2: And then, we subtract 1 from the result of the left shift operation. Subtracting 1 effectively sets the rightmost bit (the least significant bit) to 0.
 * - 3.3: This resulting number (mask) acts as a mask because it allows us to isolate and manipulate specific bits in num during the bitwise XOR operation.
 *
 * 4. Finally, we perform a bitwise XOR operation between the input num and the mask. XOR operation flips the bits wherever the corresponding bits in the operands are different. In this case, the mask has all bits set to 1 up to the highestBit position. So, the XOR operation effectively flips all bits in num within that range, resulting in the two's complement.
 * - 4.1: The XOR operation (^) compares the corresponding bits in two operands (in this case, num and mask).
 * - 4.2: If the corresponding bits are the same (both 0s or both 1s), the result bit in the output will be 0. If the corresponding bits are different (one is 0 and the other is 1), the result bit in the output will be 1.
 * - 4.3: Because of that the mask has all bits set to 1 up to the position of the leftmost 1 bit (highestBit) in num. When we perform the XOR operation between num and mask
 * - 4.3.1: The bits in num that are to the right of the leftmost 1 (including the least significant bit) will not be affected by the mask because those bits in the mask are also 0.
 * - 4.3.1: However, for bits in num up to the position of the leftmost 1: If the bit in num is 0, the XOR with the corresponding 1 in the mask will flip that bit to 1 in the output. If the bit in num is already 1, the XOR with the corresponding 1 in the mask will result in a 0 in the output (since both bits are the same).
 * - 4.4: By flipping the bits in num up to the leftmost 1 position using the XOR with the mask, we essentially achieve the two's complement of a number by inverting the bits (flipping 0s to 1s and vice versa)
 *
 * Time complexity: O(log n), where n is the input number. This is because the while loop iterates through the bits of the input number, which is proportional to the number of bits in the input number (log n).
 *
 * Space complexity: O(1)
 */
const findComplement = (num) => {
  // Handle the special case of 0 (complement is 1 with all bits set to 1)
  if (num === 0) {
    return 1;
  }

  // Find the highest set bit position (leftmost 1)
  let highestBit = 0;
  while (num >> highestBit > 0) {
    highestBit++;
  }

  // Create a mask with all bits set to 1 up to the highest set bit position
  const mask = (1 << highestBit) - 1;

  // Perform bitwise XOR to flip all bits in the masked region
  return num ^ mask;
};
