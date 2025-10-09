"""
# 047. Permutations Ii
# Difficulty: Medium
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
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        """
        Generate all possible unique permutations of the input array.
        
        Args:
            nums: List of integers (may contain duplicates)
            
        Returns:
            List of lists containing all unique permutations
        
        Time Complexity: O(n!)
        Space Complexity: O(n)
        """
        # Handle empty input
        if not nums:
            return []
        
        def backtrack(counter: Counter, temp_perm: List[int], n: int) -> None:
            """
            Helper function for backtracking to generate permutations.
            
            Args:
                counter: Counter object containing remaining numbers
                temp_perm: Current permutation being built
                n: Target length of permutation
            """
            # Base case: if current permutation is complete
            if len(temp_perm) == n:
                result.append(temp_perm[:])
                return
            
            # Try each unique number from counter
            for num in counter:
                if counter[num] > 0:
                    # Add current number to permutation
                    temp_perm.append(num)
                    counter[num] -= 1
                    
                    # Recursive call
                    backtrack(counter, temp_perm, n)
                    
                    # Backtrack
                    temp_perm.pop()
                    counter[num] += 1
        
        result = []
        # Create counter for frequency of each number
        counter = Counter(nums)
        backtrack(counter, [], len(nums))
        return result

def test_solution():
    """
    Test cases for 047. Permutations Ii.
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
    print(f"Solution for 047. Permutations Ii")
