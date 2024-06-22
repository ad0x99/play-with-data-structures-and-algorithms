/**
 * Selection Sort
 *
 * 1. We iterate through each element of the array.
 *
 * 2. Inside the outer loop, we initialize a `lowest` variable to store the element as the smallest value you've seen so far.
 *
 * 2. Inside the inner loop, we iterate through each element start from `i + 1` position. We want this loop to go ahead outer for comparison.
 *
 * 3. We compare if the current lowest value is greater than the next potential value, it's mean we found a new lowest value. We then update the lowest variable to the newly potential value.
 *
 * 4. After that, we check if the current index is not equal to the lowest index, it's mean we found a new lowest value. At this time, we want to swap those two element's position to make sure that we keep pushing the lowest value to the beginning of the array.
 *
 * 5. We repeat above step until the array is sorted.
 *
 * Time complexity: O(n ^ 2), where n is the number of elements in the input array.
 *
 * Space complexity: O(1)
 */
const selectionSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    let lowest = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[lowest]) {
        lowest = j;
      }
    }

    if (i !== lowest) {
      [array[lowest], array[i]] = [array[i], array[lowest]];
    }
  }

  return array;
};
