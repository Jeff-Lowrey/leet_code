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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 448: Find All Numbers Disappeared In An Array
 *
 * @param {number[]} nums - Array of integers in range [1, n]
 * @return {number[]} - Array of missing integers from 1 to n
 *
 * Time Complexity: O(n) - two passes through the array
 * Space Complexity: O(1) - excluding output array, modifying input in-place
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
    console.log('Testing 448. Find All Numbers Disappeared In An Array');

    // Test case 1: Basic example
    const result1 = solve([4,3,2,7,8,2,3,1]);
    const expected1 = [5, 6];
    console.assert(JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()),
        `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Single missing number
    const result2 = solve([1,1]);
    const expected2 = [2];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: No missing numbers
    const result3 = solve([1,2,3,4]);
    const expected3 = [];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: All missing except one
    const result4 = solve([2,2,2,2]);
    const expected4 = [1, 3, 4];
    console.assert(JSON.stringify(result4.sort()) === JSON.stringify(expected4.sort()),
        `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single element
    const result5 = solve([1]);
    const expected5 = [];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected [${expected5}], got [${result5}]`);

    // Test alternative approach
    const result6 = solveWithSet([4,3,2,7,8,2,3,1]);
    const expected6 = [5, 6];
    console.assert(JSON.stringify(result6.sort()) === JSON.stringify(expected6.sort()),
        `Test 6 failed: expected [${expected6}], got [${result6}]`);

    console.log('All test cases passed for 448. Find All Numbers Disappeared In An Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 448. Find All Numbers Disappeared In An Array ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Easy');
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
    solveWithSet,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - The negative marking technique is a classic space-optimization approach
 * - This problem demonstrates using array indices as a hash table
 * - The technique works because all numbers are in range [1, n]
 * - Consider whether modifying input is acceptable in real applications
 */
