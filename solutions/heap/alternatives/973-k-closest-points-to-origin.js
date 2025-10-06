/**
 * 973. K Closest Points To Origin
 * Medium
 *
 * K Closest Points to Origin This solution finds the k closest points to the origin (0, 0) in a 2D plane. The distance is measured using Euclidean distance: sqrt(x^2 + y^2) Time Complexity: O(n log k) where n is the number of points Space Complexity: O(k) for storing the k closest points
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving K Closest Points To Origin is to understand the core problem pattern
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
 * K Closest Points to Origin
 * 
 * This solution finds the k closest points to the origin (0, 0) in a 2D plane.
 * The distance is measured using Euclidean distance: sqrt(x^2 + y^2)
 * 
 * Time Complexity: O(n log k) where n is the number of points
 * Space Complexity: O(k) for storing the k closest points
 */

/**
 * @param {number[][]} points - Array of points where each point is [x, y]
 * @param {number} k - Number of closest points to return
 * @return {number[][]} - Array of k closest points to origin
 */
function kClosestPoints(points, k) {
    // Input validation
    if (!points || !Array.isArray(points) || points.length === 0) {
        return [];
    }
    
    if (k <= 0) {
        return [];
    }
    
    if (k >= points.length) {
        return points;
    }

    // Create max heap to store k closest points
    const maxHeap = [];

    // Helper function to calculate distance from origin
    const getDistance = (point) => {
        return point[0] * point[0] + point[1] * point[1];
    };

    // Process each point
    for (let point of points) {
        const distance = getDistance(point);
        
        if (maxHeap.length < k) {
            // If heap has less than k elements, add current point
            maxHeap.push({ point, distance });
            heapifyUp(maxHeap, maxHeap.length - 1);
        } else if (distance < maxHeap[0].distance) {
            // If current point is closer than the farthest point in heap
            maxHeap[0] = { point, distance };
            heapifyDown(maxHeap, 0);
        }
    }

    // Extract points from heap
    return maxHeap.map(item => item.point);
}

/**
 * Helper function to maintain heap property when adding element
 * @param {Array} heap - The heap array
 * @param {number} index - Current index
 */
function heapifyUp(heap, index) {
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        if (heap[parentIndex].distance < heap[index].distance) {
            break;
        }
        // Swap with parent
        [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
        index = parentIndex;
    }
}

/**
 * Helper function to maintain heap property when removing element
 * @param {Array} heap - The heap array
 * @param {number} index - Current index
 */
function heapifyDown(heap, index) {
    const length = heap.length;
    
    while (true) {
        let largest = index;
        const leftChild = 2 * index + 1;
        const rightChild = 2 * index + 2;

        if (leftChild < length && heap[leftChild].distance > heap[largest].distance) {
            largest = leftChild;
        }
        
        if (rightChild < length && heap[rightChild].distance > heap[largest].distance) {
            largest = rightChild;
        }

        if (largest === index) {
            break;
        }

        // Swap with largest child
        [heap[index], heap[largest]] = [heap[largest], heap[index]];
        index = largest;
    }
}

// Example usage and test cases
function runTests() {
    console.log("Running test cases...");
    
    // Test Case 1: Basic case
    console.log(kClosestPoints([[1,3],[-2,2]], 1));  // Expected: [[-2,2]]
    
    // Test Case 2: Multiple points
    console.log(kClosestPoints([[3,3],[5,-1],[-2,4]], 2));  // Expected: [[3,3],[-2,4]]
    
    // Test Case 3: Empty input
    console.log(kClosestPoints([], 1));  // Expected: []
    
    // Test Case 4: k larger than input size
    console.log(kClosestPoints([[1,1]], 2));  // Expected: [[1,1]]
    
    // Test Case 5: Points at same distance
    console.log(kClosestPoints([[1,1],[-1,1],[1,-1],[-1,-1]], 2));
}

// Export the function for use in other modules
module.exports = {
    kClosestPoints
};

// Uncomment to run tests
// runTests();