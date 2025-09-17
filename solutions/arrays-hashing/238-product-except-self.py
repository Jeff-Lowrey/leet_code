"""
238. Product of Array Except Self
Medium

Given an integer array nums, return an array answer such that answer[i] is equal
to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

Example:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
"""

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
