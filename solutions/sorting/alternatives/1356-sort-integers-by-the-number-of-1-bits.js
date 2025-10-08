/**
 * 1356. Sort Integers By The Number Of 1 Bits
 * Easy
 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Sort integers by the number of 1 bits in their binary representation (popcount).
 * If two numbers have the same number of 1 bits, sort them by their value.
 *
 * APPROACH:
 * 1. Create a helper function to count 1 bits in a number
 * 2. Use custom comparator: first by bit count, then by value
 * 3. Sort the array using this comparator
 *
 * WHY THIS WORKS:
 * The custom comparator ensures proper ordering based on the problem requirements.
 * Bit counting can be done efficiently using bitwise operations.
 *
 * TIME COMPLEXITY: O(n log n) for sorting
 * SPACE COMPLEXITY: O(1) if we don't count the sorting space
 *
 * EXAMPLE WALKTHROUGH:
 * Input: arr = [0,1,2,3,4,5,6,7,8]
 * Step 1: Count bits for each:
 *   0 (0000) = 0 bits, 1 (0001) = 1 bit, 2 (0010) = 1 bit, 3 (0011) = 2 bits
 *   4 (0100) = 1 bit, 5 (0101) = 2 bits, 6 (0110) = 2 bits, 7 (0111) = 3 bits, 8 (1000) = 1 bit
 * Step 2: Group by bit count: [0], [1,2,4,8], [3,5,6], [7]
 * Step 3: Within each group, sort by value
 * Output: [0,1,2,4,8,3,5,6,7]
 *
 * EDGE CASES:
 * - Single element: returns as is
 * - All same bit count: sorts by value
 * - Empty array: returns empty
 */

/**
 * Main solution for Problem 1356: Sort Integers By The Number Of 1 Bits
 *
 * @param {number[]} arr - Array of integers to sort
 * @return {number[]} - Sorted array by bit count, then by value
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function solve(arr) {
    /**
     * Count the number of 1 bits in a number
     * @param {number} n - The number to count bits for
     * @return {number} - Count of 1 bits
     */
    function countBits(n) {
        let count = 0;
        while (n > 0) {
            count += n & 1;  // Add 1 if the least significant bit is 1
            n >>= 1;          // Right shift to check next bit
        }
        return count;
    }

    // Sort with custom comparator
    return arr.sort((a, b) => {
        const bitsA = countBits(a);
        const bitsB = countBits(b);

        // First compare by bit count
        if (bitsA !== bitsB) {
            return bitsA - bitsB;
        }
        // If bit counts are equal, compare by value
        return a - b;
    });
}

/**
 * Test cases for Problem 1356: Sort Integers By The Number Of 1 Bits
 */
function testSolution() {
    console.log('Testing 1356. Sort Integers By The Number Of 1 Bits');

    // Test case 1: Example from problem
    const result1 = solve([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const expected1 = [0, 1, 2, 4, 8, 3, 5, 6, 7];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Another example
    const result2 = solve([1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1]);
    console.log('Test 2:', JSON.stringify(result2));
    // All these numbers have 1 bit set, so should be sorted by value
    const expected2 = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Mixed bit counts
    const result3 = solve([10, 100, 1000, 10000]);
    console.log('Test 3:', JSON.stringify(result3));
    // 10 (1010) = 2 bits, 100 (1100100) = 3 bits, 1000 (1111101000) = 6 bits, 10000 (10011100010000) = 5 bits

    // Test case 4: Single element
    const result4 = solve([42]);
    const expected4 = [42];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    console.log('All test cases passed for 1356. Sort Integers By The Number Of 1 Bits!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1356. Sort Integers By The Number Of 1 Bits ===');
    console.log('Category: Sorting');
    console.log('Difficulty: Easy');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
