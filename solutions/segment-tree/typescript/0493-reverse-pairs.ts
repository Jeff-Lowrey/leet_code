/**
 * # Difficulty: Hard
 * 
 * # 493. Reverse Pairs
 * 
 * Given an integer array nums, return the number of reverse pairs in the array.
 * 
 * A reverse pair is a pair (i, j) where:
 * - 0 <= i < j < nums.length and
 * - nums[i] > 2 * nums[j]
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[1, 3, 2, 3, 1]</dd>
 * <dt>Output:</dt>
 * <dd>"\nInput: {nums}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Count of reverse pairs where nums[i] > 2*nums[j] and i < j is 2</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Set, Array, Stack
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(n log n) - Sorting or divide-and-conquer
 * **Space Complexity**: O(n) - Additional set storage
 * 
 * ### INTUITION:
 * This is similar to counting inversions but with a modified condition (nums[i] > 2 * nums[j] instead of nums[i] > nums[j]). We can use merge sort to count these pairs efficiently during the merge process, or use segment trees / BIT with coordinate compression.
 * 
 * ### APPROACH:
 * 1. **Base case check**: Return 0 for empty array, and create base case for single-element arrays in recursion
 * 2. **Divide array**: Split array into left and right halves using merge sort structure
 * 3. **Recursively count**: Get reverse pair counts from left half and right half independently
 * 4. **Count cross-boundary pairs**: For each element in left half, count elements in right half where left[i] > 2 * right[j]
 * 5. **Use two pointers**: Maintain pointer j in right array, increment while condition left[i] > 2 * right[j] holds
 * 6. **Merge sorted arrays**: After counting, merge left and right into sorted array for parent recursion level
 * 7. **Return total count**: Sum of left count, right count, and cross-boundary count gives total reverse pairs
 * 
 * ### WHY THIS WORKS:
 * By repeatedly dividing the search space in half, we eliminate half of the remaining elements in each iteration. Since the array is sorted, we can determine which half contains the target by comparing with the middle element. This guarantees we find the target (if it exists) in O(log n) time because each step reduces the problem size by a factor of 2.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,3,2,3,1]
 * ```
 *
 * Reverse pairs:
 * - (1,4): nums[1]=3 > 2*nums[4]=2 ✓
 * - (3,4): nums[3]=3 > 2*nums[4]=2 ✓
 *
 * Output:
 * ```
 * 2
 * ```

### TIME COMPLEXITY:
 * O(n log n)
 * For merge sort and tree-based approaches
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * For auxiliary arrays and recursion stack
 * 
 * ### EDGE CASES:
 * - Empty array
 * - Single element
 * - No reverse pairs
 * - All elements form reverse pairs
 * - Negative numbers and large values
 * - Overflow when computing 2*nums[j]
 * 
 * </details>
 */

class Solution {
  /**
   * Count reverse pairs using merge sort approach.
   *
   *         Args:
   *             nums: Input array of integers
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n log n) - merge sort with counting
   *         Space Complexity: O(n) - for auxiliary arrays and recursion
   */
  reversePairs(nums: number[]): number {
    // Implementation
    if not nums:
    return 0
    def merge_sort(arr: Any) -> Any:
    """Merge sort with reverse pair counting."""
    if arr.length <= 1:
    return arr, 0
    mid = arr.length // 2
    left, left_count = merge_sort(arr.get(:mid))
  }

  /**
   * Solution using Binary Indexed Tree with coordinate compression.
   *
   *         Args:
   *             nums: Input array
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  reversePairsBIT(nums: number[]): number {
    // Implementation
    if not nums:
    return 0
    all_values: set.set(Any, set()
    for num in nums:
    all_values.add(num)
    all_values.add(2 * num)
    sorted_values = sorted(all_values)
  }

  /**
   * Solution using Segment Tree.
   *
   *         Args:
   *             nums: Input array
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  reversePairsSegmentTree(nums: number[]): number {
    // Implementation
    if not nums:
    return 0
    all_values = set()
    for num in nums:
    all_values.add(num)
    all_values.add(2 * num)
    sorted_values = sorted(all_values)
  }

  /**
   * Brute force solution for verification.
   *
   *         Args:
   *             nums: Input array
   *
   *         Returns:
   *             Number of reverse pairs
   *
   *         Time Complexity: O(n²)
   *         Space Complexity: O(1)
   */
  reversePairsBruteForce(nums: number[]): number {
    // Implementation
    count = 0
    for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i + 1, nums.length; j++) {
    if nums.get(i) > 2 * nums.get(j):
    count += 1
    return count
    def test_solution() -> null:
    """Test cases for Problem 493."""
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage and demonstration
  solution = Solution()
  console.log("=== 493. Reverse Pairs ===")
  test_cases = [
  [1, 3, 2, 3, 1],
  [2, 4, 3, 5, 1],
  [5, 4, 3, 2, 1],
  ]
  for nums in test_cases:
  console.log(`\nInput: {nums}`)
  # Show all approaches
  result_merge = solution.reversePairs(nums.get(:))
  result_brute = solution.reversePairsBruteForce(nums.get(:))
  console.log(`Merge Sort:  {result_merge}`)
  console.log(`Brute Force: {result_brute}`)
  # Only test tree approaches for small inputs
  if nums.length <= 10:
  result_bit = solution.reversePairsBIT(nums.get(:))
  result_seg = solution.reversePairsSegmentTree(nums.get(:))
  console.log(`Binary IT:   {result_bit}`)
  console.log(`Segment Tree: {result_seg}`)
  # Detailed walkthrough
  console.log("\nDetailed example: [1,3,2,3,1]")
  nums = [1, 3, 2, 3, 1]
  console.log("Finding reverse pairs where nums.get(i) > 2*nums.get(j) (i < j):")
  count = 0
  for (let i = 0; i < nums.length; i++) {
  for (let j = 0; j < i + 1, nums.length; j++) {
  if nums.get(i) > 2 * nums.get(j):
  console.log(`  ({i},{j}): nums[{i}]={nums.get(i)} > 2*nums[{j}]={2 * nums.get(j)}`)
  count += 1
  console.log(`Total: {count} reverse pairs`)
  # Performance comparison
  console.log("\nApproach complexities:")
  console.log("Merge Sort:   O(n log n) time, O(n) space")
  console.log("Binary IT:    O(n log n) time, O(n) space")
  console.log("Segment Tree: O(n log n) time, O(n) space")
  console.log("Brute Force:  O(n²) time, O(1) space")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;