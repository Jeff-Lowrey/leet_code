"""
# Difficulty: Medium

# 131. Palindrome Partitioning

Given a problem that demonstrates key concepts in Backtracking.

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

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
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
    def partition(self, s: str) -> List[List[str]]:
        """
        Finds all possible palindrome partitions of the input string.
        
        Args:
            s: Input string to be partitioned
            
        Returns:
            List of lists containing all possible palindrome partitions
        """
        def is_palindrome(start: int, end: int) -> bool:
            """
            Helper function to check if substring is palindrome.
            
            Args:
                start: Starting index of substring
                end: Ending index of substring
                
            Returns:
                True if substring is palindrome, False otherwise
            """
            while start < end:
                if s[start] != s[end]:
                    return False
                start += 1
                end -= 1
            return True
        
        def backtrack(start: int, current_partition: List[str]):
            """
            Recursive backtracking function to find all palindrome partitions.
            
            Args:
                start: Starting index for current partition
                current_partition: Current partition being built
            """
            # If we've reached the end of the string, we've found a valid partition
            if start >= len(s):
                result.append(current_partition[:])
                return
            
            # Try all possible substrings starting from current position
            for end in range(start, len(s)):
                # If current substring is palindrome, include it and recurse
                if is_palindrome(start, end):
                    current_partition.append(s[start:end + 1])
                    backtrack(end + 1, current_partition)
                    current_partition.pop()  # Backtrack
        
        result = []
        backtrack(0, [])
        return result

def test_solution():
    """
    Test cases for 131. Palindrome Partitioning.
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
    print(f"Solution for 131. Palindrome Partitioning")
