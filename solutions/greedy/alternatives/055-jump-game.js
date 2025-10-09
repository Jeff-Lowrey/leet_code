/**

 *
 * This problem demonstrates key concepts in Greedy.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use greedy approach to track the farthest position we can reach. If at any point our current position exceeds the farthest reachable position, we can't proceed further.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - We only need to know if the last index is reachable, not the actual path
- Greedy choice: always try to reach the farthest possible position
- If we can reach position i, and from i we can jump nums[i] steps, then we can reach any position up to i + nums[i]
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * nums = [2,3,1,1,4]
 * i=0: maxReach = max(0, 0+2) = 2
 * i=1: maxReach = max(2, 1+3) = 4 (can reach end!)
 * i=2: maxReach = max(4, 2+1) = 4
 * Result: true (maxReach >= 4)
 * ```
 *
 * EDGE CASES:
 * - Single element array: Always true (already at last index)
 * - First element is 0 and array length > 1: False (can't move)
 * - All zeros except first: Depends on first element value
 * - Large jumps: Clamp maximum reach to array bounds
 */

/**
 * Main solution for Problem 055: Jump Game
 *
 * @param {number[]} nums - Array of jump lengths
 * @return {boolean} - True if can reach last index, false otherwise
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    let maxReach = 0;

    for (let i = 0; i < nums.length; i++) {
        // If current position is beyond our maximum reach, we can't proceed
        if (i > maxReach) {
            return false;
        }

        // Update maximum reachable position
        maxReach = Math.max(maxReach, i + nums[i]);

        // Early termination: if we can reach the last index
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }

    return true;
}

/**
 * Test cases for Problem 055: Jump Game
 */
function testSolution() {
    console.log('Testing 055. Jump Game');

    // Test case 1: Can reach end
    const result1 = solve([2, 3, 1, 1, 4]);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Cannot reach end
    const result2 = solve([3, 2, 1, 0, 4]);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element
    const result3 = solve([0]);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Large first jump
    const result4 = solve([5, 1, 1, 1, 1]);
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All zeros except first
    const result5 = solve([1, 0, 0, 0]);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 055. Jump Game!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 055. Jump Game ===');
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
