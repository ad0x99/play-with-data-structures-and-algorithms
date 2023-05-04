# JavaScript Algorithms and Data Structure

## The Big O Shorthands

- Arithmetic operations are constant
- Variable assignment is constant
- Accessing elements in an array (by index) or object (by key) is constant
- In a loop, the complexity is the length of the loop times the complexity of whatever happens inside of the loop

## Space Complexity in JS

- Most primitives (booleans, numbers, undefined, null) are constant space
- Strings require O(n) space (where n is the string length)
- Reference types are generally O(n), where n is the length (for arrays) or the number of keys (for objects)

## The Big O of Objects

- When to use objects

  - When you don't need order
  - When you need fast access / insertion and removal

| **Big O of Objects / Object Methods** | **Time Complexity** |
| ------------------------------------- | ------------------- |
| Insertion                             | O(1)                |
| Removal                               | O(1)                |
| Searching                             | O(n)                |
| Access                                | O(1)                |
| Object.keys                           | O(n)                |
| Object.values                         | O(n)                |
| Object.entries                        | O(n)                |
| hasOwnProperty                        | O(1)                |

## Big O of Arrays (Ordered Lists)

- When to use arrays
  - When you need order
  - When you need fast access / insertion and removal

| **Big O of Arrays / Array Methods** | **Time Complexity** |
| ----------------------------------- | ------------------- |
| Insertion                           | It depends          |
| Removal                             | It depends          |
| Searching                           | O(n)                |
| Access                              | O(1)                |
| push                                | O(1)                |
| pop                                 | O(1)                |
| shift                               | O(n)                |
| unshift                             | O(n)                |
| concat                              | O(n)                |
| slice                               | O(n)                |
| splice                              | O(n)                |
| sort                                | O(n \* log n)       |
| forEach/map/filter/reduce/etc.      | O(n)                |

## Problem Solving Approach

### What is an algorithms?

- A **process** or **set of steps** to accomplish a certain task

### How to approach a problem?

- Devise a plan for solving problems
- Master common problem solving patterns
- Understand the problem
- Explore concrete examples
- Break it down
- Solve/Simplify
- Look back and refactor

#### Understand the problem

1. Can I restate the problem in my own words?
2. What are the inputs that go into the problem?
3. What are the outputs that should come from the solution to the problem?
4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?
5. How should I label the important pieces of data that are a part of the problem?

#### Explore concrete examples

1. Start with simple examples
2. Progress to more complex examples
3. Explore examples with empty inputs
4. Explore examples with invalid inputs

#### Break it down

- Explicitly write out the steps you need to take. This force you to think about the code you'll write before you write it, and helps you catch any lingering conceptual issues or misunderstandings before you dive in and have worry about details as well

#### Solve or Simplify

- Solve the problem if you can not solve a simpler problem
- Find the core difficulty in what you're trying to do
- Temporarily ignore that difficulty
- Write a simplified solution
- Then incorporate that difficulty back in

#### Look Back and Refactor

- Refactoring questions
  - Can you check the result?
  - Can you derive the result differently?
  - Can you understand it at a glance?
  - Can you use the result or method for some other problem?
  - Can you improve performance of your solution?
  - Can you think of other ways to refactor?
  - How have other people solved this problem?

## Problem Solving Patterns

- Some patterns:
  - Frequency Counter
  - Multiple Pointers
  - Sliding Window
  - Divide and Conquer
  - Dynamic Programming
  - Greedy Algorithms
  - Backtracking

### Frequency Counter

- This pattern uses objects or sets to collect values/frequencies of values
- This can often avoid the need for nested loops or O(n^2) operations with array/strings
- [See the example](./Problem%20Solving%20Pattern%20Examples//frequency-counter.js)

### Multiple Pointers

- Create pointers or values that correspond to an index or position and move towards the beginning, end or middle based on a certain condition
- Very efficient for solving problems with minimal space complexity as well

### Sliding Window

- This pattern involves creating a **window** which can either be an array or number form one position to another
- Depending on a certain condition, the window either increases or closes (and a new window is created)
- This pattern is very useful for keeping track of a subset of data in an array/string, etc.
