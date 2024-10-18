/**
 * https://leetcode.com/problems/count-special-integers/description/
 *
 * Top-Down Dynamic Programming Approach
 *
 * Idea: We use digit-by-digit dynamic programming (DP) approach
 *
 * - Tight Bound for Comparison: When we want to count the special numbers that are less than or equal to n, we need to know the individual digits of n to compare digit-by-digit. This helps in forming numbers that don’t exceed n. For example, if n = 1234, we might consider numbers from 0000 to 1234, but not beyond that. By extracting the digits, we can impose this tight condition, ensuring that we do not count numbers greater than n.
 *
 * - Digit-Level Decisions: By extracting the digits, we can work in a digit-by-digit manner. This allows us to decide, for each position, which digits can be used while maintaining constraints (like ensuring the number remains less than or equal to n, and ensuring no repeated digits). For instance, if we’ve already chosen a digit 3 for the first place, the next digit must be less than or equal to 2 in the number n = 1234.
 *
 * - Leading Zeros: Extracting digits also helps handle numbers with leading zeros effectively, especially when forming numbers with fewer digits than n (like numbers 0, 1, 12, etc., for n = 1234).
 *
 * - Bitmasking for Used Digits: we use a bitmask (usedMask) to keep track of which digits have already been used in the current number. This ensures that no digit is reused, as required by the definition of a special number. Extracting digits allows us to apply this bitmask logic on individual digits, ensuring no repetition.
 *
 * Implementation:
 *
 * 1. We extract the digits of n into an array digits, reversed to make traversal easier.
 *
 * 2. Dynamic Programming Recursion: We initialize a dp function with following arguments:
 * - index: Index of the current digit we're considering.
 * - tight: A boolean that tells whether we must match the current digit with n’s digit (if true) or if we can choose any digit (false).
 * - usedMask: A bitmask that tracks which digits have been used in the current number.
 * - leadingZero: A boolean that indicates whether the current digit is a leading zero (to avoid counting numbers with leading zeros as "special numbers").
 *
 * 3. Base case: If we reach to the end of the number, we return 1, indicating a valid number was formed.
 *
 * 4. We calculate the max digit that we can use to form a special number. If tight is true, it means the max digit is the current digit of n, otherwise, possible max digit could be up to 9.
 *
 * 5. We iterate through all possible digits for the current position. We consider all valid digits that haven’t been used yet by checking the usedMask with bitwise operations.
 *
 * 6. If the current digit is already used ((usedMask >> d) & 1), we skip it.
 *
 * 7. We update the `nextTight` and `nextLeadingZero` values based on the current digit choice.
 * - 7.1: The `nextTight` ensures that the newly formed number is still constrained to be less than or equal to n (if tight is true, the next digit must be within the allowed range).
 *
 * - 7.2: The `nextLeadingZero` handles cases where leading zeros are present (e.g., numbers like 01 or 000).
 *
 * 8. If the current digit isn’t a leading zero, the current digit is marked as used by updating nextUsedMask (usedMask | (1 << digit)).
 *
 * 9. We recursively call dp for the next digit, and the answer is added to the ans variable.
 *
 * 10. Finally, we call the dp function which starts the recursion from the first digit (i = 0), with:
 * - tight = true: This means we start with a constraint that the first digit should not exceed the corresponding digit of n.
 * - usedMask = 0: No digits have been used at the start.
 * - leadingZero = true: We begin assuming there might be leading zeros.
 * - The -1 at the end removes the count of the number 0, which isn't considered a special number.
 *
 * Time complexity: O(n * 2^10 * 10)
 * - n is the number of digits in the number n.
 * - 2^10 accounts for the bitmask that represents which digits have been used. Since we are tracking all digits from 0-9, the bitmask can have up to 10 bits.
 * - The 10 factor comes from the loop iterating through all 10 possible digits (0 to 9) at each recursive step.
 *
 * Space complexity: O(n * 2^10),
 * - n: The number of digits in n.
 * - 2^10: The number of different bitmask configurations representing which digits have been used.
 */
impl Solution {
    pub fn count_special_numbers(n: i32) -> i32 {
        // Extract digits of n
        let mut digits = Vec::new();
        let mut n = n;
        while n > 0 {
            digits.push(n % 10);
            n /= 10;
        }
        digits.reverse();

        let len = digits.len();

        // Memoization
        let mut memo = vec![vec![vec![vec![None; 2]; 1024]; 2]; len + 1];

        fn dp(
            i: usize,
            tight: bool,
            used_mask: usize,
            leading_zero: bool,
            digits: &Vec<i32>,
            memo: &mut Vec<Vec<Vec<Vec<Option<i32>>>>>,
        ) -> i32 {
            if i == digits.len() {
                return 1;
            }

            if let Some(res) = memo[i][tight as usize][used_mask][leading_zero as usize] {
                return res;
            }

            let mut ans = 0;
            let max_digit = if tight { digits[i] } else { 9 };

            // Iterate over possible digits
            for d in 0..=max_digit {
                // If digit is already used, skip
                if (used_mask >> d) & 1 == 1 {
                    continue;
                }

                let next_tight = tight && (d == max_digit);
                let next_leading_zero = leading_zero && (d == 0);

                // If the current digit is a leading zero, skip
                // Otherwise, mask digit as used
                let next_used_mask = if next_leading_zero {
                    used_mask
                } else {
                    used_mask | (1 << d)
                };

                ans += dp(
                    i + 1,
                    next_tight,
                    next_used_mask,
                    next_leading_zero,
                    digits,
                    memo,
                );
            }

            memo[i][tight as usize][used_mask][leading_zero as usize] = Some(ans);
            ans
        }

        dp(0, true, 0, true, &digits, &mut memo) - 1
    }
}
