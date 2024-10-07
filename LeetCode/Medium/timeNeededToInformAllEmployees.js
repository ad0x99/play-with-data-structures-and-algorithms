/**
 * https://leetcode.com/problems/time-needed-to-inform-all-employees/description/
 *
 * Tree + Breadth-First Search (BFS) Approach
 *
 * Idea: Build a Tree represents the relationship between manager and their employees.
 *
 * At each employee node, we will store the total time to inform the news from the head to the current node.
 *
 * We use BFS to iterate through each level, and find the maximum time it takes for the news to reach all employees at each level.
 *
 * Implementation
 *
 * 1. We create a Map named `employeeTree` which is used to represent the hierarchical structure of employees.
 * - 1.1: Each key in the map represents a manager ID
 * - 1.2: And the value is an array of their subordinates.
 *
 * 2. We iterate over all employees, building the tree by adding each employee as a child to their respective manager, and we need to skip the head of manager.
 *
 * 3. We create a queue which is used for BFS traversal. Each element in the queue is an array that contains 2 elements `[employeeID, currentTime]`,
 * - 3.1: The first element is the employeeId.
 * - 3.2: The second element is the total time to inform the news from the head to the current employee.
 *
 * 4. We create a `maxTime` variable to keep track of the maximum time taken for the news to reach an employee.
 *
 * 5. As long as the queue is not empty, we iterate through each employee (node) in the queue.
 * - 5.1: We get the front employee from the queue and extract its `employeeId` and `currentTime`.
 *
 * - 5.2: At each iteration, we update the `maxTime` if the current `currentTime` is greater than the current `maxTime`.
 *
 * - 5.3: If the current employee has subordinates (present in the `employeeTree`), we enqueue each subordinate with their corresponding `currentTime` plus the informTime of the current manager.
 *
 * 6. After the BFS traversal, we return the `maxTime` which holds the maximum time taken for the news to reach the farthest employee.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree. In this case, n is the number of employees.
 *
 * Space complexity: O(n), where n is the length of the queue.
 */
const numOfMinutes = (numEmployees, headID, manager, informTime) => {
  const employeeTree = new Map();

  // Build the employee tree from the manager array
  for (let employee = 0; employee < numEmployees; employee++) {
    if (employee === headID) continue;

    const managerID = manager[employee];
    if (!employeeTree.has(managerID)) {
      employeeTree.set(managerID, [employee]);
    } else {
      employeeTree.get(managerID).push(employee);
    }
  }

  // BFS to calculate the maximum time to inform all employees
  const queue = [[headID, 0]];
  let maxTime = 0;

  while (queue.length) {
    const [currentManager, currentTime] = queue.shift();
    maxTime = Math.max(maxTime, currentTime);

    if (employeeTree.has(currentManager)) {
      for (const subordinate of employeeTree.get(currentManager)) {
        queue.push([subordinate, currentTime + informTime[currentManager]]);
      }
    }
  }

  return maxTime;
};
