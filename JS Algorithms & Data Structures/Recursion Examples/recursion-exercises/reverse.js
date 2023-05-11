/**
 * Write a recursive function called reverse which accepts a string and returns a new string in reverse.
 * For examples:
 * reverse('awesome') // 'emosewa'
 * reverse('rithmschool') // 'loohcsmhtir'
 */

/**
 * The `reverse` function recursively reverses the order of characters in a given string.
 * @param str - The `str` parameter is a string that we want to reverse. The `reverse` function uses
 * recursion to reverse the order of the characters in the string.
 * @returns The `reverse` function is returning the reversed version of the input string `str`.
 *
 * For example:
 * awesome
 * reverse(wesome) + a
 *      reverse(esome) + wa
 *            reverse(some) + ewa
 *                reverse(ome) + sewa
 *                    reverse(me) + osewa
 *                        reverse(e) + mosewa
 *                            reverse() + emosewa
 */
const reverse = (str) => {
  if (str.length <= 1) return str;
  /* `reverse(str.slice(1))` is recursively calling the `reverse` function with the
  string `str` except for the first character. This will continue until the base case
  is reached (when the length of the string is 1 or less). Then, `str[0]` is added to
  the end of the result of the recursive call, effectively reversing the order of the
  characters in the original string. */
  return reverse(str.slice(1)) + str[0];
};

console.log(reverse(''));
console.log(reverse('awesome'));
console.log(reverse('rithmschool'));
