const performanceTimer = (func) => {
  let start = performance.now();
  func;
  let end = performance.now();

  console.log(`Execution time: ${end - start} ms`);
};

export { performanceTimer };
