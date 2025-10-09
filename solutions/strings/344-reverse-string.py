"""
# 344. Reverse String
# Difficulty: Easy
This problem demonstrates key concepts in Strings.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The problem asks us to reverse a string (represented as a list of characters) in-place, meaning we
must modify the original array without using extra space for another array. The most intuitive
approach is to use two pointers - one at the start and one at the end - and swap elements as we
move towards the center.

### APPROACH:
1. **Initialize two pointers**: One at the start (left) and one at the end (right)
2. **Swap and move**: While left < right, swap elements at left and right positions
3. **Increment/Decrement**: Move left pointer forward and right pointer backward
4. **Continue until pointers meet**: When left >= right, all elements have been swapped

### WHY THIS WORKS:
- By swapping elements from both ends moving towards the center, we reverse the array
- Each element is only touched once, making it efficient
- No additional space is needed beyond the two pointer variables
- The algorithm naturally handles both odd and even length arrays

### TIME COMPLEXITY: O(n)
We iterate through half the array (n/2 swaps), which is O(n).

### SPACE COMPLEXITY: O(1)
Only two pointer variables are used, regardless of input size.

### EXAMPLE WALKTHROUGH:
```
Input: ["h","e","l","l","o"]
Step 1: Swap positions 0 and 4: ["o","e","l","l","h"]
Step 2: Swap positions 1 and 3: ["o","l","l","e","h"]
Step 3: Position 2 is the center, done
Output: ["o","l","l","e","h"]
```

### EDGE CASES:
- Empty array: No swaps needed
- Single element: No swaps needed
- Two elements: Single swap
- Array already reversed: Still performs swaps (idempotent)

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses the two-pointer technique, a fundamental pattern in array manipulation.

### Algorithm Steps:
1. Initialize left pointer at index 0
2. Initialize right pointer at index len(s) - 1
3. While left < right:
   - Swap s[left] and s[right]
   - Increment left
   - Decrement right
4. Array is now reversed in-place

</details>
"""

from typing import List

class Solution:
    def solve(self, s: List[str]) -> None:
        """
        Reverse string in-place using two-pointer technique.

        Args:
            s: List of characters to reverse

        Returns:
            None (modifies array in-place)

        Time Complexity: O(n) where n is the length of the array
        Space Complexity: O(1) - only using two pointer variables
        """
        left = 0
        right = len(s) - 1

        while left < right:
            # Swap characters at left and right pointers
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1

def test_solution():
    """
    Test cases for 344. Reverse String.
    """
    solution = Solution()

    # Test case 1: Basic functionality - odd length
    test1 = ["h", "e", "l", "l", "o"]
    solution.solve(test1)
    expected1 = ["o", "l", "l", "e", "h"]
    assert test1 == expected1, f"Test 1 failed: expected {expected1}, got {test1}"

    # Test case 2: Even length
    test2 = ["H", "a", "n", "n", "a", "h"]
    solution.solve(test2)
    expected2 = ["h", "a", "n", "n", "a", "H"]
    assert test2 == expected2, f"Test 2 failed: expected {expected2}, got {test2}"

    # Test case 3: Single character
    test3 = ["a"]
    solution.solve(test3)
    expected3 = ["a"]
    assert test3 == expected3, f"Test 3 failed: expected {expected3}, got {test3}"

    # Test case 4: Two characters
    test4 = ["a", "b"]
    solution.solve(test4)
    expected4 = ["b", "a"]
    assert test4 == expected4, f"Test 4 failed: expected {expected4}, got {test4}"

    # Test case 5: Empty array
    test5 = []
    solution.solve(test5)
    expected5 = []
    assert test5 == expected5, f"Test 5 failed: expected {expected5}, got {test5}"

    # Test case 6: Already reversed
    test6 = ["z", "y", "x"]
    solution.solve(test6)
    expected6 = ["x", "y", "z"]
    assert test6 == expected6, f"Test 6 failed: expected {expected6}, got {test6}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    print("\nExample usage:")
    solution = Solution()
    example = ["h", "e", "l", "l", "o"]
    print(f"Before: {example}")
    solution.solve(example)
    print(f"After: {example}")
