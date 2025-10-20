/**
 * # Difficulty: Medium
 *
 * # 204. Count Primes
 *
 * Given an integer n, return the number of prime numbers that are strictly less than n.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 10:</dd>
 * <dt>Output:</dt>
 * <dd>Array: [2, 3, 4, 5, 6, 7, 8, 9]</dd>
 * <dt>Explanation:</dt>
 * <dd>Count of primes less than 10 is 4: [2,3,5,7]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: * O(n log log n)
**Space Complexity**: * O(n)

 *
 * ### INTUITION:
 * Use Sieve of Eratosthenes: mark all multiples of each prime as composite. Count remaining unmarked numbers.
 *
 * ### APPROACH:
 * 1. **Create boolean array**: is_prime[i] = True initially
 * 2. **Mark non-primes**: For each prime p, mark p², p²+p, p²+2p... as composite
 * 3. **Count primes**: Count True values in array
 *
 * ### WHY THIS WORKS:
 * - Every composite number has a prime factor ≤ √n
 * - By marking multiples of each prime, we identify all composites
 * - Remaining numbers must be prime
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * n = 10:
 * Array: [2, 3, 4, 5, 6, 7, 8, 9]
 *
 * Mark multiples of 2: [2, 3, X, 5, X, 7, X, X]
 * Mark multiples of 3: [2, 3, X, 5, X, 7, X, X]
 * Mark multiples of 5: (5² = 25 > 10, skip)
 *
 * Primes: [2, 3, 5, 7] → Count = 4
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n log log n)
 * Sieve of Eratosthenes complexity
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * Boolean array of size n
 *
 * ### EDGE CASES:
 * - n ≤ 2: Return 0
 * - n = 3: Return 1 (only 2)
 * - Large n: Memory usage
 *
 * </details>
 */

/**
 * Main solution for Problem 204: Count Primes
 *
 * @param {number} n - Upper bound (exclusive)
 * @return {number} - Count of prime numbers less than n
 *
 * Time Complexity: O(n log log n)
 * Space Complexity: O(n)
 */
function solve(n) {
  if (n <= 2) {
    return 0;
  }

  // Initialize array: isPrime[i] = true means i is prime
  const isPrime = new Array(n).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  // Sieve of Eratosthenes
  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      // Mark all multiples of i as composite
      // Start at i*i because smaller multiples already marked
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  // Count remaining primes
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      count++;
    }
  }

  return count;
}

/**
 * Test cases for Problem 204: Count Primes
 */
function testSolution() {
  console.log("Testing 204. Count Primes");

  // Test case 1: n = 10 (primes: 2, 3, 5, 7)
  const result1 = solve(10);
  const expected1 = 4;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );

  // Test case 2: n = 0
  const result2 = solve(0);
  const expected2 = 0;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );

  // Test case 3: n = 1
  const result3 = solve(1);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );

  // Test case 4: n = 2
  const result4 = solve(2);
  const expected4 = 0;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );

  // Test case 5: n = 3
  const result5 = solve(3);
  const expected5 = 1;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );

  // Test case 6: n = 20 (primes: 2,3,5,7,11,13,17,19)
  const result6 = solve(20);
  const expected6 = 8;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );

  // Test case 7: n = 100
  const result7 = solve(100);
  const expected7 = 25;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );

  console.log("All test cases passed for 204. Count Primes!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 204. Count Primes ===");
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
