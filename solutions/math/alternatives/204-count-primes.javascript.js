/**
 * 204. Count Primes - JavaScript Implementation
 *
 * Given an integer n, return the number of prime numbers that are less than n.
 *
 * Time Complexity: O(n log log n)
 * Space Complexity: O(n)
 */

/**
 * Count prime numbers less than n using Sieve of Eratosthenes.
 * @param {number} n - The upper bound (exclusive)
 * @return {number} Number of prime numbers less than n
 */
function countPrimes(n) {
    if (n <= 2) {
        return 0;
    }

    // Initialize boolean array - assume all numbers are prime initially
    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false; // 0 and 1 are not prime

    // Sieve of Eratosthenes
    let i = 2;
    while (i * i < n) {
        if (isPrime[i]) {
            // Mark all multiples of i as not prime
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
        i++;
    }

    // Count prime numbers
    return isPrime.reduce((count, prime) => count + (prime ? 1 : 0), 0);
}

/**
 * Optimized version that only checks odd numbers after 2.
 * @param {number} n - The upper bound (exclusive)
 * @return {number} Number of prime numbers less than n
 */
function countPrimesOptimized(n) {
    if (n <= 2) {
        return 0;
    }
    if (n === 3) {
        return 1;
    }

    // Start with 2 as the first prime
    let count = 1; // Count 2 as prime

    // Only check odd numbers from 3 onwards
    const isPrime = new Array(Math.floor((n - 1) / 2)).fill(true);

    // For odd numbers: index i represents number 2*i + 3
    for (let i = 0; i < isPrime.length; i++) {
        if (isPrime[i]) {
            const p = 2 * i + 3;
            // Mark multiples of p as not prime, starting from p^2
            for (let j = p * p; j < n; j += 2 * p) {
                isPrime[Math.floor((j - 3) / 2)] = false;
            }
        }
    }

    return count + isPrime.reduce((sum, prime) => sum + (prime ? 1 : 0), 0);
}

/**
 * Brute force approach for comparison (less efficient).
 * @param {number} n - The upper bound (exclusive)
 * @return {number} Number of prime numbers less than n
 */
function countPrimesBruteForce(n) {
    /**
     * Check if a number is prime.
     * @param {number} num - The number to check
     * @return {boolean} True if num is prime, false otherwise
     */
    function isPrime(num) {
        if (num < 2) {
            return false;
        }
        if (num === 2) {
            return true;
        }
        if (num % 2 === 0) {
            return false;
        }

        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    let count = 0;
    for (let i = 2; i < n; i++) {
        if (isPrime(i)) {
            count++;
        }
    }
    return count;
}

// Test cases
if (typeof module !== 'undefined') {
    const testCases = [
        [10, 4],  // Primes less than 10: 2, 3, 5, 7
        [0, 0],   // No primes less than 0
        [1, 0],   // No primes less than 1
        [2, 0],   // No primes less than 2
        [3, 1],   // One prime less than 3: 2
        [5, 2],   // Two primes less than 5: 2, 3
        [20, 8],  // Primes less than 20: 2, 3, 5, 7, 11, 13, 17, 19
    ];

    console.log("Testing Sieve of Eratosthenes:");
    for (const [n, expected] of testCases) {
        const result = countPrimes(n);
        console.log(`n=${n}: expected=${expected}, got=${result}, ${result === expected ? '✓' : '✗'}`);
    }

    console.log("\nTesting optimized version:");
    for (const [n, expected] of testCases) {
        const result = countPrimesOptimized(n);
        console.log(`n=${n}: expected=${expected}, got=${result}, ${result === expected ? '✓' : '✗'}`);
    }

    // Test larger number with main algorithm only
    console.log(`\nTesting n=1000: ${countPrimes(1000)} primes`);
}

module.exports = { countPrimes, countPrimesOptimized, countPrimesBruteForce };