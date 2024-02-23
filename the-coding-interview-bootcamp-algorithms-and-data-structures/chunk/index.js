// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

// Solution 1
/**
 * If the last element in the chunked array does not exist, or if its length is equal to the chunk
 * size, push a new chunk into the chunked array with the current element. Otherwise, push the current
 * element into the chunk.
 * @param array - The array to be chunked
 * @param size - The size of each chunk
 * @returns An array of arrays.
 */
const chunk = (array, size) => {
  const chunkedArray = [];

  for (const element of array) {
    const lastElement = chunkedArray[chunkedArray.length - 1];

    if (!lastElement || lastElement.length === size) {
      chunkedArray.push([element]);
    } else {
      lastElement.push(element);
    }
  }

  return chunkedArray;
};

// Solution 2
/**
 * We create an empty array to hold our chunks called chunkedArray. We then create a loop that iterates
 * while index is less than array.length. We then slice out from the index to the index + size and push
 * that to the chunkedArray. Finally, we increment the index by size
 * @param array - the array to be chunked
 * @param size - The size of each chunk
 * @returns [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 */
const chunk2 = (array, size) => {
  const chunkedArray = [];
  let index = 0;

  while (index < array.length) {
    const sliceEl = array.slice(index, index + size);

    chunkedArray.push(sliceEl);
    index += size;
  }

  return chunkedArray;
};

module.exports = chunk;
