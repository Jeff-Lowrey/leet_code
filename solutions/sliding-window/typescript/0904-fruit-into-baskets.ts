/**
 * # Difficulty: Medium
 * 
 * # 904. Fruit Into Baskets
 * 
 * You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits where fruits[i] is the type of fruit the ith tree produces.
 * 
 * You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
 * 
 * - You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
 * - Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of your baskets.
 * - Once you reach a tree with fruit that cannot fit in your baskets, you must stop.
 * 
 * Given the integer array fruits, return the maximum number of fruits you can pick.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>fruits = [1,2,1,2,3,1,1]</dd>
 * <dt>Output:</dt>
 * <dd>"Solution for 904. Fruit Into Baskets: {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>You can collect at most 3 fruits with 2 types of baskets (type 1 and type 2)</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Two Pointers Pattern, Sliding Window Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Use sliding window tracking fruit types with hash map. Expand while <= 2 types. When 3rd type appears, shrink until back to 2 types. Track maximum window size.
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
 * - Longest subarray with at most 2 distinct elements (fruit types)
 * - Hash map tracks count of each fruit type in current window
 * - Expand right adding fruits, contract left when > 2 types
 * - Remove fruit type when its count reaches 0 in map
 * - O(n) time: each element processed twice at most, O(1) space (at most 3 keys)
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

### TIME COMPLEXITY:
 * O(n)
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * 
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 * 
 * </details>
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