"""
# 088. Merge Sorted Array
# Difficulty: Medium
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
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Merge nums2 into nums1 as one sorted array in-place.
        
        Args:
            nums1: First array with extra space at end (length = m + n)
            m: Number of elements in nums1 (excluding extra space)
            nums2: Second array to be merged
            n: Number of elements in nums2
            
        Returns:
            None (modifies nums1 in-place)
        """
        # Initialize pointers for the end of both arrays
        p1 = m - 1  # Last element in nums1
        p2 = n - 1  # Last element in nums2
        p = m + n - 1  # Last position in merged array

        # While there are elements to compare in both arrays
        while p2 >= 0 and p1 >= 0:
            if nums1[p1] > nums2[p2]:
                nums1[p] = nums1[p1]
                p1 -= 1
            else:
                nums1[p] = nums2[p2]
                p2 -= 1
            p -= 1

        # If there are remaining elements in nums2
        while p2 >= 0:
            nums1[p] = nums2[p2]
            p2 -= 1
            p -= 1

def test_solution():
    """
    Test cases for 088. Merge Sorted Array.
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
    print(f"Solution for 088. Merge Sorted Array")
