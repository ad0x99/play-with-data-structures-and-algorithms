/**
 * https://leetcode.com/problems/minimum-garden-perimeter-to-collect-enough-apples/description/
 *
 * Linear Approach
 *
 * Assumptions about the Orchard: The formula `2 * perimeter * (perimeter + 1) * (2 * perimeter + 1)` makes certain assumptions about how the apple trees are planted within the square orchard:
 * - Square Orchard: The formula assumes a square-shaped orchard with sides of equal length.
 *
 * - Full Coverage: All possible positions within the orchard are occupied by apple trees. There are no empty spaces inside the orchard.
 *
 * - Planting Pattern: The formula considers a specific planting pattern where trees are planted on all grid points, including the center and along the edges.
 *
 * Explanation of the Formula: The formula can be broken down into three parts:
 *
 * `2 * perimeter`: This part accounts for the two sides of the orchard that are on the perimeter. Since there are apple trees on both sides, we multiply by 2.
 *
 * `(perimeter + 1)`: This part represents the number of apple trees along one side of the perimeter (excluding the corners). The + 1 accounts for the extra tree at the corner compared to interior rows/columns that might have one fewer tree on each side.
 *
 * `(2 * perimeter + 1)`: This part calculates the number of apple trees on one entire side of the orchard, including both the perimeter and the interior row/column. The `* 2` accounts for the two rows/columns on a side (one on the perimeter and one inside), and the `+ 1` again accounts for the corner tree
 *
 * Combining the Parts:
 *
 * By multiplying these three parts together, we get the total number of apple trees within the orchard with the given perimeter:
 *
 * Total Apples = `2 * perimeter * (perimeter + 1) * (2 * perimeter + 1)`
 *
 * Implementation
 *
 * 1. We initialize a variable perimeter to 0.
 *
 * 2. We create an infinite loop that continues until the loop's termination condition is met.
 * - 2.1: In each iteration, we increase the perimeter by 1 to represent trying orchards with increasing perimeters.
 *
 * - 2.2: And then we check if the number of apples produced by an orchard with the current perimeter is greater than or equal to the neededApples, it means the orchard with the current perimeter can produce enough apples. We return the minimum perimeter multiplied by a factor of 8 (assuming each side of the orchard contributes 8 apples).
 *
 * Time complexity: O(sqrt(n))
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn minimum_perimeter(needed_apples: i64) -> i64 {
        let mut perimeter = 0;

        loop {
            perimeter += 1;

            if (Self::calculate_apples(perimeter) >= needed_apples) {
                return perimeter * 8;
            }
        }
    }

    fn calculate_apples(perimeter: i64) -> i64 {
        2 * perimeter * (perimeter + 1) * (2 * perimeter + 1)
    }
}

/**
 *
 * Binary Search Approach
 *
 * In order to improve the performance from the previous approach, we will replace the linear search by using binary search to find the minimum perimeter
 *
 * Time complexity: O(log(cbrt(neededApples)))
 *
 * Space complexity: O(1)
 */
impl Solution {
    pub fn minimum_perimeter(needed_apples: i64) -> i64 {
        let mut left = 0;
        let mut right = ((needed_apples as f64) / 4.0).cbrt() as i64 + 1;

        while left <= right {
            let mut mid_perimeter = (left + right) / 2;

            if (Self::calculate_apples(mid_perimeter) >= needed_apples) {
                right = mid_perimeter - 1;
            } else {
                left = mid_perimeter + 1;
            }
        }

        left * 8
    }

    fn calculate_apples(perimeter: i64) -> i64 {
        2 * perimeter * (perimeter + 1) * (2 * perimeter + 1)
    }
}
