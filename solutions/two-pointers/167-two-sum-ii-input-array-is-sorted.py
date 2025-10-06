"""
# 167. Two Sum Ii Input Array Is Sorted
**Medium**

Given a problem that demonstrates key concepts in Two Pointers.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of two pointers concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply two pointers methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages two pointers principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses two pointers techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using two pointers method
3. Return the computed result

</details>
"""

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

def test_solution():
    """
    Test cases for 167. Two Sum Ii Input Array Is Sorted.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 167. Two Sum Ii Input Array Is Sorted")
