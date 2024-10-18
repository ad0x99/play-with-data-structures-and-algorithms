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
class TrieNode {
  constructor() {
    this.children = new Map();
    this.endWord = false;
  }
}

class StreamChecker {
  constructor(words) {
    this.root = new TrieNode();
    this.stream = new Array();

    for (const word of words) {
      this.insert(word);
    }
  }

  query(letter) {
    this.stream.push(letter);
    return this.get();
  }

  insert(word) {
    let node = this.root;

    // Store each letter of the word in reverse order
    for (let i = word.length - 1; i >= 0; i--) {
      const char = word[i];

      // Add new character to the map if it doesn't exist yet
      if (!node.children.get(char)) node.children.set(char, new TrieNode());

      node = node.children.get(char);
    }

    // Set the last word to be true
    node.endWord = true;
  }

  get() {
    let node = this.root;

    for (let i = this.stream.length - 1; i >= 0; i--) {
      const char = this.stream[i];

      // If there is no character, return false
      if (!node.children.has(char)) return false;

      node = node.children.get(char);

      // Otherwise, if the character exists and it's the last letter of a word, we return true
      if (node.endWord) return true;
    }

    return false;
  }
}
