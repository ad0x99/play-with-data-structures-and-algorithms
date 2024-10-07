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
 * 3. We create a queue which is used for BFS traversal. Each element in the queue is an array that contains 2 elements `[employee_id, current_time]`,
 * - 3.1: The first element is the `employeeId`.
 * - 3.2: The second element is the total time to inform the news from the head to the current employee.
 *
 * 4. We create a `max_time` variable to keep track of the maximum time taken for the news to reach an employee.
 *
 * 5. As long as the queue is not empty, we iterate through each employee (node) in the queue.
 * - 5.1: We get the front employee from the queue and extract its `employeeId` and `current_time`.
 *
 * - 5.2: At each iteration, we update the `max_time` if the current `current_time` is greater than the current `max_time`.
 *
 * - 5.3: If the current employee has subordinates (present in the `employeeTree`), we enqueue each subordinate with their corresponding `current_time` plus the informTime of the current manager.
 *
 * 6. After the BFS traversal, we return the `max_time` which holds the maximum time taken for the news to reach the farthest employee.
 *
 * Time complexity: O(n), where n is the number of nodes in the tree. In this case, n is the number of employees.
 *
 * Space complexity: O(n), where n is the length of the queue.
 */
use std::collections::HashMap;
use std::collections::VecDeque;

impl Solution {
    pub fn num_of_minutes(n: i32, head_id: i32, manager: Vec<i32>, inform_time: Vec<i32>) -> i32 {
        // Create a HashMap to represent the employee tree
        let mut employee_tree: HashMap<i32, Vec<i32>> = HashMap::new();

        // Build the employee tree
        for employee in 0..n {
            let employee_id = employee as i32;
            let manager_id = manager[employee as usize];
            if employee_id == head_id {
                continue;
            }

            employee_tree
                .entry(manager_id)
                .or_insert(Vec::new())
                .push(employee_id);
        }

        // BFS to calculate the maximum time to inform all employees
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        queue.push_back((head_id, 0));
        let mut max_time = 0;

        while let Some((current_manager, current_time)) = queue.pop_front() {
            max_time = max_time.max(current_time);

            if let Some(subordinates) = employee_tree.get(&current_manager) {
                for &subordinate in subordinates {
                    queue.push_back((
                        subordinate,
                        current_time + inform_time[current_manager as usize],
                    ));
                }
            }
        }

        max_time
    }
}
