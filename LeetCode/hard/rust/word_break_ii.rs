use std::collections::{HashMap, HashSet};
/**
 * https://leetcode.com/problems/word-break-ii/description/
 *
 * 1. We create a `memo` Map to store previously calculated results for starting indices, using memoization to avoid redundant calculations.
 *
 * 2. The base case: If start reaches the end of the string (start === n), it means an empty string represents a complete sentence (no more words needed). We return an empty array [''] to indicate this.
 *
 * 3. We first check if the result for the current starting index start already exists in the `memo` map, then we return the stored value directly (avoiding recalculation).
 *
 * 4. We create an sentences array to store all possible sentences found, and iterate through all words in the wordDict array.
 *
 * 5. We calculate the potential ending index (end) for the current word.
 *
 * 6. We extract the current word substring (currentWord) from the original string s, and check if the ending index is within the string's boundaries (end <= n) and if the extracted substring matches the current word (currentWord === word).
 *
 * 7. If the word matches, we make a recursive call to dfs(end) to explore possible sentences starting from the next index (end) after using the current word.
 * - 7.1: We then map the returned sentences (nextSentences) from the recursive call. This mapping adds the current word to the beginning of each sentence and a space (' ') if the sentence isn't empty.
 *
 * - 7.2: And we push the mapped sentences with the current word prepended into the sentences array.
 *
 * 8. After each exploration, we store the final sentences array in the memo map for the current starting index start, and we return the sentences array, which contains all possible valid word break sentences starting from the given starting index.
 *
 * Time complexity: O(n ^ 2 * m), where n is the length of s, and m is the length of words in wordDict
 *
 * Space complexity: O(n), where n is the length of s.
 */
impl Solution {
    pub fn word_break(s: String, word_dict: Vec<String>) -> Vec<String> {
        let n = s.len();
        let word_set: HashSet<String> = word_dict.into_iter().collect();
        let mut memo: HashMap<usize, Vec<String>> = HashMap::new();

        fn dfs(
            s: &str,
            start: usize,
            n: usize,
            word_set: &HashSet<String>,
            memo: &mut HashMap<usize, Vec<String>>,
        ) -> Vec<String> {
            if start == n {
                return vec![String::new()];
            }

            if let Some(sentences) = memo.get(&start) {
                return sentences.clone();
            }

            let mut sentences = Vec::new();

            for end in start + 1..=n {
                let current_word = &s[start..end];

                if word_set.contains(current_word) {
                    let next_sentences = dfs(s, end, n, word_set, memo);
                    for sentence in next_sentences {
                        if sentence.is_empty() {
                            sentences.push(current_word.to_string());
                        } else {
                            sentences.push(format!("{} {}", current_word, sentence));
                        }
                    }
                }
            }

            memo.insert(start, sentences.clone());
            sentences
        }

        dfs(&s, 0, n, &word_set, &mut memo)
    }
}
