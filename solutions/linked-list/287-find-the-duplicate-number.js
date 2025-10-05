I'll help you create a JavaScript implementation for finding a duplicate number in an array. I'll write a complete solution with comments and proper structure.

```javascript
/**
 * Find Duplicate Number - LeetCode 287
 * 
 * Problem: Given an array nums containing n + 1 integers where each integer 
 * is between 1 and n (inclusive), prove that at least one duplicate number 
 * must exist. Assume that there is only one duplicate number, find the duplicate one.
 * 
 * Constraints:
 * - All numbers in the array are in the range [1, n]
 * - The array contains n + 1 integers
 * - Only one number is duplicated
 * - The duplicate number can appear multiple times
 */

/**
 * Finds the duplicate number in an array using Floyd's Tortoise and Hare algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * @param {number[]} nums - Array of numbers containing one duplicate
 * @return {number} - The duplicate number
 */
function findDuplicate(nums) {
    if (!nums || nums.length < 2) {
        return -1; // Invalid input
    }

    // Phase 1: Finding the intersection point of the two runners
    let tortoise = nums[0];
    let hare = nums[0];

    do {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    } while (tortoise !== hare);

    // Phase 2: Finding the entrance to the cycle
    tortoise = nums[0];
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }

    return hare;
}

/**
 * Alternative implementation using Set
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * @param {number[]} nums - Array of numbers containing one duplicate
 * @return {number} - The duplicate number
 */
function findDuplicateUsingSet(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    
    return -1; // No duplicate found
}

// Test cases
function runTests() {
    const testCases = [
        [1, 3, 4, 2, 2],
        [3, 1, 3, 4, 2],
        [1, 1],
        [1, 1, 2],
    ];

    console.log("Testing Floyd's Tortoise and Hare method:");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`, test);
        console.log(`Result: ${findDuplicate(test)}\n`);
    });

    console.log("Testing Set method:");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`, test);
        console.log(`Result: ${findDuplicateUsingSet(test)}\n`);
    });
}

// Export functions for external use
module.exports = {
    findDuplicate,
    findDuplicateUsingSet
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}
```

This implementation provides two different approaches to find a duplicate number in an array:

1. **Floyd's Tortoise and Hare Algorithm** (`findDuplicate`):
   - Uses constant space complexity O(1)
   - Treats the array as a linked list where each value points to an index
   - Finds the duplicate by detecting a cycle in the constructed linked list

2. **Set-based Approach** (`findDuplicateUsingSet`):
   - Uses linear space complexity O(n)
   - Keeps track of seen numbers using a Set
   - Returns the first number that's seen twice

The code includes:
- Detailed comments explaining the implementation
- Two different solution approaches
- Test cases to verify the implementation
- Proper error handling
- Module exports for external use
- A test runner that executes when the file is run directly

To use this code, you can either:
1. Import the functions into another file using require
2. Run the file directly to see the test results

The code follows JavaScript best practices and conventions, including:
- Clear variable naming
- Proper function documentation
- Error handling
- Modular design
- Clean code structure