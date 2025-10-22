/**
 * # 15. 3sum
 *
 * # Difficulty: Medium
 *
 * Given an integer array `nums`, return all the triplets [`nums`[i], `nums`[j], `nums`[k]]
 * such that `i` != `j`, `i` != `k`, and `j` != `k`, and `nums`[i] + `nums`[j] + `nums`[k] == 0.
 *
 * Notice that the solution `set` must not contain duplicate triplets.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [-1,0,1,2,-1,-4]</dd>
 * <dt>Output:</dt>
 * <dd>[[-1,-1,2],[-1,0,1]]</dd>
 * <dt>Explanation:</dt>
 * <dd>3Sum: triplets summing to 0 in [-1,0,1,2,-1,-4] are [[-1,-1,2],[-1,0,1]]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n²) - Nested iteration through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Convert the 3Sum problem into multiple 2Sum problems. For each number, find pairs in the remaining array that sum to the negative of that number. Sorting helps avoid duplicates and enables two-pointer technique.
 *
 * ### APPROACH:
 * 1. **Sort Array**: Enables two-pointer technique and easy duplicate handling
 * 2. **Fix First Element**: For each nums[i], find pairs that sum to -nums[i]
 * 3. **Two Pointers**: Use left and right pointers to find the required sum
 * 4. **Skip Duplicates**: Avoid duplicate triplets by skipping repeated values
 *
 * ### WHY THIS WORKS:
 * Sorting enables efficient duplicate skipping and the two-pointer technique. For each fixed first element, the problem reduces to finding two numbers that sum to a target, which is efficiently solved with two pointers.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For nums = [-1,0,1,2,-1,-4], after sorting: [-4,-1,-1,0,1,2]
 * 1. i=0, nums[i]=-4, target=4: no valid pairs
 * 2. i=1, nums[i]=-1, target=1: find pairs summing to 1
 *    - left=2(-1), right=5(2): sum=1 ✓ → triplet [-1,-1,2]
 * 3. i=2: skip (duplicate -1)
 * 4. i=3, nums[i]=0, target=0: find pairs summing to 0
 *    - left=4(1), right=5(2): sum=3 > 0, move right
 *    - No valid pairs
 * 5. Continue...
 *
 * ### TIME COMPLEXITY:
 * O(n²)
 * - O(n log n) for sorting
 * - O(n²) for nested loops with two pointers
 * - Overall: O(n²)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Excluding output space, only using constant extra space
 * - Sorting can be done in-place
 *
 * ### EDGE CASES:
 * - Array length < 3: return []
 * - All positive/negative numbers: return []
 * - Array with all zeros: return [[0,0,0]] if length ≥ 3
 *
 * </details>
 */

class Solution {
  threeSum(nums: number[]): number[][] {
    const result: number[][] = [];
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[left] + nums[right];

        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);

          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;

          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.threeSum([-1, 0, 1, 2, -1, -4]);
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([[-1, -1, 2], [-1, 0, 1]]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.threeSum([0, 1, 1]);
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify([]) ? "PASS" : "FAIL"}`);

  const result3 = solution.threeSum([0, 0, 0]);
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify([[0, 0, 0]]) ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
