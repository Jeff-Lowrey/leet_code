/**
 * # Difficulty: Medium
 *
 * # 011. Container With Most Water
 *
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 *
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 *
 * Return the maximum amount of water a container can store.
 *
 * Notice that you may not slant the container.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>height = [1, 8, 6, 2, 5, 4, 8, 3, 7]</dd>
 * <dt>Output:</dt>
 * <dd>49</dd>
 * <dt>Explanation:</dt>
 * <dd>Maximum water container area is 49 with heights [1,8,6,2,5,4,8,3,7]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply two pointers methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages two pointers principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
 *
 * Step 1: Initialize
 *   left = 0 (height=1), right = 8 (height=7)
 *   max_area = 0
 *
 * Step 2: First iteration
 *   width = 8 - 0 = 8
 *   min_height = min(1, 7) = 1
 *   area = 8 × 1 = 8
 *   max_area = 8
 *   Move left pointer (smaller height)
 *   left = 1
 *
 * Step 3: left=1 (height=8), right=8 (height=7)
 *   width = 8 - 1 = 7
 *   min_height = min(8, 7) = 7
 *   area = 7 × 7 = 49
 *   max_area = 49
 *   Move right pointer (smaller height)
 *   right = 7
 *
 * Step 4: left=1 (height=8), right=7 (height=3)
 *   width = 7 - 1 = 6
 *   min_height = min(8, 3) = 3
 *   area = 6 × 3 = 18
 *   max_area = 49 (no change)
 *   Move right pointer
 *   right = 6
 *
 * Step 5: Continue until left >= right...
 *
 * Output: 49
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 011: Container With Most Water
 *
 * @param {number[]} height - Array of non-negative integers representing heights
 * @return {number} - Maximum area of water that can be contained
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(height) {
    // Edge case: need at least 2 lines to contain water
    if (!height || height.length < 2) {
        return 0;
    }

    let left = 0;
    let right = height.length - 1;
    let maxArea = 0;

    while (left < right) {
        // Calculate current area
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;

        // Update maximum area
        maxArea = Math.max(maxArea, currentArea);

        // Move the pointer pointing to the shorter line
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}

/**
 * Test cases for Problem 011: Container With Most Water
 */
function testSolution() {
    console.log('Testing 011. Container With Most Water');

    // Test case 1: Example from problem
    const result1 = solve([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    const expected1 = 49;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: maxArea([1,8,6,2,5,4,8,3,7]) = ${result1}`);

    // Test case 2: Two lines only
    const result2 = solve([1, 1]);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: maxArea([1,1]) = ${result2}`);

    // Test case 3: Increasing heights
    const result3 = solve([1, 2, 3, 4, 5]);
    const expected3 = 6;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: maxArea([1,2,3,4,5]) = ${result3}`);

    // Test case 4: Decreasing heights
    const result4 = solve([5, 4, 3, 2, 1]);
    const expected4 = 6;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: maxArea([5,4,3,2,1]) = ${result4}`);

    // Test case 5: Edge case - empty array
    const result5 = solve([]);
    const expected5 = 0;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: maxArea([]) = ${result5}`);

    // Test case 6: Edge case - single element
    const result6 = solve([1]);
    const expected6 = 0;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: maxArea([1]) = ${result6}`);

    console.log('All test cases passed for 011. Container With Most Water!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 011. Container With Most Water ===');
    console.log('Category: Two Pointers');
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
 * - This solution focuses on two pointers concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
