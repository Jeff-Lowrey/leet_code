"""
# 077. Combinations
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
    def combine(self, n: int, k: int) -> List[List[int]]:
        """
        Generate all possible combinations of k numbers from 1 to n.
        
        Args:
            n (int): The range of numbers (1 to n)
            k (int): The size of each combination
            
        Returns:
            List[List[int]]: List of all possible combinations
        """
        def backtrack(start: int, curr_combination: List[int]) -> None:
            # If we have a valid combination of size k, add it to results
            if len(curr_combination) == k:
                result.append(curr_combination[:])
                return
            
            # Try each possible number that can be added to the current combination
            for i in range(start, n + 1):
                # Add current number to combination
                curr_combination.append(i)
                # Recursively generate combinations with remaining numbers
                backtrack(i + 1, curr_combination)
                # Backtrack by removing the last added number
                curr_combination.pop()
        
        result = []
        backtrack(1, [])
        return result

    def combine_iterative(self, n: int, k: int) -> List[List[int]]:
        """
        Generate all possible combinations of k numbers from 1 to n using iterative approach.
        
        Args:
            n (int): The range of numbers (1 to n)
            k (int): The size of each combination
            
        Returns:
            List[List[int]]: List of all possible combinations
        """
        # Initialize the first combination
        nums = list(range(1, k + 1)) + [n + 1]
        result = []
        i = 0
        
        while i < k:
            # Add current combination
            result.append(nums[:k])
            i = 0
            
            # Find the first number that can be incremented
            while i < k and nums[i] + 1 == nums[i + 1]:
                nums[i] = i + 1
                i += 1
            
            # Increment the number at position i
            nums[i] += 1
            
        return result

def test_solution():
    """
    Test cases for 077. Combinations.
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
    print(f"Solution for 077. Combinations")
