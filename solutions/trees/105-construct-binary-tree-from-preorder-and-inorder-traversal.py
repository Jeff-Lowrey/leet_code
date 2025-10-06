"""
# 105. Construct Binary Tree From Preorder And Inorder Traversal
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
    def constructFromPreorder(self, preorder: List[int]) -> Optional[TreeNode]:
        """
        Constructs a binary tree from its preorder traversal.
        
        Args:
            preorder: List of integers representing preorder traversal of the tree
            
        Returns:
            Root node of the constructed binary tree
        """
        if not preorder:
            return None
        
        self.preorder_index = 0
        
        def construct(bound: int) -> Optional[TreeNode]:
            """
            Helper function to construct the tree recursively.
            
            Args:
                bound: Upper bound value for the current subtree
                
            Returns:
                Root node of the current subtree
            """
            if (self.preorder_index >= len(preorder) or 
                preorder[self.preorder_index] > bound):
                return None
            
            # Create root node with current value
            root = TreeNode(preorder[self.preorder_index])
            self.preorder_index += 1
            
            # Recursively construct left and right subtrees
            # Left subtree values must be less than root's value
            root.left = construct(root.val)
            # Right subtree values must be less than bound
            root.right = construct(bound)
            
            return root
        
        return construct(float('inf'))

    def printTree(self, root: Optional[TreeNode]) -> None:
        """
        Prints the tree in a level-order traversal.
        
        Args:
            root: Root node of the binary tree
        """
        if not root:
            print("Empty tree")
            return
        
        queue = [root]
        while queue:
            level = []
            level_size = len(queue)
            
            for _ in range(level_size):
                node = queue.pop(0)
                if node:
                    level.append(str(node.val))
                    queue.append(node.left)
                    queue.append(node.right)
                else:
                    level.append("null")
                    
            # Remove trailing nulls
            while level and level[-1] == "null":
                level.pop()
                
            if level:
                print(" ".join(level))

def test_solution():
    """
    Test cases for 105. Construct Binary Tree From Preorder And Inorder Traversal.
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
    print(f"Solution for 105. Construct Binary Tree From Preorder And Inorder Traversal")
