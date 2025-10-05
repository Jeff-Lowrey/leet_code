I'll help you create a solution for Permutations II in JavaScript. This implementation will handle arrays with duplicate numbers and return unique permutations.

```javascript
/**
 * Permutations II - Find all unique permutations in an array that may contain duplicates
 * 
 * @param {number[]} nums - Input array of numbers (may contain duplicates)
 * @return {number[][]} - Array of all unique permutations
 */
function permuteUnique(nums) {
    // Edge case: empty array
    if (!nums || nums.length === 0) {
        return [];
    }

    // Sort the array first to handle duplicates efficiently
    nums.sort((a, b) => a - b);
    const result = [];
    const used = new Array(nums.length).fill(false);
    
    /**
     * Backtracking helper function to generate permutations
     * @param {number[]} current - Current permutation being built
     */
    function backtrack(current) {
        // Base case: if current permutation length equals input array length
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            // Skip if number is already used in current permutation
            if (used[i]) continue;

            // Skip duplicates to avoid duplicate permutations
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

            // Include current number in permutation
            used[i] = true;
            current.push(nums[i]);

            // Recursive call to generate next number in permutation
            backtrack(current);

            // Backtrack: remove current number and mark as unused
            current.pop();
            used[i] = false;
        }
    }

    // Start backtracking with empty permutation
    backtrack([]);
    return result;
}

// Example usage and test cases
function runTests() {
    const testCases = [
        [1, 1, 2],
        [1, 2, 3],
        [1],
        [1, 1, 1],
        []
    ];

    console.log("Running test cases for permuteUnique:");
    testCases.forEach((test, index) => {
        console.log(`\nTest case ${index + 1}:`);
        console.log("Input:", test);
        console.log("Output:", permuteUnique(test));
    });
}

// Export the function for potential module usage
module.exports = {
    permuteUnique
};

// Run tests if not being imported as a module
if (require.main === module) {
    runTests();
}
```

This implementation includes:

1. A main `permuteUnique` function that handles finding all unique permutations
2. A backtracking approach to generate permutations efficiently
3. Proper handling of duplicates by sorting the array first
4. Edge case handling for empty arrays
5. Test cases to demonstrate functionality
6. Clear comments explaining the implementation
7. Module exports for potential reuse

Key features:

- Uses backtracking algorithm to generate permutations
- Handles duplicate numbers by skipping redundant permutations
- Time complexity: O(n!) where n is the length of the input array
- Space complexity: O(n) for the recursion stack

The solution follows JavaScript best practices and includes:
- Proper variable naming
- Clear function structure
- Comprehensive comments
- Error handling
- Test cases
- Module exports

You can run this file directly to see the test cases in action, or import the `permuteUnique` function into other modules.