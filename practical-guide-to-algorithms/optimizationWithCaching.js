/**
 * This function checks if an array has unique elements by comparing each element with every
 * other element in a nested loop.
 *
 * The time complexity of this function is O(n^2), because the code contains a nested loop where each element in the array is compared with every other element in the array. This results in a time complexity of O(n^2) where n is the number of elements in the array.
 */
const isUnique1 = (arr) => {
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === arr[j]) {
        return false;
      }
    }
  }
  return result;
};

/**
 * This function checks if all elements in an array are unique by using a hash table to keep
 * track of visited elements.
 *
 * The time complexity of this function is O(n) because it has a single loop that iterates through the input array 'arr'. Inside the loop, there is a constant time operation to check if the current element exists in the 'breadcrumbs' object. Therefore, the time complexity is linear, O(n), where n is the size of the input array.
 */
const isUnique2 = (arr) => {
  const breadcrumbs = {};
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    if (breadcrumbs[arr[i]]) {
      return false;
    } else {
      breadcrumbs[arr[i]] = true;
    }
  }
  return result;
};

export { isUnique1, isUnique2 };
