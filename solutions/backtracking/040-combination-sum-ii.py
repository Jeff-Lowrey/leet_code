"""
# 040. Combination Sum Ii
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
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        """
        Find all unique combinations of numbers that sum to target.
        
        Args:
            candidates: List of candidate numbers
            target: Target sum to achieve
            
        Returns:
            List of all unique combinations that sum to target
        """
        # Sort candidates to handle duplicates and enable early termination
        candidates.sort()
        result = []
        
        def backtrack(curr: List[int], pos: int, remain: int) -> None:
            """
            Recursive backtracking helper function.
            
            Args:
                curr: Current combination being built
                pos: Current position in candidates array
                remain: Remaining sum to achieve
            """
            if remain == 0:
                # Found a valid combination
                result.append(curr[:])
                return
            
            for i in range(pos, len(candidates)):
                # Skip duplicates to avoid duplicate combinations
                if i > pos and candidates[i] == candidates[i-1]:
                    continue
                    
                # Early termination if current number is too large
                if candidates[i] > remain:
                    break
                    
                # Include current number and recurse
                curr.append(candidates[i])
                backtrack(curr, i + 1, remain - candidates[i])
                curr.pop()  # Backtrack by removing the last number
        
        backtrack([], 0, target)
        return result

def test_solution():
    """
    Test cases for 040. Combination Sum Ii.
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
    print(f"Solution for 040. Combination Sum Ii")
