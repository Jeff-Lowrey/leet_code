/**

 *
 * This problem demonstrates key concepts in Heap.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to find k points closest to the origin. Using a max heap of size k allows us
 * to efficiently track the k closest points without sorting all points.
 *
 * APPROACH:



 *    - If heap size < k, add point
 *    - If point is closer than farthest in heap, replace it

 *
 * WHY THIS WORKS:
 * - Max heap keeps k closest points
 * - The farthest of these k points (heap top) can be quickly compared
 * - We avoid sorting all n points (O(n log n))
 * - Distance squared avoids expensive sqrt calculation
 *
 * TIME COMPLEXITY: O(n log k) where n is number of points
 * SPACE COMPLEXITY: O(k) for the heap
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: points = [[1,3],[-2,2]], k = 1
 * Step 1: Calculate distances: [1,3]->10, [-2,2]->8
 * Step 2: Add [1,3] to heap (heap size < k)
 * Step 3: Compare [-2,2] (8) with top (10), replace
 * Output: [[-2,2]]
 * ```
 *
 * EDGE CASES:
 * - k = 1 (single closest point)
 * - k equals number of points (return all)
 * - Points at same distance
 * - Points on axes or at origin
 */

/**
 * MaxHeap implementation for [point, distance] pairs
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
            // Compare by distance (second element of pair)
            if (this.heap[parentIndex][1] >= this.heap[index][1]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        while (true) {
            let largest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild][1] > this.heap[largest][1]) {
                largest = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild][1] > this.heap[largest][1]) {
                largest = rightChild;
            }
            if (largest === index) break;

            [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
            index = largest;
        }
    }
}

/**
 * Calculate squared Euclidean distance from origin
 * @param {number[]} point - [x, y] coordinates
 * @return {number} - Squared distance
 */
function distanceSquared(point) {
    return point[0] * point[0] + point[1] * point[1];
}

/**
 * Main solution for Problem 973: K Closest Points To Origin
 *
 * @param {number[][]} points - Array of [x, y] points
 * @param {number} k - Number of closest points to find
 * @return {number[][]} - K closest points
 *
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
function solve(points, k) {
    if (!points || points.length === 0 || k === 0) {
        return [];
    }

    const maxHeap = new MaxHeap();

    for (const point of points) {
        const dist = distanceSquared(point);

        if (maxHeap.size() < k) {
            maxHeap.push([point, dist]);
        } else if (dist < maxHeap.peek()[1]) {
            maxHeap.pop();
            maxHeap.push([point, dist]);
        }
    }

    // Extract all points from heap
    const result = [];
    while (maxHeap.size() > 0) {
        result.push(maxHeap.pop()[0]);
    }

    return result;
}

/**
 * Test cases for Problem 973: K Closest Points To Origin
 */
function testSolution() {
    console.log('Testing 973. K Closest Points To Origin');

    // Helper function to check if arrays contain same points (order doesn't matter)
    function samePoints(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const set1 = new Set(arr1.map(p => JSON.stringify(p)));
        const set2 = new Set(arr2.map(p => JSON.stringify(p)));
        return set1.size === set2.size && [...set1].every(p => set2.has(p));
    }

    // Test case 1: Basic functionality
    const result1 = solve([[1, 3], [-2, 2]], 1);
    const expected1 = [[-2, 2]];
    console.assert(samePoints(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Multiple points
    const result2 = solve([[3, 3], [5, -1], [-2, 4]], 2);
    const expected2 = [[3, 3], [-2, 4]];
    console.assert(samePoints(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: k equals number of points
    const result3 = solve([[1, 1], [2, 2], [3, 3]], 3);
    console.assert(result3.length === 3,
        `Test 3 failed: expected 3 points, got ${result3.length}`);

    // Test case 4: Single point
    const result4 = solve([[0, 1]], 1);
    const expected4 = [[0, 1]];
    console.assert(samePoints(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Points at origin
    const result5 = solve([[0, 0], [1, 1]], 1);
    const expected5 = [[0, 0]];
    console.assert(samePoints(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 973. K Closest Points To Origin!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 973. K Closest Points To Origin ===');
    console.log('Category: Heap');
    console.log('Difficulty: Medium');
    console.log('');

    const points = [[1, 3], [-2, 2]];
    const k = 1;
    console.log(`Input: points = ${JSON.stringify(points)}, k = ${k}`);
    const result = solve(points, k);
    console.log(`Output: ${JSON.stringify(result)}`);
    console.log('Explanation: Distance from (1,3) to origin is sqrt(10)');
    console.log('             Distance from (-2,2) to origin is sqrt(8)');
    console.log('             So [-2,2] is closer');

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
 * - This solution uses a max heap to efficiently find k closest points
 * - We use squared distance to avoid expensive sqrt calculations
 * - Max heap of size k is more efficient than sorting all points
 * - Time complexity O(n log k) beats naive O(n log n) sorting approach
 * - Alternative: QuickSelect algorithm for O(n) average case
 */
