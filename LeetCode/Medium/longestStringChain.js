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
const longestStrChain = (words) => {
  words.sort((a, b) => a.length - b.length);

  // Store index by word for fast lookup later
  const wordIndex = new Map();
  for (const [index, word] of words.entries()) {
    wordIndex.set(word, index);
  }

  // Memoization for storing chain lengths
  const dp = new Map();

  // DFS to find the longest chain for a word
  const dfs = (index) => {
    if (dp.has(index)) return dp.get(index);

    // Base case: A single word is a chain of length 1
    let result = 1;
    const word = words[index];

    // Iterate over each letter and try removing each letter to create a predecessor
    for (let letter = 0; letter < word.length; letter++) {
      const predecessor = word.slice(0, letter) + word.slice(letter + 1);

      // If the predecessor exists, recursively calculate its chain length
      if (wordIndex.has(predecessor)) {
        result = Math.max(result, dfs(wordIndex.get(predecessor)) + 1);
      }
    }

    dp.set(index, result);
    return result;
  };

  let longestChain = 0;
  for (let word = 0; word < words.length; word++) {
    // Find the longest chain starting from each word
    longestChain = Math.max(longestChain, dfs(word));
  }
  return longestChain;
};
