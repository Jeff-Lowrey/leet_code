I'll help you create a solution for the Jump Game II problem. I'll write a complete JavaScript implementation with comments and proper error handling.

```javascript
/**
 * Jump Game II - Solution
 * 
 * Problem: Given an array of non-negative integers nums, you are initially positioned 
 * at the first index of the array. Each element in the array represents your maximum 
 * jump length at that position. Your goal is to reach the last index in the minimum 
 * number of jumps.
 * 
 * @param {number[]} nums - Array of non-negative integers representing maximum jump lengths
 * @return {number} - Minimum number of jumps needed to reach the last index
 */

const jump = function(nums) {
    // Handle edge cases
    if (!nums || nums.length <= 1) return 0;
    
    let jumps = 0;          // Count of jumps taken
    let maxReach = 0;       // Maximum index that can be reached
    let currentEnd = 0;     // End of current jump range
    
    // Iterate through the array (except last element as we don't need to jump from there)
    for (let i = 0; i < nums.length - 1; i++) {
        // Update the farthest index we can reach
        maxReach = Math.max(maxReach, i + nums[i]);
        
        // If we've reached the end of current jump range
        if (i === currentEnd) {
            jumps++;                // Take a jump
            currentEnd = maxReach;  // Update the end of new jump range
            
            // If we can already reach the last index, no need to continue
            if (currentEnd >= nums.length - 1) {
                break;
            }
        }
    }
    
    return jumps;
};

/**
 * Test cases
 */
function runTests() {
    const testCases = [
        {
            input: [2,3,1,1,4],
            expected: 2,
            description: "Basic test case"
        },
        {
            input: [2,3,0,1,4],
            expected: 2,
            description: "Test case with zero"
        },
        {
            input: [1],
            expected: 0,
            description: "Single element array"
        },
        {
            input: [1,2,3],
            expected: 2,
            description: "Small array"
        }
    ];

    testCases.forEach((test, index) => {
        const result = jump(test.input);
        console.log(`Test ${index + 1} (${test.description}):`);
        console.log(`Input: [${test.input}]`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Got: ${result}`);
        console.log(`Status: ${result === test.expected ? 'PASSED' : 'FAILED'}`);
        console.log('------------------------');
    });
}

// Export the function for use in other modules
module.exports = jump;

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}
```

This implementation includes:

1. A well-documented solution to the Jump Game II problem using a greedy approach
2. Efficient O(n) time complexity implementation
3. Proper error handling for edge cases
4. Comprehensive test cases
5. Clear comments explaining the logic
6. Module exports for use in other files
7. Automatic test execution when run directly

The algorithm uses a greedy approach where it:
- Keeps track of the maximum reachable position
- Updates jumps count when reaching the end of current jump range
- Optimizes by breaking early when the last index becomes reachable

The solution handles various edge cases including:
- Empty or single-element arrays
- Arrays with zeros
- Arrays where multiple jump patterns are possible

To use this code, you can either:
1. Import it as a module in another file
2. Run it directly to see the test results
3. Use the jump function with your own input arrays

The code follows JavaScript best practices and conventions, including proper variable naming, consistent formatting, and clear structure.