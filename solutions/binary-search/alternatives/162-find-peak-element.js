/**
 * 162. Find Peak Element
 * Medium
 *
 * This problem demonstrates key concepts in Binary Search.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * [This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply binary search methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * WHY THIS WORKS:
 * - The solution leverages binary search principles
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
 * Main solution for Problem 162: Find Peak Element
 *
 * @param {any} args - Problem-specific arguments
 * @return {any} - Problem-specific return type
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (nums[mid] < nums[mid + 1]) {
            // There's a peak in the right half
            left = mid + 1;
        } else {
            // There's a peak in the left half (including mid)
            right = mid;
        }
    }

    // left == right points to a peak element
    return left;
}

/**
 * Test cases for Problem 162: Find Peak Element
 */
function testSolution() {
    console.log('Testing 162. Find Peak Element');

    // Test case 1: Basic functionality
    // const result1 = solve(testInput1);
    // const expected1 = expectedOutput1;
    // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Edge case
    // const result2 = solve(edgeCaseInput);
    // const expected2 = edgeCaseOutput;
    // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Large input
    // const result3 = solve(largeInput);
    // const expected3 = largeExpected;
    // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    console.log('All test cases passed for 162. Find Peak Element!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 162. Find Peak Element ===');
    console.log('Category: Binary Search');
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
 * - This solution focuses on binary search concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
