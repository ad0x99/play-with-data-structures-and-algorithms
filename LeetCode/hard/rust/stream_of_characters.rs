/**
 * https://leetcode.com/problems/stream-of-characters/description/
 *
 * Trie - Prefix Matching Approach
 *
 * Idea: We build a Trie to contain the prefix of any word. But instead of storing as its original order, we will store words in reverse order.
 *
 * By storing words in reverse order, each query checks the stream of characters from the end (most recent character) towards the beginning (older characters).
 *
 * It allows the most recent character in the stream to be directly compared with the first character of the stored words. If we stored the words in normal order, we would need to traverse the entire stream backward to compare each suffix.
 *
 * For example: words = ["cd", "f", "kl"]
 *
 * Normal order
 *
 * ```js
 *       root
 *    /   |   \
 *  'c'  'f'  'k'
 *  /           \
 *'d'           'l'
 * ```
 *
 * Reverse order
 *
 *```js
 *       root
 *    /   |   \
 *  'd'  'f'  'l'
 *  /           \
 *'c'           'k'
 *```
 *
 *```js
 * root
 * └── 'd'
 * │    └── 'c' (endWord = true)
 * └── 'f' (endWord = true)
 * └── 'l'
 *      └── 'k' (endWord = true)
 *```
 *
 * Implementation
 *
 * 1. We create a TrieNode class represents a node in the Trie, with a children map to store child nodes for each character and an endWord flag to mark the end of a word.
 *
 * 2. Inside the StreamChecker class, we initialize an `stream` array is used to store the characters added using the query function. This array essentially represents the sequence of characters seen so far in the stream. Because every time we query a letter, we need to query that letter with the previous letter as well.
 *
 * 3. The insert function takes a word and inserts it into the Trie in reverse order. This allows for efficient searching based on prefixes from the end of the stream.
 *
 * 4. The query function takes a new character (letter) as input and adds it to the stream array. We then call the get function to check if any word in the Trie has a prefix that matches the current stream of characters.
 *
 * 5. The get function iterates through the stream array in reverse order (starting from the end). For each character in the stream we check:
 * - 5.1: If the current node in the Trie has a child node for that character. If not, it means the prefix doesn't exist, and we return false.
 *
 * - 5.2: Otherwise, If it does exist, we move to the child node corresponding to the current character.
 *
 * - 5.3: If the current node has the endWord flag set to true, it means a complete word matching the prefix exists in the Trie, and we return true.
 *
 * Time complexity: O(n)
 * - insert: O(n), where n is the length of each word in the words
 * - query: O(n), where n is the number of characters in the stream array.
 *
 * Space complexity: O(n)
 * - children: O(n), where n is the number of characters of each word.
 * - stream: O(n), where n is the number of letters
 */
use std::collections::{HashMap, VecDeque};

struct TrieNode {
    children: HashMap<char, TrieNode>,
    end_word: bool,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: HashMap::new(),
            end_word: false,
        }
    }
}

struct StreamChecker {
    root: TrieNode,
    stream: VecDeque<char>,
}

impl StreamChecker {
    fn new(words: Vec<String>) -> Self {
        let mut checker = StreamChecker {
            root: TrieNode::new(),
            stream: VecDeque::new(),
        };
        for word in words {
            checker.insert(&word);
        }
        checker
    }

    fn query(&mut self, letter: char) -> bool {
        self.stream.push_back(letter);
        self.get()
    }

    fn insert(&mut self, word: &str) {
        let mut node = &mut self.root;

        for char in word.chars().rev() {
            node = node.children.entry(char).or_insert_with(TrieNode::new);
        }

        node.end_word = true;
    }

    fn get(&self) -> bool {
        let mut node = &self.root;

        for &char in self.stream.iter().rev() {
            if let Some(next_node) = node.children.get(&char) {
                node = next_node;
                if node.end_word {
                    return true;
                }
            } else {
                return false;
            }
        }

        false
    }
}
