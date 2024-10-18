/**
 * https://leetcode.com/problems/maximum-number-of-balloons/description/
 * The function `maxNumberOfBalloons` counts the maximum number of times the word "balloon" can be
 * formed using the characters in a given text.
 * @param text - The `text` parameter is a string that represents the input text.
 * @returns the maximum number of times the word "balloon" can be formed using the characters in the
 * input text.
 *
 * Time complexity : O(N)
 * Space complexity : O(1)
 */
const maxNumberOfBalloons = (text) => {
  const map = { b: 0, a: 0, l: 0, o: 0, n: 0 };

  for (const t of text) {
    if (map[t] >= 0) {
      map[t]++;
    }
  }

  /* This line is calculating the maximum number of times the word "balloon" can be formed using the characters in the input
  text. Because of the maximum instances of the "balloon" if the minimum each part of the balloon occurrence */
  const min = Math.min(map.b, map.a, map.l / 2, map.o / 2, map.n);
  return Math.floor(min);
};

console.log(maxNumberOfBalloons('nlaebolko'));
console.log(maxNumberOfBalloons('balloonballoo'));
console.log(maxNumberOfBalloons('loonbalxballpoon'));
console.log(maxNumberOfBalloons('leetcode'));
