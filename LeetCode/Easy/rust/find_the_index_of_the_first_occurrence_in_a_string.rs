/**
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
 *
 * Sliding Window + Rabin Karp Algorithm Approach
 *
 * 1. We define a base number (`base`) and a large prime number (`mod`) to avoid overflow and keep hash values positive during calculations.
 *
 * 2. Hash Calculation:
 * - 2.1: Needle Hash: we iterate through each character in needle, calculate its character code, multiply it by the current hash value (initially 0), add it to the hash, and take the modulo by `mod` to keep the value within a specific range. This creates a unique hash for the entire needle string.
 *
 * - 2.2: Haystack Hash (Initial Window): Similar to needleHash, we calculate the hash for the first n characters of the haystack string.
 *
 * 3. Rolling Hash for Efficiency: We calculate a power value (`power`) which represents the base raised to the power of `n-1`. It's used later for efficient hash value update in the sliding window approach.
 *
 * 4. Sliding Window for Matching: We iterate through the haystack string using a window of size n (the length of the needle).
 * - 4.1: We first compare the current haystackHash with the pre-calculated needleHash.
 *
 * - 4.2: If the hashes match, we perform an additional check to confirm an actual match by comparing the corresponding substring in haystack with needle. This condition avoids false positives due to potential hash collisions.
 *
 * - 4.3: If both condition are true, we return the current index as the first index of matching substring.
 *
 * - 4.3: Otherwise, if the hashes don't match or the character-by-character check fails, we update the haystackHash for the next window. The `i < m - n` check ensures the loop doesn't attempt to access characters outside the haystack string (in case needle length is greater than haystack length).
 *
 * - 4.4: We update the haystackHash by removing the contribution of the leftmost character from the current hash using `haystack.charCodeAt(i) * power`, and then add the contribution of the rightmost character from the next window using `haystack.charCodeAt(i + n)`.
 *
 * - 4.5: The modulo by mod ensures the hash value stays within the desired range.Any negative hash value is adjusted back to positive by adding mod. This process iterates through all possible starting positions of the needle within the haystack.
 *
 * 5. If no match is found after iterating through all possible windows, we return `-1`.
 *
 * Time complexity: O(n + m), where n is the length of needle, m is the length of haystack.
 *
 * Space complexity: O(n), where n is the length of needle.
 */
impl Solution {
    pub fn str_str(haystack: String, needle: String) -> i32 {
        let m = haystack.len();
        let n = needle.len();

        if n == 0 {
            return 0;
        }

        if m < n {
            return -1;
        }

        let base: i64 = 2;
        let mod_val: i64 = 1_000_000_007;

        // Calculate the hash of the needle string
        let mut needle_hash: i64 = 0;
        for c in needle.chars() {
            needle_hash = (base * needle_hash + c as i64) % mod_val;
        }

        // Calculate the hash of the first n characters of the haystack string
        let mut haystack_hash: i64 = 0;
        for c in haystack.chars().take(n) {
            haystack_hash = (base * haystack_hash + c as i64) % mod_val;
        }

        // Power of base to the n-1, used for rolling hash
        let mut power: i64 = 1;
        for _ in 0..n - 1 {
            power = (power * base) % mod_val;
        }

        // Find the matching substring based on the hashes and substring
        for i in 0..=m - n {
            if needle_hash == haystack_hash && &haystack[i..i + n] == needle {
                return i as i32;
            }

            if i < m - n {
                haystack_hash = (base
                    * (haystack_hash - (haystack.chars().nth(i).unwrap() as i64) * power)
                    + haystack.chars().nth(i + n).unwrap() as i64)
                    % mod_val;

                if haystack_hash < 0 {
                    haystack_hash += mod_val;
                }
            }
        }

        // Return -1 if not found
        -1
    }
}
