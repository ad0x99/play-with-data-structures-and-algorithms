/**
 * Task: transform this simple sorting algorithm into a unique sort. It should not return any duplicate values in the sorted array.
 *
 * Time complexity: Linear - O(n)
 *
 * input: [1,5,2,1] => output: [1,2,5]
 * input: [4,2,2,3,2,2,2] => output: [2,3,4]
 */
const uniqueSort = function (arr) {
  // use to storage el to compare duplicate
  const breadcrumbs = {};
  //   const result = [arr[0]];
  const result = [];
  //   for (let i = 1; i < arr.length; i++)
  for (let i = 0; i < arr.length; i++) {
    // if there's no same element in breadcrumbs then push in result. Otherwise, skip and loop through again
    if (!breadcrumbs[arr[i]]) {
      result.push(arr[i]);
      // assign el to true and storage in breadcrumbs to compare with the next el in the next loop
      breadcrumbs[arr[i]] = true;
    }
  }

  return result.sort((a, b) => a - b); // return ascending order (a - b)
};

export { uniqueSort };
