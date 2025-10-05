/**
 * 172. Factorial Trailing Zeros - JavaScript Implementation
 *
 * Given an integer n, return the number of trailing zeroes in n!.
 *
 * Note that n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

/**
 * Calculate the number of trailing zeros in n!.
 *
 * Trailing zeros are created by factors of 10, which come from 2*5.
 * Since there are always more factors of 2 than 5 in factorials,
 * we only need to count factors of 5.
 *
 * @param {number} n - The input integer
 * @return {number} Number of trailing zeros in n!
 */
function trailingZeroes(n) {
    let count = 0;
    let powerOf5 = 5;

    while (powerOf5 <= n) {
        count += Math.floor(n / powerOf5);
        powerOf5 *= 5;
    }

    return count;
}

/**
 * Alternative implementation using recursion.
 * @param {number} n - The input integer
 * @return {number} Number of trailing zeros in n!
 */
function trailingZeroesAlternative(n) {
    if (n < 5) {
        return 0;
    }
    return Math.floor(n / 5) + trailingZeroesAlternative(Math.floor(n / 5));
}

// Test cases
if (typeof module !== 'undefined') {
    const testCases = [
        [3, 0],   // 3! = 6, no trailing zeros
        [5, 1],   // 5! = 120, one trailing zero
        [0, 0],   // 0! = 1, no trailing zeros
        [25, 6],  // 25! has 6 trailing zeros
        [100, 24] // 100! has 24 trailing zeros
    ];

    console.log("Testing main implementation:");
    for (const [n, expected] of testCases) {
        const result = trailingZeroes(n);
        console.log(`n=${n}: expected=${expected}, got=${result}, ${result === expected ? '✓' : '✗'}`);
    }

    console.log("\nTesting alternative implementation:");
    for (const [n, expected] of testCases) {
        const result = trailingZeroesAlternative(n);
        console.log(`n=${n}: expected=${expected}, got=${result}, ${result === expected ? '✓' : '✗'}`);
    }
}

module.exports = { trailingZeroes, trailingZeroesAlternative };