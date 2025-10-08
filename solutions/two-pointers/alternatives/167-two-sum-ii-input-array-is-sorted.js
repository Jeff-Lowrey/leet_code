/**
 * 167. Two Sum II - Input Array Is Sorted
 * Medium
 *
 * This problem demonstrates key concepts in Two Pointers.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Since the array is sorted, we can use two pointers from both ends. If the sum
 * is too small, move the left pointer right (to increase sum). If the sum is too
 * large, move the right pointer left (to decrease sum). This is more efficient
 * than the hash map approach for sorted arrays.
 *
 * APPROACH:
 * 1. **Initialize two pointers**: left at start (0), right at end (length - 1)
 * 2. **Calculate sum**: sum = numbers[left] + numbers[right]
 * 3. **Compare with target**:
 *    - If sum == target: found the answer, return [left + 1, right + 1]
 *    - If sum < target: move left pointer right (need larger sum)
 *    - If sum > target: move right pointer left (need smaller sum)
 * 4. **Continue until found**: The problem guarantees exactly one solution
 *
 * WHY THIS WORKS:
 * The sorted property allows us to make intelligent decisions about which pointer
 * to move. Moving left pointer increases the sum, moving right pointer decreases it.
 * This eliminates the need for extra space used by hash maps.
 *
 * TIME COMPLEXITY: O(n)
 * - Single pass through the array with two pointers
 * SPACE COMPLEXITY: O(1)
 * - Only using two pointers, no extra space
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: numbers = [2,7,11,15], target = 9
 * Step 1: left=0(2), right=3(15), sum=17 > 9, move right left
 * Step 2: left=0(2), right=2(11), sum=13 > 9, move right left
 * Step 3: left=0(2), right=1(7), sum=9 == 9, found!
 * Output: [1, 2] (1-indexed)
 * ```
 *
 * EDGE CASES:
 * - Minimum array size (2 elements): guaranteed to have solution
 * - Negative numbers: works the same way
 * - Target is sum of first and last: found immediately
 * - Solution uses adjacent elements: works correctly
 */

/**
 * Main solution for Problem 167: Two Sum II - Input Array Is Sorted
 *
 * @param {number[]} numbers - Sorted array of integers (1-indexed)
 * @param {number} target - Target sum
 * @return {number[]} - Indices of the two numbers (1-indexed) that add up to target
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            // Found the solution, return 1-indexed positions
            return [left + 1, right + 1];
        } else if (sum < target) {
            // Need a larger sum, move left pointer right
            left++;
        } else {
            // Need a smaller sum, move right pointer left
            right--;
        }
    }

    // The problem guarantees exactly one solution exists
    // This line should never be reached
    return [];
}

/**
 * Test cases for Problem 167: Two Sum II - Input Array Is Sorted
 */
function testSolution() {
    console.log('Testing 167. Two Sum II - Input Array Is Sorted');

    // Test case 1: Example from problem
    const result1 = solve([2, 7, 11, 15], 9);
    const expected1 = [1, 2];
    console.assert(result1.toString() === expected1.toString(),
        `Test 1 failed: expected ${expected1}, got ${result1}`);
    console.log(`Test 1 passed: twoSum([2,7,11,15], 9) = [${result1}]`);

    // Test case 2: Another example
    const result2 = solve([2, 3, 4], 6);
    const expected2 = [1, 3];
    console.assert(result2.toString() === expected2.toString(),
        `Test 2 failed: expected ${expected2}, got ${result2}`);
    console.log(`Test 2 passed: twoSum([2,3,4], 6) = [${result2}]`);

    // Test case 3: Negative numbers
    const result3 = solve([-1, 0], -1);
    const expected3 = [1, 2];
    console.assert(result3.toString() === expected3.toString(),
        `Test 3 failed: expected ${expected3}, got ${result3}`);
    console.log(`Test 3 passed: twoSum([-1,0], -1) = [${result3}]`);

    // Test case 4: Solution at extremes
    const result4 = solve([1, 2, 3, 4, 5], 6);
    const expected4 = [1, 5];
    console.assert(result4.toString() === expected4.toString(),
        `Test 4 failed: expected ${expected4}, got ${result4}`);
    console.log(`Test 4 passed: twoSum([1,2,3,4,5], 6) = [${result4}]`);

    // Test case 5: Adjacent elements
    const result5 = solve([1, 2, 3, 4, 5], 3);
    const expected5 = [1, 2];
    console.assert(result5.toString() === expected5.toString(),
        `Test 5 failed: expected ${expected5}, got ${result5}`);
    console.log(`Test 5 passed: twoSum([1,2,3,4,5], 3) = [${result5}]`);

    // Test case 6: Larger numbers
    const result6 = solve([5, 25, 75], 100);
    const expected6 = [2, 3];
    console.assert(result6.toString() === expected6.toString(),
        `Test 6 failed: expected ${expected6}, got ${result6}`);
    console.log(`Test 6 passed: twoSum([5,25,75], 100) = [${result6}]`);

    console.log('All test cases passed for 167. Two Sum II - Input Array Is Sorted!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 167. Two Sum II - Input Array Is Sorted ===');
    console.log('Category: Two Pointers');
    console.log('Difficulty: Medium');
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
 * - This is the classic two-pointer solution for sorted arrays
 * - More space-efficient than the hash map approach in Two Sum I
 * - The sorted property is crucial for the two-pointer technique to work
 * - Time complexity is linear, making it very efficient
 * - Remember to return 1-indexed positions as required by the problem
 */
