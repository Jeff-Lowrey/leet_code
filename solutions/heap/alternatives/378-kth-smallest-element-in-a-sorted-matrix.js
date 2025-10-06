/**
 * 378. Kth Smallest Element In A Sorted Matrix
 * Medium
 *
 * Kth Smallest Matrix Element Solution Time Complexity: O(k log(n)) where n is the number of rows Space Complexity: O(n) for the heap
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Kth Smallest Element In A Sorted Matrix is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Kth Smallest Matrix Element Solution
 * Time Complexity: O(k * log(n)) where n is the number of rows
 * Space Complexity: O(n) for the heap
 */

// MinHeap class implementation for efficient element tracking
class MinHeap {
    constructor() {
        this.heap = [];
    }

    // Get parent index
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    // Get left child index
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    // Get right child index
    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // Swap elements in heap
    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    // Insert element into heap
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    // Heapify up operation
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex].val > this.heap[index].val) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Remove minimum element
    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);

        return min;
    }

    // Heapify down operation
    heapifyDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = this.getLeftChildIndex(index);
            const rightChild = this.getRightChildIndex(index);

            if (leftChild < this.heap.length && this.heap[leftChild].val < this.heap[minIndex].val) {
                minIndex = leftChild;
            }

            if (rightChild < this.heap.length && this.heap[rightChild].val < this.heap[minIndex].val) {
                minIndex = rightChild;
            }

            if (minIndex === index) break;

            this.swap(index, minIndex);
            index = minIndex;
        }
    }
}

/**
 * Finds the kth smallest element in a sorted matrix
 * @param {number[][]} matrix - n x n matrix where each row and column is sorted in ascending order
 * @param {number} k - position of the element to find (1-based)
 * @return {number} - kth smallest element in the matrix
 */
function kthSmallest(matrix, k) {
    if (!matrix || !matrix.length || !matrix[0].length || k < 1) {
        return null;
    }

    const n = matrix.length;
    const minHeap = new MinHeap();

    // Add first element from each row with row and col information
    for (let i = 0; i < n; i++) {
        minHeap.insert({ val: matrix[i][0], row: i, col: 0 });
    }

    // Process k elements
    let count = 0;
    while (minHeap.heap.length > 0 && count < k - 1) {
        const current = minHeap.remove();
        const row = current.row;
        const col = current.col;

        // Add next element from the same row if available
        if (col + 1 < n) {
            minHeap.insert({ val: matrix[row][col + 1], row: row, col: col + 1 });
        }

        count++;
    }

    return minHeap.heap[0].val;
}

// Example usage and test cases
function runTests() {
    // Test Case 1
    const matrix1 = [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15]
    ];
    console.log("Test 1:", kthSmallest(matrix1, 8)); // Expected: 13

    // Test Case 2
    const matrix2 = [
        [1, 2],
        [3, 4]
    ];
    console.log("Test 2:", kthSmallest(matrix2, 2)); // Expected: 2

    // Test Case 3 - Edge case: empty matrix
    console.log("Test 3:", kthSmallest([], 1)); // Expected: null

    // Test Case 4 - Edge case: k = 1
    const matrix4 = [[1]];
    console.log("Test 4:", kthSmallest(matrix4, 1)); // Expected: 1
}

// Run the tests
runTests();

module.exports = {
    kthSmallest
};