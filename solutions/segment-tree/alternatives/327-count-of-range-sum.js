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
 * Main solution for Problem 327: Count Of Range Sum
 *
 * @param {number[]} nums - Input array
 * @param {number} lower - Lower bound
 * @param {number} upper - Upper bound
 * @return {number} - Count of valid range sums
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums, lower, upper) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    const n = nums.length;
    // Compute prefix sums
    const sums = new Array(n + 1);
    sums[0] = 0;
    for (let i = 0; i < n; i++) {
        sums[i + 1] = sums[i] + nums[i];
    }

    return mergeSortCount(sums, 0, n, lower, upper);
}

/**
 * Merge sort with range counting
 */
function mergeSortCount(sums, start, end, lower, upper) {
    if (end - start <= 1) {
        return 0;
    }

    const mid = Math.floor((start + end) / 2);
    let count = 0;

    // Count from left and right halves
    count += mergeSortCount(sums, start, mid, lower, upper);
    count += mergeSortCount(sums, mid, end, lower, upper);

    // Count cross-boundary ranges
    let j = mid, k = mid, t = mid;
    const cache = [];

    for (let i = start; i < mid; i++) {
        // Find range of valid sums[j] where lower <= sums[j] - sums[i] <= upper
        while (k < end && sums[k] - sums[i] < lower) k++;
        while (j < end && sums[j] - sums[i] <= upper) j++;
        count += j - k;
    }

    // Merge the two sorted halves
    let left = start, right = mid;
    while (left < mid || right < end) {
        if (right >= end || (left < mid && sums[left] <= sums[right])) {
            cache.push(sums[left++]);
        } else {
            cache.push(sums[right++]);
        }
    }

    for (let i = 0; i < cache.length; i++) {
        sums[start + i] = cache[i];
    }

    return count;
}

/**
 * Alternative solution using Binary Indexed Tree (more complex but educational)
 */
function solveWithBIT(nums, lower, upper) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    const n = nums.length;
    const sums = new Array(n + 1);
    sums[0] = 0;
    for (let i = 0; i < n; i++) {
        sums[i + 1] = sums[i] + nums[i];
    }

    // Coordinate compression
    const allValues = new Set();
    for (const sum of sums) {
        allValues.add(sum);
        allValues.add(sum - lower);
        allValues.add(sum - upper);
    }

    const sorted = Array.from(allValues).sort((a, b) => a - b);
    const rank = new Map();
    sorted.forEach((val, idx) => rank.set(val, idx + 1));

    const bit = new Array(sorted.length + 1).fill(0);

    function update(idx) {
        while (idx < bit.length) {
            bit[idx]++;
            idx += idx & -idx;
        }
    }

    function query(idx) {
        let sum = 0;
        while (idx > 0) {
            sum += bit[idx];
            idx -= idx & -idx;
        }
        return sum;
    }

    let count = 0;
    for (let i = 0; i <= n; i++) {
        // Count sums[j] where j < i and lower <= sums[i] - sums[j] <= upper
        // This means sums[i] - upper <= sums[j] <= sums[i] - lower
        const left = rank.get(sums[i] - upper);
        const right = rank.get(sums[i] - lower);
        count += query(right) - query(left - 1);

        update(rank.get(sums[i]));
    }

    return count;
}

/**
 * Test cases for Problem 327: Count Of Range Sum
 */
function testSolution() {
    console.log('Testing 327. Count Of Range Sum');

    // Test case 1: Basic example
    const result1 = solve([-2, 5, -1], -2, 2);
    const expected1 = 3;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`✓ Test 1 passed: nums=[-2,5,-1], range=[-2,2] -> ${result1} ranges`);

    // Test case 2: Single element in range
    const result2 = solve([0], 0, 0);
    const expected2 = 1;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`✓ Test 2 passed: nums=[0], range=[0,0] -> ${result2} ranges`);

    // Test case 3: No valid ranges
    const result3 = solve([1, 2, 3], 10, 20);
    const expected3 = 0;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`✓ Test 3 passed: nums=[1,2,3], range=[10,20] -> ${result3} ranges`);

    // Test case 4: All subarrays valid
    const result4 = solve([1, 1, 1], -10, 10);
    const expected4 = 6; // All 6 subarrays
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`✓ Test 4 passed: nums=[1,1,1], range=[-10,10] -> ${result4} ranges`);

    // Test case 5: Larger example
    const result5 = solve([0, -3, -3, 1, 1, 2], 3, 5);
    const expected5 = 2;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`✓ Test 5 passed: nums=[0,-3,-3,1,1,2], range=[3,5] -> ${result5} ranges`);

    // Test BIT solution
    console.log('\nTesting BIT solution:');
    const result6 = solveWithBIT([-2, 5, -1], -2, 2);
    console.assert(result6 === 3, 'BIT solution test failed');
    console.log(`✓ BIT solution test passed: ${result6} ranges`);

    console.log('All test cases passed for 327. Count Of Range Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 327. Count Of Range Sum ===');
    console.log('Category: Segment Tree');
    console.log('Difficulty: Hard');
    console.log('');

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    solveWithBIT,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Merge sort solution is cleaner and more efficient in practice
 * - BIT solution demonstrates coordinate compression techniques
 * - Both achieve O(n log n) time complexity
 * - The key insight is converting range sum to prefix sum difference
 * - Similar techniques apply to many range query problems
 */
