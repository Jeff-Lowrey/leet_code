/**

 *
 * This problem demonstrates key concepts in Heap.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * To find the median efficiently, we need to maintain access to the middle elements of a sorted sequence.
 * Using two heaps allows us to balance the data such that we always have quick access to the median.
 *
 * APPROACH:




 *
 * WHY THIS WORKS:
 * - Max heap stores smaller half (largest of small numbers at top)
 * - Min heap stores larger half (smallest of large numbers at top)
 * - The tops of these heaps are always the middle element(s)
 * - This gives us O(1) median access after O(log n) insertion
 *
 * TIME COMPLEXITY: O(log n) for addNum, O(1) for findMedian
 * SPACE COMPLEXITY: O(n) for storing all numbers
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: addNum(1), addNum(2), findMedian(), addNum(3), findMedian()
 * Step 1: Add 1 -> maxHeap: [1], minHeap: []
 * Step 2: Add 2 -> maxHeap: [1], minHeap: [2]
 * Step 3: findMedian() -> (1 + 2) / 2 = 1.5
 * Step 4: Add 3 -> maxHeap: [1], minHeap: [2, 3]
 * Step 5: findMedian() -> 2 (top of minHeap, which has more elements)
 * ```
 *
 * EDGE CASES:
 * - Single element (median is that element)
 * - Two elements (median is their average)
 * - Negative numbers
 * - Duplicate numbers
 */

/**
 * MinHeap implementation for the upper half of numbers
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
 * MaxHeap implementation for the lower half of numbers
 */
class MaxHeap {
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
            if (this.heap[parentIndex] >= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild] > this.heap[largest]) {
                largest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild] > this.heap[largest]) {
                largest = rightChild;
            }
            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

/**
 * MedianFinder class - maintains median of a stream of numbers
 */
class MedianFinder {
    constructor() {
        this.maxHeap = new MaxHeap(); // Lower half
        this.minHeap = new MinHeap(); // Upper half
    }

    /**
     * Adds a number to the data structure
     * @param {number} num
     * @return {void}
     */
    addNum(num) {
        // Add to max heap (lower half) first
        if (this.maxHeap.size() === 0 || num <= this.maxHeap.peek()) {
            this.maxHeap.push(num);
        } else {
            this.minHeap.push(num);
        }

        // Balance the heaps
        if (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.push(this.maxHeap.pop());
        } else if (this.minHeap.size() > this.maxHeap.size()) {
            this.maxHeap.push(this.minHeap.pop());
        }
    }

    /**
     * Returns the median of all elements so far
     * @return {number}
     */
    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.peek();
        }
        return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
    }
}

/**
 * Main solution wrapper for consistency
 */
function solve() {
    return MedianFinder;
}

/**
 * Test cases for Problem 295: Find Median From Data Stream
 */
function testSolution() {
    console.log('Testing 295. Find Median From Data Stream');

    // Test case 1: Basic functionality
    const mf1 = new MedianFinder();
    mf1.addNum(1);
    mf1.addNum(2);
    const result1 = mf1.findMedian();
    console.assert(result1 === 1.5, `Test 1 failed: expected 1.5, got ${result1}`);

    // Test case 2: Odd number of elements
    mf1.addNum(3);
    const result2 = mf1.findMedian();
    console.assert(result2 === 2, `Test 2 failed: expected 2, got ${result2}`);

    // Test case 3: More complex sequence
    const mf2 = new MedianFinder();
    mf2.addNum(6);
    mf2.addNum(10);
    mf2.addNum(2);
    mf2.addNum(6);
    mf2.addNum(5);
    const result3 = mf2.findMedian();
    console.assert(result3 === 6, `Test 3 failed: expected 6, got ${result3}`);

    // Test case 4: Single element
    const mf3 = new MedianFinder();
    mf3.addNum(5);
    const result4 = mf3.findMedian();
    console.assert(result4 === 5, `Test 4 failed: expected 5, got ${result4}`);

    // Test case 5: Negative numbers
    const mf4 = new MedianFinder();
    mf4.addNum(-1);
    mf4.addNum(-2);
    mf4.addNum(-3);
    const result5 = mf4.findMedian();
    console.assert(result5 === -2, `Test 5 failed: expected -2, got ${result5}`);

    console.log('All test cases passed for 295. Find Median From Data Stream!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 295. Find Median From Data Stream ===');
    console.log('Category: Heap');
    console.log('Difficulty: Hard');
    console.log('');

    const medianFinder = new MedianFinder();
    console.log('Adding numbers: 1, 2, 3');
    medianFinder.addNum(1);
    medianFinder.addNum(2);
    console.log('Median after adding 1, 2:', medianFinder.findMedian()); // 1.5
    medianFinder.addNum(3);
    console.log('Median after adding 3:', medianFinder.findMedian()); // 2

    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    MedianFinder,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution uses two heaps to maintain the median efficiently
 * - The max heap stores the smaller half of numbers
 * - The min heap stores the larger half of numbers
 * - Heaps are kept balanced to ensure O(1) median access
 * - This is a classic streaming algorithm problem
 */
