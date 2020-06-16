// jshint ignore: start
// O(n^2)
// const isUnique = (arr) => {
//   let result = true;

//   for (let i = 0; i < arr.length; i++) {
//     console.log(`~~~~~ OUTER LOOP ~~~~~ i === ${i}`);

//     for (let j = 0; j < arr.length; j++) {
//       console.log(`~~~~~ INNER LOOP ~~~~~ j === ${j}`);
//       if (i !== j && arr[i] === arr[j]) {
//         return false;
//       }
//     }
//   }
//   return result;
// };

// O(n) - Better
const isUnique = (arr) => {
  const breadcrumbs = {};
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    console.log(`~~~~~ LOOP ~~~~~ i === ${i}`);
    if (breadcrumbs[arr[i]]) {
      return false;
    } else {
      breadcrumbs[arr[i]] = true;
    }
  }
  return result;
};

console.log(isUnique([1, 2, 3]) === true);
// console.log(isUnique([1, 1, 3]) === false);
