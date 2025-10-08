/**
 * 763. Partition Labels
 * Medium
 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Find the last occurrence of each character. For each partition, extend it to
 * include all occurrences of characters seen so far. Greedy choice: partition
 * as early as possible when all characters in current partition are complete.
 *
 * APPROACH:
 * 1. **Find last positions**: Record the last index of each character
 * 2. **Track partition end**: Keep the farthest last position of chars seen
 * 3. **Detect partition boundary**: When current index reaches partition end
 * 4. **Record partition size**: Add size to result and start new partition
 *
 * WHY THIS WORKS:
 * - Each character must be contained in exactly one partition
 * - Greedy choice: make partition as small as possible while keeping chars together
 * - When we reach the last occurrence of all characters seen, we can partition
 * - This minimizes partition count while satisfying the constraint
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1) - at most 26 characters in the map
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * s = "ababcbacadefegdehijhklij"
 * Last positions: a:8, b:5, c:7, d:14, e:15, f:11, g:13, h:19, i:22, j:23, k:20, l:21
 *
 * i=0, char='a': end=8
 * i=1, char='b': end=max(8,5)=8
 * i=2, char='a': end=max(8,8)=8
 * i=3, char='b': end=max(8,5)=8
 * i=4, char='c': end=max(8,7)=8
 * i=5, char='b': end=max(8,5)=8
 * i=6, char='a': end=max(8,8)=8
 * i=7, char='c': end=max(8,7)=8
 * i=8, char='a': i==end → partition size=9, start=9
 * ...continues with more partitions
 * Result: [9, 7, 8]
 * ```
 *
 * EDGE CASES:
 * - All same character: One partition with length n
 * - All unique characters: n partitions of size 1 each
 * - Single character: One partition of size 1
 */

/**
 * Main solution for Problem 763: Partition Labels
 *
 * @param {string} s - Input string
 * @return {number[]} - Array of partition sizes
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    // Record last position of each character
    const lastPos = new Map();
    for (let i = 0; i < s.length; i++) {
        lastPos.set(s[i], i);
    }

    const result = [];
    let start = 0;
    let end = 0;

    for (let i = 0; i < s.length; i++) {
        // Extend partition end to include last occurrence of current char
        end = Math.max(end, lastPos.get(s[i]));

        // When we reach the end of current partition
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }

    return result;
}

/**
 * Test cases for Problem 763: Partition Labels
 */
function testSolution() {
    console.log('Testing 763. Partition Labels');

    // Test case 1: Example from problem
    const result1 = solve("ababcbacadefegdehijhklij");
    const expected1 = [9, 7, 8];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Another example
    const result2 = solve("eccbbbbdec");
    const expected2 = [10];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: All unique
    const result3 = solve("abc");
    const expected3 = [1, 1, 1];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: All same
    const result4 = solve("aaaa");
    const expected4 = [4];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Two partitions
    const result5 = solve("abcabc");
    const expected5 = [6];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 763. Partition Labels!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 763. Partition Labels ===');
    console.log('Category: Greedy');
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
 * - This solution focuses on greedy concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
