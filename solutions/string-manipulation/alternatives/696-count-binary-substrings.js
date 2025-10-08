/**
 * 696. Count Binary Substrings
 * Easy
 *
 * This problem demonstrates key concepts in String Manipulation.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Count substrings that have equal consecutive 0s and 1s. For each group of
 * consecutive identical characters, we can form substrings with the previous
 * group. The number of valid substrings is the minimum of the two group sizes.
 *
 * APPROACH:
 * 1. Count consecutive identical characters in groups
 * 2. For each adjacent pair of groups, add min(group1_size, group2_size) to result
 * 3. This represents the number of valid substrings between these two groups
 *
 * WHY THIS WORKS:
 * For two consecutive groups (e.g., "000" and "11"), we can form min(3,2) = 2
 * valid substrings: "0011" and "01". We can't form more because we run out
 * of characters from the smaller group.
 *
 * TIME COMPLEXITY: O(n)
 * - Single pass through the string
 * SPACE COMPLEXITY: O(1)
 * - Only using a few variables for counting
 *
 * EXAMPLE WALKTHROUGH:
 * Input: "00110011"
 * Groups: [2, 2, 2, 2] (counts of consecutive chars)
 * Step 1: min(2, 2) = 2 valid substrings
 * Step 2: min(2, 2) = 2 valid substrings
 * Step 3: min(2, 2) = 2 valid substrings
 * Output: 6
 *
 * EDGE CASES:
 * - All same characters: No valid substrings
 * - Single character: No valid substrings
 * - Alternating characters: n-1 valid substrings
 */

/**
 * Main solution for Problem 696: Count Binary Substrings
 *
 * @param {string} s - Binary string
 * @return {number} - Count of valid binary substrings
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(s) {
    let result = 0;
    let prevCount = 0;
    let currCount = 1;

    // Count groups of consecutive identical characters
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            // Same character, increase current group count
            currCount++;
        } else {
            // Different character, we can form substrings
            // Number of substrings = min of previous and current group
            result += Math.min(prevCount, currCount);
            prevCount = currCount;
            currCount = 1;
        }
    }

    // Add the last pair
    result += Math.min(prevCount, currCount);

    return result;
}

/**
 * Test cases for Problem 696: Count Binary Substrings
 */
function testSolution() {
    console.log('Testing 696. Count Binary Substrings');

    // Test case 1: Basic case
    const result1 = solve("00110011");
    const expected1 = 6;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Simple case
    const result2 = solve("10101");
    const expected2 = 4;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: All same characters
    const result3 = solve("0000");
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Two characters
    const result4 = solve("01");
    const expected4 = 1;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Unequal groups
    const result5 = solve("00011");
    const expected5 = 2;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 696. Count Binary Substrings!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 696. Count Binary Substrings ===');
    console.log('Category: String Manipulation');
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
 * - This solution focuses on string manipulation concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
