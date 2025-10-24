/**
 * # Difficulty: Easy
 *
 * # 0704. Binary Search
 *
 * Difficulty: Medium
 *
 * Given an array of integers nums which is sorted in ascending order,
 * and an integer target, write a function to search target in nums.
 * If target exists, then return its index. Otherwise, return -1.
 *
 * You must write an algorithm with O(log n) runtime complexity.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[-1,0,3,5,9,12], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>4</dd>
 * <dt>Explanation:</dt>
 * <dd>Target 9 is at index 4 in sorted array [-1,0,3,5,9,12]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Map Storage, Array Traversal, Two Pointers
 * **Data Structures**: Array, Tree
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: * O(log n) - Binary search or tree height
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * Binary search is the classic divide-and-conquer algorithm for searching
 * in sorted arrays. We repeatedly divide the search space in half by
 * comparing the target with the middle element.
 *
 * ### APPROACH:
 * 1. **Initialize pointers**: Set left=0, right=len(nums)-1
 * 2. **Divide search space**: Calculate mid = (left + right) // 2
 * 3. **Compare and eliminate**:
 *    - If nums[mid] == target: found, return mid
 *    - If nums[mid] < target: search right half (left = mid + 1)
 *    - If nums[mid] > target: search left half (right = mid - 1)
 * 4. **Repeat until found or search space exhausted**
 *
 * ### WHY THIS WORKS:
 * - Sorted array property allows us to eliminate half the elements each iteration
 * - Each comparison reduces search space by 50%
 * - Guarantees O(log n) time complexity
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [-1,0,3,5,9,12], target = 9
 * ```
 *
 * Step 1: left=0, right=5, mid=2, nums[2]=3 < 9, search right
 * Step 2: left=3, right=5, mid=4, nums[4]=9 == 9, found!
 *
 * Output:
 * ```
 * 4
 * ```

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty array: return -1
 * - Single element: check if it equals target
 * - Target not in array: return -1
 * - Target at boundaries: first or last element
 *
 * </details>
 */

/**
 * Main solution for Problem 704: Binary Search
 *
 * @param {number[]} nums - Sorted array of integers
 * @param {number} target - Target value to search for
 * @return {number} - Index of target if found, -1 otherwise
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(nums, target) {
  // Handle edge case: empty array
  if (!nums || nums.length === 0) {
    return -1;
  }

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Calculate middle index (avoid integer overflow)
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
  }

  // Target not found
  return -1;
}

/**
 * Test cases for Problem 704: Binary Search
 */
function testSolution() {
  console.log("Testing 704. Binary Search");

  // Test case 1: Target found in middle
  const result1 = solve([-1, 0, 3, 5, 9, 12], 9);
  const expected1 = 4;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Target not found
  const result2 = solve([-1, 0, 3, 5, 9, 12], 2);
  const expected2 = -1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Single element found
  const result3 = solve([5], 5);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element not found
  const result4 = solve([5], 4);
  const expected4 = -1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Empty array
  const result5 = solve([], 1);
  const expected5 = -1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Target at first position
  const result6 = solve([-1, 0, 3, 5, 9, 12], -1);
  const expected6 = 0;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test case 7: Target at last position
  const result7 = solve([-1, 0, 3, 5, 9, 12], 12);
  const expected7 = 5;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  console.log("All test cases passed for 704. Binary Search!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 704. Binary Search ===");
  console.log("Category: Binary Search");
  console.log("Difficulty: Easy");
  console.log("");

  console.log("Example 1:");
  console.log("Input: nums = [-1,0,3,5,9,12], target = 9");
  console.log("Output:", solve([-1, 0, 3, 5, 9, 12], 9));
  console.log("");

  console.log("Example 2:");
  console.log("Input: nums = [-1,0,3,5,9,12], target = 2");
  console.log("Output:", solve([-1, 0, 3, 5, 9, 12], 2));
  console.log("");

  testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
  demonstrateSolution();
}

// Export for use in other modules
module.exports = {
  solve,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This is the classic binary search implementation
 * - The key insight is to use two pointers (left, right) to narrow down the search space
 * - Always use Math.floor() for middle calculation to avoid floating point issues
 * - The loop condition (left <= right) is crucial - use <= not just <
 * - This template can be adapted for many binary search variations
 */
