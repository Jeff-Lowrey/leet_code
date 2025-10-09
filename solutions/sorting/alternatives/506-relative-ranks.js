/**

 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Assign ranks to athletes based on their scores. The highest score gets "Gold Medal",
 * second gets "Silver Medal", third gets "Bronze Medal", and the rest get their numeric rank.
 * We need to maintain the original order while assigning ranks based on sorted order.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * By pairing each score with its original index, we can sort while maintaining
 * the ability to place results back in the correct positions. Sorting in descending
 * order gives us the natural ranking from highest to lowest.
 *
 * TIME COMPLEXITY: O(n log n) for sorting
 * SPACE COMPLEXITY: O(n) for the result array and sorted pairs
 *
 * EXAMPLE WALKTHROUGH:
 * Input: score = [5,4,3,2,1]
 * Step 1: Create pairs: [[5,0], [4,1], [3,2], [2,3], [1,4]]
 * Step 2: Sort by score (already sorted): [[5,0], [4,1], [3,2], [2,3], [1,4]]
 * Step 3: Assign ranks:
 *   [5,0] -> rank 1 -> "Gold Medal" at index 0
 *   [4,1] -> rank 2 -> "Silver Medal" at index 1
 *   [3,2] -> rank 3 -> "Bronze Medal" at index 2
 *   [2,3] -> rank 4 -> "4" at index 3
 *   [1,4] -> rank 5 -> "5" at index 4
 * Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
 *
 * EDGE CASES:
 * - Single athlete: gets "Gold Medal"
 * - Two athletes: first gets "Gold Medal", second gets "Silver Medal"
 * - Duplicate scores: problem assumes all scores are unique
 */

/**
 * Main solution for Problem 506: Relative Ranks
 *
 * @param {number[]} score - Array of athlete scores
 * @return {string[]} - Array of ranks in original order
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(score) {
    const n = score.length;
    const result = new Array(n);

    // Create pairs of [score, originalIndex]
    const pairs = score.map((s, i) => [s, i]);

    // Sort by score in descending order
    pairs.sort((a, b) => b[0] - a[0]);

    // Assign ranks
    const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];

    for (let rank = 0; rank < n; rank++) {
        const [scoreValue, originalIndex] = pairs[rank];

        if (rank < 3) {
            result[originalIndex] = medals[rank];
        } else {
            result[originalIndex] = String(rank + 1);
        }
    }

    return result;
}

/**
 * Test cases for Problem 506: Relative Ranks
 */
function testSolution() {
    console.log('Testing 506. Relative Ranks');

    // Test case 1: Example from problem
    const result1 = solve([5, 4, 3, 2, 1]);
    const expected1 = ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Another example
    const result2 = solve([10, 3, 8, 9, 4]);
    const expected2 = ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single athlete
    const result3 = solve([100]);
    const expected3 = ["Gold Medal"];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Two athletes
    const result4 = solve([7, 5]);
    const expected4 = ["Gold Medal", "Silver Medal"];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Three athletes
    const result5 = solve([1, 2, 3]);
    const expected5 = ["Bronze Medal", "Silver Medal", "Gold Medal"];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 506. Relative Ranks!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 506. Relative Ranks ===');
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
