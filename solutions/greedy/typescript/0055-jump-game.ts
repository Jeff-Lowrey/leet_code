/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is that use greedy approach to track the farthest position we can reach. If at any point our current position exceeds the farthest reachable position, we can't proceed further.
 *
 * ### APPROACH:
 * 1. **Initialize max reachable position**: Set max_reach to 0, representing the farthest index we can currently reach
 * 2. **Iterate through array**: Loop through each position i from start to end
 * 3. **Check if position is reachable**: If current position i exceeds max_reach, we cannot reach this position - return False
 * 4. **Update max reachable**: Calculate the farthest position reachable from current index (i + nums[i]) and update max_reach
 * 5. **Early termination check**: If max_reach >= last index, we can definitely reach the end - return True immediately
 * 6. **Continue until end**: If loop completes without returning False, we successfully traversed the array - return True
 *
 * ### WHY THIS WORKS:
 * - We only need to know if the last index is reachable, not the actual path
 * - Greedy choice: always try to reach the farthest possible position
 * - If we can reach position i, and from i we can jump nums[i] steps, then we can reach any position up to i + nums[i]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [2,3,1,1,4]
 * ```
 *
 * Step 1: Initialize max_reach = 0
 * Step 2: Iterate and update max_reach
 * i=0: can reach (0 ≤ 0), max_reach = max(0, 0+2) = 2
 * i=1: can reach (1 ≤ 2), max_reach = max(2, 1+3) = 4
 * i=2: can reach (2 ≤ 4), max_reach = max(4, 2+1) = 4
 * i=3: can reach (3 ≤ 4), max_reach = max(4, 3+1) = 4
 * i=4: reached last index
 *
 * Output:
 * ```
 * True (can reach end)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Single element array**: Always return True (already at end)
 * - **Array starts with 0**: Can't move forward, return False
 * - **Zero in middle blocking path**: Detected when current position exceeds max_reach
 * - **All zeros except first**: Return False unless array length is 1
 * - **Maximum jump values**: Can reach end in one jump, return True immediately
 *
 * *
 */

class Solution {
  /**
   * Approach: Greedy - Track maximum reachable position
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  canJump(nums: number[]): boolean {
    // Implementation
    max_reach = 0
    n = nums.length
    for (let i = 0; i < n; i++) {
    if i > max_reach:
    return false
    max_reach = max(max_reach, i + nums.get(i))
  }

  /**
   * Approach: Greedy - Work backwards
   *         Time Complexity: O(n)
   *         Space Complexity: O(1)
   */
  canJumpBackwards(nums: number[]): boolean {
    // Implementation
    last_pos = nums.length - 1
    for (let i = 0; i < nums.length - 2, -1, -1; i++) {
    if i + nums.get(i) >= last_pos:
    last_pos = i
    return last_pos == 0
  }

  /**
   * Approach: Dynamic Programming
   *         Time Complexity: O(n²)
   *         Space Complexity: O(n)
   */
  canJumpDP(nums: number[]): boolean {
    // Implementation
    n = nums.length
    dp = [false] * n
    dp.set(0, true
    for (let i = 0; i < 1, n; i++) {
    for (let j = 0; j < i; j++) {
    if dp.get(j) and j + nums.get(j) >= i:
    dp.set(i, true
    break
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  # Test Jump Game
  solution_jump = Solution()
  console.log("Jump Game:")
  test_cases_jump = [[2, 3, 1, 1, 4], [3, 2, 1, 0, 4], [0], [2, 0, 0]]
  for nums in test_cases_jump:
  result = solution_jump.canJump(nums)
  console.log(`Input: nums -> Can Jump: result`)
  console.log("\n" + "=" * 50 + "\n")
  # Test Jump Game II
  solution_jump2 = SolutionJumpII()
  console.log("Jump Game II:")
  test_cases_jump2 = [[2, 3, 1, 1, 4], [2, 3, 0, 1, 4], [1, 1, 1, 1], [1]]
  for nums in test_cases_jump2:
  jumps: int = solution_jump2.jump(nums)
  console.log(`Input: nums -> Min Jumps: {jumps}`)
  console.log("\n" + "=" * 50 + "\n")
  # Test Gas Station
  solution_gas = SolutionGasStation()
  console.log("Gas Station:")
  test_cases_gas = [([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]), ([2, 3, 4], [3, 4, 3]), ([5, 1, 2, 3, 4], [4, 4, 1, 5, 1])]
  for gas, cost in test_cases_gas:
  start_station: int = solution_gas.canCompleteCircuit(gas, cost)
  console.log(`Gas: {gas}`)
  console.log(`Cost: {cost}`)
  console.log(`Start Station: {start_station}\n`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;