/**
 * 763. Partition Labels
 * Medium
 *
 * Partition Labels Problem: Given a string s, partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts. @param {string} s - The input string to be partitioned @return {number[]} - Array containing the sizes of partitions
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Partition Labels is to understand the core problem pattern
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
 * Partition Labels
 * 
 * Problem: Given a string s, partition the string into as many parts as possible 
 * so that each letter appears in at most one part. Return a list of integers 
 * representing the size of these parts.
 * 
 * @param {string} s - The input string to be partitioned
 * @return {number[]} - Array containing the sizes of partitions
 */

const partitionLabels = function(s) {
    if (!s || s.length === 0) return [];
    
    // Step 1: Create a map of last occurrences for each character
    const lastOccurrence = new Map();
    for (let i = 0; i < s.length; i++) {
        lastOccurrence.set(s[i], i);
    }
    
    // Step 2: Find partitions
    const result = [];
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        // Update the end position based on the last occurrence of current char
        end = Math.max(end, lastOccurrence.get(s[i]));
        
        // If we've reached the end of current partition
        if (i === end) {
            // Calculate partition size and add to result
            result.push(end - start + 1);
            // Update start position for next partition
            start = i + 1;
        }
    }
    
    return result;
};

// Example usage and test cases
function runTests() {
    const testCases = [
        {
            input: "ababcbacadefegdehijhklij",
            expected: [9,7,8],
            description: "Example 1: Multiple partitions"
        },
        {
            input: "eccbbbbdec",
            expected: [10],
            description: "Example 2: Single partition"
        },
        {
            input: "abc",
            expected: [1,1,1],
            description: "Example 3: All separate characters"
        },
        {
            input: "",
            expected: [],
            description: "Example 4: Empty string"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = partitionLabels(testCase.input);
        const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
        console.log(`Test ${index + 1}: ${testCase.description}`);
        console.log(`Input: "${testCase.input}"`);
        console.log(`Expected: [${testCase.expected}]`);
        console.log(`Got: [${result}]`);
        console.log(`Status: ${passed ? 'PASSED' : 'FAILED'}\n`);
    });
}

// Run the tests
runTests();

// Export the function for use in other modules
module.exports = partitionLabels;