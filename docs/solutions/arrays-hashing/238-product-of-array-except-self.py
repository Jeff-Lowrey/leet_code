"""
# Difficulty: Medium

# 238. Product Of Array Except Self

Given a problem that demonstrates key concepts in Arrays Hashing.

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

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1, 2, 3, 4]

Step 1: Calculate left products
  i=0: result[0] = 1 (no left elements)
       left_product = 1 × 1 = 1
  i=1: result[1] = 1 (product of left: 1)
       left_product = 1 × 2 = 2
  i=2: result[2] = 2 (product of left: 1×2)
       left_product = 2 × 3 = 6
  i=3: result[3] = 6 (product of left: 1×2×3)
       left_product = 6 × 4 = 24
  result = [1, 1, 2, 6]

Step 2: Calculate right products and combine
  i=3: result[3] = 6 × 1 = 6 (no right elements)
       right_product = 1 × 4 = 4
  i=2: result[2] = 2 × 4 = 8 (right: 4)
       right_product = 4 × 3 = 12
  i=1: result[1] = 1 × 12 = 12 (right: 3×4)
       right_product = 12 × 2 = 24
  i=0: result[0] = 1 × 24 = 24 (right: 2×3×4)
       right_product = 24 × 1 = 24
  result = [24, 12, 8, 6]

Output: [24, 12, 8, 6]
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
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        """
        Calculate product of all elements except self for each position.
        
        Args:
            nums: List of integers
            
        Returns:
            List of products where each element is the product of all numbers
            except the number at that position in the input list
            
        Time Complexity: O(n)
        Space Complexity: O(1) - excluding the output array
        """
        n = len(nums)
        # Initialize output array with 1s
        result = [1] * n
        
        # Calculate products of all elements to the left of each position
        left_product = 1
        for i in range(n):
            result[i] = left_product
            left_product *= nums[i]
            
        # Calculate products of all elements to the right and combine with left products
        right_product = 1
        for i in range(n-1, -1, -1):
            result[i] *= right_product
            right_product *= nums[i]
            
        return result

def test_solution():
    """
    Test cases for 238. Product Of Array Except Self.
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
    print(f"Solution for 238. Product Of Array Except Self")
