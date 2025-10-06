/**
 * 15. 3Sum
 * Medium
 *
 * 3Sum - Find all unique triplets in the array that sum up to zero LeetCode Problem 15 @param {number[]} nums - Array of integers @return {number[][]} - Array of triplets that sum to zero
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving 3Sum is to understand the core problem pattern
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
 * 3Sum - Find all unique triplets in the array that sum up to zero
 * LeetCode Problem 15
 * 
 * @param {number[]} nums - Array of integers
 * @return {number[][]} - Array of triplets that sum to zero
 */
function threeSum(nums) {
    // Handle edge cases
    if (!nums || nums.length < 3) {
        return [];
    }

    // Sort the array to help with duplicate handling and efficient searching
    nums.sort((a, b) => a - b);
    
    const result = [];
    const n = nums.length;

    // Iterate through the array, using current number as the first number of triplet
    for (let i = 0; i < n - 2; i++) {
        // Skip duplicates for first number
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // Use two pointers technique for remaining two numbers
        let left = i + 1;
        let right = n - 1;

        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];

            if (currentSum === 0) {
                // Found a valid triplet
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for second number
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                // Skip duplicates for third number
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }

                // Move both pointers
                left++;
                right--;
            } else if (currentSum < 0) {
                // Sum is too small, increment left pointer
                left++;
            } else {
                // Sum is too large, decrement right pointer
                right--;
            }
        }
    }

    return result;
}

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [-1, 0, 1, 2, -1, -4],
            expected: [[-1, -1, 2], [-1, 0, 1]]
        },
        {
            input: [0, 0, 0],
            expected: [[0, 0, 0]]
        },
        {
            input: [],
            expected: []
        }
    ];

    testCases.forEach((test, index) => {
        const result = threeSum(test.input);
        console.log(`Test ${index + 1}:`);
        console.log('Input:', test.input);
        console.log('Output:', result);
        console.log('Expected:', test.expected);
        console.log('---');
    });
}

// Export the function for use in other modules
module.exports = threeSum;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}