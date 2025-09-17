"""
11. Container With Most Water
Medium

You are given an integer array height of length n. There are n vertical lines
drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the
container contains the most water.

Return the maximum amount of water a container can store.

Example:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
"""

class Solution:
    def maxArea(self, height: list[int]) -> int:
        """
        Approach: Two Pointers
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        left, right = 0, len(height) - 1
        max_area = 0

        while left < right:
            # Calculate current area
            width = right - left
            current_height = min(height[left], height[right])
            current_area = width * current_height
            max_area = max(max_area, current_area)

            # Move the pointer with smaller height
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1

        return max_area

    def maxAreaBruteForce(self, height: list[int]) -> int:
        """
        Brute Force Approach
        Time Complexity: O(n²)
        Space Complexity: O(1)
        """
        n = len(height)
        max_area = 0

        for i in range(n):
            for j in range(i + 1, n):
                width = j - i
                current_height = min(height[i], height[j])
                current_area = width * current_height
                max_area = max(max_area, current_area)

        return max_area


# Test cases
if __name__ == "__main__":
    solution = Solution()

    # Test case 1
    height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7]
    print(f"Input: {height1}")
    print(f"Output: {solution.maxArea(height1)}")  # 49

    # Test case 2
    height2 = [1, 1]
    print(f"Input: {height2}")
    print(f"Output: {solution.maxArea(height2)}")  # 1
