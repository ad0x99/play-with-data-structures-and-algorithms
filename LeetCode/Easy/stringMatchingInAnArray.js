/**
 * https://leetcode.com/problems/string-matching-in-an-array/description/
 *
 * Brute Force Approach
 *
 * Idea: We iterate through each word and check:
 *
 * - If the current word `words[i]` is not equal to the current word `words[j]`. This ensures we don't consider a word as a substring of itself.
 * - And if `words[j]` is a substring of `words[i]`
 *
 * If both conditions is true, that means we found a substring. But we in case we have multiple words that have the same substring, we need another condition to avoid duplicates.
 *
 * - If the substring `words[j]` hasn't already been added to the result array. This ensures that we only add substring once.
 *
 * Time complexity: O(n ^ 2), where n is the length of words array.
 *
 * Space complexity: O(n), where n is the length of result array.
 */
const stringMatching = (words) => {
  const result = [];

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (
        words[i] !== words[j] &&
        words[i].includes(words[j]) &&
        !result.includes(words[j])
      ) {
        result.push(words[j]);
      }
    }
  }

  return result;
};

/**
 * Trie Approach
 *
 * Idea: Build a prefix trie for each character of each word, and keep updating the frequency of each word path.
 *
 * If a word path that has the frequency is greater than 1, that means, the path from the root to the current node is a complete work or a suffix that appears more than once in the other strings. Then, the current word is a substring of other words.
 *
 * Example of the final representation Trie Map:
 *
 * words = ["mass","as","hero","superhero"]
 * result = ["as","hero"]
 *
 * ```js
 * Map(9) {
 *  'm' => TrieNode { children: Map(1) { 'a' => [TrieNode] }, frequency: 1 },
 *  'a' => TrieNode { children: Map(1) { 's' => [TrieNode] }, frequency: 2 },
 *  's' => TrieNode {
 *    children: Map(2) { 's' => [TrieNode], 'u' => [TrieNode] },
 *    frequency: 4
 *  },
 *  'h' => TrieNode { children: Map(1) { 'e' => [TrieNode] }, frequency: 2 },
 *  'e' => TrieNode { children: Map(1) { 'r' => [TrieNode] }, frequency: 3 },
 *  'r' => TrieNode {
 *    children: Map(2) { 'o' => [TrieNode], 'h' => [TrieNode] },
 *    frequency: 3
 *  },
 *  'o' => TrieNode { children: Map(0) {}, frequency: 2 },
 *  'u' => TrieNode { children: Map(1) { 'p' => [TrieNode] }, frequency: 1 },
 *  'p' => TrieNode { children: Map(1) { 'e' => [TrieNode] }, frequency: 1 }
 * }
 * ```
 *
 * Implementation
 *
 * 1. We create a TrieNode class represents a node in the Trie. In contains:
 * - 1.1: A children property that holds a map associating characters with their child nodes.
 * - 1.2: A frequency property that keeps track of how many times the path from the root to this node represents a complete word inserted into the Trie.
 *
 * 2. `Insert` Function: this function takes a word as input and inserts it into the Trie as a suffix trie.
 * - 2.1: We iterate over each character (char) in the word.
 *
 * - 2.2: For each character, we check if a child node exists for that character in the current node (node). If not, we create a new node the current character in the children map.
 *
 * - 2.3: We increment the frequency count (frequency) of the current character by 1. This indicates how many times this character sequence has appeared so far as a suffix of a word inserted into the Trie.
 *
 * - 2.4: We update the current node to move to the next child node corresponding to the current character.
 *
 * - 2.5: By inserting all suffixes of each word, the Trie essentially stores all possible substrings as paths from the root to a leaf node. The frequency count at each node reflects how many words in the array share that particular substring.
 *
 * 3. `Get` Function: this function takes a word (word) as input and checks if it's a substring of any other word in the array (excluding itself).
 * - 3.1: We iterate over each character of the word, traversing the Trie from the root node.
 *
 * - 3.2: If any character in the word doesn't have a corresponding child node in the Trie, it means the word isn't present as a complete word or a suffix of any other word. We return false.
 *
 * - 3.3: Otherwise, If the traversal reaches a leaf node (a node with no children), we then check the frequency count. If the frequency is greater than 1, it means this suffix has appeared in multiple words (including the current word). Therefore, the current word is a substring of another word, and we return true.
 *
 * 4. In the `stringMatching` function:
 * - 4.1: We first creates a new Trie (trie) and an empty result array (result).
 *
 * - 4.2: We iterate through each word (word) in the words array.
 *
 * - 4.3: For each word, we build the suffix trie using the insert function for all possible suffixes starting from each index (i) in the word (word.slice(i)). This ensures all substrings of the current word are captured in the Trie.
 *
 * - 4.4: After building the Trie, we iterate through each word (word) again.
 *
 * - 4.5: We use the get function to check if the current word itself is a substring of any other word (by checking the frequency count at the leaf node reached after traversing the word's characters in the Trie).
 *
 * - 4.6: If get(word) returns true, it means the current word is a substring of another word, we then add the current word to the result array.
 *
 * 5. Finally, we return result array.
 *
 * Time complexity:
 * - stringMatching: O(n * m), where n is the length of words array, and m is the number of characters of each word.
 * - Insert: O(m)
 * - Get: O(m)
 *
 * Space complexity: O(n), where n is the length of Trie's children Map.
 */
class TrieNode {
  constructor() {
    this.children = new Map();
    this.frequency = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const char of word) {
      // If there is no node of current char, then add a new one
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }

      // Increment the frequency count of current char
      node.children.get(char).frequency++;
      node = node.children.get(char);
    }
  }

  get(word) {
    let node = this.root;

    for (const char of word) {
      // Traverse through each node from the root node
      // If it reaches a leaf node where the frequency is greater than 1,
      // it means this suffix has appeared in multiple words => substring
      node = node.children.get(char);
    }

    return node.frequency > 1;
  }
}

const stringMatching = (words) => {
  const trie = new Trie();
  const result = [];

  // Build suffix trie of each word
  for (const word of words) {
    for (let i = 0; i < word.length; i++) {
      trie.insert(word.slice(i));
    }
  }

  // Build substring result
  for (const word of words) {
    if (trie.get(word)) {
      result.push(word);
    }
  }

  return result;
};
