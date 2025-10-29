/**
# 0990. Problem
 * 
 * # Difficulty: Medium
 * # 0990. Satisfiability of Equality Equations
 * 
 * You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==xj" or "xi!=xj".
 * 
 * Here, xi and xj are lowercase letters (not necessarily different) that represent one-letter variable names.
 * 
 * Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["a==b", "b==c", "a!=d"]</dd>
 * <dt>Output:</dt>
 * <dd>"Equations {equations} satisfiable: {solution.equationsPossible(equations)}"</dd>
 * <dt>Explanation:</dt>
 * <dd>Equations are satisfiable: a==b, b==c implies a==c</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Set, Array, String
 * **Patterns**: Iterative Solution
 * **Time Complexity**: O(N × α(N))
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * This is a classic Union-Find problem. We need to check if equality and inequality constraints can be satisfied simultaneously. The key insight is to first process all equality constraints to group variables, then check if inequality constraints violate these groups.
 * 
 * ### APPROACH:
 * 1. **Process equalities**: Use Union-Find to group variables that must be equal
 * 2. **Check inequalities**: For each "!=" constraint, verify variables are in different groups
 * 3. **Return result**: True if no conflicts found, False otherwise
 * 
 * ### WHY THIS WORKS:
 * - Union-Find efficiently manages equivalence classes
 * - Equality constraints create connected components
 * - Inequality constraints must not connect variables in same component
 * - Two-pass approach separates grouping from validation
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ["a==b","b!=a"]
 * ["a==b","b==c","a!=d"]
 * ```
 *
 * Step 1: Process equalities - Union('a', 'b')
 * Step 2: Check inequalities - "b!=a" but a and b are in same group
 *
 * Steps:
 * Step 1: Process equalities - Union('a','b'), Union('b','c') → {a,b,c} group
 * Step 2: Check inequalities - "a!=d" and d is separate → no conflict
 *
 * Output:
 * ```
 * False (contradiction)
 * True
 * ```

 * ### TIME COMPLEXITY:
 * O(N × α(N))
 * Where N is number of equations and α is inverse Ackermann function
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 * Since we only have 26 possible variables (a-z)
 * 
 * ### EDGE CASES:
 * - No equations (vacuously true)
 * - Only equality equations
 * - Only inequality equations
 * - Self-reference equations like "a==a" or "a!=a"
 * 
 * </details>
 */

class Solution {
  /**
   * Check if equality equations can be satisfied using Union-Find.
   *
   *         Args:
   *             equations: List of equations in format "xi==xj" or "xi!=xj"
   *
   *         Returns:
   *             True if equations can be satisfied, False otherwise
   *
   *         Time Complexity: O(N × α(N)) where N is number of equations
   *         Space Complexity: O(1) since we have at most 26 variables
   */
  equationsPossible(equations: string[]): boolean {
    // Implementation
    parent = list(range(26))
    def find(x: Any) -> Any:
    """Find root with path compression."""
    if parent.get(x) != x:
    parent.set(x, find(parent.get(x))
    return parent.get(x)
    def union(x: Any, y: Any) -> Any:
  }

  /**
   * Alternative implementation with explicit Union-Find class.
   *
   *         Args:
   *             equations: List of equations
   *
   *         Returns:
   *             True if satisfiable, False otherwise
   */
  equationsPossibleAlternative(equations: string[]): boolean {
    // Implementation
    class UnionFind:
    def __init__(self: Any, n: Any) -> null:
    self.parent = list(range(n))
    self.rank = [0] * n
    def find(self: Any, x: Any) -> Any:
    if self.parent.get(x) != x:
    self.parent.set(x, self.find(self.parent.get(x))
    return self.parent.get(x)
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
  equations = ["a==b", "b==c", "a!=d"]
  console.log(`Equations {equations} satisfiable: {solution.equationsPossible(equations)}`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;