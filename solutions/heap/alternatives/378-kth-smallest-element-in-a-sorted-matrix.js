/**

 *
 * This problem demonstrates key concepts in Heap.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * The matrix is sorted both row-wise and column-wise. We can treat each row as a sorted list
 * and use a min heap to merge them efficiently, similar to merging k sorted lists.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Each row is sorted, so the next smallest in a row is always to the right
 * - Heap ensures we always process elements in ascending order
 * - By starting with first column, we guarantee we don't miss smaller elements
 *
 * TIME COMPLEXITY: O(k log n) where n is number of rows
 * SPACE COMPLEXITY: O(n) for the heap
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
 * Step 1: Heap = [1, 10, 12]
 * Step 2: Pop 1, add 5 -> Heap = [5, 10, 12]
 * Step 3: Pop 5, add 9 -> Heap = [9, 10, 12]
 * ...continue until 8th element
 * Output: 13
 * ```
 *
 * EDGE CASES:
 * - Single element matrix
 * - k = 1 (smallest element)
 * - k = n*n (largest element)
 * - All elements are the same
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
