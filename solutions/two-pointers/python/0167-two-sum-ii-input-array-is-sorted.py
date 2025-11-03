"""
### INTUITION:
The key insight is that array is sorted, so use two pointers from both ends. If sum < target, move left pointer right. If sum > target, move right pointer left. If equal, found the pair.

### APPROACH:
1. **Initialize pointers**: Set left = 0, right = len(numbers) - 1
2. **Loop while left < right**: Continue until pointers meet
3. **Calculate sum**: current_sum = numbers[left] + numbers[right]
4. **Check if found**: If current_sum == target, return [left+1, right+1]
5. **Adjust pointers**: If current_sum < target, increment left; else decrement right
6. **Continue search**: Repeat until target found
7. **Return result**: Return indices of the two numbers

### WHY THIS WORKS:
- Two pointers: left at start, right at end
- If sum < target, increment left (need larger value)
- If sum > target, decrement right (need smaller value)
- If sum == target, found pair
- O(n) time single pass, O(1) space, exploits sorted property

### EXAMPLE WALKTHROUGH:
Input:
```
numbers = [2, 7, 11, 15], target = 9
```

Step 1: Initialize pointers
left = 0 (numbers[0] = 2)
right = 3 (numbers[3] = 15)
Step 2: First iteration
current_sum = 2 + 15 = 17
17 > 9, so move right pointer left
right = 2
Step 3: Second iteration
left = 0 (numbers[0] = 2)
right = 2 (numbers[2] = 11)
current_sum = 2 + 11 = 13
13 > 9, so move right pointer left
right = 1
Step 4: Third iteration
left = 0 (numbers[0] = 2)
right = 1 (numbers[1] = 7)
current_sum = 2 + 7 = 9
9 == 9 ✓ Found!

Output:
```
[1, 2] (1-indexed positions)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

from typing import List, Optional, Dict, Tuple


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        """
        Find two numbers in the sorted array that add up to the target.
        Uses two-pointer technique for optimal performance.

        Args:
            numbers: A sorted array of integers (1-indexed)
            target: The target sum to find

        Returns:
            List[int]: Indices (1-indexed) of the two numbers that sum to target

        Time Complexity: O(n) where n is the length of numbers
        Space Complexity: O(1) as we only use two pointers
        """
        left = 0  # Left pointer starting from beginning
        right = len(numbers) - 1  # Right pointer starting from end

        while left < right:
            current_sum = numbers[left] + numbers[right]

            if current_sum == target:
                # Return 1-indexed positions
                return [left + 1, right + 1]
            elif current_sum < target:
                # If sum is too small, move left pointer right
                left += 1
            else:
                # If sum is too large, move right pointer left
                right -= 1

        # Problem guarantees a solution exists, so this should never be reached
        return []


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.twoSum([2, 7, 11, 15], target=9)
    expected = [1, 2]
    assert result == expected, f"Expected expected, got result"

    # Test case 2: Different numbers
    result = solution.twoSum([1, 2, 3, 4], 7)
    expected = [3, 4]
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 167. Two Sum Ii Input Array Is Sorted")
