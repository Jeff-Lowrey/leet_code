/**
 * 215. Kth Largest Element In An Array
 * Medium
 *
 * Kth Largest Element Implementation This file contains solutions for finding the kth largest element in an array
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Kth Largest Element In An Array is to understand the core problem pattern
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
 * Kth Largest Element Implementation
 * This file contains solutions for finding the kth largest element in an array
 */

/**
 * Simple solution using sort
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * @param {number[]} nums - Input array of numbers
 * @param {number} k - Position from largest (1-based)
 * @return {number} - Kth largest element
 */
function findKthLargestSimple(nums, k) {
    if (!nums || !nums.length || k < 1 || k > nums.length) {
        return null;
    }
    
    // Sort in descending order and return kth element
    return nums.sort((a, b) => b - a)[k - 1];
}

/**
 * MinHeap class implementation for optimized solution
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    parent(i) {
        return Math.floor((i - 1) / 2);
    }

    leftChild(i) {
        return 2 * i + 1;
    }

    rightChild(i) {
        return 2 * i + 2;
    }

    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    insert(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(i) {
        while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    heapifyDown(i) {
        let minIndex = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);

        if (left < this.heap.length && this.heap[left] < this.heap[minIndex]) {
            minIndex = left;
        }
        if (right < this.heap.length && this.heap[right] < this.heap[minIndex]) {
            minIndex = right;
        }

        if (minIndex !== i) {
            this.swap(i, minIndex);
            this.heapifyDown(minIndex);
        }
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}

/**
 * Optimized solution using MinHeap
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 * @param {number[]} nums - Input array of numbers
 * @param {number} k - Position from largest (1-based)
 * @return {number} - Kth largest element
 */
function findKthLargestOptimized(nums, k) {
    if (!nums || !nums.length || k < 1 || k > nums.length) {
        return null;
    }

    // Create min heap
    const minHeap = new MinHeap();

    // Process each number in the array
    for (const num of nums) {
        if (minHeap.size() < k) {
            minHeap.insert(num);
        } else if (num > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(num);
        }
    }

    return minHeap.peek();
}

// Export both implementations
module.exports = {
    findKthLargestSimple,
    findKthLargestOptimized
};

// Example usage and tests
function runTests() {
    const testCases = [
        { nums: [3, 2, 1, 5, 6, 4], k: 2, expected: 5 },
        { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 4 },
        { nums: [1], k: 1, expected: 1 },
        { nums: [], k: 1, expected: null },
    ];

    for (const test of testCases) {
        const result1 = findKthLargestSimple(test.nums.slice(), test.k);
        const result2 = findKthLargestOptimized(test.nums.slice(), test.k);
        
        console.log(`Test case: nums=${test.nums}, k=${test.k}`);
        console.log(`Simple solution: ${result1}`);
        console.log(`Optimized solution: ${result2}`);
        console.log(`Expected: ${test.expected}`);
        console.log('---');
    }
}

// Uncomment to run tests
// runTests();