I'll help you create a complete JavaScript implementation of a MedianFinder class that efficiently finds the median of a data stream. Here's the solution:

```javascript
/**
 * MedianFinder class for finding the median in a data stream
 * Uses two heaps (max heap for lower half, min heap for upper half)
 * to maintain the median efficiently
 */
class MedianFinder {
    constructor() {
        // Initialize two heaps
        this.maxHeap = []; // For lower half of numbers
        this.minHeap = []; // For upper half of numbers
    }

    /**
     * Adds a number to the data structure
     * @param {number} num - The number to add
     */
    addNum(num) {
        // If maxHeap is empty or num is less than maxHeap's top, add to maxHeap
        if (this.maxHeap.length === 0 || num < -this.maxHeap[0]) {
            this.maxHeap.push(-num);
            this.maxHeapify(this.maxHeap.length - 1);
        } else {
            this.minHeap.push(num);
            this.minHeapify(this.minHeap.length - 1);
        }

        // Balance heaps if necessary
        this.balanceHeaps();
    }

    /**
     * Returns the median of all numbers seen so far
     * @return {number} The median value
     */
    findMedian() {
        if (this.maxHeap.length === this.minHeap.length) {
            return ((-this.maxHeap[0] + this.minHeap[0]) / 2);
        } else {
            return -this.maxHeap[0];
        }
    }

    /**
     * Maintains heap property for max heap
     * @param {number} index - Index of the element to heapify
     */
    maxHeapify(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (-this.maxHeap[parent] < -this.maxHeap[index]) {
                [this.maxHeap[parent], this.maxHeap[index]] = 
                    [this.maxHeap[index], this.maxHeap[parent]];
                index = parent;
            } else {
                break;
            }
        }
    }

    /**
     * Maintains heap property for min heap
     * @param {number} index - Index of the element to heapify
     */
    minHeapify(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.minHeap[parent] > this.minHeap[index]) {
                [this.minHeap[parent], this.minHeap[index]] = 
                    [this.minHeap[index], this.minHeap[parent]];
                index = parent;
            } else {
                break;
            }
        }
    }

    /**
     * Balances the two heaps to maintain the median property
     * Ensures maxHeap has either equal or one more element than minHeap
     */
    balanceHeaps() {
        // If the difference in sizes is more than 1, rebalance
        while (this.maxHeap.length > this.minHeap.length + 1) {
            this.minHeap.push(-this.maxHeap[0]);
            this.maxHeap[0] = -this.maxHeap[this.maxHeap.length - 1];
            this.maxHeap.pop();
            this.siftDownMax(0);
            this.minHeapify(this.minHeap.length - 1);
        }

        while (this.minHeap.length > this.maxHeap.length) {
            this.maxHeap.push(-this.minHeap[0]);
            this.minHeap[0] = this.minHeap[this.minHeap.length - 1];
            this.minHeap.pop();
            this.siftDownMin(0);
            this.maxHeapify(this.maxHeap.length - 1);
        }
    }

    /**
     * Sifts down an element in the max heap
     * @param {number} index - Starting index for sift down operation
     */
    siftDownMax(index) {
        const length = this.maxHeap.length;
        while (true) {
            let largest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < length && -this.maxHeap[left] > -this.maxHeap[largest]) {
                largest = left;
            }
            if (right < length && -this.maxHeap[right] > -this.maxHeap[largest]) {
                largest = right;
            }

            if (largest === index) break;

            [this.maxHeap[index], this.maxHeap[largest]] = 
                [this.maxHeap[largest], this.maxHeap[index]];
            index = largest;
        }
    }

    /**
     * Sifts down an element in the min heap
     * @param {number} index - Starting index for sift down operation
     */
    siftDownMin(index) {
        const length = this.minHeap.length;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < length && this.minHeap[left] < this.minHeap[smallest]) {
                smallest = left;
            }
            if (right < length && this.minHeap[right] < this.minHeap[smallest]) {
                smallest = right;
            }

            if (smallest === index) break;

            [this.minHeap[index], this.minHeap[smallest]] = 
                [this.minHeap[smallest], this.minHeap[index]];
            index = smallest;
        }
    }
}

// Example usage:
/*
const medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
console.log(medianFinder.findMedian()); // returns 1.5
medianFinder.addNum(3);    // arr = [1, 2, 3]
console.log(medianFinder.findMedian()); // returns 2.0
*/

// Export the MedianFinder class
module.exports = MedianFinder;
```

This implementation provides an efficient solution for finding the median in a data stream using two heaps. Here are the key features:

1. Uses two heaps to maintain the median:
   - A max heap for the lower half of numbers
   - A min heap for the upper half of numbers

2. The `addNum` method efficiently adds new numbers while maintaining the heap properties.

3. The `findMedian` method returns the median in O(1) time:
   - If both heaps have equal size, returns average of top elements
   - Otherwise, returns top element of max heap

4. Includes helper methods for heap operations:
   - `maxHeapify` and `minHeapify` for maintaining heap properties
   - `balanceHeaps` for ensuring proper distribution of elements
   - `siftDownMax` and `siftDownMin` for heap maintenance

5. Handles edge cases appropriately and maintains proper heap balance.

6. Includes clear comments and follows JavaScript best practices.

The time complexity is O(log n) for insertions and O(1) for finding the median, where n is the number of elements in the data structure.