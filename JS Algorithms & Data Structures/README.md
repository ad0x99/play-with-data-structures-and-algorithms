# JavaScript Algorithms and Data Structure

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
