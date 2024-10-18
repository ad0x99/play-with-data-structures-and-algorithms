/**
 * https://leetcode.com/problems/online-stock-span/description/
 *
 * Stack Approach
 *
 * Idea: we use a stack to store the price and span information at each current day's price. Whenever we want to calculate the span of the current day, we will pop the previous span from the stack and calculate the span of the current day.
 *
 * 1. We initialize a stack to store the price and span information. At each day, the stack will contain an array of the price and span information [price, span].
 *
 * 2. We initialize the current span as 1 as the base case.
 *
 * 3. As long as the stack is not empty, and the current price is greater than or equal to the previous price, we get the previous span and add up to the current span to calculate the span of the current day.
 *
 * 4. Each time we call next function, we also push the current [price, span] of the current day to the stack for latter use.
 *
 * 5. We return the current span.
 *
 * Time complexity: O(n), where n is the number of calls next
 *
 * Space complexity: O(n), where n is the number of element in the stack
 */
const StockSpanner = function () {
  this.stack = [];
};

StockSpanner.prototype.next = function (price) {
  let span = 1;

  while (this.stack.length && price >= this.stack[this.stack.length - 1][0]) {
    let previousSpan = this.stack.pop()[1];
    span += previousSpan;
  }

  this.stack.push([price, span]);
  return span;
};

/**
 * Stack Approach With Class Implementation
 */
class StockSpanner {
  constructor() {
    this.stack = [];
  }

  next(price) {
    let span = 1;

    while (this.stack.length && price >= this.stack[this.stack.length - 1][0]) {
      let previousSpan = this.stack.pop()[1];
      span += previousSpan;
    }

    this.stack.push([price, span]);
    return span;
  }
}
