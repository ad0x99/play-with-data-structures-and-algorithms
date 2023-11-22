/**
 * Write a function that receives an array of strings that represent friend connections along with the names of 2 people and returns a number representing the degrees of separation between the 2 people.
 *
 * The connections will be represented by an array of strings with each string taking the format name1:name2. Assume the strings representing the connections will always be lower case a-z only
 *
 * The names of the people to find the degrees of separation between will always be non-empty strings. e.g "alice" or "bob"
 *
 * Your function will return the number of degrees of separation between the two people. If no connection can be made through friends or friends of friends, etc, then return -1
 *
 * Example 1:
 * connections = ["fred:joe", "joe:mary", "mary:fred", "mary:bill"]
 * name1 = "fred"
 * name2 = "bill"
 * => result = 2 -> the expected result is 2 because fred is friends of mary, and mary is friends with bill. That is, bill if of distance 2 from fred
 *       1      2
 * fred -> mary -> bill
 *
 * Example 2:
 * connections = ["fred:joe", "joe:mary", "kate:sean", "sean:sally"]
 * name1 = "fred"
 * name2 = "sally"
 * => result = -1 -> no connections
 */

const findConnections = (connections) => {};

console.log(
  findConnections(['fred:joe', 'joe:mary', 'mary:fred', 'mary:bill'])
);
console.log(
  findConnections(['fred:joe', 'joe:mary', 'kate:sean', 'sean:sally'])
);
