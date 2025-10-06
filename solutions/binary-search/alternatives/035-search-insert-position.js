/**
 * 35. Search Insert Position
 * Medium
 *
 * Search Insert Position Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. @param {number[]} nums - The sorted array of integers @param {number} target - The target value to search for @return {number} - The index where target is found or should be inserted
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Search Insert Position is to understand the core problem pattern
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
 * Search Insert Position
 * 
 * Given a sorted array of distinct integers and a target value,
 * return the index if the target is found. If not, return the index
 * where it would be if it were inserted in order.
 * 
 * @param {number[]} nums - The sorted array of integers
 * @param {number} target - The target value to search for
 * @return {number} - The index where target is found or should be inserted
 */
function searchInsert(nums, target) {
    // Edge case: empty array
    if (!nums || nums.length === 0) {
        return 0;
    }

    let left = 0;
    let right = nums.length - 1;

    // Binary search implementation
    while (left <= right) {
        // Calculate middle index
        const mid = Math.floor((left + right) / 2);

        // If target is found, return its index
        if (nums[mid] === target) {
            return mid;
        }
        
        // If target is greater, ignore left half
        if (nums[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }

    // At this point, left > right
    // 'left' represents the position where target should be inserted
    return left;
}

// Test cases
function runTests() {
    const testCases = [
        {
            nums: [1, 3, 5, 6],
            target: 5,
            expected: 2,
            description: "Target exists in array"
        },
        {
            nums: [1, 3, 5, 6],
            target: 2,
            expected: 1,
            description: "Target doesn't exist - middle insertion"
        },
        {
            nums: [1, 3, 5, 6],
            target: 7,
            expected: 4,
            description: "Target doesn't exist - end insertion"
        },
        {
            nums: [1, 3, 5, 6],
            target: 0,
            expected: 0,
            description: "Target doesn't exist - start insertion"
        },
        {
            nums: [],
            target: 1,
            expected: 0,
            description: "Empty array"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = searchInsert(testCase.nums, testCase.target);
        console.log(`Test ${index + 1} (${testCase.description}):`);
        console.log(`Input: nums = [${testCase.nums}], target = ${testCase.target}`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Actual: ${result}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    });
}

// Run tests if this file is being executed directly
if (require.main === module) {
    runTests();
}

// Export the function for use in other modules
module.exports = searchInsert;