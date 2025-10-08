/**
 * 045. Jump Game Ii
 * Medium
 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use BFS-like greedy approach where we track the farthest position reachable
 * in the current "level" of jumps. Each jump creates a new level, similar to
 * BFS traversal where each level represents one more jump.
 *
 * APPROACH:
 * 1. **Track current jump range**: Keep track of the end of current jump level
 * 2. **Update farthest reach**: At each position, update the farthest we can reach
 * 3. **Increment jumps**: When we reach the end of current level, increment jump count
 * 4. **Early termination**: Stop when we can reach the last index
 *
 * WHY THIS WORKS:
 * - We greedily explore the maximum reach at each level
 * - Each position can contribute to extending our reach for the next jump
 * - By tracking levels (jump boundaries), we ensure minimum jumps
 * - The greedy choice: always explore all positions reachable in current jump before moving to next
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * nums = [2,3,1,1,4]
 * Initial: jumps=0, currentEnd=0, farthest=0
 * i=0: farthest=max(0,0+2)=2, reach currentEnd(0), jumps=1, currentEnd=2
 * i=1: farthest=max(2,1+3)=4
 * i=2: farthest=max(4,2+1)=4, reach currentEnd(2), jumps=2, currentEnd=4
 * Result: 2 jumps (0→1→4 or 0→2→4)
 * ```
 *
 * EDGE CASES:
 * - Single element: 0 jumps needed (already at destination)
 * - All elements are 1: n-1 jumps needed
 * - Large first jump: Can reach end in 1 jump
 */

/**
 * Main solution for Problem 045: Jump Game Ii
 *
 * @param {number[]} nums - Array of jump lengths
 * @return {number} - Minimum number of jumps to reach last index
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    if (nums.length <= 1) return 0;

    let jumps = 0;
    let currentEnd = 0;  // End of current jump level
    let farthest = 0;    // Farthest position we can reach

    // We don't need to jump from the last index
    for (let i = 0; i < nums.length - 1; i++) {
        // Update the farthest position we can reach
        farthest = Math.max(farthest, i + nums[i]);

        // If we've reached the end of current jump level
        if (i === currentEnd) {
            jumps++;
            currentEnd = farthest;

            // Early termination: if we can already reach the end
            if (currentEnd >= nums.length - 1) {
                break;
            }
        }
    }

    return jumps;
}

/**
 * Test cases for Problem 045: Jump Game Ii
 */
function testSolution() {
    console.log('Testing 045. Jump Game Ii');

    // Test case 1: Basic example
    const result1 = solve([2, 3, 1, 1, 4]);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single element
    const result2 = solve([0]);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All ones
    const result3 = solve([1, 1, 1, 1]);
    const expected3 = 3;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: One big jump
    const result4 = solve([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Two elements
    const result5 = solve([2, 1]);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 045. Jump Game Ii!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 045. Jump Game Ii ===');
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
