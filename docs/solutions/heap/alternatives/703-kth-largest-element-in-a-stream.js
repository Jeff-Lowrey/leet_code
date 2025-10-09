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
 * MinHeap implementation for maintaining k largest elements
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
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
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }
            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest;
        }
    }
}

/**
 * KthLargest class - maintains kth largest element in a stream
 */
class KthLargest {
    /**
     * @param {number} k - The kth position to track
     * @param {number[]} nums - Initial numbers
     */
    constructor(k, nums) {
        this.k = k;
        this.minHeap = new MinHeap();

        // Add all initial numbers to heap
        for (const num of nums) {
            this.add(num);
        }
    }

    /**
     * Adds a value to the stream and returns the kth largest element
     * @param {number} val - Value to add
     * @return {number} - The kth largest element
     */
    add(val) {
        // If heap has fewer than k elements, always add
        if (this.minHeap.size() < this.k) {
            this.minHeap.push(val);
        }
        // If new value is larger than smallest in top k, replace it
        else if (val > this.minHeap.peek()) {
            this.minHeap.pop();
            this.minHeap.push(val);
        }

        return this.minHeap.peek();
    }
}

/**
 * Main solution wrapper for consistency
 */
function solve() {
    return KthLargest;
}

/**
 * Test cases for Problem 703: Kth Largest Element In A Stream
 */
function testSolution() {
    console.log('Testing 703. Kth Largest Element In A Stream');

    // Test case 1: Basic functionality
    const kthLargest1 = new KthLargest(3, [4, 5, 8, 2]);
    const result1_1 = kthLargest1.add(3);
    console.assert(result1_1 === 4, `Test 1.1 failed: expected 4, got ${result1_1}`);
    const result1_2 = kthLargest1.add(5);
    console.assert(result1_2 === 5, `Test 1.2 failed: expected 5, got ${result1_2}`);
    const result1_3 = kthLargest1.add(10);
    console.assert(result1_3 === 5, `Test 1.3 failed: expected 5, got ${result1_3}`);
    const result1_4 = kthLargest1.add(9);
    console.assert(result1_4 === 8, `Test 1.4 failed: expected 8, got ${result1_4}`);
    const result1_5 = kthLargest1.add(4);
    console.assert(result1_5 === 8, `Test 1.5 failed: expected 8, got ${result1_5}`);

    // Test case 2: k = 1 (largest element)
    const kthLargest2 = new KthLargest(1, [1, 2, 3]);
    const result2 = kthLargest2.add(4);
    console.assert(result2 === 4, `Test 2 failed: expected 4, got ${result2}`);

    // Test case 3: Empty initial array
    const kthLargest3 = new KthLargest(2, []);
    const result3_1 = kthLargest3.add(3);
    console.assert(result3_1 === 3, `Test 3.1 failed: expected 3, got ${result3_1}`);
    const result3_2 = kthLargest3.add(5);
    console.assert(result3_2 === 3, `Test 3.2 failed: expected 3, got ${result3_2}`);
    const result3_3 = kthLargest3.add(10);
    console.assert(result3_3 === 5, `Test 3.3 failed: expected 5, got ${result3_3}`);

    // Test case 4: Negative numbers
    const kthLargest4 = new KthLargest(2, [-1, -2]);
    const result4 = kthLargest4.add(0);
    console.assert(result4 === -1, `Test 4 failed: expected -1, got ${result4}`);

    console.log('All test cases passed for 703. Kth Largest Element In A Stream!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 703. Kth Largest Element In A Stream ===');
    console.log('Category: Heap');
    console.log('Difficulty: Easy');
    console.log('');

    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
    console.log('Initialized with k=3, nums=[4, 5, 8, 2]');
    console.log('add(3):', kthLargest.add(3)); // 4
    console.log('add(5):', kthLargest.add(5)); // 5
    console.log('add(10):', kthLargest.add(10)); // 5
    console.log('add(9):', kthLargest.add(9)); // 8
    console.log('add(4):', kthLargest.add(4)); // 8

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    KthLargest,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses a min heap of size k to track k largest elements
 * - The top of the min heap is always the kth largest element
 * - Very efficient for streaming data: O(log k) per addition
 * - Perfect example of using heap for maintaining top-k elements
 */
