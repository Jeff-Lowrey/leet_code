/**
 * # 258. Add Digits
 *
 * Solve problem #258: Add Digits
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>input data here</dd>
 * <dt>Output:</dt>
 * <dd>output data here</dd>
 * <dt>Explanation:</dt>
 * <dd>Explanation of the solution</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: * - Digital root formula
 * **Data Structures**: * - Integer operations
 * **Patterns**: * - Digital root
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(1)**
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * We solve this problem by implementing the required algorithm.
 *
 * ### WHY THIS WORKS:
 * This approach works because it correctly implements the problem requirements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: example input
 * Output: example output
 * ```
 *
 * ### TIME COMPLEXITY:
 * **O(n²)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
 */

/**
 * Calculate the digital root of a number using the mathematical formula.
 * @param {number} num - Non-negative integer
 * @return {number} Single digit result after repeatedly adding digits
 */
function addDigits(num) {
    // Handle zero case
    if (num === 0) {
        return 0;
    }

    // Digital root formula
    return 1 + (num - 1) % 9;
}

/**
 * Alternative solution using iteration (not O(1) time).
 * @param {number} num - Non-negative integer
 * @return {number} Single digit result after repeatedly adding digits
 */
function addDigitsNaive(num) {
    while (num >= 10) {
        let digitSum = 0;
        while (num > 0) {
            digitSum += num % 10;
            num = Math.floor(num / 10);
        }
        num = digitSum;
    }

    return num;
}

// Test cases
if (require.main === module) {
    const testCases = [
        [38, 2],
        [0, 0],
        [9, 9],
        [10, 1],
        [99, 9],
        [100, 1],
        [1234, 1],
        [199, 1]
    ];

    console.log("Testing addDigits (O(1) solution):");
    for (const [num, expected] of testCases) {
        const result = addDigits(num);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} addDigits(${num}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting addDigitsNaive (iterative solution):");
    for (const [num, expected] of testCases) {
        const result = addDigitsNaive(num);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} addDigitsNaive(${num}) = ${result}, expected = ${expected}`);
    }
}

module.exports = { addDigits, addDigitsNaive };
