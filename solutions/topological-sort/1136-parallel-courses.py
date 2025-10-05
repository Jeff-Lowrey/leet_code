I'll help you create a solution for the Parallel Courses problem in Python. This implementation will handle course prerequisites and determine the minimum number of semesters needed to complete all courses.

```python
from typing import List
from collections import defaultdict, deque

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
        graph = defaultdict(list)
        in_degree = [0] * (n + 1)  # +1 because courses are 1-indexed
        
        # Create adjacency list and count prerequisites for each course
        for prev, next in relations:
            graph[prev].append(next)
            in_degree[next] += 1
        
        # Initialize queue with courses that have no prerequisites
        queue = deque()
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

def test_solution():
    """
    Test cases for the solution
    """
    solution = Solution()
    
    # Test case 1: Simple linear dependency
    assert solution.minimumSemesters(3, [[1,3],[2,3]]) == 2
    
    # Test case 2: Cycle in prerequisites
    assert solution.minimumSemesters(3, [[1,2],[2,3],[3,1]]) == -1
    
    # Test case 3: No prerequisites
    assert solution.minimumSemesters(3, []) == 1
    
    # Test case 4: Complex dependencies
    assert solution.minimumSemesters(4, [[1,2],[2,3],[3,4]]) == 4
    
    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()
```

This implementation provides a solution to the Parallel Courses problem with the following features:

1. Uses a topological sort approach with BFS to handle course dependencies
2. Efficiently tracks prerequisites using adjacency lists and in-degree counts
3. Detects cycles in prerequisites (which would make completion impossible)
4. Calculates minimum semesters needed while ensuring all prerequisites are met
5. Includes comprehensive test cases
6. Uses type hints and proper documentation

Key components:
- `minimumSemesters`: Main function that calculates the minimum number of semesters
- `defaultdict`: Used for efficient adjacency list representation
- `deque`: Efficient queue implementation for BFS
- Level-by-level processing to track semesters
- Input validation and edge case handling

The solution handles various scenarios:
- Courses with multiple prerequisites
- Courses with no prerequisites
- Cyclic dependencies (returns -1)
- Empty prerequisite lists
- Complex dependency chains

The code follows Python best practices and includes proper error handling, type hints, and documentation. The test cases verify the correctness of the implementation for various scenarios.