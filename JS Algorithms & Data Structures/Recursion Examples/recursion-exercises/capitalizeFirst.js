/**
 * Write a recursive function called capitalizeFirst. Given an array of strings, capitalize the first letter of each string in the array.
 * For example:
 * capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']
 */

/**
 * The `capitalizeFirst` function takes an array of strings and returns a new array with the first
 * letter of each string capitalized.
 * @param array - An array of strings that we want to capitalize the first letter of each string.
 * @returns The `capitalizeFirst` function is returning an array of strings where the first letter of
 * each string is capitalized. If the input array has only one element, the function returns an array
 * with that element capitalized. If the input array has more than one element, the function
 * recursively calls itself with all the elements of the input array except for the last one, and then
 * capitalizes the first letter of the last
 */
const capitalizeFirst = (array) => {
  if (array.length === 1) {
    /* `array[0][0].toUpperCase()` is capitalizing the first letter of the first string in the
    array, and `array[0].substr(1)` is returning the rest of the string after the first
    letter. The `+` operator is concatenating the capitalized first letter with the rest of
    the string, resulting in the entire string being capitalized. */
    return [array[0][0].toUpperCase() + array[0].substr(1)];
  }

  /* `capitalizeFirst(array.slice(0, -1))` is calling the `capitalizeFirst` function
  recursively with all the elements of the input array except for the last one. It is
  essentially removing the last element from the array and passing the remaining
  elements to the function. */
  const result = capitalizeFirst(array.slice(0, -1));

  /* `array.slice(array.length - 1)` is returning an array with the last element of the input array.
    `[0]` is then used to access the first (and only) element of this array, which is a string.
    Finally, `[0].toUpperCase()` is used to capitalize the first letter of this string and
    `array.slice(array.length - 1)[0].substr(1)` is used to return the rest of the string after the
    first letter. The `+` operator is concatenating the capitalized first letter with the rest of
    the string, resulting in the entire string being capitalized. */
  const string =
    array.slice(array.length - 1)[0][0].toUpperCase() +
    array.slice(array.length - 1)[0].substr(1);

  result.push(string);
  return result;
};

console.log(capitalizeFirst(['car', 'taco', 'banana']));
