"""
# Difficulty: Medium

# 300. Longest Increasing Subsequence

Given a problem that demonstrates key concepts in Dynamic Programming.

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
[This problem requires understanding of dynamic programming concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply dynamic programming methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages dynamic programming principles
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
    def lengthOfLIS(self, nums: list[int]) -> int:
        """
        Find length of longest increasing subsequence using binary search + DP.

        Args:
            nums: Array of integers

        Returns:
            Length of longest strictly increasing subsequence

        Time Complexity: O(n log n) - binary search for each element
        Space Complexity: O(n) - space for tails array
        """
        if not nums:
            return 0

        # tails[i] = smallest tail value for LIS of length i+1
        tails = []

        for num in nums:
            # Binary search for position to insert/replace
            left, right = 0, len(tails)

            while left < right:
                mid = (left + right) // 2
                if tails[mid] < num:
                    left = mid + 1
                else:
                    right = mid

            # If left == len(tails), append; otherwise, replace
            if left == len(tails):
                tails.append(num)
            else:
                tails[left] = num

        return len(tails)

    def solve(self, nums: list[int]) -> int:
        """Wrapper method for consistency with template."""
        return self.lengthOfLIS(nums)

def test_solution():
    """
    Test cases for 300. Longest Increasing Subsequence.
    """
    solution = Solution()

    # Test case 1: Classic example
    result = solution.solve([10, 9, 2, 5, 3, 7, 101, 18])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: All increasing
    result = solution.solve([1, 2, 3, 4, 5])
    expected = 5
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All decreasing
    result = solution.solve([5, 4, 3, 2, 1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 4: Single element
    result = solution.solve([7])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 5: Two elements increasing
    result = solution.solve([1, 3])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 6: Two elements decreasing
    result = solution.solve([3, 1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 7: Duplicates
    result = solution.solve([1, 3, 6, 7, 9, 4, 10, 5, 6])
    expected = 6
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 8: Another example
    result = solution.solve([0, 1, 0, 3, 2, 3])
    expected = 4
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    nums = [10, 9, 2, 5, 3, 7, 101, 18]
    result = solution.solve(nums)
    print(f"Solution for 300. Longest Increasing Subsequence: {result}")
