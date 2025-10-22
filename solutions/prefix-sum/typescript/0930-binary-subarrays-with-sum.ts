/**
 * # 930. Binary Subarrays With Sum
 * 
 * # Difficulty: Medium
 * 
 * Given a binary array nums and an integer goal, return the number of non-empty subarrays
 * with a sum equal to goal.
 * 
 * A subarray is a contiguous part of the array.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,0,1,0,1], goal = 2</dd>
 * <dt>Output:</dt>
 * <dd>4</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 4 binary subarrays with sum equal to goal</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Sliding Window Pattern, Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(n) - Additional hash map storage
 * 
 * ### INTUITION:
 * Use prefix sum with hash map. For each position, count how many previous positions
 * have prefix_sum = current_prefix_sum - goal. This gives us all subarrays ending at
 * current position with sum equal to goal.
 * 
 * ### APPROACH:
 * 1. **Hash Map**: Store (prefix_sum → frequency) pairs
 * 2. **Prefix Sum**: Calculate cumulative sum
 * 3. **Count**: For each position, add count of (current_sum - goal) from map
 * 4. **Update**: Add current sum to map for future positions
 * 
 * ### WHY THIS WORKS:
 * If prefix[j] - prefix[i] = goal, then sum(nums[i+1:j+1]) = goal.
 * For each j, count all i where prefix[i] = prefix[j] - goal.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * nums = [1,0,1,0,1], goal = 2
 * Prefix sums: [1, 1, 2, 2, 3]
 * 
 * Initialize: {0: 1}  # prefix sum 0 at position -1
 * Index 0: sum=1, need 1-2=-1 (not found), count=0, add {0:1, 1:1}
 * Index 1: sum=1, need 1-2=-1 (not found), count=0, add {0:1, 1:2}
 * Index 2: sum=2, need 2-2=0 (found 1), count=1, add {0:1, 1:2, 2:1}
 * Index 3: sum=2, need 2-2=0 (found 1), count=2, add {0:1, 1:2, 2:2}
 * Index 4: sum=3, need 3-2=1 (found 2), count=4
 * Total: 4
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * 
 * ### EDGE CASES:
 * - goal = 0: Count subarrays with all zeros
 * - All zeros: Special handling needed if goal > array length
 * - No valid subarrays: Return 0
 * 
 * </details>
 */

class Solution {
  /**
   * Approach: Prefix sum with hash map
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  numSubarraysWithSum(nums: number[], goal: number): number {
    const prefix_count = { 0: 1 };
    const count = 0;
    const prefix_sum = 0;
    for (const num of nums) {
      prefix_sum += num;
      const needed = prefix_sum - goal;
      if (needed in prefix_count) {
        count += prefix_count[needed];
      }
      const prefix_count[prefix_sum] = prefix_count.get(prefix_sum, 0) + 1;
    }
    return count;
  }

  /**
   * Approach: Sliding window (at most technique)
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   *
   * Key insight: exactly(goal) = atMost(goal) - atMost(goal-1)
   */
  numSubarraysWithSumSlidingWindow(nums: number[], goal: number): number {
    return at_most(goal) - at_most(goal - 1);
  }

  /**
   * Approach: Brute force checking all subarrays
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  numSubarraysWithSumBruteForce(nums: number[], goal: number): number {
    const count = 0;
    const n = nums.length;
    for (let i = 0; i < n; i++) {
      const current_sum = 0;
      for (let j = 0; j < i; j++) {
        current_sum += nums[j];
        if (current_sum === goal) {
          count += 1;
        } else {
          if (current_sum > goal) {
          }
        }
      }
    }
    return count;
  }

}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution();
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;