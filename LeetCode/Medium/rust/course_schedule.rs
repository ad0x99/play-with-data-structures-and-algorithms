/**
 * https://leetcode.com/problems/course-schedule/
 *
 * Topological Sort Approach
 *
 * Idea: We can assume that a course is a vertex (node) in the graph, the prerequisites can be represented as a directed graph where an edge from course B to course A indicates that course B must be taken before course A.
 *
 * Since we need to find an order to take all the courses, and this order must respect the prerequisites, so we want to ensure that a course is only taken after all its prerequisites have been completed.
 *
 * How can we know which course should be taken first?
 *
 * To do that, we will keep track of the in-degree of each course. The in-degree of a node (course) is the number of edges coming into it. In this context, it represents how many prerequisites a course has.
 *
 * We then can easily identify courses that have no prerequisites (in-degree of 0) which can be taken first.
 *
 * We will use BFS to process the courses in levels: courses with no prerequisites first, followed by courses whose prerequisites have all been processed. This ensures that we are always processing courses in an order that respects the prerequisites.
 *
 * If the graph has a cycle, it means some courses are interdependent and it is impossible to complete them all. This is detected by checking if the number of completed courses (completedCourses) equals the total number of courses (numCourses). If not, it indicates a cycle.
 *
 * Implementation
 *
 * 1. We initialize a edgeMap map to store each course as a key and the list of courses that depend on it as the value.
 *
 * 2. We create an degree array to store the "in-degree" of each course. The in-degree represents the number of prerequisites each course has.
 *
 * 3. We first iterate through the numCourses, initializing each course in edgeMap with an empty array. This empty array will be used to store dependent courses.
 *
 * 4. Then, we iterate through the prerequisites list to build the graph:
 * - 4.1: For each pair `[ai, bi]`, we add `ai` to the list of dependent courses for `bi` in edgeMap.
 *
 * - 4.2: We then increment the in-degree of `ai` by 1, because `ai` now has one more prerequisite (`bi`).
 *
 * 5. The sort function uses BFS.
 * - 5.1: We create a completedCourses variable to keep track how many courses have been taken.
 *
 * - 5.2: We create a queue to process courses with no prerequisites (in-degree of 0).
 *
 * - 5.3: We iterate through all courses. If a course has an in-degree of 0 (meaning it has no prerequisites), it's added to the queue to process first.
 *
 * - 5.4: As long as the queue is not empty, we keep iterating through each course in the queue.
 *
 * - 5.5: In each iteration, we take the first course in the queue and add to the result array.
 *
 * - 5.6: We then check all the courses that depend on the current course by looking up edgeMap.
 *
 * - 5.7: For each dependent course, the in-degree is decreased by 1 (because one of its prerequisites has now been completed). If a dependent course's in-degree becomes 0, we add it to the queue since it can now be taken.
 *
 * 6. After processing all courses, we check if the number of completed courses (`completedCourses`) equal the total number of courses (`numCourses`). If yes, the function returns true, indicating that all courses can be completed. If not, it returns false, meaning it's impossible to finish all courses due to a cycle in the graph.
 *
 *
 * Time complexity: O(n * m), where n is the number of courses, and m is the number of prerequisites.
 *
 * Space complexity: O(n), where n is the number of courses.
 */
use std::collections::{HashMap, VecDeque};

struct TopologicalSort {
    num_courses: usize,
    edge_map: HashMap<usize, Vec<usize>>,
    degree: Vec<usize>,
}

impl TopologicalSort {
    fn new(num_courses: usize, prerequisites: Vec<Vec<i32>>) -> Self {
        let mut edge_map = HashMap::new(); // { course: dependentCourses }
        let mut degree = vec![0; num_courses];

        // Initialize the adjacency list
        for course in 0..num_courses {
            edge_map.insert(course, Vec::new());
        }

        // Build the graph and compute in-degrees
        for prerequisite in prerequisites {
            let ai = prerequisite[0] as usize;
            let bi = prerequisite[1] as usize;
            edge_map.get_mut(&bi).unwrap().push(ai);
            degree[ai] += 1;
        }

        TopologicalSort {
            num_courses,
            edge_map,
            degree,
        }
    }

    fn sort_bfs(&mut self) -> bool {
        let mut queue = VecDeque::new();
        let mut completed_courses = 0;

        // Start with courses that have no prerequisites (in-degree of 0)
        for course in 0..self.num_courses {
            if self.degree[course] == 0 {
                queue.push_back(course);
            }
        }

        while let Some(current_course) = queue.pop_front() {
            completed_courses += 1;

            // Explore all the courses that depend on the current course
            if let Some(dependent_courses) = self.edge_map.get(&current_course) {
                for &dependent_course in dependent_courses {
                    // Decrease the in-degree of the dependent course by 1, representing that one of its prerequisites has now been completed.
                    self.degree[dependent_course] -= 1;

                    // If any dependent course’s in-degree becomes 0 after this update, it means all its prerequisites are completed, and it is added to the queue to be processed next.
                    if self.degree[dependent_course] == 0 {
                        queue.push_back(dependent_course);
                    }
                }
            }
        }

        // Check if all courses have been processed
        completed_courses == self.num_courses
    }

    fn sort_dfs(&mut self) -> bool {
        // We use state array to keep track of both the visiting and visited states for each course
        // Unvisited (0): The course has not been visited yet.
        // Visiting (1): The course is currently being visited, meaning the DFS is exploring its dependent courses.
        // Visited (2): The course and all dependent courses have been fully explored.
        let mut state = vec![0; self.num_courses];
        let mut completed_courses = 0;

        fn dfs(
            course: usize,
            state: &mut Vec<i32>,
            edge_map: &HashMap<usize, Vec<usize>>,
            completed_courses: &mut usize,
        ) -> bool {
            // If the course is in the visiting state (1), it indicates a cycle
            if state[course] == 1 {
                return false;
            }

            // If the course is in the visited state (2), it means the course and all its prerequisites have been processed
            if state[course] == 2 {
                return true;
            }

            // Mark as visiting
            state[course] = 1;

            if let Some(dependent_courses) = edge_map.get(&course) {
                for &dependent_course in dependent_courses {
                    // Cycle detected in recursion
                    if !dfs(dependent_course, state, edge_map, completed_courses) {
                        return false;
                    }
                }
            }

            // After all prerequisites are processed, the current course is marked as visited, and the completed_courses is incremented by 1
            state[course] = 2;
            *completed_courses += 1;
            true
        }

        for course in 0..self.num_courses {
            // If the course is unvisited (0), we process the course
            if state[course] == 0 {
                if !dfs(course, &mut state, &self.edge_map, &mut completed_courses) {
                    return false; // Cycle detected, return false
                }
            }
        }

        completed_courses == self.num_courses
    }
}

impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let mut topo = TopologicalSort::new(num_courses as usize, prerequisites);
        topo.sort_dfs() // You can switch this to topo.sort_dfs() to use DFS
    }
}
