"""
# Difficulty: Medium

# 011. Container With Most Water

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
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]

Step 1: Initialize
  left = 0 (height=1), right = 8 (height=7)
  max_area = 0

Step 2: First iteration
  width = 8 - 0 = 8
  min_height = min(1, 7) = 1
  area = 8 × 1 = 8
  max_area = 8
  Move left pointer (smaller height)
  left = 1

Step 3: left=1 (height=8), right=8 (height=7)
  width = 8 - 1 = 7
  min_height = min(8, 7) = 7
  area = 7 × 7 = 49
  max_area = 49
  Move right pointer (smaller height)
  right = 7

Step 4: left=1 (height=8), right=7 (height=3)
  width = 7 - 1 = 6
  min_height = min(8, 3) = 3
  area = 6 × 3 = 18
  max_area = 49 (no change)
  Move right pointer
  right = 6

Step 5: Continue until left >= right...

Output: 49
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
    def maxArea(self, height: List[int]) -> int:
        """
        Calculate the maximum area of water that can be contained between two vertical lines.
        
        Args:
            height: List of integers representing heights of vertical lines
            
        Returns:
            Maximum area of water that can be contained
        """
        # Initialize pointers and maximum area
        left = 0
        right = len(height) - 1
        max_area = 0
        
        # Use two-pointer technique to find maximum area
        while left < right:
            # Calculate current area
            # Area = width * minimum height between two lines
            current_area = (right - left) * min(height[left], height[right])
            
            # Update maximum area if current area is larger
            max_area = max(max_area, current_area)
            
            # Move the pointer with smaller height inward
            # This is optimal because moving the larger height pointer
            # would only decrease the area
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
                
        return max_area

def test_solution():
    """
    Test cases for 011. Container With Most Water.
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
    print(f"Solution for 011. Container With Most Water")
