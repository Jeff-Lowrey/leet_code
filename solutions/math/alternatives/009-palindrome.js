/**
 * 9. Palindrome
 * Medium
 *
 * Palindrome Number - JavaScript Implementation This solution determines whether an integer is a palindrome. A palindrome is a number that reads the same backwards as forwards. Example: Input: 121 -> Output: true Input: -121 -> Output: false Input: 10 -> Output: false
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Palindrome is to understand the core problem pattern
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
 * Palindrome Number - JavaScript Implementation
 * 
 * This solution determines whether an integer is a palindrome.
 * A palindrome is a number that reads the same backwards as forwards.
 * 
 * Example:
 * Input: 121 -> Output: true
 * Input: -121 -> Output: false
 * Input: 10 -> Output: false
 */

/**
 * Determines if a number is a palindrome
 * @param {number} x - The input number to check
 * @return {boolean} - Returns true if the number is a palindrome, false otherwise
 */
function isPalindrome(x) {
    // Handle negative numbers (they can't be palindromes)
    if (x < 0) {
        return false;
    }

    // Handle single digit numbers (they are always palindromes)
    if (x >= 0 && x < 10) {
        return true;
    }

    // Handle numbers ending with 0 (they can't be palindromes unless the number is 0)
    if (x % 10 === 0 && x !== 0) {
        return false;
    }

    let reversedNumber = 0;
    let originalNumber = x;

    // Reverse the number
    while (x > 0) {
        const digit = x % 10;
        reversedNumber = (reversedNumber * 10) + digit;
        x = Math.floor(x / 10);
    }

    // Compare the original number with its reverse
    return originalNumber === reversedNumber;
}

// Export the function for use in other modules
module.exports = isPalindrome;

// Test cases
if (require.main === module) {
    const testCases = [
        121,    // true
        -121,   // false
        10,     // false
        0,      // true
        12321,  // true
        12345,  // false
    ];

    testCases.forEach(num => {
        console.log(`Is ${num} a palindrome? ${isPalindrome(num)}`);
    });
}