"""
# Difficulty: Medium

# 071. Simplify Path

Given a string path, which is an absolute path (starting with a slash '/') to a file or directory in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system, a period '.' refers to the current directory, a double period '..' refers to the directory up a level, and any multiple consecutive slashes (i.e. '//') are treated as a single slash '/'. For this problem, any other format of periods such as '...' are treated as file/directory names.

The canonical path should have the following format:

- The path starts with a single slash '/'.
- Any two directories are separated by a single slash '/'.
- The path does not end with a trailing '/'.
- The path only contains the directories on the path from the root directory to the target file or directory (i.e., no period '.' or double period '..')

Return the simplified canonical path.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>path = "/a/./b/../../c/"</dd>
<dt>Output:</dt>
<dd>"/c"</dd>
<dt>Explanation:</dt>
<dd>Simplified path '/a/./b/../../c/' is '/c'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Use stack to track directory levels. Split path by "/". For each component: skip empty and ".", pop for "..", push for normal names. Join stack with "/" for canonical path.

### APPROACH:
1. **Split path**: Split path by '/' to get components
2. **Initialize stack**: Create empty stack to build canonical path
3. **Process each component**: For each component in components
4. **Handle parent**: If component == '..', pop from stack if not empty
5. **Skip current/empty**: If component == '.' or empty, continue
6. **Add directory**: Otherwise append component to stack
7. **Build result**: Join stack with '/' and prepend '/'
8. **Return result**: Return simplified canonical path

### WHY THIS WORKS:
- Stack represents directory hierarchy
- Split by '/', process each component
- '.': ignore (current directory)
- '..': pop stack (go up one level) if not empty
- Other: push to stack (enter directory)
- Join stack with '/' for canonical path
- O(n) time: process each char, O(n) space for stack

### EXAMPLE WALKTHROUGH:
```
Input: path = "/a/./b/../../c/"
Step 1: Split by '/' and process
  parts = ['', 'a', '.', 'b', '..', '..', 'c', '']

Step 2: Use stack
  'a': stack=['a']
  '.': skip
  'b': stack=['a','b']
  '..': pop, stack=['a']
  '..': pop, stack=[]
  'c': stack=['c']

Output: "/c"
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
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.simplifyPath("/a/./b/../../c/")
    expected = "/c"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Root directory
    result = solution.simplifyPath("/")
    expected = "/"
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Multiple slashes
    result = solution.simplifyPath("/home//foo/")
    expected = "/home/foo"
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 071. Simplify Path")
