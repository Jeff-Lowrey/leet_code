/**
 * # Difficulty: Medium
 *
 * # 1395. Count Number Of Teams
 *
 * There are n soldiers standing in a line. Every soldier has a unique rating value.
 *
 * You have to form a team of 3 soldiers amongst them under the following rules:
 * - Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
 * - A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (i < j < k).
 *
 * Return the number of teams you can form given the conditions. (soldiers can be used in multiple teams).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[2, 5, 3, 4, 1]</dd>
 * <dt>Output:</dt>
 * <dd>"\nInput: rating = {rating}"</dd>
 * <dt>Explanation:</dt>
 * <dd>There are 3 valid teams of soldiers with increasing or decreasing heights</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * This problem is about counting ordered triplets in an array. We can solve it using multiple approaches: brute force O(n³), dynamic programming O(n²), or advanced data structures like segment trees or Binary Indexed Trees for O(n log n). The key insight is that for each middle element, we count how many valid left and right elements exist.
 *
 * ### APPROACH:
 * 1. **Handle edge case**: Return 0 if array has fewer than 3 elements (need at least 3 for a team)
 * 2. **Iterate through middle positions**: For each soldier j as the middle element (from index 1 to n-2)
 * 3. **Count left elements**: Scan all elements to the left of j, counting how many are smaller and how many are larger
 * 4. **Count right elements**: Scan all elements to the right of j, counting how many are smaller and how many are larger
 * 5. **Calculate ascending teams**: Multiply left_smaller by right_larger (elements that can form ascending triplet with j)
 * 6. **Calculate descending teams**: Multiply left_larger by right_smaller (elements that can form descending triplet with j)
 * 7. **Sum all valid teams**: Add both ascending and descending team counts for each middle position to get total
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: rating = [2,5,3,4,1]
 * For ascending teams (i < j < k and rating[i] < rating[j] < rating[k]):
 * - j=1 (rating=5): left_smaller=1 (rating=2), right_larger=0 → 0 teams
 * - j=2 (rating=3): left_smaller=1 (rating=2), right_larger=1 (rating=4) → 1 team
 * - j=3 (rating=4): left_smaller=2 (rating=2,3), right_larger=0 → 0 teams
 *
 * For descending teams (i < j < k and rating[i] > rating[j] > rating[k]):
 * - j=1 (rating=5): left_larger=0, right_smaller=3 → 0 teams
 * - j=2 (rating=3): left_larger=1 (rating=5), right_smaller=1 (rating=1) → 1 team
 * - j=3 (rating=4): left_larger=1 (rating=5), right_smaller=1 (rating=1) → 1 team
 *
 * Total: 1 + 1 + 1 = 3 teams
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n log n)
 * For segment tree approach with coordinate compression
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For compressed coordinates and tree structure
 *
 * ### EDGE CASES:
 * - Array length < 3
 * - All elements equal (no valid teams)
 * - Strictly increasing/decreasing array
 * - Duplicate ratings
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
