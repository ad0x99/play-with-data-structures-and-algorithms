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
use std::collections::HashSet;
struct Trie {
    trie_set: HashSet<String>,      // Store prefix of word
    complete_word: HashSet<String>, // Store complete word
}

impl Trie {
    fn new() -> Self {
        Trie {
            trie_set: HashSet::new(),
            complete_word: HashSet::new(),
        }
    }

    fn insert(&mut self, word: String) {
        let mut i = 0;
        while i < word.len() {
            if i + 1 == word.len() {
                self.complete_word.insert(word[..i + 1].to_string());
            }

            self.trie_set.insert(word[..i + 1].to_string());
            i += 1
        }
    }

    fn search(&self, word: String) -> bool {
        self.complete_word.contains(&word)
    }

    fn starts_with(&self, prefix: String) -> bool {
        self.trie_set.contains(&prefix)
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
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

struct TrieNode {
    children: HashMap<char, Rc<RefCell<TrieNode>>>,
    is_complete_word: bool,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: HashMap::new(),
            is_complete_word: false,
        }
    }
}

struct Trie {
    root: Rc<RefCell<TrieNode>>,
}

impl Trie {
    fn new() -> Self {
        Trie {
            root: Rc::new(RefCell::new(TrieNode::new())),
        }
    }

    fn insert(&self, word: String) {
        let mut current_node = Rc::clone(&self.root);
        for ch in word.chars() {
            let next_node = {
                let mut node = current_node.borrow_mut();
                node.children
                    .entry(ch)
                    .or_insert_with(|| Rc::new(RefCell::new(TrieNode::new())))
                    .clone()
            };
            current_node = next_node;
        }
        current_node.borrow_mut().is_complete_word = true;
    }

    fn search(&self, word: String) -> bool {
        let mut current_node = Rc::clone(&self.root);
        for ch in word.chars() {
            let next_node = {
                let node = current_node.borrow();
                match node.children.get(&ch) {
                    Some(child) => child.clone(),
                    None => return false,
                }
            };
            current_node = next_node;
        }
        let is_complete_word = current_node.borrow().is_complete_word;
        is_complete_word
    }

    fn starts_with(&self, prefix: String) -> bool {
        let mut current_node = Rc::clone(&self.root);
        for ch in prefix.chars() {
            let next_node = {
                let node = current_node.borrow();
                match node.children.get(&ch) {
                    Some(child) => child.clone(),
                    None => return false,
                }
            };
            current_node = next_node;
        }
        true
    }
}
