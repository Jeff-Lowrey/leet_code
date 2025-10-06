/**
 * 191. Number
 * Medium
 *
 * Number of 1 Bits (Hamming Weight) @param {number} n - a positive integer (represented as unsigned 32 bits integer) @return {number} - the number of '1' bits in the binary representation
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Number is to understand the core problem pattern
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
 * Number of 1 Bits (Hamming Weight)
 * 
 * @param {number} n - a positive integer (represented as unsigned 32 bits integer)
 * @return {number} - the number of '1' bits in the binary representation
 */
var hammingWeight = function(n) {
    // Initialize counter for 1 bits
    let count = 0;
    
    // Convert number to 32-bit unsigned integer
    n = n >>> 0;
    
    // Continue loop while n is greater than 0
    while (n !== 0) {
        // Add 1 to count if least significant bit is 1
        count += n & 1;
        
        // Right shift n by 1 to check next bit
        n = n >>> 1;
    }
    
    return count;
};

/**
 * Alternative implementation using built-in methods
 * 
 * @param {number} n - a positive integer
 * @return {number} - the number of '1' bits
 */
var hammingWeightAlternative = function(n) {
    // Convert to binary string and count '1' characters
    return n.toString(2).split('').filter(bit => bit === '1').length;
};

// Export both implementations
module.exports = {
    hammingWeight,
    hammingWeightAlternative
};

// Test cases
if (require.main === module) {
    // Test cases
    const testCases = [
        11,  // Binary: 1011 (3 ones)
        128, // Binary: 10000000 (1 one)
        255, // Binary: 11111111 (8 ones)
        0,   // Binary: 0 (0 ones)
        1,   // Binary: 1 (1 one)
    ];

    console.log("Testing hammingWeight function:");
    testCases.forEach(test => {
        console.log(`Input: ${test} (${test.toString(2)})`);
        console.log(`Output: ${hammingWeight(test)}`);
        console.log("---");
    });

    console.log("\nTesting hammingWeightAlternative function:");
    testCases.forEach(test => {
        console.log(`Input: ${test} (${test.toString(2)})`);
        console.log(`Output: ${hammingWeightAlternative(test)}`);
        console.log("---");
    });
}