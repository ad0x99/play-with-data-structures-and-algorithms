/**
 * https://leetcode.com/problems/word-break-ii/description/
 *
 * DFS Approach
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
const wordBreak = (s, wordDict) => {
  const n = s.length;
  const memo = new Map();

  const dfs = (start) => {
    // Base case: empty string for complete sentence
    if (start === n) return [''];

    if (memo.has(start)) return memo.get(start);

    const sentences = [];
    for (const word of wordDict) {
      // Get potential ending index for the current word
      const end = start + word.length;
      const currentWord = s.slice(start, end);

      if (end <= n && currentWord === word) {
        const nextSentences = dfs(end).map((sentence) => {
          return word + (sentence ? ' ' : '') + sentence;
        });
        sentences.push(...nextSentences);
      }
    }

    memo.set(start, sentences);
    return sentences;
  };

  return dfs(0);
};

/**
 *
 * Bottom-Up Dynamic Programming Approach
 *
 * 1. We create a `wordSet` for faster lookups when checking if a substring exists in the dictionary, and create a `dp` array of size `n + 1`. This array will be used for dynamic programming to store all possible valid word break sentences ending at each index. Each element of the array will be an array of strings.
 *
 * 2. The base case: We initialize the first element `dp[0]` with an empty array ['']. This represents an empty string as a valid sentence (no words needed).
 *
 * 3. We use nested loops for dynamic programming:
 * - 3.1: The outer loop iterates through all possible ending indices (`i`) from `1` (first character) to the end of the string (`n`).
 *
 * - 3.2: The inner loop iterates through all possible starting indices (`j`) from the beginning (`0`) to the current ending index (`i - 1`). This ensures we only consider substrings ending at the current `i`.
 *
 * 4. Inside the loops, we extract the substring word from the original string `s`, and check if the extracted word exists in the `wordSet`.
 *
 * 5. If the word exists, we iterate through all possible valid word break sentences ending at the starting index j using the dp[j] array. For each sentence sentence in `dp[j]`:
 * - 5.1: If the sentence is empty, we simply add the current word to form a new sentence, and store it in `dp[i]`.
 *
 * - 5.2: If the sentence is not empty, we append a space and the current word word to the existing sentence, and store it in `dp[i]`.
 *
 * 6. After iterating through all possible ending indices, the final element in the dp array, dp[n], represents all possible valid word break sentences for the entire string s.
 *
 * Time complexity: O(n ^ 2 * m), where n is the length of s, and m is the length of words in wordDict
 *
 * Space complexity: O(n), where n is the length of dp array
 *
 */
const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const dp = new Array(n + 1).fill().map(() => []);

  // Base case - an empty string can be segmented
  dp[0].push('');

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      const currentWord = s.slice(j, i);

      if (wordSet.has(currentWord)) {
        for (const sentence of dp[j]) {
          dp[i].push(
            sentence === '' ? currentWord : sentence + ' ' + currentWord
          );
        }
      }
    }
  }

  return dp[n];
};
