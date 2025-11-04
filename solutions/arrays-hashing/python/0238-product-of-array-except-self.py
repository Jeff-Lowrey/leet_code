"""### METADATA:
**Techniques**: Prefix-Suffix Product, In-place Array Manipulation
**Data Structures**: Array
**Time Complexity**: O(n)
**Space Complexity**: O(1)

### INTUITION:
The key insight is that for each position i, the product of all elements except nums[i] equals (product of all elements to the left of i) × (product of all elements to the right of i). We can calculate these prefix and suffix products in two passes without using division. First pass: build left products. Second pass: multiply by right products while traversing backwards.

### APPROACH:
1. **First pass (left to right)**: Calculate prefix products - for each position i, store the product of all elements to its left in result[i]
2. **Initialize left product**: Start with leftProduct = 1 (no elements to the left of index 0)
3. **Second pass (right to left)**: Calculate suffix products and combine - traverse backwards, multiplying result[i] by the product of all elements to its right
4. **Initialize right product**: Start with rightProduct = 1 (no elements to the right of last index)
5. **Combine results**: result[i] already has left product, multiply it by right product to get final answer

### WHY THIS WORKS:
- This ensures that two-pass approach: left products then right products multiplied together gives product except self
- This ensures that first pass stores cumulative left products in result array
- This ensures that second pass computes right products on-the-fly and multiplies into existing result
- This ensures that avoids division operation while achieving O(n) time
- This ensures that o(1) extra space by using output array to store intermediate left products

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3, 4]
```

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

Output:
```
[24, 12, 8, 6]
```

### TIME COMPLEXITY:
**O(n)** - where n is the length of the array. We make exactly two passes through the array: one left-to-right pass to calculate prefix products (**O(n)**), and one right-to-left pass to calculate suffix products and combine them with the prefix products (**O(n)**). Each pass performs constant-time operations (multiplication and array access) for each element. Total: **O(n)** + **O(n)** = **O(2n)** = **O(n)**. This is optimal since we must examine every element at least once.

### SPACE COMPLEXITY:
**O(1)** - We use only two variables (left_product and right_product) for tracking running products, regardless of input size. The result array is required for output and is not counted as extra space per the problem constraints. If we count the output array, the space complexity would be **O(n)**, but conventionally output space is excluded from space complexity analysis. This makes our solution optimal for space.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

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
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Empty input
    result = solution.productExceptSelf([])
    expected = []
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single element
    result = solution.productExceptSelf([1])
    expected = [1]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 238. Product Of Array Except Self")
