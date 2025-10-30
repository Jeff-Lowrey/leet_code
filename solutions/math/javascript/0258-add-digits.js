/**
 * # 0258. Add Digits
 *
 * Difficulty: Easy
 *
 * Given an integer num, repeatedly add all its digits until the result has only one digit, and return it.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>38</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>The process is 38 → 3+8=11 → 1+1=2. Since 2 has only one digit, return it.</dd>
 * </dl>
 *
 * **Constraints:**
 * - 0 <= num <= 2^31 - 1
 *
 * **Follow up:** Could you do it without any loop/recursion in O(1) runtime?
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Digital root formula, Mathematical pattern recognition, Modulo arithmetic
 * **Data Structures**: Integer operations
 * **Patterns**: Digital root, Mathematical optimization
 * **Time Complexity**: O(1)
 * **Space Complexity**: O(1)
 *
 * ### INTUITION:
 * The key insight is recognizing the digital root pattern. When you repeatedly add digits
 * until you get a single digit, the result follows a mathematical pattern related to the
 * number modulo 9. This is because in base 10, a number has the same remainder when divided
 * by 9 as the sum of its digits (this is the basis of the divisibility rule for 9).
 *
 * ### APPROACH:
 * **Data structures: Integer operations (no additional data structures needed)**
 * 1. Naive approach: Loop and sum digits using integer operations (modulo and division) until single digit
 * 2. Optimized approach: Use digital root formula with modulo arithmetic
 *    - If num == 0, return 0
 *    - If num % 9 == 0, return 9
 *    - Otherwise, return num % 9
 *    - This can be simplified to: 1 + (num - 1) % 9 using only integer operations
 *
 * ### WHY THIS WORKS:
 * The digital root of a positive integer is obtained by iteratively summing digits until
 * a single digit is reached. This result is congruent to the number modulo 9, with the
 * exception that if the result is 0 (and the number is not 0), we return 9 instead.
 *
 * The formula 1 + (num - 1) % 9 handles all cases:
 * - For num = 0: 1 + (-1) % 9 = 1 + (-1) = 0 (but we handle this separately)
 * - For multiples of 9: 1 + (9k - 1) % 9 = 1 + 8 = 9
 * - For other numbers: returns the remainder when divided by 9
 *
 *

This solution uses mathematical pattern recognition for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * **Input:** num = 38
 *
 * **Step 1:** Naive approach - Loop and sum digits using integer operations
 * - 38: Extract digits using modulo (38 % 10 = 8, 38 // 10 = 3)
 * - Sum: 3 + 8 = 11
 * - 11: Extract digits (11 % 10 = 1, 11 // 10 = 1)
 * - Sum: 1 + 1 = 2 (single digit)
 *
 * **Step 2:** Optimized approach - Use digital root formula with modulo arithmetic
 * - Formula: 1 + (38-1) % 9 = 1 + 37 % 9 = 1 + 1 = 2 ✓
 *
 * Additional example with num = 99 (multiple of 9):
 * - Naive: 99 -> 9+9=18 -> 1+8=9
 * - Formula: 1 + (99-1) % 9 = 1 + 98 % 9 = 1 + 8 = 9 ✓
 *
 * **Output:** 2
 *
 * Original Example: num = 38
 * - Naive: 38 -> 3+8=11 -> 1+1=2
 * - Formula: 1 + (99-1) % 9 = 1 + 98 % 9 = 1 + 8 = 9 ✓
 *
 * Result: 2
 *
 * ### TIME COMPLEXITY:
 * **O(1)** - Constant time using mathematical formula
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - Only using a few variables
 *
 * ### EDGE CASES:
 * - num = 0: num=0 → 0 (special case, digital root of 0 is 0)
 * - Multiples of 9: num=9 → 9, num=18 → 9, num=99 → 9 (formula returns 9, not 0)
 * - Single digit: num=5 → 5 (already single digit, returns immediately)
 * - Large numbers: num=2147483647 → 1 (2^31-1, formula still O(1) regardless of size)
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
