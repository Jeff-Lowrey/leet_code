"""
# Difficulty: Medium

Given a string path, which is an absolute path (starting with a slash '/') to a file or
directory in a Unix-style file system, convert it to the simplified canonical path.

In a Unix-style file system:
- A period '.' refers to the current directory
- A double period '..' refers to the directory up a level
- Multiple consecutive slashes ('//') are treated as a single slash '/'

The canonical path should follow these rules:
- Always start with a single slash '/'
- Directories are separated by a single slash '/'
- No trailing slash (except for root '/')
- No '.' or '..' in the path

Return the simplified canonical path.

Example:
Input: path = "/home//foo/"
Output: "/home/foo"

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
Use a stack to track the directory hierarchy. Split the path by '/', then process each
component: skip '.', pop for '..', push valid directory names. Finally, join with '/'.

### APPROACH:
1. **Split**: Divide path by '/' to get components
2. **Stack**: Use stack to track current directory chain
3. **Process**: For each component:
   - Skip empty strings (from consecutive '/')
   - Skip '.' (current directory)
   - Pop for '..' (go up a level, if possible)
   - Push valid directory names
4. **Build**: Join stack with '/' and prepend '/'

### WHY THIS WORKS:
Stack naturally handles the hierarchical nature of file paths.
Going up (..) is a pop, going down (dirname) is a push.

### EXAMPLE WALKTHROUGH:
```
path = "/a/./b/../../c/"
Split: ['', 'a', '.', 'b', '..', '..', 'c', '']

Process:
'' → skip
'a' → push ['a']
'.' → skip ['a']
'b' → push ['a', 'b']
'..' → pop ['a']
'..' → pop []
'c' → push ['c']
'' → skip ['c']

Result: "/" + "c" = "/c"
```

### TIME COMPLEXITY:
O(n) where n is path length

### SPACE COMPLEXITY:
O(n) for stack and split components

### EDGE CASES:
- Root directory: "/" → "/"
- Go above root: "/../" → "/"
- Hidden files: "/.hidden" → "/.hidden"
- Trailing slash: "/a/b/" → "/a/b"

</details>
"""

class Solution:
    def simplifyPath(self, path: str) -> str:
        """
        Approach: Stack to track directory hierarchy
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        stack: list[str] = []

        # Split by '/' and process each component
        for component in path.split("/"):
            # Skip empty strings (from //) and current directory (.)
            if not component or component == ".":
                continue

            # Go up one directory (..)
            if component == "..":
                if stack:
                    stack.pop()
            else:
                # Valid directory name
                stack.append(component)

        # Build canonical path
        return "/" + "/".join(stack)

def test_solution() -> None:
    """Test cases for Problem 71."""
    solution = Solution()

    # Test case 1: Multiple slashes and trailing slash
    assert solution.simplifyPath("/home//foo/") == "/home/foo"
    print("Test case 1 passed: /home//foo/")

    # Test case 2: Current directory references
    assert solution.simplifyPath("/a/./b/../../c/") == "/c"
    print("Test case 2 passed: /a/./b/../../c/")

    # Test case 3: Root directory
    assert solution.simplifyPath("/") == "/"
    print("Test case 3 passed: /")

    # Test case 4: Go above root
    assert solution.simplifyPath("/../") == "/"
    print("Test case 4 passed: /../")

    # Test case 5: Simple path
    assert solution.simplifyPath("/home/user/Documents") == "/home/user/Documents"
    print("Test case 5 passed: Simple path")

    # Test case 6: Multiple '..'
    assert solution.simplifyPath("/a/b/c/../../..") == "/"
    print("Test case 6 passed: Multiple ..")

    # Test case 7: Hidden file
    assert solution.simplifyPath("/home/user/.bashrc") == "/home/user/.bashrc"
    print("Test case 7 passed: Hidden file")

    # Test case 8: Mix of . and ..
    assert solution.simplifyPath("/a/./b/./c/./d") == "/a/b/c/d"
    print("Test case 8 passed: Multiple .")

    # Test case 9: Complex path
    assert solution.simplifyPath("/a/../../b/../c//.//") == "/c"
    print("Test case 9 passed: Complex path")

    # Test case 10: Directory names with dots (not . or ..)
    assert solution.simplifyPath("/a/...") == "/a/..."
    print("Test case 10 passed: ... as directory name")

    # Test case 11: Single directory
    assert solution.simplifyPath("/home") == "/home"
    print("Test case 11 passed: Single directory")

    # Test case 12: All .. from root
    assert solution.simplifyPath("/../../..") == "/"
    print("Test case 12 passed: All .. from root")

    print("\nAll test cases passed!")

if __name__ == "__main__":
    test_solution()
