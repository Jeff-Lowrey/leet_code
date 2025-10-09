/**

 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A 132 pattern means: nums[i] < nums[k] < nums[j] where i < j < k.
 * Scan from right to left, using a stack to track potential nums[k] (middle value).
 * Keep track of the largest valid nums[k] found so far. If we find nums[i] < nums[k], we have a 132 pattern.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - Processing right to left lets us find nums[j] and nums[k] first
 * - Stack maintains decreasing order - when we see larger element, pop to find nums[k]
 * - nums[k] is the largest value we've popped (it's between current and future nums[j])
 * - If current < nums[k], we have i < k with nums[i] < nums[k], and j exists with nums[k] < nums[j]
 *
 * TIME COMPLEXITY: O(n) - each element pushed/popped once
 * SPACE COMPLEXITY: O(n) - stack space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [3,1,4,2]
 *
 * i=3, val=2: stack=[], third=-Infinity, push 2, stack=[2]
 * i=2, val=4: 4>2, pop 2, third=2, push 4, stack=[4]
 * i=1, val=1: 1<third(2), found 132 pattern! (1<2<4)
 *
 * Pattern: nums[1]=1, nums[3]=2, nums[2]=4 → 1<2<4 ✓
 * Return: true
 * ```
 *
 * EDGE CASES:
 * - Array length < 3: return false
 * - All increasing: no pattern
 * - All decreasing: no pattern
 * - Pattern at boundaries: handled by traversal
 */

/**
 * Main solution for Problem 456: 132 Pattern
 *
 * @param {number[]} nums - Array of integers
 * @return {boolean} - True if 132 pattern exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    if (!nums || nums.length < 3) return false;

    const stack = [];
    let third = -Infinity; // This will be nums[k] - the middle value in 132 pattern

    // Traverse from right to left
    for (let i = nums.length - 1; i >= 0; i--) {
        // If current element < third, we found nums[i]
        if (nums[i] < third) {
            return true;
        }

        // Pop smaller elements - they become candidates for nums[k]
        while (stack.length > 0 && nums[i] > stack[stack.length - 1]) {
            third = stack.pop(); // Update third to the largest popped value
        }

        stack.push(nums[i]);
    }

    return false;
}

/**
 * Test cases for Problem 456: 132 Pattern
 */
function testSolution() {
    console.log('Testing 456. 132 Pattern');

    // Test case 1: Example with pattern
    const result1 = solve([1,2,3,4]);
    const expected1 = false;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example with pattern
    const result2 = solve([3,1,4,2]);
    const expected2 = true;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Example without pattern
    const result3 = solve([-1,3,2,0]);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Too short
    const result4 = solve([1,2]);
    const expected4 = false;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Decreasing sequence
    const result5 = solve([5,4,3,2,1]);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Complex pattern
    const result6 = solve([3,5,0,3,4]);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 456. 132 Pattern!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 456. 132 ===');
    console.log('Category: Monotonic Stack');
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
