/**
 * 287. Find The Duplicate Number
 * Medium
 *
 * Find Duplicate Number - LeetCode 287 Problem: Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one. Constraints: - All numbers in the array are in the range [1, n] - The array contains n + 1 integers - Only one number is duplicated - The duplicate number can appear multiple times
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Find The Duplicate Number is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Find Duplicate Number - LeetCode 287
 * 
 * Problem: Given an array nums containing n + 1 integers where each integer 
 * is between 1 and n (inclusive), prove that at least one duplicate number 
 * must exist. Assume that there is only one duplicate number, find the duplicate one.
 * 
 * Constraints:
 * - All numbers in the array are in the range [1, n]
 * - The array contains n + 1 integers
 * - Only one number is duplicated
 * - The duplicate number can appear multiple times
 */

/**
 * Finds the duplicate number in an array using Floyd's Tortoise and Hare algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * 
 * @param {number[]} nums - Array of numbers containing one duplicate
 * @return {number} - The duplicate number
 */
function findDuplicate(nums) {
    if (!nums || nums.length < 2) {
        return -1; // Invalid input
    }

    // Phase 1: Finding the intersection point of the two runners
    let tortoise = nums[0];
    let hare = nums[0];

    do {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    } while (tortoise !== hare);

    // Phase 2: Finding the entrance to the cycle
    tortoise = nums[0];
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }

    return hare;
}

/**
 * Alternative implementation using Set
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * 
 * @param {number[]} nums - Array of numbers containing one duplicate
 * @return {number} - The duplicate number
 */
function findDuplicateUsingSet(nums) {
    const seen = new Set();
    
    for (const num of nums) {
        if (seen.has(num)) {
            return num;
        }
        seen.add(num);
    }
    
    return -1; // No duplicate found
}

// Test cases
function runTests() {
    const testCases = [
        [1, 3, 4, 2, 2],
        [3, 1, 3, 4, 2],
        [1, 1],
        [1, 1, 2],
    ];

    console.log("Testing Floyd's Tortoise and Hare method:");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`, test);
        console.log(`Result: ${findDuplicate(test)}\n`);
    });

    console.log("Testing Set method:");
    testCases.forEach((test, index) => {
        console.log(`Test ${index + 1}:`, test);
        console.log(`Result: ${findDuplicateUsingSet(test)}\n`);
    });
}

// Export functions for external use
module.exports = {
    findDuplicate,
    findDuplicateUsingSet
};

// Run tests if file is executed directly
if (require.main === module) {
    runTests();
}