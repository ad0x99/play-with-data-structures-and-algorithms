/**
 * https://leetcode.com/problems/product-of-array-except-self/
 *
 * The idea is to calculate all of the products of the left and right of current working value and stores in 2 different arrays. And after that, returns the final products by multiplying values of the left and right products. Because the product of current value is the product of all the values in the array excluding the current value.
 *
 * 1. We create 3 arrays to store the final products, the left and right products.
 * 2. Iterate through the array from start to end and collect the left products.
 * 3. Iterate through the array from end to start and collect the right products.
 * 4. The last iteration, we multiply the left's products and right's products and add it to the products array
 * 5. Return the final products array
 *
 * Time complexity: O(n) + O(n) + O(n) = O(3N) = O(N) - because we iterate through the input array three times, each time with a single loop of length n. Therefore, the overall time complexity is linear with respect to the size of the input array.
 *
 * Space complexity: O(n) because we use three additional arrays of length n to store the products of the left, products of the right, and the final products.
 *
 */
const productExceptSelf1 =  (nums) => {
   // We initialize an array with the same length as the input array
   // and fill default value in it, in this case it'd be 1
   let products = Array(nums.length).fill(1);
   let leftProducts = Array(nums.length).fill(1);
   let rightProducts = Array(nums.length).fill(1)
   // Calculate products of the left
   leftCurrentProducts = 1;
   for (let i = 0; i < nums.length; i++) {
   leftProducts[i] = leftCurrentProducts;
   leftCurrentProducts *= nums[i];
   // Calculate products of the right
   rightCurrentProducts = 1;
   for (let i = nums.length - 1; i >= 0; i--) {
   rightProducts[i] = rightCurrentProducts;
   rightCurrentProducts *= nums[i];
   // Calculate final products by multiplying both left and right
   for (let i = 0; i < nums.length; i++) {
     products[i] = leftProducts[i] * rightProducts[i];
   }
   return products;
};


/**
 * The idea is as the same with above solution. But instead of using leftProducts and rightProducts to store the products, we don't need to wait until the rightProducts are done for calculation, instead, when we were in the calculation of the right, we can update the final products at the same time. That means we can reduce the final calculate between the left and the right products.
 */
const productExceptSelf2 = (nums) => {
  // We initialize an array with the same length as the input array
  // and fill default value in it, in this case it'd be 1
  let products = Array(nums.length).fill(1);

  // Calculate products of the left
  leftCurrentProducts = 1;
  for (let i = 0; i < nums.length; i++) {
    products[i] = leftCurrentProducts;
    leftCurrentProducts *= nums[i];
  }

  // Calculate products of the right and at the same time update the final products result
  rightCurrentProducts = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    // Because the products of the left are already calculated and existed in the left iteration, now we can multiply the right and the current existing one to get the final product
    products[i] *= rightCurrentProducts;
    rightCurrentProducts *= nums[i];
  }

  return products;
};
