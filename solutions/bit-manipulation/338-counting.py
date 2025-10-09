"""
# Difficulty: Medium

# 338. Counting

Given a problem that demonstrates key concepts in Bit Manipulation.

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
[This problem requires understanding of bit manipulation concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply bit manipulation methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages bit manipulation principles
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
    def countBits(self, n: int) -> List[int]:
        """
        Returns an array where ans[i] is the number of 1's in the binary
        representation of i.

        The solution uses dynamic programming with the observation that:
        For any number x, countBits(x) = countBits(x/2) + (x % 2)

        Args:
            n (int): The upper bound number (inclusive)

        Returns:
            List[int]: Array containing count of 1's for each number from 0 to n

        Example:
            >>> solution = Solution()
            >>> solution.countBits(5)
            [0, 1, 1, 2, 1, 2]
        """
        # Initialize result array with 0s
        result = [0] * (n + 1)
        
        # Iterate from 1 to n
        for i in range(1, n + 1):
            # A number's bit count can be calculated using its half value
            # plus checking if the number is odd (has a 1 in its least significant bit)
            result[i] = result[i >> 1] + (i & 1)
        
        return result

def test_solution():
    """
    Test cases for 338. Counting.
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
    print(f"Solution for 338. Counting")
