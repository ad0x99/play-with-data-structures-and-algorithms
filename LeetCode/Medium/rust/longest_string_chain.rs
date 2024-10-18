/**
 * https://leetcode.com/problems/longest-string-chain/description/
 *
 * Top-Down Dynamic Programming Approach
 *
 * Idea: We will find the longest chain words such that each word in the chain can be obtained by removing exactly one character from the next word in the sequence.
 *
 * First, we need to sort the words by its length. Because shorter words can act as "predecessors" for longer words by removing one character. This ensures that any word that could potentially be a predecessor (a shorter word) is processed before the longer word. This ensures that when processing longer words, all possible predecessors have already been considered.
 *
 * For each word, we try removing one character at each position to generate what we call a predecessor. If this predecessor exists in the list of words, it can form a valid chain.
 *
 * Implementation
 *
 * 1. We sort the words by word's length with the shorter word would be processed first.
 *
 * 2. We store the index of each word in map for fast lookup later when we want to check if a predecessor exists. This allows us to search for a word’s predecesso in O(1) time.
 *
 * 3. Memoization: We create a dp Map which is used to store the longest chain length for each word (by its index). This ensures that we don't recompute the chain length for a word that has already been processed.
 *
 * 4. Depth-First Search:
 * - 4.1: Base case: Each word starts with a default chain length of 1 (itself).
 *
 * - 4.2: If a word is already processed, we return its longest chain length.
 *
 * - 4.3: Predecessor generation: We iterate over each letter in the word, removing it to form a potential predecessor. For example, if word = "abc", removing each letter would give ["bc", "ac", "ab"].
 *
 * - 4.4: Predecessor lookup: If a valid predecessor exists in the wordIndex map, we call dfs recursively on the predecessor. The longest chain is updated by adding 1 to the length of the predecessor’s chain.
 *
 * - 4.5: Memoization: Once the longest chain for the current word is computed, it is stored in the dp map for future reference.
 *
 * 5. We iterate over all words and calls dfs to compute the longest chain for each one. Every time we call the dfs to calculate the longest chain of each word, we update the longestChain variable to keep track the longest chain of all words.
 *
 * Time complexity: O(n * m ^ 2), where n is the number of words in words and m is the length of each word.
 *
 * Space complexity: O(n), where n is the length of wordIndex and dp
 */
use std::collections::HashMap;
impl Solution {
    pub fn longest_str_chain(words: Vec<String>) -> i32 {
        let mut words = words.clone();

        // Sort the words by their length
        words.sort_by(|a, b| a.len().cmp(&b.len()));

        // Create a HashMap to store the index of each word for fast lookup
        let mut word_index: HashMap<String, usize> = HashMap::new();
        for (i, word) in words.iter().enumerate() {
            word_index.insert(word.clone(), i);
        }

        // Memoization map for storing the length of the longest chain for each word
        let mut dp: HashMap<usize, i32> = HashMap::new();

        // DFS to find the longest chain for a word at the given index
        fn dfs(
            index: usize,
            words: &Vec<String>,
            word_index: &HashMap<String, usize>,
            dp: &mut HashMap<usize, i32>,
        ) -> i32 {
            if let Some(&result) = dp.get(&index) {
                return result;
            }

            let mut result = 1;
            let word = &words[index];

            // Try removing each letter to create a predecessor
            for i in 0..word.len() {
                let mut predecessor = word.clone();
                predecessor.remove(i);

                // If the predecessor exists, recursively calculate its chain length
                if let Some(&predecessor_index) = word_index.get(&predecessor) {
                    result = result.max(dfs(predecessor_index, words, word_index, dp) + 1);
                }
            }

            dp.insert(index, result);
            result
        }

        let mut longest_chain = 0;

        // Calculate the longest chain starting from each word
        for i in 0..words.len() {
            longest_chain = longest_chain.max(dfs(i, &words, &word_index, &mut dp));
        }

        longest_chain
    }
}
