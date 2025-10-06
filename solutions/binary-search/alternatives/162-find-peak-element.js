/**
 * 162. Find Peak Element
 * Medium
 *
 * Find Peak Element - JavaScript Implementation LeetCode 162: https://leetcode.com/problems/find-peak-element/ Problem: Given an array of integers nums, find a peak element in the array. A peak element is an element that is strictly greater than its neighbors. Note: - Array elements are 0-indexed - Edge elements only need to be greater than their single neighbor - It's guaranteed that the answer exists (at least one peak) - Multiple peaks may exist; returning any valid peak index is acceptable
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find Peak Element is to understand the core problem pattern
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
 * Find Peak Element - JavaScript Implementation
 * LeetCode 162: https://leetcode.com/problems/find-peak-element/
 * 
 * Problem: Given an array of integers nums, find a peak element in the array.
 * A peak element is an element that is strictly greater than its neighbors.
 * 
 * Note:
 * - Array elements are 0-indexed
 * - Edge elements only need to be greater than their single neighbor
 * - It's guaranteed that the answer exists (at least one peak)
 * - Multiple peaks may exist; returning any valid peak index is acceptable
 */

/**
 * Finds a peak element in the array using binary search
 * @param {number[]} nums - Array of integers
 * @return {number} - Index of a peak element
 */
function findPeakElement(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) return -1;
    if (nums.length === 1) return 0;
    
    let left = 0;
    let right = nums.length - 1;
    
    // Binary search implementation
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        
        // Compare with next element to determine which direction to search
        if (nums[mid] > nums[mid + 1]) {
            // If current element is greater than next, peak must be in left half
            right = mid;
        } else {
            // If current element is less than next, peak must be in right half
            left = mid + 1;
        }
    }
    
    // At this point, left == right and points to a peak
    return left;
}

/**
 * Helper function to test the implementation
 * @param {number[]} nums - Test input array
 */
function testFindPeak(nums) {
    const peakIndex = findPeakElement(nums);
    console.log(`Input array: [${nums.join(', ')}]`);
    console.log(`Peak found at index: ${peakIndex}`);
    console.log(`Peak value: ${nums[peakIndex]}`);
    console.log('---');
}

// Test cases
function runTests() {
    console.log('Running test cases for Find Peak Element:');
    
    // Test case 1: Simple array with one peak
    testFindPeak([1, 2, 3, 1]);
    
    // Test case 2: Array with multiple peaks
    testFindPeak([1, 2, 1, 3, 5, 6, 4]);
    
    // Test case 3: Array with peak at end
    testFindPeak([1, 2, 3, 4]);
    
    // Test case 4: Array with peak at start
    testFindPeak([4, 3, 2, 1]);
    
    // Test case 5: Single element array
    testFindPeak([1]);
}

// Execute tests if running directly
if (require.main === module) {
    runTests();
}

// Export for use in other modules
module.exports = {
    findPeakElement
};