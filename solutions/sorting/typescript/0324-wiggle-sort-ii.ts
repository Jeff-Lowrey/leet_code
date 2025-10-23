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

function wiggleSort(nums: number[]): void {
    const sorted: number[] = [...nums].sort((a, b) => a - b);
    const n: number = nums.length;
    const mid: number = Math.floor((n + 1) / 2);

    const small: number[] = sorted.slice(0, mid).reverse();
    const large: number[] = sorted.slice(mid).reverse();

    for (let i = 0; i < small.length; i++) {
        nums[i * 2] = small[i];
    }

    for (let i = 0; i < large.length; i++) {
        nums[i * 2 + 1] = large[i];
    }
}

function verifyWiggle(nums: number[]): boolean {
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
    const testCases: number[][] = [
        [1, 5, 1, 1, 6, 4],
        [1, 3, 2, 2, 3, 1],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1, 1, 2, 2, 3, 3],
        [4, 5, 5, 6]
    ];

    console.log("Testing wiggleSort:");
    for (const test of testCases) {
        const nums: number[] = [...test];
        const original: number[] = [...test];
        wiggleSort(nums);
        const isValid: boolean = verifyWiggle(nums);
        const status: string = isValid ? "✓" : "✗";
        console.log(`${status} Input: [${original}]`);
        console.log(`   Output: [${nums}], Valid: ${isValid}`);
    }
}

export { wiggleSort, verifyWiggle };
