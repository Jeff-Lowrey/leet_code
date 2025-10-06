"""
# 169. Majority Element
**Easy**

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times.
You may assume that the majority element always exists in the array.

"""

class Solution:
    def majorityElement(self, nums: list[int]) -> int:
        """
        majorityElement - Main solution for Problem 169.

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        candidate = None
        count = 0

        # Boyer-Moore Voting Algorithm
        for num in nums:
            if count == 0:
                candidate = num
                count = 1
            elif num == candidate:
                count += 1
            else:
                count -= 1

        return candidate


def test_solution():
    """Test cases for Problem 169."""
    solution = Solution()

    # Test case 1: Basic case with clear majority
    result = solution.majorityElement([3, 2, 3])
    expected = 3
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Majority element at the beginning
    result = solution.majorityElement([2, 2, 1, 1, 1, 2, 2])
    expected = 2
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: Single element
    result = solution.majorityElement([1])
    expected = 1
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()
