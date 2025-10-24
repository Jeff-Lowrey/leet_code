/**
 * # Difficulty: Medium
 * 
 * # 210. Course Schedule Ii
 * 
 * There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.
 * 
 * For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
 * 
 * Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.
 * 
 * **Example:**
 * 
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]</dd>
 * <dt>Output:</dt>
 * <dd>[0,1,2,3]</dd>
 * <dt>Explanation:</dt>
 * <dd>Course order for [0,1],[1,2] is [2,1,0]</dd>
 * </dl>
 * 
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Array, Queue
 * **Patterns**: Hash Table Pattern, Graph Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 * 
 * ### INTUITION:
 * Build adjacency list and in-degree array. Start BFS from courses with in-degree 0. For each course, reduce in-degree of neighbors. Add result to output. Check if all courses processed.
 * 
 * ### APPROACH:
 * 1. **Build graph**: Create adjacency list and indegree array
 * 2. **Initialize queue**: Add all courses with indegree 0 to queue
 * 3. **Process queue**: While queue not empty, dequeue course
 * 4. **Add to result**: Append course to result list
 * 5. **Update neighbors**: For each neighbor, decrement indegree
 * 6. **Add to queue**: If indegree becomes 0, add to queue
 * 7. **Check cycle**: If len(result) != numCourses, cycle exists, return []
 * 8. **Return result**: Return result as valid course order
 * 
 * ### WHY THIS WORKS:
 * - Topological sort with Kahn's algorithm or DFS
 * - Track indegree: start with courses having no prerequisites
 * - Remove course and decrease indegree of dependents, add new zero-indegree courses
 * - If can't process all courses, cycle exists (impossible to complete)
 * - O(V + E) time: vertices + edges, O(V + E) space for graph
 * 
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
 * ```
 *
 * Step 1: Build graph
 *
 * Steps:
 * Step 1: 0 → [1,2], 1 → [3], 2 → [3]
 * Step 2: indegree = [0,1,1,2]
 * Step 3: Topological sort
 * Step 4: Take 0: update indegree, order=[0]
 * Step 5: Take 1,2: update indegree, order=[0,1,2]
 * Step 6: Take 3: order=[0,1,2,3]
 *
 * Output:
 * ```
 * [0,1,2,3]
 * ```

### TIME COMPLEXITY:
 * O(n)
 * 
 * ### SPACE COMPLEXITY:
 * O(1)
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
   * Find a valid course ordering that satisfies all prerequisites using topological sort.
   *
   *         Args:
   *             numCourses (int): Total number of courses (labeled from 0 to numCourses-1)
   *             prerequisites (List[List[int]]): List of prerequisite pairs [course, prereq]
   *
   *         Returns:
   *             List[int]: Valid course ordering or empty list if impossible
   */
  findOrder(numCourses: number, prerequisites: any): any {
    // Implementation
    adj_list: dict.get(Any, list[Any)] = defaultdict(list)
    in_degree = [0] * numCourses
    for course, prereq in prerequisites:
    adj_list.get(prereq).append(course)
    in_degree.get(course) += 1
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
  console.log(`Solution for 210. Course Schedule Ii`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;