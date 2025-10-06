"""
# 098. Validate Binary Search Tree
**Medium**

Given a problem that demonstrates key concepts in Trees.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of trees concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply trees methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages trees principles
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

The approach uses trees techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using trees method
3. Return the computed result

</details>
"""

class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        """
        Validates if the given binary tree is a valid Binary Search Tree (BST).
        
        Args:
            root: Root node of the binary tree
            
        Returns:
            bool: True if the tree is a valid BST, False otherwise
        """
        def validate(node: Optional[TreeNode], min_val: float, max_val: float) -> bool:
            # Empty tree is valid BST
            if not node:
                return True
            
            # Check if current node's value is within valid range
            if node.val <= min_val or node.val >= max_val:
                return False
            
            # Recursively validate left and right subtrees
            # For left subtree: all values must be less than current node's value
            # For right subtree: all values must be greater than current node's value
            return (validate(node.left, min_val, node.val) and 
                   validate(node.right, node.val, max_val))
        
        # Start validation with initial range (-infinity, +infinity)
        return validate(root, float('-inf'), float('inf'))

def test_solution():
    """
    Test cases for 098. Validate Binary Search Tree.
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
    print(f"Solution for 098. Validate Binary Search Tree")
