// --- Directions
// Implement bubbleSort, selectionSort, and mergeSort

/**
 * We loop through the array, and for each element, we loop through the array again, comparing the
 * current element with the next element, and if the current element is greater than the next element,
 * we swap them.
 * @param arr - the array to be sorted
 * @returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 */
const bubbleSort = (arr) => {
  let temp;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
};

/**
 * It takes in an array, a current value, a new value, and a temporary value, and returns the array
 * with the current value swapped with the new value
 * @param tempValue - a temporary value that will be used to swap the values of the array
 * @param currentValue - the index of the current element being sorted
 * @param newValue - the index of the value we want to swap with
 * @param array - the array that we're sorting
 * @returns The array is being returned.
 */
const swapper = (tempValue, currentValue, newValue, array) => {
  tempValue = array[currentValue];
  array[currentValue] = array[newValue];
  array[newValue] = tempValue;
};

/**
 * We loop through the array, and for each element, we find the smallest element to the right of it,
 * and swap it with the current element
 * @param arr - the array to be sorted
 * @returns The sorted array.
 */
const selectionSort = (arr) => {
  let indexOfMin;
  let temp;

  for (let i = 0; i < arr.length; i++) {
    indexOfMin = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[indexOfMin]) {
        indexOfMin = j;
      }
    }

    if (indexOfMin !== i) {
      swapper(temp, indexOfMin, i, arr);
    }
  }

  return arr;
};

/**
 * We're splitting the array into two halves, sorting each half, and then merging the two sorted halves
 * @param arr - the array to be sorted
 * @returns The sorted array.
 */
const mergeSort = (arr) => {
  if (arr.length === 1) {
    return arr;
  }

  const midPointOfArray = Math.floor(arr.length / 2);
  const left = arr.slice(0, midPointOfArray);
  const right = arr.slice(midPointOfArray);

  mergeSort(left);
  mergeSort(right);

  return merge(mergeSort(left), mergeSort(right));
};

/**
 * "While there are elements in both arrays, push the smaller of the two elements into the result
 * array, and remove it from the array it was pushed from."
 *
 * The function takes two arrays as arguments, and returns a single array
 * @param leftArray - The left half of the array that is being split.
 * @param rightArray - the right half of the array
 * @returns The sorted array.
 */
const merge = (leftArray, rightArray) => {
  const result = [];

  while (leftArray.length && rightArray.length) {
    if (rightArray[0] < leftArray[0]) {
      result.push(rightArray.shift());
    } else {
      result.push(leftArray.shift());
    }
  }

  return [...result, ...rightArray, ...leftArray];
};

export { bubbleSort, selectionSort, mergeSort, merge };
