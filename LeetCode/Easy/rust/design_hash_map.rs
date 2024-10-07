/**
 * https://leetcode.com/problems/design-hashmap/description/
 *
 * Array Approach
 *
 * 1. We initialize an empty array with fixed capacity to store the data.
 * 2. The getBucketIndex function is used for get the index of specified bucket in the array.
 * 3. The put function is used to add or update a new key-value pair in the array.
 * - 3.1: We get the bucket index of the current key.
 * - 3.2: We iterate through the bucket.
 * - 3.3: We extract the key and value of the current bucket.
 * - 3.4: We update the existing key-value pair if the key is found.
 * - 3.5: Otherwise, we push the new key-value pair to the bucket array if the key isn't found.
 *
 * 4. The get function is used to get the value of the specified key.
 * - 4.1: We iterate over key-value pairs within the bucket
 * - 4.2: We return the value if the key is found.
 * - 4.3: Otherwise, we return `-1` if the key isn't found.
 *
 * 5. The remove function is used to remove a key-value pair from the array.
 * - 5.1: We get the bucket index of the current key.
 * - 5.2: We iterate through the bucket.
 * - 5.3: We extract the key and value of the current bucket.
 * - 5.4: We delete the existing key-value pair if the key is found by using splice method to remove the key-value pair at the specific index if found.
 *
 * Time complexity: O(n) in the worst case, particularly when:
 * - Collisions: If the hashing function frequently maps multiple keys to the same bucket index, it leads to collisions. In this case, the put, get, and remove operations might need to iterate through a longer list of elements within the bucket to find the target key, increasing the time complexity.
 * - Poor Hashing Function: A poorly designed hashing function that creates many collisions can significantly slow down all operations in the worst case.
 *
 * Space complexity:
 * - O(n) In the worst case, where the number of key-value pairs (n) stored in the HashMap is very large compared to the number of buckets, it can lead to a high number of collisions and longer bucket lists. This increases the space used to store these elements.
 * - O(1): In the average case, with a good hashing function and appropriate bucket sizing, the space complexity remains constant. The number of elements per bucket stays relatively low, and the overall space usage grows linearly with the number of key-value pairs added.
 */
struct MyHashMap {
    buckets: Vec<Vec<(i32, i32)>>,
}

const CAPACITY: usize = 1000;

impl MyHashMap {
    fn new() -> Self {
        let mut buckets = Vec::with_capacity(CAPACITY);
        for _ in 0..CAPACITY {
            buckets.push(Vec::new());
        }
        MyHashMap { buckets }
    }

    fn get_bucket_index(&self, key: i32) -> usize {
        (key as usize) % CAPACITY
    }

    fn put(&mut self, key: i32, value: i32) {
        let bucket_index = self.get_bucket_index(key);

        for &mut (ref existing_key, ref mut existing_value) in &mut self.buckets[bucket_index] {
            if *existing_key == key {
                *existing_value = value;
                return;
            }
        }

        self.buckets[bucket_index].push((key, value));
    }

    fn get(&self, key: i32) -> i32 {
        let bucket_index = self.get_bucket_index(key);

        for &(existing_key, value) in &self.buckets[bucket_index] {
            if existing_key == key {
                return value;
            }
        }

        -1 // Key not found
    }

    fn remove(&mut self, key: i32) {
        let bucket_index = self.get_bucket_index(key);

        self.buckets[bucket_index].retain(|&(existing_key, _)| existing_key != key);
    }
}
