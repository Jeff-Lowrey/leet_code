I'll help you implement a solution for Course Schedule II using topological sorting. Here's the complete implementation:

```python
from typing import List
from collections import defaultdict, deque

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
        adj_list = defaultdict(list)
        in_degree = [0] * numCourses
        
        # Build the graph
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

def test_course_schedule():
    """
    Test function to verify the solution with different test cases
    """
    solution = Solution()
    
    # Test case 1: Simple valid case
    assert solution.findOrder(2, [[1,0]]) == [0,1], "Test case 1 failed"
    
    # Test case 2: No prerequisites
    assert solution.findOrder(1, []) == [0], "Test case 2 failed"
    
    # Test case 3: Impossible case (cycle)
    assert solution.findOrder(2, [[1,0],[0,1]]) == [], "Test case 3 failed"
    
    # Test case 4: Multiple prerequisites
    result = solution.findOrder(4, [[1,0],[2,0],[3,1],[3,2]])
    assert len(result) == 4 and result.index(0) < result.index(1) and \
           result.index(0) < result.index(2) and \
           result.index(1) < result.index(3) and \
           result.index(2) < result.index(3), "Test case 4 failed"
    
    print("All test cases passed!")

if __name__ == "__main__":
    test_course_schedule()
```

This implementation provides a solution to the Course Schedule II problem using topological sorting. Here's a breakdown of the key components:

1. The `Solution` class contains the main `findOrder` method that implements the topological sorting algorithm.

2. The algorithm uses:
   - An adjacency list to represent the course dependencies
   - An in-degree count for each course to track prerequisites
   - A queue for processing courses in topological order

3. The implementation follows these steps:
   - Build the graph using prerequisites
   - Initialize the queue with courses that have no prerequisites
   - Process courses in topological order
   - Return the course order if valid, empty list if impossible

4. The code includes:
   - Type hints for better code clarity
   - Comprehensive comments explaining the logic
   - A test function with various test cases
   - Proper error handling for edge cases

5. The solution handles various scenarios:
   - Valid course sequences
   - Courses with no prerequisites
   - Impossible cases (cycles in prerequisites)
   - Multiple prerequisites per course

The code is structured as a complete, runnable file with proper imports and follows Python best practices. It can be executed directly to run the test cases or imported as a module to use the solution class.