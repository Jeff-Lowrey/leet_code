/**
 * 71. Simplify Path
 * Medium
 *
 * Simplify Path - JavaScript Implementation This function takes a Unix-style file path and returns the simplified canonical path. Rules: - The path starts with a single forward slash '/' - Any two directories are separated by a single forward slash '/' - The path does not end with a trailing '/' - '.' refers to the current directory - '..' refers to the directory up a level @param {string} path - The input path to be simplified @return {string} - The simplified canonical path
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Simplify Path is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Simplify Path - JavaScript Implementation
 * 
 * This function takes a Unix-style file path and returns the simplified canonical path.
 * 
 * Rules:
 * - The path starts with a single forward slash '/'
 * - Any two directories are separated by a single forward slash '/'
 * - The path does not end with a trailing '/'
 * - '.' refers to the current directory
 * - '..' refers to the directory up a level
 * 
 * @param {string} path - The input path to be simplified
 * @return {string} - The simplified canonical path
 */

function simplifyPath(path) {
    // Handle edge cases
    if (!path || path.length === 0) {
        return "/";
    }

    // Split the path by '/' and filter out empty strings and single dots
    const components = path.split('/').filter(component => {
        return component !== '' && component !== '.';
    });

    // Stack to keep track of valid directory names
    const stack = [];

    // Process each component
    for (const component of components) {
        if (component === '..') {
            // Go up one level by removing the last directory if exists
            if (stack.length > 0) {
                stack.pop();
            }
        } else {
            // Add valid directory name to stack
            stack.push(component);
        }
    }

    // Construct the canonical path
    return '/' + stack.join('/');
}

// Test cases
const testCases = [
    "/home/",
    "/../",
    "/home//foo/",
    "/a/./b/../../c/",
    "/a/../../b/../c//.//",
    "/a//b////c/d//././/.."
];

// Run test cases
console.log("Test Cases:");
testCases.forEach(test => {
    console.log(`Input: "${test}"`);
    console.log(`Output: "${simplifyPath(test)}"`);
    console.log("---");
});

module.exports = simplifyPath;

/**
 * Example Usage:
 * simplifyPath("/home/") => "/home"
 * simplifyPath("/../") => "/"
 * simplifyPath("/home//foo/") => "/home/foo"
 * simplifyPath("/a/./b/../../c/") => "/c"
 */

/**
 * Time Complexity: O(n) where n is the length of the path
 * Space Complexity: O(n) for storing the components and stack
 */