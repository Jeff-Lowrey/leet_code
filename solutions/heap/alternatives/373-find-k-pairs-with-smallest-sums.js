/**
 * 373. Find K Pairs With Smallest Sums
 * Medium
 *
 * K Pairs with Smallest Sums Given two sorted arrays nums1 and nums2 of size m and n respectively, find the k pairs (u,v) with the smallest sums where u is from nums1 and v is from nums2. @param {number[]} nums1 - First sorted array @param {number[]} nums2 - Second sorted array @param {number} k - Number of pairs to return @return {number[][]} - Array of k pairs with smallest sums
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find K Pairs With Smallest Sums is to understand the core problem pattern
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
 * K Pairs with Smallest Sums
 * 
 * Given two sorted arrays nums1 and nums2 of size m and n respectively,
 * find the k pairs (u,v) with the smallest sums where u is from nums1 and v is from nums2.
 * 
 * @param {number[]} nums1 - First sorted array
 * @param {number[]} nums2 - Second sorted array
 * @param {number} k - Number of pairs to return
 * @return {number[][]} - Array of k pairs with smallest sums
 */
function kSmallestPairs(nums1, nums2, k) {
    // Handle edge cases
    if (!nums1 || !nums2 || !nums1.length || !nums2.length || k <= 0) {
        return [];
    }

    // Create min heap to store pairs based on sum
    const minHeap = [];
    const result = [];
    const seen = new Set();

    // Helper function to add pair to heap
    function addToHeap(i, j) {
        const key = `${i},${j}`;
        if (!seen.has(key) && i < nums1.length && j < nums2.length) {
            const sum = nums1[i] + nums2[j];
            minHeap.push([sum, i, j]);
            seen.add(key);
        }
    }

    // Add first pair and sort heap
    addToHeap(0, 0);

    // Process pairs until we have k pairs or heap is empty
    while (minHeap.length > 0 && result.length < k) {
        // Sort heap based on sum
        minHeap.sort((a, b) => a[0] - b[0]);
        
        // Get pair with smallest sum
        const [sum, i, j] = minHeap.shift();
        
        // Add pair to result
        result.push([nums1[i], nums2[j]]);
        
        // Add next possible pairs
        addToHeap(i + 1, j);
        addToHeap(i, j + 1);
    }

    return result;
}

/**
 * Test cases
 */
function runTests() {
    // Test case 1
    console.log("Test 1:");
    console.log(kSmallestPairs([1,7,11], [2,4,6], 3));
    // Expected: [[1,2],[1,4],[1,6]]

    // Test case 2
    console.log("\nTest 2:");
    console.log(kSmallestPairs([1,1,2], [1,2,3], 2));
    // Expected: [[1,1],[1,1]]

    // Test case 3
    console.log("\nTest 3:");
    console.log(kSmallestPairs([1,2], [3], 3));
    // Expected: [[1,3],[2,3]]

    // Edge cases
    console.log("\nEdge cases:");
    console.log(kSmallestPairs([], [1], 1)); // Empty array
    console.log(kSmallestPairs([1], [], 1)); // Empty array
    console.log(kSmallestPairs([1], [1], 0)); // k = 0
}

// Run tests if not in module context
if (require.main === module) {
    runTests();
}

// Export for testing
module.exports = kSmallestPairs;