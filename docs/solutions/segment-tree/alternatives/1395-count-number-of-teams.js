/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
 */

/**
 * Main solution for Problem 1395: Count Number Of Teams
 *
 * @param {number[]} rating - Array of soldier ratings
 * @return {number} - Count of valid teams
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function solve(rating) {
    if (!rating || rating.length < 3) {
        return 0;
    }

    const n = rating.length;
    let teams = 0;

    // For each soldier as the middle element
    for (let j = 1; j < n - 1; j++) {
        let smallerLeft = 0, largerLeft = 0;
        let smallerRight = 0, largerRight = 0;

        // Count elements to the left
        for (let i = 0; i < j; i++) {
            if (rating[i] < rating[j]) {
                smallerLeft++;
            } else if (rating[i] > rating[j]) {
                largerLeft++;
            }
        }

        // Count elements to the right
        for (let k = j + 1; k < n; k++) {
            if (rating[k] < rating[j]) {
                smallerRight++;
            } else if (rating[k] > rating[j]) {
                largerRight++;
            }
        }

        // Count increasing teams (i < j < k with rating[i] < rating[j] < rating[k])
        teams += smallerLeft * largerRight;

        // Count decreasing teams (i < j < k with rating[i] > rating[j] > rating[k])
        teams += largerLeft * smallerRight;
    }

    return teams;
}

/**
 * Test cases for Problem 1395: Count Number Of Teams
 */
function testSolution() {
    console.log('Testing 1395. Count Number Of Teams');

    // Test case 1: Basic example
    const result1 = solve([2, 5, 3, 4, 1]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`✓ Test 1 passed: rating=[2,5,3,4,1] -> ${result1} teams`);

    // Test case 2: Another example
    const result2 = solve([2, 1, 3]);
    const expected2 = 0;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`✓ Test 2 passed: rating=[2,1,3] -> ${result2} teams`);

    // Test case 3: Larger example
    const result3 = solve([1, 2, 3, 4]);
    const expected3 = 4; // [1,2,3], [1,2,4], [1,3,4], [2,3,4]
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`✓ Test 3 passed: rating=[1,2,3,4] -> ${result3} teams`);

    // Test case 4: Edge case - minimum length
    const result4 = solve([1, 2]);
    const expected4 = 0;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`✓ Test 4 passed: rating=[1,2] -> ${result4} teams`);

    // Test case 5: Decreasing sequence
    const result5 = solve([5, 4, 3, 2, 1]);
    const expected5 = 10; // C(5,3) = 10 decreasing teams
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`✓ Test 5 passed: rating=[5,4,3,2,1] -> ${result5} teams`);

    console.log('All test cases passed for 1395. Count Number Of Teams!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1395. Count Number Of Teams ===');
    console.log('Category: Segment Tree');
    console.log('Difficulty: Medium');
    console.log('');

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
 * - This solution uses a simpler O(n^2) approach rather than segment trees
 * - Segment tree solution would use coordinate compression and range queries
 * - For constraints n <= 1000, the O(n^2) solution is more practical
 * - The approach efficiently counts combinations without enumerating all triples
 */
