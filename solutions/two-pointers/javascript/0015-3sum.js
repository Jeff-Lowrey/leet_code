/**
 * # 15. 3sum
 *
 * # Difficulty: Medium
 *
 * Given an integer array `nums`, return all the triplets [`nums`[i], `nums`[j], `nums`[k]]
 * such that `i` != `j`, `i` != `k`, and `j` != `k`, and `nums`[i] + `nums`[j] + `nums`[k] == 0.
 *
 * Notice that the solution `set` must not contain duplicate triplets.
 *
 * Example:
 * Input: `nums` = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums` = [-1,0,1,2,-1,-4]</dd>
 * <dt>Output:</dt>
 * <dd>[[-1,-1,2],[-1,0,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>3Sum: triplets summing to 0 in [-1,0,1,2,-1,-4] are [[-1,-1,2],[-1,0,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: * O(n²) - Nested iteration through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * Convert the 3Sum problem into multiple 2Sum problems. For each number, find pairs in the remaining array that sum to the negative of that number. Sorting helps avoid duplicates and enables two-pointer technique.
 *
 * ### APPROACH:
 * 1. **Sort Array**: Enables two-pointer technique and easy duplicate handling
 * 2. **Fix First Element**: For each nums[i], find pairs that sum to -nums[i]
 * 3. **Two Pointers**: Use left and right pointers to find the required sum
 * 4. **Skip Duplicates**: Avoid duplicate triplets by skipping repeated values
 *
 * ### WHY THIS WORKS:
 * Sorting enables efficient duplicate skipping and the two-pointer technique. For each fixed first element, the problem reduces to finding two numbers that sum to a target, which is efficiently solved with two pointers.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [-1,0,1,2,-1,-4]
 * ```
 *
 * Steps:
 * Step 1: Sort array → [-4,-1,-1,0,1,2]
 * Step 2: i=0, nums[i]=-4, target=4 → no valid pairs found
 * Step 3: i=1, nums[i]=-1, target=1 → left=2(-1), right=5(2) → sum=1 ✓ → triplet [-1,-1,2]
 * Step 4: i=2 → skip duplicate -1
 * Step 5: i=3, nums[i]=0, target=0 → no valid pairs found
 * Step 6: Return all unique triplets found
 *
 * Output:
 * ```
 * [[-1,-1,2],[-1,0,1]]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n²)
 * - O(n log n) for sorting
 * - O(n²) for nested loops with two pointers
 * - Overall: O(n²)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Excluding output space, only using constant extra space
 * - Sorting can be done in-place
 *
 * ### EDGE CASES:
 * - Array length < 3: return []
 * - All positive/negative numbers: return []
 * - Array with all zeros: return [[0,0,0]] if length ≥ 3
 *
 * </details>
 */

/**
 * Main solution for Problem 015: 3Sum
 *
 * @param {number[]} nums - Array of integers
 * @return {number[][]} - Array of unique triplets that sum to zero
 *
 * Time Complexity: O(n²)
 * - O(n log n) for sorting
 * - O(n²) for nested loops with two pointers
 * - Overall: O(n²)
 * Space Complexity: O(1)
 * - Excluding output space, only using constant extra space
 * - Sorting can be done in-place
 */
function solve(nums) {
  // Edge case: need at least 3 numbers
  if (!nums || nums.length < 3) {
    return [];
  }

  const result = [];

  // Sort the array to enable two-pointer technique and skip duplicates
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for the first number
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    // If the smallest number is positive, no triplet can sum to 0
    if (nums[i] > 0) {
      break;
    }

    // Two pointers approach for the remaining array
    let left = i + 1;
    let right = nums.length - 1;
    const target = -nums[i];

    while (left < right) {
      const sum = nums[left] + nums[right];

      if (sum === target) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for the second number
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        // Skip duplicates for the third number
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

  return result;
}

/**
 * Test cases for Problem 015: 3Sum
 */
function testSolution() {
  console.log("Testing 015. 3Sum");

  // Helper function to compare arrays of arrays
  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    const sortedA = a.map((arr) => arr.slice().sort((x, y) => x - y)).sort();
    const sortedB = b.map((arr) => arr.slice().sort((x, y) => x - y)).sort();
    return JSON.stringify(sortedA) === JSON.stringify(sortedB);
  };

  // Test case 1: Example from problem
  const result1 = solve([-1, 0, 1, 2, -1, -4]);
  const expected1 = [
    [-1, -1, 2],
    [-1, 0, 1],
  ];
  console.assert(
    arraysEqual(result1, expected1),
    `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`,
  );
  console.log(
    `Test 1 passed: threeSum([-1,0,1,2,-1,-4]) = ${JSON.stringify(result1)}`,
  );

  // Test case 2: No solution
  const result2 = solve([0, 1, 1]);
  const expected2 = [];
  console.assert(
    arraysEqual(result2, expected2),
    `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`,
  );
  console.log(`Test 2 passed: threeSum([0,1,1]) = ${JSON.stringify(result2)}`);

  // Test case 3: All zeros
  const result3 = solve([0, 0, 0]);
  const expected3 = [[0, 0, 0]];
  console.assert(
    arraysEqual(result3, expected3),
    `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`,
  );
  console.log(`Test 3 passed: threeSum([0,0,0]) = ${JSON.stringify(result3)}`);

  // Test case 4: Multiple solutions with duplicates
  const result4 = solve([-2, 0, 0, 2, 2]);
  const expected4 = [[-2, 0, 2]];
  console.assert(
    arraysEqual(result4, expected4),
    `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`,
  );
  console.log(
    `Test 4 passed: threeSum([-2,0,0,2,2]) = ${JSON.stringify(result4)}`,
  );

  // Test case 5: Edge case - less than 3 elements
  const result5 = solve([1, 2]);
  const expected5 = [];
  console.assert(
    arraysEqual(result5, expected5),
    `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`,
  );
  console.log(`Test 5 passed: threeSum([1,2]) = ${JSON.stringify(result5)}`);

  console.log("All test cases passed for 015. 3Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 015. 3Sum ===");
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
