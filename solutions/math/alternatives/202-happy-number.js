/**
 * 202. Happy Number
 * Easy
 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * A happy number eventually reaches 1 when replacing it with the sum of squares of
 * its digits repeatedly. Unhappy numbers cycle infinitely. Use Floyd's cycle detection
 * (slow/fast pointers) to detect cycles without extra space.
 *
 * APPROACH:
 * 1. **Helper function**: Calculate sum of squares of digits
 * 2. **Floyd's algorithm**: Use slow (1 step) and fast (2 steps) pointers
 * 3. **Detect cycle**: If slow == fast, there's a cycle
 * 4. **Check result**: If cycle point is 1, it's happy; otherwise unhappy
 *
 * WHY THIS WORKS:
 * - Happy numbers eventually reach 1 (cycle at 1)
 * - Unhappy numbers cycle without reaching 1
 * - Floyd's algorithm detects cycles in O(1) space
 * - Two sequences converge at cycle point
 *
 * TIME COMPLEXITY: O(log n) - number of digits decreases
 * SPACE COMPLEXITY: O(1) - only constant variables
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: 19
Step 1: 1^2 + 9^2 = 1 + 81 = 82
Step 2: 8^2 + 2^2 = 64 + 4 = 68
Step 3: 6^2 + 8^2 = 36 + 64 = 100
Step 4: 1^2 + 0^2 + 0^2 = 1
Output: true (reached 1)

Input: 2
Step 1: 2^2 = 4
Step 2: 4^2 = 16
Step 3: 1^2 + 6^2 = 37
Step 4: 3^2 + 7^2 = 58
Step 5: 5^2 + 8^2 = 89
...cycles without reaching 1
Output: false
```
 *
 * EDGE CASES:
 * - n = 1: Already happy (return true)
 * - Single digit: Various behaviors (1 is happy, most others cycle)
 * - Large numbers: Sum of squares reduces size quickly
 */

/**
 * Helper function to calculate sum of squares of digits
 * @param {number} n - Input number
 * @return {number} - Sum of squares of digits
 */
function getSumOfSquares(n) {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }
    return sum;
}

/**
 * Main solution for Problem 202: Happy Number
 *
 * @param {number} n - Positive integer
 * @return {boolean} - True if n is a happy number, false otherwise
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function solve(n) {
    let slow = n;
    let fast = n;

    do {
        slow = getSumOfSquares(slow);
        fast = getSumOfSquares(getSumOfSquares(fast));
    } while (slow !== fast);

    // If they meet at 1, it's a happy number
    return slow === 1;
}

/**
 * Test cases for Problem 202: Happy Number
 */
function testSolution() {
    console.log('Testing 202. Happy Number');

    // Test case 1: Happy number
    const result1 = solve(19);
    const expected1 = true;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Unhappy number
    const result2 = solve(2);
    const expected2 = false;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Number 1
    const result3 = solve(1);
    const expected3 = true;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Another happy number
    const result4 = solve(7);
    const expected4 = true;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Another unhappy number
    const result5 = solve(4);
    const expected5 = false;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Larger happy number
    const result6 = solve(100);
    const expected6 = true;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    console.log('All test cases passed for 202. Happy Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 202. Happy Number ===');
    console.log('Category: Math');
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
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
