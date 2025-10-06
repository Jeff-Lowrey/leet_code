"""
238. Product of Array Except Self
Medium

Given an integer array `nums`, return an array `answer` such that answer[i] is equal
to the product of all the elements of `nums` except `nums`[i].

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example:
Input: `nums` = [1,2,3,4]
Output: [24,12,8,6]
"""

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
For each position i, the answer is the product of all elements to the left of i multiplied by the product of all elements to the right of i. We can compute this efficiently in two passes.

### APPROACH:
1. **Left pass**: For each position i, store the product of all elements to the left
2. **Right pass**: For each position i, multiply by the product of all elements to the right
3. **Space optimization**: Use the result array to store left products, then multiply in-place with right products

### WHY THIS WORKS:
- The product of all elements except nums[i] = (product of elements before i) × (product of elements after i)
- By separating into left and right products, we avoid division and handle edge cases naturally
- Two passes ensure we visit each element exactly twice

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1) excluding output array

### EXAMPLE WALKTHROUGH:
```
Input: nums = [1,2,3,4]

Left pass (storing left products):
i=0: left_product = 1, result[0] = 1, left_product *= nums[0] = 1
i=1: left_product = 1, result[1] = 1, left_product *= nums[1] = 2
i=2: left_product = 2, result[2] = 2, left_product *= nums[2] = 6
i=3: left_product = 6, result[3] = 6, left_product *= nums[3] = 24
result = [1,1,2,6]

Right pass (multiplying by right products):
i=3: right_product = 1, result[3] *= 1 = 6, right_product *= nums[3] = 4
i=2: right_product = 4, result[2] *= 4 = 8, right_product *= nums[2] = 12
i=1: right_product = 12, result[1] *= 12 = 12, right_product *= nums[1] = 24
i=0: right_product = 24, result[0] *= 24 = 24, right_product *= nums[0] = 24
result = [24,12,8,6]
```

### EDGE CASES:
- Array with zeros → handled naturally (product becomes 0)
- Single element → left and right products are both 1
- Two elements → each element's result is the other element

</details>

class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        """
        Approach: Left and right products
        Time Complexity: O(n)
        Space Complexity: O(1) - output array doesn't count
        """
        n = len(nums)
        result = [1] * n

        # Calculate left products
        left_product = 1
        for i in range(n):
            result[i] = left_product
            left_product *= nums[i]

        # Calculate right products and multiply
        right_product = 1
        for i in range(n - 1, -1, -1):
            result[i] *= right_product
            right_product *= nums[i]

        return result

    def productExceptSelfTwoPass(self, nums: list[int]) -> list[int]:
        """
        Approach: Separate arrays for left and right products
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        n = len(nums)
        left = [1] * n
        right = [1] * n
        result = [1] * n

        # Build left products
        for i in range(1, n):
            left[i] = left[i - 1] * nums[i - 1]

        # Build right products
        for i in range(n - 2, -1, -1):
            right[i] = right[i + 1] * nums[i + 1]

        # Combine
        for i in range(n):
            result[i] = left[i] * right[i]

        return result


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [1, 2, 3, 4]
    print(f"Input: {nums1}")
    print(f"Output: {solution.productExceptSelf(nums1)}")  # [24, 12, 8, 6]

    # Test case 2
    nums2 = [-1, 1, 0, -3, 3]
    print(f"Input: {nums2}")
    print(f"Output: {solution.productExceptSelf(nums2)}")  # [0, 0, 9, 0, 0]
