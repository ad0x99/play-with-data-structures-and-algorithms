/**
 * https://leetcode.com/problems/number-of-recent-calls/description/
 *
 * Queue Approach: Because we want to track a specific time frame consecutively from [t - 3000, t], with this property, we can use a queue to track and store these times in order from latest to oldest calls.
 *
 * 1. We initialize a queue in RecentCounter to store all the recent calls in time frame
 *
 * 2. In the ping function, firstly, we push the new time frame to the queue each time we call the ping function.
 *
 * 3. After that, if the first time frame is less than t - 3000, we remove it from the queue. Because we only need to keep track the time frame from t - 3000 to t.
 *
 * 4. Return the length of the queue which contains all of the valid recent calls
 *
 * Time complexity: O(n), where n is the number of elements in the queue. This is because we may need to shift elements from the queue if they are older than 3000 milliseconds. The average time complexity is O(n)/n = O(1).
 *
 * Space complexity: O(n) because we are storing all the elements in the queue.
 */
struct RecentCounter {
    queue: Vec<i32>,
}

/**
 * `&self` means the method takes an immutable reference.
 * If you need a mutable reference, change it to `&mut self` instead.
 */
impl RecentCounter {
    fn new() -> Self {
        Self { queue: Vec::new() }
    }

    // Function to record a ping at a specific time
    fn ping(&mut self, t: i32) -> i32 {
        self.queue.push(t);

        // Remove elements older than 3000 from the front of the queue
        while !self.queue.is_empty() && *self.queue.get(0).unwrap() < t - 3000 {
            self.queue.remove(0);
        }

        self.queue.len() as i32
    }
}
