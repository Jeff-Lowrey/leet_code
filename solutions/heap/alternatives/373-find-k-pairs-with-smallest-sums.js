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
 * MinHeap implementation for [sum, i, j] tuples
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    push(item) {
        this.heap.push(item);
        this.bubbleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild][0] < this.heap[smallest][0]) {
                smallest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild][0] < this.heap[smallest][0]) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

/**
 * Main solution for Problem 373: Find K Pairs With Smallest Sums
 *
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @param {number} k - Number of pairs to find
 * @return {number[][]} - K pairs with smallest sums
 *
 * Time Complexity: O(k log k)
 * Space Complexity: O(k)
 */
function solve(nums1, nums2, k) {
    if (!nums1.length || !nums2.length || k === 0) {
        return [];
    }

    const result = [];
    const minHeap = new MinHeap();

    // Initialize heap with pairs using first element of nums2
    // Only add min(k, nums1.length) pairs to optimize
    for (let i = 0; i < Math.min(k, nums1.length); i++) {
        minHeap.push([nums1[i] + nums2[0], i, 0]);
    }

    // Extract k smallest pairs
    while (result.length < k && minHeap.size() > 0) {
        const [sum, i, j] = minHeap.pop();
        result.push([nums1[i], nums2[j]]);

        // Add next pair with same i but j+1
        if (j + 1 < nums2.length) {
            minHeap.push([nums1[i] + nums2[j + 1], i, j + 1]);
        }
    }

    return result;
}

/**
 * Test cases for Problem 373: Find K Pairs With Smallest Sums
 */
function testSolution() {
    console.log('Testing 373. Find K Pairs With Smallest Sums');

    // Test case 1: Basic functionality
    const result1 = solve([1, 7, 11], [2, 4, 6], 3);
    const expected1 = [[1, 2], [1, 4], [1, 6]];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Different k
    const result2 = solve([1, 1, 2], [1, 2, 3], 2);
    const expected2 = [[1, 1], [1, 1]];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: k larger than possible pairs
    const result3 = solve([1, 2], [3], 5);
    const expected3 = [[1, 3], [2, 3]];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Empty array
    const result4 = solve([], [1, 2], 3);
    const expected4 = [];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Single elements
    const result5 = solve([1], [1], 1);
    const expected5 = [[1, 1]];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 373. Find K Pairs With Smallest Sums!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 373. Find K Pairs With Smallest Sums ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const nums1 = [1, 7, 11];
    const nums2 = [2, 4, 6];
    const k = 3;
    console.log(`Input: nums1 = [${nums1}], nums2 = [${nums2}], k = ${k}`);
    const result = solve(nums1, nums2, k);
    console.log(`Output: ${JSON.stringify(result)}`);

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
 * - This solution uses a min heap to efficiently find k smallest pairs
 * - We optimize by only adding necessary candidates to the heap
 * - The key insight is that arrays are sorted, so we can explore systematically
 * - Alternative approaches include merge k sorted lists pattern
 */
