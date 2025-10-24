/**
 * # 1306. Jump Game Iii
 *
 * # Difficulty: Medium
 *
 * Given an array of non-negative integers arr, you are initially positioned at start index.
 * When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach
 * any index with value 0.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>arr = [4,2,3,0,3,1,2], start = 5</dd>
 * <dt>Output:</dt>
 * <dd>true</dd>
 * <dt>Explanation:</dt>
 * <dd>Starting at index 2, you can reach index 4 by jumping</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass with O(1) hash lookups
 * **Space Complexity**: O(n) for visited set and recursion/queue - Additional hash map storage
 *
 * ### INTUITION:
 * This is a graph reachability problem. Each index is a node, and edges exist to indices
 * i+arr[i] and i-arr[i]. Use DFS or BFS to explore all reachable indices from start.
 *
 * ### APPROACH:
 * 1. **Track visited**: Prevent infinite loops
 * 2. **DFS/BFS**: Explore all reachable indices
 * 3. **Check zero**: Return true if any visited index has value 0
 * 4. **Bounds check**: Only jump to valid indices
 *
 * ### WHY THIS WORKS:
 * Since we mark visited indices, we explore each node once, avoiding cycles.
 * If any reachable node has value 0, we return true.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * arr = [4,2,3,0,3,1,2], start = 5
 * ```
 *
 * visited: dict[Any, Any] = {}
 * DFS(5): arr[5]=1
 * - Jump to 5+1=6: DFS(6)
 * - Jump to 5-1=4: DFS(4)
 * DFS(6): arr[6]=2
 * - Jump to 6+2=8: out of bounds
 * - Jump to 6-2=4: already visited
 * DFS(4): arr[4]=3
 * - Jump to 4+3=7: out of bounds
 * - Jump to 4-3=1: DFS(1)
 * DFS(1): arr[1]=2
 * - Jump to 1+2=3: DFS(3)
 *
 * Steps:
 * Step 1: DFS(3): arr[3]=0 → return true!
 * 
 * Output:
 * ```
 * return true!
 * ```
 * 
 * ### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(n) for visited set and recursion/queue
 *
 * ### EDGE CASES:
 * - **Start at target value**: Return True immediately
 * - **Infinite loop**: Visited tracking prevents infinite loops
 * - **All jumps lead out of bounds**: Return False
 * - **Multiple paths to zero**: BFS/DFS finds any path
 * - **Single element array**: Check if that element is 0
 *
 * </details>
 */

class Solution {
  /**
   * Check if can reach zero using DFS.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  canReach(arr: number[], start: number): boolean {
    const n = arr.length;
    const visited: Set<number> = new Set();

    const dfs = (index: number): boolean => {
      if (index < 0 || index >= n || visited.has(index)) {
        return false;
      }

      if (arr[index] === 0) {
        return true;
      }

      visited.add(index);

      return dfs(index + arr[index]) || dfs(index - arr[index]);
    };

    return dfs(start);
  }

  /**
   * Check if can reach zero using BFS.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  canReachBFS(arr: number[], start: number): boolean {
    const n = arr.length;
    const visited = new Set([start]);
    const queue: number[] = [start];

    while (queue.length > 0) {
      const index = queue.shift()!;

      if (arr[index] === 0) {
        return true;
      }

      for (const nextIndex of [index + arr[index], index - arr[index]]) {
        if (nextIndex >= 0 && nextIndex < n && !visited.has(nextIndex)) {
          visited.add(nextIndex);
          queue.push(nextIndex);
        }
      }
    }

    return false;
  }

  /**
   * Check if can reach zero using iterative DFS with stack.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  canReachIterative(arr: number[], start: number): boolean {
    const n = arr.length;
    const visited: Set<number> = new Set();
    const stack: number[] = [start];

    while (stack.length > 0) {
      const index = stack.pop()!;

      if (index < 0 || index >= n || visited.has(index)) {
        continue;
      }

      if (arr[index] === 0) {
        return true;
      }

      visited.add(index);
      stack.push(index + arr[index]);
      stack.push(index - arr[index]);
    }

    return false;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.canReach([4, 2, 3, 0, 3, 1, 2], 5) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.canReach([4, 2, 3, 0, 3, 1, 2], 0) === true ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.canReach([3, 0, 2, 1, 2], 2) === false ? "PASS" : "FAIL"}`);
  console.log(`Test 4: ${solution.canReachBFS([4, 2, 3, 0, 3, 1, 2], 5) === true ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
