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
 * Main solution for Problem 71: Simplify Path
 *
 * @param {string} path - Unix-style file path
 * @return {string} - Simplified canonical path
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(path) {
    const stack = [];
    const components = path.split('/');

    for (const component of components) {
        // Skip empty strings and current directory
        if (component === '' || component === '.') {
            continue;
        }

        // Go up one directory (if possible)
        if (component === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            // Valid directory name
            stack.push(component);
        }
    }

    // Build canonical path
    return '/' + stack.join('/');
}

/**
 * Test cases for Problem 71: Simplify Path
 */
function testSolution() {
    console.log('Testing 71. Simplify Path');

    // Test case 1: Basic with dots and double dots
    const result1 = solve("/a/./b/../../c/");
    const expected1 = "/c";
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Root path
    const result2 = solve("/../");
    const expected2 = "/";
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Multiple slashes
    const result3 = solve("/home//foo/");
    const expected3 = "/home/foo";
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Complex path
    const result4 = solve("/a/../../b/../c//.//");
    const expected4 = "/c";
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    console.log('All test cases passed for 71. Simplify Path!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 71. Simplify Path ===');
    console.log('Category: Stack');
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
 * - This solution focuses on stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
