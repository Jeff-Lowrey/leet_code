/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that use sliding window tracking fruit types with hash map. Expand while <= 2 types. When 3rd type appears, shrink until back to 2 types. Track maximum window size.
 *
 * ### APPROACH:
 * 1. **Initialize variables**: Set left = 0, max_fruits = 0, basket = {}
 * 2. **Expand with right**: For right in range(len(fruits))
 * 3. **Add to basket**: basket[fruits[right]] = basket.get(fruits[right], 0) + 1
 * 4. **Check basket limit**: While len(basket) > 2, shrink window
 * 5. **Remove from left**: basket[fruits[left]] -= 1, remove if 0, increment left
 * 6. **Update maximum**: max_fruits = max(max_fruits, right - left + 1)
 * 7. **Return result**: Return max_fruits
 *
 * ### WHY THIS WORKS:
 * - This ensures that longest subarray with at most 2 distinct elements (fruit types)
 * - This ensures that hash map tracks count of each fruit type in current window
 * - This ensures that expand right adding fruits, contract left when > 2 types
 * - This ensures that remove fruit type when its count reaches 0 in map
 * - This ensures that o(n) time: each element processed twice at most, O(1) space (at most 3 keys)
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * fruits = [1,2,1,2,3,1,1]
 * ```
 *
 * Step 1: Expand with at most 2 types
 * [1,2,1,2]: types={1,2}, count=4
 * [1,2,1,2,3]: types={1,2,3}, invalid
 * Step 2: Contract
 * [2,1,2,3]: types={1,2,3}, invalid
 * [1,2,3]: types={1,2,3}, invalid
 * [2,3]: types={2,3}, valid
 * [2,3,1,1]: types={2,3,1}, invalid
 * [3,1,1]: types={3,1}, count=3
 *
 * Output:
 * ```
 * 4 (maximum fruits)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

class Solution {
  /**
   * Find maximum fruits collected with at most 2 types using sliding window.
   *
   * Args:
   *     fruits: Array where fruits[i] is the type of fruit at tree i
   *
   * Returns:
   *     Maximum number of fruits that can be collected
   *
   * Time Complexity: O(n) - each element visited at most twice
   * Space Complexity: O(1) - hashmap contains at most 3 entries
   */
  totalFruit(fruits: number[]): number {
    const left = 0;
    const max_fruits = 0;
    for (let right = 0; right < fruits.length; right++) {
      const fruit = fruits[right];
      const basket[fruit] = basket.get(fruit, 0) + 1;
      while (basket.length > 2) {
        const left_fruit = fruits[left];
        basket[left_fruit] -= 1;
        if (basket[left_fruit] === 0) {
        }
        left += 1;
      }
      const max_fruits = max(max_fruits, right - left + 1);
    }
    return max_fruits;
  }

  /**
   * Wrapper method for consistency with template.
   */
  solve(fruits: number[]): number {
    return self.totalFruit(fruits);
  }

}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution();
  const solution = Solution();
  const fruits = [1, 2, 3, 2, 2];
  solution.solve(fruits);
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;