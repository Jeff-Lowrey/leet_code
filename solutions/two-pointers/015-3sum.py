"""
15. 3Sum
# Difficulty: Medium
Given an integer array `nums`, return all the triplets [`nums`[i], `nums`[j], `nums`[k]]
such that `i` != `j`, `i` != `k`, and `j` != `k`, and `nums`[i] + `nums`[j] + `nums`[k] == 0.

Notice that the solution `set` must not contain duplicate triplets.

Example:
Input: `nums` = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
Convert the 3Sum problem into multiple 2Sum problems. For each number, find pairs in the remaining array that sum to the negative of that number. Sorting helps avoid duplicates and enables two-pointer technique.

### APPROACH:
1. **Sort Array**: Enables two-pointer technique and easy duplicate handling
2. **Fix First Element**: For each nums[i], find pairs that sum to -nums[i]
3. **Two Pointers**: Use left and right pointers to find the required sum
4. **Skip Duplicates**: Avoid duplicate triplets by skipping repeated values

### WHY THIS WORKS:
Sorting enables efficient duplicate skipping and the two-pointer technique. For each fixed first element, the problem reduces to finding two numbers that sum to a target, which is efficiently solved with two pointers.

### TIME COMPLEXITY: O(n²)
- O(n log n) for sorting
- O(n²) for nested loops with two pointers
- Overall: O(n²)

### SPACE COMPLEXITY: O(1)
- Excluding output space, only using constant extra space
- Sorting can be done in-place

### EXAMPLE WALKTHROUGH:
For nums = [-1,0,1,2,-1,-4], after sorting: [-4,-1,-1,0,1,2]
1. i=0, nums[i]=-4, target=4: no valid pairs
2. i=1, nums[i]=-1, target=1: find pairs summing to 1
   - left=2(-1), right=5(2): sum=1 ✓ → triplet [-1,-1,2]
3. i=2: skip (duplicate -1)
4. i=3, nums[i]=0, target=0: find pairs summing to 0
   - left=4(1), right=5(2): sum=3 > 0, move right
   - No valid pairs
5. Continue...

### DUPLICATE HANDLING:
- Skip duplicate values for the first element
- After finding a valid triplet, skip duplicates for left and right pointers
- This ensures no duplicate triplets in the result

### EDGE CASES:
- Array length < 3: return []
- All positive/negative numbers: return []
- Array with all zeros: return [[0,0,0]] if length ≥ 3

</details>
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
