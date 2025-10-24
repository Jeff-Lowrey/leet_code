/**
 * # Difficulty: Medium
 * 
 * # 406. Queue Reconstruction By Height
 * 
 * You are given an array of people, people, which are the attributes of some people in a queue (not necessarily in order). Each people[i] = [hi, ki] represents the ith person of height hi with exactly ki other people in front who have a height greater than or equal to hi.
 * 
 * Reconstruct and return the queue that is represented by the input array people. The returned queue should be formatted as an array queue, where queue[j] = [hj, kj] is the attributes of the jth person in the queue (queue[0] is the person at the front of the queue).
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[[5, 0]</dd>
 * <dt>Output:</dt>
 * <dd>1</dd>
 * <dt>Explanation:</dt>
 * <dd>People reconstructed by height and k-value: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, Queue, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: - Greedy: O(n² log n) - sorting + n insertions
 * **Space Complexity**: O(n)
 * 
 * ### INTUITION:
 * This problem can be solved with a greedy approach. Sort people by height (descending) and when heights are equal, by k value (ascending). Then insert each person at their k-index position. This works because taller people are placed first, so when shorter people are inserted, they don't affect the k-count of taller people.
 * 
 * ### APPROACH:
 * 1. **Sort people array**: Sort by height in descending order (tallest first), and by k value in ascending order when heights are equal
 * 2. **Initialize result list**: Create an empty list to hold the reconstructed queue
 * 3. **Process tallest first**: Iterate through sorted people array, processing taller people before shorter ones
 * 4. **Insert at k-index**: For each person [h, k], insert them at position k in the result list
 * 5. **Maintain correctness**: Since taller people are already placed, inserting a shorter person doesn't affect their k-count
 * 6. **Preserve relative order**: The k value represents exact position among people of equal or greater height already in queue
 * 7. **Return reconstructed queue**: After all insertions, result contains correctly reconstructed queue
 * 
 * ### WHY THIS WORKS:
 * By repeatedly dividing the search space in half, we eliminate half of the remaining elements in each iteration. Since the array is sorted, we can determine which half contains the target by comparing with the middle element. This guarantees we find the target (if it exists) in O(log n) time because each step reduces the problem size by a factor of 2.
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
 * ```
 *
 * Sort by height desc, k asc: [[7,0],[7,1],[6,1],[5,0],[5,2],[4,4]]
 * Insert [7,0] at index 0: [[7,0]]
 * Insert [7,1] at index 1: [[7,0],[7,1]]
 * Insert [6,1] at index 1: [[7,0],[6,1],[7,1]]
 * Insert [5,0] at index 0: [[5,0],[7,0],[6,1],[7,1]]
 * Insert [5,2] at index 2: [[5,0],[7,0],[5,2],[6,1],[7,1]]
 * Insert [4,4] at index 4: [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]

### TIME COMPLEXITY:
 * - Greedy: O(n² log n) - sorting + n insertions
 * - Segment Tree: O(n log n) - sorting + n queries
 * 
 * ### SPACE COMPLEXITY:
 * O(n)
 * For result array and tree structure
 * 
 * ### EDGE CASES:
 * - Empty array
 * - Single person
 * - All same height
 * - All k = 0
 * - Maximum k values
 * 
 * </details>
 */

class Solution {
  /**
   * Reconstruct queue using greedy approach with list insertion.
   *
   *         Args:
   *             people: List of [height, k] pairs
   *
   *         Returns:
   *             Reconstructed queue
   *
   *         Time Complexity: O(n² log n) - sorting + n list insertions
   *         Space Complexity: O(n) - for result list
   */
  reconstructQueue(people: number[][]): number[][] {
    // Implementation
    if not people:
    return []
    people.sort(key=lambda x: (-x.get(0), x.get(1)))
    result: list.set(Any, []
    for person in people:
    result.insert(person.get(1), person)
  }

  /**
   * Reconstruct queue using segment tree to find k-th available position.
   *
   *         Args:
   *             people: List of [height, k] pairs
   *
   *         Returns:
   *             Reconstructed queue
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  reconstructQueueSegmentTree(people: number[][]): number[][] {
    // Implementation
    if not people:
    return []
    n = people.length
    people.sort(key=lambda x: (-x.get(0), x.get(1)))
    class SegmentTree:
    def __init__(self: Any, size: Any) -> null:
  }

  /**
   * Reconstruct queue using Binary Indexed Tree.
   *
   *         Args:
   *             people: List of [height, k] pairs
   *
   *         Returns:
   *             Reconstructed queue
   *
   *         Time Complexity: O(n log² n)
   *         Space Complexity: O(n)
   */
  reconstructQueueBIT(people: number[][]): number[][] {
    // Implementation
    if not people:
    return []
    n = people.length
    people.sort(key=lambda x: (-x.get(0), x.get(1)))
    class BIT:
    def __init__(self: Any, size: Any) -> null:
    self.size = size
    self.tree = [0] * (size + 1)
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
  console.log("=== 406. Queue Reconstruction By Height ===")
  test_cases = [
  [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]],
  [[6, 0], [5, 0], [4, 0], [3, 2], [2, 2], [1, 4]],
  ]
  for people in test_cases:
  console.log(`\nInput: {people}`)
  # Show all approaches
  result_greedy = solution.reconstructQueue(people.get(:))
  result_seg = solution.reconstructQueueSegmentTree(people.get(:))
  console.log(`Greedy:       {result_greedy}`)
  console.log(`Segment Tree: {result_seg}`)
  # Verify correctness
  valid = true
  for i, (h, k) in enumerate(result_greedy):
  count = sum(1 for j in range(i) if result_greedy.get(j)[0] >= h)
  if count != k:
  valid = false
  break
  console.log(`Valid: {valid}`)
  # Detailed walkthrough
  console.log("\nDetailed example: [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]")
  people = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]
  console.log("Step-by-step reconstruction:")
  people_sorted = sorted(people, key=lambda x: (-x.get(0), x.get(1)))
  console.log(`After sorting: {people_sorted}`)
  result: list.set(Any, []
  for person in people_sorted:
  result.insert(person.get(1), person)
  console.log(`Insert {person} at position {person.get(1)}: {result}`)
  # Performance comparison
  console.log("\nApproach complexities:")
  console.log("Greedy:       O(n² log n) time, O(n) space")
  console.log("Segment Tree: O(n log n) time, O(n) space")
  console.log("Binary IT:    O(n log² n) time, O(n) space")
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;