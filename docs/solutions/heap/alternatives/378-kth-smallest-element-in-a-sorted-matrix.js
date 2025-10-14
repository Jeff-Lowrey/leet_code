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
 * - **Target not in array:** Return -1 or appropriate value
 * - **Single element:** Handle when left equals right
 * - **Empty input:** Return default value
 * - **Boundary conditions:** Check first and last positions
 * - **Integer overflow:** Use mid = left + (right - left) / 2
 *
 * </details>
 */

/**
 * MinHeap implementation for [value, row, col] tuples
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
 * Main solution for Problem 378: Kth Smallest Element In A Sorted Matrix
 *
 * @param {number[][]} matrix - Sorted matrix
 * @param {number} k - Find kth smallest element
 * @return {number} - The kth smallest element
 *
 * Time Complexity: O(k log n) where n is number of rows
 * Space Complexity: O(n)
 */
function solve(matrix, k) {
    if (!matrix || !matrix.length || !matrix[0].length) {
        return null;
    }

    const n = matrix.length;
    const minHeap = new MinHeap();

    // Initialize heap with first element of each row
    for (let row = 0; row < Math.min(n, k); row++) {
        minHeap.push([matrix[row][0], row, 0]);
    }

    // Extract minimum k times
    let result = 0;
    for (let i = 0; i < k; i++) {
        const [val, row, col] = minHeap.pop();
        result = val;

        // Add next element in the same row
        if (col + 1 < matrix[row].length) {
            minHeap.push([matrix[row][col + 1], row, col + 1]);
        }
    }

    return result;
}

/**
 * Test cases for Problem 378: Kth Smallest Element In A Sorted Matrix
 */
function testSolution() {
    console.log('Testing 378. Kth Smallest Element In A Sorted Matrix');

    // Test case 1: Basic functionality
    const result1 = solve([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8);
    const expected1 = 13;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: k = 1 (smallest element)
    const result2 = solve([[1, 2], [1, 3]], 1);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Single element matrix
    const result3 = solve([[5]], 1);
    const expected3 = 5;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: All elements in first column
    const result4 = solve([[-5]], 1);
    const expected4 = -5;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Larger matrix
    const result5 = solve([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 1);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 378. Kth Smallest Element In A Sorted Matrix!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 378. Kth Smallest Element In A Sorted Matrix ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]];
    const k = 8;
    console.log('Input matrix:', JSON.stringify(matrix));
    console.log(`k = ${k}`);
    const result = solve(matrix, k);
    console.log(`Output: ${result}`);

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
 * - This solution uses a min heap to merge sorted rows efficiently
 * - Alternative approach: Binary search on the value range
 * - The heap approach is more intuitive and efficient for small k
 * - For very large k, binary search might be more efficient
 */
