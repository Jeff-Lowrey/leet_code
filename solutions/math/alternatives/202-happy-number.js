/**
 * 202. Happy Number - JavaScript Implementation
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
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */

/**
 * Determine if a number is happy using cycle detection with a set.
 * @param {number} n - The input number to check
 * @return {boolean} True if n is a happy number, false otherwise
 */
function isHappy(n) {
    /**
     * Calculate sum of squares of digits.
     * @param {number} num - The number to process
     * @return {number} Sum of squares of digits
     */
    function getSumOfSquares(num) {
        let total = 0;
        while (num > 0) {
            const digit = num % 10;
            total += digit * digit;
            num = Math.floor(num / 10);
        }
        return total;
    }

    const seen = new Set();

    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getSumOfSquares(n);
    }

    return n === 1;
}

/**
 * Alternative solution using Floyd's cycle detection algorithm (tortoise and hare).
 * This approach uses constant space.
 * @param {number} n - The input number to check
 * @return {boolean} True if n is a happy number, false otherwise
 */
function isHappyFloydCycle(n) {
    /**
     * Calculate sum of squares of digits.
     * @param {number} num - The number to process
     * @return {number} Sum of squares of digits
     */
    function getSumOfSquares(num) {
        let total = 0;
        while (num > 0) {
            const digit = num % 10;
            total += digit * digit;
            num = Math.floor(num / 10);
        }
        return total;
    }

    let slow = n;
    let fast = n;

    // Move slow pointer one step and fast pointer two steps
    while (true) {
        slow = getSumOfSquares(slow);
        fast = getSumOfSquares(getSumOfSquares(fast));

        if (fast === 1) {
            return true;
        }
        if (slow === fast) {
            return false;
        }
    }
}

// Test cases
if (typeof module !== 'undefined') {
    const testCases = [
        [19, true],  // 19 is a happy number: 1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1
        [2, false],  // 2 is not a happy number (enters a cycle)
        [7, true],   // 7 is a happy number
        [10, true],  // 10 is a happy number
        [1, true],   // 1 is always happy
        [4, false]   // 4 enters the cycle 4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4
    ];

    console.log("Testing set-based solution:");
    for (const [n, expected] of testCases) {
        const result = isHappy(n);
        console.log(`n=${n}: expected=${expected}, got=${result}, ${result === expected ? '✓' : '✗'}`);
    }

    console.log("\nTesting Floyd's cycle detection solution:");
    for (const [n, expected] of testCases) {
        const result = isHappyFloydCycle(n);
        console.log(`n=${n}: expected=${expected}, got=${result}, ${result === expected ? '✓' : '✗'}`);
    }
}

module.exports = { isHappy, isHappyFloydCycle };