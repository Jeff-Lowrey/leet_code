/**
 * # 324. Wiggle Sort Ii
 *
 * LeetCode Problem 324: Wiggle Sort II
 * Difficulty: Medium
 * Category: Sorting
 *
 * Problem Description:
 * Given an integer array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....
 *
 * Example 1:
 * Input: nums = [1,5,1,1,6,4]
 * Output: [1,6,1,5,1,4]
 *
 * Example 2:
 * Input: nums = [1,3,2,2,3,1]
 * Output: [2,3,1,3,1,2]
 *
 * Constraints:
 * - 1 <= nums.length <= 5 * 10^4
 * - 0 <= nums[i] <= 5000
 *
 * METADATA:
 * Techniques: Sorting, Virtual indexing, Partitioning, Two-pointer technique
 * Data Structures: Array, In-place manipulation
 * Patterns: Wiggle pattern, Median finding, Index mapping
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */

function wiggleSort(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    const mid = Math.floor((n + 1) / 2);

    const small = sorted.slice(0, mid).reverse();
    const large = sorted.slice(mid).reverse();

    for (let i = 0; i < small.length; i++) {
        nums[i * 2] = small[i];
    }

    for (let i = 0; i < large.length; i++) {
        nums[i * 2 + 1] = large[i];
    }
}

function verifyWiggle(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (i % 2 === 0) {
            if (nums[i] >= nums[i + 1]) return false;
        } else {
            if (nums[i] <= nums[i + 1]) return false;
        }
    }
    return true;
}

if (require.main === module) {
    const testCases = [
        [1, 5, 1, 1, 6, 4],
        [1, 3, 2, 2, 3, 1],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1, 1, 2, 2, 3, 3],
        [4, 5, 5, 6]
    ];

    console.log("Testing wiggleSort:");
    for (const test of testCases) {
        const nums = [...test];
        const original = [...test];
        wiggleSort(nums);
        const isValid = verifyWiggle(nums);
        const status = isValid ? "✓" : "✗";
        console.log(`${status} Input: [${original}]`);
        console.log(`   Output: [${nums}], Valid: ${isValid}`);
    }
}

module.exports = { wiggleSort, verifyWiggle };
