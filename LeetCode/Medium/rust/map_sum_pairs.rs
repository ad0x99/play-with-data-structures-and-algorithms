/**
 * https://leetcode.com/problems/map-sum-pairs/
 *
 * Trie + Hash Table Approach
 *
 * Idea: Using a Trie representation to represent complete word by putting each character to form a complete word in the same edge.
 *
 * Each node in the Trie will contain the character of a complete word and its sum.
 *
 * To adjust the current sum for each word, we need a complete_word Map to store the complete word and its sum. Then, we use this map to adjust the sum when we insert a new word which exists in the Trie but has the new sum value.
 *
 * For example with inserting: ("apple", 3)
 *
 * ```js
 * (root, sum=3)
 *   |
 *   a (sum=3)
 *   |
 *   p (sum=3)
 *   |
 *   p (sum=3)
 *   |
 *   l (sum=3)
 *   |
 *   e (sum=3)*
 * ```
 *
 * Implementation
 *
 * 1. We define a `TrieNode` which contains:
 * - 1.1: A `children` Map which stores the outgoing edges (characters) from the current node and their corresponding child nodes.
 * - 1.2: A `sum` variable which stores the cumulative sum of all keys that reach this node in the Trie.
 *
 * 2. Inside the MapSum class, we define 2 properties.
 * - 2.1: The `root` is a `TrieNode` instance which is the starting point of the Trie.
 * - 2.2: A separate `complete_word` Map which stores the actual key-value pairs (complete word and its corresponding sum).
 *
 * 3. Insert Function: This function takes a key (string) and its val (integer value) as input and inserts the key-value pair into the data structure.
 * - 3.1: We define a `new_sum` variable to store the difference sum value between the new value and the old value (if the key already exists).
 *
 * - 3.2: If the key already exists in the `complete_word` Map, we calculate the `new_sum` by subtracting the existing sum value from the new value. This ensures the sum values in the Trie are updated correctly based on the change in value for an existing key.
 *
 * - 3.3: We update the `complete_word` Map with the new key-value pair (new word and its sum)
 *
 * - 3.4: Update the Trie: we iterate over each character (char) in the key.
 *
 * - 3.5: For each character we check, if the current node (`current_node`) doesn't have a child node for the current character, we create a new `TrieNode` and add it as the child node for the current character.
 *
 * - 3.6: We move the `current_node` to the new child node corresponding to the current character to move to the next node.
 *
 * - 3.7: We update the sum property of the current node by adding the `new_sum`. This ensures that the sum at each node reflects the cumulative sum of all keys that share the path leading to that node.
 *
 * 4. Sum Function: This function takes a prefix (string) as input and returns the sum of all keys in the data structure that start with the given prefix.
 * - 4.1: We start with the `current_node` set to the root node of the Trie.
 *
 * - 4.2: We iterate over each character (char) in the prefix.
 *
 * - 4.3: For each character, we check if the current node (`current_node`) doesn't have a child node for the current character, it means no keys in the Trie start with the given prefix, so we return 0.
 *
 * - 4.4: Otherwise, the the current character exists, we move the `current_node` to the current child node corresponding to the current character to move to next node.
 *
 * - 4.5: After iterating through all characters in the prefix, the `current_node` points to a node in the Trie.
The sum property of this `current_node` holds the cumulative sum of all keys that share the given prefix. So, we return `current_node.sum`.
 *
 * Time complexity:
 * - Insert: O(n), where n is the length of the key (complete word).
 * - Sum: O(m), where m is the length of the prefix.
 *
 * Space complexity:
 * - Insert: O(n), as we store the key in the Trie structure.
 * - Sum: O(1)
 */
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

struct TrieNode {
    children: HashMap<char, Rc<RefCell<TrieNode>>>,
    sum: i32,
}

impl TrieNode {
    fn new() -> Self {
        TrieNode {
            children: HashMap::new(),
            sum: 0,
        }
    }
}

struct MapSum {
    root: Rc<RefCell<TrieNode>>,
    complete_word: HashMap<String, i32>, // To store the values of the keys
}

impl MapSum {
    fn new() -> Self {
        MapSum {
            root: Rc::new(RefCell::new(TrieNode::new())),
            complete_word: HashMap::new(),
        }
    }

    fn insert(&mut self, key: String, val: i32) {
        let mut current_node = Rc::clone(&self.root);
        let mut new_sum = val;

        // Calculate new_sum
        if let Some(old_val) = self.complete_word.get(&key) {
            new_sum -= old_val;
        }
        self.complete_word.insert(key.clone(), val);

        // Update the Trie
        for char in key.chars() {
            let next_node = {
                let mut node = current_node.borrow_mut();
                node.children
                    .entry(char)
                    .or_insert_with(|| Rc::new(RefCell::new(TrieNode::new())))
                    .clone()
            };
            current_node = next_node;
            current_node.borrow_mut().sum += new_sum;
        }
    }

    fn sum(&self, prefix: String) -> i32 {
        let mut current_node = Rc::clone(&self.root);

        for char in prefix.chars() {
            let child = {
                let node = current_node.borrow();
                node.children.get(&char).cloned()
            };

            match child {
                Some(c) => current_node = c,
                None => return 0,
            }
        }

        let sum = current_node.borrow().sum;
        sum
    }
}
