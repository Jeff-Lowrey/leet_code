/**
 * # 1. Two Sum
 *
 * Given an array of integers `nums` and an integer `target`, return indices
 * of the two numbers such that they add up to `target`.
 *
 * ## Example 1:
 * Input: nums = [2,7,11,15], target = 9
 * Output: [0,1]
 *
 * ## Constraints:
 * - 2 <= nums.length <= 10^4
 * - -10^9 <= nums[i] <= 10^9
 */

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};

module.exports = { twoSum };
