/**
 * 703. Kth Largest Element In A Stream
 * Medium
 *
 * KthLargest class to find the kth largest element in a stream Uses a MinHeap to maintain k largest elements
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Kth Largest Element In A Stream is to understand the core problem pattern
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
 * KthLargest class to find the kth largest element in a stream
 * Uses a MinHeap to maintain k largest elements
 */

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

    // Swap elements at two indices
    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    // Insert a new element into the heap
    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    // Heapify up after insertion
    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);
            if (this.heap[parentIndex] > this.heap[index]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    // Remove and return the minimum element
    remove() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    // Heapify down after removal
    heapifyDown(index) {
        while (true) {
            let smallest = index;
            const leftChild = this.getLeftChildIndex(index);
            const rightChild = this.getRightChildIndex(index);

            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[smallest]) {
                smallest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[smallest]) {
                smallest = rightChild;
            }

            if (smallest === index) break;

            this.swap(index, smallest);
            index = smallest;
        }
    }

    // Get the minimum element without removing it
    peek() {
        return this.heap[0];
    }

    // Get the size of the heap
    size() {
        return this.heap.length;
    }
}

class KthLargest {
    /**
     * Initialize KthLargest with k and initial array
     * @param {number} k
     * @param {number[]} nums
     */
    constructor(k, nums) {
        this.k = k;
        this.minHeap = new MinHeap();
        
        // Initialize the heap with the array elements
        for (const num of nums) {
            this.add(num);
        }
    }

    /**
     * Add new value and return kth largest
     * @param {number} val
     * @return {number}
     */
    add(val) {
        // Add the new value to the heap
        if (this.minHeap.size() < this.k) {
            this.minHeap.insert(val);
        } else if (val > this.minHeap.peek()) {
            this.minHeap.remove();
            this.minHeap.insert(val);
        }

        // Return kth largest element
        return this.minHeap.peek();
    }
}

// Example usage:
/*
const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
console.log(kthLargest.add(3));   // returns 4
console.log(kthLargest.add(5));   // returns 5
console.log(kthLargest.add(10));  // returns 5
console.log(kthLargest.add(9));   // returns 8
console.log(kthLargest.add(4));   // returns 8
*/

module.exports = KthLargest;