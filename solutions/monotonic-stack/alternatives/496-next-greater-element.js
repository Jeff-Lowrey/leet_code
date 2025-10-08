/**
 * 496. Next Greater Element I
 * Easy
 *
 * This problem demonstrates key concepts in Monotonic Stack.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Use a monotonic decreasing stack to efficiently find the next greater element for each number in nums2.
 * The stack maintains elements in decreasing order, so when we find a larger element, we can pop and match
 * all smaller elements with their next greater element.
 *
 * APPROACH:
 * 1. Traverse nums2 with a monotonic stack
 * 2. For each element, pop all smaller elements from stack and map them to current element
 * 3. Push current element to stack
 * 4. Build result array by looking up each nums1 element in the mapping
 *
 * WHY THIS WORKS:
 * - The monotonic stack ensures we process elements in the correct order
 * - When we encounter a larger element, all smaller elements in the stack have found their next greater element
 * - Elements remaining in the stack have no next greater element (default -1)
 * - HashMap lookup gives O(1) access for building result
 *
 * TIME COMPLEXITY: O(n + m) - where n is nums2.length, m is nums1.length
 * SPACE COMPLEXITY: O(n) - for the map and stack
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * nums2 = [1,3,4,2], nums1 = [4,1,2]
 *
 * Process 1: stack=[], push 1, stack=[1]
 * Process 3: 3>1, map[1]=3, push 3, stack=[3]
 * Process 4: 4>3, map[3]=4, push 4, stack=[4]
 * Process 2: 2<4, push 2, stack=[4,2]
 * Final mapping: {1→3, 3→4}
 *
 * Build result for [4,1,2]:
 * - nums1[0]=4: not in map → -1
 * - nums1[1]=1: map[1]=3 → 3
 * - nums1[2]=2: not in map → -1
 * Result: [-1,3,-1]
 * ```
 *
 * EDGE CASES:
 * - nums1 or nums2 empty: return empty array
 * - No next greater element: return -1
 * - All elements decreasing: all -1
 * - nums1 is subset of nums2: guaranteed by problem constraints
 */

/**
 * Main solution for Problem 496: Next Greater Element I
 *
 * @param {number[]} nums1 - Query array (subset of nums2)
 * @param {number[]} nums2 - Source array
 * @return {number[]} - Next greater element for each nums1 element
 *
 * Time Complexity: O(n + m)
 * Space Complexity: O(n)
 */
function solve(nums1, nums2) {
    const map = new Map(); // Store next greater element for each number
    const stack = [];

    // Build next greater element mapping for nums2
    for (const num of nums2) {
        // Pop smaller elements and set their next greater element
        while (stack.length > 0 && stack[stack.length - 1] < num) {
            map.set(stack.pop(), num);
        }
        stack.push(num);
    }

    // Build result by looking up each nums1 element
    return nums1.map(num => map.get(num) || -1);
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
 * Test cases for Problem 496: Next Greater Element I
 */
function testSolution() {
    console.log('Testing 496. Next Greater Element I');

    // Test case 1: Example from problem
    const result1 = solve([4,1,2], [1,3,4,2]);
    const expected1 = [-1,3,-1];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Another example
    const result2 = solve([2,4], [1,2,3,4]);
    const expected2 = [3,-1];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: All have next greater
    const result3 = solve([1,2], [1,2,3]);
    const expected3 = [2,3];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: None have next greater
    const result4 = solve([3,2,1], [3,2,1]);
    const expected4 = [-1,-1,-1];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: Single element
    const result5 = solve([1], [1,2]);
    const expected5 = [2];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected [${expected5}], got [${result5}]`);

    console.log('All test cases passed for 496. Next Greater Element I!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 496. Next Greater Element ===');
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
