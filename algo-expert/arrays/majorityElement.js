/**
 * QUESTION
 *
 * Write a function that takes in a non-empty, unordered array of positive integers and returns the array's majority element without sorting the array and without using more than constant space.
 *
 * An array's majority element is an element of the array that appears in over half if its indices. Note that the most common element of an array (the element that appears the most times in the array) is not necessarily the array's majority element; for example, the array [3, 2, 2, 1] and [3, 4, 2, 2, 1] both have 2 as their most common element, yet neither of these arrays have a majority element, because neither 2 nor any other element appears in over half of the respective arrays' indices.
 *
 * You can assume that the input array will always have a majority element.
 *
 * Sample Input:
 * array = [1, 2, 3, 2, 2, 1, 2]
 *
 * Sample Output:
 * 2 // 2 occurs in 4/7 array indices, making it the majority element
 */

/**
 * SOLUTION 1
 *
 * The idea is that the majority element will be the element appears more than half the length of the array.
 *
 * 1. We use a hashmap which is called counter to count the appearance of the elements
 * 2. Get the half length of the array
 * 3. We iterate through the array and check if the current element is not already visited and counted, we add it into the hashmap, otherwise, we increase the counter by 1
 * 4. After add the element into the hashmap, we check if the current element's appearance is greater than the half of the length, that means we found the majority element, then we return it.
 *
 * The time complexity of this function is O(n), where n is the number of elements in the input array. This is because we iterate through the array once to count the occurrences of each element and check if any element appears more than n/2 times.
 *
 * The space complexity is O(n) as well, as we use a counter object to store the count of each element in the array. In the worst case scenario, all elements in the array are unique and we would need to store n elements in the counter object.
 *
 * Overall, the time and space complexity of this function is O(n) due to the linear iteration through the input array and the storage of counts in the counter object.
 */
export const majorityElementWithHashmap = (array) => {
  let counter = {};
  let halfLength = array.length / 2;

  for (let i = 0; i < array.length; i++) {
    let current = array[i];

    if (!counter[current]) {
      counter[current] = 1;
    } else {
      counter[current] += 1;
    }

    if (counter[current] > halfLength) {
      return current;
    }
  }

  return -1;
};

/**
 * SOLUTION 2
 *
 * The idea is to keep track the appearance of the elements
 *
 * 1. Create a count variable for tracking the appearance of the elements, and a answer variable to keep track the result
 * 2. Iterate through the array
 * 3. If the counter is equal to zero, that means we at the point where the majority element must be the majority element in the remaining array, and what we've seen already doesn't matter anymore, therefore, we set the current answer by assigning the current value. That means we put the current value in counting process
 * 4. If the current answer is equal to the current value, it means we found a new appearance of the current value, then we increment the counter by one, otherwise we decrement the counter by 1
 * 5. We keep iterating the entire array and return the current value that being stored in answer variable
 *
 * The time complexity of this function is O(n) because it iterates through the entire input array once.
 *
 * The space complexity is O(1) because the function only uses a constant amount of extra space regardless of the size of the input array.
 */
export const majorityElementWithCounter = (array) => {
  let count = 0;
  let answer = 0;

  for (const value of array) {
    if (count === 0) {
      answer = value;
    }

    if (answer === value) {
      count += 1;
    } else {
      count -= 1;
    }
  }

  return answer;
};

/**
 * SOLUTION 3
 *
 * The idea is to using bitwise operations to calculate the single one bit in the integer, and using the binary representation of each number to compare and count the majority number
 *
 * 1. We create a variable is called answer to store the majority number result
 * 2. We iterate through all the bits in an integer. So we have 32-bit integers, therefore, we'll iterate from 0 to 31
 * 3. Firstly, we do the bitwise left shift of the current bit. This gives us the decimal version of the value of the current bit, and then we'll keep track how many numbers in the array have this bit set
 * 4. We use a onesCount variable to keep track the 1 value in the bit of each integer
 * 5. We iterate through the array to update onesCount
 * 6. If the current number with the current bit value doesn't equal zero, that means we have a single one at the current bit, then we increase the onesCount by 1
 * 7. Once we get through all of the different numbers, and if we have more than half of the numbers, so if the onesCount is greater than half of the length of the array, we'll update our answer
 *
 * The time complexity of this function is O(n), where n is the number of elements in the input array. This is because we iterate through each element in the array once to check the count of ones for each bit.
 *
 * The space complexity is O(1) because we are using a constant amount of extra space regardless of the size of the input array. We only use a few variables to store the current bit value, ones count, and the final answer.
 *
 */
export const majorityElementWithBitwise = (array) => {
  let answer = 0;
  let halfLength = array.length / 2;

  for (let currentBit = 0; currentBit < 32; currentBit++) {
    let currentBitValue = 1 << currentBit;
    let onesCount = 0;

    for (const num of array) {
      if ((num & currentBitValue) !== 0) {
        onesCount += 1;
      }
    }

    if (onesCount > halfLength) {
      answer += currentBitValue;
    }
  }

  return answer;
};
