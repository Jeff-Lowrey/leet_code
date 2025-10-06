/**
 * 001. Two Sum
 * Medium
 *
 * This problem demonstrates key concepts in Arrays Hashing.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * The key insight is to use a hash `map` to store numbers we've seen so far.
For each number, we check if its `complement` (`target` - current_number)
exists in our hash `map`. This allows us to find the pair in a single pass.
 *
 * APPROACH:
 * 1. Create a hash `map` to store number -> index mapping
2. For each number in the array:
   - Calculate complement = target - current_number
   - If complement exists in hash map, we found our answer
   - Otherwise, store current number and its index in hash map
3. Return the indices when `complement` is found
 *
 * WHY THIS WORKS:
 * - Instead of checking every pair (O(n²)), we use hash map for O(1) lookup
- We only need to store numbers we've already seen
- When we find a complement, we know the current index and the stored index
 *
 * TIME COMPLEXITY: [TIME COMPLEXITY content will be added here]
 * SPACE COMPLEXITY: [SPACE COMPLEXITY content will be added here]
 *
 * EXAMPLE WALKTHROUGH:
 * ```
`nums` = [2,7,11,15], `target` = 9

Step 1: `num=2`, `complement=7`, seen={} → store {2: 0}
Step 2: `num=7`, `complement=2`, seen={2: 0} → `found! return` [0, 1]
```
 *
 * EDGE CASES:
 * [EDGE CASES content will be added here]
 */

/**
 * Main solution for Problem 001: Two Sum
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers that add up to target
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, target) {
    const seen = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }

        seen.set(nums[i], i);
    }

    return [];
}

/**
 * Test cases for Problem 001: Two Sum
 */
function testSolution() {
    console.log('Testing 001. Two Sum');

    // Test case 1: Basic functionality
    const result1 = solve([2, 7, 11, 15], 9);
    const expected1 = [0, 1];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Different indices
    const result2 = solve([3, 2, 4], 6);
    const expected2 = [1, 2];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Same numbers
    const result3 = solve([3, 3], 6);
    const expected3 = [0, 1];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    console.log('All test cases passed for 001. Two Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 001. Two Sum ===');
    console.log('Category: Arrays Hashing');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on arrays hashing concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
