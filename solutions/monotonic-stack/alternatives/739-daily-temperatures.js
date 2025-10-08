/**
 * 739. Daily Temperatures
 * Medium
 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * For each day, we need to find how many days until a warmer temperature. A monotonic decreasing
 * stack helps us efficiently track days waiting for warmer weather. When we find a warmer day,
 * we can resolve all cooler days in the stack.
 *
 * APPROACH:
 * 1. Initialize result array with zeros (default when no warmer day exists)
 * 2. Use a monotonic decreasing stack storing indices
 * 3. For each day, pop indices with cooler temperatures and calculate wait days
 * 4. Push current day's index to stack
 * 5. Days remaining in stack have no warmer future day (already 0)
 *
 * WHY THIS WORKS:
 * - Stack maintains indices in decreasing order of temperatures
 * - When we find a warmer day, all cooler days in stack have found their answer
 * - Index difference gives the number of days to wait
 * - Each day is pushed and popped at most once, giving O(n) time
 *
 * TIME COMPLEXITY: O(n) - each day processed once
 * SPACE COMPLEXITY: O(n) - stack can hold all days in worst case
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: temperatures = [73,74,75,71,69,72,76,73]
 * Result: [0,0,0,0,0,0,0,0], stack: []
 *
 * i=0, T=73: stack=[], push 0, stack=[0]
 * i=1, T=74: 74>73, pop 0, result[0]=1-0=1, push 1, stack=[1]
 * i=2, T=75: 75>74, pop 1, result[1]=2-1=1, push 2, stack=[2]
 * i=3, T=71: 71<75, push 3, stack=[2,3]
 * i=4, T=69: 69<71, push 4, stack=[2,3,4]
 * i=5, T=72: 72>69, pop 4, result[4]=5-4=1
 *            72>71, pop 3, result[3]=5-3=2
 *            72<75, push 5, stack=[2,5]
 * i=6, T=76: 76>72, pop 5, result[5]=6-5=1
 *            76>75, pop 2, result[2]=6-2=4
 *            push 6, stack=[6]
 * i=7, T=73: 73<76, push 7, stack=[6,7]
 *
 * Result: [1,1,4,2,1,1,0,0]
 * ```
 *
 * EDGE CASES:
 * - Single day: return [0]
 * - All decreasing: all zeros
 * - All increasing: each is 1 except last
 * - No warmer days ahead: return 0
 */

/**
 * Main solution for Problem 739: Daily Temperatures
 *
 * @param {number[]} temperatures - Daily temperatures
 * @return {number[]} - Days until warmer temperature
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(temperatures) {
    const n = temperatures.length;
    const result = new Array(n).fill(0);
    const stack = []; // Store indices

    for (let i = 0; i < n; i++) {
        // Pop cooler days and update their wait times
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const prevIndex = stack.pop();
            result[prevIndex] = i - prevIndex;
        }
        stack.push(i);
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
 * Test cases for Problem 739: Daily Temperatures
 */
function testSolution() {
    console.log('Testing 739. Daily Temperatures');

    // Test case 1: Example from problem
    const result1 = solve([73,74,75,71,69,72,76,73]);
    const expected1 = [1,1,4,2,1,1,0,0];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Another example
    const result2 = solve([30,40,50,60]);
    const expected2 = [1,1,1,0];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Decreasing temperatures
    const result3 = solve([30,60,90]);
    const expected3 = [1,1,0];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: All same temperature
    const result4 = solve([30,30,30,30]);
    const expected4 = [0,0,0,0];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single day
    const result5 = solve([50]);
    const expected5 = [0];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    // Test case 6: Decreasing then increasing
    const result6 = solve([89,62,70,58,47,99]);
    const expected6 = [5,1,3,2,1,0];
    console.assert(arraysEqual(result6, expected6), `Test 6 failed: expected [${expected6}], got [${result6}]`);

    console.log('All test cases passed for 739. Daily Temperatures!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 739. Daily Temperatures ===');
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
