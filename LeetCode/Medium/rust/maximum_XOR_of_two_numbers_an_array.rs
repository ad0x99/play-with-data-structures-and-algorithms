/**
 * https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/
 *
 * Bit Manipulation Approach
 *
 * The idea behind this approach is to exploit the property of XOR that for any two numbers a and b, a ^ b (their XOR) will have a set bit only at the positions where the corresponding bits in a and b differ.
 *
 * In term of bit, the maximum number will be the number that has as much 1 bit as it can in the left of bit set.
 *
 * For example: a = 11000, b = 11100 => the maximum between these two will be the number b, because it has much more 1 bit in the left than a.
 *
 * Therefore, to maximize the XOR, we want as many bits as possible in the result to be 1. At each step, we assume that the current bit can be set to 1 and checks if this assumption is feasible given the numbers in the array.
 *
 * As we know that if corresponding bits are the same (both 0 or both 1), the XOR result at that position will be 0. If they differ (one is 0 and the other is 1), the XOR result at that position will be 1.
 *
 * So, at each iteration, we assume the current bit in the result can be 1 (temp = result | (1 << i)). we then check if there exists two prefixes in the set such that their XOR is equal to this temp. If such prefixes are found, it means setting this bit to 1 is possible, and the result is updated.
 *
 *
 * Implementation
 *
 * 1. We initialize a `mask` variable with initial value is 0 which will be used as a bitmask to isolate a specific range of bits in each number during the loop, and a `result` variable with initial value is 0 which will store the maximum XOR value found so far.
 *
 * 2. We iterate from the most significant bit to the least significant bit.
 * - 2.1: In each iteration (i), we update the mask variable using a bitwise `OR` operation (|) with `1 << i`.
 *
 * - 2.2: This creates a mask with 1 set at the ith position from the left and 0s in all other positions. This allows us to focus on a specific range of bits in each number during the inner loop.
 *
 * 3. We create a seen Set to store the prefixes.
 *
 * 4. We iterate through each number (num) in the nums array.
 * - 4.1: For each number, we perform a bitwise AND operation (&) with the current mask. This isolates the bits in the ith position and to the left (more significant bits) in each number n.
 *
 * - 4.2: The result of the AND operation (`n & mask`) is added to the seen set. This essentially creates a set that stores the prefixes (considering the ith bit and higher) of all numbers in the array.
 *
 * 5. We initialize a `temp` variable. It's calculated by performing a bitwise OR operation (|) between the current `result` and `1 << i`. This injects a `1` at the `ith` position in the current result (which represents the maximum XOR seen so far).
 *
 * 6. We iterate through each element (prefix) in the seen set. Inside this loop:
 * - 6.1: If the seen set also contains the `XOR` of `prefix` and `temp`. In means, if there exists another number in the array whose prefix (considering the ith bit and higher) when XORed with the current temp (potential maximum XOR with the current prefix) results in the same prefix as the prefix in seen set.
 *
 * - 6.2: If such a pair is found, it means that extending the current result (potential maximum XOR) by setting the ith bit to 1 (using temp) is a valid option because it leads to a valid XOR combination with another number in the array.
 *
 * - 6.3: If a valid XOR pair is found, we update the result to temp (the current potential maximum XOR with the ith bit set to 1). Additionally, we will break the inner loop as we've found the best candidate for the ith position in the maximum XOR.
 *
 * 7. If no valid XOR pair is found in the inner loop, it means setting the ith bit in the current result wouldn't lead to a larger XOR value. The loop continues to the next iteration (i - 1) to explore the potential of setting the next bit (one position to the left) in the maximum XOR.
 *
 * 8. After iterating through all bit positions, the final value of result holds the maximum XOR possible within the array. we return this value.
 *
 * Time complexity: O(n)
 *
 * Space complexity: O(1)
 */
use std::collections::HashSet;

impl Solution {
    pub fn find_maximum_xor(nums: Vec<i32>) -> i32 {
        let mut mask = 0;
        let mut result = 0;

        for i in (0..32).rev() {
            mask |= 1 << i;
            let mut seen = HashSet::new();
            for &num in &nums {
                seen.insert(num & mask);
            }

            let temp = result | (1 << i);
            for &prefix in &seen {
                if seen.contains(&(prefix ^ temp)) {
                    result = temp;
                    break;
                }
            }
        }

        result
    }
}

/**
 * Radix Search Tree Approach
 *
 * Time complexity: O(n * k), where n is length of array, k is the height of the Radix search tree.
 *
 * Space complexity: O(n * k)
 */
struct TrieNode {
    children: [Option<Box<TrieNode>>; 2],
    value: i32,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: [None, None],
            value: 0,
        }
    }
}

struct Trie {
    root: TrieNode,
}

impl Trie {
    fn new() -> Self {
        Trie {
            root: TrieNode::new(),
        }
    }

    fn insert(&mut self, num: i32) {
        let mut node = &mut self.root;

        for i in (0..32).rev() {
            let bit = ((num >> i) & 1) as usize;
            if node.children[bit].is_none() {
                node.children[bit] = Some(Box::new(TrieNode::new()));
            }

            node = node.children[bit].as_mut().unwrap();
        }

        node.value = num;
    }

    fn get_xor(&self, num: i32) -> i32 {
        let mut node = &self.root;

        for i in (0..32).rev() {
            let bit = ((num >> i) & 1) as usize;
            let opposite_bit = 1 - bit;

            if node.children[opposite_bit].is_some() {
                node = node.children[opposite_bit].as_ref().unwrap();
            } else {
                node = node.children[bit].as_ref().unwrap();
            }
        }

        node.value
    }
}

impl Solution {
    pub fn find_maximum_xor(nums: Vec<i32>) -> i32 {
        let mut trie = Trie::new();
        for &num in &nums {
            trie.insert(num);
        }

        let mut max_xor = 0;
        for &num in &nums {
            max_xor = max_xor.max(num ^ trie.get_xor(num));
        }

        max_xor
    }
}
