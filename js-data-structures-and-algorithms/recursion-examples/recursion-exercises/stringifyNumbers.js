/**
 * Write a function called stringifyNumbers which takes in an object and finds all of the values which are numbers and converts them to strings.
 */

/**
 * The `stringifyNumbers` function converts all number values in an object (including nested objects)
 * to strings.
 * @param object - The `object` parameter is an object that may contain number values that need to be
 * converted to strings. The function `stringifyNumbers` takes this object as input and returns a new
 * object with all number values converted to strings. The function also recursively checks any nested
 * objects within the original object and converts
 * @returns The `stringifyNumbers` function returns a new object with all number values in the original
 * object converted to strings. If the original object contains nested objects, the function
 * recursively calls itself on those objects to ensure that all number values within the entire object
 * are converted to strings.
 */
const stringifyNumbers = (object) => {
  var newObj = {};

  for (var key in object) {
    /* This code is checking if the value of the current key in the object is a number. If it is, it
   converts the number to a string using the `toString()` method and assigns the string value to a
   new object with the same key. This is done to convert all number values in the object to strings. */
    if (typeof object[key] === 'number') {
      newObj[key] = object[key].toString();
    } else if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
      /* `newObj[key] = stringifyNumbers(object[key]);` is recursively calling the `stringifyNumbers`
      function on any nested objects within the original object. If the value of the current key in
      the object is an object (and not an array), it assigns the result of calling
      `stringifyNumbers` on that object to a new object with the same key. This is done to ensure
      that all nested objects within the original object are also checked for number values and
      converted to strings if necessary. */
      newObj[key] = stringifyNumbers(object[key]);
    } else {
      newObj[key] = object[key];
    }
  }

  return newObj;
};

let object = {
  num: 1,
  test: [],
  data: {
    val: 4,
    info: {
      isRight: true,
      random: 66,
    },
  },
};

console.log(stringifyNumbers(object));
/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/
