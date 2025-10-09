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
 *
 * **Step 1:** [description]
 *
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
 * Main solution for Problem 49: Group Anagrams
 *
 * @param {string[]} strs - Array of strings to group
 * @return {string[][]} - Array of grouped anagrams
 *
 * Time Complexity: O(n * k log k) where n is number of strings, k is max string length
 * Space Complexity: O(n * k) for the hash map storage
 */
function solve(strs) {
    const anagramGroups = new Map();

    for (const str of strs) {
        // Sort the string to create a key
        const key = str.split('').sort().join('');

        // Add to the group
        if (!anagramGroups.has(key)) {
            anagramGroups.set(key, []);
        }
        anagramGroups.get(key).push(str);
    }

    // Return all groups as an array
    return Array.from(anagramGroups.values());
}

/**
 * Test cases for Problem 49: Group Anagrams
 */
function testSolution() {
    console.log('Testing 49. Group Anagrams');

    // Helper to sort arrays of arrays for comparison
    const sortGroups = (groups) => {
        return groups.map(g => g.sort()).sort((a, b) => a[0].localeCompare(b[0]));
    };

    // Test case 1: Basic grouping
    const result1 = solve(["eat","tea","tan","ate","nat","bat"]);
    const expected1 = [["bat"],["nat","tan"],["ate","eat","tea"]];
    console.assert(
        JSON.stringify(sortGroups(result1)) === JSON.stringify(sortGroups(expected1)),
        `Test 1 failed`
    );

    // Test case 2: Empty string
    const result2 = solve([""]);
    console.assert(result2.length === 1 && result2[0].length === 1 && result2[0][0] === "",
        `Test 2 failed`);

    // Test case 3: Single character
    const result3 = solve(["a"]);
    console.assert(result3.length === 1 && result3[0][0] === "a",
        `Test 3 failed`);

    console.log('All test cases passed for 49. Group Anagrams!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 49. Group Anagrams ===');
    console.log('Category: Strings');
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
 * - This solution focuses on strings concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
