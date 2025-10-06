/**
 * 18. 4Sum
 * Medium
 *
 * 4Sum - Find all unique quadruplets in the array that sum up to the target @param {number[]} nums - Array of integers @param {number} target - Target sum @return {number[][]} - Array of quadruplets that sum to target
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving 4Sum is to understand the core problem pattern
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
 * 4Sum - Find all unique quadruplets in the array that sum up to the target
 * 
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of quadruplets that sum to target
 */
function fourSum(nums, target) {
    // Handle edge cases
    if (!nums || nums.length < 4) {
        return [];
    }

    // Sort the array to handle duplicates and enable two-pointer technique
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;

    // Iterate through first number of quadruplet
    for (let i = 0; i < n - 3; i++) {
        // Skip duplicates for first number
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // Iterate through second number of quadruplet
        for (let j = i + 1; j < n - 2; j++) {
            // Skip duplicates for second number
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            // Use two-pointer technique for remaining two numbers
            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                // Calculate current sum
                const currentSum = nums[i] + nums[j] + nums[left] + nums[right];

                if (currentSum === target) {
                    // Found a valid quadruplet
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    // Skip duplicates for third number
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    // Skip duplicates for fourth number
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }

                    // Move pointers
                    left++;
                    right--;
                } else if (currentSum < target) {
                    // Sum is too small, increment left pointer
                    left++;
                } else {
                    // Sum is too large, decrement right pointer
                    right--;
                }
            }
        }
    }

    return result;
}

/**
 * Test cases
 */
function runTests() {
    // Test case 1: Basic example
    console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
    // Expected: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

    // Test case 2: All zeros
    console.log(fourSum([0, 0, 0, 0], 0));
    // Expected: [[0,0,0,0]]

    // Test case 3: Empty array
    console.log(fourSum([], 0));
    // Expected: []

    // Test case 4: Array with less than 4 elements
    console.log(fourSum([1, 2, 3], 6));
    // Expected: []

    // Test case 5: Larger numbers
    console.log(fourSum([1000000000, 1000000000, 1000000000, 1000000000], 4000000000));
    // Expected: [[1000000000,1000000000,1000000000,1000000000]]
}

// Export the function for use in other modules
module.exports = fourSum;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}