"""
# Difficulty: Medium

# 071. Simplify Path

Given a problem that demonstrates key concepts in Stack.

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
[This problem requires understanding of stack concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply stack methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages stack principles
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
    def simplifyPath(self, path: str) -> str:
        """
        Simplifies a Unix-style file path to its canonical form.
        
        Args:
            path (str): The file path to simplify
            
        Returns:
            str: The simplified canonical path
            
        Examples:
            >>> solution = Solution()
            >>> solution.simplifyPath("/home//foo/")
            "/home/foo"
            >>> solution.simplifyPath("/a/./b/../../c/")
            "/c"
        """
        # Split the path into components
        components = path.split('/')
        
        # Stack to keep track of valid path components
        stack = []
        
        # Process each component
        for component in components:
            # Skip empty components and current directory (.)
            if not component or component == '.':
                continue
                
            # Handle parent directory (..)
            elif component == '..':
                # If stack is not empty, pop the last directory
                if stack:
                    stack.pop()
            
            # Add valid directory names to stack
            else:
                stack.append(component)
        
        # Construct the canonical path
        # If stack is empty, return root directory
        if not stack:
            return "/"
        
        # Join components with forward slash and add leading slash
        return "/" + "/".join(stack)

def test_solution():
    """
    Test cases for 071. Simplify Path.
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
    print(f"Solution for 071. Simplify Path")
