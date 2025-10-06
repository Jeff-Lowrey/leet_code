/**
 * 27. Remove Element
 * Medium
 *
 * Remove Element - LeetCode Problem Implementation This function removes all occurrences of a specified value from an array in-place and returns the new length of the array. @param {number[]} nums - The input array of numbers @param {number} val - The value to remove from the array @return {number} - The new length of the array after removing elements
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Remove Element is to understand the core problem pattern
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
 * Remove Element - LeetCode Problem Implementation
 * 
 * This function removes all occurrences of a specified value from an array in-place
 * and returns the new length of the array.
 * 
 * @param {number[]} nums - The input array of numbers
 * @param {number} val - The value to remove from the array
 * @return {number} - The new length of the array after removing elements
 */
function removeElement(nums, val) {
    // Edge case: if array is empty
    if (!nums || nums.length === 0) {
        return 0;
    }

    // Use two-pointer technique
    let k = 0; // k will be the position for next valid element

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // If current element is not the value to remove
        if (nums[i] !== val) {
            // Place it at position k and increment k
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}

// Test cases
function runTests() {
    // Test Case 1: Regular case
    const test1 = [3, 2, 2, 3];
    console.log('Test 1:');
    console.log('Input array:', test1);
    console.log('Remove value:', 3);
    const result1 = removeElement(test1, 3);
    console.log('New length:', result1);
    console.log('Modified array:', test1.slice(0, result1));

    // Test Case 2: Array with no elements to remove
    const test2 = [1, 2, 3, 4];
    console.log('\nTest 2:');
    console.log('Input array:', test2);
    console.log('Remove value:', 5);
    const result2 = removeElement(test2, 5);
    console.log('New length:', result2);
    console.log('Modified array:', test2.slice(0, result2));

    // Test Case 3: Empty array
    const test3 = [];
    console.log('\nTest 3:');
    console.log('Input array:', test3);
    console.log('Remove value:', 1);
    const result3 = removeElement(test3, 1);
    console.log('New length:', result3);
    console.log('Modified array:', test3.slice(0, result3));

    // Test Case 4: Array with all elements to be removed
    const test4 = [1, 1, 1, 1];
    console.log('\nTest 4:');
    console.log('Input array:', test4);
    console.log('Remove value:', 1);
    const result4 = removeElement(test4, 1);
    console.log('New length:', result4);
    console.log('Modified array:', test4.slice(0, result4));
}

// Export the function for use in other modules
module.exports = removeElement;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}