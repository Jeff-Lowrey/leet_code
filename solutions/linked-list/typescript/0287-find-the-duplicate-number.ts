/**
 * # Difficulty: Medium
 *
 * # 0287. Find The Duplicate Number
 *
 *
 * Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
 *
 * There is only one repeated number in nums, return this repeated number.
 *
 * You must solve the problem without modifying the array nums and uses only constant extra space.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1,3,4,2,2]</dd>
 * <dt>Output:</dt>
 * <dd>2</dd>
 * <dt>Explanation:</dt>
 * <dd>The duplicate number is 2, which appears twice in the array</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Treat as cycle detection problem. Array indices are nodes, values are edges. Duplicate creates a cycle. Use Floyd's algorithm to find cycle entrance, which is the duplicate number.
 *
 * ### APPROACH:
 * 1. **Treat as linked list**: Consider array indices as linked list
 * 2. **Phase 1 - find cycle**: Use Floyd's algorithm with slow and fast pointers
 * 3. **Move at different speeds**: slow = nums[slow], fast = nums[nums[fast]]
 * 4. **Detect cycle**: When slow == fast, cycle detected
 * 5. **Phase 2 - find entrance**: Reset slow = nums[0], keep fast at meeting point
 * 6. **Move both at same speed**: Both move one step
 * 7. **Find duplicate**: When slow == fast, that's the duplicate number
 * 8. **Return result**: Return slow as the duplicate
 *
 * ### WHY THIS WORKS:
 * - Floyd's cycle detection treats array as implicit linked list where nums[i] points to nums[nums[i]]
 * - Duplicate value creates a cycle because two indices point to the same value
 * - Phase 1 (tortoise/hare) detects cycle existence in O(n) time
 * - Phase 2 finds cycle entrance (the duplicate) by mathematical property: distance to entrance equals distance from start
 * - Achieves O(1) space without modifying array, unlike hash set or sorting approaches
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,4,2,2]
 * ```
 *
 * Step 1: Floyd's cycle detection
 * slow=nums[0]=1, fast=nums[nums[0]]=3
 * slow=nums[1]=3, fast=nums[nums[3]]=2
 * slow=nums[3]=2, fast=nums[nums[2]]=3
 * slow=nums[2]=4, fast=nums[nums[3]]=2
 * slow=nums[4]=2, fast=nums[nums[2]]=3
 * slow=nums[2]=4, fast=nums[nums[3]]=2
 * slow=nums[4]=2, fast=nums[nums[2]]=3
 * Meet at 2
 * Step 2: Find cycle entrance
 * slow2=nums[0]=1, slow=nums[2]=4
 * slow2=nums[1]=3, slow=nums[4]=2
 * slow2=nums[3]=2, slow=nums[2]=4
 * slow2=nums[2]=4, slow=nums[4]=2
 * slow2=nums[4]=2, slow=nums[2]=4
 * Meet at 2
 *
 * Output:
 * ```
 * 2 (duplicate number)
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Find the duplicate number using Floyd's Cycle Detection.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1)
   */
  findDuplicate(nums: number[]): number {
    if (nums.length === 0) {
      return -1;
    }

    // Phase 1: Finding the intersection point of the two runners
    let tortoise = nums[0];
    let hare = nums[0];

    // Move tortoise one step and hare two steps until they meet
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
   * Alternative approach using binary search.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(1)
   */
  findDuplicateBinarySearch(nums: number[]): number {
    let left = 1;
    let right = nums.length - 1;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      let count = 0;

      // Count numbers <= mid
      for (const num of nums) {
        if (num <= mid) {
          count++;
        }
      }

      // If count > mid, duplicate is in left half
      if (count > mid) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Basic duplicate
  console.log(`Test 1: ${solution.findDuplicate([1, 3, 4, 2, 2]) === 2 ? "PASS" : "FAIL"}`);

  // Test case 2: Another duplicate
  console.log(`Test 2: ${solution.findDuplicate([3, 1, 3, 4, 2]) === 3 ? "PASS" : "FAIL"}`);

  // Test case 3: Duplicate at start
  console.log(`Test 3: ${solution.findDuplicate([2, 5, 9, 6, 9, 3, 8, 9, 7, 1, 4]) === 9 ? "PASS" : "FAIL"}`);

  // Test case 4: Binary search approach
  console.log(`Test 4: ${solution.findDuplicateBinarySearch([1, 3, 4, 2, 2]) === 2 ? "PASS" : "FAIL"}`);

  // Test case 5: Large array
  console.log(`Test 5: ${solution.findDuplicate([1, 1]) === 1 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
