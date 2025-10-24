/**
 * # Difficulty: Medium
 *
 * # 239. Sliding Window Maximum
 *
 * Difficulty: Medium
 *
 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
 *
 * Return the max sliding window.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,3,-1,-3,5,3,6,7], k = 3</dd>
 * <dt>Output:</dt>
 * <dd>[3,3,5,5,6,7]</dd>
 * <dt>Explanation:</dt>
 * <dd>The maximum value in each sliding window of size 3 is [3,3,5,5,6,7]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Queue
 * **Patterns**: Two Pointers Pattern, Sliding Window Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Use deque to maintain indices of useful elements (potential maximums). Remove indices outside window. Remove indices with smaller values than current (they're never max). Front of deque is window maximum.
 *
 * ### APPROACH:
 * 1. **Initialize deque**: Create deque to store indices of useful elements
 * 2. **Process first window**: For first k elements, maintain decreasing order in deque
 * 3. **Remove smaller elements**: Before adding nums[i], remove indices with smaller values from back
 * 4. **Add current index**: Append i to deque
 * 5. **Slide window**: For i from k to n, add deque front to result
 * 6. **Remove out-of-window**: If deque front < i-k+1, remove it
 * 7. **Maintain deque property**: Remove smaller elements from back, add current index
 * 8. **Add last maximum**: Append last deque front to result, return result
 *
 * ### WHY THIS WORKS:
 * - Monotonic decreasing deque stores indices of potential maximums
 * - Front always contains current window's maximum
 * - Remove indices outside window from front, remove smaller values from back
 * - When adding element, pop back while deque[-1] < current
 * - O(n) time: each element added/removed once, O(k) space for deque
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,-1,-3,5,3,6,7], k = 3
 * ```
 *
 * Step 1: Use deque to track indices
 * Window [1,3,-1]: max=3
 * Window [3,-1,-3]: max=3
 * Window [-1,-3,5]: max=5
 * Window [-3,5,3]: max=5
 * Window [5,3,6]: max=6
 * Window [3,6,7]: max=7
 *
 * Output:
 * ```
 * [3,3,5,5,6,7]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
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
   * Find maximum in each sliding window using deque.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(k)
   */
  maxSlidingWindow(nums: number[], k: number): number[] {
    if (!nums || nums.length === 0 || k <= 0) {
      return [];
    }

    if (k === 1) {
      return nums;
    }

    const result: number[] = [];
    const deque: number[] = [];

    for (let i = 0; i < nums.length; i++) {
      while (deque.length > 0 && deque[0] < i - k + 1) {
        deque.shift();
      }

      while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
        deque.pop();
      }

      deque.push(i);

      if (i >= k - 1) {
        result.push(nums[deque[0]]);
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${JSON.stringify(solution.maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)) === JSON.stringify([3, 3, 5, 5, 6, 7]) ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${JSON.stringify(solution.maxSlidingWindow([1], 1)) === JSON.stringify([1]) ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${JSON.stringify(solution.maxSlidingWindow([1, -1], 1)) === JSON.stringify([1, -1]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
