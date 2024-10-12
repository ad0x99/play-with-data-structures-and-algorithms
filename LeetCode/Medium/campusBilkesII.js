/**
 * https://leetcode.com/problems/campus-bikes-ii/description/
 * https://leetcode.ca/all/1066.html
 *
 * Backtracking Approach (Time Limit Exceeded)
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
const assignBikes = (workers, bikes) => {
  let minDistance = Number.MAX_SAFE_INTEGER;

  const manhattanDistance = (p1, p2) => {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  };

  const backtrack = (iWorker, assignedBikes, currentDistance) => {
    // If all workers have been assigned bikes, update minDistance
    if (iWorker === workers.length) {
      minDistance = Math.min(minDistance, currentDistance);
      return;
    }

    for (let iBike = 0; iBike < bikes.length; iBike++) {
      // Skip if the current bike is already used
      if (assignedBikes.has(iBike)) continue;

      // Mark the current bike as used
      assignedBikes.set(iBike, true);
      // Explore next worker
      const newDistance = manhattanDistance(workers[iWorker], bikes[iBike]);
      backtrack(iWorker + 1, assignedBikes, currentDistance + newDistance);
      // Backtracking
      assignedBikes.delete(iBike);
    }
  };

  backtrack(0, new Map(), 0);
  return minDistance;
};

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
const assignBikes = (workers, bikes) => {
  const manhattanDistance = (p1, p2) => {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  };

  const dp = (iWorker, assignedBikes) => {
    // If all workers are assigned, return 0
    if (iWorker === workers.length) return 0;

    let minDistance = Number.MAX_SAFE_INTEGER;

    // Iterate over all bikes
    for (let iBike = 0; iBike < bikes.length; iBike++) {
      // If the current bike is already been assigned, skip it
      if (assignedBikes.has(iBike)) continue;

      // Create new set of used bikes and include current bike
      const newAssignedBike = new Set(assignedBikes);
      newAssignedBike.add(iBike);

      // Calculate Manhattan distance and update the answer
      const newDistance = manhattanDistance(workers[iWorker], bikes[iBike]);
      minDistance = Math.min(
        minDistance,
        dp(iWorker + 1, newAssignedBike) + newDistance
      );
    }

    return minDistance;
  };

  return dp(0, new Set());
};

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
const assignBikes = (workers, bikes) => {
  const manhattanDistance = (p1, p2) => {
    return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
  };

  const memo = {};
  const dp = (iWorker, assignedBikesMask) => {
    // If all workers are assigned, return 0
    if (iWorker === workers.length) return 0;

    let minDistance = Number.MAX_SAFE_INTEGER;
    // Memoization key
    const key = `${iWorker}:${assignedBikesMask}`;
    if (key in memo) return memo[key];

    // Iterate over all bikes
    for (let iBike = 0; iBike < bikes.length; iBike++) {
      // If the current bike is already been assigned, skip it
      if ((assignedBikesMask >> iBike) & 1) continue;

      // Create new set of used bikes and include current bike
      const newAssignedBikeMask = assignedBikesMask | (1 << iBike);

      // Calculate Manhattan distance and update the answer
      const newDistance = manhattanDistance(workers[iWorker], bikes[iBike]);
      minDistance = Math.min(
        minDistance,
        dp(iWorker + 1, newAssignedBikeMask) + newDistance
      );
    }

    // Store the result in memo and return
    memo[key] = minDistance;
    return minDistance;
  };

  return dp(0, 0);
};
