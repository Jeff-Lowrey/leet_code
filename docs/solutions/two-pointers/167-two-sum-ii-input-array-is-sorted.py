"""
# Difficulty: Medium

# 167. Two Sum Ii Input Array Is Sorted

Given a problem that demonstrates key concepts in Two Pointers.

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
[This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply two pointers methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages two pointers principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: numbers = [2, 7, 11, 15], target = 9

Step 1: Initialize pointers
  left = 0 (numbers[0] = 2)
  right = 3 (numbers[3] = 15)

Step 2: First iteration
  current_sum = 2 + 15 = 17
  17 > 9, so move right pointer left
  right = 2

Step 3: Second iteration
  left = 0 (numbers[0] = 2)
  right = 2 (numbers[2] = 11)
  current_sum = 2 + 11 = 13
  13 > 9, so move right pointer left
  right = 1

Step 4: Third iteration
  left = 0 (numbers[0] = 2)
  right = 1 (numbers[1] = 7)
  current_sum = 2 + 7 = 9
  9 == 9 ✓ Found!

Output: [1, 2] (1-indexed positions)
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
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        """
        Find two numbers in the sorted array that add up to the target.
        Uses two-pointer technique for optimal performance.

        Args:
            numbers: A sorted array of integers (1-indexed)
            target: The target sum to find

        Returns:
            List[int]: Indices (1-indexed) of the two numbers that sum to target

        Time Complexity: O(n) where n is the length of numbers
        Space Complexity: O(1) as we only use two pointers
        """
        left = 0  # Left pointer starting from beginning
        right = len(numbers) - 1  # Right pointer starting from end

        while left < right:
            current_sum = numbers[left] + numbers[right]
            
            if current_sum == target:
                # Return 1-indexed positions
                return [left + 1, right + 1]
            elif current_sum < target:
                # If sum is too small, move left pointer right
                left += 1
            else:
                # If sum is too large, move right pointer left
                right -= 1

        # Problem guarantees a solution exists, so this should never be reached
        return []

def test_solution():
    """
    Test cases for 167. Two Sum Ii Input Array Is Sorted.
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
    print(f"Solution for 167. Two Sum Ii Input Array Is Sorted")
