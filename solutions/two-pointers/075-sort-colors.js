I'll help you create a solution for the Sort Colors problem. I'll write a complete JavaScript implementation that follows the requirements and includes proper documentation.

```javascript
/**
 * Sort Colors (LeetCode #75)
 * 
 * Problem: Given an array nums with n objects colored red, white, or blue, 
 * sort them in-place so that objects of the same color are adjacent, with the 
 * colors in the order red, white, and blue.
 * 
 * We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.
 * 
 * @param {number[]} nums - Array of numbers (0, 1, 2) representing colors
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const sortColors = function(nums) {
    // Edge case: if array is empty or has only one element
    if (!nums || nums.length <= 1) {
        return;
    }

    // Initialize pointers
    let left = 0;          // pointer for 0s (red)
    let current = 0;       // current position
    let right = nums.length - 1;  // pointer for 2s (blue)

    /**
     * Use Dutch National Flag algorithm:
     * - All elements to the left of 'left' are 0s
     * - All elements to the right of 'right' are 2s
     * - Elements between 'left' and 'current' are 1s
     */
    while (current <= right) {
        if (nums[current] === 0) {
            // Swap current element with left pointer
            [nums[left], nums[current]] = [nums[current], nums[left]];
            left++;
            current++;
        } else if (nums[current] === 2) {
            // Swap current element with right pointer
            [nums[right], nums[current]] = [nums[current], nums[right]];
            right--;
        } else {
            // Element is 1, just move forward
            current++;
        }
    }
};

// Test cases
const testCases = [
    [2, 0, 2, 1, 1, 0],
    [2, 0, 1],
    [0],
    [1],
    [],
    [1, 2, 0, 1, 2, 1, 0]
];

// Run test cases
testCases.forEach((test, index) => {
    const nums = [...test];
    console.log(`Test Case ${index + 1}:`);
    console.log('Before:', nums);
    sortColors(nums);
    console.log('After:', nums);
    console.log('---');
});

// Export the function for potential module usage
module.exports = sortColors;
```

This implementation includes:

1. A complete solution using the Dutch National Flag algorithm
2. Detailed documentation and comments explaining the approach
3. In-place sorting as required by the problem
4. Efficient O(n) time complexity and O(1) space complexity
5. Test cases to verify the implementation
6. Proper error handling for edge cases
7. Module exports for potential reuse

The algorithm uses three pointers to sort the array in a single pass:
- `left`: keeps track of where 0s should go
- `current`: the current element being examined
- `right`: keeps track of where 2s should go

The solution follows JavaScript best practices and conventions, including:
- ES6+ syntax
- Destructuring for swapping values
- Clear variable naming
- Consistent code formatting
- Proper error handling

The test cases cover various scenarios including:
- Standard cases with mixed numbers
- Arrays with single elements
- Empty arrays
- Arrays with repeated elements

You can save this code to the specified path and run it directly with Node.js to see the test results.