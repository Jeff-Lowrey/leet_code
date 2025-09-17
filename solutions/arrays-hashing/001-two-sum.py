"""
1. Two Sum
Easy

Given an array of integers nums and an integer target, return indices of the
two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may
not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
"""

class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        """
        Approach: Hash Map for O(n) lookup
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Dictionary to store value -> index mapping
        seen = {}

        for i, num in enumerate(nums):
            # Calculate complement needed to reach target
            complement = target - num

            # Check if complement exists in our hash map
            if complement in seen:
                return [seen[complement], i]

            # Store current number and its index
            seen[num] = i

        # Should never reach here given problem constraints
        return []

    def twoSumBruteForce(self, nums: list[int], target: int) -> list[int]:
        """
        Brute Force Approach
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(nums)

        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] + nums[j] == target:
                    return [i, j]

        return []


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [2, 7, 11, 15]
    target1 = 9
    print(f"Input: {nums1}, Target: {target1}")
    print(f"Output: {solution.twoSum(nums1, target1)}")  # [0, 1]

    # Test case 2
    nums2 = [3, 2, 4]
    target2 = 6
    print(f"Input: {nums2}, Target: {target2}")
    print(f"Output: {solution.twoSum(nums2, target2)}")  # [1, 2]

    # Test case 3
    nums3 = [3, 3]
    target3 = 6
    print(f"Input: {nums3}, Target: {target3}")
    print(f"Output: {solution.twoSum(nums3, target3)}")  # [0, 1]
