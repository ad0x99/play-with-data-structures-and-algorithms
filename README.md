# algorithms-with-js

Data structure and Algorithms with JS

# Table of Contents

| Title                                                      | Link                                                                                                 |
| ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Practical Guide to Algorithms                              | [Link](https://github.com/ad0x99/algorithms-with-js/tree/master/Practical%20Guide%20to%20Algorithms) |
| The Coding Interview Bootcamp Algorithms & Data Structures | [Link](https://github.com/ad0x99/algorithms-with-js/tree/master/Practical%20Guide%20to%20Algorithm)  |
| LeetCode                                                   | [Link](https://github.com/ad0x99/algorithms-with-js/tree/master/LeetCode)                            |

# Algorithms Theory

### Space & Time Complexity

##### 1. Introduction Space & Time Complexity

- Space Complexity (How much **memory** is used?)
- Time Complexity (How many primitive **operations** are executed?): Time complexity of an algorithm signifies the total time required by the program to run to completion. The time complexity of algorithms is most commonly expressed using the big O notation.
- Big O notation gives us an industry-standard language to discuss the performance of algorithms. Not knowing how to speak this language can make you stand out as an inexperienced programmer.

| Big-O, name                        | # of Operations | Algorithm                        |
| ---------------------------------- | --------------- | -------------------------------- |
| O(n^2), quadratic time               | n^2             | Compare all numbers              |
| O(n), linear time                    | 2n              | Find min and max numbers         |
| O(1), constant time                     | 2               | Sorted list, find first and last |
| O(log(n)), logarithmic time  |                 |                                  |
| O(n) * O(log(n)), quasilinear time |                 |                                  |

**FAST** -------------------------------------------------------------------------> **SLOW**

| Name     | constant | logarithmic | linear | quadratic | exponential |
| -------- | -------- | ----------- | ------ | --------- | ----------- |
| Notation | O(1)     | O(log(n))     | O(n)   | O(n^2)    | O(k^n)      |

**Complexity of Common Operations**

| Complexity        | Operation                                                        | Description                                                                                                                                                              |
| ----------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| O(1)              | Running a statement. Value look-up on an array, object, variable | No matter how many elements we're working with, the algorithm/operation will always take the same amount of time                                                         |
| O(log(n))         | Loop that cuts problem in half every iteration                   | You have this if doubling the number of elements you are iterating over does not double the amount of work. Always assume that searching operations are log(n)           |
| O(n)              | Looping through the values of an array                           | Iterating through all elements in a collection of data. If you see a for loop spanning from **0** to **array.length**, you properly have **n**, or linear runtime        |
| O(n^2)            | Double nested loop                                               | Every element in a collection has to be compared to every other element                                                                                                  |
| O(n^3)            | Triple nested loop                                               |                                                                                                                                                                          |
| O(n) * O(log(n)) |                                                                  | You have this if doubling the number of elements you are iterating over does not double the amount of work. Always assume that any sorting operation is **O(n) * log(n)** |
| O(2 ^ n)             |                                                                  | If you add a **single** element to a collection, the processing power required doubles                                                                                   |

![Big O Notation Graph](https://github.com/ad0x99/algorithms-with-js/blob/master/Practical%20Guide%20to%20Algorithms/img/bigOnotation.PNG)

![Big O Complexity Chart](https://github.com/ad0x99/algorithms-with-js/blob/master/Practical%20Guide%20to%20Algorithms/img/bigOcomplexitychart.PNG)

#### 2. Useful Resources for Algorithms

| Title             | Link                            |
| ----------------- | ------------------------------- |
| Big O Cheat Sheet | https://www.bigocheatsheet.com/ |
| GeeksforGeeks     | https://www.geeksforgeeks.org/  |
