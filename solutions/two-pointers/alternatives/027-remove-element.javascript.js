I'll help you create a JavaScript implementation for the "Remove Element" problem. I'll write a complete solution that meets all the requirements and includes proper documentation.

```javascript
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
```

This implementation includes:

1. A well-documented main function `removeElement` that solves the problem using the two-pointer technique
2. Comprehensive error handling for edge cases
3. A test suite with various test cases
4. Proper module exports for use in other files
5. Clear comments explaining the implementation
6. Efficient in-place array modification
7. Following JavaScript best practices and conventions

The solution uses the two-pointer technique to achieve O(n) time complexity and O(1) space complexity. It handles various edge cases including:
- Empty arrays
- Arrays with no elements to remove
- Arrays with all elements to be removed
- Regular cases with mixed elements

The test cases demonstrate the function's behavior with different inputs and show the modified arrays after removal.