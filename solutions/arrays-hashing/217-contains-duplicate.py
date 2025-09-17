"""
217. Contains Duplicate
Easy

Given an integer array nums, return true if any value appears at least twice
in the array, and return false if every element is distinct.

Example:
Input: nums = [1,2,3,1]
Output: true
"""

class Solution:
    def containsDuplicate(self, nums: list[int]) -> bool:
        """
        Approach: Hash Set
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        return len(nums) != len(set(nums))

    def containsDuplicateVerbose(self, nums: list[int]) -> bool:
        """
        Approach: Hash Set with early termination
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        seen = set()

        for num in nums:
            if num in seen:
                return True
            seen.add(num)

        return False


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [1, 2, 3, 1]
    print(f"Input: {nums1}")
    print(f"Output: {solution.containsDuplicate(nums1)}")  # True

    # Test case 2
    nums2 = [1, 2, 3, 4]
    print(f"Input: {nums2}")
    print(f"Output: {solution.containsDuplicate(nums2)}")  # False

    # Test case 3
    nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
    print(f"Input: {nums3}")
    print(f"Output: {solution.containsDuplicate(nums3)}")  # True
