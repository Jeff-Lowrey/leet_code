/**
# 0374. Problem
 * 
 * # Difficulty: Easy
 * # 0374. Guess Number Higher Or Lower
 * 
 * We are playing the Guess Game. The game is as follows:
 * 
 * I pick a number from 1 to n. You have to guess which number I picked.
 * 
 * Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.
 * 
 * You call a pre-defined API int guess(int num), which returns three possible results:
 * - -1: Your guess is higher than the number I picked (i.e. num > pick).
 * - 1: Your guess is lower than the number I picked (i.e. num < pick).
 * - 0: Your guess is correct (i.e. num == pick).
 * 
 * Return the number that I picked.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1</dd>
 * <dt>Output:</dt>
 * <dd>* 6
 * 1
 * 1</dd>
 * <dt>Explanation:</dt>
 * <dd>Target number is guessed using binary search strategy</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Array Traversal, Two Pointers
 * **Data Structures**: Array, Stack, Tree
 * **Patterns**: Two Pointers Pattern, Hash Table Pattern
 * **Time Complexity**: O(log n) - Binary search or tree height
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * This is a classic binary search problem where we need to find a target number using feedback from a guess API. The key insight is to use the API response to narrow down the search space by half in each iteration.
 * 
 * ### APPROACH:
 * 1. **Binary search**: Use binary search on the range [1, n]
 * 2. **API feedback**: Use guess() API response to adjust search bounds
 * 3. **Boundary adjustment**: Move left/right pointers based on feedback
 * 4. **Termination**: Continue until API returns 0 (correct guess)
 * 
 * ### WHY THIS WORKS:
 * - Binary search optimally reduces search space by half each iteration
 * - API feedback provides perfect direction information
 * - Guaranteed to find the answer in O(log n) time
 * - Similar to searching in a sorted array but using API instead of direct comparison
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 10, pick = 6
 * n = 1, pick = 1
 * n = 2, pick = 1
 * ```
 *
 * Step 1: guess(5) returns 1 (pick > 5), so left = 6
 * Step 2: guess(8) returns -1 (pick < 8), so right = 7
 * Step 3: guess(6) returns 0 (correct!)
 * Step 1: guess(1) returns 0 (correct!)
 * Step 1: guess(1) returns 0 (correct!)
 *
 * Output:
 * ```
 * 6
 * 1
 * 1
 * ```

 * ### TIME COMPLEXITY:
 * O(log n)
 * - Binary search or tree height
 * Binary search through range [1, n]
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Only using constant extra space
 * 
 * ### EDGE CASES:
 * - Single number (n = 1): return 1
 * - Pick at boundaries (pick = 1 or pick = n)
 * - Large n values: use overflow-safe mid calculation
 * 
 * </details>
 */

class Solution {
  /**
   * Find the picked number using binary search with guess API.
   *
   *         Args:
   *             n: Upper bound of the number range [1, n]
   *
   *         Returns:
   *             The picked number
   *
   *         Time Complexity: O(log n)
   *         Space Complexity: O(1)
   */
  guessNumber(n: number): number {
    // Implementation
    left, right = 1, n
    while left <= right:
    mid = left + (right - left) // 2  // Avoid overflow
    result = guess(mid)
    if result == 0:
    return mid  # Found the correct number
    elif result == -1:
    right = mid - 1  // Guess too high, search lower half
  }

  /**
   * Recursive solution for guess number game.
   *
   *         Args:
   *             n: Upper bound of range
   *
   *         Returns:
   *             The picked number
   *
   *         Time Complexity: O(log n)
   *         Space Complexity: O(log n) due to recursion stack
   */
  guessNumberRecursive(n: number): number {
    // Implementation
    def binary_search(left: int, right: int) -> int:
    if left > right:
    return -1  # Should not happen
    mid = left + (right - left) // 2
    result = guess(mid)
    if result == 0:
    return mid
    elif result == -1:
  }

  /**
   * Linear search solution (inefficient but simple).
   *
   *         Args:
   *             n: Upper bound
   *
   *         Returns:
   *             The picked number
   *
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  guessNumberLinear(n: number): number {
    // Implementation
    for (let i = 0; i < 1, n + 1; i++) {
    if guess(i) == 0:
    return i
    return -1
    def test_solution() -> null:
    """
    Test cases for 374. Guess Number Higher Or Lower.
    """
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  test_solution()
  # Example usage
  solution = Solution()
  console.log(`=== 374. Guess Number Higher Or Lower ===`)
  # Demonstrate different scenarios
  test_cases = [(10, 6), (100, 25), (50, 1), (1, 1)]
  for n, pick in test_cases:
  guess.pick = pick  # type: ignore
  result = solution.guessNumber(n)
  console.log(`Range [1, n], picked number: result`)
  # Show API call simulation
  console.log(`\nAPI simulation for n=10, pick=6:`)
  guess.pick = 6  # type: ignore
  left, right = 1, 10
  call_count = 0
  while left <= right:
  mid = left + (right - left) // 2
  result = guess(mid)
  call_count += 1
  console.log(`Call {call_count}: guess({mid}) = result`)
  if result == 0:
  console.log(`Found! Answer is {mid}`)
  break
  elif result == -1:
  right = mid - 1
  else:
  left = mid + 1
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;