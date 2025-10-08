/**
 * 011. Container With Most Water
 * Medium
 *
 * This problem demonstrates key concepts in Two Pointers.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * The water contained between two lines is limited by the shorter line. We need to find
 * the maximum area by considering different pairs of lines. The key insight is that we
 * can use two pointers starting from both ends and move the pointer pointing to the
 * shorter line inward, as moving the taller line would only decrease the area.
 *
 * APPROACH:
 * 1. **Initialize two pointers**: Start with left at 0 and right at height.length - 1
 * 2. **Calculate area**: Area = min(height[left], height[right]) * (right - left)
 * 3. **Move pointers**: Move the pointer pointing to the shorter height inward
 * 4. **Track maximum**: Keep track of the maximum area encountered
 *
 * WHY THIS WORKS:
 * - The area is determined by the shorter line and the distance between lines
 * - Moving the pointer at the taller line won't increase the area (distance decreases, height limited by shorter line)
 * - Moving the pointer at the shorter line gives us a chance to find a taller line
 * - This greedy approach ensures we explore all potentially better solutions
 *
 * TIME COMPLEXITY: O(n)
 * - Single pass through the array with two pointers
 * SPACE COMPLEXITY: O(1)
 * - Only using a constant amount of extra space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Step 1: left=0(1), right=8(7), area = min(1,7) * 8 = 8, move left (shorter)
 * Step 2: left=1(8), right=8(7), area = min(8,7) * 7 = 49, move right (shorter)
 * Step 3: left=1(8), right=7(3), area = min(8,3) * 6 = 18, move right (shorter)
 * Step 4: left=1(8), right=6(8), area = min(8,8) * 5 = 40, can move either
 * ...continue until left >= right
 * Output: 49 (maximum area found)
 * ```
 *
 * EDGE CASES:
 * - Array with less than 2 elements: return 0
 * - All heights are the same: area decreases as distance decreases
 * - Heights in ascending/descending order: still works correctly
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
