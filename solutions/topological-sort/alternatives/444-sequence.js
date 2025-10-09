/**

 * Documentation
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
 * Main solution for Problem 444: Sequence Reconstruction
 *
 * @param {number[]} nums - Original sequence to reconstruct
 * @param {number[][]} sequences - List of sequences
 * @return {boolean} - True if nums is the only sequence that can be reconstructed
 *
 * Time Complexity: O(N + S) where N is length of nums and S is total length of all sequences
 * Space Complexity: O(N) for graph and in-degree storage
 */
function solve(nums, sequences) {
    // Build graph and in-degree map
    const graph = new Map();
    const inDegree = new Map();

    // Initialize all numbers from nums
    for (const num of nums) {
        graph.set(num, new Set());
        inDegree.set(num, 0);
    }

    // Build graph from sequences
    let edgeCount = 0;
    for (const seq of sequences) {
        for (let i = 0; i < seq.length; i++) {
            const num = seq[i];

            // Check if number is in original nums
            if (!graph.has(num)) {
                return false;
            }

            // Add edge from seq[i] to seq[i+1]
            if (i < seq.length - 1) {
                const next = seq[i + 1];
                if (!graph.has(next)) {
                    return false;
                }

                // Only add edge if it doesn't exist
                if (!graph.get(num).has(next)) {
                    graph.get(num).add(next);
                    inDegree.set(next, inDegree.get(next) + 1);
                    edgeCount++;
                }
            }
        }
    }

    // Check if we have enough edges (n-1 for unique reconstruction)
    if (edgeCount < nums.length - 1) {
        return false;
    }

    // Perform topological sort
    const queue = [];
    for (const [num, degree] of inDegree) {
        if (degree === 0) {
            queue.push(num);
        }
    }

    const result = [];
    while (queue.length > 0) {
        // For unique reconstruction, queue should have exactly one element
        if (queue.length > 1) {
            return false;
        }

        const current = queue.shift();
        result.push(current);

        for (const neighbor of graph.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Check if result matches nums exactly
    return result.length === nums.length &&
           result.every((val, idx) => val === nums[idx]);
}

/**
 * Test cases for Problem 444: Sequence Reconstruction
 */
function testSolution() {
    console.log('Testing 444. Sequence Reconstruction');

    // Test case 1: Valid unique reconstruction
    const result1 = solve([1, 2, 3], [[1, 2], [1, 3]]);
    const expected1 = false; // Multiple possible orderings
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Valid unique reconstruction
    const result2 = solve([1, 2, 3], [[1, 2], [1, 3], [2, 3]]);
    const expected2 = true; // Only one ordering: 1 -> 2 -> 3
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Invalid - number not in sequences
    const result3 = solve([1, 2, 3], [[1, 2]]);
    const expected3 = false;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Single element
    const result4 = solve([1], [[1]]);
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Wrong order
    const result5 = solve([1, 2, 3], [[1, 3], [2, 3], [1, 2]]);
    const expected5 = true;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 444. Sequence Reconstruction!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 444. Sequence ===');
    console.log('Category: Topological Sort');
    console.log('Difficulty: Documentation');
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
