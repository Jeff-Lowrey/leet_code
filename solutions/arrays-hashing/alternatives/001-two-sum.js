/**
 * Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return indices of the
 * two numbers such that they add up to `target`.
 * You may assume that each input would have exactly one solution, and you may
 * not use the same element twice.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [2,7,11,15], target = 9</dd>
 * <dt>Output:</dt>
 * <dd>[0,1]</dd>
 * <dt>Explanation:</dt>
 * <dd>Because nums[0] + nums[1] == 9, we return [0, 1]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight is to use a hash map to store numbers we've seen so far.
 *
 * For each number, we check if its complement (target - current_number) exists in our hash map.
 *
 * This allows us to find the pair in a single pass.
 *
 * ### APPROACH:
 * We start by creating a hash map (Map) to store the numbers we've encountered along with their indices.
 *
 * As we iterate through the array, for each number we calculate its complement - the value that would sum with the current number to reach our target. The complement is simply `target - current_number`.
 *
 * Before adding the current number to our hash map, we first check if its complement already exists in the map. If we find the complement, we've discovered our pair and can immediately return both indices: the stored index from the hash map and the current index.
 *
 * If the complement doesn't exist yet, we store the current number and its index in the hash map. This prepares us for future iterations where this number might be the complement we're looking for.
 *
 * The beauty of this approach is that we only need to make a single pass through the array. Each lookup in the hash map is O(1), making this dramatically faster than checking all possible pairs.
 *
 * ### WHY THIS WORKS:
 * Instead of checking every pair (O(n²)), we use hash map for O(1) lookup.
 *
 * We only need to store numbers we've already seen.
 *
 * When we find a complement, we know the current index and the stored index.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [2,7,11,15], target = 9
 * ```
 * **Step 1:** `num=2`, `complement=7`, `seen={}` → store `{2: 0}`
 * **Step 2:** `num=7`, `complement=2`, `seen={2: 0}` → found! return `[0, 1]`
 *
 * ### TIME COMPLEXITY:
 * **O(n)** - Single pass through array with O(1) hash map lookups
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Hash map stores up to n elements in worst case
 *
 * ### EDGE CASES:
 * - **No solution exists:** Problem guarantees exactly one solution
 * - **Duplicate values:** Hash map handles correctly by index
 * - **Two same numbers sum to target:** Works if at different indices
 * - **Negative numbers:** Algorithm works for any integers
 *
 * </details>
 */

class Solution {
    /**
     * Find two numbers that add up to target
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target sum
     * @return {number[]} - Indices of the two numbers
     *
     * Approach: Hash Map for O(n) lookup
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     */
    twoSum(nums, target) {
        // Map to store value -> index mapping
        const seen = new Map();

        for (let i = 0; i < nums.length; i++) {
            // Calculate complement needed to reach target
            const complement = target - nums[i];

            // Check if complement exists in our hash map
            if (seen.has(complement)) {
                return [seen.get(complement), i];
            }

            // Store current number and its index
            seen.set(nums[i], i);
        }

        // Should never reach here given problem constraints
        return [];
    }

    /**
     * Brute force approach - check all pairs
     * @param {number[]} nums - Array of integers
     * @param {number} target - Target sum
     * @return {number[]} - Indices of the two numbers
     *
     * Approach: Brute Force
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     */
    twoSumBruteForce(nums, target) {
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i, j];
                }
            }
        }

        return [];
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Solution;
}

// Test cases
function runTests() {
    const solution = new Solution();

    // Test case 1
    console.log("Test Case 1:");
    const nums1 = [2, 7, 11, 15];
    const target1 = 9;
    const result1 = solution.twoSum(nums1, target1);
    console.log(`Input: nums = ${JSON.stringify(nums1)}, target = ${target1}`);
    console.log(`Output: ${JSON.stringify(result1)}`);
    console.log(`Expected: [0, 1]`);
    console.log(`Pass: ${JSON.stringify(result1) === JSON.stringify([0, 1])}`);
    console.log();

    // Test case 2
    console.log("Test Case 2:");
    const nums2 = [3, 2, 4];
    const target2 = 6;
    const result2 = solution.twoSum(nums2, target2);
    console.log(`Input: nums = ${JSON.stringify(nums2)}, target = ${target2}`);
    console.log(`Output: ${JSON.stringify(result2)}`);
    console.log(`Expected: [1, 2]`);
    console.log(`Pass: ${JSON.stringify(result2) === JSON.stringify([1, 2])}`);
    console.log();

    // Test case 3
    console.log("Test Case 3:");
    const nums3 = [3, 3];
    const target3 = 6;
    const result3 = solution.twoSum(nums3, target3);
    console.log(`Input: nums = ${JSON.stringify(nums3)}, target = ${target3}`);
    console.log(`Output: ${JSON.stringify(result3)}`);
    console.log(`Expected: [0, 1]`);
    console.log(`Pass: ${JSON.stringify(result3) === JSON.stringify([0, 1])}`);
}

// Run tests if executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runTests();
}
