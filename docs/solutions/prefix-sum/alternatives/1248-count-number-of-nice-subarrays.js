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
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
 */

/**
 * Main solution for Problem 1248: Count Number Of Nice Subarrays
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Target count of odd numbers
 * @return {number} - Number of nice subarrays
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, k) {
    const prefixCount = new Map();
    prefixCount.set(0, 1); // Base case: 0 odd numbers seen

    let oddCount = 0;
    let result = 0;

    for (const num of nums) {
        // Increment odd count if current number is odd
        if (num % 2 === 1) {
            oddCount++;
        }

        // Check if we've seen a prefix with (oddCount - k) odd numbers
        const target = oddCount - k;
        if (prefixCount.has(target)) {
            result += prefixCount.get(target);
        }

        // Update the frequency of current odd count
        prefixCount.set(oddCount, (prefixCount.get(oddCount) || 0) + 1);
    }

    return result;
}

/**
 * Test cases for Problem 1248: Count Number Of Nice Subarrays
 */
function testSolution() {
    console.log('Testing 1248. Count Number Of Nice Subarrays');

    // Test case 1: Example 1
    const result1 = solve([1,1,2,1,1], 3);
    const expected1 = 2;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Example 2
    const result2 = solve([2,4,6], 1);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Example 3
    const result3 = solve([2,2,2,1,2,2,1,2,2,2], 2);
    const expected3 = 16;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: k = 0 (all even subarrays)
    const result4 = solve([2,4,6,8], 0);
    const expected4 = 10; // All subarrays with no odd numbers
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Single odd element
    const result5 = solve([1], 1);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 1248. Count Number Of Nice Subarrays!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1248. Count Number Of Nice Subarrays ===');
    console.log('Category: Prefix Sum');
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
 * - This solution focuses on prefix sum concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
