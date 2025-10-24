/**
 * # 1. Two Sum
 *
 * 1. Two Sum
 * Difficulty: Easy
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
 * ### METADATA:
 * **Techniques**: Hash Table Lookup, Single Pass
 * **Data Structures**: HashMap, Array
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
 * We start by creating a HashMap to store the numbers we've encountered along with their indices.
 *
 * As we iterate through the array, for each number we calculate its complement - the value that
 * would sum with the current number to reach our target. The complement is simply
 * `target - current_number`.
 *
 * Before adding the current number to our hash map, we first check if its complement already
 * exists in the map. If we find the complement, we've discovered our pair and can immediately
 * return both indices: the stored index from the hash map and the current index.
 *
 * If the complement doesn't exist yet, we store the current number and its index in the hash map.
 * This prepares us for future iterations where this number might be the complement we're looking for.
 *
 * The beauty of this approach is that we only need to make a single pass through the array.
 * Each lookup in the hash map is O(1), making this dramatically faster than checking all possible pairs.
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

### TIME COMPLEXITY:
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

import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

class Solution {
    /**
     * Find two numbers that add up to target
     *
     * Approach: Hash Map for O(n) lookup
     * Time Complexity: O(n)
     * Space Complexity: O(n)
     *
     * @param nums Array of integers
     * @param target Target sum
     * @return Indices of the two numbers
     */
    public int[] twoSum(int[] nums, int target) {
        // HashMap to store value -> index mapping
        Map<Integer, Integer> seen = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            // Calculate complement needed to reach target
            int complement = target - nums[i];

            // Check if complement exists in our hash map
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }

            // Store current number and its index
            seen.put(nums[i], i);
        }

        // Should never reach here given problem constraints
        return new int[] {};
    }

    /**
     * Brute force approach - check all pairs
     *
     * Approach: Brute Force
     * Time Complexity: O(n²)
     * Space Complexity: O(1)
     *
     * @param nums Array of integers
     * @param target Target sum
     * @return Indices of the two numbers
     */
    public int[] twoSumBruteForce(int[] nums, int target) {
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }

        return new int[] {};
    }

    // Test cases
    public static void main(String[] args) {
        Solution solution = new Solution();

        // Test case 1
        System.out.println("Test Case 1:");
        int[] nums1 = {2, 7, 11, 15};
        int target1 = 9;
        int[] result1 = solution.twoSum(nums1, target1);
        System.out.println("Input: nums = " + Arrays.toString(nums1) + ", target = " + target1);
        System.out.println("Output: " + Arrays.toString(result1));
        System.out.println("Expected: [0, 1]");
        System.out.println("Pass: " + Arrays.equals(result1, new int[]{0, 1}));
        System.out.println();

        // Test case 2
        System.out.println("Test Case 2:");
        int[] nums2 = {3, 2, 4};
        int target2 = 6;
        int[] result2 = solution.twoSum(nums2, target2);
        System.out.println("Input: nums = " + Arrays.toString(nums2) + ", target = " + target2);
        System.out.println("Output: " + Arrays.toString(result2));
        System.out.println("Expected: [1, 2]");
        System.out.println("Pass: " + Arrays.equals(result2, new int[]{1, 2}));
        System.out.println();

        // Test case 3
        System.out.println("Test Case 3:");
        int[] nums3 = {3, 3};
        int target3 = 6;
        int[] result3 = solution.twoSum(nums3, target3);
        System.out.println("Input: nums = " + Arrays.toString(nums3) + ", target = " + target3);
        System.out.println("Output: " + Arrays.toString(result3));
        System.out.println("Expected: [0, 1]");
        System.out.println("Pass: " + Arrays.equals(result3, new int[]{0, 1}));
    }
}
