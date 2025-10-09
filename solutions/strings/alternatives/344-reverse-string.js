/**

 *
 * This problem demonstrates key concepts in Strings.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This problem requires understanding of strings concepts.
 *
 * APPROACH:
 * Apply strings methodology to solve efficiently.
 *
 * WHY THIS WORKS:
 * The solution leverages strings principles for optimal performance.
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [example input]\nStep 1: [explain first step]\nOutput: [expected output]
 *
 * EDGE CASES:
 * - Empty input handling\n- Single element cases\n- Large input considerations
 */

/**
 * Main solution for Problem 344: Reverse String
 *
 * @param {string[]} s - Array of characters to reverse in-place
 * @return {void} - Modifies array in-place, returns nothing
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    // Use two pointers to swap characters from both ends
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        // Swap characters at left and right pointers
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }

    // No return value - modifies array in-place
}

/**
 * Test cases for Problem 344: Reverse String
 */
function testSolution() {
    console.log('Testing 344. Reverse String');

    // Test case 1: Basic functionality
    const test1 = ["h","e","l","l","o"];
    solve(test1);
    console.assert(JSON.stringify(test1) === JSON.stringify(["o","l","l","e","h"]),
        `Test 1 failed: expected ["o","l","l","e","h"], got ${JSON.stringify(test1)}`);

    // Test case 2: Single character
    const test2 = ["a"];
    solve(test2);
    console.assert(JSON.stringify(test2) === JSON.stringify(["a"]),
        `Test 2 failed: expected ["a"], got ${JSON.stringify(test2)}`);

    // Test case 3: Two characters
    const test3 = ["H","a","n","n","a","h"];
    solve(test3);
    console.assert(JSON.stringify(test3) === JSON.stringify(["h","a","n","n","a","H"]),
        `Test 3 failed: expected ["h","a","n","n","a","H"], got ${JSON.stringify(test3)}`);

    console.log('All test cases passed for 344. Reverse String!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 344. Reverse String ===');
    console.log('Category: Strings');
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
