"""
128. Longest Consecutive Sequence
Medium

Given an unsorted array of integers nums, return the length of the longest
consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
"""

class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        """
        Approach: Hash Set with intelligent starting points
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not nums:
            return 0

        num_set = set(nums)
        longest = 0

        for num in num_set:
            # Only start counting from the beginning of a sequence
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1

                # Count consecutive numbers
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                longest = max(longest, current_streak)

        return longest

    def longestConsecutiveSort(self, nums: list[int]) -> int:
        """
        Approach: Sorting
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        if not nums:
            return 0

        nums.sort()
        longest = 1
        current = 1

        for i in range(1, len(nums)):
            if nums[i] == nums[i - 1]:
                continue  # Skip duplicates
            elif nums[i] == nums[i - 1] + 1:
                current += 1
            else:
                longest = max(longest, current)
                current = 1

        return max(longest, current)


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    nums1 = [100, 4, 200, 1, 3, 2]
    print(f"Input: {nums1}")
    print(f"Output: {solution.longestConsecutive(nums1)}")  # 4

    # Test case 2
    nums2 = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
    print(f"Input: {nums2}")
    print(f"Output: {solution.longestConsecutive(nums2)}")  # 9
