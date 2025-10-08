/**
 * 503. Next Greater Element II
 * Medium
 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * In a circular array, the next element of the last element is the first element. To handle this,
 * we can simulate traversing the array twice - once normally, then circularly. A monotonic
 * decreasing stack helps find the next greater element efficiently.
 *
 * APPROACH:
 * 1. Initialize result array with -1 (default when no greater element exists)
 * 2. Use monotonic decreasing stack storing indices
 * 3. Traverse array twice (2*n iterations) using modulo to simulate circular array
 * 4. For each element, pop indices with smaller values and update their results
 * 5. Only push indices in first pass to avoid duplicates
 *
 * WHY THIS WORKS:
 * - Two passes ensure we check elements after wrapping around
 * - Monotonic stack tracks elements waiting for their next greater value
 * - Using indices allows us to update result array directly
 * - Second pass doesn't push to avoid processing same element twice
 *
 * TIME COMPLEXITY: O(n) - each element processed at most twice
 * SPACE COMPLEXITY: O(n) - result array and stack
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,2,1]
 * Result: [-1,-1,-1], stack: []
 *
 * First pass (i=0 to 2):
 * i=0 (val=1): stack=[], push 0, stack=[0]
 * i=1 (val=2): 2>1, pop 0, result[0]=2, push 1, stack=[1]
 * i=2 (val=1): 1<2, push 2, stack=[1,2]
 *
 * Second pass (i=3 to 5, index=i%3):
 * i=3 (idx=0,val=1): 1<2, no pop
 * i=4 (idx=1,val=2): 2=2, no pop (but 2>1), pop 2, result[2]=2, stack=[1]
 * i=5 (idx=2,val=1): 1<2, no pop
 *
 * Result: [2,-1,2]
 * ```
 *
 * EDGE CASES:
 * - Single element: return [-1]
 * - All same values: all -1
 * - Decreasing values: last wraps to first
 * - Increasing values: each finds next except last
 */

/**
 * Main solution for Problem 503: Next Greater Element II
 *
 * @param {number[]} nums - Circular array
 * @return {number[]} - Next greater element for each position
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];

    // Traverse array twice to handle circular nature
    for (let i = 0; i < 2 * n; i++) {
        const index = i % n;
        const value = nums[index];

        // Pop smaller elements and update their results
        while (stack.length > 0 && nums[stack[stack.length - 1]] < value) {
            const poppedIndex = stack.pop();
            result[poppedIndex] = value;
        }

        // Only push indices in first pass to avoid duplicates
        if (i < n) {
            stack.push(index);
        }
    }

    return result;
}

/**
 * Helper function to compare arrays
 */
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}

/**
 * Test cases for Problem 503: Next Greater Element II
 */
function testSolution() {
    console.log('Testing 503. Next Greater Element II');

    // Test case 1: Example from problem
    const result1 = solve([1,2,1]);
    const expected1 = [2,-1,2];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Another example
    const result2 = solve([1,2,3,4,3]);
    const expected2 = [2,3,4,-1,4];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: All same values
    const result3 = solve([5,5,5,5]);
    const expected3 = [-1,-1,-1,-1];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: Decreasing sequence
    const result4 = solve([5,4,3,2,1]);
    const expected4 = [-1,5,5,5,5];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single element
    const result5 = solve([1]);
    const expected5 = [-1];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    // Test case 6: Two elements
    const result6 = solve([2,1]);
    const expected6 = [-1,2];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected [${expected6}], got [${result6}]`);

    console.log('All test cases passed for 503. Next Greater Element II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 503. Next ===');
    console.log('Category: Monotonic Stack');
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
 * - This solution focuses on monotonic stack concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
