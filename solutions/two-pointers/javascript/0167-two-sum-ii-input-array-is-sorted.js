/**
 * # Difficulty: Medium
 *
 * # 167. Two Sum Ii Input Array Is Sorted
 *
 * Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.
 *
 * Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
 *
 * The tests are generated such that there is exactly one solution. You may not use the same element twice.
 *
 * Your solution must use only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 2]</dd>
 * <dt>Output:</dt>
 * <dd>"Expected {expected}, got {result}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Two numbers [2,7] at indices [1,2] sum to target 9</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Hash Map, Array, String
 * **Patterns**: Complement Search, Two Pointers Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply two pointers methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages two pointers principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: numbers = [2, 7, 11, 15], target = 9
 *
 * Step 1: Initialize pointers
 *   left = 0 (numbers[0] = 2)
 *   right = 3 (numbers[3] = 15)
 *
 * Step 2: First iteration
 *   current_sum = 2 + 15 = 17
 *   17 > 9, so move right pointer left
 *   right = 2
 *
 * Step 3: Second iteration
 *   left = 0 (numbers[0] = 2)
 *   right = 2 (numbers[2] = 11)
 *   current_sum = 2 + 11 = 13
 *   13 > 9, so move right pointer left
 *   right = 1
 *
 * Step 4: Third iteration
 *   left = 0 (numbers[0] = 2)
 *   right = 1 (numbers[1] = 7)
 *   current_sum = 2 + 7 = 9
 *   9 == 9 ✓ Found!
 *
 * Output: [1, 2] (1-indexed positions)
 * ```
 *
 * ### TIME COMPLEXITY:
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

/**
 * Main solution for Problem 167: Two Sum II - Input Array Is Sorted
 *
 * @param {number[]} numbers - Sorted array of integers (1-indexed)
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers (1-indexed) that add up to target
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      // Found the solution, return 1-indexed positions
      return [left + 1, right + 1];
    } else if (sum < target) {
      // Need a larger sum, move left pointer right
      left++;
    } else {
      // Need a smaller sum, move right pointer left
      right--;
    }
  }

  // The problem guarantees exactly one solution exists
  // This line should never be reached
  return [];
}

/**
 * Test cases for Problem 167: Two Sum II - Input Array Is Sorted
 */
function testSolution() {
  console.log("Testing 167. Two Sum II - Input Array Is Sorted");

  // Test case 1: Example from problem
  const result1 = solve([2, 7, 11, 15], 9);
  const expected1 = [1, 2];
  console.assert(
    result1.toString() === expected1.toString(),
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: twoSum([2,7,11,15], 9) = [${result1}]`);

  // Test case 2: Another example
  const result2 = solve([2, 3, 4], 6);
  const expected2 = [1, 3];
  console.assert(
    result2.toString() === expected2.toString(),
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: twoSum([2,3,4], 6) = [${result2}]`);

  // Test case 3: Negative numbers
  const result3 = solve([-1, 0], -1);
  const expected3 = [1, 2];
  console.assert(
    result3.toString() === expected3.toString(),
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: twoSum([-1,0], -1) = [${result3}]`);

  // Test case 4: Solution at extremes
  const result4 = solve([1, 2, 3, 4, 5], 6);
  const expected4 = [1, 5];
  console.assert(
    result4.toString() === expected4.toString(),
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: twoSum([1,2,3,4,5], 6) = [${result4}]`);

  // Test case 5: Adjacent elements
  const result5 = solve([1, 2, 3, 4, 5], 3);
  const expected5 = [1, 2];
  console.assert(
    result5.toString() === expected5.toString(),
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: twoSum([1,2,3,4,5], 3) = [${result5}]`);

  // Test case 6: Larger numbers
  const result6 = solve([5, 25, 75], 100);
  const expected6 = [2, 3];
  console.assert(
    result6.toString() === expected6.toString(),
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: twoSum([5,25,75], 100) = [${result6}]`);

  console.log(
    "All test cases passed for 167. Two Sum II - Input Array Is Sorted!",
  );
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 167. Two Sum II - Input Array Is Sorted ===");
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
 * - This is the classic two-pointer solution for sorted arrays
 * - More space-efficient than the hash map approach in Two Sum I
 * - The sorted property is crucial for the two-pointer technique to work
 * - Time complexity is linear, making it very efficient
 * - Remember to return 1-indexed positions as required by the problem
 */
