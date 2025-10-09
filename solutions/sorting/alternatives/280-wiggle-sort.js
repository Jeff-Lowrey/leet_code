/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 280: Wiggle Sort
 *
 * @param {number[]} nums - Array to rearrange (modified in-place)
 * @return {void} - Modifies the array in-place
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(nums) {
    for (let i = 1; i < nums.length; i++) {
        // For odd indices, nums[i] should be >= nums[i-1]
        // For even indices, nums[i] should be <= nums[i-1]
        const shouldBeGreater = i % 2 === 1;

        if (shouldBeGreater) {
            // Odd index: nums[i] should be >= nums[i-1]
            if (nums[i] < nums[i - 1]) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        } else {
            // Even index: nums[i] should be <= nums[i-1]
            if (nums[i] > nums[i - 1]) {
                [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
            }
        }
    }
}

/**
 * Test cases for Problem 280: Wiggle Sort
 */
function testSolution() {
    console.log('Testing 280. Wiggle Sort');

    // Helper to verify wiggle property
    function isWiggleSorted(nums) {
        for (let i = 1; i < nums.length; i++) {
            if (i % 2 === 1) {
                // Odd index: should be >= previous
                if (nums[i] < nums[i - 1]) return false;
            } else {
                // Even index: should be <= previous
                if (nums[i] > nums[i - 1]) return false;
            }
        }
        return true;
    }

    // Test case 1: Example from problem
    const nums1 = [3, 5, 2, 1, 6, 4];
    solve(nums1);
    console.log('Test 1:', JSON.stringify(nums1));
    console.assert(isWiggleSorted(nums1), 'Test 1 failed: not wiggle sorted');

    // Test case 2: Another example
    const nums2 = [1, 2, 3, 4, 5];
    solve(nums2);
    console.log('Test 2:', JSON.stringify(nums2));
    console.assert(isWiggleSorted(nums2), 'Test 2 failed: not wiggle sorted');

    // Test case 3: Already wiggle sorted
    const nums3 = [1, 3, 2, 4, 3];
    solve(nums3);
    console.log('Test 3:', JSON.stringify(nums3));
    console.assert(isWiggleSorted(nums3), 'Test 3 failed: not wiggle sorted');

    // Test case 4: Two elements
    const nums4 = [2, 1];
    solve(nums4);
    console.assert(isWiggleSorted(nums4), 'Test 4 failed: not wiggle sorted');

    // Test case 5: Duplicates
    const nums5 = [1, 1, 1, 1, 1];
    solve(nums5);
    console.assert(isWiggleSorted(nums5), 'Test 5 failed: not wiggle sorted');

    console.log('All test cases passed for 280. Wiggle Sort!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 280. Wiggle Sort ===');
    console.log('Category: Sorting');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
