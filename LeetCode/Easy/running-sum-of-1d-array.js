const runningSum = (nums) => {
  const result = [];

  for (let i = 0; i <= nums.length; i++) {
    const numBeforeCurrent = nums.slice(0, i);

    if (numBeforeCurrent.length && Number.isInteger(nums[i])) {
      result.push(numBeforeCurrent.reduce((a, b) => a + b, 0) + nums[i]);
    } else if (Number.isInteger(nums[i])) {
      result.push(nums[i]);
    }
  }

  return result;
};
