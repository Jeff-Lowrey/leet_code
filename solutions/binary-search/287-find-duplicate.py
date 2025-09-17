"""
287. Find the Duplicate Number
Medium

Given an array of integers nums containing n + 1 integers where each integer is
in the range [1, n] inclusive. There is only one repeated number in nums, return
this repeated number.

You must solve the problem without modifying the array nums and uses only constant
extra space.

Example:
Input: nums = [1,3,4,2,2]
Output: 2
"""

class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        """
        Approach: Floyd's Tortoise and Hare (Cycle Detection)
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        # Phase 1: Find intersection point in cycle
        slow = fast = nums[0]

        # Move slow one step and fast two steps
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        # Phase 2: Find entrance to cycle (duplicate number)
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]

        return slow

    def findDuplicateBinarySearch(self, nums: list[int]) -> int:
        """
        Approach: Binary Search on value range
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        left, right = 1, len(nums) - 1

        while left < right:
            mid = left + (right - left) // 2

            # Count numbers <= mid
            count = sum(1 for num in nums if num <= mid)

            # If count > mid, duplicate is in [left, mid]
            if count > mid:
                right = mid
            else:
                left = mid + 1

        return left

    def findDuplicateBitManipulation(self, nums: list[int]) -> int:
        """
        Approach: Bit manipulation (for specific constraints)
        Time Complexity: O(n * 32) = O(n)
        Space Complexity: O(1)
        """
        n = len(nums) - 1
        duplicate = 0

        # Check each bit position
        for bit in range(32):
            mask = 1 << bit
            expected_count = 0
            actual_count = 0

            for i in range(n + 1):
                # Count bits in range [1, n]
                if i & mask:
                    expected_count += 1
                # Count bits in actual array
                if nums[i] & mask:
                    actual_count += 1

            # If actual count > expected, duplicate has this bit set
            if actual_count > expected_count:
                duplicate |= mask

        return duplicate


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [1, 3, 4, 2, 2]
    print(f"Input: {nums1}")
    print(f"Output: {solution.findDuplicate(nums1)}")  # 2

    # Test case 2
    nums2 = [3, 1, 3, 4, 2]
    print(f"Input: {nums2}")
    print(f"Output: {solution.findDuplicate(nums2)}")  # 3

    # Test case 3
    nums3 = [3, 3, 3, 3, 3]
    print(f"Input: {nums3}")
    print(f"Output: {solution.findDuplicate(nums3)}")  # 3