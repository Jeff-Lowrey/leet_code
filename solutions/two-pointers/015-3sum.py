"""
15. 3Sum
Medium

Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]]
such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
"""

class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        """
        Approach: Sort + Two Pointers
        Time Complexity: O(n²)
        Space Complexity: O(1) excluding output
        """
        nums.sort()
        result = []
        n = len(nums)

        for i in range(n - 2):
            # Skip duplicate values for i
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            # Early termination
            if nums[i] > 0:
                break

            left, right = i + 1, n - 1
            target = -nums[i]

            while left < right:
                current_sum = nums[left] + nums[right]

                if current_sum == target:
                    result.append([nums[i], nums[left], nums[right]])

                    # Skip duplicates for left
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    # Skip duplicates for right
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1

                    left += 1
                    right -= 1
                elif current_sum < target:
                    left += 1
                else:
                    right -= 1

        return result


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [-1, 0, 1, 2, -1, -4]
    print(f"Input: {nums1}")
    print(f"Output: {solution.threeSum(nums1)}")  # [[-1,-1,2],[-1,0,1]]

    # Test case 2
    nums2 = [0, 1, 1]
    print(f"Input: {nums2}")
    print(f"Output: {solution.threeSum(nums2)}")  # []

    # Test case 3
    nums3 = [0, 0, 0]
    print(f"Input: {nums3}")
    print(f"Output: {solution.threeSum(nums3)}")  # [[0,0,0]]
