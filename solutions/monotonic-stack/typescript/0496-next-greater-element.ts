/**
 * # 0496. Next Greater Element
 * 
 * # Difficulty: Easy
 * 
 * The next greater element of some element x in an array is the first greater
 * element that is to the right of x in the same array.
 * 
 * You are given two distinct `0-indexed` integer arrays nums1 and nums2, where nums1
 * is a subset of nums2.
 * 
 * For each `0 <= i` < nums1.length, find the index `j` such that nums1[i] == nums2[j]
 * and determine the next greater element of nums2[j] in nums2.
 * 
 * Return an array ans of length nums1.length such that ans[i] is the next greater
 * element as described above.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums1 = [4,1,2], nums2 = [1,3,4,2]</dd>
 * <dt>Output:</dt>
 * <dd>[-1,3,-1]</dd>
 * <dt>Explanation:</dt>
 * <dd>For each element in nums1, find its next greater element in nums2: [4->-1, 1->3, 2->3]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: O(n + m)
 * **Space Complexity**: O(n) - Additional hash map storage
 * 
 * ### INTUITION:
 * Use a monotonic decreasing stack to efficiently find the next greater element for each number in nums2. The stack maintains elements in decreasing order, so when we find a larger element, we can pop and match all smaller elements with their next greater element.
 * 
 * ### APPROACH:
1. Traverse nums2 with a stack
2. For each element, pop all smaller elements from stack and map them to current element
3. Push current element to stack
4. Build result array by looking up each nums1 element in the mapping

### WHY THIS WORKS:
 * The monotonic stack ensures we process elements in the correct order. When we encounter a larger element, all smaller elements in the stack have found their next greater element. Elements remaining in the stack have no next greater element.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums1 = [4,1,2], nums2 = [1,3,4,2]
 * ```
 *
 * Steps:
 * Step 1: Process nums2[0]=1 → stack=[1]
 * Step 2: Process nums2[1]=3 → 3>1 → map[1]=3 → stack=[3]
 * Step 3: Process nums2[2]=4 → 4>3 → map[3]=4 → stack=[4]
 * Step 4: Process nums2[3]=2 → 2<4 → stack=[4,2]
 * Step 5: Build result for nums1=[4,1,2] → [map[4], map[1], map[2]] → [-1,3,-1]
 *
 * Final mapping:
 * ```
 * {1:3, 3:4, 4:-1, 2:-1}
 * ```
 *
 * Output:
 * ```
 * [-1,3,-1]
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n + m)
 *
 * - Based on input size and operations
 *

 * ### SPACE COMPLEXITY:
 * O(n)
 * - Additional hash map storage
 * 
 * ### EDGE CASES:
- **No greater element exists**: Return -1 for that element
- **Element not in nums2**: Should not occur (problem guarantees subset)
- **Increasing sequence**: Next greater is immediate right neighbor
- **Decreasing sequence**: No next greater for any element
- **Single element**: Return -1 (no next element)

</details>

</details>

</details>

</details>

</details>

</details>

</details>

</details>
 */

class Solution {
  /**
   * Approach: Monotonic stack
   *         Time Complexity: O(n + m)
   *         Space Complexity: O(n)
   */
  nextGreaterElement(nums1: number[], nums2: number[]): number[] {
    // Implementation
    stack: list.set(Any, []
    next_greater: dict[Any, Any] = {}
    for num in nums2:
    while stack and stack.get(-1) < num:
    next_greater[stack.pop()] = num
    stack.append(num)
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Next Greater Element I
  solution = Solution()
  console.log("Next Greater Element I:")
  test_cases = [([4, 1, 2], [1, 3, 4, 2]), ([2, 4], [1, 2, 3, 4])]
  for nums1, nums2 in test_cases:
  result = solution.nextGreaterElement(nums1, nums2)
  console.log(`nums1: {nums1}, nums2: {nums2}`)
  console.log(`Result: result\n`)
  # Test Next Greater Element II (Circular)
  solution_circular = SolutionCircular()
  console.log("Next Greater Element II (Circular):")
  circular_cases = [[1, 2, 1], [1, 2, 3, 4, 3], [5, 4, 3, 2, 1]]
  for nums in circular_cases:
  result = solution_circular.nextGreaterElements(nums)
  console.log(`Input: nums`)
  console.log(`Next Greater: result\n`)
  # Test Stock Spanner
  console.log("Stock Spanner:")
  spanner = StockSpanner()
  prices = [100, 80, 60, 70, 60, 75, 85]
  for price in prices:
  span = spanner.next(price)
  console.log(`Price: {price}, Span: {span}`)
  console.log("\n" + "=" * 50 + "\n")
  # Test Remove K Digits
  solution_remove = SolutionRemoveDigits()
  console.log("Remove K Digits:")
  remove_cases = [("1432219", 3), ("10200", 1), ("10", 2)]
  for num, k in remove_cases:
  remove_result: str = solution_remove.removeKdigits(num, k)
  console.log(`Number: '{num}', k={k}`)
  console.log(`Result: '{remove_result}'\n`)
  # Test Remove Duplicate Letters
  solution_dup = SolutionRemoveDuplicates()
  console.log("Remove Duplicate Letters:")
  dup_cases = ["bcabc", "cbacdcbc", "ecbacba"]
  for s in dup_cases:
  dup_result: str = solution_dup.removeDuplicateLetters(s)
  console.log(`Input: '{s}'`)
  console.log(`Result: '{dup_result}'\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;