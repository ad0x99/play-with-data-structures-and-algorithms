/**
 * Write a recursive function called nestedEvenSum. Return the sum of all even numbers in an object which may contain nested objects.
 */

/**
 * The `nestedEvenSum` function recursively searches through nested objects and adds up all even
 * numbers it finds.
 * @param object - The object parameter is an object that the function will search through to find all
 * even numbers and add them up.
 * @param [sum=0] - `sum` is a variable that keeps track of the running total of even numbers found in
 * the object. It is initialized to 0 as a default value in case the function is called without a
 * second argument. As the function iterates through the object, it adds any even numbers it finds to
 * the
 * @returns The `nestedEvenSum` function is returning the sum of all even numbers found in the nested
 * objects of the input object.
 */
const nestedEvenSum = (object, sum = 0) => {
  for (let key in object) {
    if (typeof object[key] === 'object') {
      sum +=
        /* `nestedEvenSum(object[key])` is recursively calling the `nestedEvenSum` function with
      the value of the current key in the object as the new object parameter. This allows the
      function to search through all nested objects in the original object and add up all the
      even numbers it finds. */
        nestedEvenSum(object[key]);
    } else if (typeof object[key] === 'number' && object[key] % 2 === 0) {
      sum += object[key];
    }
  }

  return sum;
};

var obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: 'yup',
    },
  },
};

var obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' },
};

console.log(nestedEvenSum(obj1)); // 6
console.log(nestedEvenSum(obj2)); // 10
