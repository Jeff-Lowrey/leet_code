I'll help you create a complete binary search implementation in JavaScript that meets all the requirements. Here's the solution:

```javascript
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
```

This implementation includes:

1. A clean and efficient binary search implementation with O(log n) time complexity
2. Proper error handling for edge cases (empty arrays, target not found)
3. Detailed comments explaining the implementation and logic
4. Test cases to verify the implementation
5. Module exports for use in other files
6. Safe middle index calculation to prevent integer overflow
7. Following JavaScript best practices and conventions

The code is structured as a complete, runnable file that can be:
- Imported as a module in other files
- Run directly to execute the test cases
- Used as a standalone binary search implementation

The implementation handles all edge cases appropriately and includes comprehensive test cases to verify correct functionality.