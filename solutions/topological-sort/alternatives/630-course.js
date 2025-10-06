/**
 * 630. Course
 * Medium
 *
 * Course Schedule III - Solution Time Complexity: O(n log n) Space Complexity: O(n) @param {number[][]} courses - Array of courses where courses[i] = [duration, lastDay] @return {number} - Maximum number of courses that can be taken
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Course is to understand the core problem pattern
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
 * Course Schedule III - Solution
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * 
 * @param {number[][]} courses - Array of courses where courses[i] = [duration, lastDay]
 * @return {number} - Maximum number of courses that can be taken
 */
var scheduleCourse = function(courses) {
    // Sort courses by lastDay (deadline) in ascending order
    courses.sort((a, b) => a[1] - b[1]);
    
    // MaxHeap to store course durations
    const maxHeap = [];
    let totalTime = 0;
    
    // Process each course
    for (const [duration, lastDay] of courses) {
        // Add current course duration to total time
        totalTime += duration;
        // Add duration to maxHeap
        insertIntoMaxHeap(maxHeap, duration);
        
        // If current schedule exceeds the lastDay of current course
        if (totalTime > lastDay) {
            // Remove the course with maximum duration
            const maxDuration = removeFromMaxHeap(maxHeap);
            totalTime -= maxDuration;
        }
    }
    
    // Return the number of courses that can be taken
    return maxHeap.length;
};

/**
 * Helper function to insert element into max heap
 * @param {number[]} heap - The heap array
 * @param {number} value - Value to insert
 */
function insertIntoMaxHeap(heap, value) {
    heap.push(value);
    bubbleUp(heap, heap.length - 1);
}

/**
 * Helper function to remove and return maximum element from heap
 * @param {number[]} heap - The heap array
 * @return {number} - Maximum value from heap
 */
function removeFromMaxHeap(heap) {
    if (heap.length === 0) return null;
    
    const max = heap[0];
    const last = heap.pop();
    
    if (heap.length > 0) {
        heap[0] = last;
        bubbleDown(heap, 0);
    }
    
    return max;
}

/**
 * Helper function to maintain heap property while inserting
 * @param {number[]} heap - The heap array
 * @param {number} index - Current index
 */
function bubbleUp(heap, index) {
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (heap[parentIndex] >= heap[index]) break;
        
        // Swap with parent
        [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
        index = parentIndex;
    }
}

/**
 * Helper function to maintain heap property while removing
 * @param {number[]} heap - The heap array
 * @param {number} index - Current index
 */
function bubbleDown(heap, index) {
    while (true) {
        let largest = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;
        
        if (leftChild < heap.length && heap[leftChild] > heap[largest]) {
            largest = leftChild;
        }
        
        if (rightChild < heap.length && heap[rightChild] > heap[largest]) {
            largest = rightChild;
        }
        
        if (largest === index) break;
        
        // Swap with largest child
        [heap[index], heap[largest]] = [heap[largest], heap[index]];
        index = largest;
    }
}

// Example usage:
/*
const courses1 = [[100,200],[200,1300],[1000,1250],[2000,3200]];
console.log(scheduleCourse(courses1)); // Output: 3

const courses2 = [[1,2]];
console.log(scheduleCourse(courses2)); // Output: 1

const courses3 = [[3,2],[4,3]];
console.log(scheduleCourse(courses3)); // Output: 0
*/

module.exports = scheduleCourse;