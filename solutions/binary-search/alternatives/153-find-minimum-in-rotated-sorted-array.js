/**
 * 153. Find Minimum In Rotated Sorted Array
 * Medium
 *
 * Find Minimum in Rotated Sorted Array Problem: Given a sorted array that has been rotated between 1 and n times, find the minimum element in the array. Example: [3,4,5,1,2] was originally [1,2,3,4,5] and was rotated 3 times. The minimum element is 1. Time Complexity: O(log n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find Minimum In Rotated Sorted Array is to understand the core problem pattern
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
 * Find Minimum in Rotated Sorted Array
 * 
 * Problem: Given a sorted array that has been rotated between 1 and n times,
 * find the minimum element in the array.
 * Example: [3,4,5,1,2] was originally [1,2,3,4,5] and was rotated 3 times.
 * The minimum element is 1.
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
const findMin = function(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) {
        return null;
    }
    
    if (nums.length === 1) {
        return nums[0];
    }
    
    // Initialize pointers for binary search
    let left = 0;
    let right = nums.length - 1;
    
    // If array is not rotated, return first element
    if (nums[right] > nums[left]) {
        return nums[left];
    }
    
    // Binary search implementation
    while (left <= right) {
        // Calculate middle point
        const mid = Math.floor((left + right) / 2);
        
        // Check if mid+1 is the minimum element
        if (nums[mid] > nums[mid + 1]) {
            return nums[mid + 1];
        }
        
        // Check if mid is the minimum element
        if (nums[mid - 1] > nums[mid]) {
            return nums[mid];
        }
        
        // Decide which half to search
        if (nums[mid] > nums[0]) {
            // Minimum is in right half
            left = mid + 1;
        } else {
            // Minimum is in left half
            right = mid - 1;
        }
    }
    
    // This line should never be reached if input is valid
    return nums[0];
};

// Test cases
const testCases = [
    [3, 4, 5, 1, 2],
    [4, 5, 6, 7, 0, 1, 2],
    [11, 13, 15, 17],
    [2, 1],
    [1],
    []
];

// Run test cases
testCases.forEach((test, index) => {
    console.log(`Test case ${index + 1}:`);
    console.log(`Input: [${test}]`);
    console.log(`Output: ${findMin(test)}`);
    console.log('---');
});

// Export the function for potential use in other modules
module.exports = findMin;