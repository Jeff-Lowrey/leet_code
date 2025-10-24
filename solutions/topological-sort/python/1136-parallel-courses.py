"""
# Difficulty: Medium

# 1136. Parallel Courses

You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given an array relations where relations[i] = [prevCoursei, nextCoursei], representing a prerequisite relationship between course prevCoursei and course nextCoursei: course prevCoursei has to be taken before course nextCoursei.

In one semester, you can take any number of courses as long as you have taken all the prerequisites in the previous semester for the courses you are taking.

Return the minimum number of semesters needed to take all courses. If there is no way to take all the courses, return -1.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>n = 3, relations = [[1,3],[2,3]]</dd>
<dt>Output:</dt>
<dd>2 (minimum semesters)</dd>
<dt>Explanation:</dt>
<dd>Minimum semesters to complete all courses</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Graph Pattern
**Time Complexity**: O(n) - Single pass through input
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
Build graph and calculate in-degrees. Use BFS starting from nodes with in-degree 0. Process courses level by level (semester by semester). Track maximum semester count needed.

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
Based on the algorithm implementation


### SPACE COMPLEXITY:
Based on auxiliary data structures used


### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

from collections import defaultdict, deque

from typing import Any, List, Optional, Dict, Tuple


class Solution:
    def minimumSemesters(self, n: int, relations: List[List[int]]) -> int:
        """
        Determines the minimum number of semesters needed to complete all courses.

        Args:
            n: Number of courses (labeled from 1 to n)
            relations: List of prerequisite pairs [x,y] where x must be taken before y

        Returns:
            Minimum number of semesters needed, or -1 if impossible
        """
        # Build adjacency list and calculate in-degrees
        graph: dict[Any, list[Any]] = defaultdict(list)
        in_degree = [0] * (n + 1)  # +1 because courses are 1-indexed

        # Create adjacency list and count prerequisites for each course
        for prev, next in relations:
            graph[prev].append(next)
            in_degree[next] += 1

        # Initialize queue with courses that have no prerequisites
        queue: Any = deque()
        for course in range(1, n + 1):
            if in_degree[course] == 0:
                queue.append(course)

        if not queue:  # If no starting courses found, there's a cycle
            return -1

        semester = 0
        courses_taken = 0

        # Process courses level by level (semester by semester)
        while queue:
            semester += 1
            level_size = len(queue)

            # Process all courses that can be taken this semester
            for _ in range(level_size):
                current = queue.popleft()
                courses_taken += 1

                # Update prerequisites for dependent courses
                for next_course in graph[current]:
                    in_degree[next_course] -= 1
                    if in_degree[next_course] == 0:
                        queue.append(next_course)

        # Check if all courses were taken
        return semester if courses_taken == n else -1


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.minimumSemesters(3, [[1, 3], [2, 3]])
    expected = 2
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Cycle exists (impossible)
    result = solution.minimumSemesters(3, [[1, 2], [2, 3], [3, 1]])
    expected = -1
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Linear dependency
    result = solution.minimumSemesters(4, [[1, 2], [2, 3], [3, 4]])
    expected = 4
    assert result == expected, f"Expected expected, got result"

    # Test case 4: No dependencies
    result = solution.minimumSemesters(3, [])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    # Test case 5: Single course
    result = solution.minimumSemesters(1, [])
    expected = 1
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 1136. Parallel Courses")
