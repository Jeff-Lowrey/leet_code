/**
 * 071. Simplify Path
 * Medium
 *
 * This problem demonstrates key concepts in Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Simplify Unix-style file paths by handling '.', '..', and multiple slashes.
 * A stack is perfect for this: push valid directories, pop when encountering '..'.
 *
 * APPROACH:
 * 1. **Split path**: Divide path by '/' to get components
 * 2. **Use stack**: Process each component:
 *    - Skip empty strings and '.'
 *    - Pop from stack for '..' (if stack not empty)
 *    - Push valid directory names
 * 3. **Build result**: Join stack with '/' and prefix with '/'
 *
 * WHY THIS WORKS:
 * - Stack naturally handles directory traversal (.. goes up one level = pop)
 * - Splitting by '/' handles multiple consecutive slashes automatically
 * - Empty components from split are filtered out
 *
 * TIME COMPLEXITY: O(n) - process each character once
 * SPACE COMPLEXITY: O(n) - stack stores valid path components
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: "/a/./b/../../c/"
 * Step 1: Split → ["", "a", ".", "b", "..", "..", "c", ""]
 * Step 2: Process → stack: [] → ["a"] → ["a"] → ["a","b"] → ["a"] → [] → ["c"]
 * Output: "/c"
 * ```
 *
 * EDGE CASES:
 * - Root path: "/" returns "/"
 * - Path with only dots: "/../" returns "/"
 * - Multiple slashes: "///" returns "/"
 */

/**
 * Main solution for Problem 071: Simplify Path
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
 * Test cases for Problem 071: Simplify Path
 */
function testSolution() {
    console.log('Testing 071. Simplify Path');

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

    console.log('All test cases passed for 071. Simplify Path!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 071. Simplify Path ===');
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
