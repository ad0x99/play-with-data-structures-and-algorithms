/**
 * https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/
 *
 * Prefix Matching Approach
 *
 * Idea: We will store the prefixes of each word in the sentence into a Map for lookup later.
 *
 * Besides that, we will store the start index of each word along with the prefix itself, because we want to return the index of the first word (minimum index). This allows us to check the existence of the prefix in the Map and returns the index immediately.
 *
 * Each word will be separated by empty string, therefore, whenever we meet a empty, that means it's the start index of a new word. We use a index variable to keep track the first index of each word.
 *
 * 1. We initialize a `prefix_map` Map to store the prefix and its first index.
 *
 * 2. We initialize a index variable to keep track the position of each word in the sentence, and a start variable which holds the first index of each word, this variable will be used to build a prefix from `start` to `ith + 1` character of each word.
 *
 * 3. We iterate through each word in the sentence.
 *
 * 4. If we reach a empty string, it means we just end a word and will start to build prefix for a new word.
 * - 4.1: We increment the start to the next index which is the first index of new word.
 * - 4.2: We increase the index variable by `1` to indicate the position of word in the sentence.
 * - 4.3: We skip the empty string and move to the next iteration.
 *
 * 5. Each iterate, we build the prefix of a word between (`start, ith + 1`) position. If the prefix doesn't exist in the map, we add the prefix and its position to the map.
 *
 * 6. Each time we build the prefix map, we check if the `search_word` is existed in the map, we return the first index of the word which has the prefix of `search_word`. This allows us return the result as soon as possible instead of waiting to build all the words in the sentence.
 *
 * 7. We return -1 if there is no prefix.
 *
 * Time complexity: O(n), where n is the length of sentence.
 *
 * Space complexity: O(n), where n is the length of prefix map.
 */
use std::collections::HashMap;

impl Solution {
    pub fn is_prefix_of_word(sentence: String, search_word: String) -> i32 {
        let mut prefix_map = HashMap::new();
        let mut start = 0;
        let mut index = 1;

        let sentence_chars: Vec<char> = sentence.chars().collect();

        for i in 0..sentence_chars.len() {
            if sentence_chars[i] == ' ' {
                start = i + 1;
                index += 1;
                continue;
            }

            let prefix: String = sentence_chars[start..=i].iter().collect();
            if !prefix_map.contains_key(&prefix) {
                prefix_map.insert(prefix.clone(), index);
            }

            if prefix == search_word {
                return *prefix_map.get(&prefix).unwrap();
            }
        }

        -1
    }
}
