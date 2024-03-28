/**
 * https://leetcode.com/problems/min-stack/
 *
 * Time complexity: O(1) for all operations
 * 
 * Space complexity: O(N) (stack) + O(N) (ms) = O(N), where N = number of push()
 */
/**
 * https://leetcode.com/problems/min-stack/
 *
 * Time complexity: O(1) for all operations
 * 
 * Space complexity: O(N) (stack) + O(N) (ms) = O(N), where N = number of push()
 */
var MinStack = function () {
  this.stack = [];
  // This monotonic stack contains a list of element in a decreasing direction
  this.ms = [];
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  // Push new value into the stack
  this.stack.push(val);

  // There is no element in the monotonic stack
  // Or the current element is less than the last element of monotonic stack
  // We add the index of last element of stack into the monotonic stack
  if (this.ms.length === 0 || val < this.stack[this.ms[this.ms.length - 1]]) {
    // Push index of value into monotonic stack
    this.ms.push(this.stack.length - 1);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  // If the last element of the monotonic stack is equal to the last element of the stack
  // We pop the last element from the monotonic stack
  if (this.ms[this.ms.length - 1] === this.stack.length - 1) {
    // Pop the last element from monotonic stack
    this.ms.pop();
  }

  // We pop the last element from stack
  this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  // Get the top element of stack
  // This means the last element of the stack
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  // Retrieve the minimum element in the stack.
  // Get the index of the last element in monotonic stack
  // Return the element by last index which gets from monotonic stack
  return this.stack[this.ms[this.ms.length - 1]];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

