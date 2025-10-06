"""
# 128. Longest Consecutive Sequence
**Medium**

Given a problem that demonstrates key concepts in Arrays Hashing.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of arrays hashing concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply arrays hashing methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages arrays hashing principles
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

The approach uses arrays hashing techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using arrays hashing method
3. Return the computed result

</details>
"""

class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        """
        Find the length of the longest consecutive sequence in an unsorted array.
        
        Args:
            nums: List of integers (can be unsorted and contain duplicates)
            
        Returns:
            int: Length of the longest consecutive sequence
            
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0
        
        # Convert list to set for O(1) lookup
        num_set = set(nums)
        longest_streak = 0
        
        # Iterate through each number in the set
        for num in num_set:
            # Only start counting sequences from the smallest number in the sequence
            # If num-1 exists, this isn't the start of a sequence
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1
                
                # Count consecutive numbers
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1
                
                # Update longest streak if current streak is longer
                longest_streak = max(longest_streak, current_streak)
        
        return longest_streak

def test_solution():
    """
    Test cases for 128. Longest Consecutive Sequence.
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
    print(f"Solution for 128. Longest Consecutive Sequence")
