"""
# Difficulty: Medium

# 238. Product Of Array Except Self

Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[24, 12, 8, 6]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>The product array excluding self is [24,12,8,6] for input [1,2,3,4]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The product except self equals (product of all elements to the left) × (product of all elements to the right). Build the result array in two passes: first pass calculates cumulative left products, second pass calculates right products and multiplies them in-place.

### APPROACH:
1. **Initialize result array**: Create result array of size n filled with 1s
2. **Calculate left products**: Initialize left_product = 1, iterate left-to-right through nums
3. **Store left products**: For each index i, set result[i] = left_product, then update left_product *= nums[i]
4. **Calculate right products**: Initialize right_product = 1, iterate right-to-left through nums
5. **Combine with right products**: For each index i, multiply result[i] *= right_product, then update right_product *= nums[i]
6. **Return result**: The result array now contains products of all elements except self at each position

### WHY THIS WORKS:
- Two-pass approach: left products then right products multiplied together gives product except self
- First pass stores cumulative left products in result array
- Second pass computes right products on-the-fly and multiplies into existing result
- Avoids division operation while achieving O(n) time
- O(1) extra space by using output array to store intermediate left products

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

from typing import Any, List


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
        for i in range(n - 1, -1, -1):
            result[i] *= right_product
            right_product *= nums[i]

        return result


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.productExceptSelf([1, 2, 3, 4])
    expected: list[Any] = [24, 12, 8, 6]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.productExceptSelf([])
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.productExceptSelf([1])
    expected = [1]
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 238. Product Of Array Except Self")
