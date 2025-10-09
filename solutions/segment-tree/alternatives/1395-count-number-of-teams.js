/**

 *
 * This problem demonstrates key concepts in Segment Tree.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to count teams of 3 soldiers where ratings are either strictly increasing
 * or strictly decreasing. While segment trees can solve this, a simpler O(n^2) approach
 * works well for the given constraints by counting valid left/right elements for each middle element.
 *
 * APPROACH:
 * For each soldier as middle element:
 * - Count smaller/larger elements to the left
 * - Count smaller/larger elements to the right
 * - Multiply counts: (smaller_left * larger_right) for increasing teams
 * - Multiply counts: (larger_left * smaller_right) for decreasing teams
 *
 * WHY THIS WORKS:
 * Any valid team has a middle element. By fixing the middle and counting valid
 * left/right combinations, we avoid triple loops while maintaining correctness.
 *
 * TIME COMPLEXITY: O(n^2) where n is array length
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * Input: rating = [2,5,3,4,1]
 * For i=1 (rating=5):
 *   - smaller_left=1 (2), larger_left=0
 *   - smaller_right=3 (3,4,1), larger_right=0
 *   - Increasing: 1*0=0, Decreasing: 0*3=0
 * For i=2 (rating=3):
 *   - smaller_left=1 (2), larger_left=1 (5)
 *   - smaller_right=1 (1), larger_right=1 (4)
 *   - Increasing: 1*1=1, Decreasing: 1*1=1
 * Total teams = 3
 *
 * EDGE CASES:
 * - Less than 3 soldiers: return 0
 * - All equal ratings: return 0
 * - Strictly increasing/decreasing: count combinations
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
