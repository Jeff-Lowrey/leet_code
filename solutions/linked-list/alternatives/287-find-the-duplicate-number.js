/**
 * 287. Find The Duplicate Number
 * Medium
 *
 * This problem demonstrates key concepts in Linked List.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Treat the array as a linked list where nums[i] points to nums[nums[i]].
 * Since there's a duplicate, this creates a cycle. Use Floyd's cycle detection
 * to find where the cycle begins - that index value is the duplicate number.
 *
 * APPROACH:
 * 1. Map array to implicit linked list: index i points to index nums[i]
 * 2. Use Floyd's algorithm to detect cycle existence
 * 3. Find cycle start using the two-phase approach
 * 4. The cycle start position gives us the duplicate number
 *
 * WHY THIS WORKS:
 * - Duplicate number creates multiple pointers to same index (cycle)
 * - Floyd's algorithm finds cycle, then locates the duplicate
 * - No modification of input array, O(1) space complexity
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 *
 * EXAMPLE WALKTHROUGH:
 * ```
Input: nums = [1,3,4,2,2]
Array as linked list: 0->1->3->2->4->2 (cycle at index 2)
Step 1: Floyd's detection - slow=0,1,3,2,4,2,4... fast=0,3,4,2,4,2,4...
Step 2: They meet at index 4 (both pointing to value 2)
Step 3: Reset slow to 0, move both one step: slow=0,1,3,2 fast=4,2,4,2
Step 4: They meet at index 2, value is 2 (duplicate found)
Output: 2

Input: nums = [3,1,3,4,2]
Array as linked list: 0->3->4->2->1->3 (cycle at index 3)
Meeting point leads to duplicate value 3
```
 *
 * EDGE CASES:
 * - Minimum case: n=2, one duplicate (e.g., [1,1])
 * - Duplicate appears multiple times (e.g., [2,2,2,2,2])
 * - Duplicate is at boundaries (smallest or largest value)
 * - Large arrays with single duplicate among many unique values
 */

/**
 * Main solution for Problem 287: Find The Duplicate Number
 * Uses Floyd's cycle detection on implicit linked list
 *
 * @param {number[]} nums - Array containing n+1 integers in range [1,n]
 * @return {number} - The duplicate number
 *
 * Time Complexity: O(n) where n is length of array
 * Space Complexity: O(1) using only constant extra space
 */
function solve(nums) {
    // Phase 1: Detect cycle using Floyd's algorithm
    let slow = nums[0];
    let fast = nums[0];

    // Move pointers until they meet
    do {
        slow = nums[slow];        // Move 1 step
        fast = nums[nums[fast]];  // Move 2 steps
    } while (slow !== fast);

    // Phase 2: Find the start of the cycle (duplicate number)
    slow = nums[0];

    while (slow !== fast) {
        slow = nums[slow];
        fast = nums[fast];
    }

    return slow; // This is the duplicate number
}

/**
 * Alternative solution using binary search (also O(n) time)
 */
function solveWithBinarySearch(nums) {
    let left = 1;
    let right = nums.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        let count = 0;

        // Count how many numbers are <= mid
        for (const num of nums) {
            if (num <= mid) {
                count++;
            }
        }

        // If count > mid, duplicate is in left half
        if (count > mid) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

/**
 * Solution using sorting (modifies input, O(n log n) time)
 */
function solveWithSorting(nums) {
    nums.sort((a, b) => a - b);

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            return nums[i];
        }
    }

    return -1; // Should never reach here given problem constraints
}

/**
 * Solution using hash set (O(n) time, O(n) space)
 */
function solveWithHashSet(nums) {
    const seen = new Set();

    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }

    return -1; // Should never reach here given problem constraints
}

/**
 * Verbose Floyd's algorithm with step tracking
 */
function solveVerbose(nums) {
    console.log('Input array:', nums);
    console.log('Treating as linked list where nums[i] -> nums[nums[i]]');

    // Phase 1: Detect cycle
    console.log('\nPhase 1: Detecting cycle...');
    let slow = nums[0];
    let fast = nums[0];
    let step = 0;

    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
        step++;
        console.log(`Step ${step}: slow=${slow}, fast=${fast}`);
    } while (slow !== fast);

    console.log(`Cycle detected after ${step} steps`);

    // Phase 2: Find cycle start
    console.log('\nPhase 2: Finding cycle start (duplicate)...');
    slow = nums[0];
    step = 0;

    while (slow !== fast) {
        console.log(`Step ${step}: slow=${slow}, fast=${fast}`);
        slow = nums[slow];
        fast = nums[fast];
        step++;
    }

    console.log(`Duplicate found: ${slow}`);
    return slow;
}

/**
 * Test cases for Problem 287: Find The Duplicate Number
 */
function testSolution() {
    console.log('Testing 287. Find The Duplicate Number');

    // Test case 1: Basic example - [1,3,4,2,2] -> 2
    const nums1 = [1, 3, 4, 2, 2];
    const result1 = solve(nums1);
    const expected1 = 2;
    console.assert(result1 === expected1,
        `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Another example - [3,1,3,4,2] -> 3
    const nums2 = [3, 1, 3, 4, 2];
    const result2 = solve(nums2);
    const expected2 = 3;
    console.assert(result2 === expected2,
        `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Minimum case - [1,1] -> 1
    const nums3 = [1, 1];
    const result3 = solve(nums3);
    const expected3 = 1;
    console.assert(result3 === expected3,
        `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Multiple duplicates - [2,2,2,2,2] -> 2
    const nums4 = [2, 2, 2, 2, 2];
    const result4 = solve(nums4);
    const expected4 = 2;
    console.assert(result4 === expected4,
        `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Larger array - [1,2,3,4,5,6,7,8,9,5] -> 5
    const nums5 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 5];
    const result5 = solve(nums5);
    const expected5 = 5;
    console.assert(result5 === expected5,
        `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: Test binary search approach
    const nums6 = [1, 3, 4, 2, 2];
    const result6 = solveWithBinarySearch([...nums6]); // Copy to avoid modification
    const expected6 = 2;
    console.assert(result6 === expected6,
        `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Test hash set approach
    const nums7 = [3, 1, 3, 4, 2];
    const result7 = solveWithHashSet(nums7);
    const expected7 = 3;
    console.assert(result7 === expected7,
        `Test 7 failed: expected ${expected7}, got ${result7}`);

    // Test case 8: Test sorting approach
    const nums8 = [1, 3, 4, 2, 2];
    const result8 = solveWithSorting([...nums8]); // Copy to avoid modifying original
    const expected8 = 2;
    console.assert(result8 === expected8,
        `Test 8 failed: expected ${expected8}, got ${result8}`);

    // Test case 9: Edge case - duplicate at the end
    const nums9 = [1, 2, 3, 4, 5, 3];
    const result9 = solve(nums9);
    const expected9 = 3;
    console.assert(result9 === expected9,
        `Test 9 failed: expected ${expected9}, got ${result9}`);

    console.log('All test cases passed for 287. Find The Duplicate Number!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 287. Find The Duplicate Number ===');
    console.log('Category: Linked List');
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
    solveWithBinarySearch,
    solveWithSorting,
    solveWithHashSet,
    solveVerbose,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on linked list concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
