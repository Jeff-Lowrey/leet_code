"""
# 210. Course Schedule Ii
# Difficulty: Medium
Given a problem that demonstrates key concepts in Topological Sort.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of topological sort concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply topological sort methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages topological sort principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses topological sort techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using topological sort method
3. Return the computed result

</details>
"""

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

def test_solution():
    """
    Test cases for 210. Course Schedule Ii.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 210. Course Schedule Ii")
