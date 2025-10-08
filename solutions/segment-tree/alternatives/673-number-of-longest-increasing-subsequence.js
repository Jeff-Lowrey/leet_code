/**
 * 673. Number Of Longest Increasing Subsequence
 * Medium
 *
 * This problem demonstrates key concepts in Segment Tree.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to find both the length of the longest increasing subsequence (LIS) and count
 * how many such subsequences exist. A dynamic programming approach tracks both length
 * and count at each position. While segment trees can optimize this, the DP solution
 * is more intuitive for this problem.
 *
 * APPROACH:
 * Dynamic Programming:
 * 1. For each position i, maintain: lengths[i] = max LIS length ending at i
 *                                    counts[i] = number of LIS with that length
 * 2. For each j < i where nums[j] < nums[i]:
 *    - If lengths[j] + 1 > lengths[i]: update length and reset count
 *    - If lengths[j] + 1 == lengths[i]: add counts[j] to counts[i]
 * 3. Find maximum length and sum counts of all positions with that length
 *
 * WHY THIS WORKS:
 * Each element either starts a new subsequence or extends existing ones. By tracking
 * both length and count, we can compute the total number of optimal subsequences.
 *
 * TIME COMPLEXITY: O(n^2)
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [1, 3, 5, 4, 7]
 * lengths: [1, 2, 3, 3, 4]
 * counts:  [1, 1, 1, 1, 2]
 * Max length = 4, count = 2 (sequences: [1,3,5,7] and [1,3,4,7])
 *
 * EDGE CASES:
 * - Single element: return 1
 * - All same: return n
 * - Strictly increasing: return 1
 */

/**
 * Main solution for Problem 673: Number Of Longest Increasing Subsequence
 *
 * @param {number[]} nums - Input array
 * @return {number} - Count of longest increasing subsequences
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    const n = nums.length;
    const lengths = new Array(n).fill(1); // LIS length ending at i
    const counts = new Array(n).fill(1);  // Count of LIS ending at i

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                if (lengths[j] + 1 > lengths[i]) {
                    // Found longer subsequence
                    lengths[i] = lengths[j] + 1;
                    counts[i] = counts[j];
                } else if (lengths[j] + 1 === lengths[i]) {
                    // Found another subsequence of same length
                    counts[i] += counts[j];
                }
            }
        }
    }

    // Find maximum length
    const maxLength = Math.max(...lengths);

    // Count subsequences with maximum length
    let result = 0;
    for (let i = 0; i < n; i++) {
        if (lengths[i] === maxLength) {
            result += counts[i];
        }
    }

    return result;
}

/**
 * Alternative solution using Segment Tree with coordinate compression
 * More complex but demonstrates segment tree application
 */
class SegmentTreeNode {
    constructor() {
        this.length = 0;
        this.count = 0;
    }
}

function solveWithSegmentTree(nums) {
    if (!nums || nums.length === 0) {
        return 0;
    }

    const n = nums.length;

    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const rank = new Map();
    sorted.forEach((num, idx) => rank.set(num, idx));

    const tree = new Array(4 * sorted.length);
    for (let i = 0; i < tree.length; i++) {
        tree[i] = new SegmentTreeNode();
    }

    function query(node, start, end, left, right) {
        if (right < start || left > end) {
            return new SegmentTreeNode();
        }

        if (left <= start && end <= right) {
            return tree[node];
        }

        const mid = Math.floor((start + end) / 2);
        const leftResult = query(2 * node, start, mid, left, right);
        const rightResult = query(2 * node + 1, mid + 1, end, left, right);

        const result = new SegmentTreeNode();
        if (leftResult.length > rightResult.length) {
            result.length = leftResult.length;
            result.count = leftResult.count;
        } else if (leftResult.length < rightResult.length) {
            result.length = rightResult.length;
            result.count = rightResult.count;
        } else {
            result.length = leftResult.length;
            result.count = leftResult.count + rightResult.count;
        }

        return result;
    }

    function update(node, start, end, idx, length, count) {
        if (start === end) {
            if (length > tree[node].length) {
                tree[node].length = length;
                tree[node].count = count;
            } else if (length === tree[node].length) {
                tree[node].count += count;
            }
            return;
        }

        const mid = Math.floor((start + end) / 2);
        if (idx <= mid) {
            update(2 * node, start, mid, idx, length, count);
        } else {
            update(2 * node + 1, mid + 1, end, idx, length, count);
        }

        const left = tree[2 * node];
        const right = tree[2 * node + 1];

        if (left.length > right.length) {
            tree[node].length = left.length;
            tree[node].count = left.count;
        } else if (left.length < right.length) {
            tree[node].length = right.length;
            tree[node].count = right.count;
        } else {
            tree[node].length = left.length;
            tree[node].count = left.count + right.count;
        }
    }

    for (const num of nums) {
        const r = rank.get(num);
        const result = r > 0 ? query(1, 0, sorted.length - 1, 0, r - 1) : new SegmentTreeNode();

        const newLength = result.length + 1;
        const newCount = Math.max(1, result.count);

        update(1, 0, sorted.length - 1, r, newLength, newCount);
    }

    return tree[1].count;
}

/**
 * Test cases for Problem 673: Number Of Longest Increasing Subsequence
 */
function testSolution() {
    console.log('Testing 673. Number Of Longest Increasing Subsequence');

    // Test case 1: Basic example
    const result1 = solve([1, 3, 5, 4, 7]);
    const expected1 = 2;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`✓ Test 1 passed: [1,3,5,4,7] -> ${result1} LIS`);

    // Test case 2: Another example
    const result2 = solve([2, 2, 2, 2, 2]);
    const expected2 = 5;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`✓ Test 2 passed: [2,2,2,2,2] -> ${result2} LIS`);

    // Test case 3: Single element
    const result3 = solve([1]);
    const expected3 = 1;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`✓ Test 3 passed: [1] -> ${result3} LIS`);

    // Test case 4: Strictly increasing
    const result4 = solve([1, 2, 3, 4, 5]);
    const expected4 = 1;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`✓ Test 4 passed: [1,2,3,4,5] -> ${result4} LIS`);

    // Test case 5: Complex case
    const result5 = solve([1, 2, 4, 3, 5, 4, 7, 2]);
    const expected5 = 3; // [1,2,4,5,7], [1,2,3,5,7], [1,2,3,4,7]
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`✓ Test 5 passed: [1,2,4,3,5,4,7,2] -> ${result5} LIS`);

    // Test segment tree solution
    console.log('\nTesting Segment Tree solution:');
    const result6 = solveWithSegmentTree([1, 3, 5, 4, 7]);
    console.assert(result6 === 2, 'Segment tree solution test failed');
    console.log(`✓ Segment Tree solution test passed: ${result6} LIS`);

    console.log('All test cases passed for 673. Number Of Longest Increasing Subsequence!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 673. Number Of Longest Increasing Subsequence ===');
    console.log('Category: Segment Tree');
    console.log('Difficulty: Medium');
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
    solveWithSegmentTree,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - DP solution is simpler and sufficient for this problem
 * - Segment tree solution demonstrates advanced techniques
 * - Both track length and count simultaneously
 * - The DP solution is O(n^2) but very practical
 * - Segment tree with coordinate compression can achieve O(n log n)
 */
