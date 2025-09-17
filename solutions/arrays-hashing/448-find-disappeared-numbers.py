"""
448. Find All Numbers Disappeared in an Array
Easy

Given an array nums of n integers where nums[i] is in the range [1, n], return
an array of all the integers in the range [1, n] that do not appear in nums.

Example:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
"""

class Solution:
    def findDisappearedNumbers(self, nums: list[int]) -> list[int]:
        """
        Approach: Mark visited with negative values
        Time Complexity: O(n)
        Space Complexity: O(1) excluding output
        """
        # Mark existing numbers by making values at their indices negative
        for num in nums:
            index = abs(num) - 1
            if nums[index] > 0:
                nums[index] = -nums[index]

        # Indices with positive values are missing numbers
        result = []
        for i in range(len(nums)):
            if nums[i] > 0:
                result.append(i + 1)

        return result

    def findDisappearedNumbersSet(self, nums: list[int]) -> list[int]:
        """
        Approach: Using set difference
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        return list(set(range(1, len(nums) + 1)) - set(nums))


# Test cases
if __name__ == "__main__":
    solution = Solution()

    test_cases = [
        [4, 3, 2, 7, 8, 2, 3, 1],
        [1, 1],
        [1, 2, 3, 4, 5]
    ]

    for nums in test_cases:
        result = solution.findDisappearedNumbers(nums.copy())
        print(f"Input: {nums}")
        print(f"Missing: {result}\n")
