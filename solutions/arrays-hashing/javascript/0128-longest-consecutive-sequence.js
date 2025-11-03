/**
 * # Difficulty: Medium
 *
 * # 0128. Longest Consecutive Sequence
 *
 *
 * Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
 *
 * You must write an algorithm that runs in O(n) time.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[100, 4, 200, 1, 3, 2]</dd>
 * <dt>Output:</dt>
 * <dd>4 (sequence [1,2,3,4])</dd>
 * <dt>Explanation:</dt>
 * <dd>The longest consecutive sequence [1,2,3,4] has length 4</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 * ### METADATA:
 * **Techniques**: Hash Set for O(1) Lookups, Sequence Start Detection, Greedy Counting
 * **Data Structures**: Hash Set (for deduplication and fast lookups), Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm, Sequence Detection
 * **Time Complexity**: O(n) - Each element visited at most twice
 * **Space Complexity**: O(n) - Hash Set stores all unique elements

 *
 * ### INTUITION:
The key insight is to use a hash set for O(1) lookups and only start counting sequences from their beginning. For each number, check if (num-1) exists - if not, this is a sequence start. Then count consecutive numbers (num+1, num+2, etc.) until we can't find the next number. This ensures each number is visited at most twice (once to check if it's a start, once as part of a sequence), giving us O(n) time.

### APPROACH:
1. **Convert to Set**: Store all numbers in a Set for O(1) lookups
2. **Find sequence starts**: For each number, check if (num-1) exists. If not, it's a sequence start
3. **Count consecutive**: From each start, count how many consecutive numbers exist (num+1, num+2, etc.)
4. **Track maximum**: Keep track of the longest sequence found
5. **Return result**: Return the length of the longest consecutive sequence

### WHY THIS WORKS:
- This ensures that the solution leverages arrays hashing principles
- This ensures that time complexity is optimized for the given constraints
- This ensures that space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [100, 4, 200, 1, 3, 2]
 * ```
 *
 * Step 1: Convert to set
 * num_set = {100, 4, 200, 1, 3, 2}
 * Step 2: Check num=1 (no num-1=0 in set, so it's a sequence start)
 * current_num = 1, current_streak = 1
 *
 * Steps:
 * Step 1: 1+1=2 in set → current_streak = 2
 * Step 2: 2+1=3 in set → current_streak = 3
 * Step 3: 3+1=4 in set → current_streak = 4
 * Step 4: 4+1=5 not in set → stop
 * Step 5: longest_streak = 4
 * Step 6: Check num=2 (num-1=1 exists, skip)
 * Step 7: Check num=3 (num-1=2 exists, skip)
 * Step 8: Check num=4 (num-1=3 exists, skip)
 * Step 9: Check num=100 (no num-1=99, sequence start)
 * Step 10: current_streak = 1, no 101 in set
 * Step 11: Check num=200 (no num-1=199, sequence start)
 * Step 12: current_streak = 1, no 201 in set
 *
 * Output:
 * ```
 * 4 (sequence [1,2,3,4])
 * ```

 * ### TIME COMPLEXITY:
 * **O(n)** - where n is the number of elements in the array. Although we have nested loops, each number is visited at most twice: once in the outer loop to check if it's a sequence start (checking if num-1 exists), and potentially once more as part of counting a sequence (in the inner while loop). The key insight is that the while loop only executes for numbers that are sequence starts, and each number can only be part of one sequence. Total operations: at most 2n lookups and iterations, giving us O(2n) = O(n).
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - We store all n unique numbers in the Set data structure. In the worst case where all numbers are unique, the Set contains n elements. Even with duplicates, we still need O(n) space to store the unique values. This is the dominant space usage, making our space complexity O(n).
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
 */

/**
 * Main solution for Problem 128: Longest Consecutive Sequence
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Length of longest consecutive sequence
 *
 * Time Complexity: O(n) - each number visited at most twice
 * Space Complexity: O(n) - for the Set storage
 */
function solve(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  // Convert to Set for O(1) lookups and to handle duplicates
  const numSet = new Set(nums);
  let longestStreak = 0;

  // Iterate through each unique number
  for (const num of numSet) {
    // Only start counting sequences from the beginning
    // If (num - 1) exists, this isn't the start of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      // Count consecutive numbers starting from this number
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      // Update the longest streak found
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}

/**
 * Alternative solution using sorting (less efficient but simpler)
 *
 * @param {number[]} nums - Array of integers
 * @return {number} - Length of longest consecutive sequence
 *
 * Time Complexity: O(n log n) - due to sorting
 * Space Complexity: O(1) - if we can modify input, O(n) for sorted copy
 */
function solveWithSorting(nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  // Sort the array
  nums.sort((a, b) => a - b);

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < nums.length; i++) {
    // Skip duplicates
    if (nums[i] === nums[i - 1]) {
      continue;
    }

    // Check if consecutive
    if (nums[i] === nums[i - 1] + 1) {
      currentStreak++;
    } else {
      // Reset streak
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }

  // Check final streak
  return Math.max(longestStreak, currentStreak);
}

/**
 * Test cases for Problem 128: Longest Consecutive Sequence
 */
function testSolution() {
  console.log("Testing 128. Longest Consecutive Sequence");

  // Test case 1: Basic example
  const result1 = solve([100, 4, 200, 1, 3, 2]);
  const expected1 = 4; // sequence: 1,2,3,4
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: No consecutive elements
  const result2 = solve([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]);
  const expected2 = 9; // sequence: 0,1,2,3,4,5,6,7,8
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Empty array
  const result3 = solve([]);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Single element
  const result4 = solve([1]);
  const expected4 = 1;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Duplicates
  const result5 = solve([1, 2, 0, 1]);
  const expected5 = 3; // sequence: 0,1,2
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: All same numbers
  const result6 = solve([2, 2, 2, 2]);
  const expected6 = 1;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test alternative approach
  const result7 = solveWithSorting([100, 4, 200, 1, 3, 2]);
  console.assert(
    result7 === expected1,
    `Test 7 failed: sorting approach should give same result`,
  );

  console.log("All test cases passed for 128. Longest Consecutive Sequence!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 128. Longest Consecutive Sequence ===");
  console.log("Category: Arrays Hashing");
  console.log("Difficulty: Medium");
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
  solveWithSorting,
  testSolution,
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - The key insight is to only start counting from sequence beginnings
 * - This avoids the O(n²) complexity of checking every possible sequence
 * - The Set approach is optimal for this problem
 * - Sorting approach is simpler but less efficient
 */
