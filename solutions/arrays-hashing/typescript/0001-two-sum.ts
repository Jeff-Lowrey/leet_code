/**
 * # 1. Two Sum
 *
 * Difficulty: Easy
 *
 * # Difficulty: Easy
 *
 * Given an array of integers `nums` and an integer `target`, return indices of the
 * two numbers such that they add up to `target`.
 *
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
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Single Pass
 * **Data Structures**: Hash Map, Array
 * **Patterns**: Complement Search
 * **Time Complexity**: **O(n)** - Single pass through array with O(1) hash map lookups
 * **Space Complexity**: **O(n)** - Hash map stores up to n elements in worst case
 *
 * ### INTUITION:
 * The key insight is to use a hash map to store numbers we've seen so far.
 *
 * For each number, we check if its complement (target - current_number) exists in our hash map.
 *
 * This allows us to find the pair in a single pass.
 *
 * ### APPROACH:
 * We start by creating a hash map (dictionary) to store the numbers we've encountered along with their indices.
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
   * Approach: Hash Map for O(n) lookup
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const complement = target - num;

      if (seen.has(complement)) {
        return [seen.get(complement)!, i];
      }

      seen.set(num, i);
    }

    return [];
  }

  /**
   * Brute Force Approach
   * Time Complexity: O(n²)
   * Space Complexity: O(1)
   */
  twoSumBruteForce(nums: number[], target: number): number[] {
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

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const nums1 = [2, 7, 11, 15];
  const target1 = 9;
  console.log(`Input: ${nums1}, Target: ${target1}`);
  console.log(`Output: ${solution.twoSum(nums1, target1)}`); // [0, 1]

  // Test case 2
  const nums2 = [3, 2, 4];
  const target2 = 6;
  console.log(`Input: ${nums2}, Target: ${target2}`);
  console.log(`Output: ${solution.twoSum(nums2, target2)}`); // [1, 2]

  // Test case 3
  const nums3 = [3, 3];
  const target3 = 6;
  console.log(`Input: ${nums3}, Target: ${target3}`);
  console.log(`Output: ${solution.twoSum(nums3, target3)}`); // [0, 1]
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
