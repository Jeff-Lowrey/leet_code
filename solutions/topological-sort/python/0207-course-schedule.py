"""
# 207. Course Schedule

# Difficulty: Medium

There are a total of numCourses courses you have to take, labeled from 0 to `numCourses - 1`.
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates
that you must take course bi first if you want to take course ai.

Return true if you can finish all courses. Otherwise, return false.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>numCourses = 2`, prerequisites = [[1,0]]</dd>
<dt>Output:</dt>
<dd>true</dd>
<dt>Explanation:</dt>
<dd>Course schedule [0,1] means 0 depends on 1; can finish if no cycles</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Greedy Algorithm
**Time Complexity**: O(V + E)
**Space Complexity**: O(V + E)

### INTUITION:
This is a cycle detection problem in a directed graph. If there's a cycle in the prerequisite dependencies, it's impossible to complete all courses. Topological sorting can detect cycles while finding a valid course order.

### APPROACH:
1. **Build adjacency list**: Create a graph where each prerequisite points to the courses that depend on it
2. **Calculate in-degrees**: Count incoming edges for each course (number of prerequisites)
3. **Initialize queue**: Add all courses with in-degree 0 (no prerequisites) to the queue
4. **Process courses**: Dequeue a course, increment courses_taken counter
5. **Update dependencies**: For each course that depends on the current course, decrement its in-degree
6. **Add newly available courses**: If a course's in-degree becomes 0, add it to the queue (all prerequisites met)
7. **Check completion**: Return true if courses_taken equals numCourses (all courses processed), false otherwise (cycle detected)

### WHY THIS WORKS:
In a DAG (Directed Acyclic Graph), there's always at least one vertex with in-degree 0. By repeatedly removing such vertices, we can process all vertices if and only if there's no cycle.

### EXAMPLE WALKTHROUGH:
Input:
```
numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]
```

Steps:
Step 1: Build graph → 0→1→2→3
Step 2: Calculate in-degrees → [0,1,1,1]
Step 3: Start with course 0 (in-degree 0) → add to queue
Step 4: Take course 0 → course 1 now has in-degree 0 → add to queue
Step 5: Take course 1 → course 2 now has in-degree 0 → add to queue
Step 6: Take course 2 → course 3 now has in-degree 0 → add to queue
Step 7: Take course 3 → all courses taken → return true

Output:
```
true
```

### TIME COMPLEXITY:
O(V + E)

### SPACE COMPLEXITY:
O(V + E)

### EDGE CASES:
- **No prerequisites**: All courses can be taken, return true
- **Self-loop**: Course depends on itself, cycle detected, return false
- **Circular dependency**: Cycle detection returns false
- **Linear chain**: No cycles, courses taken in topological order
- **Disconnected components**: Process each component separately

</details>
"""

from collections import deque, defaultdict
from typing import Any


class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        """
        Approach: Topological Sort using BFS (Kahn's Algorithm)
        Time Complexity: O(V + E)
        Space Complexity: O(V + E)
        """
        # Build adjacency list and indegree count
        graph: dict[Any, list[Any]] = defaultdict(list)
        indegree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            indegree[course] += 1

        # Queue for courses with no prerequisites
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        courses_taken = 0

        while queue:
            course = queue.popleft()
            courses_taken += 1

            # Process all courses that depend on this course
            for next_course in graph[course]:
                indegree[next_course] -= 1
                if indegree[next_course] == 0:
                    queue.append(next_course)

        return courses_taken == numCourses

    def canFinishDFS(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        """
        Approach: DFS with cycle detection
        Time Complexity: O(V + E)
        Space Complexity: O(V + E)
        """
        graph: dict[int, list[int]] = defaultdict(list)
        for course, prereq in prerequisites:
            graph[course].append(prereq)

        # 0: unvisited, 1: visiting, 2: visited
        state = [0] * numCourses

        def has_cycle(course: Any) -> Any:
            if state[course] == 1:  # Currently visiting
                return True
            if state[course] == 2:  # Already visited
                return False

            state[course] = 1  # Mark as visiting

            for prereq in graph[course]:
                if has_cycle(prereq):
                    return True

            state[course] = 2  # Mark as visited
            return False

        for course in range(numCourses):
            if state[course] == 0:
                if has_cycle(course):
                    return False

        return True


"""
210. Course Schedule II
# Difficulty: Medium
Return the ordering of courses you should take to finish all courses. If there are
many valid answers, return any of them. If it is impossible to finish all courses,
return an empty array.

Example:
Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
"""


class SolutionScheduleII:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        """
        Approach: Topological Sort using BFS
        Time Complexity: O(V + E)
        Space Complexity: O(V + E)
        """
        graph: dict[Any, list[Any]] = defaultdict(list)
        indegree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            indegree[course] += 1

        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        order: list[Any] = []

        while queue:
            course = queue.popleft()
            order.append(course)

            for next_course in graph[course]:
                indegree[next_course] -= 1
                if indegree[next_course] == 0:
                    queue.append(next_course)

        return order if len(order) == numCourses else []

    def findOrderDFS(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        """
        Approach: DFS with stack
        Time Complexity: O(V + E)
        Space Complexity: O(V + E)
        """
        graph: dict[int, list[int]] = defaultdict(list)
        for course, prereq in prerequisites:
            graph[course].append(prereq)

        # 0: unvisited, 1: visiting, 2: visited
        state = [0] * numCourses
        order = []

        def dfs(course: Any) -> Any:
            if state[course] == 1:  # Cycle detected
                return False
            if state[course] == 2:  # Already processed
                return True

            state[course] = 1

            for prereq in graph[course]:
                if not dfs(prereq):
                    return False

            state[course] = 2
            order.append(course)
            return True

        for course in range(numCourses):
            if state[course] == 0:
                if not dfs(course):
                    return []

        return order


"""
269. Alien Dictionary
# Difficulty: Hard
There is a new alien language that uses the English alphabet. However, the order
among the letters is unknown to you.

You are given a list of strings words from the alien language's dictionary, where
the strings in words are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in
lexicographically increasing order by the alien language's rules. If there is no
solution, return "". If there are multiple solutions, return any of them.

Example:
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
"""


class SolutionAlienDictionary:
    def alienOrder(self, words: list[str]) -> str:
        """
        Approach: Build graph and topological sort
        Time Complexity: O(total characters in all words)
        Space Complexity: O(1) - at most 26 letters
        """
        # Build adjacency list and indegree
        graph: dict[Any, set[Any]] = defaultdict(set)
        indegree: dict[Any, Any] = {}

        # Initialize all characters
        for word in words:
            for char in word:
                indegree[char] = 0

        # Build the graph
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            min_len = min(len(w1), len(w2))

            # Check if w2 is a prefix of w1 (invalid)
            if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
                return ""

            # Find first different character
            for j in range(min_len):
                if w1[j] != w2[j]:
                    if w2[j] not in graph[w1[j]]:
                        graph[w1[j]].add(w2[j])
                        indegree[w2[j]] += 1
                    break

        # Topological sort using BFS
        queue = deque([char for char in indegree if indegree[char] == 0])
        result: list[Any] = []

        while queue:
            char = queue.popleft()
            result.append(char)

            for next_char in graph[char]:
                indegree[next_char] -= 1
                if indegree[next_char] == 0:
                    queue.append(next_char)

        # Check if all characters are included
        return "".join(result) if len(result) == len(indegree) else ""


# Test cases
if __name__ == "__main__":
    # Test Course Schedule I
    solution = Solution()

    print("Course Schedule I:")
    test_cases = [(2, [[1, 0]]), (2, [[1, 0], [0, 1]]), (4, [[1, 0], [2, 0], [3, 1], [3, 2]])]

    for num_courses, prerequisites in test_cases:
        result = solution.canFinish(num_courses, prerequisites)
        print(f"Courses: {num_courses}, Prerequisites: {prerequisites}")
        print(f"Can finish: {result}\n")

    # Test Course Schedule II
    solution2 = SolutionScheduleII()

    print("Course Schedule II:")
    for num_courses, prerequisites in test_cases:
        order_result: list[int] = solution2.findOrder(num_courses, prerequisites)
        print(f"Courses: {num_courses}, Prerequisites: {prerequisites}")
        print(f"Order: {order_result}\n")

    # Test Alien Dictionary
    solution_alien = SolutionAlienDictionary()

    print("Alien Dictionary:")
    alien_cases = [["wrt", "wrf", "er", "ett", "rftt"], ["z", "x"], ["z", "x", "z"], ["abc", "ab"]]

    for words in alien_cases:
        alien_result: str = solution_alien.alienOrder(words)
        print(f"Words: {words}")
        print(f"Order: '{alien_result}'\n")
