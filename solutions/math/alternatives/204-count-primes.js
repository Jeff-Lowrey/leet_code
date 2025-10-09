/**

 *
 * This problem demonstrates key concepts in Math.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Count prime numbers less than n using the Sieve of Eratosthenes algorithm.
 * Instead of checking each number for primality, mark all multiples of known
 * primes as composite. This is much more efficient for counting many primes.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - Every composite number has a prime factor <= its square root
 * - By marking multiples, we eliminate composites efficiently
 * - Starting at p*p (not 2*p) avoids redundant work
 * - Classic algorithm dating back to ancient Greece
 *
 * TIME COMPLEXITY: O(n log log n) - Sieve of Eratosthenes complexity
 * SPACE COMPLEXITY: O(n) - boolean array
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: n = 10
Step 1: isPrime = [F,F,T,T,T,T,T,T,T,T] (0,1 not prime, rest initially true)
Step 2: p=2: Mark 4,6,8 as composite -> [F,F,T,T,F,T,F,T,F,T]
Step 3: p=3: Mark 9 as composite -> [F,F,T,T,F,T,F,T,F,F]
Step 4: p=5: 5*5=25 > 10, done
Step 5: Count true values: 2,3,5,7 = 4
Output: 4
```
 *
 * EDGE CASES:
 * - n <= 2: Return 0 (no primes less than 2)
 * - n = 3: Return 1 (only 2 is prime)
 * - Large n: Efficient algorithm handles well
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
