const buildArray = (numbers) => {
  const newArray = [];

  for (let i = 0; i <= numbers.length; i++) {
    let num = numbers[numbers[i]];
    if (Number.isInteger(num)) {
      newArray.push(num);
    }
  }

  return newArray;
};
