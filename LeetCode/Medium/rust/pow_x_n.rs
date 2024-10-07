/**
 * https://leetcode.com/problems/powx-n/description/
 *
 *
 * The key idea behind the formula `myPow(x, Math.floor(n / 2))` in the myPow function lies in exploiting the properties of exponentiation for efficient calculation.
 *
 * Problem analysis:
 *
 * We want to calculate `x ^ n`.
 *
 * The formula takes the original exponent `n` and divides it by `2` (n / 2). This gets the integer part of the division, which is essentially the "half power" (raised to half the original exponent).
 *
 * By recursively calling myPow(x, (n / 2)), we're calculating `x` raised to this "half power".
 *
 * Instead of directly calculating `x ^ n`, which can be computationally expensive for large values of `n`, we break it down into two smaller calculations of `x^(n/2)`. This is efficient because of the exponentiation property mentioned earlier.
 *
 * Implementation:
 *
 * 1. The edge case: When n is i32::MIN (-2147483648), converting -n will overflow. To avoid this, we handle this specific case by noting that `x^n` is the same as `1.0 / (x^-n)`, and we can write it as `1.0 / (x^(2147483647+1))` which is `1.0 / (x^2147483647 * x)`.
 *
 * 2. The base case: F(0) = 1 and if n < 0 => F(n) = 1 / F(-n)
 * - 1.1: If n (the exponent) is equal to `0` (zero), anything raised to zero is simply `1`. We return `1` in this case.
 * - 1.2: If n is negative (less than zero), we calculate `1.0 / myPow(x, -n)`. This essentially flips the sign of the exponent and takes the reciprocal (1 divided by the result of `myPow(x, -n)`).
 *
 *
 * 3. Recursion Relation: If n is even number `F(n) = F(n / 2) * F(n / 2)`, otherwise, `F(n / 2) * F(n / 2) * x`.
 * - 3.1: We calculate half of the power efficiently. It uses Math.floor(n / 2) to get the integer part of dividing n by 2. This essentially calculates x^(n/2).
 * - 3.2: We recursively call myPow function with `x` as the base and `n / 2` (half of the original exponent) as the new exponent. The result is stored in the half variable.
 *
 * 4. If n is even (no remainder when divided by 2), we square the half value calculated earlier. Since half represents `x^(n/2)`, squaring it effectively calculates `x^(n/2) * x^(n/2)`, which is the same as `x^n` for an even exponent `n`.
 *
 * 5. If n is odd (has a remainder of 1 when divided by 2), we multiply the squared half value by x. This calculates `x^(n/2) * x^(n/2) * x`, which is `x^n` for an odd exponent `n`.
 *
 * For example: x = 2, n = 10
 *
 *   myPow(2, 10)
 *   └── myPow(2, 5)
 *       └── myPow(2, 2)
 *           └── myPow(2, 1)
 *               └── myPow(2, 0) => 1
 *           └── => 2 (1 * 1 * 2)
 *       └── => 4 (2 * 2)
 *   └── => 32 (4 * 4 * 2)
 *  => 1024 (32 * 32)
 *
 * Time complexity: O(log n) because we are dividing the problem size by 2 in each recursive call.
 *
 * Space complexity: O(log n)
 */
impl Solution {
    pub fn my_pow(x: f64, n: i32) -> f64 {
        // Handle the edge case when n is i32::MIN
        if n == i32::MIN {
            return 1.0 / (Self::my_pow(x, i32::MAX) * x);
        }

        // Base cases
        if n == 0 {
            return 1.0;
        }
        if n < 0 {
            return 1.0 / Self::my_pow(x, -n);
        }

        // Recursion
        let half = Self::my_pow(x, n / 2);

        if n % 2 == 0 {
            return half * half;
        }

        return half * half * x;
    }
}
