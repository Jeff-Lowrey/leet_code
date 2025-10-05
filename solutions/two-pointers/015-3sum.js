I'll help you create a complete JavaScript implementation for the 3Sum problem. I'll write the solution with clear comments and proper structure.

```javascript
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
```

This implementation includes:

1. A well-documented main function `threeSum` that solves the 3Sum problem
2. Efficient algorithm using sorting and two-pointer technique
3. Proper handling of edge cases
4. Duplicate handling to ensure unique triplets
5. Test cases with example inputs
6. Module exports for use in other files
7. Clear comments explaining the implementation
8. Proper error handling

The algorithm has the following characteristics:
- Time Complexity: O(n²) where n is the length of the input array
- Space Complexity: O(1) excluding the space needed for output

The solution handles various edge cases and includes test cases to verify the implementation. The code follows JavaScript best practices and conventions, making it both readable and maintainable.

To run the code, you can either:
1. Import it as a module in another file
2. Run it directly to see the test cases in action

The implementation efficiently finds all unique triplets in the array that sum to zero while avoiding duplicate combinations.