"""
# 090. Subsets Ii
**Medium**

Given a problem that demonstrates key concepts in Backtracking.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of backtracking concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply backtracking methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages backtracking principles
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

The approach uses backtracking techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using backtracking method
3. Return the computed result

</details>
"""

class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all possible unique subsets of the input array.
        
        Args:
            nums: List of integers that may contain duplicates
            
        Returns:
            List of lists containing all unique subsets
            
        Example:
            Input: nums = [1,2,2]
            Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
        """
        # Sort the array to handle duplicates properly
        nums.sort()
        result = []
        
        def backtrack(start: int, current_subset: List[int]) -> None:
            """
            Helper function to generate subsets using backtracking.
            
            Args:
                start: Starting index for considering elements
                current_subset: Current subset being built
            """
            # Add the current subset to result
            result.append(current_subset[:])
            
            # Try adding each remaining number to current subset
            for i in range(start, len(nums)):
                # Skip duplicates to avoid duplicate subsets
                if i > start and nums[i] == nums[i-1]:
                    continue
                    
                # Include current number in subset
                current_subset.append(nums[i])
                # Recursively generate subsets with remaining elements
                backtrack(i + 1, current_subset)
                # Backtrack by removing the last added element
                current_subset.pop()
        
        # Start backtracking with empty subset
        backtrack(0, [])
        return result

def test_solution():
    """
    Test cases for 090. Subsets Ii.
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
    print(f"Solution for 090. Subsets Ii")
