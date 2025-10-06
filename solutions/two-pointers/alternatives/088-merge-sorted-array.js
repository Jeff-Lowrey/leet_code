/**
 * 88. Merge Sorted Array
 * Medium
 *
 * Merge Sorted Array - LeetCode #88 Problem: Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array. The number of elements initialized in nums1 and nums2 are m and n respectively. Assume that nums1 has enough space to hold additional elements from nums2. @param {number[]} nums1 - The first sorted array with extra space at the end @param {number} m - The number of actual elements in nums1 @param {number[]} nums2 - The second sorted array @param {number} n - The number of elements in nums2 @return {void} Modify nums1 in-place
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Merge Sorted Array is to understand the core problem pattern
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
 * Merge Sorted Array - LeetCode #88
 * 
 * Problem: Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 
 * as one sorted array. The number of elements initialized in nums1 and nums2 are m 
 * and n respectively. Assume that nums1 has enough space to hold additional elements 
 * from nums2.
 * 
 * @param {number[]} nums1 - The first sorted array with extra space at the end
 * @param {number} m - The number of actual elements in nums1
 * @param {number[]} nums2 - The second sorted array
 * @param {number} n - The number of elements in nums2
 * @return {void} Modify nums1 in-place
 */
function merge(nums1, m, nums2, n) {
    // Input validation
    if (!Array.isArray(nums1) || !Array.isArray(nums2)) {
        throw new Error('Input must be arrays');
    }

    // Edge cases
    if (n === 0) return;
    if (m === 0) {
        for (let i = 0; i < n; i++) {
            nums1[i] = nums2[i];
        }
        return;
    }

    // Initialize pointers for both arrays
    // Start from the end to utilize the extra space in nums1
    let p1 = m - 1;    // Pointer for nums1
    let p2 = n - 1;    // Pointer for nums2
    let p = m + n - 1; // Pointer for merged array position

    // Merge arrays from end to start
    while (p2 >= 0) {
        // If p1 < 0, we've exhausted nums1, just copy remaining nums2 elements
        // Otherwise, compare elements and take the larger one
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}

// Example usage and test cases
function runTests() {
    // Test Case 1: Normal case
    const nums1 = [1, 2, 3, 0, 0, 0];
    const nums2 = [2, 5, 6];
    merge(nums1, 3, nums2, 3);
    console.log('Test 1:', nums1); // Expected: [1, 2, 2, 3, 5, 6]

    // Test Case 2: Empty nums1
    const nums3 = [0];
    const nums4 = [1];
    merge(nums3, 0, nums4, 1);
    console.log('Test 2:', nums3); // Expected: [1]

    // Test Case 3: Empty nums2
    const nums5 = [1, 2, 3];
    const nums6 = [];
    merge(nums5, 3, nums6, 0);
    console.log('Test 3:', nums5); // Expected: [1, 2, 3]

    // Test Case 4: Arrays with same numbers
    const nums7 = [1, 1, 1, 0, 0, 0];
    const nums8 = [1, 1, 1];
    merge(nums7, 3, nums8, 3);
    console.log('Test 4:', nums7); // Expected: [1, 1, 1, 1, 1, 1]
}

// Export the function for use in other modules
module.exports = merge;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}