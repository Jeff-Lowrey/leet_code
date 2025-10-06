/**
 * 190. Reverse
 * Medium
 *
 * Reverse Bits - JavaScript Implementation This implementation reverses the bits of a given 32-bit unsigned integer. For example: Input: n = 43261596 (00000010100101000001111010011100) Output: 964176192 (00111001011110000010100101000000) @param {number} n - A 32-bit unsigned integer @return {number} - The reversed bit representation
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Reverse is to understand the core problem pattern
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
 * Reverse Bits - JavaScript Implementation
 * 
 * This implementation reverses the bits of a given 32-bit unsigned integer.
 * For example: Input: n = 43261596 (00000010100101000001111010011100)
 *              Output:   964176192 (00111001011110000010100101000000)
 * 
 * @param {number} n - A 32-bit unsigned integer
 * @return {number} - The reversed bit representation
 */

/**
 * @param {number} n - a positive integer
 * @return {number} - the integer with reversed bits
 */
function reverseBits(n) {
    // Initialize result
    let result = 0;
    
    // Process all 32 bits
    for (let i = 0; i < 32; i++) {
        // Left shift result by 1 to make room for next bit
        result = result << 1;
        
        // Add least significant bit of n to result
        result |= (n & 1);
        
        // Right shift n by 1 to process next bit
        n = n >>> 1;
    }
    
    // Convert to unsigned 32-bit integer
    return result >>> 0;
}

/**
 * Alternative implementation using string manipulation
 * Note: This is less efficient but might be easier to understand
 */
function reverseBitsAlternative(n) {
    // Convert to binary string and pad with zeros
    let binary = n.toString(2).padStart(32, '0');
    
    // Reverse the string and convert back to number
    let reversed = binary.split('').reverse().join('');
    
    // Parse binary string to integer
    return parseInt(reversed, 2);
}

// Test cases
function runTests() {
    const testCases = [
        {
            input: 43261596,  // 00000010100101000001111010011100
            expected: 964176192  // 00111001011110000010100101000000
        },
        {
            input: 4294967293,  // 11111111111111111111111111111101
            expected: 3221225471  // 11000000000000000000000000001111
        },
        {
            input: 0,
            expected: 0
        }
    ];

    for (let i = 0; i < testCases.length; i++) {
        const result = reverseBits(testCases[i].input);
        console.log(`Test Case ${i + 1}:`);
        console.log(`Input: ${testCases[i].input}`);
        console.log(`Expected: ${testCases[i].expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === testCases[i].expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Export the functions for use in other modules
module.exports = {
    reverseBits,
    reverseBitsAlternative
};

// Uncomment to run tests
// runTests();