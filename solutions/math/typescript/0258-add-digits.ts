/**
### INTUITION:
The key insight is recognizing the digital root pattern. When you repeatedly add digits
until you get a single digit, the result follows a mathematical pattern related to the
number modulo 9. This is because in base 10, a number has the same remainder when divided
by 9 as the sum of its digits (this is the basis of the divisibility rule for 9).

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

Data structures: Integer operations**
1. Naive approach: Loop and sum digits using integer operations until single digit
2. Optimized approach: Use digital root formula with integer operations
   - If num == 0, return 0
   - If num % 9 == 0, return 9
   - Otherwise, return num % 9
   - This can be simplified to: 1 + (num - 1) % 9

### WHY THIS WORKS:
The digital root of a positive integer is obtained by iteratively summing digits until
a single digit is reached. This result is congruent to the number modulo 9, with the
exception that if the result is 0 (and the number is not 0), we return 9 instead.

The formula 1 + (num - 1) % 9 handles all cases:
- This ensures that for num = 0: 1 + (-1) % 9 = 1 + (-1) = 0 (but we handle this separately)
- This ensures that for multiples of 9: 1 + (9k - 1) % 9 = 1 + 8 = 9
- This ensures that for other numbers: returns the remainder when divided by 9

This solution uses mathematical pattern recognition for efficient implementation.

### EXAMPLE WALKTHROUGH:
Input:** num = 38

Step 1:** Naive approach - First iteration
- 38 → 3 + 8 = 11
- Result is not single digit, continue

Step 2:** Naive approach - Second iteration
- 11 → 1 + 1 = 2
- Result is single digit, done!

Step 3:** Formula approach (O(1))
- Digital root formula: 1 + (num - 1) % 9
- Calculate: 1 + (38 - 1) % 9
- = 1 + 37 % 9
- = 1 + 1 = 2 ✓

Step 4:** Verify with num = 99
- Naive: 99 → 9+9=18 → 1+8=9
- Formula: 1 + (99-1) % 9 = 1 + 8 = 9 ✓

Output:
```
2
```

### TIME COMPLEXITY:
O(1)** - Constant time using mathematical formula

### SPACE COMPLEXITY:
O(1)** - Only using a few variables - [Add explanation of why this complexity]

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

/**
 * Calculate the digital root of a number using the mathematical formula.
 * @param num - Non-negative integer
 * @returns Single digit result after repeatedly adding digits
 */
function addDigits(num: number): number {
    // Handle zero case
    if (num === 0) {
        return 0;
    }

    // Digital root formula
    return 1 + (num - 1) % 9;
}

/**
 * Alternative solution using iteration (not O(1) time).
 * @param num - Non-negative integer
 * @returns Single digit result after repeatedly adding digits
 */
function addDigitsNaive(num: number): number {
    while (num >= 10) {
        let digitSum: number = 0;
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
    const testCases: [number, number][] = [
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
        const result: number = addDigits(num);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} addDigits(${num}) = ${result}, expected = ${expected}`);
    }

    console.log("\nTesting addDigitsNaive (iterative solution):");
    for (const [num, expected] of testCases) {
        const result: number = addDigitsNaive(num);
        const status: string = result === expected ? "✓" : "✗";
        console.log(`${status} addDigitsNaive(${num}) = ${result}, expected = ${expected}`);
    }
}

export { addDigits, addDigitsNaive };
