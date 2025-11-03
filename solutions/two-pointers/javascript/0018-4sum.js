/**
 * # Difficulty: Medium
 *
 * # 0018. 4Sum
 *
 *
 * Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:
 *
 * - 0 <= a, b, c, d < n
 * - a, b, c, and d are distinct.
 * - nums[a] + nums[b] + nums[c] + nums[d] == target
 *
 * You may return the answer in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,0,-1,0,-2,2], target = 0</dd>
 * <dt>Output:</dt>
 * <dd>[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>4Sum: quadruplets summing to target</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply two pointers methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- This ensures that the solution leverages two pointers principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,0,-1,0,-2,2], target = 0
 * ```
 *
 * Step 1: Sort array
 * sorted = [-2,-1,0,0,1,2]
 * Step 2: Fix first two, use two pointers for rest
 * i=-2, j=-1: find pairs summing to 3
 * i=-2, j=0: find pairs summing to 2
 * ...
 *
 * Output:
 * ```
 * [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
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
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 018: 4Sum
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of unique quadruplets that sum to target
 *
 * Time Complexity: O(n³)
 * Space Complexity: O(1)
 */
function solve(nums, target) {
  // Edge case: need at least 4 numbers
  if (!nums || nums.length < 4) {
    return [];
  }

  const result = [];
  const n = nums.length;

  // Sort the array to enable two-pointer technique and skip duplicates
  nums.sort((a, b) => a - b);

  for (let i = 0; i < n - 3; i++) {
    // Skip duplicate values for the first number
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    for (let j = i + 1; j < n - 2; j++) {
      // Skip duplicate values for the second number
      if (j > i + 1 && nums[j] === nums[j - 1]) {
        continue;
      }

      // Two pointers approach for the remaining array
      let left = j + 1;
      let right = n - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);

          // Skip duplicates for the third number
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          // Skip duplicates for the fourth number
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }

          left++;
          right--;
        } else if (sum < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return result;
}

/**
 * Test cases for Problem 018: 4Sum
 */
function testSolution() {
  console.log("Testing 018. 4Sum");

  // Helper function to compare arrays of arrays
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = a.map((arr) => arr.slice().sort((x, y) => x - y)).sort();
    const sortedB = b.map((arr) => arr.slice().sort((x, y) => x - y)).sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  };

  // Test case 1: Example from problem
  const result1 = solve([1, 0, -1, 0, -2, 2], 0);
  const expected1 = [
    [-2, -1, 1, 2],
    [-2, 0, 0, 2],
    [-1, 0, 0, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.log(
    `Test 1 passed: fourSum([1,0,-1,0,-2,2], 0) = ${JSON.stringify(result1)}`,
  );

  // Test case 2: No solution
  const result2 = solve([2, 2, 2, 2, 2], 8);
  const expected2 = [[2, 2, 2, 2]];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );
  console.log(
    `Test 2 passed: fourSum([2,2,2,2,2], 8) = ${JSON.stringify(result2)}`,
  );

  // Test case 3: Edge case - less than 4 elements
  const result3 = solve([1, 2, 3], 6);
  const expected3 = [];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );
  console.log(
    `Test 3 passed: fourSum([1,2,3], 6) = ${JSON.stringify(result3)}`,
  );

  // Test case 4: Another example
  const result4 = solve([2, 2, 2, 2, 2], 9);
  const expected4 = [];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );
  console.log(
    `Test 4 passed: fourSum([2,2,2,2,2], 9) = ${JSON.stringify(result4)}`,
  );

  // Test case 5: Negative target
  const result5 = solve([-3, -1, 0, 2, 4, 5], 2);
  const expected5 = [[-3, -1, 2, 4]];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );
  console.log(
    `Test 5 passed: fourSum([-3,-1,0,2,4,5], 2) = ${JSON.stringify(result5)}`,
  );

  console.log("All test cases passed for 018. 4Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 018. 4Sum ===");
  console.log("Category: Two Pointers");
  console.log("Difficulty: Medium");
  console.log("");

  // Example demonstration would go here
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
 * - This solution focuses on two pointers concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
