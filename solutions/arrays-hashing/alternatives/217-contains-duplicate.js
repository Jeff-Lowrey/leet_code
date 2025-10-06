/**
 * 217. Contains Duplicate
 * Medium
 *
 * This problem demonstrates key concepts in Arrays Hashing.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * If all elements are unique, then the array length equals the set length.
If there are duplicates, the set will be smaller than the array.
 *
 * APPROACH:
 * [APPROACH content will be added here]
 *
 * WHY THIS WORKS:
 * [WHY THIS WORKS content will be added here]
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * [EXAMPLE WALKTHROUGH content will be added here]
 *
 * EDGE CASES:
 * [EDGE CASES content will be added here]
 */

/**
 * Main solution for Problem 217: Contains Duplicate
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if any value appears at least twice
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    const seen = new Set();

    for (const num of nums) {
        if (seen.has(num)) {
            return true;
        }
        seen.add(num);
    }

    return false;
}

/**
 * Test cases for Problem 217: Contains Duplicate
 */
function testSolution() {
    console.log('Testing 217. Contains Duplicate');

    // Test case 1: Has duplicates
    const result1 = solve([1, 2, 3, 1]);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: No duplicates
    const result2 = solve([1, 2, 3, 4]);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Multiple duplicates
    const result3 = solve([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 217. Contains Duplicate!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 217. Contains Duplicate ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Medium');
    console.log('');

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
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on arrays hashing concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
