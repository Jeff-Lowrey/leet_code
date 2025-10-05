I'll help you create a JavaScript implementation for finding the range of a target number in a sorted array. I'll write the solution following the requirements and best practices.

```javascript
/**
 * Find Range - JavaScript Implementation
 * This solution finds the first and last position of a target number in a sorted array
 * Time Complexity: O(log n) - uses binary search
 * Space Complexity: O(1)
 */

/**
 * @param {number[]} nums - Sorted array of numbers
 * @param {number} target - Target number to find
 * @return {number[]} - Array containing first and last position of target
 */
function findRange(nums, target) {
    // Handle empty array case
    if (!nums || nums.length === 0) {
        return [-1, -1];
    }

    // Find leftmost position
    const leftIndex = findPosition(nums, target, true);
    
    // If target not found, return [-1, -1]
    if (leftIndex === -1) {
        return [-1, -1];
    }
    
    // Find rightmost position
    const rightIndex = findPosition(nums, target, false);
    
    return [leftIndex, rightIndex];
}

/**
 * Helper function to find leftmost or rightmost position of target
 * @param {number[]} nums - Sorted array of numbers
 * @param {number} target - Target number to find
 * @param {boolean} leftmost - If true, find leftmost position; if false, find rightmost
 * @return {number} - Index of target position
 */
function findPosition(nums, target, leftmost) {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] === target) {
            result = mid;
            if (leftmost) {
                // Continue searching left half for leftmost position
                right = mid - 1;
            } else {
                // Continue searching right half for rightmost position
                left = mid + 1;
            }
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Export the function for use in other modules
module.exports = findRange;

// Example usage and test cases
if (require.main === module) {
    // Test cases
    const testCases = [
        {
            nums: [5, 7, 7, 8, 8, 10],
            target: 8,
            expected: [3, 4]
        },
        {
            nums: [5, 7, 7, 8, 8, 10],
            target: 6,
            expected: [-1, -1]
        },
        {
            nums: [],
            target: 0,
            expected: [-1, -1]
        },
        {
            nums: [1],
            target: 1,
            expected: [0, 0]
        },
        {
            nums: [1, 1, 1, 1, 1],
            target: 1,
            expected: [0, 4]
        }
    ];

    // Run test cases
    testCases.forEach((test, index) => {
        const result = findRange(test.nums, test.target);
        console.log(`Test case ${index + 1}:`);
        console.log(`Input array: [${test.nums}]`);
        console.log(`Target: ${test.target}`);
        console.log(`Expected: [${test.expected}]`);
        console.log(`Result: [${result}]`);
        console.log(`Status: ${JSON.stringify(result) === JSON.stringify(test.expected) ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}
```

This implementation includes:

1. A main `findRange` function that returns the range (first and last positions) of a target number in a sorted array
2. A helper `findPosition` function that uses binary search to find either the leftmost or rightmost position of the target
3. Proper error handling for edge cases (empty arrays, target not found)
4. Time complexity of O(log n) using binary search
5. Clear comments and documentation
6. Test cases with various scenarios
7. Module exports for use in other files
8. Following JavaScript best practices and conventions

The solution uses binary search twice:
1. First to find the leftmost position of the target
2. Then to find the rightmost position of the target

The code handles various edge cases:
- Empty array
- Target not found in array
- Single element array
- Array with all same elements
- Normal cases with multiple occurrences of target

The test cases demonstrate the functionality with different scenarios and provide clear output for verification.