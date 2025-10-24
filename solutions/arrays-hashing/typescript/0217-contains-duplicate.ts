/**
 * # 217. Contains Duplicate
 *
 * Difficulty: Medium
 *
 * # Difficulty: Easy
 *
 * Given an integer array `nums`, return true if any value appears at least twice
 * in the array, and return false if every element is distinct.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,2,3,1]</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>The array [1,2,3,1] contains duplicate value 1</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n) - Single pass with O(1) hash lookups
 * **Space Complexity**: O(n) - Additional set storage
 *
 * ### INTUITION:
 * If all elements are unique, then the array length equals the set length.
 * If there are duplicates, the set will be smaller than the array.
 *
 * ### APPROACH:
 * 1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
 * 2. **Compare lengths**: Calculate the length of both the original array and the newly created set
 * 3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
 * 4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
 * 5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set
 *
 * ### WHY THIS WORKS:
 * A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1, 2, 3, 1]
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 *
 * ### EDGE CASES:
 * - **Empty array**: Return False (no duplicates possible)
 * - **Single element**: Return False (need at least 2 for duplicate)
 * - **All elements same**: Return True immediately on second element
 * - **All elements unique**: Set and array lengths match, return False
 * - **Duplicate at start**: Early termination finds it quickly
 *
 * </details>
 */

class Solution {
  /**
   * Approach: Hash Set
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  containsDuplicate(nums: number[]): boolean {
    return nums.length !== new Set(nums).size;
  }

  /**
   * Approach: Hash Set with early termination
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  containsDuplicateVerbose(nums: number[]): boolean {
    const seen = new Set<number>();

    for (const num of nums) {
      if (seen.has(num)) {
        return true;
      }
      seen.add(num);
    }

    return false;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const nums1 = [1, 2, 3, 1];
  console.log(`Input: ${JSON.stringify(nums1)}`);
  console.log(`Output: ${solution.containsDuplicate(nums1)}`); // true

  // Test case 2
  const nums2 = [1, 2, 3, 4];
  console.log(`Input: ${JSON.stringify(nums2)}`);
  console.log(`Output: ${solution.containsDuplicate(nums2)}`); // false

  // Test case 3
  const nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
  console.log(`Input: ${JSON.stringify(nums3)}`);
  console.log(`Output: ${solution.containsDuplicate(nums3)}`); // true
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
