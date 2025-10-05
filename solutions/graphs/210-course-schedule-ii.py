I'll help you implement a solution for Course Schedule II in Python. This will create a function that determines the order in which courses should be taken based on prerequisites.

```python
from typing import List
from collections import defaultdict, deque

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        """
        Determines the order in which courses should be taken based on prerequisites.
        
        Args:
            numCourses (int): Total number of courses labeled from 0 to numCourses-1
            prerequisites (List[List[int]]): List of prerequisite pairs [course, prereq]
        
        Returns:
            List[int]: Order in which courses should be taken, empty list if impossible
        """
        # Create adjacency list and in-degree count for each course
        adj_list = defaultdict(list)
        in_degree = [0] * numCourses
        
        # Build the adjacency list and count in-degrees
        for course, prereq in prerequisites:
            adj_list[prereq].append(course)
            in_degree[course] += 1
        
        # Initialize queue with courses that have no prerequisites
        queue = deque()
        for course in range(numCourses):
            if in_degree[course] == 0:
                queue.append(course)
        
        # Store the course order
        course_order = []
        
        # Process courses using topological sort
        while queue:
            current_course = queue.popleft()
            course_order.append(current_course)
            
            # Reduce in-degree for all courses that depend on current_course
            for dependent_course in adj_list[current_course]:
                in_degree[dependent_course] -= 1
                if in_degree[dependent_course] == 0:
                    queue.append(dependent_course)
        
        # Check if all courses can be taken
        return course_order if len(course_order) == numCourses else []

def test_course_schedule():
    """
    Test function to verify the solution with different test cases.
    """
    solution = Solution()
    
    # Test case 1: Simple case
    assert solution.findOrder(2, [[1,0]]) == [0,1], "Test case 1 failed"
    
    # Test case 2: No prerequisites
    assert solution.findOrder(1, []) == [0], "Test case 2 failed"
    
    # Test case 3: Impossible case (cycle)
    assert solution.findOrder(2, [[1,0],[0,1]]) == [], "Test case 3 failed"
    
    # Test case 4: Multiple prerequisites
    result = solution.findOrder(4, [[1,0],[2,0],[3,1],[3,2]])
    assert len(result) == 4 and result.index(0) < result.index(1) and \
           result.index(0) < result.index(2) and result.index(1) < result.index(3) and \
           result.index(2) < result.index(3), "Test case 4 failed"
    
    print("All test cases passed!")

if __name__ == "__main__":
    # Run the test cases
    test_course_schedule()
```

This implementation includes:

1. A `Solution` class with the `findOrder` method that solves the Course Schedule II problem using topological sort.
2. The solution uses:
   - Adjacency list to represent course dependencies
   - In-degree counting to track prerequisites
   - BFS (Breadth-First Search) with a queue for topological sorting
3. A comprehensive test function to verify the solution with different test cases.
4. Clear comments explaining the implementation details.
5. Proper type hints and documentation.

The algorithm works as follows:
1. Creates an adjacency list and tracks in-degree for each course
2. Starts with courses that have no prerequisites
3. Processes courses in order, reducing in-degree counts for dependent courses
4. Returns the course order if all courses can be taken, empty list otherwise

The solution handles various cases including:
- Courses with no prerequisites
- Courses with multiple prerequisites
- Impossible cases (cycles in prerequisites)
- Empty input cases

The time complexity is O(V + E) where V is the number of courses and E is the number of prerequisites.
The space complexity is O(V + E) for storing the adjacency list and queue.