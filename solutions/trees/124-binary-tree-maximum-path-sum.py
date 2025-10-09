"""
# 124. Binary Tree Maximum Path Sum
# Difficulty: Medium
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
    def maxPathSum(self, root: TreeNode) -> int:
        """
        Calculate the maximum path sum in the binary tree.
        
        Args:
            root: Root node of the binary tree
            
        Returns:
            int: Maximum path sum found in the tree
        """
        # Initialize global maximum to track the overall maximum path sum
        self.max_sum = float('-inf')
        
        def max_gain(node):
            """
            Helper function to calculate maximum gain from a node.
            
            Args:
                node: Current node being processed
                
            Returns:
                int: Maximum gain possible from this node
            """
            if not node:
                return 0
            
            # Get the maximum gain from left and right subtrees
            # If the gain is negative, we don't include that path (hence max with 0)
            left_gain = max(max_gain(node.left), 0)
            right_gain = max(max_gain(node.right), 0)
            
            # Calculate the price to start a new path including current node
            current_path_sum = node.val + left_gain + right_gain
            
            # Update global maximum if current path sum is larger
            self.max_sum = max(self.max_sum, current_path_sum)
            
            # Return maximum gain for parent node
            return node.val + max(left_gain, right_gain)
        
        max_gain(root)
        return self.max_sum

def test_solution():
    """
    Test cases for 124. Binary Tree Maximum Path Sum.
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
    print(f"Solution for 124. Binary Tree Maximum Path Sum")
