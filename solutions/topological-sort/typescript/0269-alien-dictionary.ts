/**
 * # Difficulty: Medium
 *
 * # 269. Alien Dictionary
 *
 * Difficulty: Medium
 *
 * There is a new alien language that uses the English alphabet. However, the order among the letters is unknown to you.
 *
 * You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.
 *
 * Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return "". If there are multiple solutions, return any of them.
 *
 * A string s is lexicographically smaller than a string t if at the first letter where they differ, the letter in s comes before the letter in t in the alien language. If the first min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>words = ["wrt","wrf","er","ett","rftt"]</dd>
 * <dt>Output:</dt>
 * <dd>"wertf"</dd>
 * <dt>Explanation:</dt>
 * <dd>Alien dictionary order from ['wrt','wrf','er','ett','rftt'] is 'wertf'</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern, Greedy Algorithm
 * **Time Complexity**: O(n) - Single pass with O(1) hash lookups
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Build graph from word pairs by comparing adjacent words. Find first different character to establish order. Perform topological sort using DFS or BFS. Detect cycles (impossible ordering).
 *
 * ### APPROACH:
 * 1. **Build graph**: Compare adjacent words to find character ordering
 * 2. **Track indegrees**: Count incoming edges for each character
 * 3. **Initialize queue**: Add characters with indegree 0 to queue
 * 4. **BFS traversal**: While queue not empty, dequeue character
 * 5. **Add to result**: Append character to result
 * 6. **Update neighbors**: For each neighbor, decrement indegree
 * 7. **Add to queue**: If indegree becomes 0, add to queue
 * 8. **Return result**: If all characters processed, return ''.join(result); else return ''
 *
 * ### WHY THIS WORKS:
 * - Build graph from adjacent word pairs: first differing char creates edge
 * - Topological sort on character DAG gives alien dictionary order
 * - If cycle detected (via DFS or indegree), no valid ordering exists
 * - Invalid case: word1 longer than word2 but word1 prefix of word2
 * - O(n * k) time: n words, k avg length, O(1) space for alphabet-size graph
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * words = ["wrt","wrf","er","ett","rftt"]
 * ```
 *
 * Step 1: Build graph from word pairs
 *
 * Steps:
 * Step 1: "wrt" vs "wrf": t→f
 * Step 2: "wrf" vs "er": w→e
 * Step 3: "er" vs "ett": r→t
 * Step 4: "ett" vs "rftt": e→r
 * Step 5: Topological sort
 * Step 6: Order: w→e→r→t→f
 *
 * Output:
 * ```
 * "wertf"
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass with O(1) hash lookups
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
   * Find alien alphabet order using DFS topological sort.
   *
   * Time Complexity: O(C) where C is total characters
   * Space Complexity: O(1) for fixed alphabet size
   */
  alienOrder(words: string[]): string {
    if (!words || words.length === 0) {
      return "";
    }

    const adj: Map<string, Set<string>> = new Map();
    const chars = new Set(words.join(""));

    for (let i = 0; i < words.length - 1; i++) {
      const w1 = words[i];
      const w2 = words[i + 1];

      if (w1.length > w2.length && w1.startsWith(w2)) {
        return "";
      }

      for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
        if (w1[j] !== w2[j]) {
          if (!adj.has(w1[j])) {
            adj.set(w1[j], new Set());
          }
          adj.get(w1[j])!.add(w2[j]);
          break;
        }
      }
    }

    const visited: Map<string, boolean> = new Map();
    const result: string[] = [];

    const dfs = (char: string): boolean => {
      if (visited.has(char)) {
        return visited.get(char)!;
      }

      visited.set(char, false);

      if (adj.has(char)) {
        for (const neighbor of adj.get(char)!) {
          if (!dfs(neighbor)) {
            return false;
          }
        }
      }

      visited.set(char, true);
      result.push(char);
      return true;
    };

    for (const char of chars) {
      if (!visited.has(char)) {
        if (!dfs(char)) {
          return "";
        }
      }
    }

    return result.reverse().join("");
  }

  /**
   * Alternative BFS implementation (Kahn's algorithm).
   *
   * Time Complexity: O(C)
   * Space Complexity: O(1)
   */
  alienOrderBFS(words: string[]): string {
    const adj: Map<string, Set<string>> = new Map();
    const inDegree: Map<string, number> = new Map();
    const chars = new Set(words.join(""));

    for (const char of chars) {
      inDegree.set(char, 0);
    }

    for (let i = 0; i < words.length - 1; i++) {
      const w1 = words[i];
      const w2 = words[i + 1];

      if (w1.length > w2.length && w1.startsWith(w2)) {
        return "";
      }

      for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
        if (w1[j] !== w2[j]) {
          if (!adj.has(w1[j])) {
            adj.set(w1[j], new Set());
          }
          if (!adj.get(w1[j])!.has(w2[j])) {
            adj.get(w1[j])!.add(w2[j]);
            inDegree.set(w2[j], inDegree.get(w2[j])! + 1);
          }
          break;
        }
      }
    }

    const queue: string[] = [];
    for (const char of chars) {
      if (inDegree.get(char) === 0) {
        queue.push(char);
      }
    }

    const result: string[] = [];
    while (queue.length > 0) {
      const char = queue.shift()!;
      result.push(char);

      if (adj.has(char)) {
        for (const neighbor of adj.get(char)!) {
          inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
          if (inDegree.get(neighbor) === 0) {
            queue.push(neighbor);
          }
        }
      }
    }

    return result.length === chars.size ? result.join("") : "";
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.alienOrder(["wrt", "wrf", "er", "ett", "rftt"]);
  console.log(`Test 1: ${result1 === "wertf" ? "PASS" : "FAIL"}`);

  const result2 = solution.alienOrder(["z", "x"]);
  console.log(`Test 2: ${result2 === "zx" ? "PASS" : "FAIL"}`);

  const result3 = solution.alienOrder(["abc", "ab"]);
  console.log(`Test 3: ${result3 === "" ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
