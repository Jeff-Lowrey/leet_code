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
 *
 * **Step 1:** [description]
 *
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
 * Main solution for Problem 347: Top K Frequent Elements
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of top frequent elements to return
 * @return {number[]} - Array of k most frequent elements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, k) {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0) {
        return [];
    }

    if (k >= nums.length) {
        return [...new Set(nums)];
    }

    // Step 1: Count frequency of each number using Map
    const freqMap = new Map();
    for (const num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Step 2: Create buckets indexed by frequency
    // Maximum frequency possible is nums.length
    const buckets = Array(nums.length + 1).fill(null).map(() => []);

    for (const [num, freq] of freqMap) {
        buckets[freq].push(num);
    }

    // Step 3: Collect k most frequent elements
    // Traverse from highest frequency to lowest
    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }

    // Return exactly k elements
    return result.slice(0, k);
}

/**
 * Test cases for Problem 347: Top K Frequent Elements
 */
function testSolution() {
    console.log('Testing 347. Top K Frequent Elements');

    // Test case 1: Basic functionality
    const result1 = solve([1,1,1,2,2,3], 2);
    const expected1 = [1, 2]; // Order may vary but should contain these elements
    console.assert(result1.length === 2 && result1.includes(1) && result1.includes(2),
        `Test 1 failed: expected [1,2], got [${result1}]`);

    // Test case 2: Single element
    const result2 = solve([1], 1);
    const expected2 = [1];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected [1], got [${result2}]`);

    // Test case 3: All elements have same frequency
    const result3 = solve([1, 2, 3], 2);
    console.assert(result3.length === 2,
        `Test 3 failed: expected length 2, got ${result3.length}`);

    // Test case 4: Edge case - empty array
    const result4 = solve([], 1);
    const expected4 = [];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected [], got [${result4}]`);

    // Test case 5: k larger than unique elements
    const result5 = solve([1,1,2,2,3], 5);
    console.assert(result5.length === 3 && result5.includes(1) && result5.includes(2) && result5.includes(3),
        `Test 5 failed: expected all unique elements, got [${result5}]`);

    console.log('All test cases passed for 347. Top K Frequent Elements!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 347. Top K Frequent Elements ===');
    console.log('Category: Arrays Hashing');
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
 * - This solution focuses on arrays hashing concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
