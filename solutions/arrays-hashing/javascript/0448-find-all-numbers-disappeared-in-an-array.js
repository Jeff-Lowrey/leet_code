/**
 * ### METADATA:
 * **Techniques**: In-place Marking, Index as Hash Key
 * **Data Structures**: Array (in-place)
 * **Time Complexity**: O(n)
 * **Space Complexity**: O(1)
 *
 * ### INTUITION:
 * The key insight is that use the array itself as a hash map by marking indices. For each number n, negate the value at index n-1 to mark that n is present. After marking, any indices with positive values indicate missing numbers.
 *
 * ### APPROACH:
 * 1. **Mark present numbers**: Iterate through nums array, for each num get index = abs(num) - 1
 * 2. **Negate at index**: Set nums[index] = -abs(nums[index]) to mark that number (index + 1) is present
 * 3. **Use absolute value**: Always use abs(num) when calculating index since previous iterations may have negated values
 * 4. **Find missing numbers**: After marking phase, iterate through indices 0 to len(nums) - 1
 * 5. **Check for positive values**: If nums[i] > 0, then number (i + 1) was never marked as present
 * 6. **Build result**: Append (i + 1) to result list for each positive value found
 * 7. **Return result**: Return list of all missing numbers from range [1, n]
 *
 * ### WHY THIS WORKS:
 * - Array values are in range [1, n], so each value maps to a valid index (value - 1)
 * - Negating values at corresponding indices marks numbers as "seen" without extra space
 * - Using absolute value when indexing handles already-negated values correctly
 * - Positive values after marking phase indicate those indices+1 were never present
 * - O(n) time with two passes, O(1) space by reusing input array as marker
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [4,3,2,7,8,2,3,1]
 * ```
 *
 * Step 1: Mark present numbers by negating values at indices
 * - Process 4: nums[3] = -7, nums = [4,3,2,-7,8,2,3,1]
 * - Process 3: nums[2] = -2, nums = [4,3,-2,-7,8,2,3,1]
 * - Process 2: nums[1] = -3, nums = [4,-3,-2,-7,8,2,3,1]
 * - Process 7: nums[6] = -3, nums = [4,-3,-2,-7,8,2,-3,1]
 * - Process 8: nums[7] = -1, nums = [4,-3,-2,-7,8,2,-3,-1]
 * - Process 2: already marked
 * - Process 3: already marked
 * - Process 1: nums[0] = -4, nums = [-4,-3,-2,-7,8,2,-3,-1]
 * Step 2: Find indices with positive values
 *
 * Steps:
 * Step 1: - Index 4 has value 8 (positive) → number 5 is missing
 * Step 2: - Index 5 has value 2 (positive) → number 6 is missing
 *
 * Output:
 * ```
 * [5, 6]
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - where n is the length of the array. We make two complete passes through the array: (1) first pass marks present numbers by negating values at corresponding indices (**O(n)**), (2) second pass identifies which indices have positive values to determine missing numbers (**O(n)**). Each operation within the loops is **O(1)**. Total: **O(n)** + **O(n)** = **O(2n)** = **O(n)**. This is optimal since we must examine every element.
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - We use only constant extra space for variables (loop counters, index calculations). The result array doesn't count toward space complexity as it's required output. We modify the input array in-place using negation to mark present numbers, avoiding any additional data structures. This achieves the follow-up requirement of **O(1)** space without using extra sets or hash maps.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 *
 */

function solve(nums) {
  const n = nums.length;

  // First pass: mark present numbers by making corresponding indices negative
  for (let i = 0; i < n; i++) {
    // Get the number (use absolute value since it might have been marked negative)
    const num = Math.abs(nums[i]);
    // Convert to 0-based index
    const index = num - 1;
    // Mark as seen by making the value at that index negative
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }

  // Second pass: find missing numbers (positive values indicate missing)
  const result = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      // Convert back to 1-based number
      result.push(i + 1);
    }
  }

  // Optional: restore original array
  for (let i = 0; i < n; i++) {
    nums[i] = Math.abs(nums[i]);
  }

  return result;
}

/**
 * Alternative solution using Set for comparison
 *
 * @param {number[]} nums - Array of integers in range [1, n]
 * @return {number[]} - Array of missing integers from 1 to n
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the set
 */
function solveWithSet(nums) {
  const n = nums.length;
  const numSet = new Set(nums);
  const result = [];

  for (let i = 1; i <= n; i++) {
    if (!numSet.has(i)) {
      result.push(i);
    }
  }

  return result;
}

/**
 * Test cases for Problem 448: Find All Numbers Disappeared In An Array
 */
function testSolution() {
  console.log("Testing 448. Find All Numbers Disappeared In An Array");

  // Test case 1: Basic example
  const result1 = solve([4, 3, 2, 7, 8, 2, 3, 1]);
  const expected1 = [5, 6];
  console.assert(
    JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Single missing number
  const result2 = solve([1, 1]);
  const expected2 = [2];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: No missing numbers
  const result3 = solve([1, 2, 3, 4]);
  const expected3 = [];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: All missing except one
  const result4 = solve([2, 2, 2, 2]);
  const expected4 = [1, 3, 4];
  console.assert(
    JSON.stringify(result4.sort()) === JSON.stringify(expected4.sort()),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: Single element
  const result5 = solve([1]);
  const expected5 = [];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  // Test alternative approach
  const result6 = solveWithSet([4, 3, 2, 7, 8, 2, 3, 1]);
  const expected6 = [5, 6];
  console.assert(
    JSON.stringify(result6.sort()) === JSON.stringify(expected6.sort()),
    `Test 6 failed: expected [${expected6}], got [${result6}]`,
  );

  console.log(
    "All test cases passed for 448. Find All Numbers Disappeared In An Array!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log(
    "\n=== Problem 448. Find All Numbers Disappeared In An Array ===",
  );
  console.log("Category: Arrays Hashing");
  console.log("Difficulty: Easy");
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
  solveWithSet,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - The negative marking technique is a classic space-optimization approach
 * - This problem demonstrates using array indices as a hash table
 * - The technique works because all numbers are in range [1, n]
 * - Consider whether modifying input is acceptable in real applications
 */
