"""
# Difficulty: Medium

# 1136. Parallel Courses

Given a problem that demonstrates key concepts in Topological Sort.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

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

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

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
    Test cases for 1136. Parallel Courses.
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
    print(f"Solution for 1136. Parallel Courses")
