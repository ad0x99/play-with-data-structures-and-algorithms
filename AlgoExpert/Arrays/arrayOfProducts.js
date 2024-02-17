/**
 * QUESTION
 *
 * Write a function that takes in a non-empty array of integers and returns an array of the same length, where each element in the output is equal to the product of every other number in the input array.
 *
 * In other words, the value at `output[i]` is equal to the product of every number in the input array other than `input[i]`.
 *
 * Note that you're expected to solve this problem without using division
 *
 * Sample Input:
 * array = [5, 1, 4, 2]
 *
 * Sample Output:
 * [8, 40, 10, 20]
 * // 9 is equal to 1 x 4 x 2
 * // 40 is equal to 5 x 4 x 2
 * // 10 is equal to 5 x 1 x 2
 * // 20 is equal to 5 x 1 x 4
 */

/**
 * SOLUTION 1
 *
 * The time complexity of this function is O(n^2) because there are two nested loops, each iterating over the input array of length n.
 *
 * The space complexity is O(n) because the function creates a new array of the same length as the input array to store the products.
 */
const arrayOfProductsWithTwoLoops = (array) => {
  // We initialize an array with the same length as the input array
  // and fill default value in it, in this case it'd be 1
  let products = Array(array.length).fill(1);

  // Iterate through the entire array
  for (let i = 0; i < array.length; i++) {
    // Set current product by 1 for calculation
    let currentProduct = 1;

    for (let j = 0; j < array.length; j++) {
      // In this loop, we check if the current index at i is not equal to j
      // That means we don't multiply the current value
      if (i !== j) {
        // Then we multiply with current product to get the product value of current i
        currentProduct *= array[j];
      }
    }

    // After calculation, we update the product of current value at corresponding position
    products[i] = currentProduct;
  }

  return products;
};

const array1 = [5, 1, 4, 2];
const array2 = [1, 8, 6, 2, 4];
const array3 = [-5, 2, -4, 14, -6];
const array4 = [9, 3, 2, 1, 9, 5, 3, 2];
const array5 = [4, 4];
const array6 = [0, 0, 0, 0];
const array7 = [1, 1, 1, 1];
const array8 = [-1, -1, -1, -1];
const array9 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(arrayOfProductsWithTwoLoops(array1)); // [8, 40, 10, 20]
console.log(arrayOfProductsWithTwoLoops(array2)); // [384, 48, 64, 192, 96]
console.log(arrayOfProductsWithTwoLoops(array3)); // [672, -1680, 840, -240, 560]
console.log(arrayOfProductsWithTwoLoops(array4)); // [1620, 4860, 7290, 14580, 1620, 2916, 4860, 7290]
console.log(arrayOfProductsWithTwoLoops(array5)); // [4, 4]
console.log(arrayOfProductsWithTwoLoops(array6)); // [0, 0, 0, 0]
console.log(arrayOfProductsWithTwoLoops(array7)); // [1, 1, 1, 1]
console.log(arrayOfProductsWithTwoLoops(array8)); // [-1, -1, -1, -1]
console.log(arrayOfProductsWithTwoLoops(array9)); // [362880, 0, 0, 0, 0, 0, 0, 0, 0, 0]

/**
 * SOLUTION 2
 *
 * The idea is to calculate all of the products of the left and right of current working value and stores in 2 different arrays. And after that, returns the final products by multiplying values of the left and right products. Because the product of current value is the product of all the values in the array excluding the current value.
 *
 * The time complexity of this solution is O(n) because we iterate through the input array three times, each time with a single loop of length n. Therefore, the overall time complexity is linear with respect to the size of the input array.
 *
 * The space complexity of this solution is O(n) because we use three additional arrays of length n to store the products of the left, products of the right, and the final products. Therefore, the space complexity is linear with respect to the size of the input array.
 *
 */
const arrayOfProductsWithTwoPointers = (array) => {
  // We initialize an array with the same length as the input array
  // and fill default value in it, in this case it'd be 1
  let products = Array(array.length).fill(1);
  let leftProducts = Array(array.length).fill(1);
  let rightProducts = Array(array.length).fill(1);

  // Calculate products of the left
  leftCurrentProducts = 1;
  for (let i = 0; i < array.length; i++) {
    leftProducts[i] = leftCurrentProducts;
    leftCurrentProducts *= array[i];
  }

  // Calculate products of the right
  rightCurrentProducts = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    rightProducts[i] = rightCurrentProducts;
    rightCurrentProducts *= array[i];
  }

  // Calculate final products by multiplying both left and right
  for (let i = 0; i < array.length; i++) {
    products[i] = leftProducts[i] * rightProducts[i];
  }

  return products;
};

console.log(arrayOfProductsWithTwoPointers(array1)); // [8, 40, 10, 20]
console.log(arrayOfProductsWithTwoPointers(array2)); // [384, 48, 64, 192, 96]
console.log(arrayOfProductsWithTwoPointers(array3)); // [672, -1680, 840, -240, 560]
console.log(arrayOfProductsWithTwoPointers(array4)); // [1620, 4860, 7290, 14580, 1620, 2916, 4860, 7290]
console.log(arrayOfProductsWithTwoPointers(array5)); // [4, 4]
console.log(arrayOfProductsWithTwoPointers(array6)); // [0, 0, 0, 0]
console.log(arrayOfProductsWithTwoPointers(array7)); // [1, 1, 1, 1]
console.log(arrayOfProductsWithTwoPointers(array8)); // [-1, -1, -1, -1]
console.log(arrayOfProductsWithTwoPointers(array9)); // [362880, 0, 0, 0, 0, 0, 0, 0, 0, 0]

/**
 * SOLUTION 3
 *
 * The idea is as the same with arrayOfProductsWithTwoPointers solution. But instead of using leftProducts and rightProducts to store the products, we don't need to wait until the rightProducts are done for calculation, instead, when we were in the calculation of the right, we can update the final products at the same time. That means we can reduce the final calculate between the left and the right products.
 *
 * The time complexity of this solution is O(n), where n is the length of the input array. This is because we iterate through the array twice, once from left to right and once from right to left, each time performing a constant amount of work.
 *
 * The space complexity is also O(n) because we create an additional array of the same length as the input array to store the products. This additional space is used to store the left products and then update them with the right products.
 */
const arrayOfProductsWithTwoPointersMoreOptimal = (array) => {
  // We initialize an array with the same length as the input array
  // and fill default value in it, in this case it'd be 1
  let products = Array(array.length).fill(1);

  // Calculate products of the left
  leftCurrentProducts = 1;
  for (let i = 0; i < array.length; i++) {
    products[i] = leftCurrentProducts;
    leftCurrentProducts *= array[i];
  }

  // Calculate products of the right and at the same time update the final products result
  rightCurrentProducts = 1;
  for (let i = array.length - 1; i >= 0; i--) {
    // Because the products of the left are already calculated and existed in the left iteration, now we can multiply the right and the current existing one to get the final product
    products[i] *= rightCurrentProducts;
    rightCurrentProducts *= array[i];
  }

  return products;
};

console.log(arrayOfProductsWithTwoPointersMoreOptimal(array1)); // [8, 40, 10, 20]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array2)); // [384, 48, 64, 192, 96]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array3)); // [672, -1680, 840, -240, 560]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array4)); // [1620, 4860, 7290, 14580, 1620, 2916, 4860, 7290]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array5)); // [4, 4]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array6)); // [0, 0, 0, 0]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array7)); // [1, 1, 1, 1]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array8)); // [-1, -1, -1, -1]
console.log(arrayOfProductsWithTwoPointersMoreOptimal(array9)); // [362880, 0, 0, 0, 0, 0, 0, 0, 0, 0]
