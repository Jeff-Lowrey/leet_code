/**
### INTUITION:
The key insight is that build graph and calculate in-degrees. Use BFS starting from nodes with in-degree 0. Process courses level by level (semester by semester). Track maximum semester count needed.

### APPROACH:
1. **Build graph and indegrees**: Create adjacency list and indegree array
2. **Initialize queue**: Add all courses with indegree 0 to queue
3. **Initialize semester**: Set semester = 0
4. **Process by level**: While queue not empty, process all courses at current level
5. **Increment semester**: semester += 1 for each level
6. **Update neighbors**: For each neighbor, decrement indegree, add to queue if 0
7. **Check completion**: If processed < n courses, cycle exists, return -1
8. **Return result**: Return semester

### WHY THIS WORKS:
- Topological sort with BFS, track depth (semester number)
- All courses at same level can be taken in parallel (same semester)
- Increment semester when level completes
- If can't complete all courses, return -1 (cycle)
- O(V + E) time, O(V + E) space

### EXAMPLE WALKTHROUGH:
Input:
```
n = 3, relations = [[1,3],[2,3]]
```

Step 1: Build graph and indegree
indegree = [0,0,2]
Step 2: Process courses level by level
Semester 1: courses 1,2 (indegree=0)
Semester 2: course 3 (after 1,2 complete)

Output:
```
2 (minimum semesters)
```

### TIME COMPLEXITY:
O(n)**
- Single pass through input

### SPACE COMPLEXITY:
O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Determines the minimum number of semesters needed to complete all courses.
   *
   *         Args:
   *             n: Number of courses (labeled from 1 to n)
   *             relations: List of prerequisite pairs [x,y] where x must be taken before y
   *
   *         Returns:
   *             Minimum number of semesters needed, or -1 if impossible
   */
  minimumSemesters(n: number, relations: any): number {
    // Implementation
    graph: dict.get(Any, list[Any)] = defaultdict(list)
    in_degree = [0] * (n + 1)  // +1 because courses are 1-indexed
    for prev, next in relations:
    graph.get(prev).append(next)
    in_degree.get(next) += 1
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
  console.log(`Solution for 1136. Parallel Courses`)
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;