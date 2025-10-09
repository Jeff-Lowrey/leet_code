/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
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
    console.log('Testing 204. Count Primes');

    // Test case 1: n = 10 (primes: 2, 3, 5, 7)
    const result1 = solve(10);
    const expected1 = 4;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: n = 0
    const result2 = solve(0);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: n = 1
    const result3 = solve(1);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: n = 2
    const result4 = solve(2);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: n = 3
    const result5 = solve(3);
    const expected5 = 1;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: n = 20 (primes: 2,3,5,7,11,13,17,19)
    const result6 = solve(20);
    const expected6 = 8;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: n = 100
    const result7 = solve(100);
    const expected7 = 25;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    console.log('All test cases passed for 204. Count Primes!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 204. Count Primes ===');
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
