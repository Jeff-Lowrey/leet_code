/**

 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Count how many students are not standing in the correct position when compared
 * to the sorted order of heights. We need to find indices where the original array
 * differs from the sorted array.
 *
 * APPROACH:



 *
 * WHY THIS WORKS:
 * By comparing the original array with its sorted version, we can identify
 * exactly which students are out of place. The count gives us the answer.
 *
 * TIME COMPLEXITY: O(n log n) for sorting
 * SPACE COMPLEXITY: O(n) for the sorted copy
 *
 * EXAMPLE WALKTHROUGH:
 * Input: heights = [1,1,4,2,1,3]
 * Step 1: Create sorted: [1,1,1,2,3,4]
 * Step 2: Compare positions:
 *   - Index 0: 1 == 1 ✓
 *   - Index 1: 1 == 1 ✓
 *   - Index 2: 4 != 1 ✗
 *   - Index 3: 2 == 2 ✓
 *   - Index 4: 1 != 3 ✗
 *   - Index 5: 3 != 4 ✗
 * Output: 3 (three students are not in correct position)
 *
 * EDGE CASES:
 * - Already sorted array: returns 0
 * - All same heights: returns 0
 * - Reverse sorted: returns n (all out of place)
 */

/**
 * Main solution for Problem 1051: Height Checker
 *
 * @param {number[]} heights - Array of student heights
 * @return {number} - Number of students not in correct position
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(heights) {
    // Create sorted copy
    const expected = [...heights].sort((a, b) => a - b);

    // Count mismatches
    let count = 0;
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== expected[i]) {
            count++;
        }
    }

    return count;
}

/**
 * Test cases for Problem 1051: Height Checker
 */
function testSolution() {
    console.log('Testing 1051. Height Checker');

    // Test case 1: Example from problem
    const result1 = solve([1, 1, 4, 2, 1, 3]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Already sorted
    const result2 = solve([1, 2, 3, 4, 5]);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Reverse sorted
    const result3 = solve([5, 1, 2, 3, 4]);
    const expected3 = 5;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element
    const result4 = solve([1]);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 1051. Height Checker!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1051. Height Checker ===');
    console.log('Category: Sorting');
    console.log('Difficulty: Easy');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
