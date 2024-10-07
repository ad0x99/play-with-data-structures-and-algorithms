/**
 * https://leetcode.com/problems/design-browser-history/description/
 *
 */

/**
 * This function is initialing a home page to the browser history
 */
var BrowserHistory = function (homepage) {
  this.current = {
    value: homepage,
    previous: null,
    next: null,
  };
};

/**
 * This function is adding a new page to the browser history
 */
BrowserHistory.prototype.visit = function (value) {
  const newNode = {
    value,
    previous: this.current,
    next: null,
  };

  // When visit page, add new page to the list and the current page to be the previous page
  this.current.next = newNode;
  this.current = newNode;
};

/**
 * This function is moving back the previous page in the browser history
 */
BrowserHistory.prototype.back = function (steps) {
  // When there is previous page and the steps > 0
  // Go back until we reach the homepage
  while (this.current.previous && steps > 0) {
    steps -= 1;
    this.current = this.current.previous;
  }

  return this.current.value;
};

/**
 * This function is moving forward the next page in the browser history
 */
BrowserHistory.prototype.forward = function (steps) {
  // As long as there is next page and steps > 0 (there is another except the homepage)
  // Move to next page
  while (this.current.next && steps > 0) {
    steps -= 1;
    this.current = this.current.next;
  }

  return this.current.value;
};
