/**
 * 167. Two Sum Ii Input Array Is Sorted
 * Medium
 *
 * Two Sum II - Input Array Is Sorted Problem: Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers (1-indexed) as an integer array. The solution must use only constant extra space and the input array is 1-indexed. @param {number[]} numbers - The input array of integers (sorted in non-decreasing order) @param {number} target - The target sum to find @return {number[]} - Array containing the 1-indexed positions of the two numbers
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Two Sum Ii Input Array Is Sorted is to understand the core problem pattern
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
 * Two Sum II - Input Array Is Sorted
 * 
 * Problem: Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
 * find two numbers such that they add up to a specific target number.
 * Return the indices of the two numbers (1-indexed) as an integer array.
 * 
 * The solution must use only constant extra space and the input array is 1-indexed.
 * 
 * @param {number[]} numbers - The input array of integers (sorted in non-decreasing order)
 * @param {number} target - The target sum to find
 * @return {number[]} - Array containing the 1-indexed positions of the two numbers
 */
function twoSum(numbers, target) {
    // Input validation
    if (!Array.isArray(numbers) || numbers.length < 2) {
        throw new Error('Invalid input array');
    }

    // Initialize two pointers: left at start and right at end
    let left = 0;
    let right = numbers.length - 1;

    // Continue until pointers meet
    while (left < right) {
        const currentSum = numbers[left] + numbers[right];

        if (currentSum === target) {
            // Found the pair, return 1-indexed positions
            return [left + 1, right + 1];
        } else if (currentSum < target) {
            // Sum is too small, move left pointer right
            left++;
        } else {
            // Sum is too large, move right pointer left
            right--;
        }
    }

    // No solution found
    return [];
}

/**
 * Test cases to verify the implementation
 */
function runTests() {
    // Test case 1: Basic case
    console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [1, 2]

    // Test case 2: Numbers in middle
    console.log(twoSum([2, 3, 4], 6)); // Expected: [1, 3]

    // Test case 3: Adjacent numbers
    console.log(twoSum([1, 2, 3, 4, 4, 9, 56, 90], 8)); // Expected: [4, 5]

    // Test case 4: Negative numbers
    console.log(twoSum([-1, 0], -1)); // Expected: [1, 2]
}

// Export the function for use in other modules
module.exports = twoSum;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}