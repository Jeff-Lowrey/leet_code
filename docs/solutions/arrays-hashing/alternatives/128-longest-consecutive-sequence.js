/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
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
    console.log('Testing 128. Longest Consecutive Sequence');

    // Test case 1: Basic example
    const result1 = solve([100,4,200,1,3,2]);
    const expected1 = 4; // sequence: 1,2,3,4
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: No consecutive elements
    const result2 = solve([0,3,7,2,5,8,4,6,0,1]);
    const expected2 = 9; // sequence: 0,1,2,3,4,5,6,7,8
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Empty array
    const result3 = solve([]);
    const expected3 = 0;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element
    const result4 = solve([1]);
    const expected4 = 1;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Duplicates
    const result5 = solve([1,2,0,1]);
    const expected5 = 3; // sequence: 0,1,2
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: All same numbers
    const result6 = solve([2,2,2,2]);
    const expected6 = 1;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test alternative approach
    const result7 = solveWithSorting([100,4,200,1,3,2]);
    console.assert(result7 === expected1,
        `Test 7 failed: sorting approach should give same result`);

    console.log('All test cases passed for 128. Longest Consecutive Sequence!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 128. Longest Consecutive Sequence ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Medium');
    console.log('');

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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - The key insight is to only start counting from sequence beginnings
 * - This avoids the O(n²) complexity of checking every possible sequence
 * - The Set approach is optimal for this problem
 * - Sorting approach is simpler but less efficient
 */
