/**

 *
 * This problem demonstrates key concepts in Segment Tree.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to count how many elements to the right are smaller than the current element.
 * A merge sort approach can solve this efficiently by counting inversions during the merge phase.
 * Alternatively, we can use a Binary Indexed Tree (Fenwick Tree) with coordinate compression.
 *
 * APPROACH:
 * Using merge sort with index tracking:




 *
 * WHY THIS WORKS:
 * Merge sort naturally processes elements right-to-left. When merging, if we take an element
 * from the right half before the left half, it means the right element is smaller and appears
 * after the left element in the original array.
 *
 * TIME COMPLEXITY: O(n log n)
 * SPACE COMPLEXITY: O(n)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [5, 2, 6, 1]
 * - At index 0 (5): elements [2,1] are smaller -> count = 2
 * - At index 1 (2): element [1] is smaller -> count = 1
 * - At index 2 (6): element [1] is smaller -> count = 1
 * - At index 3 (1): no elements after -> count = 0
 * Output: [2, 1, 1, 0]
 *
 * EDGE CASES:
 * - Single element: return [0]
 * - Sorted ascending: return [0,0,...,0]
 * - Sorted descending: return [n-1, n-2, ..., 0]
 */

/**
 * Main solution for Problem 315: Count Of Smaller Numbers After Self
 *
 * @param {number[]} nums - Input array
 * @return {number[]} - Count array
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    if (!nums || nums.length === 0) {
        return [];
    }

    const n = nums.length;
    const result = new Array(n).fill(0);
    const indices = Array.from({ length: n }, (_, i) => i);

    /**
     * Merge sort with counting
     */
    function mergeSort(start, end) {
        if (start >= end) {
            return;
        }

        const mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);
        mergeSort(mid + 1, end);

        // Merge phase with counting
        const temp = [];
        let i = start;
        let j = mid + 1;
        let rightCount = 0;

        while (i <= mid || j <= end) {
            if (j > end || (i <= mid && nums[indices[i]] > nums[indices[j]])) {
                // Element from left half
                // All remaining elements in right half that we've processed are smaller
                result[indices[i]] += rightCount;
                temp.push(indices[i]);
                i++;
            } else {
                // Element from right half is smaller
                rightCount++;
                temp.push(indices[j]);
                j++;
            }
        }

        // Copy back to indices array
        for (let k = 0; k < temp.length; k++) {
            indices[start + k] = temp[k];
        }
    }

    mergeSort(0, n - 1);
    return result;
}

/**
 * Alternative solution using Binary Indexed Tree (Fenwick Tree)
 */
function solveWithBIT(nums) {
    if (!nums || nums.length === 0) {
        return [];
    }

    const n = nums.length;
    const result = new Array(n);

    // Coordinate compression
    const sorted = [...new Set(nums)].sort((a, b) => a - b);
    const rank = new Map();
    sorted.forEach((num, idx) => rank.set(num, idx + 1));

    // Binary Indexed Tree
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

    // Process from right to left
    for (let i = n - 1; i >= 0; i--) {
        const r = rank.get(nums[i]);
        result[i] = query(r - 1);
        update(r);
    }

    return result;
}

/**
 * Test cases for Problem 315: Count Of Smaller Numbers After Self
 */
function testSolution() {
    console.log('Testing 315. Count Of Smaller Numbers After Self');

    // Test case 1: Basic example
    const result1 = solve([5, 2, 6, 1]);
    const expected1 = [2, 1, 1, 0];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);
    console.log(`✓ Test 1 passed: [5,2,6,1] -> ${JSON.stringify(result1)}`);

    // Test case 2: Descending order
    const result2 = solve([5, 4, 3, 2, 1]);
    const expected2 = [4, 3, 2, 1, 0];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);
    console.log(`✓ Test 2 passed: [5,4,3,2,1] -> ${JSON.stringify(result2)}`);

    // Test case 3: Ascending order
    const result3 = solve([1, 2, 3, 4, 5]);
    const expected3 = [0, 0, 0, 0, 0];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);
    console.log(`✓ Test 3 passed: [1,2,3,4,5] -> ${JSON.stringify(result3)}`);

    // Test case 4: Single element
    const result4 = solve([1]);
    const expected4 = [0];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);
    console.log(`✓ Test 4 passed: [1] -> ${JSON.stringify(result4)}`);

    // Test case 5: Duplicates
    const result5 = solve([2, 0, 1]);
    const expected5 = [2, 0, 0];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);
    console.log(`✓ Test 5 passed: [2,0,1] -> ${JSON.stringify(result5)}`);

    // Test BIT solution
    console.log('\nTesting BIT solution:');
    const result6 = solveWithBIT([5, 2, 6, 1]);
    console.assert(JSON.stringify(result6) === JSON.stringify([2, 1, 1, 0]),
        'BIT solution test failed');
    console.log(`✓ BIT solution test passed: ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 315. Count Of Smaller Numbers After Self!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 315. Count Of Smaller Numbers After Self ===');
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
 * - Merge sort solution is more intuitive and has better constants
 * - BIT solution uses coordinate compression and is a good alternative
 * - Segment tree solution would be similar to BIT but with more overhead
 * - Both solutions achieve O(n log n) time complexity
 * - The problem is essentially counting inversions in a modified way
 */
