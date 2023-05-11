/**
 * Write a function called collectStrings which accepts an object and returns an array of all the values in the object that have a typeof string
 */

/**
 * The function collects all the strings in a given object and returns them in an array.
 * @param object - The `object` parameter is an object that may contain nested objects and strings. The
 * function `collectStrings` recursively searches through the object and its nested objects to collect
 * all the strings and returns them in an array.
 * @returns The `collectStrings` function returns an array of all the string values in the input object
 * and its nested objects.
 */
const collectStrings = (object) => {
  let stringsArr = [];

  function gatherStrings(object) {
    for (let key in object) {
      if (typeof object[key] === 'string') {
        stringsArr.push(object[key]);
      } else if (typeof object[key] === 'object') {
        return gatherStrings(object[key]);
      }
    }
  }

  gatherStrings(object);
  return stringsArr;
};

const collectStringsWithPureRecursion = (obj) => {
  var stringsArr = [];

  for (var key in obj) {
    if (typeof obj[key] === 'string') {
      stringsArr.push(obj[key]);
    } else if (typeof obj[key] === 'object') {
      /* `stringsArr = stringsArr.concat(collectStringsWithPureRecursion(obj[key]));` is concatenating
      the array returned by the `collectStringsWithPureRecursion` function with the `stringsArr`
      array. This is done when the value of the current key in the object is an object itself. The
      `collectStringsWithPureRecursion` function is called recursively on the object value and the
      returned array is concatenated with the `stringsArr` array. This ensures that all the string
      values in the nested objects are collected and returned in the final `stringsArr` array. */
      stringsArr = stringsArr.concat(collectStringsWithPureRecursion(obj[key]));
    }
  }

  return stringsArr;
};

const obj = {
  stuff: 'foo',
  data: {
    val: {
      thing: {
        info: 'bar',
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: 'baz',
          },
        },
      },
    },
  },
};

console.log(collectStrings(obj)); // ["foo", "bar", "baz"])
console.log(collectStringsWithPureRecursion(obj)); // ["foo", "bar", "baz"])
