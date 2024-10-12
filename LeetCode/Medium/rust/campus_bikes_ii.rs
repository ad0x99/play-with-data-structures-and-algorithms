/**
 * https://leetcode.com/problems/campus-bikes-ii/description/
 * https://leetcode.ca/all/1066.html
 *
 * Backtracking Approach
 *
 * Idea: We will use backtracking technique to explore every possible way to assign bikes to workers and calculate the total Manhattan distance for each assignment. This approach ensures that no assignments are missed, and the algorithm undoes each assignment after exploring it so it can try other combinations.
 *
 * Implementation
 *
 * 1. We initialize a `minDistance` variable to keep track the minimum possible distance found so far.
 *
 * 2. Backtracking:
 * - 2.1: Base case: If all workers have been assigned bikes (`iWorker === workers.length`), we compare the current total distance with the current minDistance and update the minDistance using the smaller distance.
 *
 * - 2.2: Recursive Exploration - Explore all possible combinations of bikes to workers. For each worker (`iWorker`), we loop over all bikes (`iBike`), and check if the current bike is already assigned (`assignedBikes.has(iBike)`), we continue to the next bike.
 *
 * - 2.3: Otherwise, if the current bike is not already assigned, we assign the current bike to the current worker by marking it in the assignedBikes.
 *
 * - 2.4: We calculate the distance between the current work and the bike using manhattan distance.
 *
 * - 2.5: We recursively call backtrack for the next worker, passing the updated assignedBikes and the new total distance (`currentDistance + newDistance`).
 *
 * - 2.6: After the recursive call, we remove the bike from assignedBikes (`assignedBikes.delete(iBike)`), effectively "undoing" the combination to explore other combinations (backtracking).
 *
 * 3. Once all possibilities are explored, we return the smallest distance found
 *
 * Time complexity: O(m ^ n) where m is the number of bikes. This is because we are using backtracking to try all possible combinations of assigning bikes to workers. In the worst case scenario, we will have to try all possible permutations of bikes for each worker.
 *
 * Space complexity: O(m) where m is the number of bikes.
 */
impl Solution {
    pub fn assign_bikes(workers: Vec<Vec<i32>>, bikes: Vec<Vec<i32>>) -> i32 {
        fn manhattan_distance(p1: &Vec<i32>, p2: &Vec<i32>) -> i32 {
            (p1[0] - p2[0]).abs() + (p1[1] - p2[1]).abs()
        }

        fn backtrack(
            i_worker: usize,
            workers: &Vec<Vec<i32>>,
            bikes: &Vec<Vec<i32>>,
            assigned_bikes: &mut Vec<bool>,
            current_distance: i32,
            min_distance: &mut i32,
        ) {
            if i_worker == workers.len() {
                *min_distance = (*min_distance).min(current_distance);
                return;
            }

            for i_bike in 0..bikes.len() {
                if !assigned_bikes[i_bike] {
                    // Assign the bike to the worker
                    assigned_bikes[i_bike] = true;
                    let new_distance = manhattan_distance(&workers[i_worker], &bikes[i_bike]);

                    // Explore for the next worker
                    backtrack(
                        i_worker + 1,
                        workers,
                        bikes,
                        assigned_bikes,
                        current_distance + new_distance,
                        min_distance,
                    );

                    // Backtrack: unassign the bike
                    assigned_bikes[i_bike] = false;
                }
            }
        }

        let mut min_distance = i32::MAX;
        let mut assigned_bikes = vec![false; bikes.len()]; // Track used bikes

        backtrack(
            0,
            &workers,
            &bikes,
            &mut assigned_bikes,
            0,
            &mut min_distance,
        );

        min_distance
    }
}

/**
 * Top-Down Dynamic Programming Approach (TLE)
 *
 * Idea: The dp(iWorker, assignedBikes) is the minimum possible sum of Manhattan distances between each worker and their assigned bike
 * - iWorker: The index of the current worker we’re assigning a bike to.
 * - assignedBikes: A set that keeps track of which bikes have already been assigned.
 *
 * Each recursion, we calculate the minimum possible Manhattan distance for assigning bikes to all remaining workers.
 *
 * Implementation
 *
 * 1. Base case: If we have assigned bikes to all workers (iWorker === workers.length), return 0 because there are no more distances to add.
 *
 * 2. Recursion Exploration:
 * - 2.1: We initialize `minDistance` to a very large number (Number.MAX_SAFE_INTEGER), which will store the minimum total distance found for each worker.
 *
 * - 2.2: We iterate over bikes, for each worker (iWorker), if the current bike is not already assigned, we assign the current bike to the current worker, otherwise, we skip the current bike.
 *
 * - 2.3: When assigning a bike to the current worker, we create a new set (newAssignedBike) that includes this bike. Because the Set objects are mutable, If we modify the same set across recursive calls (i.e., if we directly add/remove bikes in the original assignedBikes), it could interfere with other branches of the recursive tree.
 *
 * - 2.4: We calculate the Manhattan distance between the current worker (workers[iWorker]) and the current bike (bikes[iBike]).
 *
 * - 2.5: After that, we recursively call the dp function for the next worker (iWorker + 1) with the updated newAssignedBike set, and add the newDistance to the total.
 *
 * 3. After iterating through all possible bike combinations for the current worker, we return the minimum distance found for this worker.
 *
 *
 * Time complexity: O(n * 2 ^ m * m * m) = O(n * m * 2 ^ m), where n is the number of workers, and m is the number of bikes.
 *
 * Space complexity: O(n * 2 ^ n), due to the recursive calls and the size of a set to keep track of assigned bikes for each worker.
 */
use std::collections::HashSet;
impl Solution {
    pub fn assign_bikes(workers: Vec<Vec<i32>>, bikes: Vec<Vec<i32>>) -> i32 {
        fn manhattan_distance(p1: &Vec<i32>, p2: &Vec<i32>) -> i32 {
            (p1[0] - p2[0]).abs() + (p1[1] - p2[1]).abs()
        }

        fn dp(
            i_worker: usize,
            workers: &Vec<Vec<i32>>,
            bikes: &Vec<Vec<i32>>,
            assigned_bikes: &HashSet<usize>,
        ) -> i32 {
            if i_worker == workers.len() {
                return 0; // All workers assigned
            }

            let mut min_distance = i32::MAX;

            for i_bike in 0..bikes.len() {
                // Skip if the bike has already been assigned
                if assigned_bikes.contains(&i_bike) {
                    continue;
                }

                // Create a new set of assigned bikes
                let mut new_assigned_bikes = assigned_bikes.clone();
                new_assigned_bikes.insert(i_bike);

                // Calculate the Manhattan distance for this assignment
                let new_distance = manhattan_distance(&workers[i_worker], &bikes[i_bike]);

                // Recursively assign the next worker
                let total_distance =
                    dp(i_worker + 1, workers, bikes, &new_assigned_bikes) + new_distance;

                // Update minimum distance
                min_distance = min_distance.min(total_distance);
            }

            min_distance
        }

        let assigned_bikes = HashSet::new();
        dp(0, &workers, &bikes, &assigned_bikes)
    }
}

/**
 * Top-Down Dynamic Programming + Bit Mask Approach
 *
 * Idea: The dp(iWorker, assignedBikes) is the minimum possible sum of Manhattan distances between each worker and their assigned bike
 * - iWorker: The index of the current worker we’re assigning a bike to.
 * - assignedBikesMask: This is a bitmask that keeps track of which bikes have been assigned so far. Each bit in the integer mask corresponds to a specific bike, where 1 means the bike is already assigned, and 0 means it's still available.
 *
 * Each recursion, we calculate the minimum possible Manhattan distance for assigning bikes to all remaining workers.
 *
 * For optimization, we use a memo object to store intermediate results (the minimum distance for a specific state of the problem), and return if it's already calculated.
 *
 * Implementation
 *
 * 1. Base case: If we have assigned bikes to all workers (iWorker === workers.length), return 0 because there are no more distances to add.
 *
 * 2. Recursion Exploration:
 * - 2.1: We initialize `minDistance` to a very large number (Number.MAX_SAFE_INTEGER), which will store the minimum total distance found for each worker.
 *
 * - 2.2: Memoization Check: We use the current worker and the current bitmask as a key to store the calculated result. If the current state has already been calculated, we return the cached result to avoid recomputation.
 *
 * - 2.3: We iterate over bikes, for each worker (iWorker), we check if the bike has already been assigned by examining the corresponding bit in assignedBikesMask. If the bike is assigned (the bit is 1), we skip that bike.
 *
 * - 2.4: Otherwise, If the bike is not yet assigned, we update the assignedBikesMask by setting the bit corresponding to that bike using bitwise OR (|).
 *
 * - 2.5: We calculate the Manhattan distance between the current worker (workers[iWorker]) and the current bike (bikes[iBike]).
 *
 * - 2.5: After that, we recursively call the dp function for the next worker (iWorker + 1) with the updated newAssignedBikeMask set, and add the newDistance to the total.
 *
 * - 2.6: After calculating the minimum distance for the current combination, we store the result in memo and return it.
 *
 * 3. After iterating through all possible bike combinations for the current worker, we return the minimum distance found for this worker.
 *
 * Time complexity: O(n * 2 ^ m * m), where n is the number of workers, and m is the number of bikes.
 *
 * Space complexity: O(n * 2 ^ n), due to the recursive calls and the size of a set to keep track of assigned bikes for each worker.
 */
use std::collections::HashMap;
impl Solution {
    pub fn assign_bikes(workers: Vec<Vec<i32>>, bikes: Vec<Vec<i32>>) -> i32 {
        fn manhattan_distance(p1: &Vec<i32>, p2: &Vec<i32>) -> i32 {
            (p1[0] - p2[0]).abs() + (p1[1] - p2[1]).abs()
        }

        fn dp(
            i_worker: usize,
            assigned_bikes_mask: i32,
            workers: &Vec<Vec<i32>>,
            bikes: &Vec<Vec<i32>>,
            memo: &mut HashMap<(usize, i32), i32>,
        ) -> i32 {
            // If all workers are assigned, return 0
            if i_worker == workers.len() {
                return 0;
            }

            // Check memoization
            if let Some(&result) = memo.get(&(i_worker, assigned_bikes_mask)) {
                return result;
            }

            let mut min_distance = i32::MAX;

            // Iterate over all bikes
            for i_bike in 0..bikes.len() {
                // If the current bike is already assigned, skip it
                if (assigned_bikes_mask >> i_bike) & 1 == 1 {
                    continue;
                }

                // Create new mask with the current bike assigned
                let new_assigned_bike_mask = assigned_bikes_mask | (1 << i_bike);

                // Calculate Manhattan distance
                let new_distance = manhattan_distance(&workers[i_worker], &bikes[i_bike]);

                // Recur to the next worker
                let total_distance =
                    dp(i_worker + 1, new_assigned_bike_mask, workers, bikes, memo) + new_distance;

                // Update minimum distance
                min_distance = min_distance.min(total_distance);
            }

            // Store result in memo
            memo.insert((i_worker, assigned_bikes_mask), min_distance);

            min_distance
        }

        let mut memo = HashMap::new();
        dp(0, 0, &workers, &bikes, &mut memo)
    }
}
