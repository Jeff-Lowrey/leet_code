"""
167. Two Sum II - Input Array Is Sorted
Medium

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing
order, find two numbers such that they add up to a specific target number.

Return the indices of the two numbers, index1 and index2, added by one.

You may not use the same element twice.

Example:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2.
"""

class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        """
        Approach: Two pointers
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        left, right = 0, len(numbers) - 1

        while left < right:
            current_sum = numbers[left] + numbers[right]

            if current_sum == target:
                return [left + 1, right + 1]  # 1-indexed
            elif current_sum < target:
                left += 1
            else:
                right -= 1

        return []  # Should not reach here given problem constraints

    def twoSumBinarySearch(self, numbers: list[int], target: int) -> list[int]:
        """
        Approach: Binary search for complement
        Time Complexity: O(n log n)
        Space Complexity: O(1)
        """
        for i in range(len(numbers)):
            complement = target - numbers[i]

            # Binary search for complement in remaining array
            left, right = i + 1, len(numbers) - 1

            while left <= right:
                mid = left + (right - left) // 2

                if numbers[mid] == complement:
                    return [i + 1, mid + 1]
                elif numbers[mid] < complement:
                    left = mid + 1
                else:
                    right = mid - 1

        return []


"""
42. Trapping Rain Water
Hard

Given n non-negative integers representing an elevation map where the width of
each bar is 1, compute how much water it can trap after raining.

Example:
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
"""

class SolutionTrappingWater:
    def trap(self, height: list[int]) -> int:
        """
        Approach: Two pointers
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if not height:
            return 0

        left, right = 0, len(height) - 1
        left_max = right_max = 0
        water = 0

        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    water += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    water += right_max - height[right]
                right -= 1

        return water

    def trapDP(self, height: list[int]) -> int:
        """
        Approach: Dynamic programming with pre-computation
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if not height:
            return 0

        n = len(height)
        left_max = [0] * n
        right_max = [0] * n

        # Fill left_max
        left_max[0] = height[0]
        for i in range(1, n):
            left_max[i] = max(left_max[i-1], height[i])

        # Fill right_max
        right_max[n-1] = height[n-1]
        for i in range(n-2, -1, -1):
            right_max[i] = max(right_max[i+1], height[i])

        # Calculate water
        water = 0
        for i in range(n):
            water += min(left_max[i], right_max[i]) - height[i]

        return water


# Test cases
if __name__ == "__main__":
    # Test Two Sum II
    solution = Solution()

    print("Two Sum II - Sorted Array:")
    test_cases = [
        ([2, 7, 11, 15], 9),
        ([2, 3, 4], 6),
        ([-1, 0], -1)
    ]

    for numbers, target in test_cases:
        result = solution.twoSum(numbers, target)
        print(f"Numbers: {numbers}, Target: {target}")
        print(f"Indices: {result}\n")

    # Test Trapping Rain Water
    solution_water = SolutionTrappingWater()

    print("Trapping Rain Water:")
    water_cases = [
        [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
        [4, 2, 0, 3, 2, 5],
        [1, 2, 3, 4, 5]
    ]

    for height in water_cases:
        result = solution_water.trap(height)
        print(f"Height: {height}")
        print(f"Water trapped: {result}\n")
