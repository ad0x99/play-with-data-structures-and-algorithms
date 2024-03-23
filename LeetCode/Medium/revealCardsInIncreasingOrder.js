/**
 * https://leetcode.com/problems/reveal-cards-in-increasing-order/description/
 *
 * Approach: we need to traverse through the process of reveal cards reversely
 *
 * 1. We sort the array in the ascending order.
 * 2. Declare B variable to store the original cards after reversing.
 * 3. If there is no card in the B array, we get the last card from A and push it onto the B as initial card.
 * 4. As long as A still has cards.
 * 5. We get the last card in the B and push it onto the first position of the B
 * 6. And get the last card in the A and push it onto the first position of the B
 *
 * Time complexity: O(n log n) due to the sorting operation on the input deck array.
 *
 * Space complexity: O(n) because we are creating a new array B to store the reordered deck.
 *
 */
const deckRevealedIncreasing = (deck) => {
  // Sort the array in ascending order
  let A = deck.sort((a, b) => a - b);
  let B = [];

  // In case there is no card in B
  // Get the last card in the A and push it onto the first of the B
  B.push(A.pop());

  while (A.length) {
    // Get the last card in the B and push it onto the first of the B
    B.unshift(B.pop());
    // Get the last card in the A and push it onto the first of the B
    B.unshift(A.pop());
  }

  return B;
};

// Simulation
// [17, 13, 11, 2, 3, 5, 7]

// 2, 3, 5, 7, 11, 13, 17

// [2, 13, 3, 11, 5, 17, 7] --> 2
// [3, 11, 5, 17, 7, 13] --> 3
// [5, 17, 7, 13, 11] --> 5
// [7, 13, 11, 17] --> 7
// [11, 17, 13] --> 11
// [13, 17] --> 13
// [17] --> 17
// []

// Simulation reversely
// input = [17, 13, 11, 2, 3, 5, 7]
// Step 1: Sort input in increasing order
// A = [2, 3, 5, 7, 11, 13, 17] -> (17)

// B = [17] -> (13)
// B = [13, 17]  -> (11)
// B = [17, 13] -> [11, 17, 13] -> (7)
// B = [13, 11, 17] -> [7, 13, 11, 17] -> (5)
// B = [17, 7, 13, 11] --> [5, 17, 7, 13, 11] -> (3)
// B = [11, 5, 17, 7, 13] --> [3, 11, 5, 17, 7, 13] -> (2)
// B = [13, 3, 11, 5, 17, 7] --> [2, 13, 3, 11, 5, 17, 7]


// [A.next(), B[-1], B[:-1]]
// B --> B.unshift(B.pop())  --> B.unshift(A.pop())




