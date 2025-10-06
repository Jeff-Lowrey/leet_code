/**
 * 704. Binary Search
 * Medium
 *
 * Binary Search Implementation Time Complexity: O(log n) Space Complexity: O(1)
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Binary Search is to understand the core problem pattern
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
 * Binary Search Implementation
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums - The sorted array to search in
 * @param {number} target - The target value to find
 * @return {number} - The index of target if found, otherwise -1
 */
function binarySearch(nums, target) {
    // Handle edge case of empty array
    if (!nums || nums.length === 0) {
        return -1;
    }

    let left = 0;
    let right = nums.length - 1;

    // Continue searching while left pointer is less than or equal to right pointer
    while (left <= right) {
        // Calculate middle index
        // Using Math.floor((left + right) / 2) can cause integer overflow
        // This implementation avoids that issue
        const mid = left + Math.floor((right - left) / 2);

        // If target is found at middle, return its index
        if (nums[mid] === target) {
            return mid;
        }
        
        // If target is greater than middle element,
        // ignore left half and search in right half
        if (nums[mid] < target) {
            left = mid + 1;
        }
        // If target is less than middle element,
        // ignore right half and search in left half
        else {
            right = mid - 1;
        }
    }

    // Target not found in array
    return -1;
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    // Test case 1: Normal case
    console.log(binarySearch([1, 2, 3, 4, 5], 3) === 2 ? "✓" : "✗", "Test 1");

    // Test case 2: Target at beginning
    console.log(binarySearch([1, 2, 3, 4, 5], 1) === 0 ? "✓" : "✗", "Test 2");

    // Test case 3: Target at end
    console.log(binarySearch([1, 2, 3, 4, 5], 5) === 4 ? "✓" : "✗", "Test 3");

    // Test case 4: Target not in array
    console.log(binarySearch([1, 2, 3, 4, 5], 6) === -1 ? "✓" : "✗", "Test 4");

    // Test case 5: Empty array
    console.log(binarySearch([], 1) === -1 ? "✓" : "✗", "Test 5");

    // Test case 6: Single element array (target found)
    console.log(binarySearch([1], 1) === 0 ? "✓" : "✗", "Test 6");

    // Test case 7: Single element array (target not found)
    console.log(binarySearch([1], 2) === -1 ? "✓" : "✗", "Test 7");
}

// Export the function for use in other modules
module.exports = binarySearch;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}