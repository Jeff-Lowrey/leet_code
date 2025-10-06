/**
 * 875. Koko Eating Bananas
 * Medium
 *
 * Koko Eating Bananas Implementation Problem: Find minimum eating speed K such that Koko can eat all bananas within H hours @param {number[]} piles - Array of banana piles where piles[i] represents bananas in ith pile @param {number} h - Hours available to eat all bananas @return {number} - Minimum eating speed required
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Koko Eating Bananas is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Koko Eating Bananas Implementation
 * Problem: Find minimum eating speed K such that Koko can eat all bananas within H hours
 * 
 * @param {number[]} piles - Array of banana piles where piles[i] represents bananas in ith pile
 * @param {number} h - Hours available to eat all bananas
 * @return {number} - Minimum eating speed required
 */

/**
 * Calculate total hours needed to eat all bananas at given speed
 * @param {number[]} piles - Array of banana piles
 * @param {number} speed - Eating speed to test
 * @return {number} - Total hours needed
 */
function calculateHours(piles, speed) {
    let totalHours = 0;
    for (let pile of piles) {
        // Math.ceil because Koko must finish each pile before moving to next
        totalHours += Math.ceil(pile / speed);
    }
    return totalHours;
}

/**
 * Find minimum eating speed required
 * @param {number[]} piles - Array of banana piles
 * @param {number} h - Hours available
 * @return {number} - Minimum eating speed
 */
function minEatingSpeed(piles, h) {
    // Edge case: invalid input
    if (!piles || piles.length === 0 || h < piles.length) {
        return 0;
    }

    // Binary search boundaries
    let left = 1; // Minimum possible speed
    let right = Math.max(...piles); // Maximum possible speed

    // Binary search for minimum valid speed
    while (left < right) {
        const mid = Math.floor(left + (right - left) / 2);
        const hoursNeeded = calculateHours(piles, mid);

        if (hoursNeeded <= h) {
            // Speed might be too high, try lower
            right = mid;
        } else {
            // Speed is too low, need higher
            left = mid + 1;
        }
    }

    return left;
}

// Export for testing/usage
module.exports = {
    minEatingSpeed,
    calculateHours
};

// Example usage and test cases
function runTests() {
    const testCases = [
        {
            piles: [3, 6, 7, 11],
            h: 8,
            expected: 4
        },
        {
            piles: [30, 11, 23, 4, 20],
            h: 5,
            expected: 30
        },
        {
            piles: [30, 11, 23, 4, 20],
            h: 6,
            expected: 23
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const { piles, h, expected } = testCases[i];
        const result = minEatingSpeed(piles, h);
        console.log(`Test case ${i + 1}:`);
        console.log(`Input: piles = [${piles}], h = ${h}`);
        console.log(`Expected: ${expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Uncomment to run tests
// runTests();