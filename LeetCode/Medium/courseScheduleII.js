/**
 * https://leetcode.com/problems/course-schedule-ii/
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
 * If the graph has a cycle, it means some courses are interdependent and it is impossible to complete them all. This is detected by checking if the number of courses in the final order (result.length) equals the total number of courses (numCourses). If not, it indicates a cycle.
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
 * - 5.1: We create an result array to store the order in which courses should be taken.
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
 * 6. After processing all courses, we check if the length of the result array is equal to numCourses. If yes, we return result, indicating that all courses can be completed in the order provided. If not, we return an empty array, meaning it's impossible to finish all courses due to a cycle in the graph.
 *
 *
 * Time complexity: O(n * m), where n is the number of courses, and m is the number of prerequisites.
 *
 * Space complexity: O(n), where n is the number of courses.
 */
class TopologicalSort {
  constructor(numCourses, prerequisites) {
    this.numCourses = numCourses;
    this.edgeMap = new Map(); // { course: dependentCourses }
    this.degree = new Array(numCourses).fill(0);

    // Initialize the adjacency list
    for (let course = 0; course < numCourses; course++) {
      this.edgeMap.set(course, new Array());
    }

    // Build the graph and compute in-degrees
    for (const [ai, bi] of prerequisites) {
      this.edgeMap.get(bi).push(ai); // bi -> ai
      this.degree[ai]++;
    }
  }

  sortBfs() {
    const result = [];
    const queue = [];

    // Start with courses that have no prerequisites (in-degree of 0)
    for (let course = 0; course < this.numCourses; course++) {
      if (this.degree[course] === 0) {
        queue.push(course);
      }
    }

    while (queue.length) {
      const currentCourse = queue.shift();
      // Add current course to the result
      result.push(currentCourse);

      // Explore all the courses that depend on the current course
      for (const dependentCourse of this.edgeMap.get(currentCourse)) {
        // Decrease the in-degree of the dependent course by 1, representing that one of its prerequisites has now been completed.
        this.degree[dependentCourse]--;

        // If any dependent course’s in-degree becomes 0 after this update, it means all its prerequisites are completed, and it is added to the queue to be processed next.
        if (this.degree[dependentCourse] === 0) {
          queue.push(dependentCourse);
        }
      }
    }

    // If we can't finish all courses, then return empty
    return result.length === this.n ? result : [];
  }

  sortDfs() {
    // We use state array to keep track of both the visiting and visited states for each course
    // Unvisited (0): The course has not been visited yet.
    // Visiting (1): The course is currently being visited, meaning the DFS is exploring its dependent courses.
    // Visited (2): The course and all dependent courses have been fully explored.
    const state = new Array(this.numCourses).fill(0);
    const result = [];

    const dfs = (course) => {
      // If the course is in the visiting state (1), it indicates a cycle
      if (state[course] === 1) {
        return false;
      }

      // If the course is in the visited state (2), it means the course and all its prerequisites have been processed
      if (state[course] === 2) {
        return true;
      }

      // Mark as visiting
      state[course] = 1;

      for (const dependentCourse of this.edgeMap.get(course)) {
        // Cycle detected in recursion
        if (!dfs(dependentCourse)) {
          return false;
        }
      }

      // After all prerequisites are processed, the current course is marked as visited, and added to the result.
      state[course] = 2;
      result.push(course);

      return true;
    };

    for (let course = 0; course < this.numCourses; course++) {
      // If the course is unvisited (0), we process the course
      if (state[course] === 0) {
        if (!dfs(course)) {
          return []; // Cycle detected, return empty array
        }
      }
    }

    // Reverse to get the correct order
    return result.reverse();
  }
}

const findOrder = (numCourses, prerequisites) => {
  const topo = new TopologicalSort(numCourses, prerequisites);
  return topo.sortBfs(); // or topo.sortDfs()
};
