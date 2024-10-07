/**
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 *
 * Hash Set Approach
 *
 * Idea: We store all the substring of the word from the first character to the last one into a trieSet set to support searching prefix, and store the complete word into completeWord set to support searching complete word.
 *
 * Time complexity:
 * - insert: O(n), where n is the length of the word
 * - search: O(1)
 * - startsWith: O(1)
 *
 * Space complexity: O(n), where n is the total number of characters in all the words inserted into the trieSet.
 */
class Trie {
  constructor() {
    this.trieSet = new Set(); // Store prefix of word
    this.completeWord = new Set(); // Store complete word
  }

  insert(word) {
    let i = 0;
    while (i < word.length) {
      if (i + 1 === word.length) {
        this.completeWord.add(word.slice(0, i + 1));
      }
      this.trieSet.add(word.slice(0, i + 1));
      i++;
    }
  }

  search(word) {
    return this.completeWord.has(word) ? true : false;
  }

  startsWith(prefix) {
    return this.trieSet.has(prefix) ? true : false;
  }
}

/**
 * Trie Approach
 *
 * Idea: we will use a Trie representation to store each character of a string in each node in the Trie.
 *
 * A complete word will be formed if we go through from the root node to the last node of an edge formed a complete word.
 *
 * Example with string `"apple"`
 *
 * ```js
 *   Root
 *   |
 *   'a' -- (isCompleteWord: false, children: { 'p' })
 *     |
 *   'p' -- (isCompleteWord: false, children: { 'p' })
 *     |
 *   'p' -- (isCompleteWord: false, children: { 'l' })
 *     |
 *   'l' -- (isCompleteWord: false, children: { 'e' })
 *     |                              |
 *   'e' -- (isCompleteWord: true, children: { 'i' }) -> Last node of this edge
 * ```
 *
 * Implementation:
 *
 * 1. We define a TrieNode which contains the information of a node in the Trie.
 * - 1.1: The `children` Map stores the outgoing edges (characters) from the current node and their corresponding child nodes.
 * - 1.2: The `isCompleteWord` variable indicates if the current node represents the end of a complete word inserted into the Trie.
 *
 * 2. In the Trie class, we initialize a root node which is a TrieNode instance as the starting point of the Trie.
 *
 * 3. `Insert Function`: This function takes a word as input and inserts it into the Trie
 * - 3.1: We start with the currentNode set to the root node.
 * - 3.2: We iterate through each character (char) in the word.
 * - 3.3: For each character we check, if the current node has not had a child node for the current character, it means the current character doesn't exist in the Trie yet. We then create a new TrieNode for current character and add it into the `children` map.
 * - 3.4: We assign the currentNode to the child node corresponding to the current character to move to next node.
 * - 3.5: After iterating through all characters, we mark the last node (currentNode) as a complete word which indicates that the entire word has been inserted.
 *
 * 4. `Search Function`: This function takes a word as input and checks if the entire word exists in the Trie.
 * - 4.1: We start with the currentNode set to the root node.
 * - 4.2: We iterate through each character (char) in the word.
 * - 4.3: For each character, we check if the current node has no child node for the current character, it means the word doesn't exist. We return false.
 * - 4.4: Otherwise, we assign the currentNode to the current child node corresponding to the current character to move to the next node.
 * - 4.5: After iterating through all characters, we check if the last node is marked as a complete word. If it is, it means the entire word was found in the Trie, so we return true, otherwise, return false.
 *
 * 5. `StartsWith Function`: This function takes a prefix as input and checks if the prefix is a starting sequence of any word in the Trie.
 * - 5.1: We start with the currentNode set to the root node.
 * - 5.2: We iterate through each character (char) in the prefix.
 * - 5.3: For each character, we check if the current node has no child node for the current character, it means the prefix cannot be the beginning of any word in the Trie, so we return false.
 * - 5.4: Otherwise, we assign the currentNode to the current child node corresponding to the current character to move to the next node.
 * - 5.5: After iterating through all characters in the prefix, we reach a node in the Trie. This doesn't necessarily mean a complete word exists at that node, but it confirms that the prefix is a sequence of characters that can be the beginning of a word in the Trie. So, we return true.
 *
 *
 * Time complexity: O(n), where n is the length of the word
 *
 * Space complexity: O(n), where n is the length of children map.
 */
class TrieNode {
  constructor() {
    this.children = new Map(); // Store edge and node's value of that edge
    this.isCompleteWord = false; // Store complete word
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }

      currentNode = currentNode.children.get(char);
    }

    currentNode.isCompleteWord = true;
  }

  search(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      if (!currentNode.children.has(char)) return false;

      currentNode = currentNode.children.get(char);
    }

    return currentNode.isCompleteWord;
  }

  startsWith(prefix) {
    let currentNode = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix.charAt(i);
      if (!currentNode.children.has(char)) return false;

      currentNode = currentNode.children.get(char);
    }

    return true;
  }
}
