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
 * Main solution for Problem 739: Daily Temperatures
 *
 * @param {number[]} temperatures - Daily temperatures
 * @return {number[]} - Days until warmer temperature
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = []; // Store indices

    for (let i = 0; i < n; i++) {
        // Pop cooler days and update their wait times
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }

    return result;
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * Test cases for Problem 739: Daily Temperatures
 */
function testSolution() {
    console.log('Testing 739. Daily Temperatures');

    // Test case 1: Example from problem
    const result1 = solve([73,74,75,71,69,72,76,73]);
    const expected1 = [1,1,4,2,1,1,0,0];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Another example
    const result2 = solve([30,40,50,60]);
    const expected2 = [1,1,1,0];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Decreasing temperatures
    const result3 = solve([30,60,90]);
    const expected3 = [1,1,0];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: All same temperature
    const result4 = solve([30,30,30,30]);
    const expected4 = [0,0,0,0];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single day
    const result5 = solve([50]);
    const expected5 = [0];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    // Test case 6: Decreasing then increasing
    const result6 = solve([89,62,70,58,47,99]);
    const expected6 = [5,1,3,2,1,0];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected [${expected6}], got [${result6}]`);

    console.log('All test cases passed for 739. Daily Temperatures!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 739. Daily Temperatures ===');
    console.log('Category: Monotonic Stack');
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
