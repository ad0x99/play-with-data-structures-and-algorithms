/**
 * The function collects all odd values from an array using a recursive helper function.
 * @param arr - The parameter `arr` is an array of numbers from which we want to collect all the odd
 * values.
 * @returns The `collectOddValues` function returns an array containing all the odd values from the
 * input array `arr`.
 */
const collectOddValues = (arr) => {
  let result = [];

  function helper(helperInput) {
    if (!helperInput.length) return;

    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }

    /* `helper(helperInput.slice(1));` is calling the `helper` function recursively with a new array
    that is created by slicing the first element from the original `helperInput` array. This
    recursive call continues until the `helperInput` array is empty, at which point the recursion
    stops and the function returns. This approach allows the function to iterate through the entire
    input array without using a loop. */
    helper(helperInput.slice(1));
  }

  helper(arr);

  return result;
};

console.log(collectOddValues([1, 2, 3, 4, 5]));
