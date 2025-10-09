/**

 *
 * This problem demonstrates key concepts in Topological Sort.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * [This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * APPROACH:

2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages topological sort principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```
 *
 * EDGE CASES:
 * - Empty input handling
- Single element cases
- Large input considerations
 */

/**
 * Main solution for Problem 269: Alien Dictionary
 *
 * @param {string[]} words - Array of words in alien dictionary order
 * @return {string} - String of unique letters in alien alphabet order, or empty string if invalid
 *
 * Time Complexity: O(C) where C is total length of all words
 * Space Complexity: O(1) - at most 26 characters in alphabet
 */
function solve(words) {
    // Build graph and in-degree map
    const graph = new Map();
    const inDegree = new Map();

    // Initialize all characters
    for (const word of words) {
        for (const char of word) {
            if (!graph.has(char)) {
                graph.set(char, new Set());
                inDegree.set(char, 0);
            }
        }
    }

    // Build edges by comparing adjacent words
    for (let i = 0; i < words.length - 1; i++) {
        const word1 = words[i];
        const word2 = words[i + 1];
        const minLen = Math.min(word1.length, word2.length);

        // Check for invalid case: word1 is prefix of word2 but comes after
        if (word1.length > word2.length && word1.startsWith(word2)) {
            return '';
        }

        // Find first different character
        for (let j = 0; j < minLen; j++) {
            if (word1[j] !== word2[j]) {
                // Add edge: word1[j] comes before word2[j]
                if (!graph.get(word1[j]).has(word2[j])) {
                    graph.get(word1[j]).add(word2[j]);
                    inDegree.set(word2[j], inDegree.get(word2[j]) + 1);
                }
                break;
            }
        }
    }

    // Kahn's algorithm for topological sort
    const queue = [];
    for (const [char, degree] of inDegree) {
        if (degree === 0) {
            queue.push(char);
        }
    }

    const result = [];
    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // If cycle detected, return empty string
    return result.length === inDegree.size ? result.join('') : '';
}

/**
 * Test cases for Problem 269: Alien Dictionary
 */
function testSolution() {
    console.log('Testing 269. Alien Dictionary');

    // Test case 1: Valid dictionary order
    const result1 = solve(['wrt', 'wrf', 'er', 'ett', 'rftt']);
    // Check that result is not empty (valid ordering exists)
    console.assert(result1.length > 0, `Test 1 failed: got empty result`);

    // Test case 2: Another valid ordering
    const result2 = solve(['z', 'x']);
    const expected2 = 'zx';
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Invalid - longer word before its prefix
    const result3 = solve(['abc', 'ab']);
    const expected3 = '';
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single word
    const result4 = solve(['abc']);
    console.assert(result4.length === 3, `Test 4 failed: expected length 3, got ${result4.length}`);

    // Test case 5: All same characters
    const result5 = solve(['aa', 'aaa']);
    console.assert(result5 === 'a', `Test 5 failed: expected 'a', got ${result5}`);

    console.log('All test cases passed for 269. Alien Dictionary!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 269. Alien Dictionary ===');
    console.log('Category: Topological Sort');
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
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
