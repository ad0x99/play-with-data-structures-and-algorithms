/**
 * https://leetcode.com/problems/insert-delete-getrandom-o1/description/
 *
 * Hash Table Approach
 *
 * 1. We initialize a `elements` Map which is used to store elements and their corresponding indices in the keys array. And an `keys` array which stores the actual elements of the set.
 *
 * 2. Insert Function
 * - 2.1: If the value already exists in the set, we return false as duplicates are not allowed.
 *
 * - 2.2: If the value doesn't exist, we set the value as a key in the `elements` map with its corresponding index in the keys array as the value. This allows for fast lookup of an element's position.
 *
 * - 2.3: We push the value to the end of the keys array. Finally, we return true.
 *
 * 3. Remove Function
 * - 3.1: If the value doesn't exist, we return false.
 *
 * - 3.2: If the value exists, we retrieve its corresponding index (`valueToRemoveIdx`) from the `elements` map, and retrieve the last element (`lastElementIdx`) from the keys array.
 *
 * - 3.3: To efficiently remove the element and maintain the order of remaining elements for random access, we use swap the positions of the element to be removed with the current last element in the keys array. This essentially moves the element to be removed to the last position.
 *
 * - 3.4: We then remove the last element (now the element to be removed) from the keys.
 *
 * - 3.5: We update the `elements` map by setting the new index (`valueToRemoveIdx`) of the swapped element (previously the last element) as the value for the key (`keys[valueToRemoveIdx]`). This keeps the map consistent with the updated keys array.
 *
 * - 3.6: Finally, we remove the value from the `elements` map, and return true.
 *
 * 4. GetRandom Function
 * - 4.1: We generate a random index (`randomValue`) within the range of the keys array length.
 *
 * - 4.2: And then, we retrieve the element at the random index (`randomValue`) from the keys array and return it.
 *
 * Time complexity: O(1)
 *
 * Space complexity: O(n)
 */
use rand::Rng;
use std::collections::HashMap;

struct RandomizedSet {
    elements: HashMap<i32, usize>,
    keys: Vec<i32>,
}

impl RandomizedSet {
    fn new() -> Self {
        RandomizedSet {
            elements: HashMap::new(),
            keys: Vec::new(),
        }
    }

    fn insert(&mut self, val: i32) -> bool {
        if self.elements.contains_key(&val) {
            return false;
        }

        self.elements.insert(val, self.keys.len());
        self.keys.push(val);
        true
    }

    fn remove(&mut self, val: i32) -> bool {
        if let Some(&idx_to_remove) = self.elements.get(&val) {
            let last_idx = self.keys.len() - 1;
            let last_val = self.keys[last_idx];

            self.keys.swap(idx_to_remove, last_idx);
            self.keys.pop();

            if idx_to_remove != last_idx {
                self.elements.insert(last_val, idx_to_remove);
            }
            self.elements.remove(&val);

            true
        } else {
            false
        }
    }

    fn get_random(&self) -> i32 {
        let mut rng = rand::thread_rng();
        let random_idx = rng.gen_range(0..self.keys.len());
        self.keys[random_idx]
    }
}
