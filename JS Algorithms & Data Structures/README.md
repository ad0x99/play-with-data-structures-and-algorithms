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
- [See the example](./Problem%20Solving%20Pattern%20Examples/Multiple%20Pointer%20Pattern/)

### Sliding Window

- This pattern involves creating a **window** which can either be an array or number form one position to another
- Depending on a certain condition, the window either increases or closes (and a new window is created)
- This pattern is very useful for keeping track of a subset of data in an array/string, etc.
- [See the example](./Problem%20Solving%20Pattern%20Examples/Sliding%20Window%20Pattern/)

### Divide and Conquer

- This pattern involves dividing a data set into smaller chunks and the repeating a process with a subset of data
- This pattern can tremendously decrease time complexity
- [See the example](./Problem%20Solving%20Pattern%20Examples/Divide%20and%20Conquer%20Pattern/)

## Recursion

- The recursion is a **process (function)** that **calls itself**
- [See the example](./Recursion%20Examples/)

### The Call Stack

- A **call stack** is a mechanism for an interpreter (like the JavaScript interpreter in a web browser) to keep track of its place in a script that calls multiple functions
- Any time a function is invoked, it's placed (**pushed**) on the top of the stack
- When JavaScript sees the **return** keyword or when the function ends, the compiler will remove (**pop**) function out of the stack

### How Recursion Functions Work

- We invoke the **same** function with a different input until you reach your **base case**
- The **base case** is the condition when the recursion ends
- In summary, 2 essential parts of a recursion function are base case and different input

### Helper Method Recursion

- A helper method is a **recursive method** that makes use of additional parameters to keep track of values. It is any method you use to help in the execution of other methods or functions and which is not used outside of that context

```js
function outer(input) {
  let outerScopedVariable = [];

  function helper(helperInput) {
    // Modify the outerScopedVariable
    helper(helperInput--);
  }

  helper(input);

  return outerScopedVariable;
}
```

- [See the example](./Recursion%20Examples/helper-method-example.js)

### Pure Recursion

- A function is pure if it does not change any non-local variables, read files or network connections, or make any output
- A function qualifies as a pure function if:

  - It will always return the same result if given the same arguments. This is also known as referential transparency. This means that pure functions rely on their own arguments and immutable values to determine their return value. For example, mathematical functions are considered to be referentially transparent .
  - It doesn’t produce any side effects. What this means is that a function does not change the association between its name and value within a given scope. Side effects are harmful because they introduce uncertainty to the code. Consequently, this leads to difficulty tracing and debugging should an issue arise.

- [See the example](./Recursion%20Examples/pure-recursion-example.js)

## Searching Algorithms

| Searching Algorithms                                          | Best case | Average Case | Worst Case |
| ------------------------------------------------------------- | --------- | ------------ | ---------- |
| [Linear Search](https://www.geeksforgeeks.org/linear-search/) | O(1)      | O(n)         | O(n)       |
| [Binary Search](https://www.geeksforgeeks.org/binary-search/) | O(1)      | O(log n)     | O(log n)   |

- [See the example](./Searching%20Algorithms/)
- [Read more about searching algorithms](https://www.geeksforgeeks.org/searching-algorithms/)

## Sorting Algorithms

- Sorting is the process of rearranging the items in a collection (e.g. an array) so that the items are in some kind of order

| Searching Algorithms                                            | Best case  | Average Case | Worst Case | Examples                                                                  |
| --------------------------------------------------------------- | ---------- | ------------ | ---------- | ------------------------------------------------------------------------- |
| [Bubble Sort](https://www.geeksforgeeks.org/bubble-sort/)       | O(n)       | O(n^2)       | O(n^2)     | [See example of bubble sort](./Sorting%20Algorithms//Bubble%20Sort/)      |
| [Selection Sort](https://www.geeksforgeeks.org/selection-sort/) | O(n^2)     | O(n^2)       | O(n^2)     | [See example of selection sort](./Sorting%20Algorithms/Selection%20Sort/) |
| [Insertion Sort](https://www.geeksforgeeks.org/insertion-sort/) | O(n)       | O(n^2)       | O(n^2)     | [See example of insertion sort]()                                         |
| [Merge Sort](https://www.geeksforgeeks.org/merge-sort/)         | O(n log n) | O(n log n)   | O(n log n) | [See example of merge sort]()                                             |
| [Quick Sort](https://www.geeksforgeeks.org/quick-sort/)         | O(n log n) | O(n log n)   | O(n^2)     | [See example of quick sort]()                                             |
| [Radix Sort](https://www.geeksforgeeks.org/radix-sort/)         | O(a(n+b))  | O(p\*(n+d))  | O(n^2)     | [See example of radix sort]()                                             |

- [Read more about sorting algorithms](https://www.geeksforgeeks.org/sorting-algorithms/)
- [Sorting Algorithms Animations](https://www.toptal.com/developers/sorting-algorithms)
- [Visualgo - Sorting Algorithms](https://visualgo.net/en/sorting)
