/**
 * The function collects all odd values in an input array using pure recursion.
 * @param arr - The input array that the function is recursively searching for odd values.
 * @returns The function `collectOddValuesPureRecursion` is returning an array containing all the odd
 * values from the input array `arr`. If the input array is empty, the function returns an empty array.
 */
const collectOddValuesPureRecursion = (arr) => {
  let newArray = [];

  if (!arr.length) {
    return newArray;
  }

  if (arr[0] % 2 !== 0) {
    newArray.push(arr[0]);
  }

  /* `newArray = newArray.concat(collectOddValuesPureRecursion(arr.slice(1)));` is recursively calling
  the `collectOddValuesPureRecursion` function on the remaining elements of the input array `arr`
  (excluding the first element) and concatenating the resulting array with the `newArray` that
  contains the odd values found so far. This allows the function to collect all odd values in the
  input array using pure recursion. */
  newArray = newArray.concat(collectOddValuesPureRecursion(arr.slice(1)));
  return newArray;
};

console.log(collectOddValuesPureRecursion([1, 2, 3, 4, 5]));
