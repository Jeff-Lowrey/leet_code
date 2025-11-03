"""
# Difficulty: Medium

# 0210. Course Schedule Ii

There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]</dd>
<dt>Output:</dt>
<dd>[0,1,2,3]</dd>
<dt>Explanation:</dt>
<dd>Course order for [0,1],[1,2] is [2,1,0]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Array, Queue
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The key insight is that build adjacency list and in-degree array. Start BFS from courses with in-degree 0. For each course, reduce in-degree of neighbors. Add result to output. Check if all courses processed.

### APPROACH:
1. **Build graph**: Create adjacency list and indegree array
2. **Initialize queue**: Add all courses with indegree 0 to queue
3. **Process queue**: While queue not empty, dequeue course
4. **Add to result**: Append course to result list
5. **Update neighbors**: For each neighbor, decrement indegree
6. **Add to queue**: If indegree becomes 0, add to queue
7. **Check cycle**: If len(result) != numCourses, cycle exists, return []
8. **Return result**: Return result as valid course order

### WHY THIS WORKS:
- Topological sort with Kahn's algorithm or DFS
- Track indegree: start with courses having no prerequisites
- Remove course and decrease indegree of dependents, add new zero-indegree courses
- If can't process all courses, cycle exists (impossible to complete)
- O(V + E) time: vertices + edges, O(V + E) space for graph

### EXAMPLE WALKTHROUGH:
Input:
```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
```

Step 1: Build graph

Steps:
Step 1: 0 → [1,2], 1 → [3], 2 → [3]
Step 2: indegree = [0,1,1,2]
Step 3: Topological sort
Step 4: Take 0: update indegree, order=[0]
Step 5: Take 1,2: update indegree, order=[0,1,2]
Step 6: Take 3: order=[0,1,2,3]

Output:
```
[0,1,2,3]
```

### TIME COMPLEXITY:
O(n)
- Single pass through input


### SPACE COMPLEXITY:
O(1)
- Constant extra space


### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>
"""

from collections import defaultdict, deque

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        """
        Find a valid course ordering that satisfies all prerequisites using topological sort.

        Args:
            numCourses (int): Total number of courses (labeled from 0 to numCourses-1)
            prerequisites (List[List[int]]): List of prerequisite pairs [course, prereq]

        Returns:
            List[int]: Valid course ordering or empty list if impossible
        """
        # Create adjacency list and in-degree count for each course
        adj_list: dict[Any, list[Any]] = defaultdict(list)
        in_degree = [0] * numCourses

        # Build the graph
        for course, prereq in prerequisites:
            adj_list[prereq].append(course)
            in_degree[course] += 1

        # Initialize queue with courses that have no prerequisites
        queue: Any = deque()
        for course in range(numCourses):
            if in_degree[course] == 0:
                queue.append(course)

        # Store the course order
        course_order: list[Any] = []

        # Process courses in topological order
        while queue:
            current_course = queue.popleft()
            course_order.append(current_course)

            # Reduce in-degree for all courses that depend on current_course
            for dependent_course in adj_list[current_course]:
                in_degree[dependent_course] -= 1
                # If all prerequisites are satisfied, add to queue
                if in_degree[dependent_course] == 0:
                    queue.append(dependent_course)

        # Check if valid ordering exists
        return course_order if len(course_order) == numCourses else []


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])
    # Valid orders: [0,1,2,3] or [0,2,1,3]
    assert len(result) == 4 and result[0] == 0, f"Expected valid order starting with 0, got result"

    # Test case 2: Cycle exists (impossible)
    result = solution.findOrder(2, [[1, 0], [0, 1]])
    expected: list[Any] = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: No prerequisites
    result = solution.findOrder(3, [])
    assert len(result) == 3, f"Expected 3 courses, got {len(result)}"

    # Test case 4: Linear dependency
    result = solution.findOrder(3, [[1, 0], [2, 1]])
    expected = [0, 1, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single course
    result = solution.findOrder(1, [])
    expected = [0]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 210. Course Schedule Ii")
