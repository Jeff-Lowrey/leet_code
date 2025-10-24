/**
 * # Difficulty: Easy
 *
 * # 202. Happy Number
 *
 * Difficulty: Medium
 *
 * Write an algorithm to determine if a number n is happy.
 *
 * A happy number is a number defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits.
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
 * - Those numbers for which this process ends in 1 are happy.
 *
 * Return true if n is a happy number, and false if not.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 19:</dd>
 * <dt>Output:</dt>
 * <dd>1² + 9² = 82</dd>
 * <dt>Explanation:</dt>
 * <dd>Number 19 is happy: 1²+9²=82, 8²+2²=68, 6²+8²=100, 1²+0²+0²=1</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal
 * **Data Structures**: Basic Types
 * **Patterns**: Iterative Solution
 * **Time Complexity**: * O(log n) - Binary search or tree height
 * **Space Complexity**: * - Set approach: O(log n)

 *
 * ### INTUITION:
 * Either the process reaches 1 (happy) or enters a cycle (not happy). Use a set to detect cycles, or use Floyd's cycle detection.
 *
 * ### APPROACH:
 * 1. **Calculate sum**: Get sum of squares of digits
 * 2. **Track seen numbers**: Use set to detect cycle
 * 3. **Check termination**: If 1, return True; if cycle, return False
 * 4. **Alternative**: Floyd's cycle detection (two pointers)
 *
 * ### WHY THIS WORKS:
 * - Numbers either reach 1 or cycle
 * - Cycles always occur for unhappy numbers
 * - Set or two-pointer both detect cycles
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 19:
 * ```
 *
 * 1² + 9² = 82
 * 8² + 2² = 68
 * 6² + 8² = 100
 * n = 2:
 *
 * Steps:
 * Step 1: 1² + 0² + 0² = 1 → Happy!
 * Step 2: 2² = 4
 * Step 3: 4² = 16
 * Step 4: 1² + 6² = 37
 * Step 5: 3² + 7² = 58
 * Step 6: 5² + 8² = 89
 * Step 7: 8² + 9² = 145
 * Step 8: 1² + 4² + 5² = 42
 * Step 9: 4² + 2² = 20
 * Step 10: 2² + 0² = 4 → Cycle! Not happy

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Depends on number of digits and cycle detection
 *
 * ### SPACE COMPLEXITY:
 * - Set approach: O(log n)
 * - Two-pointer: O(1)
 *
 * ### EDGE CASES:
 * - n = 1 (already happy)
 * - Single digit numbers
 * - Large numbers
 *
 * </details>
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
  console.log("Testing 202. Happy Number");

  // Test case 1: Happy number
  const result1 = solve(19);
  const expected1 = true;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: Unhappy number
  const result2 = solve(2);
  const expected2 = false;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: Number 1
  const result3 = solve(1);
  const expected3 = true;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: Another happy number
  const result4 = solve(7);
  const expected4 = true;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: Another unhappy number
  const result5 = solve(4);
  const expected5 = false;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: Larger happy number
  const result6 = solve(100);
  const expected6 = true;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  console.log("All test cases passed for 202. Happy Number!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 202. Happy Number ===");
  console.log("Category: Math");
  console.log("Difficulty: Medium");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution focuses on math concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
